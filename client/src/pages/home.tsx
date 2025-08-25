import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import JobCard from "@/components/JobCard";
import CompanyCard from "@/components/CompanyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, MapPin, Phone, Handshake } from "lucide-react";
import type { City, Company, JobCategory, Qualification, JobType, JobWithDetails } from "@shared/schema";

export default function Home() {
  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const { data: companies = [] } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  const { data: categories = [] } = useQuery<JobCategory[]>({
    queryKey: ["/api/job-categories"],
  });

  const { data: qualifications = [] } = useQuery<Qualification[]>({
    queryKey: ["/api/qualifications"],
  });

  const { data: jobTypes = [] } = useQuery<JobType[]>({
    queryKey: ["/api/job-types"],
  });

  const { data: recentJobs = [] } = useQuery<JobWithDetails[]>({
    queryKey: ["/api/jobs/recent"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="jobhai-gradient-light py-16" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Professional workers in various industries" 
                className="w-full h-64 object-cover rounded-xl shadow-lg"
                data-testid="img-hero-workers-1"
              />
            </div>
            <div className="text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight" data-testid="text-hero-title">
                Find local jobs with 
                <span className="text-jobhai-green"> better salary!</span>
              </h1>
              <p className="text-lg text-gray-600" data-testid="text-hero-subtitle">
                Call from HR directly to fix interview for <span className="font-semibold text-jobhai-green">FREE</span>
              </p>
              <Button 
                className="btn-jobhai-primary px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 shadow-lg" 
                asChild
                data-testid="button-get-job-now"
              >
                <Link href="/jobs">Get a Job Now</Link>
              </Button>
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300" 
                alt="Diverse group of professionals smiling" 
                className="hidden md:block w-full h-48 object-cover rounded-xl shadow-lg mt-8"
                data-testid="img-hero-workers-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16 bg-white" data-testid="cities-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="text-cities-title">
              Explore jobs in 400+ cities
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {cities.slice(0, 5).map((city) => (
              <Link 
                key={city.id} 
                href={`/jobs?city=${city.name.toLowerCase()}`}
                className="city-card"
                data-testid={`city-card-${city.id}`}
              >
                <img 
                  src={city.imageUrl || "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"} 
                  alt={`${city.name} landmarks`}
                  className="w-full h-32 object-cover rounded-t-xl"
                  data-testid={`img-city-${city.id}`}
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-jobhai-blue transition-colors" data-testid={`text-city-name-${city.id}`}>
                    {city.name}
                  </h3>
                  <p className="text-jobhai-green text-sm font-medium" data-testid={`text-job-count-${city.id}`}>
                    {(city.jobCount || 0).toLocaleString()}+ Jobs
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="ghost" 
              className="text-jobhai-blue hover:text-jobhai-green font-medium" 
              asChild
              data-testid="button-view-all-cities"
            >
              <Link href="/jobs">
                View all cities <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 jobhai-gradient text-white" data-testid="trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 flex items-center justify-center gap-2" data-testid="text-trust-title">
            More than 2 Crore+ Indians trust FriendlyWorker <Handshake className="h-8 w-8" />
          </h2>
          <Button 
            className="bg-white text-jobhai-blue px-8 py-3 rounded-xl font-semibold hover:bg-gray-100" 
            asChild
            data-testid="button-register-now"
          >
            <Link href="/jobs">Register Now</Link>
          </Button>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center" data-testid="trust-feature-verified">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% FREE & Verified Jobs</h3>
            </div>
            <div className="text-center" data-testid="trust-feature-local">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Best jobs in your locality</h3>
            </div>
            <div className="text-center" data-testid="trust-feature-direct">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Direct calls with HR for interview</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 bg-white" data-testid="companies-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" data-testid="text-companies-title">
            Featured companies hiring now
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {companies.slice(0, 5).map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="ghost" 
              className="text-jobhai-blue hover:text-jobhai-green font-medium" 
              asChild
              data-testid="button-show-more-companies"
            >
              <Link href="/companies">
                Show more companies <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Job Search Interface */}
      <section className="py-16 bg-white" data-testid="search-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="jobhai-gradient rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-6" data-testid="text-search-title">
              Start Your Job Search Today!
            </h2>
            <p className="text-lg mb-8 opacity-90" data-testid="text-search-subtitle">
              Find the perfect job that matches your skills and location
            </p>
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-gray-50" data-testid="categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" data-testid="text-categories-title">
            What kind of a role do you want?
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.slice(0, 12).map((category) => (
              <Link 
                key={category.id} 
                href={`/jobs?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="category-card"
                data-testid={`category-card-${category.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-jobhai-green/10 rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-jobhai-green rounded" data-testid={`icon-category-${category.id}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-jobhai-blue transition-colors" data-testid={`text-category-name-${category.id}`}>
                        {category.name}
                      </h3>
                      <p className="text-sm text-jobhai-green font-medium" data-testid={`text-category-count-${category.id}`}>
                        {(category.jobCount || 0).toLocaleString()}+ Vacancies
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="text-gray-400 group-hover:text-jobhai-blue transition-colors h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="ghost" 
              className="text-jobhai-blue hover:text-jobhai-green font-medium" 
              asChild
              data-testid="button-show-all-roles"
            >
              <Link href="/jobs">
                Show all job roles <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-16 bg-white" data-testid="qualifications-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" data-testid="text-qualifications-title">
            What is your Qualification?
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualifications.map((qualification) => (
              <Link
                key={qualification.id}
                href={`/jobs?qualification=${qualification.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="jobhai-gradient-light rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group border hover:border-jobhai-blue"
                data-testid={`qualification-card-${qualification.id}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-jobhai-blue rounded-full flex items-center justify-center text-white">
                    <div className="w-6 h-6 bg-white rounded" data-testid={`icon-qualification-${qualification.id}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-jobhai-blue transition-colors text-lg" data-testid={`text-qualification-name-${qualification.id}`}>
                      {qualification.name}
                    </h3>
                    <p className="text-jobhai-green font-medium" data-testid={`text-qualification-count-${qualification.id}`}>
                      {(qualification.jobCount || 0).toLocaleString()}+ Vacancies
                    </p>
                    <ArrowRight className="text-gray-400 group-hover:text-jobhai-blue transition-colors mt-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Job Types Section */}
      <section className="py-16 bg-gray-50" data-testid="job-types-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" data-testid="text-job-types-title">
            What type of job do you want?
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobTypes.map((jobType) => (
              <Link
                key={jobType.id}
                href={`/jobs?type=${jobType.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group text-center border hover:border-jobhai-blue"
                data-testid={`job-type-card-${jobType.id}`}
              >
                <div className="w-20 h-20 mx-auto mb-4 jobhai-gradient rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded" data-testid={`icon-job-type-${jobType.id}`} />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-jobhai-blue transition-colors text-lg mb-2" data-testid={`text-job-type-name-${jobType.id}`}>
                  {jobType.name}
                </h3>
                <p className="text-jobhai-green font-medium" data-testid={`text-job-type-count-${jobType.id}`}>
                  {(jobType.jobCount || 0).toLocaleString()}+ Vacancies
                </p>
                <ArrowRight className="text-gray-400 group-hover:text-jobhai-blue transition-colors mt-4 h-4 w-4 mx-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="py-16 bg-white" data-testid="recent-jobs-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900" data-testid="text-recent-jobs-title">
              Recent Job Openings
            </h2>
            <Button 
              variant="ghost" 
              className="text-jobhai-blue hover:text-jobhai-green font-medium" 
              asChild
              data-testid="button-view-all-jobs"
            >
              <Link href="/jobs">
                View All Jobs <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {recentJobs.slice(0, 4).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
