import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompanyCard from "@/components/CompanyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Building2, Filter } from "lucide-react";
import type { Company } from "@shared/schema";

export default function Companies() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  
  const [searchTerm, setSearchTerm] = useState(params.get("search") || "");
  const [industryFilter, setIndustryFilter] = useState(params.get("industry") || "all");
  const [sizeFilter, setSizeFilter] = useState(params.get("size") || "all");

  const { data: companies = [], isLoading, error } = useQuery<Company[]>({
    queryKey: ["/api/companies"],
  });

  // Filter companies based on search term and filters
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = !searchTerm || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.description && company.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.industry && company.industry.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesIndustry = industryFilter === "all" || 
      (company.industry && company.industry.toLowerCase() === industryFilter.toLowerCase());

    const matchesSize = sizeFilter === "all" || 
      (company.size && company.size === sizeFilter);

    return matchesSearch && matchesIndustry && matchesSize;
  });

  // Get unique industries for filter dropdown
  const industries = Array.from(new Set(companies.map(c => c.industry).filter(Boolean)));
  const companySizes = Array.from(new Set(companies.map(c => c.size).filter(Boolean)));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the state change
  };

  const clearFilters = () => {
    setSearchTerm("");
    setIndustryFilter("all");
    setSizeFilter("all");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Companies</h2>
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
        {/* Page Header */}
        <div className="text-center mb-8" data-testid="companies-header">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="text-companies-title">
            Featured Companies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-testid="text-companies-subtitle">
            Explore career opportunities with top companies across India. Find the perfect workplace that matches your career goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card data-testid="companies-filters">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filter Companies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Search Companies</label>
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Company name or industry..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        data-testid="input-company-search"
                      />
                    </div>
                  </form>
                </div>

                {/* Industry Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Industry</label>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger data-testid="select-industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry!.toLowerCase()} data-testid={`industry-option-${industry}`}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Size Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Company Size</label>
                  <Select value={sizeFilter} onValueChange={setSizeFilter}>
                    <SelectTrigger data-testid="select-company-size">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sizes</SelectItem>
                      {companySizes.map((size) => (
                        <SelectItem key={size} value={size!} data-testid={`size-option-${size}`}>
                          {size} employees
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                {(searchTerm || industryFilter !== "all" || sizeFilter !== "all") && (
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="w-full"
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Companies Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6" data-testid="companies-results-header">
              <div>
                <h2 className="text-xl font-bold text-gray-900" data-testid="text-companies-found">
                  Companies Found
                </h2>
                <p className="text-gray-600" data-testid="text-companies-count">
                  {isLoading ? "Loading..." : `${filteredCompanies.length} companies available`}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="companies-loading">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-6 text-center border">
                    <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-lg" />
                    <Skeleton className="h-6 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </div>
                ))}
              </div>
            )}

            {/* Companies Grid */}
            {!isLoading && filteredCompanies.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="companies-grid">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredCompanies.length === 0 && (
              <div className="text-center py-12" data-testid="companies-empty-state">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Building2 className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || industryFilter !== "all" || sizeFilter !== "all"
                    ? "Try adjusting your search criteria or filters to find more companies."
                    : "No companies are currently available in our directory."
                  }
                </p>
                {(searchTerm || industryFilter !== "all" || sizeFilter !== "all") && (
                  <Button 
                    onClick={clearFilters}
                    className="btn-jobhai-primary"
                    data-testid="button-clear-filters-empty"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Company Stats Section */}
        {!isLoading && companies.length > 0 && (
          <section className="mt-16 py-12 bg-white rounded-2xl shadow-sm" data-testid="companies-stats">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Statistics</h2>
              <p className="text-gray-600">Overview of companies in our network</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-4" data-testid="stat-total-companies">
                <div className="text-3xl font-bold text-jobhai-blue mb-2">
                  {companies.length}
                </div>
                <div className="text-gray-600">Total Companies</div>
              </div>
              <div className="p-4" data-testid="stat-industries">
                <div className="text-3xl font-bold text-jobhai-green mb-2">
                  {industries.length}
                </div>
                <div className="text-gray-600">Industries</div>
              </div>
              <div className="p-4" data-testid="stat-hiring">
                <div className="text-3xl font-bold text-jobhai-blue mb-2">
                  {companies.length}
                </div>
                <div className="text-gray-600">Actively Hiring</div>
              </div>
              <div className="p-4" data-testid="stat-locations">
                <div className="text-3xl font-bold text-jobhai-green mb-2">
                  400+
                </div>
                <div className="text-gray-600">Cities</div>
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
