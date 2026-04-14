'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Printer, 
  Package, 
  Truck, 
  PenTool, 
  CheckCheck, 
  Menu, 
  X, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ImageOff,
  Clock,
  Users,
  CheckCircle,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Stat { number: string; label: string; icon: string; }
interface Feature { title: string; description: string; icon: string; }
interface Product { name: string; description: string; price: string; image_url: string; }
interface Testimonial { name: string; text: string; role: string; }

// --- Safe Image Component ---
function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// --- Hooks ---
const useScrollReveal = (threshold = 0.1) => {
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

const useTypewriter = (text: string, speed = 60) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- Icons Mapping ---
const iconMap: Record<string, React.ReactNode> = {
  Printer: <Printer size={24} />,
  Package: <Package size={24} />,
  Globe: <Truck size={24} />,
  PenTool: <PenTool size={24} />,
  CheckCircle: <CheckCircle size={24} />,
  Users: <Users size={24} />,
  Clock: <Clock size={24} />
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = {
    name: "Sholays Place Brand",
    tagline: "The Hub of Premium Packaging & Printing.",
    description: "Based in the heart of Shomolu, Lagos, we deliver top-tier printing and custom packaging solutions to brands worldwide. From custom stickers to corporate branding, we define quality.",
    industry: "Services",
    region: "Nigeria"
  };

  const contact = {
    whatsapp: "+2348087722602",
    instagram: "sholaysplace_brand",
    email: "",
    address: "Shomolu, Lagos, Nigeria"
  };

  const products: Product[] = [
    { name: "Custom Die-Cut Stickers", description: "High-gloss, weather-resistant stickers for product labeling and branding.", price: "₦12,500", image_url: "https://picsum.photos/seed/sholays1/800/1000" },
    { name: "Branded Nylon Bags", description: "Premium printed packaging bags available in various sizes and thicknesses.", price: "₦45,000", image_url: "https://picsum.photos/seed/sholays2/800/1000" },
    { name: "Corporate Identity Cards", description: "Professional PVC cards with high-fidelity color printing and lamination.", price: "₦25,000", image_url: "https://picsum.photos/seed/sholays3/800/1000" },
    { name: "Premium Branded Aprons", description: "Durable fabric aprons with custom screen-printed or embroidered logos.", price: "₦18,000", image_url: "https://picsum.photos/seed/sholays4/800/1000" }
  ];

  const features: Feature[] = [
    { title: "Precision Printing", description: "Sharp, vibrant, and accurate colors using industry-leading machinery in Shomolu.", icon: "Printer" },
    { title: "Bespoke Packaging", description: "Customized nylon bags and stickers tailored to your brand's unique identity.", icon: "Package" },
    { title: "Global Shipping", description: "Swift worldwide shipping through DHL to ensure your brand reaches every corner.", icon: "Globe" },
    { title: "Creative Edge", description: "Professional design consultation to bring your creative vision to life.", icon: "PenTool" }
  ];

  const testimonials: Testimonial[] = [
    { name: "Tunde Bakare", text: "The nylon bags were top-notch. Best printing quality I have seen in Shomolu.", role: "CEO, Bakare Ventures" },
    { name: "Adesua Okonjo", text: "My custom stickers arrived in London via DHL in perfect condition. Incredible service!", role: "Founder, Luxe Beauty" },
    { name: "Chidi Eze", text: "Sholays Place transformed our corporate branding. The T-shirts and cards are professional.", role: "Marketing Director" }
  ];

  const typedHero = useTypewriter("PRINTING. PACKAGING. BRANDING.");

  const fReveal = useScrollReveal();
  const aReveal = useScrollReveal();
  const pReveal = useScrollReveal();
  const tReveal = useScrollReveal();
  const cReveal = useScrollReveal();

  return (
    <main className="relative min-h-screen">
      
      {/* Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-secondary/95 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-white text-xl rounded">S</div>
            <span className="font-heading text-xl font-black text-white tracking-tighter hidden sm:block">SHOLAYS PLACE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Services', 'Products', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-primary transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-primary px-6 py-2 rounded-full text-sm font-bold text-white hover:brightness-110 transition-all">
              Start Your Project
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-black/60 transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMenuOpen(false)}>
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-secondary p-8 flex flex-col transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-12">
            <span className="font-black text-primary text-2xl">S_P</span>
            <button onClick={() => setMenuOpen(false)}><X size={32} className="text-white" /></button>
          </div>
          <div className="flex flex-col gap-6">
            {['Home', 'Services', 'Products', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-3xl font-heading font-bold text-white">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto space-y-4">
            <p className="text-white/40 text-sm tracking-widest uppercase">Connect</p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-full text-white hover:bg-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-3 bg-white/5 rounded-full text-white hover:bg-primary transition-colors"><Phone size={20} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section (Pattern: HR-D) */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-secondary px-6 overflow-hidden relative pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[8.5vw] font-black text-white leading-none tracking-tighter">
            {typedHero}<span className="text-primary animate-pulse">_</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/10 pt-10">
            <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
              {brand.description}
            </p>
            <div className="flex flex-col gap-4">
              <a href="#contact" className="bg-primary text-white px-10 py-5 font-black text-lg
                shadow-[8px_8px_0px_rgba(238,177,52,0.3)]
                hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_rgba(238,177,52,0.3)]
                transition-all duration-200 shrink-0 uppercase">
                Start Project
              </a>
              <p className="text-accent font-mono text-xs uppercase tracking-[0.3em] font-bold">Nigeria & Worldwide Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-10 border-y border-white/5 bg-secondary">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-12">
          {['SHOMOLU', 'QUALITY', 'GLOBAL', 'FAST', 'RELIABLE'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-white/20 text-xs font-mono tracking-widest uppercase">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section (Pattern: F-ICON-GRID) */}
      <section id="services" ref={fReveal.ref} className="py-32 px-6 bg-secondary relative">
        <div className="max-w-7xl mx-auto">
          <div className={`mb-20 transition-all duration-1000 ${fReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 uppercase leading-none">Expert Solutions</h2>
            <p className="text-white/40 text-lg max-w-md">Why leading brands choose Sholays Place for their printing needs. Sharp delivery, nationwide.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`p-10 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-primary/5 hover:border-primary/30 transition-all duration-500 group cursor-default
                ${fReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="mb-8 text-primary group-hover:scale-110 transition-transform w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl">
                  {iconMap[f.icon]}
                </div>
                <h3 className="font-heading font-black text-white text-2xl leading-tight mb-4 uppercase">{f.title}</h3>
                <p className="text-white/40 text-base leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (Split Layout) */}
      <section ref={aReveal.ref} className="py-32 px-6 bg-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-6 font-bold">About Sholays Place</p>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white leading-tight mb-8">THE PRINTING CAPITAL&apos;S FINEST</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10">
              Located in Shomolu, Lagos, we stand at the intersection of tradition and modern innovation. We don&apos;t just print; we build brand identities that command attention across the globe.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-secondary p-4 border border-white/10 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent"><CheckCircle size={24} /></div>
                <div>
                  <p className="text-white font-bold text-lg">100%</p>
                  <p className="text-white/40 text-xs uppercase tracking-tighter">Print Quality</p>
                </div>
              </div>
              <div className="bg-secondary p-4 border border-white/10 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent"><Users size={24} /></div>
                <div>
                  <p className="text-white font-bold text-lg">5000+</p>
                  <p className="text-white/40 text-xs uppercase tracking-tighter">Happy Clients</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 delay-300 ${aReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="absolute inset-0 bg-primary/20 -rotate-6 rounded-3xl" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10">
              <SafeImage src="https://picsum.photos/seed/sholays5/1000/1000" alt="About" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section (Pattern: P-STAGGER) */}
      <section id="products" ref={pReveal.ref} className="py-32 bg-secondary px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-24">
          <h2 className={`font-heading text-6xl md:text-8xl font-black text-white leading-none uppercase mb-4 transition-all duration-700 ${pReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
            Our Collection
          </h2>
          <p className="text-white/30 font-mono tracking-widest uppercase">Premium products crafted for excellence</p>
        </div>

        <div className="max-w-6xl mx-auto space-y-40">
          {products.map((p, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${pReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
                  <SafeImage src={p.image_url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className={`absolute -bottom-8 ${i % 2 === 0 ? '-right-8' : '-left-8'} w-full h-full bg-primary/10 rounded-2xl -z-10`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-mono text-accent text-sm font-bold tracking-[0.4em] uppercase mb-6 block">0{i + 1} Featured Product</span>
                <h3 className="font-heading text-4xl md:text-6xl font-black text-white leading-tight mb-6 uppercase">{p.name}</h3>
                <p className="text-white/50 text-xl leading-relaxed mb-8">{p.description}</p>
                <div className={`flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'items-start md:items-end'}`}>
                  <span className="text-4xl font-black text-primary">{p.price}</span>
                  <a href="#contact" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-sm uppercase hover:bg-primary hover:text-white transition-all">
                    Order Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials (Pattern: T-SLIDER) */}
      <section ref={tReveal.ref} className="py-32 bg-zinc-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase">Client Feedback</h2>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-[450px] shrink-0 bg-secondary border border-white/5 rounded-[2rem] p-10 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1.5 mb-8">
                    {[1,2,3,4,5].map(n => <div key={n} className="w-2.5 h-2.5 rounded-full bg-accent" />)}
                  </div>
                  <p className="text-white/80 text-lg md:text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-white text-lg">{t.name}</p>
                    <p className="text-white/40 text-sm uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (Pattern: C4) */}
      <section id="contact" ref={cReveal.ref} className="py-32 px-6 bg-accent">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-[12vw] md:text-[8vw] font-black text-secondary leading-none mb-16 uppercase transition-all duration-700">
            Get a Quote
          </h2>
          <div className={`grid md:grid-cols-[1fr_1.5fr] gap-20 items-start border-t-4 border-secondary/20 pt-16 transition-all duration-1000 ${cReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="space-y-8">
              <p className="text-secondary font-black text-2xl uppercase leading-tight max-w-xs">Let&apos;s build something remarkable together.</p>
              <div className="space-y-4">
                <a href={`https://wa.me/${contact.whatsapp.replace(/\+/g,'')}`} className="flex items-center gap-4 text-secondary/70 hover:text-secondary transition-colors font-bold text-lg group">
                  <Phone size={24} className="group-hover:rotate-12 transition-transform" />
                  {contact.whatsapp}
                </a>
                <a href="#" className="flex items-center gap-4 text-secondary/70 hover:text-secondary transition-colors font-bold text-lg group">
                  <Instagram size={24} className="group-hover:scale-110 transition-transform" />
                  @{contact.instagram}
                </a>
                <div className="flex items-start gap-4 text-secondary/70 font-bold text-lg">
                  <MapPin size={24} className="shrink-0" />
                  {contact.address}
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary pt-32 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary flex items-center justify-center font-black text-white text-2xl rounded-lg">S</div>
                <span className="font-heading text-2xl font-black text-white tracking-tighter uppercase">SHOLAYS PLACE</span>
              </div>
              <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
                {brand.description}
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-white/5 rounded-full text-white hover:bg-primary transition-all"><Instagram size={20} /></a>
                <a href="#" className="p-3 bg-white/5 rounded-full text-white hover:bg-primary transition-all"><Mail size={20} /></a>
              </div>
            </div>
            
            <div>
              <p className="text-white font-black text-lg mb-8 uppercase tracking-widest">Navigation</p>
              <div className="flex flex-col gap-4">
                {['Home', 'Services', 'Products', 'Contact'].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-primary transition-colors">{item}</a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-white font-black text-lg mb-8 uppercase tracking-widest">Global Ops</p>
              <div className="flex flex-col gap-4">
                <p className="text-white/40">Shomolu Production Hub</p>
                <p className="text-white/40">Lagos Head Office</p>
                <p className="text-white/40">DHL Express Partner</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 text-white/20 text-xs font-mono tracking-widest uppercase">
            <p>&copy; {new Date().getFullYear()} {brand.name}. All Rights Reserved.</p>
            <div className="flex gap-8">
              <span>Built for Brands</span>
              <span>Lagos, Nigeria</span>
            </div>
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
      <div className="flex flex-col items-center justify-center py-20 text-center animate-scaleIn bg-secondary/10 rounded-[2rem] border border-secondary/20">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-8 border border-white/10 shadow-xl">
          <CheckCheck size={40} className="text-accent" />
        </div>
        <h3 className="font-heading text-3xl font-black text-secondary uppercase">Project Received</h3>
        <p className="text-secondary/60 mt-4 max-w-xs font-bold">Our print specialists in Shomolu will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        {(['name', 'email', 'phone'] as const).map(field => (
          <div key={field} className={field === 'phone' ? 'sm:col-span-2' : ''}>
            <input
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
              required={field !== 'phone'}
              className="w-full bg-secondary/5 border-2 border-secondary/20 rounded-2xl px-6 py-4
                text-secondary placeholder-secondary/40 text-lg font-bold outline-none
                focus:border-secondary focus:bg-white/10 transition-all"
            />
          </div>
        ))}
      </div>
      <textarea
        rows={5}
        placeholder="Tell us about your project requirements..."
        value={form.message}
        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
        required
        className="w-full bg-secondary/5 border-2 border-secondary/20 rounded-2xl px-6 py-4
          text-secondary placeholder-secondary/40 text-lg font-bold outline-none resize-none
          focus:border-secondary focus:bg-white/10 transition-all"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-secondary text-white py-6 rounded-2xl font-black text-xl uppercase tracking-widest
          hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
          shadow-2xl"
      >
        {loading ? 'Processing...' : 'Send Inquiry'}
      </button>
    </form>
  );
}