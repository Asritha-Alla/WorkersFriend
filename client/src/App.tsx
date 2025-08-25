import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Jobs from "@/pages/jobs";
import JobDetails from "@/pages/job-details";
import Companies from "@/pages/companies";
import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Hire from "@/pages/hire";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
  <Route path="/login" component={Login} />
  <Route path="/hire" component={Hire} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/jobs/:id" component={JobDetails} />
      <Route path="/companies" component={Companies} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
