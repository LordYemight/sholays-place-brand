'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Box, 
  Printer, 
  Scaling, 
  Truck, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCheck,
  ImageOff,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Palette
} from 'lucide-react';

const IMAGES = {
  hero: "https://picsum.photos/seed/services0/1600/900",
  products: [
    "https://picsum.photos/seed/services2/800/600",
    "https://picsum.photos/seed/services3/800/600",
    "https://picsum.photos/seed/services4/800/600",
    "https://picsum.photos/seed/services5/800/600"
  ]
};

const BRAND = {
  name: "Sholays Place Brand",
  tagline: "The Masterpiece of Packaging.",
  description: "Industrial excellence and sophisticated design for brands that demand precision and scale. We transform functional packaging into a brand's greatest asset through meticulous craftsmanship.",
  industry: "services",
  region: "Nigeria",
  currency: "₦"
};

const navLinks = [
  { name: "Work", href: "#products" },
  { name: "Standards", href: "#features" },
  { name: "About", href: "#about" },
  { name: "Inquiry", href: "#contact" }
];

const features = [
  { title: "Bespoke Engineering", description: "Every structure is custom-built to the exact dimensions of your product.", icon: Scaling },
  { title: "Industrial Precision", description: "Automated cutting and folding systems ensure 100% consistency across units.", icon: Cpu },
  { title: "Sophisticated Design", description: "An 'Apple-esque' approach to the aesthetics of physical printing.", icon: Palette },
  { title: "Rapid Fulfillment", description: "Optimized logistics pipeline for Lagos-based businesses and beyond.", icon: Truck }
];

const products = [
  { name: "Luxury Gift Boxes", description: "Custom-engineered rigid boxes with premium finishing and morning cream interiors.", price: "₦5,500" },
  { name: "Bespoke Shopping Bags", description: "High-GSM reinforced paper bags featuring precision-stamped golden ochre branding.", price: "₦1,200" },
  { name: "Industrial Product Sleeves", description: "Sleek, minimalist sleeves designed for tech and cosmetic hardware packaging.", price: "₦850" },
  { name: "Branded Vinyl Roll", description: "Weather-resistant, industrial-grade adhesive stickers for large scale application.", price: "₦15,000" }
];

const testimonial = {
  name: "Oluwaseun Adeyemi",
  role: "CEO, Zenith Luxe",
  text: "The level of sophistication in their steel blue finishes is unmatched in Lagos. They truly are the masters of the craft."
};

const stats = [
  { number: "12+", label: "Years Experience" },
  { number: "2k+", label: "Global Brands" },
  { number: "1.5M+", label: "Annual Prints" }
];

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-200 ${className}`}>
        <ImageOff size={24} className="text-zinc-400" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const heroRev = useScrollReveal(0.1);
  const featRev = useScrollReveal(0.15);
  const prodRev = useScrollReveal(0.15);
  const aboutRev = useScrollReveal(0.15);
  const testRev = useScrollReveal(0.15);
  const contactRev = useScrollReveal(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-heading font-black text-xl">
              S
            </div>
            <span className={`font-heading font-black text-lg tracking-tighter ${
              scrolled ? 'text-primary' : 'text-white'
            }`}>
              SHOLAYS
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className={`text-sm font-bold tracking-widest uppercase transition-colors ${
                scrolled ? 'text-zinc-600 hover:text-accent' : 'text-white/80 hover:text-accent'
              }`}>
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-white px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
              Start Project
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className={scrolled ? 'text-primary' : 'text-white'} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-10 flex flex-col">
          <button className="self-end text-white mb-12" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-white font-heading text-3xl font-black" onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-white py-4 rounded-xl text-center font-bold text-lg mt-8" onClick={() => setIsMenuOpen(false)}>
              Start Project
            </a>
          </div>
          <div className="mt-auto">
            <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Connect</p>
            <a href="https://instagram.com/sholaysplace_brand" target="_blank" className="text-white flex items-center gap-2 mt-2">
              <Instagram size={18} /> @sholaysplace_brand
            </a>
          </div>
        </div>
      </div>

      {/* Hero: HR-B */}
      <section id="home" className="min-h-screen relative flex items-end pb-24 px-6 md:px-16 overflow-hidden bg-primary">
        <SafeImage src={IMAGES.hero} alt="Packaging Masterpiece" fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="relative z-10 max-w-4xl">
          <h1 className={`font-heading text-6xl md:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter transition-all duration-1000 ${
            heroRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {BRAND.tagline}
          </h1>
          <p className="text-white/80 mt-8 text-xl max-w-2xl leading-relaxed font-medium">
            Merging industrial scale with the precision of high-end design. Elevate your brand&apos;s physical presence in every unboxing.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            <a href="#contact" className="bg-accent text-white px-10 py-5 font-black text-lg hover:brightness-110 transition-all rounded-full flex items-center justify-center gap-2 shadow-2xl">
              Start Project <ChevronRight size={20} />
            </a>
            <a href="#products" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 font-bold text-lg hover:bg-white/20 transition-all rounded-full text-center">
              View Collection
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRev.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Legacy Hub</span>
              <h2 className="font-heading text-5xl font-black text-primary leading-tight">The Standard of Shomolu</h2>
              <p className="text-zinc-600 mt-6 text-lg leading-relaxed">
                Located in the heart of Nigeria&apos;s printing hub, Sholays Place Brand combines local heritage with global design standards to create the &quot;Apple&quot; of packaging services.
              </p>
              <p className="text-zinc-500 mt-4 italic font-medium">
                Sharp delivery, nationwide.
              </p>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${aboutRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                <Box className="text-accent mb-4" size={32} />
                <h3 className="font-heading text-xl font-bold">Luxe Finish</h3>
                <p className="text-zinc-500 text-sm mt-2">Premium coating and textures for high-end retail.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                <ShieldCheck className="text-primary mb-4" size={32} />
                <h3 className="font-heading text-xl font-bold">Durability</h3>
                <p className="text-zinc-500 text-sm mt-2">Reinforced structures built for logistics stress.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D-STAT Divider */}
      <div className="bg-accent py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-6 md:py-0">
              <p className="text-5xl font-black text-white tracking-tighter">{s.number}</p>
              <p className="text-white/80 text-sm mt-2 font-bold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Products: P-LIST */}
      <section id="products" ref={prodRev.ref} className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-mono text-xs tracking-[0.4em] uppercase mb-4 block">Collection</span>
            <h2 className="font-heading text-5xl font-black text-primary">The Collection</h2>
            <p className="text-zinc-400 mt-2 text-sm font-bold tracking-[0.2em] uppercase">01 — Numbered Packaging Categories</p>
          </div>
          <div className="space-y-4">
            {products.map((p, i) => (
              <div key={i} className={`group flex items-center gap-6 p-8 rounded-2xl border border-zinc-100
                hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 ${
                  prodRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <span className="font-heading text-zinc-100 text-6xl font-black tracking-tighter w-20 shrink-0 group-hover:text-accent/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold text-primary">{p.name}</h3>
                  <p className="text-zinc-500 mt-1 text-base">{p.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-2xl text-accent">{p.price}</p>
                  <a href="#contact" className="text-xs font-bold text-zinc-400 group-hover:text-primary transition-colors mt-2 block uppercase tracking-widest underline decoration-accent/30 underline-offset-4">Inquire</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features: F-ICON-GRID */}
      <section id="features" ref={featRev.ref} className="py-28 px-6 bg-primary">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl font-black text-white">Precision and Scale</h2>
            <p className="text-white/50 text-xl mt-4">How we redefine industrial excellence.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className={`p-10 rounded-3xl bg-white/5 border border-white/10
                  hover:bg-accent hover:border-accent transition-all duration-500 group cursor-default ${
                    featRev.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}>
                  <Icon className="text-accent group-hover:text-white mb-8 transition-colors" size={40} />
                  <h3 className="font-heading font-black text-white text-2xl leading-tight mb-4">{f.title}</h3>
                  <p className="text-white/60 group-hover:text-white/90 text-sm leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials: T-SPOTLIGHT */}
      <section ref={testRev.ref} className="py-28 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl font-black text-primary mb-16">Industry Voice</h2>
          <div className={`relative py-16 px-10 rounded-[3rem] border border-zinc-200 bg-white shadow-xl transition-all duration-1000 ${
            testRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-black leading-none mt-2">&ldquo;</span>
            </div>
            <p className="text-primary text-2xl md:text-3xl leading-relaxed italic font-medium">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl border-2 border-primary/20">
                {testimonial.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-heading font-black text-primary text-lg">{testimonial.name}</p>
                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact: C2 */}
      <section id="contact" ref={contactRev.ref} className="relative overflow-hidden py-32 bg-primary">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,65%_0,45%_100%,0_100%)] hidden md:block" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-7xl font-black text-white leading-none">Begin the Masterpiece</h2>
            <p className="text-white/70 mt-8 text-xl max-w-sm font-medium">Elevate your product experience. Speak with our design engineers today.</p>
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4 text-white group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <MapPin size={20} />
                </div>
                <span className="font-bold">Shomolu, Lagos, Nigeria</span>
              </div>
              <a href="https://instagram.com/sholaysplace_brand" target="_blank" className="flex items-center gap-4 text-white group">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <Instagram size={20} />
                </div>
                <span className="font-bold">@sholaysplace_brand</span>
              </a>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${contactRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-zinc-900/40 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-scaleIn">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 border border-accent/30">
                    <CheckCheck size={40} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-3xl font-black text-white">Project Initiated</h3>
                  <p className="text-white/60 mt-4 max-w-xs text-lg">Our master craftsmen will reach out to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {(['name', 'email', 'phone'] as const).map(field => (
                    <input key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]}
                      onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                      required={field !== 'phone'}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4
                        text-white placeholder-white/30 text-base outline-none
                        focus:border-accent focus:bg-white/10 transition-all" />
                  ))}
                  <textarea rows={4} placeholder="Detailed project requirements..."
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4
                      text-white placeholder-white/30 text-base outline-none resize-none
                      focus:border-accent focus:bg-white/10 transition-all" />
                  <button type="submit" disabled={loading}
                    className="w-full bg-accent text-white py-5 rounded-2xl font-black text-xl
                      hover:brightness-110 shadow-xl transition-all duration-300 disabled:opacity-60">
                    {loading ? 'Transmitting...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-primary flex items-center justify-center text-white font-heading font-black text-xl">
                  S
                </div>
                <span className="font-heading font-black text-2xl text-white tracking-tighter">
                  SHOLAYS PLACE BRAND
                </span>
              </div>
              <p className="text-zinc-500 max-w-md text-lg leading-relaxed">
                {BRAND.description}
              </p>
            </div>
            <div>
              <h4 className="font-heading font-black text-white uppercase tracking-widest text-sm mb-6">Navigation</h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-zinc-400 hover:text-accent transition-colors font-medium">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-black text-white uppercase tracking-widest text-sm mb-6">HQ</h4>
              <p className="text-zinc-400 leading-relaxed font-medium">
                Shomolu, Lagos,<br />Nigeria
              </p>
              <div className="mt-8 flex gap-4">
                <a href="https://instagram.com/sholaysplace_brand" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Sholays Place Brand. All rights reserved.
            </p>
            <p className="text-zinc-600 text-xs font-mono uppercase tracking-[0.3em]">
              The Standard of Shomolu
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}