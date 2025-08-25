import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cities = pgTable("cities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  state: text("state").notNull(),
  jobCount: integer("job_count").default(0),
  imageUrl: text("image_url"),
});

export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logo: text("logo"),
  description: text("description"),
  website: text("website"),
  industry: text("industry"),
  size: text("size"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobCategories = pgTable("job_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  icon: text("icon"),
  jobCount: integer("job_count").default(0),
});

export const qualifications = pgTable("qualifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  level: integer("level"),
  jobCount: integer("job_count").default(0),
});

export const jobTypes = pgTable("job_types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  icon: text("icon"),
  jobCount: integer("job_count").default(0),
});

export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  companyId: varchar("company_id").references(() => companies.id),
  cityId: varchar("city_id").references(() => cities.id),
  categoryId: varchar("category_id").references(() => jobCategories.id),
  qualificationId: varchar("qualification_id").references(() => qualifications.id),
  jobTypeId: varchar("job_type_id").references(() => jobTypes.id),
  salaryMin: integer("salary_min"),
  salaryMax: integer("salary_max"),
  experience: text("experience"),
  location: text("location").notNull(),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  contactPhone: text("contact_phone"),
  contactEmail: text("contact_email"),
  requirements: jsonb("requirements").$type<string[]>(),
  benefits: jsonb("benefits").$type<string[]>(),
  postedAt: timestamp("posted_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobApplications = pgTable("job_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").references(() => jobs.id),
  applicantName: text("applicant_name").notNull(),
  applicantEmail: text("applicant_email").notNull(),
  applicantPhone: text("applicant_phone").notNull(),
  resume: text("resume"),
  coverLetter: text("cover_letter"),
  status: text("status").default("pending"),
  appliedAt: timestamp("applied_at").defaultNow(),
});

// Insert schemas
export const insertCitySchema = createInsertSchema(cities).omit({
  id: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertJobCategorySchema = createInsertSchema(jobCategories).omit({
  id: true,
});

export const insertQualificationSchema = createInsertSchema(qualifications).omit({
  id: true,
});

export const insertJobTypeSchema = createInsertSchema(jobTypes).omit({
  id: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
  postedAt: true,
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  appliedAt: true,
});

// Types
export type City = typeof cities.$inferSelect;
export type InsertCity = z.infer<typeof insertCitySchema>;

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

export type JobCategory = typeof jobCategories.$inferSelect;
export type InsertJobCategory = z.infer<typeof insertJobCategorySchema>;

export type Qualification = typeof qualifications.$inferSelect;
export type InsertQualification = z.infer<typeof insertQualificationSchema>;

export type JobType = typeof jobTypes.$inferSelect;
export type InsertJobType = z.infer<typeof insertJobTypeSchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type JobApplication = typeof jobApplications.$inferSelect;
export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;

// Extended types for API responses
export type JobWithDetails = Job & {
  company: Company | null;
  city: City | null;
  category: JobCategory | null;
  qualification: Qualification | null;
  jobType: JobType | null;
};
