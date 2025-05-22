import React from "react";
import { Network, BarChart3, Cpu, Layers, Zap, Code2, Scale, LineChart } from 'lucide-react';
import img from '../assets/Group7.png'
// Note: You need to install lucide-react with: npm install lucide-react
import logo from '../assets/Logo.svg'
import python from '../assets/python-svgrepo-com.svg'
import ueransim from '../assets/UERANSIM.png'
import docker from '../assets/docker-svgrepo-com.svg'
import free from '../assets/free.png'
import ubuntu from '../assets/ubuntu-svgrepo-com.svg'
import { Link } from 'react-router-dom';

export default function LandingPage() {
  // Custom Button component
  const Button = ({ children, className, variant, size }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    
    const variantClasses = {
      default: "bg-[#1DA189] text-white hover:bg-[#1DA189]/90",
      outline: "border border-[#1DA189] text-[#1DA189] hover:bg-[#1DA189]/10",
      secondary: "bg-white text-[#072B2B] hover:bg-gray-100",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    };
    
    const sizeClasses = {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md text-base",
      icon: "h-10 w-10",
    };
    
    return (
      <button 
        className={`
          ${baseClasses} 
          ${variantClasses[variant || "default"]} 
          ${sizeClasses[size || "default"]} 
          ${className || ""}
        `}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b border-[#072B2B]/10 absolute top-0 left-0 right-0 z-10">
        <div className="container px-auto px-4 py-4 flex items-center justify-start gap-64">

            <img src={logo} alt="5G SIM" className="h-28" />
          
          <nav className="hidden md:flex items-center gap-6 ml-20">
            <a href="#features" className="text-sm font-medium text-white hover:text-[#1DA189] transition-colors">
              Features
            </a>
            <a href="#benefits" className="text-sm font-medium text-white hover:text-[#1DA189] transition-colors">
              Benefits
            </a>
            <a href="#tech-stack" className="text-sm font-medium text-white hover:text-[#1DA189] transition-colors">
              Tech Stack
            </a>
            <a href="#contact" className="text-sm font-medium text-white hover:text-[#1DA189] transition-colors">
              Contact
            </a>
          </nav>
 <Button 
  asChild
  variant="outline" 
  className="hidden md:flex border-white text-white ml-48 hover:bg-white/10"
>
  <Link to="/TopologyConfig">
    Get Started
  </Link>
</Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Now with background image and centered text */}
        <section className="relative h-screen flex items-center justify-center">
  {/* Background image with gradient overlay */}
  <div className="absolute inset-0 z-0">
    <img 
      src= {img}
      alt="Background"
      className="w-full h-full object-cover"
    />
  </div>
  

          
          {/* Content overlay */}
          <div className="container mx-auto px-4 relative z-2 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Advanced 5G Core Simulation for URLLC Performance
              </h1>
              <p className="text-lg text-white/80 mx-auto max-w-2xl">
                Optimize your 5G network by evaluating the impact of UPF placement on Ultra-Reliable Low-Latency
                Communication performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#1DA189] hover:bg-[#1DA189]/90">
                
                    <Link to="/TopologyConfig">
      Start Simulation
  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16 bg-[#EFF2F6]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-bold text-[#072B2B]">Our Research Question</h2>
              <p className="text-xl text-[#072B2B] italic">
                "How can we efficiently simulate a private 5G topology to evaluate the impact of UPF placement on URLLC
                traffic performance?"
              </p>
              <div className="h-1 w-20 bg-[#1DA189] mx-auto my-6"></div>
              <p className="text-[#072B2B]/80">
                Our solution provides a comprehensive simulation environment to study and optimize the placement of User
                Plane Functions (UPFs) in 5G networks, specifically targeting Ultra-Reliable Low-Latency Communication
                scenarios.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#072B2B]">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Layers className="h-10 w-10 text-[#1DA189]" />,
                  title: "UPF Categorization",
                  description:
                    "Strategically distribute UPFs by category to optimize network topology and performance.",
                },
                {
                  icon: <LineChart className="h-10 w-10 text-[#1DA189]" />,
                  title: "Optimal Path Selection",
                  description:
                    "Implement load-aware Dijkstra algorithm to determine the most efficient routing paths for packages.",
                },
                {
                  icon: <Network className="h-10 w-10 text-[#1DA189]" />,
                  title: "Topology Visualization",
                  description:
                    "Interactive visualization of network topology to better understand and analyze UPF placement impact.",
                },
                {
                  icon: <BarChart3 className="h-10 w-10 text-[#1DA189]" />,
                  title: "Traffic Generation",
                  description:
                    "Generate various traffic patterns to test network performance under different scenarios.",
                },
                {
                  icon: <Zap className="h-10 w-10 text-[#1DA189]" />,
                  title: "OWAMP Performance Measurement",
                  description: "Measure one-way performance metrics using the One-Way Active Measurement Protocol.",
                },
                {
                  icon: <Cpu className="h-10 w-10 text-[#1DA189]" />,
                  title: "UPF Chaining",
                  description:
                    "Simulate realistic service function chaining of UPFs for comprehensive network analysis.",
                },
              ].map((feature, index) => (
                <div key={index} className="bg-[#EFF2F6] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-[#072B2B]">{feature.title}</h3>
                  <p className="text-[#072B2B]/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-16 bg-[#072B2B]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Our Solution</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
             
                <img src={logo} alt="5G SIM" className="h-64" />
              
              <div className="space-y-8">
                {[
                  {
                    icon: <Scale className="h-6 w-6 text-[#1DA189]" />,
                    title: "Highly Scalable",
                    description: "Well-structured code designed for easy scaling to accommodate networks of any size.",
                  },
                  {
                    icon: <Code2 className="h-6 w-6 text-[#1DA189]" />,
                    title: "Realistic Simulation",
                    description:
                      "Uses real protocols, realistic distance simulation, and UPF chaining for accurate results.",
                  },
                  {
                    icon: <Zap className="h-6 w-6 text-[#1DA189]" />,
                    title: "Lightweight & Fast",
                    description: "Designed to be resource-efficient with automated processes for rapid execution.",
                  },
                  {
                    icon: <BarChart3 className="h-6 w-6 text-[#1DA189]" />,
                    title: "Intuitive Interface",
                    description:
                      "Simple and interactive visualization for controlling and monitoring simulation scenarios.",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-white">{benefit.title}</h3>
                      <p className="text-white/80">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

{/* Tech Stack */}
<section id="tech-stack" className="py-16 bg-[#EFF2F6]">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12 text-[#072B2B]">Technology Stack</h2>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
      {[
        { name: "free5gc", image: free, alt: "free5GC Logo" },
        { name: "UERANSIM", image: ueransim, alt: "UERANSIM Logo" },
        { name: "Python", image: python, alt: "Python Logo" },
        { name: "Ubuntu", image: ubuntu, alt: "Ubuntu Logo" },
        { name: "Docker", image: docker, alt: "Docker Logo" },
      ].map((tech, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="h-20 w-20 mb-4 bg-white rounded-full flex items-center justify-center shadow-md p-2">
            {/* Tech logo with responsive sizing */}
            <img 
              src={tech.image} 
              alt={tech.alt}
              className="h-12 w-12 object-contain" 
              onError={(e) => {
                e.target.onerror = null; 
                e.target.parentElement.innerHTML = `<span class="text-[#072B2B] font-bold">${tech.name.charAt(0)}</span>`;
              }}
            />
          </div>
          <span className="font-medium text-[#072B2B]">{tech.name}</span>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* CTA */}
        <section className="py-16 bg-[#1DA189] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your 5G Network?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Start simulating your 5G core network today and discover the optimal UPF placement for your URLLC
              applications.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-[#072B2B] hover:bg-gray-100">
              Get Started Now
            </Button>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-[#072B2B]">Contact Us</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-[#072B2B]">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1DA189]"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-[#072B2B]">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1DA189]"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-[#072B2B]">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1DA189]"
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-[#072B2B]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1DA189]"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button className="w-full bg-[#1DA189] hover:bg-[#1DA189]/90">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#072B2B] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Network className="h-6 w-6 text-[#1DA189]" />
                <span className="font-bold text-xl">5GSimCore</span>
              </div>
              <p className="text-white/70">
                Advanced 5G core simulation for optimizing URLLC performance through strategic UPF placement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-white/70 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-white/70 hover:text-white transition-colors">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#tech-stack" className="text-white/70 hover:text-white transition-colors">
                    Tech Stack
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/70 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    GitHub Repository
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors">
                    Research Papers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
              <p className="text-white/70 mb-4">Subscribe to our newsletter for the latest updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-[#072B2B]/50 text-white rounded-l-md focus:outline-none flex-1 border border-[#1DA189]/30"
                />
                <Button className="rounded-l-none bg-[#1DA189] hover:bg-[#1DA189]/90">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70">
            <p>© {new Date().getFullYear()} 5GSimCore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}