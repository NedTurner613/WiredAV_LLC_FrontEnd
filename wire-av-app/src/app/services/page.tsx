"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { ConsultationModal } from '@/components/consultation-modal';

export default function ServicesPage() {
const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3F7FE] font-sans text-[#0F172A]">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F3F7FE]/60 backdrop-blur-md border-b border-[#D2D7E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <img src="/assets/logo-mark.svg" alt="Logo Icon" className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Wired Audio Video</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#2563EB] transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#2563EB] transition-colors">About</Link>
            <Link href="/services" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#2563EB] transition-colors">Services</Link>
            <Link href="/contact" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#2563EB] transition-colors">Contact</Link>
          </div>

          <div className="hidden lg:block">
            <ConsultationModal>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-[#1D4ED8] transition-all">
                Schedule a Consultation
              </button>
            </ConsultationModal>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#0F172A]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon icon={isMenuOpen ? "lucide:x" : "lucide:menu"} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-[#D2D7E1] px-4 py-6 space-y-4">
            <Link href="/" className="block text-lg font-medium">Home</Link>
            <Link href="/about" className="block text-lg font-medium">About</Link>
            <Link href="/services" className="block text-lg font-medium">Services</Link>
            <Link href="/contact" className="block text-lg font-medium">Contact</Link>
            <ConsultationModal>
              <button className="w-full bg-[#2563EB] text-white py-3 rounded-full font-semibold">
                Schedule a Consultation
              </button>
            </ConsultationModal>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 h-[620px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/hero-background.webp" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#171717]/40 to-[#F3F7FE]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 font-display tracking-tight">
            Precision Technology
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold text-[#7FA5FF] mb-8 font-display tracking-tight">
            Seamlessly Integrated
          </h2>
          <p className="text-lg md:text-xl text-[#E5E5E5] max-w-2xl mx-auto mb-10 leading-relaxed">
            Delivering high-performance audio, video, and automation solutions for the spaces you work, live, and build.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-[#2563EB] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
              Browse Solutions
            </button>
            <button className="w-full sm:w-auto border border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors">
              View Project Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Sub-nav / Features Bar */}
      <div className="sticky top-20 z-40 bg-[#F3F7FE]/80 backdrop-blur-xl border-b border-[#D2D7E1]">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-center gap-8 md:gap-16 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <span className="text-sm font-semibold text-[#596275]">Foundational AV</span>
          <span className="text-sm font-semibold text-[#596275]">Enterprise Reliability</span>
          <span className="text-sm font-semibold text-[#596275]">Modern Lifestyle</span>
        </div>
      </div>

      {/* Main Services Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        
        {/* Section 1: Foundational AV */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                <img src="/assets/construction-icon.svg" alt="Construction Icon" className="w-6 h-6 text-[#2563EB]" />
              </div>
              <span className="text-sm font-bold text-[#2563EB] tracking-widest uppercase">Foundational AV</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">New Construction Framework</h2>
            <p className="text-lg text-[#596275] mb-10 leading-relaxed">
              Future-proof your build from day one. We collaborate with architects and builders to integrate high-performance technical infrastructure directly into your blueprint, ensuring seamless connectivity for years to come.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {['Cat6/Fiber Backbones', 'Conduit Architecture', 'Centralized Hub Layouts', 'Wireless Site Audits'].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-[#F3F7FE]/50 border border-[#D2D7E1] rounded-xl">
                  <img src="/assets/check-icon.svg" alt="Check" className="w-5 h-5" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#2563EB]/20 rounded-xl font-medium hover:bg-[#2563EB]/5 transition-colors">
              Learn Technical Specifications
              <img src="/assets/arrow-icon.svg" alt="Arrow" className="w-4 h-4" />
            </button>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D2D7E1] aspect-square">
              <img src="/assets/construction-framework.webp" alt="Construction Framework" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#2563EB]/10 rounded-full blur-3xl -z-10" />
          </div>
        </section>

        <div className="border-t border-[#D2D7E1]/30" />

        {/* Section 2: Enterprise Reliability */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D2D7E1] aspect-square">
              <img src="/assets/commercial-tech.webp" alt="Commercial Tech" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#2563EB]/10 rounded-full blur-3xl -z-10" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                <img src="/assets/building-icon.svg" alt="Building Icon" className="w-6 h-6 text-[#2563EB]" />
              </div>
              <span className="text-sm font-bold text-[#2563EB] tracking-widest uppercase">Enterprise Reliability</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Commercial & Business Tech</h2>
            <p className="text-lg text-[#596275] mb-10 leading-relaxed">
              Scale your operation with audio-visual solutions designed for uptime and ease of use. From huddle rooms to retail environments, we provide the backbone for your communication and ambiance.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {['Boardroom Integration', 'Digital Signage Walls', 'Enterprise Networking', 'Paging & Background Audio'].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-[#F3F7FE]/50 border border-[#D2D7E1] rounded-xl">
                  <img src="/assets/check-icon.svg" alt="Check" className="w-5 h-5" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#2563EB]/20 rounded-xl font-medium hover:bg-[#2563EB]/5 transition-colors">
              Learn Technical Specifications
              <img src="/assets/arrow-icon.svg" alt="Arrow" className="w-4 h-4" />
            </button>
          </div>
        </section>

        <div className="border-t border-[#D2D7E1]/30" />

        {/* Section 3: Modern Lifestyle */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#2563EB]/10 rounded-xl flex items-center justify-center">
                <img src="/assets/house-icon.svg" alt="House Icon" className="w-6 h-6 text-[#2563EB]" />
              </div>
              <span className="text-sm font-bold text-[#2563EB] tracking-widest uppercase">Modern Lifestyle</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Luxury Home Integration</h2>
            <p className="text-lg text-[#596275] mb-10 leading-relaxed">
              Transform your living space into a cinematic sanctuary. Our residential systems blend invisible technology with high-fidelity performance, controlled by intuitive interfaces that anyone can use.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {['Custom Home Cinema', 'Smart Lighting Design', 'Outdoor Entertainment', 'Invisible Speaker Arrays'].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-[#F3F7FE]/50 border border-[#D2D7E1] rounded-xl">
                  <img src="/assets/check-icon.svg" alt="Check" className="w-5 h-5" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-3 px-8 py-3 bg-white border border-[#2563EB]/20 rounded-xl font-medium hover:bg-[#2563EB]/5 transition-colors">
              Learn Technical Specifications
              <img src="/assets/arrow-icon.svg" alt="Arrow" className="w-4 h-4" />
            </button>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D2D7E1] aspect-square">
              <img src="/assets/luxury-home.webp" alt="Luxury Home" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#2563EB]/10 rounded-full blur-3xl -z-10" />
          </div>
        </section>
      </main>

      {/* Technical Specialties Grid */}
      <section className="bg-[#F3F7FE]/20 py-24">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Specialties</h2>
          <p className="text-[#596275] max-w-2xl mx-auto">
            Beyond the big picture, we handle the critical details that make systems work reliably every single time.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Structured Cabling', desc: 'The hidden nervous system of your tech. Professional, labeled, and certified wiring for data, voice, and video.', img: '/assets/structured-cabling.webp', icon: '/assets/structured-cabling-icon.svg' },
            { title: 'Network & Security', desc: 'Industrial-grade WiFi and hardwired security protocols that keep your data safe and your connection fast.', img: '/assets/network-security.webp', icon: '/assets/network-security-icon.svg' },
            { title: 'Smart Control', desc: 'Unified control for lighting, climate, and media via elegant touchscreens or your smartphone.', img: '/assets/hero-background.webp', icon: '/assets/smart-control-icon.svg' },
            { title: 'Acoustic Treatment', desc: 'Precision sound engineering to ensure your audio systems perform perfectly within your room\'s physics.', img: '/assets/acoustic-treatment.webp', icon: '/assets/acoustic-treatment-icon.svg' }
          ].map((spec, idx) => (
            <div key={idx} className="bg-white/40 rounded-2xl overflow-hidden shadow-sm border border-[#D2D7E1] hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={spec.img} alt={spec.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="w-9 h-9 bg-[#2563EB]/10 rounded-xl flex items-center justify-center mb-4">
                  <img src={spec.icon} alt="Icon" className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-3">{spec.title}</h3>
                <p className="text-sm text-[#596275] leading-relaxed">{spec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Wired Way - Process */}
      <section className="py-24 border-y border-[#D2D7E1]">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold mb-6">The Wired Way</h2>
            <p className="text-[#596275] mb-10 leading-relaxed">
              Our installation process is engineered for transparency and technical excellence. We don't just "hook it up" — we integrate it.
            </p>
            <div className="space-y-4">
              {[
                { icon: '/assets/cad-documentation-icon.svg', text: 'CAD-Level Documentation' },
                { icon: '/assets/quality-control-icon.svg', text: 'Iterative Quality Control' },
                { icon: '/assets/maintenance-icon.svg', text: 'Lifetime Maintenance Plans' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-xl">
                  <img src={item.icon} alt="Icon" className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {[
              { num: '01', title: 'Discovery', desc: 'We analyze your space and architectural plans to understand your specific technical goals.' },
              { num: '02', title: 'Design', desc: 'Our engineers create full wiring diagrams and equipment schedules for your approval.' },
              { num: '03', title: 'Installation', desc: 'Professional technicians execute the build with surgical precision and clean cable management.' },
              { num: '04', title: 'Optimization', desc: 'Calibration of audio and video components to match the unique acoustics of your space.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-[#D2D7E1] relative overflow-hidden group hover:border-[#2563EB]/30 transition-colors">
                <span className="absolute top-4 right-6 text-4xl font-black text-[#2563EB]/10 group-hover:text-[#2563EB]/20 transition-colors">{step.num}</span>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-sm text-[#596275] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#2563EB]/5 relative overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-[120px]" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Elevate Your Space?</h2>
          <p className="text-lg text-[#596275] mb-12 max-w-xl mx-auto">
            Schedule a technical walk-through or request a quote for your upcoming project today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="w-full sm:w-auto bg-[#2563EB] text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-transform">
              Get a Custom Quote
            </button>
            <button className="w-full sm:w-auto bg-white border border-[#2563EB]/20 text-[#0F172A] px-10 py-4 rounded-full text-lg font-medium hover:bg-[#2563EB]/5 transition-colors">
              Contact Technical Support
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <img src="/assets/shield-icon.svg" alt="Shield" className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/assets/laptop-icon.svg" alt="Laptop" className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Smart Home Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-[#D2D7E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Wired Audio Video</h3>
              <p className="text-sm text-[#596275] leading-relaxed">
                Premier providers of high-end home and business audio-visual integration. We specialize in smart home automation and seamless technology experiences.
              </p>
              <div className="flex items-center gap-4">
                <Icon icon="lucide:instagram" className="w-5 h-5 text-[#596275] hover:text-[#2563EB] cursor-pointer" />
                <Icon icon="lucide:facebook" className="w-5 h-5 text-[#596275] hover:text-[#2563EB] cursor-pointer" />
                <Icon icon="lucide:linkedin" className="w-5 h-5 text-[#596275] hover:text-[#2563EB] cursor-pointer" />
                <Icon icon="lucide:twitter" className="w-5 h-5 text-[#596275] hover:text-[#2563EB] cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-[#596275]">
                <li><Link href="/" className="hover:text-[#2563EB]">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#2563EB]">About Us</Link></li>
                <li><Link href="/services" className="hover:text-[#2563EB]">Services</Link></li>
                <li><Link href="/contact" className="hover:text-[#2563EB]">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-[#596275]">
                <li className="flex gap-3">
                  <Icon icon="lucide:map-pin" className="w-5 h-5 text-[#2563EB] shrink-0" />
                  <span>123 Technology Way,<br />Suite 100, Tech City, ST 90210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:phone" className="w-4 h-4 text-[#2563EB]" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:mail" className="w-4 h-4 text-[#2563EB]" />
                  <span>hello@wiredaudiovideo.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Office Hours</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between">
                  <span className="text-[#596275]">Mon - Fri:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#596275]">Sat:</span>
                  <span className="font-medium">10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#596275]">Sun:</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#D2D7E1] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#596275]">© 2026 Wired Audio Video. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-[#596275]">
              <a href="#" className="hover:text-[#2563EB]">Privacy Policy</a>
              <a href="#" className="hover:text-[#2563EB]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
