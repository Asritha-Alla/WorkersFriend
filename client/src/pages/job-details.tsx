import { useRoute } from "wouter";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, DollarSign, GraduationCap, Clock, Building, Phone, Mail, ArrowLeft, CheckCircle, User } from "lucide-react";
import { insertJobApplicationSchema, type JobWithDetails, type JobApplication } from "@shared/schema";
import { z } from "zod";

const applicationFormSchema = insertJobApplicationSchema.omit({ jobId: true });
type ApplicationFormData = z.infer<typeof applicationFormSchema>;

export default function JobDetails() {
  const [, params] = useRoute("/jobs/:id");
  const jobId = params?.id;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);

  // contact form state
  const [contactName, setContactName] = useState("");
  const [contactAge, setContactAge] = useState("");
  const [contactLocation, setContactLocation] = useState("");
  const [contactStudy, setContactStudy] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const { data: job, isLoading, error } = useQuery<JobWithDetails>({
    queryKey: ["/api/jobs", jobId],
    enabled: !!jobId,
  });

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      coverLetter: "",
    },
  });

  const applyMutation = useMutation({
    mutationFn: async (data: ApplicationFormData) => {
      const response = await apiRequest("POST", `/api/jobs/${jobId}/apply`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Your job application has been submitted successfully. The employer will contact you soon.",
      });
      setIsApplicationDialogOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/jobs", jobId, "applications"] });
    },
    onError: (error) => {
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const contactMutation = useMutation({
    mutationFn: async () => {
      // build a cover letter containing structured contact info for HR
      const cover = `Name: ${contactName}\nAge: ${contactAge}\nLocation: ${contactLocation}\nStudy: ${contactStudy}\nPhone: ${contactPhone}\n\nMessage:\n${contactMessage}`;
      const payload = {
        applicantName: contactName || "",
        applicantEmail: "",
        applicantPhone: contactPhone || "",
        coverLetter: cover,
      } as any;

      const response = await apiRequest("POST", `/api/jobs/${jobId}/apply`, payload);
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Message Sent", description: "Your message has been sent to the employer." });
      setIsContactDialogOpen(false);
      // reset
      setContactName("");
      setContactAge("");
      setContactLocation("");
      setContactStudy("");
      setContactPhone("");
      setContactMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/jobs", jobId, "applications"] });
    },
    onError: (err: any) => {
      toast({ title: "Failed to send", description: err.message || "Unable to send message", variant: "destructive" });
    },
  });

  const onSubmit = (data: ApplicationFormData) => {
    applyMutation.mutate(data);
  };

  const formatSalary = (min?: number | null, max?: number | null) => {
    if (!min && !max) return "Salary not disclosed";
    if (min && max) return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
    if (min) return `₹${min.toLocaleString()}+`;
    if (max) return `Up to ₹${max.toLocaleString()}`;
    return "Salary not disclosed";
  };

  const formatPostedTime = (date?: Date | null) => {
    if (!date) return "Recently posted";
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
    return "Posted recently";
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
            <Button className="btn-jobhai-primary" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()} 
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Button>

        {isLoading ? (
          <div className="space-y-6" data-testid="job-details-loading">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-16 h-16 rounded-lg" />
                    <div>
                      <Skeleton className="h-8 w-64 mb-2" />
                      <Skeleton className="h-5 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-32 w-full mb-6" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : job ? (
          <div className="space-y-6" data-testid="job-details-content">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-jobhai-blue/10 rounded-lg flex items-center justify-center">
                      <Building className="text-jobhai-blue h-8 w-8" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900" data-testid="text-job-title">
                        {job.title}
                      </h1>
                      <p className="text-xl text-gray-600" data-testid="text-company-name">
                        {job.company?.name || "Company not specified"}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={job.jobType?.name === "Work from home" ? "secondary" : "outline"}
                    className="bg-jobhai-green/10 text-jobhai-green border-jobhai-green/20"
                    data-testid="badge-job-type"
                  >
                    {job.jobType?.name || "Full Time"}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-jobhai-green h-4 w-4" />
                    <span data-testid="text-location">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="text-jobhai-green h-4 w-4" />
                    <span data-testid="text-salary">{formatSalary(job.salaryMin, job.salaryMax)}</span>
                  </div>
                  {job.qualification && (
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="text-jobhai-green h-4 w-4" />
                      <span data-testid="text-qualification">{job.qualification.name}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Clock className="text-jobhai-green h-4 w-4" />
                    <span data-testid="text-posted-time">{formatPostedTime(job.postedAt)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="btn-jobhai-primary" data-testid="button-apply-now">
                        <User className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]" data-testid="dialog-application">
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                        <DialogDescription>
                          Fill in your details to apply for this position at {job.company?.name || "this company"}.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="applicantName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your full name" {...field} data-testid="input-applicant-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="applicantEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Enter your email" {...field} data-testid="input-applicant-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="applicantPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your phone number" {...field} data-testid="input-applicant-phone" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="coverLetter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cover Letter (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell us why you're interested in this position..."
                                    className="min-h-[100px]"
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                    data-testid="textarea-cover-letter"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsApplicationDialogOpen(false)}
                              data-testid="button-cancel-application"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="btn-jobhai-primary"
                              disabled={applyMutation.isPending}
                              data-testid="button-submit-application"
                            >
                              {applyMutation.isPending ? "Submitting..." : "Submit Application"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  
                  {job.contactPhone && (
                    <>
                      <Button variant="outline" className="border-jobhai-green text-jobhai-green hover:bg-jobhai-green hover:text-white" onClick={() => {
                        setContactPhone(String(job.contactPhone));
                        setIsContactDialogOpen(true);
                      }} data-testid="button-call-hr">
                        <Phone className="h-4 w-4 mr-2" />
                        Message HR
                      </Button>

                      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Message HR for {job.title}</DialogTitle>
                            <DialogDescription>
                              Fill your details and a short message so HR can contact you for interview.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <Input placeholder="Full name" value={contactName} onChange={(e: any) => setContactName(e.target.value)} />
                            <Input placeholder="Age" value={contactAge} onChange={(e: any) => setContactAge(e.target.value)} />
                            <Input placeholder="Location" value={contactLocation} onChange={(e: any) => setContactLocation(e.target.value)} />
                            <Input placeholder="Study / Qualification" value={contactStudy} onChange={(e: any) => setContactStudy(e.target.value)} />
                            <Input placeholder="Phone number" value={contactPhone} onChange={(e: any) => setContactPhone(e.target.value)} />
                            <Textarea placeholder="Short message to HR" value={contactMessage} onChange={(e: any) => setContactMessage(e.target.value)} className="min-h-[120px]" />

                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>Cancel</Button>
                              <Button className="btn-jobhai-primary" onClick={() => contactMutation.mutate()} disabled={contactMutation.isPending}>
                                {contactMutation.isPending ? "Sending..." : "Send Message"}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap" data-testid="text-job-description">
                  {job.description}
                </p>
                
                {job.requirements && job.requirements.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Requirements:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700" data-testid="list-requirements">
                      {job.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.benefits && job.benefits.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Benefits:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700" data-testid="list-benefits">
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.experience && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Experience Required:</h3>
                    <p className="text-gray-700" data-testid="text-experience">{job.experience}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Company Information */}
            {job.company && (
              <Card>
                <CardHeader>
                  <CardTitle>About {job.company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4" data-testid="text-company-description">
                    {job.company.description || `${job.company.name} is a leading company in the ${job.company.industry || 'industry'}.`}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {job.company.industry && (
                      <div>
                        <span className="font-semibold text-gray-900">Industry: </span>
                        <span className="text-gray-700" data-testid="text-company-industry">{job.company.industry}</span>
                      </div>
                    )}
                    {job.company.size && (
                      <div>
                        <span className="font-semibold text-gray-900">Company Size: </span>
                        <span className="text-gray-700" data-testid="text-company-size">{job.company.size} employees</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {job.contactPhone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-jobhai-green" />
                      <span data-testid="text-contact-phone">{job.contactPhone}</span>
                    </div>
                  )}
                  {job.contactEmail && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-jobhai-green" />
                      <span data-testid="text-contact-email">{job.contactEmail}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
