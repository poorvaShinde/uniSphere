import { GraduationCap, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">Unihub</span>
            </Link>
            <p className="text-muted-foreground">
              Connecting the next generation of innovators.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link href="#smart-match" className="text-muted-foreground hover:text-foreground">SmartMatch</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Unihub. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
