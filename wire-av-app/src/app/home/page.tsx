import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function LandingPage() {
  return (
   <div className="min-h-screen bg-[#F3F7FE] font-body text-[#0F172A]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F3F7FE]/60 backdrop-blur-md border-b border-[#D2D7E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <img src="/assets/IMG_1.svg" alt="Logo" className="w-6 h-6 text-[#F2F7FF]" />
            </div>
            <span className="text-xl font-bold font-display">Wired Audio Video</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#2563EB] transition-colors">Home</Link>
            <Link href="/about" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#2563EB] transition-colors">About</Link>
            <Link href="/services" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#2563EB] transition-colors">Services</Link>
            <Link href="/contact" className="text-sm font-medium text-[#0F172A]/80 hover:text-[#2563EB] transition-colors">Contact</Link>
          </div>

          <button className="hidden lg:block bg-[#2563EB] text-[#F2F7FF] px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-[#1D4ED8] transition-all">
            Schedule a Consultation
          </button>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2">
            <Icon icon="lucide:menu" className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] lg:h-[765px] flex items-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <img src="/assets/IMG_2.webp" alt="Luxury Living Room" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000102e6] via-[#00010299] to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] leading-tight font-bold text-[#F3F7FE] drop-shadow-lg font-display">
              Elevate Your <span className="text-[#7FA5FF]">Living</span> <span className="text-[#7FA5FF]">Experience</span> with Seamless Technology.
            </h1>
            <p className="mt-6 text-lg text-[#D2D7E1]/90 max-w-lg leading-relaxed">
              We specialize in high-end residential and commercial audio-visual solutions, from hidden cinematic soundscapes to intelligent automation.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-[#2563EB] text-[#F2F7FF] px-8 py-4 rounded-full text-base font-bold shadow-xl hover:bg-[#1D4ED8] transition-all">
                View Our Portfolio
              </button>
              <button className="border border-[#F3F7FE] text-[#F3F7FE] px-8 py-4 rounded-full text-base font-bold hover:bg-white/10 transition-all">
                Our Services
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#000102]/40 backdrop-blur-xl border-t border-[#F3F7FE]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: '/assets/IMG_3.svg', label: '15+ Years', sub: 'EXPERTISE' },
                { icon: '/assets/IMG_4.svg', label: '500+ Project', sub: 'COMPLETED' },
                { icon: '/assets/IMG_5.svg', label: 'Smart Home', sub: 'SPECIALISTS' },
                { icon: '/assets/IMG_6.svg', label: 'Certified', sub: 'TECHNICIANS' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <img src={stat.icon} className="w-8 h-8 text-[#2563EB]" alt="" />
                  <div>
                    <div className="text-lg font-bold text-[#F3F7FE]">{stat.label}</div>
                    <div className="text-[10px] tracking-wider text-[#939AAA] uppercase">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold font-display">
            Advanced <span className="text-[#2563EB]">AV Solutions</span>
          </h2>
          <div className="w-20 h-1 bg-[#2563EB] mx-auto mt-4 mb-6" />
          <p className="text-[#596275] max-w-2xl mx-auto">
            Tailored technology integration designed for modern lifestyles and professional excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              img: '/assets/IMG_7.webp',
              icon: '/assets/IMG_8.svg',
              title: 'Structured Pre-Wire',
              desc: 'The backbone of any smart home. We implement future-proof structured cabling systems that ensure rock-solid connectivity for all your devices.'
            },
            {
              img: '/assets/IMG_10.webp',
              icon: '/assets/IMG_11.svg',
              title: 'Small Business Integration',
              desc: 'Elevate your workspace with professional conferencing systems, digital signage, and integrated audio designed for commercial environments.'
            },
            {
              img: '/assets/IMG_12.webp',
              icon: '/assets/IMG_13.svg',
              title: 'Home Cinema & Audio',
              desc: 'Immersive cinematic experiences at home. From high-fidelity multi-room audio to professional-grade home theater projection and seating.'
            }
          ].map((service, i) => (
            <div key={i} className="bg-[#F3F7FE] rounded-xl shadow-sm border border-[#D2D7E1]/30 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <img src={service.img} alt={service.title} className="w-full h-64 object-cover" />
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-12 h-12 bg-[#2563EB]/10 rounded-xl flex items-center justify-center mb-6">
                  <img src={service.icon} className="w-6 h-6 text-[#2563EB]" alt="" />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-sm text-[#596275] leading-relaxed mb-8 flex-1">
                  {service.desc}
                </p>
                <button className="flex items-center gap-2 text-[#2563EB] font-medium text-sm hover:gap-3 transition-all">
                  Learn More <img src="/assets/IMG_9.svg" className="w-4 h-4" alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-[#0A1121] py-24 text-[#F3F7FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div>
              <span className="inline-block px-3 py-1 border border-[#2563EB] rounded-full text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider mb-4">
                How We Work
              </span>
              <h2 className="text-3xl font-semibold font-display">
                Our Seamless <span className="text-[#2563EB]">Workflow</span>
              </h2>
            </div>
            <p className="max-w-lg text-[#D2D7E1]/80 leading-relaxed">
              We believe that premium technology should be matched by a premium experience. Our methodology ensures precision at every milestone.
            </p>
          </div>

          <div className="relative">
            {/* Connector Line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-[#252E43] z-0" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { step: "01", title: "Consultation", desc: "We meet to discuss your vision, space requirements, and performance expectations." },
                { step: "02", title: "System Design", desc: "Our engineers craft a customized blueprint, specifying components and wiring architecture." },
                { step: "03", title: "Installation", desc: "Certified experts perform clean, precise integration with minimal disruption to your site." },
                { step: "04", title: "Commissioning", desc: "Rigorous testing and user training to ensure you're fully empowered with your new system." }
              ].map((item, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="w-16 h-16 bg-[#F3F7FE] rounded-full border-2 border-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.2)] flex items-center justify-center mx-auto lg:mx-0 mb-6">
                    <span className="text-2xl font-black text-[#2563EB]">{item.step}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#7fa5ff] mb-3">{item.title}</h4>
                  <p className="text-sm text-white/80 leading-relaxed max-w-[250px] mx-auto lg:mx-0">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#F3F7FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold font-display">
              What Our <span className="text-[#2563EB]">Clients Say</span>
            </h2>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <img key={i} src="/assets/IMG_14.svg" className="w-5 h-5 text-[#2563EB]" alt="Star" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                quote: 'The team at Wired Audio Video completely transformed our living room. The integration is seamless – you can\'t see the speakers, but the sound is absolutely incredible. Highly recommended!',
                author: 'Sarah Jenkins',
                role: 'Homeowner, Tech City',
                img: '/assets/IMG_16.webp'
              },
              {
                quote: 'Professionalism from start to finish. They handled our office AV pre-wire and conference room setup with technical precision. The system is intuitive and has never failed us during critical meetings.',
                author: 'Michael Chen',
                role: 'CEO, Innovate Hub',
                img: '/assets/IMG_17.webp'
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-10 rounded-xl shadow-sm border border-[#D2D7E1]/30 relative">
                <img src="/assets/IMG_15.svg" className="w-10 h-10 text-[#2563EB] opacity-40 mb-6" alt="Quote" />
                <p className="text-lg italic text-[#0F172A]/90 leading-relaxed mb-8">
                  “{testimonial.quote}”
                </p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.img} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-bold text-[#0F172A]">{testimonial.author}</div>
                    <div className="text-xs uppercase tracking-wider text-[#596275]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative bg-gradient-to-r from-[#2563EB] to-[#24a5eb] rounded-3xl p-12 lg:p-20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
                Ready to start your next project?
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Schedule a professional consultation with our integration specialists today and discover the possibilities of high-end AV technology.
              </p>
            </div>
            <button className="bg-[#F3F7FE] text-[#0F172A] px-10 py-5 rounded-full text-lg font-bold flex items-center gap-4 hover:scale-105 transition-transform whitespace-nowrap">
              Get Started <img src="/assets/IMG_18.svg" className="w-5 h-5" alt="" />
            </button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 opacity-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#596275] mb-12 block">
            Certified Integration Partners
          </span>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 text-2xl md:text-3xl font-black font-display text-[#0F172A]">
            <span>SONOS</span>
            <span>CONTROL4</span>
            <span>CRESTRON</span>
            <span>LUTRON</span>
            <span>BOSE</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#D2D7E1] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-display">Wired Audio Video</h3>
              <p className="text-sm text-[#596275] leading-relaxed">
                Premier providers of high-end home and business audio-visual integration. We specialize in smart home automation and seamless technology experiences.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: 'lucide:instagram', path: '/assets/IMG_22.svg' },
                  { icon: 'lucide:facebook', path: '/assets/IMG_23.svg' },
                  { icon: 'lucide:linkedin', path: '/assets/IMG_24.svg' },
                  { icon: 'lucide:twitter', path: '/assets/IMG_25.svg' }
                ].map((social, i) => (
                  <a key={i} href="#" className="text-[#596275] hover:text-[#2563EB] transition-colors">
                    <img src={social.path} alt="" className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-[#596275]">
                <li><Link href="/" className="hover:text-[#2563EB]">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#2563EB]">About Us</Link></li>
                <li><Link href="/services" className="hover:text-[#2563EB]">Services</Link></li>
                <li><Link href="/contact" className="hover:text-[#2563EB]">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-[#596275]">
                <li className="flex gap-3">
                  <Icon icon="lucide:map-pin" className="w-5 h-5 text-[#2563EB] shrink-0" />
                  <span>123 Technology Way,<br />Suite 100, Tech City, ST 90210</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Icon icon="lucide:phone" className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex gap-3 items-center">
                  <Icon icon="lucide:mail" className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>hello@wiredaudiovideo.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-6">Office Hours</h4>
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

          <div className="pt-8 border-t border-[#D2D7E1] flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[#596275]">
            <p>© 2026 Wired Audio Video. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#2563EB]">Privacy Policy</a>
              <a href="#" className="hover:text-[#2563EB]">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
