import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

export default function HirePage() {
  const [title, setTitle] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [cityId, setCityId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [qualificationId, setQualificationId] = useState("");
  const [jobTypeId, setJobTypeId] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [experience, setExperience] = useState("");
  const [locationText, setLocationText] = useState("");
  const [description, setDescription] = useState("");
  const [requirementsText, setRequirementsText] = useState("");
  const [benefitsText, setBenefitsText] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Inline new company creation
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyDescription, setNewCompanyDescription] = useState("");
  const [newCompanyWebsite, setNewCompanyWebsite] = useState("");
  const [newCompanyIndustry, setNewCompanyIndustry] = useState("");
  const [newCompanySize, setNewCompanySize] = useState("");

  const [companies, setCompanies] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [qualifications, setQualifications] = useState<any[]>([]);
  const [jobTypes, setJobTypes] = useState<any[]>([]);

  const [isPosting, setIsPosting] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const { toast } = useToast();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [cRes, cityRes, catRes, qRes, jtRes] = await Promise.all([
          apiRequest("GET", "/api/companies"),
          apiRequest("GET", "/api/cities"),
          apiRequest("GET", "/api/job-categories"),
          apiRequest("GET", "/api/qualifications"),
          apiRequest("GET", "/api/job-types"),
        ]);

        const [companies, cities, categories, qualifications, jobTypes] = await Promise.all([
          cRes.json(),
          cityRes.json(),
          catRes.json(),
          qRes.json(),
          jtRes.json(),
        ]);

        if (!mounted) return;
        setCompanies(companies || []);
        setCities(cities || []);
        setCategories(categories || []);
        setQualifications(qualifications || []);
        setJobTypes(jobTypes || []);
      } catch (err: any) {
        toast({ title: "Failed to load options", description: String(err), variant: "destructive" });
      } finally {
        if (mounted) setLoadingOptions(false);
      }
    }
    load();
    return () => { mounted = false };
  }, [toast]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsPosting(true);
    try {
      const payload: any = {
        title,
        companyId,
        cityId: cityId || undefined,
        categoryId: categoryId || undefined,
        qualificationId: qualificationId || undefined,
        jobTypeId: jobTypeId || undefined,
        salaryMin: salaryMin ? parseInt(salaryMin, 10) : undefined,
        salaryMax: salaryMax ? parseInt(salaryMax, 10) : undefined,
        experience: experience || undefined,
        location: locationText || undefined,
        description: description || undefined,
        requirements: requirementsText ? requirementsText.split(/\r?\n|,\s*/).map(s => s.trim()).filter(Boolean) : undefined,
        benefits: benefitsText ? benefitsText.split(/\r?\n|,\s*/).map(s => s.trim()).filter(Boolean) : undefined,
        contactPhone: contactPhone || undefined,
        contactEmail: contactEmail || undefined,
        isFeatured: !!isFeatured,
        isActive: !!isActive,
      };

      if (isCreatingCompany) {
        if (!newCompanyName) throw new Error("Company name is required");
        payload.company = {
          name: newCompanyName,
          description: newCompanyDescription || undefined,
          website: newCompanyWebsite || undefined,
          industry: newCompanyIndustry || undefined,
          size: newCompanySize || undefined,
        };
      }

      const res = await apiRequest("POST", "/api/hire", payload);
      const data = await res.json();
      toast({ title: "Job Posted", description: `Job ${data.title} created` });
      setLocation("/jobs");
    } catch (err: any) {
      toast({ title: "Failed to post job", description: err.message || String(err), variant: "destructive" });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Post a Job</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input placeholder="Job title" value={title} onChange={(e: any) => setTitle(e.target.value)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={companyId} onChange={(e) => {
              const val = e.target.value;
              if (val === "__new__") {
                setIsCreatingCompany(true);
                setCompanyId("");
              } else {
                setIsCreatingCompany(false);
                setCompanyId(val);
              }
            }} className="border rounded-md p-2">
              <option value="">Select company</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              <option value="__new__">+ Create new company</option>
            </select>

            <select value={cityId} onChange={(e) => setCityId(e.target.value)} className="border rounded-md p-2">
              <option value="">Select city</option>
              {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border rounded-md p-2">
              <option value="">Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select value={qualificationId} onChange={(e) => setQualificationId(e.target.value)} className="border rounded-md p-2">
              <option value="">Qualification</option>
              {qualifications.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
            </select>
            <select value={jobTypeId} onChange={(e) => setJobTypeId(e.target.value)} className="border rounded-md p-2">
              <option value="">Job type</option>
              {jobTypes.map(jt => <option key={jt.id} value={jt.id}>{jt.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Salary min (number)" value={salaryMin} onChange={(e: any) => setSalaryMin(e.target.value)} />
            <Input placeholder="Salary max (number)" value={salaryMax} onChange={(e: any) => setSalaryMax(e.target.value)} />
            <Input placeholder="Experience (e.g. 1-3 years)" value={experience} onChange={(e: any) => setExperience(e.target.value)} />
          </div>

          <Input placeholder="Location (city, state)" value={locationText} onChange={(e: any) => setLocationText(e.target.value)} />
          {isCreatingCompany ? (
            <div className="space-y-2 border p-3 rounded-md bg-white">
              <h3 className="font-semibold">New Company Details</h3>
              <Input placeholder="Company name" value={newCompanyName} onChange={(e: any) => setNewCompanyName(e.target.value)} />
              <Input placeholder="Website" value={newCompanyWebsite} onChange={(e: any) => setNewCompanyWebsite(e.target.value)} />
              <Input placeholder="Industry" value={newCompanyIndustry} onChange={(e: any) => setNewCompanyIndustry(e.target.value)} />
              <Input placeholder="Company size" value={newCompanySize} onChange={(e: any) => setNewCompanySize(e.target.value)} />
              <Textarea placeholder="Company description" value={newCompanyDescription} onChange={(e: any) => setNewCompanyDescription(e.target.value)} className="min-h-[80px]" />
            </div>
          ) : null}
          <Textarea placeholder="Job description" value={description} onChange={(e: any) => setDescription(e.target.value)} className="min-h-[140px]" />

          <div>
            <label className="block text-sm font-medium mb-1">Requirements (one per line or comma separated)</label>
            <Textarea placeholder="e.g. Own vehicle\nValid driving license" value={requirementsText} onChange={(e: any) => setRequirementsText(e.target.value)} className="min-h-[80px]" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Benefits (one per line or comma separated)</label>
            <Textarea placeholder="e.g. Fuel allowance\nIncentives" value={benefitsText} onChange={(e: any) => setBenefitsText(e.target.value)} className="min-h-[80px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Contact phone" value={contactPhone} onChange={(e: any) => setContactPhone(e.target.value)} />
            <Input placeholder="Contact email" value={contactEmail} onChange={(e: any) => setContactEmail(e.target.value)} />
          </div>

          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="mr-2" />
              <span>Mark as featured</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="mr-2" />
              <span>Is Active</span>
            </label>
          </div>

          <div className="flex justify-end">
            <Button className="btn-jobhai-primary" disabled={isPosting || loadingOptions}>{isPosting ? "Posting..." : "Post Job"}</Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
