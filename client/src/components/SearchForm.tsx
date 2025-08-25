import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

export default function SearchForm() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [location, setLocationValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (location.trim()) params.set("location", location.trim());
    
    setLocation(`/jobs?${params.toString()}`);
  };

  const popularSearches = [
    "Delivery Jobs",
    "Driver Jobs", 
    "Sales Jobs",
    "IT Jobs"
  ];

  const handlePopularSearch = (term: string) => {
    setLocation(`/jobs?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto" data-testid="search-form">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Job title or keyword"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-3 border-gray-300 focus:ring-2 focus:ring-jobhai-blue focus:border-transparent text-gray-900"
              data-testid="input-job-search"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocationValue(e.target.value)}
              className="pl-10 pr-4 py-3 border-gray-300 focus:ring-2 focus:ring-jobhai-blue focus:border-transparent text-gray-900"
              data-testid="input-location-search"
            />
          </div>
          <Button 
            type="submit" 
            className="btn-jobhai-primary py-3 px-6 rounded-lg font-semibold"
            data-testid="button-search-jobs"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Jobs
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Popular:</span>
          {popularSearches.map((term, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePopularSearch(term)}
              className="bg-jobhai-blue/10 text-jobhai-blue px-3 py-1 rounded-full text-sm hover:bg-jobhai-blue/20 transition-colors"
              data-testid={`button-popular-search-${index}`}
            >
              {term}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
