"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { ConsultationModal } from '@/components/consultation-modal';



export default function ContactPage() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
     <div className="min-h-screen bg-[#F5F7F9] font-sans text-[#3D4148]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-[#F5F7F9]/60 backdrop-blur-md border-b border-[#D1D4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <img src="/assets/logo.svg" alt="Logo" className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Wired Audio Video</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-[#3D4148]/80 hover:text-[#2563EB] transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium text-[#3D4148]/80 hover:text-[#2563EB] transition-colors">About</Link>
            <Link href="/services" className="text-sm font-medium text-[#3D4148]/80 hover:text-[#2563EB] transition-colors">Services</Link>
            <Link href="/contact" className="text-sm font-medium text-[#3D4148]/80 hover:text-[#2563EB] transition-colors">Contact</Link>
          </nav>

          <div className="hidden md:block">
            <ConsultationModal>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:bg-[#1D4ED8] transition-all">
                Schedule a Consultation
              </button>
            </ConsultationModal>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon icon={isMenuOpen ? "lucide:x" : "lucide:menu"} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#D1D4D9] px-4 py-6 space-y-4">
            <Link href="/" className="block text-base font-medium">Home</Link>
            <Link href="/about" className="block text-base font-medium">About</Link>
            <Link href="/services" className="block text-base font-medium">Services</Link>
            <Link href="/contact" className="block text-base font-medium">Contact</Link>
            <ConsultationModal>
              <button className="w-full bg-[#2563EB] text-white px-6 py-3 rounded-full text-sm font-semibold">
                Schedule a Consultation
              </button>
            </ConsultationModal>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/assets/hero-banner.webp" 
              alt="Hero Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1e2128]/20" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full w-fit mb-8">
              <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold text-[#2563EB] uppercase tracking-widest">Get In Touch</span>
            </div>
            
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-semibold max-w-3xl leading-[1.1] mb-6">
              Let's Design Your <br />
              <span className="text-[#7FA5FF] italic">Seamless</span> Experience
            </h1>
            
            <p className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
                            Whether you're looking for high-end home theater installation, smart home automation, or professional AV for your business, our experts are ready to assist.
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="relative bg-[#F1F3F5] rounded-xl border border-[#D1D4D9] overflow-hidden shadow-xl h-[368px]">
            <img 
              src="/assets/service-area-map.webp" 
              alt="Service Area Map" 
              className="w-full h-full object-cover opacity-60"
            />
            
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 glass-card p-6 rounded-lg shadow-2xl max-w-[280px]">
              <span className="block text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-2">Locations served</span>
              <p className="text-sm font-semibold leading-tight">
                DALLAS AND SURROUNDING <br />CITIES
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Hours Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Cards */}
            <div className="lg:col-span-6 space-y-6">
              {/* Phone */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#D1D4D9]/50 flex items-start gap-5">
                <div className="w-12 h-12 bg-[#F5F7F9] rounded-full border border-[#D1D4D9] flex items-center justify-center shrink-0">
                  <img src="/assets/phone-icon.svg" alt="Phone" className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#6E727A] uppercase tracking-widest mb-1">Phone</span>
                  <p className="text-lg font-semibold mb-1">(555) 123-4567</p>
                  <p className="text-sm text-[#6E727A]/80">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#D1D4D9]/50 flex items-start gap-5">
                <div className="w-12 h-12 bg-[#F5F7F9] rounded-full border border-[#D1D4D9] flex items-center justify-center shrink-0">
                  <img src="/assets/email-icon.svg" alt="Email" className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#6E727A] uppercase tracking-widest mb-1">Email</span>
                  <p className="text-lg font-semibold mb-1">hello@wiredaudiovideo.com</p>
                  <p className="text-sm text-[#6E727A]/80">Expect a response within 24 hours</p>
                </div>
              </div>

              {/* Office */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#D1D4D9]/50 flex items-start gap-5">
                <div className="w-12 h-12 bg-[#F5F7F9] rounded-full border border-[#D1D4D9] flex items-center justify-center shrink-0">
                  <img src="/assets/office-icon.svg" alt="Office" className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#6E727A] uppercase tracking-widest mb-1">Office</span>
                  <p className="text-lg font-semibold mb-1">123 Technology Way, Tech City</p>
                  <p className="text-sm text-[#6E727A]/80">Suite 100, ST 90210</p>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="lg:col-span-6">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-[#D1D4D9]/50 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/assets/clock-icon.svg" alt="Clock" className="w-5 h-5 text-[#2563EB]" />
                  <h3 className="text-xl font-semibold">Business Hours</h3>
                </div>
                <p className="text-sm text-[#6E727A] mb-8">
                  Our support and sales teams are available during the following times.
                </p>

                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-[#D1D4D9]/30">
                    <span className="text-sm font-medium">Monday - Friday</span>
                    <span className="text-sm text-[#6E727A]">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-[#D1D4D9]/30">
                    <span className="text-sm font-medium">Saturday</span>
                    <span className="text-sm text-[#6E727A]">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-[#D1D4D9]/30">
                    <span className="text-sm font-medium">Sunday</span>
                    <span className="text-sm font-semibold text-[#2563EB]">Closed</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-lg flex gap-3">
                  <img src="/assets/calendar-icon.svg" alt="Calendar" className="w-4 h-4 text-[#2563EB] mt-0.5" />
                  <p className="text-xs leading-relaxed text-[#6E727A]">
                    Closed on federal holidays. For emergency support, please use the <span className="text-[#2563EB] font-medium cursor-pointer hover:underline">Support Portal</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#D1D4D9] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Info */}
            <div className="lg:col-span-4">
              <h4 className="text-xl font-bold mb-6">Wired Audio Video</h4>
              <p className="text-sm text-[#6E727A] leading-relaxed mb-8 max-w-xs">
                Premier providers of high-end home and business audio-visual integration. We specialize in smart home automation and seamless technology experiences.
              </p>
              <div className="flex gap-4">
                <img src="/assets/instagram-icon.svg" alt="Instagram" className="w-5 h-5 text-[#6E727A] cursor-pointer hover:text-[#2563EB] transition-colors" />
                <img src="/assets/facebook-icon.svg" alt="Facebook" className="w-5 h-5 text-[#6E727A] cursor-pointer hover:text-[#2563EB] transition-colors" />
                <img src="/assets/linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5 text-[#6E727A] cursor-pointer hover:text-[#2563EB] transition-colors" />
                <img src="/assets/twitter-icon.svg" alt="Twitter" className="w-5 h-5 text-[#6E727A] cursor-pointer hover:text-[#2563EB] transition-colors" />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2">
              <h5 className="text-base font-semibold mb-6">Navigation</h5>
              <ul className="space-y-4">
                <li><Link href="/" className="text-sm text-[#6E727A] hover:text-[#2563EB]">Home</Link></li>
                <li><Link href="/about" className="text-sm text-[#6E727A] hover:text-[#2563EB]">About Us</Link></li>
                <li><Link href="/services" className="text-sm text-[#6E727A] hover:text-[#2563EB]">Services</Link></li>
                <li><Link href="/contact" className="text-sm text-[#6E727A] hover:text-[#2563EB]">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="lg:col-span-3">
              <h5 className="text-base font-semibold mb-6">Contact Us</h5>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <img src="/assets/office-icon.svg" alt="Map" className="w-5 h-5 text-[#2563EB] shrink-0" />
                  <span className="text-sm text-[#6E727A]">
                    123 Technology Way,<br />
                    Suite 100, Tech City, ST 90210
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <img src="/assets/phone-icon.svg" alt="Phone" className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="text-sm text-[#6E727A]">(555) 123-4567</span>
                </li>
                <li className="flex gap-3 items-center">
                  <img src="/assets/email-icon.svg" alt="Email" className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span className="text-sm text-[#6E727A]">hello@wiredaudiovideo.com</span>
                </li>
              </ul>
            </div>

            {/* Office Hours */}
            <div className="lg:col-span-3">
              <h5 className="text-base font-semibold mb-6">Office Hours</h5>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span className="text-[#6E727A]">Mon - Fri:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-[#6E727A]">Sat:</span>
                  <span className="font-medium">10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span className="text-[#6E727A]">Sun:</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#D1D4D9] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#6E727A]">© 2026 Wired Audio Video. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-[#6E727A] hover:text-[#2563EB]">Privacy Policy</a>
              <a href="#" className="text-xs text-[#6E727A] hover:text-[#2563EB]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
