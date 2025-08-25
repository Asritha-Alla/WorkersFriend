import { Link } from "wouter";
import { Briefcase, HammerIcon } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-jobhai-green rounded-lg p-2 mr-3">
                <HammerIcon className="text-white h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Friendly<span className="text-jobhai-green">Worker</span>
                </h3>
                <p className="text-xs text-gray-400">Everyone has Right to work</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Find local jobs with better salary. Call from HR directly to fix interview for FREE.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-jobhai-green hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-jobhai-green hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-jobhai-green hover:text-white cursor-pointer transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/allaasritha" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-jobhai-green hover:text-white cursor-pointer transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Popular Cities</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/jobs?city=mumbai" className="hover:text-white transition-colors" data-testid="link-jobs-mumbai">Jobs in Mumbai</Link></li>
              <li><Link href="/jobs?city=delhi" className="hover:text-white transition-colors" data-testid="link-jobs-delhi">Jobs in Delhi</Link></li>
              <li><Link href="/jobs?city=bangalore" className="hover:text-white transition-colors" data-testid="link-jobs-bangalore">Jobs in Bangalore</Link></li>
              <li><Link href="/jobs?city=chennai" className="hover:text-white transition-colors" data-testid="link-jobs-chennai">Jobs in Chennai</Link></li>
              <li><Link href="/jobs?city=hyderabad" className="hover:text-white transition-colors" data-testid="link-jobs-hyderabad">Jobs in Hyderabad</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Popular Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/jobs?category=delivery" className="hover:text-white transition-colors" data-testid="link-delivery-jobs">Delivery Jobs</Link></li>
              <li><Link href="/jobs?category=driver" className="hover:text-white transition-colors" data-testid="link-driver-jobs">Driver Jobs</Link></li>
              <li><Link href="/jobs?category=sales" className="hover:text-white transition-colors" data-testid="link-sales-jobs">Sales Jobs</Link></li>
              <li><Link href="/jobs?category=customer-support" className="hover:text-white transition-colors" data-testid="link-customer-support-jobs">Customer Support</Link></li>
              <li><Link href="/jobs?category=it" className="hover:text-white transition-colors" data-testid="link-it-jobs">IT Jobs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-about-us">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-contact">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-privacy">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-terms">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-help">Help Center</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 FriendlyWorker. All rights reserved.</p>
          <p>Made with ❤️ for job seekers in India</p>
        </div>
      </div>
    </footer>
  );
}
