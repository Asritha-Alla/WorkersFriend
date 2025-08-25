import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ArrowLeft, ArrowRight } from "lucide-react";
import type { JobWithDetails } from "@shared/schema";

const JOBS_PER_PAGE = 20;

export default function Jobs() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  
  const [searchTerm, setSearchTerm] = useState(params.get("search") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    cityId: params.get("cityId") || "",
    categoryId: params.get("categoryId") || "",
    qualificationId: params.get("qualificationId") || "",
    jobTypeId: params.get("jobTypeId") || "",
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const { data, isLoading, error } = useQuery<{ jobs: JobWithDetails[]; total: number }>({
    queryKey: ["/api/jobs", {
      search: searchTerm || undefined,
      cityId: filters.cityId || undefined,
      categoryId: filters.categoryId || undefined,
      qualificationId: filters.qualificationId || undefined,
      jobTypeId: filters.jobTypeId || undefined,
      limit: JOBS_PER_PAGE,
      offset: (currentPage - 1) * JOBS_PER_PAGE,
    }],
  });

  const jobs = data?.jobs || [];
  const totalJobs = data?.total || 0;
  const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the query key change
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === "all" ? "" : value,
    }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Jobs</h2>
            <p className="text-gray-600">Please try again later or contact support.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8" data-testid="jobs-search-section">
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search jobs, companies, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-job-search"
              />
            </div>
            <Button type="submit" className="btn-jobhai-primary" data-testid="button-search">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters
              selectedCity={filters.cityId}
              selectedCategory={filters.categoryId}
              selectedQualification={filters.qualificationId}
              selectedJobType={filters.jobTypeId}
              onCityChange={(value) => handleFilterChange("cityId", value)}
              onCategoryChange={(value) => handleFilterChange("categoryId", value)}
              onQualificationChange={(value) => handleFilterChange("qualificationId", value)}
              onJobTypeChange={(value) => handleFilterChange("jobTypeId", value)}
            />
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6" data-testid="jobs-results-header">
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="text-jobs-title">
                  Job Opportunities
                </h1>
                <p className="text-gray-600" data-testid="text-jobs-count">
                  {isLoading ? "Loading..." : `${totalJobs.toLocaleString()} jobs found`}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-6" data-testid="jobs-loading">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <div>
                          <Skeleton className="h-5 w-48 mb-2" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-9 w-24 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Jobs Grid */}
            {!isLoading && jobs.length > 0 && (
              <div className="space-y-6" data-testid="jobs-list">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && jobs.length === 0 && (
              <div className="text-center py-12" data-testid="jobs-empty-state">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more results.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      cityId: "",
                      categoryId: "",
                      qualificationId: "",
                      jobTypeId: "",
                    });
                  }}
                  className="btn-jobhai-primary"
                  data-testid="button-clear-filters"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8" data-testid="jobs-pagination">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  data-testid="button-previous-page"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex items-center space-x-2">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    if (page > totalPages) return null;
                    
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "btn-jobhai-primary" : ""}
                        data-testid={`button-page-${page}`}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  data-testid="button-next-page"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
