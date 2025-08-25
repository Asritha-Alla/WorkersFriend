import { MongoClient } from "mongodb";
import { randomUUID } from "crypto";

async function upsertMany(db: any, collectionName: string, docs: any[]) {
  const col = db.collection(collectionName);
  for (const doc of docs) {
    await col.replaceOne({ id: doc.id }, doc, { upsert: true });
  }
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is required to seed the database. Set it in the environment.");
    process.exit(1);
  }

  const dbName = process.env.MONGODB_DBNAME || "jobhai";
  const client = new MongoClient(uri, { maxPoolSize: 5 });

  try {
    await client.connect();
    const db = client.db(dbName);

    console.log(`Connected to ${uri}, seeding DB '${dbName}'`);

    // sample data (kept small and similar to MemStorage)
    const cities = [
      { name: "Mumbai", state: "Maharashtra", jobCount: 20000, imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
      { name: "Delhi", state: "Delhi", jobCount: 20000, imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
      { name: "Bangalore", state: "Karnataka", jobCount: 15000, imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
      { name: "Chennai", state: "Tamil Nadu", jobCount: 8000, imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
      { name: "Hyderabad", state: "Telangana", jobCount: 8000, imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" },
    ];

    const companies = [
      { name: "Delhivery", logo: "truck", description: "Leading logistics company", industry: "Logistics", size: "10000+" },
      { name: "Urban Company", logo: "tools", description: "Home services platform", industry: "Services", size: "5000+" },
      { name: "Uber", logo: "car", description: "Ride-hailing service", industry: "Transportation", size: "50000+" },
      { name: "BigBasket", logo: "shopping-basket", description: "Online grocery delivery", industry: "E-commerce", size: "10000+" },
      { name: "Blinkit", logo: "shipping-fast", description: "Quick commerce delivery", industry: "E-commerce", size: "5000+" },
    ];

    const jobCategories = [
      { name: "Delivery", icon: "shipping-fast", jobCount: 1200000 },
      { name: "Driver", icon: "car", jobCount: 200000 },
      { name: "Warehouse / Logistics", icon: "warehouse", jobCount: 310000 },
      { name: "Manufacturing", icon: "industry", jobCount: 40000 },
    ];

    const qualifications = [
      { name: "Below 10th", level: 1, jobCount: 2120000 },
      { name: "10th Pass", level: 2, jobCount: 370000 },
      { name: "12th Pass", level: 3, jobCount: 710000 },
    ];

    const jobTypes = [
      { name: "Work from home", icon: "home", jobCount: 110000 },
      { name: "Part Time", icon: "clock", jobCount: 720000 },
      { name: "Full Time", icon: "briefcase", jobCount: 1500000 },
    ];

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
    ];

  // create documents with ids
  const cityDocs = cities.map(c => ({ ...c, id: randomUUID() }));
    const companyDocs = companies.map(c => ({ ...c, id: randomUUID(), website: `https://${c.name.toLowerCase().replace(/ /g, "")}.com`, createdAt: new Date() }));
    const categoryDocs = jobCategories.map(c => ({ ...c, id: randomUUID() }));
    const qualificationDocs = qualifications.map(q => ({ ...q, id: randomUUID() }));
    const jobTypeDocs = jobTypes.map(j => ({ ...j, id: randomUUID() }));

  // upsert base collections
  await upsertMany(db, "cities", cityDocs);
  await upsertMany(db, "companies", companyDocs);
  await upsertMany(db, "jobCategories", categoryDocs);
  await upsertMany(db, "qualifications", qualificationDocs);
  await upsertMany(db, "jobTypes", jobTypeDocs);

  // create jobs referencing created ids
  const jobs = sampleJobs.map((job, i) => {
      const id = randomUUID();
      const cityId = cityDocs[i % cityDocs.length].id;
      const companyId = companyDocs[i % companyDocs.length].id;
      const categoryId = categoryDocs[i % categoryDocs.length].id;
      const qualificationId = qualificationDocs[i % qualificationDocs.length].id;
      const jobTypeId = jobTypeDocs[i % jobTypeDocs.length].id;

      return {
        ...job,
        id,
        cityId,
        companyId,
        categoryId,
        qualificationId,
        jobTypeId,
        contactEmail: `hr@company${i}.com`,
        postedAt: new Date(),
        createdAt: new Date(),
      };
    });

  await upsertMany(db, "jobs", jobs);

    console.log("Seed complete.");
  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
