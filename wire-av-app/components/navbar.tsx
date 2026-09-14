"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { ConsultationModal } from "@/components/consultation-modal";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-[#F3F7FE]/60 backdrop-blur-md border-b border-[#D2D7E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
            <Image
              src="/assets/logo-mark.svg"
              alt="Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Wired Audio Video
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#0F172A]/80 hover:text-[#2563EB] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
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
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <Icon
            icon={isMenuOpen ? "lucide:x" : "lucide:menu"}
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#D2D7E1] bg-[#F3F7FE]/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-[#0F172A] hover:text-[#2563EB] hover:bg-[#E8F0FE] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#D2D7E1]">
              <ConsultationModal>
                <button className="w-full bg-[#2563EB] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:bg-[#1D4ED8] transition-all">
                  Schedule a Consultation
                </button>
              </ConsultationModal>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
