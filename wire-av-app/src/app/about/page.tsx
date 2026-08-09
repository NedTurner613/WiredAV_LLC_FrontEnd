import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F7F9] font-sans text-[#3D4148]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-[#F5F7F9]/60 backdrop-blur-md border-b border-[#D1D4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-sm">
              <img src="./assets/logo.svg" alt="Logo" className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Wired Audio Video</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/services' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-[#3D4148]/80 hover:text-[#2563EB] transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center justify-center px-6 py-2.5 bg-[#2563EB] text-[#F2F7FF] text-sm font-semibold rounded-full shadow-md hover:bg-[#1D4ED8] transition-all">
              Schedule a Consultation
            </button>
            <button className="md:hidden p-2 text-[#3D4148]">
              <Icon icon="lucide:menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[540px] w-full overflow-hidden">
        <img 
          src="./assets/hero-bg.webp" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/90 via-[#171717]/60 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <h1 className="max-w-2xl text-5xl md:text-6xl lg:text-[64px] leading-[1.1] font-semibold font-heading text-[#DEE1E6] mb-6">
            Crafting Seamless <br />
            <span className="text-[#7FA5FF]">Digital Environments.</span>
          </h1>
          <p className="max-w-xl text-lg md:text-xl text-[#E5E5E5] leading-relaxed">
            Wired Audio Video is more than an integrator. We are architects of atmosphere, bringing precision engineering and premium aesthetics to every smart space we design.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            {/* Decorative border elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-[#2563EB]/40" />
            
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border border-[#D1D4D9]">
              <img src="./assets/story-visual.webp" alt="Technician at work" className="w-full h-auto" />
            </div>

            {/* Stats Card */}
            <div className="absolute -bottom-10 -right-4 md:right-10 z-20 bg-[#F5F7F9] border border-[#D1D4D9] rounded-lg p-6 shadow-xl flex gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2563EB] font-heading">15+</div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-[#6E727A] mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2563EB] font-heading">500+</div>
                <div className="text-[10px] uppercase tracking-widest font-semibold text-[#6E727A] mt-1">Projects Delivered</div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:pl-12">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-medium font-heading uppercase tracking-[5px]">Our Story</h2>
              <div className="w-20 h-1 bg-[#2563EB]" />
            </div>
            <p className="text-lg font-medium text-[#6E727A]">
              Founded on the principle that technology should be invisible, intuitive, and impeccable.
            </p>
            <div className="space-y-4 text-[#6E727A] leading-relaxed">
              <p>
                Since our inception, Wired Audio Video has set the standard for high-end AV integration. We recognized early on that luxury living and modern business productivity required more than just hardware; they required a symphony of perfectly tuned components working in unison.
              </p>
              <p>
                What started as a specialized cabling firm has evolved into a full-service technology partner. Our team consists of certified engineers, visionary designers, and meticulous technicians who share a single obsession: performance without compromise.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-2.5 border border-[#2563EB] text-[#2563EB] font-medium rounded-md hover:bg-[#2563EB]/5 transition-colors">
                Our Process
              </button>
              <button className="px-8 py-2.5 text-[#3D4148] font-medium rounded-md hover:bg-black/5 transition-colors">
                Meet the Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-[#f3f4f6] border-y border-[#D1D4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="relative bg-[#F5F7F9] p-10 rounded-2xl border border-[#D1D4D9] overflow-hidden group">
            <div className="absolute top-0 right-0 opacity-[0.05] translate-x-1/4 -translate-y-1/4">
              <img src="./assets/mission-icon.svg" alt="" className="w-48 h-48 text-[#2563EB]" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-lg">
                <img src="./assets/mission-icon.svg" alt="Mission" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-heading">Our Mission</h3>
              <p className="text-[#6E727A] italic leading-relaxed">
                "To elevate human experiences through the masterful integration of audio, video, and automation technology, ensuring every interaction is seamless, reliable, and inspiring."
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative bg-[#F5F7F9] p-10 rounded-2xl border border-[#D1D4D9] overflow-hidden group">
            <div className="absolute top-0 right-0 opacity-[0.05] translate-x-1/4 -translate-y-1/4">
              <img src="./assets/vision-icon.svg" alt="" className="w-48 h-48 text-[#2563EB]" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-lg">
                <img src="./assets/vision-icon.svg" alt="Vision" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-heading">Our Vision</h3>
              <p className="text-[#6E727A] italic leading-relaxed">
                "To remain the premier authority in smart-space integration, pioneering new standards of technical excellence that transform how people live, work, and connect."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-[#F5F7F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium font-heading uppercase tracking-[5px] mb-4">Our Core Values</h2>
          <p className="text-[#6E727A] mb-6">The fundamental principles that guide every wire we pull and every system we program.</p>
          <div className="w-20 h-1 bg-[#2563EB] mx-auto" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: './assets/technical-integrity-icon.svg', title: 'Technical Integrity', desc: 'We believe in doing things right the first time. Our wiring is art, our racks are organized, and our code is clean.' },
            { icon: './assets/client-partnership-icon.svg', title: 'Client Partnership', desc: "We don't just sell systems; we build relationships. We listen to your needs and design solutions that fit your lifestyle." },
            { icon: './assets/continuous-support-icon.svg', title: 'Continuous Support', desc: 'Technology evolves, and so do we. We provide ongoing maintenance and proactive support to keep your systems peak.' },
            { icon: './assets/attention-to-detail-icon.svg', title: 'Excellence in Detail', desc: 'The difference between a good system and a great one is in the final 2% of calibration. We obsess over the details.' },
            { icon: './assets/legacy-quality-icon.svg', title: 'Legacy Quality', desc: 'We build systems intended to last. Our infrastructure is designed for scalability and long-term reliability.' },
            { icon: './assets/logo.svg', title: 'Bold Innovation', desc: "We stay at the forefront of AV technology, testing new innovations before they ever reach our clients' homes." },
          ].map((value, idx) => (
            <div key={idx} className="bg-[#F5F7F9]/50 backdrop-blur-sm p-8 rounded-lg border border-[#D1D4D9] shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-[#2563EB]/10 rounded-lg flex items-center justify-center mb-6">
                <img src={value.icon} alt={value.title} className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h4 className="text-xl font-bold mb-3">{value.title}</h4>
              <p className="text-sm text-[#6E727A] leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Team Section */}
      <section className="relative py-32 overflow-hidden">
        <img 
          src="./assets/team-collaboration.webp" 
          alt="Team collaboration" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#171717]/40 backdrop-blur-[2px]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-medium font-heading mb-6">Driven by a Collective Passion</h2>
          <p className="text-lg md:text-xl text-[#E5E5E5] leading-relaxed mb-10">
            Behind every seamless installation is a team of specialists collaborating to solve complex challenges. Our technicians aren't just installers—they are artisans of the digital age.
          </p>
          <button className="px-10 py-3 bg-[#2563EB] text-[#F2F7FF] font-medium rounded-full shadow-xl hover:bg-[#1D4ED8] transition-all">
            Join Our Team
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#F5F7F9] border-t border-[#D1D4D9]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-medium font-heading mb-6">Ready to Experience the Difference?</h2>
          <p className="text-lg text-[#6E727A] mb-10">
            Whether you're planning a new build or upgrading an existing space, our experts are ready to bring your vision to life with technical precision and premium flair.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-12 py-3 bg-[#2563EB] text-[#F2F7FF] font-bold rounded-full shadow-lg hover:bg-[#1D4ED8] transition-all">
              Schedule a Consultation
            </button>
            <button className="w-full sm:w-auto px-12 py-3 border border-[#D1D4D9] text-[#3D4148] font-bold rounded-full hover:bg-black/5 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F5F7F9] pt-16 pb-8 border-t border-[#D1D4D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Wired Audio Video</h3>
              <p className="text-sm text-[#6E727A] leading-relaxed">
                Premier providers of high-end home and business audio-visual integration. We specialize in smart home automation and seamless technology experiences.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: 'lucide:instagram', path: './assets/instagram-icon.svg' },
                  { icon: 'lucide:facebook', path: './assets/facebook-icon.svg' },
                  { icon: 'lucide:linkedin', path: './assets/linkedin-icon.svg' },
                  { icon: 'lucide:twitter', path: './assets/twitter-icon.svg' }
                ].map((social, i) => (
                  <a key={i} href="#" className="text-[#6E727A] hover:text-[#2563EB] transition-colors">
                    <Icon icon={social.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-6">Navigation</h4>
              <ul className="space-y-3 text-sm text-[#6E727A]">
                <li><Link href="/" className="hover:text-[#2563EB]">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#2563EB]">About Us</Link></li>
                <li><Link href="/services" className="hover:text-[#2563EB]">Services</Link></li>
                <li><Link href="/contact" className="hover:text-[#2563EB]">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-semibold mb-6">Contact Us</h4>
              <div className="flex gap-3 text-sm text-[#6E727A]">
                <Icon icon="lucide:map-pin" className="w-5 h-5 text-[#2563EB] shrink-0" />
                <span>123 Technology Way,<br />Suite 100, Tech City, ST 90210</span>
              </div>
              <div className="flex gap-3 text-sm text-[#6E727A]">
                <Icon icon="lucide:phone" className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex gap-3 text-sm text-[#6E727A]">
                <Icon icon="lucide:mail" className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>hello@wiredaudiovideo.com</span>
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-6">Office Hours</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6E727A]">Mon - Fri:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E727A]">Sat:</span>
                  <span className="font-medium">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6E727A]">Sun:</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#D1D4D9] flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-[#6E727A]">
            <p>© 2026 Wired Audio Video. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#2563EB]">Privacy Policy</a>
              <a href="#" className="hover:text-[#2563EB]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
