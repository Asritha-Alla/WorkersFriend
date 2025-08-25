import {
  type City,
  type InsertCity,
  type Company,
  type InsertCompany,
  type JobCategory,
  type InsertJobCategory,
  type Qualification,
  type InsertQualification,
  type JobType,
  type InsertJobType,
  type Job,
  type InsertJob,
  type JobApplication,
  type InsertJobApplication,
  type JobWithDetails,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { MongoClient } from "mongodb";

export interface IStorage {
  // Cities
  getCities(): Promise<City[]>;
  getCity(id: string): Promise<City | undefined>;
  createCity(city: InsertCity): Promise<City>;

  // Companies
  getCompanies(): Promise<Company[]>;
  getCompany(id: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;

  // Job Categories
  getJobCategories(): Promise<JobCategory[]>;
  getJobCategory(id: string): Promise<JobCategory | undefined>;
  createJobCategory(category: InsertJobCategory): Promise<JobCategory>;

  // Qualifications
  getQualifications(): Promise<Qualification[]>;
  getQualification(id: string): Promise<Qualification | undefined>;
  createQualification(qualification: InsertQualification): Promise<Qualification>;

  // Job Types
  getJobTypes(): Promise<JobType[]>;
  getJobType(id: string): Promise<JobType | undefined>;
  createJobType(jobType: InsertJobType): Promise<JobType>;

  // Jobs
  getJobs(filters?: {
    cityId?: string;
    categoryId?: string;
    qualificationId?: string;
    jobTypeId?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ jobs: JobWithDetails[]; total: number }>;
  getJob(id: string): Promise<JobWithDetails | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  getFeaturedJobs(): Promise<JobWithDetails[]>;
  getRecentJobs(limit?: number): Promise<JobWithDetails[]>;

  // Job Applications
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getJobApplications(jobId: string): Promise<JobApplication[]>;
}

export class MemStorage implements IStorage {
  private cities: Map<string, City> = new Map();
  private companies: Map<string, Company> = new Map();
  private jobCategories: Map<string, JobCategory> = new Map();
  private qualifications: Map<string, Qualification> = new Map();
  private jobTypes: Map<string, JobType> = new Map();
  private jobs: Map<string, Job> = new Map();
  private jobApplications: Map<string, JobApplication> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize cities
    const cities = [
      { name: "Mumbai", state: "Maharashtra", jobCount: 20000, imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
      { name: "Delhi", state: "Delhi", jobCount: 20000, imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
      { name: "Bangalore", state: "Karnataka", jobCount: 15000, imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
      { name: "Chennai", state: "Tamil Nadu", jobCount: 8000, imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
      { name: "Hyderabad", state: "Telangana", jobCount: 8000, imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    ];

    cities.forEach(city => {
      const id = randomUUID();
      this.cities.set(id, { ...city, id });
    });

    // Initialize companies
    const companies = [
      { name: "Delhivery", logo: "truck", description: "Leading logistics company", industry: "Logistics", size: "10000+" },
      { name: "Urban Company", logo: "tools", description: "Home services platform", industry: "Services", size: "5000+" },
      { name: "Uber", logo: "car", description: "Ride-hailing service", industry: "Transportation", size: "50000+" },
      { name: "BigBasket", logo: "shopping-basket", description: "Online grocery delivery", industry: "E-commerce", size: "10000+" },
      { name: "Blinkit", logo: "shipping-fast", description: "Quick commerce delivery", industry: "E-commerce", size: "5000+" },
      { name: "Zomato", logo: "utensils", description: "Food delivery platform", industry: "Food Tech", size: "20000+" },
      { name: "Amazon", logo: "box", description: "E-commerce giant", industry: "E-commerce", size: "100000+" },
      { name: "HDFC Bank", logo: "university", description: "Leading private bank", industry: "Banking", size: "100000+" },
      { name: "TCS", logo: "laptop", description: "IT services and consulting", industry: "IT", size: "500000+" },
    ];

    companies.forEach(company => {
      const id = randomUUID();
      this.companies.set(id, { ...company, id, website: `https://${company.name.toLowerCase().replace(' ', '')}.com`, createdAt: new Date() });
    });

    // Initialize job categories
    const categories = [
      { name: "Delivery", icon: "shipping-fast", jobCount: 1200000 },
      { name: "Driver", icon: "car", jobCount: 200000 },
      { name: "Warehouse / Logistics", icon: "warehouse", jobCount: 310000 },
      { name: "Manufacturing", icon: "industry", jobCount: 40000 },
      { name: "Customer Support", icon: "headset", jobCount: 350000 },
      { name: "Sales", icon: "chart-line", jobCount: 240000 },
      { name: "IT / Software", icon: "laptop-code", jobCount: 10000 },
      { name: "Accountant", icon: "calculator", jobCount: 30000 },
      { name: "Marketing", icon: "bullhorn", jobCount: 25000 },
      { name: "Security Guard", icon: "shield-alt", jobCount: 50000 },
      { name: "Housekeeping", icon: "broom", jobCount: 70000 },
      { name: "Cook / Chef", icon: "utensils", jobCount: 20000 },
    ];

    categories.forEach(category => {
      const id = randomUUID();
      this.jobCategories.set(id, { ...category, id });
    });

    // Initialize qualifications
    const qualifications = [
      { name: "Below 10th", level: 1, jobCount: 2120000 },
      { name: "10th Pass", level: 2, jobCount: 370000 },
      { name: "12th Pass", level: 3, jobCount: 710000 },
      { name: "Diploma", level: 4, jobCount: 60000 },
      { name: "Graduate", level: 5, jobCount: 480000 },
      { name: "Post Graduate", level: 6, jobCount: 20000 },
    ];

    qualifications.forEach(qualification => {
      const id = randomUUID();
      this.qualifications.set(id, { ...qualification, id });
    });

    // Initialize job types
    const jobTypes = [
      { name: "Work from home", icon: "home", jobCount: 110000 },
      { name: "Part Time", icon: "clock", jobCount: 720000 },
      { name: "Jobs for Women", icon: "venus", jobCount: 260000 },
      { name: "Fresher jobs", icon: "seedling", jobCount: 630000 },
      { name: "Full Time", icon: "briefcase", jobCount: 1500000 },
    ];

    jobTypes.forEach(jobType => {
      const id = randomUUID();
      this.jobTypes.set(id, { ...jobType, id });
    });

    // Initialize sample jobs
    this.initializeJobs();
  }

  private initializeJobs() {
    const cityIds = Array.from(this.cities.keys());
    const companyIds = Array.from(this.companies.keys());
    const categoryIds = Array.from(this.jobCategories.keys());
    const qualificationIds = Array.from(this.qualifications.keys());
    const jobTypeIds = Array.from(this.jobTypes.keys());

    const sampleJobs = [
      {
        title: "Delivery Executive",
        description: "Looking for dedicated delivery executives for food delivery. Must have own vehicle and valid driving license.",
        location: "Mumbai, Maharashtra",
        salaryMin: 15000,
        salaryMax: 20000,
        experience: "0-1 years",
        requirements: ["Own vehicle", "Valid driving license", "Good communication skills"],
        benefits: ["Fuel allowance", "Incentives", "Flexible hours"],
        contactPhone: "+91 9876543210",
        isActive: true,
        isFeatured: true,
      },
      {
        title: "Customer Support Executive",
        description: "Handle customer inquiries via phone and chat. Excellent communication skills required. Training provided.",
        location: "Remote",
        salaryMin: 18000,
        salaryMax: 25000,
        experience: "0-2 years",
        requirements: ["Good English communication", "Computer literacy", "Problem-solving skills"],
        benefits: ["Work from home", "Health insurance", "Paid training"],
        contactPhone: "+91 9876543211",
        isActive: true,
        isFeatured: true,
      },
      {
        title: "Sales Executive",
        description: "Sell banking products and services to customers. Meet monthly targets and build customer relationships.",
        location: "Delhi, NCR",
        salaryMin: 20000,
        salaryMax: 30000,
        experience: "1-3 years",
        requirements: ["Sales experience", "Target-oriented", "Customer relationship skills"],
        benefits: ["Commission", "Travel allowance", "Career growth"],
        contactPhone: "+91 9876543212",
        isActive: true,
        isFeatured: false,
      },
      {
        title: "Web Developer",
        description: "Develop and maintain web applications using modern technologies. 2+ years experience required.",
        location: "Bangalore, Karnataka",
        salaryMin: 35000,
        salaryMax: 50000,
        experience: "2-5 years",
        requirements: ["React/Node.js", "JavaScript", "HTML/CSS", "Git"],
        benefits: ["Health insurance", "Flexible hours", "Learning budget"],
        contactPhone: "+91 9876543213",
        isActive: true,
        isFeatured: true,
      },
    ];

    sampleJobs.forEach((job, index) => {
      const id = randomUUID();
      const cityId = cityIds[index % cityIds.length];
      const companyId = companyIds[index % companyIds.length];
      const categoryId = categoryIds[index % categoryIds.length];
      const qualificationId = qualificationIds[index % qualificationIds.length];
      const jobTypeId = jobTypeIds[index % jobTypeIds.length];

      this.jobs.set(id, {
        ...job,
        id,
        cityId,
        companyId,
        categoryId,
        qualificationId,
        jobTypeId,
        contactEmail: `hr@company${index}.com`,
        postedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last 7 days
        createdAt: new Date(),
      });
    });
  }

  // Cities
  async getCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }

  async getCity(id: string): Promise<City | undefined> {
    return this.cities.get(id);
  }

  async createCity(city: InsertCity): Promise<City> {
    const id = randomUUID();
    const newCity: City = { 
      ...city, 
      id, 
      jobCount: city.jobCount ?? 0,
      imageUrl: city.imageUrl ?? null
    };
    this.cities.set(id, newCity);
    return newCity;
  }

  // Companies
  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const newCompany: Company = { 
      ...company, 
      id, 
      createdAt: new Date(),
      size: company.size ?? null,
      description: company.description ?? null,
      logo: company.logo ?? null,
      website: company.website ?? null,
      industry: company.industry ?? null
    };
    this.companies.set(id, newCompany);
    return newCompany;
  }

  // Job Categories
  async getJobCategories(): Promise<JobCategory[]> {
    return Array.from(this.jobCategories.values());
  }

  async getJobCategory(id: string): Promise<JobCategory | undefined> {
    return this.jobCategories.get(id);
  }

  async createJobCategory(category: InsertJobCategory): Promise<JobCategory> {
    const id = randomUUID();
    const newCategory: JobCategory = { 
      ...category, 
      id, 
      jobCount: category.jobCount ?? 0,
      icon: category.icon ?? null
    };
    this.jobCategories.set(id, newCategory);
    return newCategory;
  }

  // Qualifications
  async getQualifications(): Promise<Qualification[]> {
    return Array.from(this.qualifications.values());
  }

  async getQualification(id: string): Promise<Qualification | undefined> {
    return this.qualifications.get(id);
  }

  async createQualification(qualification: InsertQualification): Promise<Qualification> {
    const id = randomUUID();
    const newQualification: Qualification = { 
      ...qualification, 
      id, 
      jobCount: qualification.jobCount ?? 0,
      level: qualification.level ?? null
    };
    this.qualifications.set(id, newQualification);
    return newQualification;
  }

  // Job Types
  async getJobTypes(): Promise<JobType[]> {
    return Array.from(this.jobTypes.values());
  }

  async getJobType(id: string): Promise<JobType | undefined> {
    return this.jobTypes.get(id);
  }

  async createJobType(jobType: InsertJobType): Promise<JobType> {
    const id = randomUUID();
    const newJobType: JobType = { 
      ...jobType, 
      id, 
      jobCount: jobType.jobCount ?? 0,
      icon: jobType.icon ?? null
    };
    this.jobTypes.set(id, newJobType);
    return newJobType;
  }

  // Jobs
  async getJobs(filters: {
    cityId?: string;
    categoryId?: string;
    qualificationId?: string;
    jobTypeId?: string;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ jobs: JobWithDetails[]; total: number }> {
    let filteredJobs = Array.from(this.jobs.values()).filter(job => job.isActive);

    if (filters.cityId) {
      filteredJobs = filteredJobs.filter(job => job.cityId === filters.cityId);
    }

    if (filters.categoryId) {
      filteredJobs = filteredJobs.filter(job => job.categoryId === filters.categoryId);
    }

    if (filters.qualificationId) {
      filteredJobs = filteredJobs.filter(job => job.qualificationId === filters.qualificationId);
    }

    if (filters.jobTypeId) {
      filteredJobs = filteredJobs.filter(job => job.jobTypeId === filters.jobTypeId);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower)
      );
    }

    // Sort by posted date (newest first)
    filteredJobs.sort((a, b) => (b.postedAt?.getTime() || 0) - (a.postedAt?.getTime() || 0));

    const total = filteredJobs.length;
    const offset = filters.offset || 0;
    const limit = filters.limit || 20;

    const paginatedJobs = filteredJobs.slice(offset, offset + limit);

    const jobsWithDetails: JobWithDetails[] = paginatedJobs.map(job => ({
      ...job,
      company: job.companyId ? this.companies.get(job.companyId) || null : null,
      city: job.cityId ? this.cities.get(job.cityId) || null : null,
      category: job.categoryId ? this.jobCategories.get(job.categoryId) || null : null,
      qualification: job.qualificationId ? this.qualifications.get(job.qualificationId) || null : null,
      jobType: job.jobTypeId ? this.jobTypes.get(job.jobTypeId) || null : null,
    }));

    return { jobs: jobsWithDetails, total };
  }

  async getJob(id: string): Promise<JobWithDetails | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;

    return {
      ...job,
      company: job.companyId ? this.companies.get(job.companyId) || null : null,
      city: job.cityId ? this.cities.get(job.cityId) || null : null,
      category: job.categoryId ? this.jobCategories.get(job.categoryId) || null : null,
      qualification: job.qualificationId ? this.qualifications.get(job.qualificationId) || null : null,
      jobType: job.jobTypeId ? this.jobTypes.get(job.jobTypeId) || null : null,
    };
  }

  async createJob(job: InsertJob): Promise<Job> {
    const id = randomUUID();
    const newJobObj = {
      id,
      title: job.title,
      description: job.description,
      location: job.location,
      companyId: job.companyId ?? null,
      cityId: job.cityId ?? null,
      categoryId: job.categoryId ?? null,
      qualificationId: job.qualificationId ?? null,
      jobTypeId: job.jobTypeId ?? null,
      salaryMin: (job as any).salaryMin ?? null,
      salaryMax: (job as any).salaryMax ?? null,
      experience: job.experience ?? null,
      isActive: job.isActive ?? true,
      isFeatured: job.isFeatured ?? false,
      contactPhone: job.contactPhone ?? null,
      contactEmail: job.contactEmail ?? null,
      requirements: (job as any).requirements ?? null,
      benefits: (job as any).benefits ?? null,
      postedAt: new Date(),
      createdAt: new Date(),
    };
    const newJob = newJobObj as unknown as Job;
    this.jobs.set(id, newJob);
    return newJob;
  }

  async getFeaturedJobs(): Promise<JobWithDetails[]> {
    const featuredJobs = Array.from(this.jobs.values())
      .filter(job => job.isActive && job.isFeatured)
      .sort((a, b) => (b.postedAt?.getTime() || 0) - (a.postedAt?.getTime() || 0))
      .slice(0, 8);

    return featuredJobs.map(job => ({
      ...job,
      company: job.companyId ? this.companies.get(job.companyId) || null : null,
      city: job.cityId ? this.cities.get(job.cityId) || null : null,
      category: job.categoryId ? this.jobCategories.get(job.categoryId) || null : null,
      qualification: job.qualificationId ? this.qualifications.get(job.qualificationId) || null : null,
      jobType: job.jobTypeId ? this.jobTypes.get(job.jobTypeId) || null : null,
    }));
  }

  async getRecentJobs(limit: number = 6): Promise<JobWithDetails[]> {
    const recentJobs = Array.from(this.jobs.values())
      .filter(job => job.isActive)
      .sort((a, b) => (b.postedAt?.getTime() || 0) - (a.postedAt?.getTime() || 0))
      .slice(0, limit);

    return recentJobs.map(job => ({
      ...job,
      company: job.companyId ? this.companies.get(job.companyId) || null : null,
      city: job.cityId ? this.cities.get(job.cityId) || null : null,
      category: job.categoryId ? this.jobCategories.get(job.categoryId) || null : null,
      qualification: job.qualificationId ? this.qualifications.get(job.qualificationId) || null : null,
      jobType: job.jobTypeId ? this.jobTypes.get(job.jobTypeId) || null : null,
    }));
  }

  // Job Applications
  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const id = randomUUID();
    const newApplication: JobApplication = {
      ...application,
      id,
      status: application.status ?? "pending",
      appliedAt: new Date(),
      resume: application.resume ?? null,
      jobId: application.jobId ?? null,
      coverLetter: application.coverLetter ?? null
    };
    this.jobApplications.set(id, newApplication);
    return newApplication;
  }

  async getJobApplications(jobId: string): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values())
      .filter(application => application.jobId === jobId)
      .sort((a, b) => (b.appliedAt?.getTime() || 0) - (a.appliedAt?.getTime() || 0));
  }
}

/**
 * Mongo-backed storage implementation. Methods wait for the client connection
 * when necessary. Documents use a string `id` field (not ObjectId) to keep
 * compatibility with the rest of the code.
 */
class MongoStorage implements IStorage {
  private clientPromise: Promise<any> | null;
  private dbName: string;

  constructor() {
    if (!process.env.MONGODB_URI) {
      this.clientPromise = null;
      this.dbName = "jobhai";
      return;
    }

    this.clientPromise = MongoClient.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
    });
    // allow overriding DB name via env
    this.dbName = process.env.MONGODB_DBNAME || "jobhai";
  }

  private async db() {
    if (!this.clientPromise) throw new Error("MONGODB_URI not set");
    const client = await this.clientPromise;
    return client.db(this.dbName);
  }

  // helper to ensure collections exist and have indexes
  private async ensure() {
    const database = await this.db();
    // create indexes for id field to be unique
    await Promise.all([
      database.collection("cities").createIndex({ id: 1 }, { unique: true }),
      database.collection("companies").createIndex({ id: 1 }, { unique: true }),
      database.collection("jobCategories").createIndex({ id: 1 }, { unique: true }),
      database.collection("qualifications").createIndex({ id: 1 }, { unique: true }),
      database.collection("jobTypes").createIndex({ id: 1 }, { unique: true }),
      database.collection("jobs").createIndex({ id: 1 }, { unique: true }),
      database.collection("jobApplications").createIndex({ id: 1 }, { unique: true }),
    ]);
  }

  // Cities
  async getCities(): Promise<City[]> {
    const database = await this.db();
    return database.collection("cities").find().toArray() as Promise<City[]>;
  }

  async getCity(id: string): Promise<City | undefined> {
    const database = await this.db();
    return (await database.collection("cities").findOne({ id })) as City | undefined;
  }

  async createCity(city: InsertCity): Promise<City> {
    const database = await this.db();
    const id = randomUUID();
    const newCity: City = { ...city, id, jobCount: city.jobCount ?? 0, imageUrl: city.imageUrl ?? null } as City;
    await database.collection("cities").insertOne(newCity);
    return newCity;
  }

  // Companies
  async getCompanies(): Promise<Company[]> {
    const database = await this.db();
    return database.collection("companies").find().toArray() as Promise<Company[]>;
  }

  async getCompany(id: string): Promise<Company | undefined> {
    const database = await this.db();
    return (await database.collection("companies").findOne({ id })) as Company | undefined;
  }

  async createCompany(company: InsertCompany): Promise<Company> {
    const database = await this.db();
    const id = randomUUID();
    const newCompany: Company = { ...company, id, createdAt: new Date(), size: company.size ?? null, description: company.description ?? null, logo: company.logo ?? null, website: company.website ?? null, industry: company.industry ?? null } as Company;
    await database.collection("companies").insertOne(newCompany);
    return newCompany;
  }

  // Job Categories
  async getJobCategories(): Promise<JobCategory[]> {
    const database = await this.db();
    return database.collection("jobCategories").find().toArray() as Promise<JobCategory[]>;
  }

  async getJobCategory(id: string): Promise<JobCategory | undefined> {
    const database = await this.db();
    return (await database.collection("jobCategories").findOne({ id })) as JobCategory | undefined;
  }

  async createJobCategory(category: InsertJobCategory): Promise<JobCategory> {
    const database = await this.db();
    const id = randomUUID();
    const newCategory: JobCategory = { ...category, id, jobCount: category.jobCount ?? 0, icon: category.icon ?? null } as JobCategory;
    await database.collection("jobCategories").insertOne(newCategory);
    return newCategory;
  }

  // Qualifications
  async getQualifications(): Promise<Qualification[]> {
    const database = await this.db();
    return database.collection("qualifications").find().toArray() as Promise<Qualification[]>;
  }

  async getQualification(id: string): Promise<Qualification | undefined> {
    const database = await this.db();
    return (await database.collection("qualifications").findOne({ id })) as Qualification | undefined;
  }

  async createQualification(qualification: InsertQualification): Promise<Qualification> {
    const database = await this.db();
    const id = randomUUID();
    const newQualification: Qualification = { ...qualification, id, jobCount: qualification.jobCount ?? 0, level: qualification.level ?? null } as Qualification;
    await database.collection("qualifications").insertOne(newQualification);
    return newQualification;
  }

  // Job Types
  async getJobTypes(): Promise<JobType[]> {
    const database = await this.db();
    return database.collection("jobTypes").find().toArray() as Promise<JobType[]>;
  }

  async getJobType(id: string): Promise<JobType | undefined> {
    const database = await this.db();
    return (await database.collection("jobTypes").findOne({ id })) as JobType | undefined;
  }

  async createJobType(jobType: InsertJobType): Promise<JobType> {
    const database = await this.db();
    const id = randomUUID();
    const newJobType: JobType = { ...jobType, id, jobCount: jobType.jobCount ?? 0, icon: jobType.icon ?? null } as JobType;
    await database.collection("jobTypes").insertOne(newJobType);
    return newJobType;
  }

  // Jobs
  async getJobs(filters: {
    cityId?: string;
    categoryId?: string;
    qualificationId?: string;
    jobTypeId?: string;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<{ jobs: JobWithDetails[]; total: number }> {
    const database = await this.db();
    const query: any = { isActive: true };
    if (filters.cityId) query.cityId = filters.cityId;
    if (filters.categoryId) query.categoryId = filters.categoryId;
    if (filters.qualificationId) query.qualificationId = filters.qualificationId;
    if (filters.jobTypeId) query.jobTypeId = filters.jobTypeId;
    if (filters.search) query.$text = { $search: filters.search };

    const cursor = database.collection("jobs").find(query).sort({ postedAt: -1 });
    const total = await cursor.count();
    const offset = filters.offset ?? 0;
    const limit = filters.limit ?? 20;
    const jobs = await cursor.skip(offset).limit(limit).toArray() as Job[];

    // populate related fields
    const companies = database.collection("companies");
    const cities = database.collection("cities");
    const categories = database.collection("jobCategories");
    const qualifications = database.collection("qualifications");
    const jobTypes = database.collection("jobTypes");

    const jobsWithDetails: JobWithDetails[] = await Promise.all(jobs.map(async job => ({
      ...job,
      company: job.companyId ? (await companies.findOne({ id: job.companyId })) as Company : null,
      city: job.cityId ? (await cities.findOne({ id: job.cityId })) as City : null,
      category: job.categoryId ? (await categories.findOne({ id: job.categoryId })) as JobCategory : null,
      qualification: job.qualificationId ? (await qualifications.findOne({ id: job.qualificationId })) as Qualification : null,
      jobType: job.jobTypeId ? (await jobTypes.findOne({ id: job.jobTypeId })) as JobType : null,
    })));

    return { jobs: jobsWithDetails, total };
  }

  async getJob(id: string): Promise<JobWithDetails | undefined> {
    const database = await this.db();
    const job = (await database.collection("jobs").findOne({ id })) as Job | null;
    if (!job) return undefined;
    return {
      ...job,
      company: job.companyId ? (await database.collection("companies").findOne({ id: job.companyId })) as Company : null,
      city: job.cityId ? (await database.collection("cities").findOne({ id: job.cityId })) as City : null,
      category: job.categoryId ? (await database.collection("jobCategories").findOne({ id: job.categoryId })) as JobCategory : null,
      qualification: job.qualificationId ? (await database.collection("qualifications").findOne({ id: job.qualificationId })) as Qualification : null,
      jobType: job.jobTypeId ? (await database.collection("jobTypes").findOne({ id: job.jobTypeId })) as JobType : null,
    };
  }

  async createJob(job: InsertJob): Promise<Job> {
    const database = await this.db();
    const id = randomUUID();
    const newJobObj = {
      id,
      title: job.title,
      description: job.description,
      location: job.location,
      companyId: job.companyId ?? null,
      cityId: job.cityId ?? null,
      categoryId: job.categoryId ?? null,
      qualificationId: job.qualificationId ?? null,
      jobTypeId: job.jobTypeId ?? null,
      salaryMin: (job as any).salaryMin ?? null,
      salaryMax: (job as any).salaryMax ?? null,
      experience: job.experience ?? null,
      isActive: job.isActive ?? true,
      isFeatured: job.isFeatured ?? false,
      contactPhone: job.contactPhone ?? null,
      contactEmail: job.contactEmail ?? null,
      requirements: (job as any).requirements ?? null,
      benefits: (job as any).benefits ?? null,
      postedAt: new Date(),
      createdAt: new Date(),
    };
    const newJob = newJobObj as unknown as Job;
    await database.collection("jobs").insertOne(newJob);
    return newJob;
  }

  async getFeaturedJobs(): Promise<JobWithDetails[]> {
    const database = await this.db();
    const jobs = await database.collection("jobs").find({ isActive: true, isFeatured: true }).sort({ postedAt: -1 }).limit(8).toArray() as Job[];
    return Promise.all(jobs.map(async job => ({
      ...job,
      company: job.companyId ? (await database.collection("companies").findOne({ id: job.companyId })) as Company : null,
      city: job.cityId ? (await database.collection("cities").findOne({ id: job.cityId })) as City : null,
      category: job.categoryId ? (await database.collection("jobCategories").findOne({ id: job.categoryId })) as JobCategory : null,
      qualification: job.qualificationId ? (await database.collection("qualifications").findOne({ id: job.qualificationId })) as Qualification : null,
      jobType: job.jobTypeId ? (await database.collection("jobTypes").findOne({ id: job.jobTypeId })) as JobType : null,
    })));
  }

  async getRecentJobs(limit: number = 6): Promise<JobWithDetails[]> {
    const database = await this.db();
    const jobs = await database.collection("jobs").find({ isActive: true }).sort({ postedAt: -1 }).limit(limit).toArray() as Job[];
    return Promise.all(jobs.map(async job => ({
      ...job,
      company: job.companyId ? (await database.collection("companies").findOne({ id: job.companyId })) as Company : null,
      city: job.cityId ? (await database.collection("cities").findOne({ id: job.cityId })) as City : null,
      category: job.categoryId ? (await database.collection("jobCategories").findOne({ id: job.categoryId })) as JobCategory : null,
      qualification: job.qualificationId ? (await database.collection("qualifications").findOne({ id: job.qualificationId })) as Qualification : null,
      jobType: job.jobTypeId ? (await database.collection("jobTypes").findOne({ id: job.jobTypeId })) as JobType : null,
    })));
  }

  // Job Applications
  async createJobApplication(application: InsertJobApplication): Promise<JobApplication> {
    const database = await this.db();
    const id = randomUUID();
    const newApplication: JobApplication = {
      ...application,
      id,
      status: application.status ?? "pending",
      appliedAt: new Date(),
      resume: application.resume ?? null,
      jobId: application.jobId ?? null,
      coverLetter: application.coverLetter ?? null,
    } as JobApplication;
    await database.collection("jobApplications").insertOne(newApplication);
    return newApplication;
  }

  async getJobApplications(jobId: string): Promise<JobApplication[]> {
    const database = await this.db();
    return database.collection("jobApplications").find({ jobId }).sort({ appliedAt: -1 }).toArray() as Promise<JobApplication[]>;
  }
}

// Export a storage instance that uses Mongo when MONGODB_URI is set; otherwise fall back to in-memory.
export const storage: IStorage = process.env.MONGODB_URI ? new MongoStorage() : new MemStorage();
