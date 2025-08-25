import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { City, JobCategory, Qualification, JobType } from "@shared/schema";

interface JobFiltersProps {
  selectedCity?: string;
  selectedCategory?: string;
  selectedQualification?: string;
  selectedJobType?: string;
  onCityChange: (cityId: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onQualificationChange: (qualificationId: string) => void;
  onJobTypeChange: (jobTypeId: string) => void;
}

export default function JobFilters({
  selectedCity,
  selectedCategory,
  selectedQualification,
  selectedJobType,
  onCityChange,
  onCategoryChange,
  onQualificationChange,
  onJobTypeChange,
}: JobFiltersProps) {
  const { data: cities } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const { data: categories } = useQuery<JobCategory[]>({
    queryKey: ["/api/job-categories"],
  });

  const { data: qualifications } = useQuery<Qualification[]>({
    queryKey: ["/api/qualifications"],
  });

  const { data: jobTypes } = useQuery<JobType[]>({
    queryKey: ["/api/job-types"],
  });

  return (
    <Card data-testid="job-filters">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Filter Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger data-testid="select-city">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities?.map((city) => (
                <SelectItem key={city.id} value={city.id} data-testid={`city-option-${city.id}`}>
                  {city.name}, {city.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger data-testid="select-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id} data-testid={`category-option-${category.id}`}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Qualification</label>
          <Select value={selectedQualification} onValueChange={onQualificationChange}>
            <SelectTrigger data-testid="select-qualification">
              <SelectValue placeholder="Select qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Qualifications</SelectItem>
              {qualifications?.map((qualification) => (
                <SelectItem key={qualification.id} value={qualification.id} data-testid={`qualification-option-${qualification.id}`}>
                  {qualification.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Job Type</label>
          <Select value={selectedJobType} onValueChange={onJobTypeChange}>
            <SelectTrigger data-testid="select-job-type">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Job Types</SelectItem>
              {jobTypes?.map((jobType) => (
                <SelectItem key={jobType.id} value={jobType.id} data-testid={`job-type-option-${jobType.id}`}>
                  {jobType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
