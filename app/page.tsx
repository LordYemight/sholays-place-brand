'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  Layers, 
  PenTool, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  ImageOff, 
  CheckCheck,
  ChevronRight,
  Package,
  Award,
  Briefcase
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "Sholays Place Brand",
  tagline: "The Masterpiece of Packaging.",
  description: "Shomolu's premier industrial printing house, where sophisticated design meets precision manufacturing at scale.",
  industry: "Industrial Services",
  region: "Nigeria",
  contact: {
    instagram: "sholaysplace_brand",
    address: "Shomolu, Lagos, Nigeria"
  }
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1759563874672-e7dfb1ca3f73?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1760804876166-aae5861ec7c1?q=80&w=1080",
    "https://images.unsplash.com/photo-1759563874667-73fd773d33d0?q=80&w=1080",
    "https://images.unsplash.com/photo-1760804876161-ba0337e998fe?q=80&w=1080",
    "https://images.unsplash.com/photo-1765282946661-1975d58f9bf6?q=80&w=1080"
  ]
};

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-200 ${className}`}>
        <ImageOff size={24} className="text-zinc-400" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill} 
      width={!fill ? width : undefined} 
      height={!fill ? height : undefined} 
      className={className} 
      priority={priority}
      onError={() => setError(true)}
    />
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: featRef, isVisible: featVisible } = useScrollReveal();
  const { ref: prodRef, isVisible: prodVisible } = useScrollReveal();
  const { ref: abtRef, isVisible: abtVisible } = useScrollReveal();
  const { ref: testRef, isVisible: testVisible } = useScrollReveal();
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-industrial-gradient shadow-xl py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent flex items-center justify-center font-heading font-bold text-xl text-white">S</div>
              <span className={`font-heading text-2xl font-bold tracking-tight transition-colors ${scrolled ? 'text-white' : 'text-white'}`}>
                Sholays
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Catalog', 'Our Process', 'Story', 'Contact'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(' ', '')}`} 
                className="text-white/80 hover:text-accent text-xs font-bold uppercase tracking-widest transition-colors"
              >
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-accent text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all">
              Start Project
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center">
          <div className="w-10 h-10 bg-accent flex items-center justify-center font-heading font-bold text-xl text-white">S</div>
          <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col gap-8 p-8 mt-12">
          {['Catalog', 'Our Process', 'Story', 'Contact'].map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(' ', '')}`} 
              onClick={() => setMobileMenu(false)}
              className="text-white text-4xl font-heading font-bold"
            >
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileMenu(false)} className="bg-accent text-white px-8 py-5 text-lg font-bold uppercase tracking-widest text-center mt-8">
            Start Project
          </a>
        </div>
      </div>

      {/* Hero Section (HR-B Pattern) */}
      <section id="home" ref={heroRef} className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage src={IMAGES.hero} alt={brand.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent" />
        <div className={`relative z-10 max-w-4xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-bold text-white leading-[0.85] tracking-tighter">
            The Masterpiece<br />of Packaging.
          </h1>
          <p className="text-white/80 mt-10 text-xl md:text-2xl max-w-2xl leading-relaxed font-light">
            Shomolu&apos;s premier industrial printing house, where sophisticated design meets precision manufacturing at scale.
          </p>
          <div className="flex flex-wrap gap-6 mt-12">
            <a href="#contact" className="bg-accent text-white px-10 py-5 font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              Start Project
            </a>
            <a href="#catalog" className="flex items-center gap-3 text-white border-b border-white/30 pb-1 hover:border-accent transition-all group">
              <span className="font-bold uppercase tracking-widest text-sm">Explore Catalog</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Divider D-RULE */}
      <div className="bg-secondary py-12 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-primary/20" />
        <span className="text-primary/60 font-mono text-[10px] tracking-[0.4em] uppercase whitespace-nowrap">
          Industrial Grade Precision
        </span>
        <div className="flex-1 h-px bg-primary/20" />
      </div>

      {/* Features Section (F-STICKY Variant) */}
      <section id="ourprocess" ref={featRef} className="py-32 bg-secondary px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`mb-20 transition-all duration-700 ${featVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-primary">Our Core Services</h2>
            <p className="text-primary/60 mt-4 text-xl">Precision in Every Fold</p>
          </div>
          <div className="space-y-6">
            {[
              { title: "Precision Die-Cutting", desc: "Using ultra-thin borders and advanced machinery for exact packaging dimensions.", icon: <Scissors className="text-accent" /> },
              { title: "Industrial Excellence", desc: "Capability to handle high-volume production with consistent quality control.", icon: <Layers className="text-accent" /> },
              { title: "Bespoke Engineering", desc: "Customized design solutions tailored to your product&apos;s unique physical profile.", icon: <PenTool className="text-accent" /> }
            ].map((f, idx) => (
              <div key={idx} className="sticky group" style={{ top: `${100 + idx * 30}px` }}>
                <div className={`bg-white rounded-3xl p-10 border border-primary/5 shadow-xl transition-all duration-500
                  ${featVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                  style={{ transitionDelay: `${idx * 150}ms` }}>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                      {f.icon}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-3xl font-bold text-primary">{f.title}</h3>
                        <span className="text-primary/10 font-mono text-4xl font-bold">0{idx + 1}</span>
                      </div>
                      <p className="text-primary/70 mt-4 text-lg leading-relaxed max-w-xl">{f.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section (P-LIST Variant - Requested in Signature) */}
      <section id="catalog" ref={prodRef} className="py-32 bg-primary px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className={`transition-all duration-1000 ${prodVisible ? 'opacity-100' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-white">The Packaging Catalog</h2>
              <p className="text-white/50 mt-4 text-lg">Bespoke Solutions for Modern Brands</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-white/10 mx-10 mb-5" />
          </div>

          <div className="space-y-4">
            {[
              { name: "Branded Luxury Packaging", desc: "Premium rigid boxes with gold foil embossing for high-end retail products.", price: "₦250,000" },
              { name: "Custom Product Sleeves", desc: "High-precision die-cut sleeves designed for sophisticated brand presentation.", price: "₦85,000" },
              { name: "Industrial Labeling", desc: "Weather-resistant, high-definition labels for large scale manufacturing runs.", price: "₦45,000" },
              { name: "Premium Retail Bags", desc: "Heavyweight matte-finish carrier bags with reinforced handles and branding.", price: "₦120,000" }
            ].map((p, i) => (
              <div 
                key={i} 
                className={`group flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-500 cursor-default ${prodVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="font-heading text-5xl font-bold text-accent/30 w-16 shrink-0 group-hover:text-accent transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-2xl font-bold text-white group-hover:translate-x-2 transition-transform">{p.name}</h3>
                  <p className="text-white/40 mt-1 text-sm">{p.desc}</p>
                </div>
                <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                  <span className="text-white font-bold text-xl">{p.price}</span>
                  <a href="#contact" className="text-accent text-xs font-bold uppercase tracking-widest border-b border-accent/20 pb-0.5 hover:border-accent transition-all">Order Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (V3 Horizontal Split) */}
      <section id="story" ref={abtRef} className="min-h-[80vh] flex flex-col md:flex-row bg-secondary overflow-hidden">
        <div className={`w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center transition-all duration-1000 ${abtVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight">The Masterpiece Story</h2>
          <p className="text-primary/70 text-lg leading-relaxed mb-12">
            Located in Shomolu, the nerve center of Nigerian printing, we combine local grit with global design standards to deliver packaging that elevates. Our mission is to transform the perception of &quot;Made in Nigeria&quot; through industrial excellence.
          </p>
          <div className="grid grid-cols-2 gap-10">
            {[
              { num: "500k+", label: "Units Shipped", icon: <Package className="text-accent" /> },
              { num: "15+", label: "Years in Industry", icon: <Award className="text-accent" /> },
              { num: "200+", label: "Corporate Clients", icon: <Briefcase className="text-accent" /> }
            ].slice(0, 2).map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="w-8 h-8 flex items-center justify-center mb-2">{s.icon}</div>
                <p className="font-heading text-4xl font-bold text-primary">{s.num}</p>
                <p className="text-primary/50 text-xs uppercase tracking-widest font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={`w-full md:w-1/2 relative min-h-[500px] transition-all duration-1000 delay-300 ${abtVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <SafeImage src={IMAGES.products[3]} alt="Sholays Industrial" fill className="object-cover" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/90 backdrop-blur-md shadow-2xl">
            <p className="text-primary font-heading text-2xl font-bold leading-tight italic">
              &ldquo;We don&apos;t just print boxes; we engineer first impressions for the luxury market.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials (T-SPOTLIGHT) */}
      <section ref={testRef} className="py-32 px-6 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 ${testVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-16">Industrial Trust</h2>
            <div className="relative py-20 px-8 rounded-[3rem] bg-secondary/50 border border-primary/5">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white text-3xl font-heading">&ldquo;</div>
              <p className="text-primary/80 text-2xl md:text-3xl font-heading leading-relaxed mb-10">
                The attention to detail in their packaging transformed our brand perception instantly. They are truly the master of the craft.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-heading text-2xl font-bold border-4 border-white shadow-xl">
                  O
                </div>
                <div className="text-left">
                  <p className="font-bold text-primary text-lg">Olawale Adeyemi</p>
                  <p className="text-primary/50 text-sm uppercase tracking-widest font-bold">CEO, Zenith Luxe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (C2 Diagonal Split) */}
      <section id="contact" ref={contactRef} className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-accent" />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,65%_0,40%_100%,0_100%)] hidden md:block" />
        <div className="absolute inset-0 bg-primary md:hidden" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center w-full py-20">
          <div className={`transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-bold text-white leading-[0.9]">
              Ready for Work<br />
              <span className="text-white/40 italic">Beredi Fun Ise</span>
            </h2>
            <p className="text-white/70 mt-8 text-xl max-w-sm leading-relaxed">
              Partner with the standard-bearers of Shomolu. Let&apos;s build your masterpiece today.
            </p>
            <div className="mt-12 space-y-6">
              <a href={`https://instagram.com/${brand.contact.instagram}`} className="flex items-center gap-4 text-white hover:text-white/70 transition-colors group">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                  <Instagram size={20} />
                </div>
                <span className="font-bold tracking-widest uppercase text-sm">@{brand.contact.instagram}</span>
              </a>
              <div className="flex items-center gap-4 text-white group">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <span className="font-bold tracking-widest uppercase text-sm">{brand.contact.address}</span>
              </div>
            </div>
          </div>

          <div className={`bg-white/5 backdrop-blur-xl p-10 md:p-14 rounded-[2rem] border border-white/10 shadow-2xl transition-all duration-1000 delay-300 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent flex items-center justify-center font-heading font-bold text-xl text-white">S</div>
                <span className="font-heading text-3xl font-bold text-white">Sholays</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed text-lg">
                Precision manufacturing and sophisticated design at the heart of Lagos printing industry.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Catalog', 'Our Process', 'Story'].map(item => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-white/40 hover:text-accent transition-colors text-sm font-medium">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/40 hover:text-accent transition-colors text-sm font-medium">Instagram</a></li>
                <li><a href="#" className="text-white/40 hover:text-accent transition-colors text-sm font-medium">WhatsApp</a></li>
                <li><a href="#" className="text-white/40 hover:text-accent transition-colors text-sm font-medium">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Sholays Place Brand. All rights reserved.
            </p>
            <p className="text-white/20 text-xs font-mono tracking-widest uppercase italic">
              Sharp delivery, nationwide.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="text-center py-10 animate-scaleIn">
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCheck size={40} className="text-accent" />
        </div>
        <h3 className="font-heading text-3xl font-bold text-white mb-2">Message Sent</h3>
        <p className="text-white/60">We&apos;ll get back to you faster than a printing press.</p>
        <button onClick={() => setSent(false)} className="mt-8 text-accent font-bold uppercase tracking-widest text-sm underline">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input 
          type="text" 
          placeholder="Full Name" 
          required
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})}
          className="bg-white/10 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/40 outline-none focus:border-accent transition-all"
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          required
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          className="bg-white/10 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/40 outline-none focus:border-accent transition-all"
        />
      </div>
      <input 
        type="tel" 
        placeholder="Phone Number" 
        value={form.phone}
        onChange={e => setForm({...form, phone: e.target.value})}
        className="w-full bg-white/10 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/40 outline-none focus:border-accent transition-all"
      />
      <textarea 
        rows={4} 
        placeholder="Project Brief" 
        required
        value={form.message}
        onChange={e => setForm({...form, message: e.target.value})}
        className="w-full bg-white/10 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/40 outline-none focus:border-accent transition-all resize-none"
      />
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-accent text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] shadow-xl hover:brightness-110 transition-all disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Send Inquiry'}
      </button>
    </form>
  );
}