import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Briefcase, Download, User, Menu, ChevronDown, BrushIcon, PersonStandingIcon, PresentationIcon, VaultIcon, HammerIcon } from "lucide-react";

export default function Header() {
  const auth = useAuth();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center" data-testid="link-home">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-jobhai-green rounded-lg p-2 mr-3">
                <HammerIcon className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Friendly<span className="text-jobhai-green">Worker</span>
                </h1>
                <p className="text-xs text-gray-500">Everyone has Right to work</p>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              
            </div>
            <div className="flex items-center space-x-1 text-sm cursor-pointer hover:text-jobhai-blue transition-colors">
              
           
            </div>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 text-jobhai-blue hover:text-jobhai-green"
              data-testid="button-download-app"
            >
            </Button>
            {auth.user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">{auth.user.username}</span>
                <Button variant="ghost" className="text-sm" onClick={() => auth.logout.mutate()} data-testid="button-logout">Logout</Button>
              </div>
            ) : (
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  className="text-sm text-gray-600 hover:text-gray-900"
                  data-testid="button-login"
                >
                  <User className="h-4 w-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}
            <Link href="/hire">
              <Button 
                className="btn-jobhai-secondary px-4 py-2 rounded-lg text-sm"
                data-testid="button-hire-staff"
              >
                Hire Local Staff
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              data-testid="button-mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
