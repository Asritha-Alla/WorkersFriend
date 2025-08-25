import type { 
  City, 
  Company, 
  JobCategory, 
  Qualification, 
  JobType, 
  Job,
  InsertCity,
  InsertCompany,
  InsertJobCategory,
  InsertQualification,
  InsertJobType,
  InsertJob
} from "@shared/schema";

// Mock Cities Data
export const mockCities: InsertCity[] = [
  {
    name: "Mumbai",
    state: "Maharashtra",
    jobCount: 20000,
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    name: "Delhi", 
    state: "Delhi",
    jobCount: 20000,
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    name: "Bangalore",
    state: "Karnataka", 
    jobCount: 15000,
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    jobCount: 8000,
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    jobCount: 8000, 
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    name: "Pune",
    state: "Maharashtra",
    jobCount: 12000,
    imageUrl: "https://images.unsplash.com/photo-1595844730037-fee0c3088107?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    name: "Kolkata",
    state: "West Bengal", 
    jobCount: 9000,
    imageUrl: "https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    name: "Ahmedabad",
    state: "Gujarat",
    jobCount: 7000,
    imageUrl: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    jobCount: 5000,
    imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  },
  {
    name: "Surat",
    state: "Gujarat",
    jobCount: 4500,
    imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
  }
];

// Mock Companies Data
export const mockCompanies: InsertCompany[] = [
  {
    name: "Delhivery",
    logo: "truck",
    description: "Leading logistics and supply chain company providing pan-India express parcel delivery services",
    website: "https://www.delhivery.com",
    industry: "Logistics",
    size: "10000+"
  },
  {
    name: "Urban Company",
    logo: "tools", 
    description: "Technology platform that helps skilled professionals connect with users looking for specific services",
    website: "https://www.urbancompany.com",
    industry: "Services",
    size: "5000+"
  },
  {
    name: "Uber",
    logo: "car",
    description: "Global technology platform connecting riders and drivers for convenient transportation solutions",
    website: "https://www.uber.com",
    industry: "Transportation", 
    size: "50000+"
  },
  {
    name: "BigBasket",
    logo: "shopping-basket",
    description: "India's largest online grocery supermarket delivering fresh fruits, vegetables and food items",
    website: "https://www.bigbasket.com",
    industry: "E-commerce",
    size: "10000+"
  },
  {
    name: "Blinkit",
    logo: "shipping-fast",
    description: "Quick commerce platform delivering groceries and essentials in minutes across major Indian cities",
    website: "https://www.blinkit.com", 
    industry: "E-commerce",
    size: "5000+"
  },
  {
    name: "Zomato",
    logo: "utensils",
    description: "Food delivery platform connecting millions of customers with restaurants across India",
    website: "https://www.zomato.com",
    industry: "Food Tech",
    size: "20000+"
  },
  {
    name: "Amazon",
    logo: "box",
    description: "Global e-commerce and cloud computing company with significant operations in India",
    website: "https://www.amazon.in",
    industry: "E-commerce",
    size: "100000+"
  },
  {
    name: "HDFC Bank",
    logo: "university",
    description: "Leading private sector bank in India offering comprehensive banking and financial services",
    website: "https://www.hdfcbank.com",
    industry: "Banking",
    size: "100000+"
  },
  {
    name: "TCS",
    logo: "laptop",
    description: "Global leader in IT services, consulting and business solutions with headquarters in Mumbai",
    website: "https://www.tcs.com",
    industry: "IT",
    size: "500000+"
  },
  {
    name: "Flipkart",
    logo: "shopping-cart",
    description: "Leading Indian e-commerce marketplace offering wide range of products across categories",
    website: "https://www.flipkart.com",
    industry: "E-commerce", 
    size: "50000+"
  },
  {
    name: "Swiggy",
    logo: "motorcycle",
    description: "Food ordering and delivery platform serving customers across 500+ cities in India",
    website: "https://www.swiggy.com",
    industry: "Food Tech",
    size: "15000+"
  },
  {
    name: "Infosys",
    logo: "code",
    description: "Global consulting and IT services company helping clients navigate digital transformation",
    website: "https://www.infosys.com", 
    industry: "IT",
    size: "300000+"
  }
];

// Mock Job Categories Data  
export const mockJobCategories: InsertJobCategory[] = [
  {
    name: "Delivery",
    icon: "shipping-fast",
    jobCount: 1200000
  },
  {
    name: "Driver", 
    icon: "car",
    jobCount: 200000
  },
  {
    name: "Warehouse / Logistics",
    icon: "warehouse", 
    jobCount: 310000
  },
  {
    name: "Manufacturing",
    icon: "industry",
    jobCount: 40000
  },
  {
    name: "Customer Support",
    icon: "headset",
    jobCount: 350000
  },
  {
    name: "Sales",
    icon: "chart-line",
    jobCount: 240000
  },
  {
    name: "IT / Software",
    icon: "laptop-code", 
    jobCount: 10000
  },
  {
    name: "Accountant",
    icon: "calculator",
    jobCount: 30000
  },
  {
    name: "Marketing",
    icon: "bullhorn",
    jobCount: 25000
  },
  {
    name: "Security Guard",
    icon: "shield-alt",
    jobCount: 50000
  },
  {
    name: "Housekeeping",
    icon: "broom", 
    jobCount: 70000
  },
  {
    name: "Cook / Chef",
    icon: "utensils",
    jobCount: 20000
  },
  {
    name: "Peon",
    icon: "user",
    jobCount: 10000
  },
  {
    name: "Technician",
    icon: "wrench",
    jobCount: 20000
  },
  {
    name: "Beautician",
    icon: "scissors",
    jobCount: 10000
  },
  {
    name: "Field Sales",
    icon: "map",
    jobCount: 420000
  }
];

// Mock Qualifications Data
export const mockQualifications: InsertQualification[] = [
  {
    name: "Below 10th",
    level: 1,
    jobCount: 2120000
  },
  {
    name: "10th Pass", 
    level: 2,
    jobCount: 370000
  },
  {
    name: "12th Pass",
    level: 3, 
    jobCount: 710000
  },
  {
    name: "Diploma",
    level: 4,
    jobCount: 60000
  },
  {
    name: "Graduate",
    level: 5,
    jobCount: 480000
  },
  {
    name: "Post Graduate",
    level: 6,
    jobCount: 20000
  }
];

// Mock Job Types Data
export const mockJobTypes: InsertJobType[] = [
  {
    name: "Work from home",
    icon: "home",
    jobCount: 110000
  },
  {
    name: "Part Time",
    icon: "clock", 
    jobCount: 720000
  },
  {
    name: "Jobs for Women",
    icon: "venus",
    jobCount: 260000
  },
  {
    name: "Fresher jobs", 
    icon: "seedling",
    jobCount: 630000
  },
  {
    name: "Full Time",
    icon: "briefcase",
    jobCount: 1500000
  },
  {
    name: "Contract",
    icon: "file-contract",
    jobCount: 85000
  }
];

// Mock Jobs Data
export const mockJobs: Omit<InsertJob, 'cityId' | 'companyId' | 'categoryId' | 'qualificationId' | 'jobTypeId'>[] = [
  {
    title: "Delivery Executive",
    description: "We are looking for dedicated delivery executives to join our food delivery team. The ideal candidate should have their own vehicle and a valid driving license. This role offers flexible working hours and the opportunity to earn attractive incentives based on performance. You will be responsible for picking up orders from restaurants and delivering them to customers in a timely manner while maintaining quality service standards.",
    location: "Mumbai, Maharashtra",
    salaryMin: 15000,
    salaryMax: 20000,
    experience: "0-1 years",
    requirements: ["Own vehicle (bike/scooter)", "Valid driving license", "Good communication skills", "Smartphone with GPS", "Basic English/Hindi"],
    benefits: ["Fuel allowance", "Performance incentives", "Flexible working hours", "Insurance coverage", "Weekly payouts"],
    contactPhone: "+91 9876543210",
    contactEmail: "hr@zomato.com",
    isActive: true,
    isFeatured: true
  },
  {
    title: "Customer Support Executive",
    description: "Join our customer support team to handle customer inquiries via phone, chat, and email. We are looking for candidates with excellent communication skills who can provide solutions to customer problems effectively. Training will be provided for all necessary tools and processes. This is a work-from-home opportunity with competitive salary and growth prospects in the customer service domain.",
    location: "Remote",
    salaryMin: 18000, 
    salaryMax: 25000,
    experience: "0-2 years",
    requirements: ["Excellent English communication", "Computer literacy", "Problem-solving skills", "High-speed internet connection", "Quiet workspace at home"],
    benefits: ["Work from home", "Health insurance", "Paid training", "Career advancement opportunities", "Performance bonuses"],
    contactPhone: "+91 9876543211",
    contactEmail: "careers@amazon.in",
    isActive: true,
    isFeatured: true
  },
  {
    title: "Sales Executive - Banking",
    description: "We are seeking dynamic sales executives to join our banking team. You will be responsible for selling banking products and services to customers, meeting monthly sales targets, and building long-term customer relationships. This role offers excellent career growth opportunities in the banking sector with comprehensive training and support from experienced mentors.",
    location: "Delhi, NCR", 
    salaryMin: 20000,
    salaryMax: 30000,
    experience: "1-3 years",
    requirements: ["Previous sales experience preferred", "Target-oriented mindset", "Customer relationship skills", "Basic knowledge of banking products", "Graduate degree"],
    benefits: ["Performance-based commission", "Travel allowance", "Career growth opportunities", "Medical insurance", "Retirement benefits"],
    contactPhone: "+91 9876543212",
    contactEmail: "recruitment@hdfcbank.com",
    isActive: true,
    isFeatured: false
  },
  {
    title: "Full Stack Web Developer",
    description: "We are looking for an experienced full stack developer to join our technology team. You will be responsible for developing and maintaining web applications using modern technologies including React, Node.js, and databases. The ideal candidate should have strong programming skills and experience with both frontend and backend development. This role offers the opportunity to work on challenging projects and grow your technical expertise.",
    location: "Bangalore, Karnataka",
    salaryMin: 35000,
    salaryMax: 50000, 
    experience: "2-5 years",
    requirements: ["Proficiency in React and Node.js", "JavaScript/TypeScript expertise", "HTML/CSS knowledge", "Git version control", "Database management skills"],
    benefits: ["Health insurance", "Flexible working hours", "Learning and development budget", "Stock options", "Modern work environment"],
    contactPhone: "+91 9876543213",
    contactEmail: "tech-hiring@tcs.com",
    isActive: true,
    isFeatured: true
  },
  {
    title: "Warehouse Associate",
    description: "Join our warehouse team as an associate responsible for inventory management, order picking, packing, and shipping operations. You will ensure accurate processing of customer orders while maintaining warehouse organization and safety standards. This is an entry-level position with opportunities for growth within the logistics industry.",
    location: "Pune, Maharashtra",
    salaryMin: 12000,
    salaryMax: 16000,
    experience: "0-1 years",
    requirements: ["Physical fitness for lifting", "Attention to detail", "Basic computer knowledge", "Team working ability", "10th grade education minimum"],
    benefits: ["Medical coverage", "Transport facility", "Overtime pay", "Annual bonus", "Skill development programs"],
    contactPhone: "+91 9876543214", 
    contactEmail: "warehouse-jobs@delhivery.com",
    isActive: true,
    isFeatured: false
  },
  {
    title: "Digital Marketing Specialist",
    description: "We are seeking a creative digital marketing specialist to develop and execute online marketing campaigns. You will manage social media accounts, create content, analyze campaign performance, and optimize digital advertising efforts. This role is perfect for someone passionate about digital trends and marketing innovation.",
    location: "Mumbai, Maharashtra",
    salaryMin: 25000,
    salaryMax: 40000,
    experience: "1-3 years", 
    requirements: ["Digital marketing certification", "Social media management experience", "Content creation skills", "Analytics tools knowledge", "Creative thinking ability"],
    benefits: ["Creative work environment", "Professional development", "Performance bonuses", "Health insurance", "Work-life balance"],
    contactPhone: "+91 9876543215",
    contactEmail: "marketing-careers@flipkart.com",
    isActive: true,
    isFeatured: true
  },
  {
    title: "Security Guard",
    description: "We are hiring security guards to ensure the safety and security of our corporate premises. Responsibilities include monitoring surveillance equipment, conducting security rounds, controlling access points, and maintaining security logs. Candidates should be alert, responsible, and committed to maintaining a secure environment.",
    location: "Hyderabad, Telangana",
    salaryMin: 14000,
    salaryMax: 18000,
    experience: "0-2 years",
    requirements: ["Security guard certification", "Physical fitness", "Alert and observant nature", "Good moral character", "Basic English communication"],
    benefits: ["Accommodation provided", "Uniform and equipment", "Medical insurance", "Overtime opportunities", "Job security"],
    contactPhone: "+91 9876543216",
    contactEmail: "security-jobs@infosys.com", 
    isActive: true,
    isFeatured: false
  },
  {
    title: "Cook - Restaurant",
    description: "Join our kitchen team as a cook responsible for food preparation, cooking, and maintaining kitchen hygiene standards. You will work under the supervision of head chef to prepare delicious meals for our customers. Experience in Indian cuisine is preferred but training will be provided for the right candidate.",
    location: "Chennai, Tamil Nadu",
    salaryMin: 16000,
    salaryMax: 22000,
    experience: "1-4 years",
    requirements: ["Cooking experience preferred", "Knowledge of food safety", "Ability to work in fast-paced environment", "Team collaboration skills", "Physical stamina"],
    benefits: ["Free meals during shifts", "Skill development", "Performance incentives", "Medical coverage", "Festival bonuses"],
    contactPhone: "+91 9876543217",
    contactEmail: "kitchen-jobs@restaurant.com",
    isActive: true,
    isFeatured: false
  },
  {
    title: "Data Entry Operator", 
    description: "We are looking for detail-oriented data entry operators to input, update, and maintain data in our computer systems. The role requires accuracy, speed, and attention to detail. You will be working with various types of documents and databases while ensuring data quality and integrity.",
    location: "Kolkata, West Bengal",
    salaryMin: 13000,
    salaryMax: 18000,
    experience: "0-2 years",
    requirements: ["Fast and accurate typing skills", "MS Office proficiency", "Attention to detail", "Basic computer knowledge", "12th grade education"],
    benefits: ["Regular working hours", "Skills training", "Career progression", "Medical benefits", "Friendly work environment"],
    contactPhone: "+91 9876543218",
    contactEmail: "dataentry@company.com",
    isActive: true,
    isFeatured: false
  },
  {
    title: "Electrician",
    description: "We need skilled electricians for installation, maintenance, and repair of electrical systems in residential and commercial buildings. Candidates should have knowledge of electrical codes, safety procedures, and troubleshooting techniques. This is an excellent opportunity for experienced electricians to join a growing company.",
    location: "Ahmedabad, Gujarat", 
    salaryMin: 18000,
    salaryMax: 28000,
    experience: "2-5 years",
    requirements: ["ITI in Electrical", "Electrical work experience", "Knowledge of safety protocols", "Problem-solving skills", "Valid electrical license"],
    benefits: ["Tools and equipment provided", "Health insurance", "Skill enhancement training", "Performance bonuses", "Job security"],
    contactPhone: "+91 9876543219",
    contactEmail: "electrical-jobs@construction.com",
    isActive: true,
    isFeatured: false
  }
];

// Helper function to get random items from array
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, array.length));
};

// Helper function to get items by category
export const getJobsByCategory = (categoryName: string, jobs: any[]): any[] => {
  return jobs.filter(job => 
    job.category?.name.toLowerCase().includes(categoryName.toLowerCase())
  );
};

// Helper function to get jobs by location
export const getJobsByLocation = (location: string, jobs: any[]): any[] => {
  return jobs.filter(job => 
    job.location.toLowerCase().includes(location.toLowerCase()) ||
    job.city?.name.toLowerCase().includes(location.toLowerCase())
  );
};

// Export all mock data as a single object for easy importing
export const mockData = {
  cities: mockCities,
  companies: mockCompanies, 
  jobCategories: mockJobCategories,
  qualifications: mockQualifications,
  jobTypes: mockJobTypes,
  jobs: mockJobs
};

export default mockData;
