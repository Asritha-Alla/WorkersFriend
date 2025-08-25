import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import type { Company } from "@shared/schema";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div 
      className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all cursor-pointer group border hover:border-jobhai-blue"
      data-testid={`company-card-${company.id}`}
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center shadow-sm">
        <Building className="text-jobhai-blue h-8 w-8" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2" data-testid={`text-company-name-${company.id}`}>
        {company.name}
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2" data-testid={`text-company-description-${company.id}`}>
        {company.description || "Leading company in " + company.industry}
      </p>
      <Button 
        variant="ghost"
        className="text-jobhai-green hover:text-jobhai-green-dark text-sm font-medium group-hover:underline"
        asChild
        data-testid={`button-view-jobs-${company.id}`}
      >
        <Link href={`/jobs?company=${company.id}`}>
          View jobs
        </Link>
      </Button>
    </div>
  );
}
