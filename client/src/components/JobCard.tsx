import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, GraduationCap, Clock, Building } from "lucide-react";
import type { JobWithDetails } from "@shared/schema";

interface JobCardProps {
  job: JobWithDetails;
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return "Salary not disclosed";
    if (min && max) return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
    if (min) return `₹${min.toLocaleString()}+`;
    if (max) return `Up to ₹${max.toLocaleString()}`;
    return "Salary not disclosed";
  };

  const formatPostedTime = (date?: Date | string | null) => {
    if (!date) return "Recently posted";
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "Recently posted";
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return "Recently posted";
  };

  return (
    <div className="job-card" data-testid={`job-card-${job.id}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-jobhai-blue/10 rounded-lg flex items-center justify-center">
            <Building className="text-jobhai-blue h-5 w-5" />
          </div>
          <div>
            <Link href={`/jobs/${job.id}`}>
              <h3 className="font-semibold text-gray-900 group-hover:text-jobhai-blue transition-colors" data-testid={`text-job-title-${job.id}`}>
                {job.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm" data-testid={`text-company-${job.id}`}>
              {job.company?.name || "Company not specified"}
            </p>
          </div>
        </div>
        <Badge 
          variant={job.jobType?.name === "Work from home" ? "secondary" : "outline"} 
          className="bg-jobhai-green/10 text-jobhai-green border-jobhai-green/20"
          data-testid={`badge-job-type-${job.id}`}
        >
          {job.jobType?.name || "Full Time"}
        </Badge>
      </div>
      
      <div className="flex items-center flex-wrap gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin className="text-jobhai-green h-4 w-4" />
          <span data-testid={`text-location-${job.id}`}>{job.location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign className="text-jobhai-green h-4 w-4" />
          <span data-testid={`text-salary-${job.id}`}>{formatSalary(job.salaryMin, job.salaryMax)}</span>
        </div>
        {job.qualification && (
          <div className="flex items-center space-x-1">
            <GraduationCap className="text-jobhai-green h-4 w-4" />
            <span data-testid={`text-qualification-${job.id}`}>{job.qualification.name}</span>
          </div>
        )}
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-2" data-testid={`text-description-${job.id}`}>
        {job.description}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span data-testid={`text-posted-time-${job.id}`}>{formatPostedTime(job.postedAt)}</span>
        </div>
        <Button 
          className="btn-jobhai-primary px-4 py-2 rounded-lg text-sm" 
          asChild
          data-testid={`button-apply-${job.id}`}
        >
          <Link href={`/jobs/${job.id}`}>
            Apply Now
          </Link>
        </Button>
      </div>
    </div>
  );
}
