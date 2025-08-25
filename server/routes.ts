import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJobApplicationSchema } from "@shared/schema";
import { z } from "zod";
import type { Request } from "express";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Cities
  app.get("/api/cities", async (req, res) => {
    try {
      const cities = await storage.getCities();
      res.json(cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      res.status(500).json({ message: "Failed to fetch cities" });
    }
  });

  // Companies
  app.get("/api/companies", async (req, res) => {
    try {
      const companies = await storage.getCompanies();
      res.json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const company = await storage.getCompany(req.params.id);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      console.error("Error fetching company:", error);
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  // Job Categories
  app.get("/api/job-categories", async (req, res) => {
    try {
      const categories = await storage.getJobCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching job categories:", error);
      res.status(500).json({ message: "Failed to fetch job categories" });
    }
  });

  // Qualifications
  app.get("/api/qualifications", async (req, res) => {
    try {
      const qualifications = await storage.getQualifications();
      res.json(qualifications);
    } catch (error) {
      console.error("Error fetching qualifications:", error);
      res.status(500).json({ message: "Failed to fetch qualifications" });
    }
  });

  // Job Types
  app.get("/api/job-types", async (req, res) => {
    try {
      const jobTypes = await storage.getJobTypes();
      res.json(jobTypes);
    } catch (error) {
      console.error("Error fetching job types:", error);
      res.status(500).json({ message: "Failed to fetch job types" });
    }
  });

  // Jobs
  app.get("/api/jobs", async (req, res) => {
    try {
      const filters = {
        cityId: req.query.cityId as string,
        categoryId: req.query.categoryId as string,
        qualificationId: req.query.qualificationId as string,
        jobTypeId: req.query.jobTypeId as string,
        search: req.query.search as string,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined,
      };

      const result = await storage.getJobs(filters);
      res.json(result);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/featured", async (req, res) => {
    try {
      const jobs = await storage.getFeaturedJobs();
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching featured jobs:", error);
      res.status(500).json({ message: "Failed to fetch featured jobs" });
    }
  });

  app.get("/api/jobs/recent", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
      const jobs = await storage.getRecentJobs(limit);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching recent jobs:", error);
      res.status(500).json({ message: "Failed to fetch recent jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const job = await storage.getJob(req.params.id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ message: "Failed to fetch job" });
    }
  });

  // Job Applications
  app.post("/api/jobs/:id/apply", async (req, res) => {
    try {
      const jobId = req.params.id;
      
      // Validate the job exists
      const job = await storage.getJob(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      // Validate the application data
      const applicationData = insertJobApplicationSchema.parse({
        ...req.body,
        jobId,
      });

      const application = await storage.createJobApplication(applicationData);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid application data", errors: error.errors });
      }
      console.error("Error creating job application:", error);
      res.status(500).json({ message: "Failed to create job application" });
    }
  });

  app.get("/api/jobs/:id/applications", async (req, res) => {
    try {
      const jobId = req.params.id;
      const applications = await storage.getJobApplications(jobId);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ message: "Failed to fetch job applications" });
    }
  });

  // Auth - simple username/password for local dev
  app.post("/api/login", async (req: Request, res) => {
    const { username, password } = req.body || {};
    // In dev mode we accept any non-empty username/password and store it in session
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }

    // create a minimal user object
    const user = { id: username, username };
    // attach to session
    (req.session as any).user = user;
    res.json({ user });
  });

  app.post("/api/logout", (req: Request, res) => {
    req.session?.destroy?.(() => {
      res.json({ message: "logged out" });
    });
  });

  app.get("/api/me", (req: Request, res) => {
    const user = (req.session as any)?.user;
    if (!user) return res.status(401).json({ message: "Not authenticated" });
    res.json({ user });
  });

  // Hire / post a job - protected route
  app.post("/api/hire", async (req: Request, res) => {
    const user = (req.session as any)?.user;
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    try {
      const job = req.body;
      // minimal validation: title required
      if (!job || !job.title) {
        return res.status(400).json({ message: "title is required" });
      }

      // If a companyId wasn't provided, allow creating a new company from supplied fields
      let companyId = job.companyId;
      if (!companyId) {
        const maybeCompany = (job.company as any) || (job.companyName ? { name: job.companyName } : null);
        if (maybeCompany && maybeCompany.name) {
          const newCompany = await storage.createCompany({
            name: String(maybeCompany.name),
            description: maybeCompany.description || null,
            website: maybeCompany.website || null,
            industry: maybeCompany.industry || null,
            size: maybeCompany.size || null,
          } as any);
          companyId = newCompany.id;
        }
      }

      const toCreate: any = {
        ...job,
        companyId: companyId ?? null,
        id: job.id || randomUUID(),
        createdAt: new Date(),
        postedAt: new Date(),
        isActive: job.isActive === undefined ? true : !!job.isActive,
      };

      // Normalize arrays
      if (typeof toCreate.requirements === "string") {
        toCreate.requirements = toCreate.requirements.split(/\r?\n|,\s*/).map((s: string) => s.trim()).filter(Boolean);
      }
      if (typeof toCreate.benefits === "string") {
        toCreate.benefits = toCreate.benefits.split(/\r?\n|,\s*/).map((s: string) => s.trim()).filter(Boolean);
      }

      const created = await storage.createJob(toCreate as any);
      res.status(201).json(created);
    } catch (err) {
      console.error("Error posting job:", err);
      res.status(500).json({ message: "Failed to post job" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
