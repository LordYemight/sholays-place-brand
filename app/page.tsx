'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Instagram,
  MapPin,
  Phone,
  Menu,
  X,
  ImageOff,
  CheckCheck,
  ChevronRight,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

// BRAND ASSETS & STRINGS
const brand = {
  name: "Sholays Place Brand",
  tagline: "The Masterpiece of Packaging.",
  description: "Delivering industrial excellence and sophisticated design for brands that demand precision and scale.",
  location: "Shomolu, Lagos, Nigeria",
  instagram: "@sholaysplace_brand",
  whatsapp: "+2348087722602",
};

const IMAGES = {
  hero: '/images/sholays_hero_industrial_masterpiece_1776182235193.png',
  stickers: '/images/sholays_stickers_showcase_retry_1776182217501.png',
  tshirt: '/images/sholays_apparel_showcase_1776182134299.png',
  apron: '/images/sholays_apron_showcase_1776182150323.png',
  nylon: '/images/sholays_nylon_bags_showcase_1776182166126.png',
  cards: '/images/sholays_cards_showcase_1776182180786.png',
  packaging: '/images/sholays_packaging_boxes_showcase_1776182196163.png',
};

// UTILITY COMPONENTS
function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-charcoal/20 ${className}`}>
        <ImageOff size={24} className="text-morning-cream/20" />
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

// MAIN PAGE
export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: serviceRef, isVisible: serviceVisible } = useScrollReveal();
  const { ref: productRef, isVisible: productVisible } = useScrollReveal();
  const { ref: testRef, isVisible: testVisible } = useScrollReveal();
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal();

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const catalogue = [
    {
      title: 'Stickers',
      span: 'col-span-1 md:col-span-1 row-span-1 md:row-span-1',
      image: IMAGES.stickers,
      gallery: [
        { url: IMAGES.stickers, name: 'Premium Die-Cut', price: 'from ₦25k' },
        { url: IMAGES.hero, name: 'Industrial Batch', price: 'from ₦150k' },
        { url: IMAGES.packaging, name: 'Metallic Finish', price: 'from ₦45k' }
      ]
    },
    {
      title: 'T-shirt & Apparel',
      span: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2',
      image: IMAGES.tshirt,
      gallery: [
        { url: IMAGES.tshirt, name: 'Cotton Crewneck', price: 'from ₦8k' },
        { url: IMAGES.hero, name: 'Corporate Polo', price: 'from ₦12k' },
        { url: IMAGES.apron, name: 'Protective Aprons', price: 'from ₦15k' }
      ]
    },
    {
      title: 'Apron',
      span: 'col-span-1 md:col-span-1 row-span-1 md:row-span-1',
      image: IMAGES.apron,
      gallery: [
        { url: IMAGES.apron, name: 'Heavy Duty Denim', price: 'from ₦10k' },
        { url: IMAGES.tshirt, name: 'Lightweight Canvas', price: 'from ₦7k' },
        { url: IMAGES.nylon, name: 'Waterproof Nylon', price: 'from ₦5k' }
      ]
    },
    {
      title: 'Nylon Bags',
      span: 'col-span-1 md:col-span-1 row-span-1 md:row-span-2',
      image: IMAGES.nylon,
      gallery: [
        { url: IMAGES.nylon, name: 'Branded T-Shirt Bag', price: 'from ₦30k / 1000pcs' },
        { url: IMAGES.packaging, name: 'Reinforced Die-Cut', price: 'from ₦85k / 500pcs' },
        { url: IMAGES.hero, name: 'Luxury Carrier', price: 'from ₦120k / 100pcs' }
      ]
    },
    {
      title: 'Cards',
      span: 'col-span-1 md:col-span-1 row-span-1 md:row-span-1',
      image: IMAGES.cards,
      gallery: [
        { url: IMAGES.cards, name: 'Spot UV Cards', price: 'from ₦15k' },
        { url: IMAGES.packaging, name: 'Metallic Foil', price: 'from ₦25k' },
        { url: IMAGES.stickers, name: 'Matte Finish', price: 'from ₦10k' }
      ]
    },
    {
      title: 'Packaging Bags',
      span: 'col-span-1 md:col-span-2 row-span-1 md:row-span-1',
      image: IMAGES.packaging,
      gallery: [
        { url: IMAGES.packaging, name: 'Luxury Gift Box', price: 'from ₦2,500 / unit' },
        { url: IMAGES.nylon, name: 'Eco-Friendly Pouch', price: 'from ₦1,200 / unit' },
        { url: IMAGES.cards, name: 'Magnetic Closure', price: 'from ₦4,500 / unit' }
      ]
    }
  ];

  return (
    <main className="relative bg-steel-blue">

      {/* GALLERY MODAL / IMAGE VIEWER */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-charcoal/98 backdrop-blur-2xl flex flex-col pt-32 pb-12 px-8 animate-fadeIn">
          <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
            <div className="flex justify-between items-start mb-16 md:mb-24">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-golden-ochre/60 mb-3">Project Showcase</p>
                <h3 className="font-heading text-5xl md:text-8xl font-light text-morning-cream leading-none tracking-tighter">{selectedItem.title}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-morning-cream hover:bg-white/5 transition-all"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
              {selectedItem.gallery.map((g: any, i: number) => (
                <div key={i} className="min-w-[85vw] md:min-w-[45vw] h-[65vh] md:h-full relative rounded-[3rem] overflow-hidden snap-center bg-charcoal/20 border border-white/5 group">
                  <Image src={g.url} alt={`${selectedItem.title} ${i}`} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  {/* Gallery Item Info Overlay */}
                  <a href="#contact" onClick={() => setSelectedItem(null)} className="absolute inset-x-0 bottom-0 p-10 md:p-14 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent flex flex-col items-start gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-golden-ochre">{g.price}</p>
                    <h4 className="font-heading text-3xl md:text-5xl font-light text-morning-cream">{g.name}</h4>
                    <div className="flex items-center gap-3 text-morning-cream/60 group/btn mt-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest border-b border-white/10 pb-1 group-hover/btn:border-golden-ochre transition-all">Order this masterpiece</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <p className="font-mono text-[10px] text-morning-cream/30 uppercase tracking-[0.4em]">Drag to explore varieties</p>
            </div>
          </div>
        </div>
      )}

      {/* 1. NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-steel-blue/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <a href="#home" className="group flex items-center gap-3">
            <span className="font-heading text-2xl font-bold tracking-tight text-morning-cream">
              SHOLAYS
            </span>
          </a>

          <div className="hidden md:flex items-center gap-12">
            {['Services', 'Products', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-morning-cream/60 hover:text-golden-ochre text-xs font-mono uppercase tracking-[0.2em] transition-all"
              >
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-burnt-orange text-morning-cream px-7 py-3 rounded-full text-xs font-heading font-medium tracking-widest hover:brightness-110 transition-all shadow-lg shadow-burnt-orange/20">
              Start Project
            </a>
          </div>

          <button className="md:hidden text-morning-cream" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[100] bg-[#1a1c1e] transition-transform duration-700 ease-in-out ${mobileMenu ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <span className="font-heading text-2xl font-bold text-morning-cream">SHOLAYS</span>
          <button onClick={() => setMobileMenu(false)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-morning-cream">
            <X size={28} />
          </button>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-8 p-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-golden-ochre/60 mb-4">Navigation</p>
          {['Services', 'Products', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenu(false)}
              className="text-morning-cream text-6xl font-heading font-light tracking-tighter hover:text-golden-ochre transition-all transform hover:translate-x-4"
            >
              {item}
            </a>
          ))}
          <div className="mt-12 pt-12 border-t border-white/5">
            <a href="#contact" onClick={() => setMobileMenu(false)} className="inline-block bg-burnt-orange text-morning-cream px-12 py-6 rounded-2xl text-xl font-heading font-medium tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-burnt-orange/20">
              Start Project
            </a>
          </div>
        </div>
        <div className="p-12 border-t border-white/5 bg-black/20">
          <div className="flex justify-between items-end">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-morning-cream/20 mb-2">Based in</p>
              <p className="text-morning-cream/60 font-light underline decoration-golden-ochre/20 underline-offset-4">Lagos, Nigeria</p>
            </div>
            <div className="flex gap-6">
              <Instagram size={20} className="text-morning-cream/40" />
              <MessageCircle size={20} className="text-morning-cream/40" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION (HR-B Pattern) */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center brightness-[0.4] transition-transform duration-1000 scale-105" style={{ backgroundImage: `url(${IMAGES.hero})` }} />
        {/* Heavy Steel Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-steel-blue via-steel-blue/60 to-transparent" />

        <div className={`relative z-10 max-w-7xl mx-auto px-8 w-full transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[8rem] font-light text-morning-cream tracking-tighter leading-[0.9]">
            The Masterpiece <br />
            of <span className="font-bold text-golden-ochre">Packaging.</span>
          </h1>
          <p className="font-body text-morning-cream/70 mt-8 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            {brand.description}
          </p>
          <div className="mt-12">
            <button className="bg-burnt-orange text-morning-cream px-10 py-5 rounded-full font-heading font-medium tracking-[0.1em] text-sm hover:scale-105 transition-all shadow-xl shadow-burnt-orange/10">
              Start Project
            </button>
          </div>
        </div>
      </section>

      {/* DIVIDER D-RULE */}
      <div className="w-full bg-steel-blue py-12 flex items-center justify-center px-8">
        <div className="flex-[0.2] h-px bg-gradient-to-r from-transparent to-morning-cream/10" />
        <span className="px-6 font-mono text-[10px] tracking-[0.4em] text-golden-ochre/60 uppercase">
          {brand.tagline}
        </span>
        <div className="flex-[0.2] h-px bg-gradient-to-l from-transparent to-morning-cream/10" />
      </div>

      {/* 3. SERVICES (F-STICKY Scroll-stack) */}
      <section id="services" ref={serviceRef} className="py-32 bg-steel-blue">
        <div className="max-w-7xl mx-auto px-8 mb-20">
          <h2 className="font-heading text-sm uppercase tracking-[0.4em] text-golden-ochre mb-4">Our Services</h2>
          <h3 className="font-heading text-5xl md:text-7xl font-light text-morning-cream leading-tight">Precision at <br /><span className="italic font-normal">Scale.</span></h3>
        </div>

        <div className="max-w-7xl mx-auto px-8 space-y-24">
          {[
            { title: "Custom Stickers", desc: "Precision-cut, weather-resistant vinyl stickers scaling from short runs to bulk industrial orders for any environment." },
            { title: "Premium Bags", desc: "Retail and boutique bags engineered for durability and tactile luxury, embodying your brand's physical presence." },
            { title: "Rigid Boxes", desc: "Magnetic and rigid closure boxes designed to protect and elevate the unboxing experience for high-end products." },
            { title: "Corporate Branding", desc: "Unified aesthetic execution across all touchpoints, from aprons to corporate stationery and apparel." }
          ].map((svc, idx) => (
            <div key={idx} className="sticky" style={{ top: `${150 + (idx * 40)}px` }}>
              <div className="bg-steel-blue/40 border-t border-white/10 backdrop-blur-3xl p-12 md:p-16 rounded-[2.5rem] shadow-2xl shadow-charcoal/40 transition-all duration-500 hover:border-white/20">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-heading text-3xl md:text-5xl font-light text-morning-cream">{svc.title}</h3>
                  <span className="font-mono text-morning-cream/10 text-6xl md:text-8xl font-bold leading-none select-none">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <p className="font-body text-morning-cream/60 mt-4 text-lg md:text-xl max-w-2xl leading-relaxed font-light">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER D-RULE */}
      <div className="w-full bg-steel-blue py-12 flex items-center justify-center px-8">
        <div className="flex-[0.2] h-px bg-gradient-to-r from-transparent to-morning-cream/10" />
        <span className="px-6 font-mono text-[10px] tracking-[0.4em] text-golden-ochre/60 uppercase">
          Industrial Excellence Since Inception
        </span>
        <div className="flex-[0.2] h-px bg-gradient-to-l from-transparent to-morning-cream/10" />
      </div>

      {/* 4. PRODUCTS (P-BENTO Grid) */}
      <section id="products" ref={productRef} className="py-32 bg-steel-blue border-t border-morning-cream/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="font-heading text-sm uppercase tracking-[0.3em] text-golden-ochre mb-4">Product Index</h2>
              <h3 className="font-heading text-5xl md:text-6xl font-light text-morning-cream">Collection <span className="font-bold">v1.0</span></h3>
            </div>
            <p className="text-morning-cream/40 max-w-xs font-light text-lg">Curated printing solutions for the modern industrial landscape.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[300px] gap-6">
            {catalogue.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedItem(item)}
                className={`relative group rounded-[2rem] overflow-hidden bg-charcoal/20 border border-white/5 min-h-[300px] md:min-h-0 ${item.span} transition-all duration-700 hover:border-white/20 cursor-pointer`}
              >
                <Image src={item.image} alt={item.title} fill className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-10 flex justify-between items-end z-10 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-heading text-2xl md:text-3xl font-light text-morning-cream">{item.title}</h3>
                  <a
                    href="#contact"
                    onClick={(e) => e.stopPropagation()}
                    className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500 border border-white/10 hover:bg-golden-ochre hover:border-golden-ochre group/arrow"
                  >
                    <ArrowRight size={20} className="text-golden-ochre group-hover/arrow:text-charcoal transition-colors" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS (Slider of Cards) */}
      <section id="testimonials" ref={testRef} className="py-32 bg-steel-blue overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className={`transition-all duration-1000 ${testVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-sm uppercase tracking-[0.4em] text-golden-ochre mb-4">Client feedback</h2>
            <h3 className="font-heading text-5xl md:text-6xl font-light text-morning-cream mb-16 italic">Words from our <br /><span className="font-bold not-italic">Partners.</span></h3>

            {/* Horizontal Scroll Slider */}
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" ref={contactRef} className="py-32 bg-charcoal relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, #426A82 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-24 items-center">
            <div className={`transition-all duration-1000 ${contactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h2 className="font-heading text-sm uppercase tracking-[0.5em] text-golden-ochre mb-8">Start Project</h2>
              <h3 className="font-heading text-6xl md:text-[5.5rem] font-light text-morning-cream leading-[0.95] tracking-tighter mb-10">
                Let&apos;s build <br />
                your <span className="font-bold">masterpiece.</span>
              </h3>
              <p className="text-morning-cream/50 font-body text-xl max-w-sm mb-12 font-light leading-relaxed">
                Precision manufacturing and sophisticated design at the heart of Lagos.
              </p>

              <div className="space-y-8">
                <a href={`https://wa.me/${brand.whatsapp.replace('+', '')}`} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-morning-cream group-hover:text-charcoal transition-all duration-500">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-morning-cream/30 mb-1">WhatsApp</p>
                    <p className="text-morning-cream font-heading text-lg font-medium">{brand.whatsapp}</p>
                  </div>
                </a>
                <a href="https://instagram.com/sholaysplace_brand" className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-morning-cream group-hover:text-charcoal transition-all duration-500">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-morning-cream/30 mb-1">Instagram</p>
                    <p className="text-morning-cream font-heading text-lg font-medium">{brand.instagram}</p>
                  </div>
                </a>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-morning-cream/30 mb-1">Our Base</p>
                    <p className="text-morning-cream font-heading text-lg font-medium">{brand.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="bg-steel-blue/40 border border-white/10 p-10 md:p-16 rounded-[3rem] backdrop-blur-xl">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-charcoal pt-24 pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-md">
              <span className="font-heading text-3xl font-bold text-morning-cream mb-6 block">SHOLAYS</span>
              <p className="text-morning-cream/30 text-lg font-light leading-relaxed">
                Redefining printing standards in Lagos. From Shomolu to the world, delivering the masterpiece of packaging.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-morning-cream/20 mb-8">Navigation</p>
                <div className="flex flex-col gap-4">
                  {['Home', 'Services', 'Products', 'Contact'].map(link => (
                    <a key={link} href={`#${link.toLowerCase()}`} className="text-morning-cream/60 hover:text-golden-ochre transition-colors font-light">{link}</a>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-morning-cream/20 mb-8">Base</p>
                <p className="text-morning-cream/60 font-light leading-relaxed">
                  Shomolu, Lagos<br />Nigeria
                </p>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-morning-cream/10 font-mono text-[9px] uppercase tracking-[0.4em]">
              &copy; {new Date().getFullYear()} Sholays Place Brand. All rights reserved.
            </p>
            <div className="flex gap-12 font-mono text-[9px] uppercase tracking-[0.4em] text-morning-cream/10">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP WIDGET */}
      <a href={`https://wa.me/${brand.whatsapp.replace('+', '')}`}
        className="fixed bottom-10 right-10 z-[70] bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden">
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <MessageCircle size={28} className="relative z-10" />
      </a>

    </main>
  );
}

function TestimonialSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const testimonials = [
    { name: "Olawale Adeyemi", role: "CEO, Zenith Luxe", text: "The attention to detail in their packaging transformed our brand perception instantly. They are truly the master of the craft." },
    { name: "Chisom Okafor", role: "Ops Manager, Glo-FMCG", text: "Consistency at scale is hard to find. Sholays delivers thousands of units without a single die-cut error." },
    { name: "Babatunde Raji", role: "Creative Director", text: "Their rigid boxes are the best in Shomolu. Precision engineering meets pure aesthetic luxury." },
    { name: "Amina Yusuf", role: "Founder, Bloom Beauty", text: "The unboxing experience of our products improved 100% after switching to Sholays. Outstanding work." }
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let moveInterval: NodeJS.Timeout;

    const startAutoSlide = () => {
      moveInterval = setInterval(() => {
        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: 400, behavior: 'smooth' });
        }
      }, 5000);
    };

    if (!isDown) startAutoSlide();
    return () => clearInterval(moveInterval);
  }, [isDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (!sliderRef.current) return;
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing transition-all select-none`}
    >
      {testimonials.map((t, i) => (
        <div key={i} className="min-w-[320px] md:min-w-[450px] snap-start">
          <div className="bg-charcoal/20 border border-white/5 p-10 md:p-14 rounded-[2.5rem] h-full flex flex-col justify-between hover:border-white/20 transition-all duration-500">
            <p className="text-morning-cream/80 text-xl md:text-2xl font-light leading-relaxed mb-10 italic">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-golden-ochre/10 flex items-center justify-center text-golden-ochre font-heading font-bold text-lg border border-golden-ochre/20">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-heading font-medium text-morning-cream leading-tight">{t.name}</p>
                <p className="font-mono text-[10px] text-morning-cream/30 uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectScale, setProjectScale] = useState('Short Run (Boutique)');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scales = ['Short Run (Boutique)', 'Industrial Batch (Bulk)', 'Continuous Supply'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-golden-ochre/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-golden-ochre/20">
          <CheckCheck size={36} className="text-golden-ochre" />
        </div>
        <h3 className="font-heading text-3xl font-light text-morning-cream mb-4">Request Received</h3>
        <p className="text-morning-cream/50 mb-10 font-light">Our precision specialists will reach out shortly.</p>
        <button onClick={() => setSent(false)} className="text-golden-ochre font-mono text-xs uppercase tracking-[0.3em] underline decoration-golden-ochre/20 underline-offset-8">Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-mono text-[9px] uppercase tracking-widest text-morning-cream/40 px-1">Full Name</label>
          <input type="text" placeholder="John Doe" required className="w-full text-gray-600 bg-charcoal/80 border border-white/5 rounded-2xl px-6 py-4 text-morning-cream placeholder-morning-cream/40 outline-none focus:border-morning-cream/20 transition-all font-light" />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[9px] uppercase tracking-widest text-morning-cream/40 px-1">Email</label>
          <input type="email" placeholder="john@brand.com" required className="text-gray-600 w-full bg-charcoal/80 border border-white/5 rounded-2xl px-6 py-4 text-morning-cream placeholder-morning-cream/40 outline-none focus:border-morning-cream/20 transition-all font-light" />
        </div>
      </div>

      <div className={`space-y-2 relative transition-all duration-300 ${isDropdownOpen ? 'z-50' : 'z-10'}`}>
        <label className="font-mono text-[9px] uppercase tracking-widest text-morning-cream/40 px-1">Project Scale</label>
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-charcoal/80 border border-white/5 rounded-2xl px-6 py-4 text-morning-cream/80 flex justify-between items-center cursor-pointer hover:border-white/20 transition-all"
        >
          <span className="font-light">{projectScale}</span>
          <ChevronRight size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-90' : ''}`} />
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#426A82] border border-white/20 rounded-2xl overflow-hidden z-50 shadow-[0_6px_12px_rgba(0,0,0,0.4)] animate-fadeIn">
            {scales.map(scale => (
              <div
                key={scale}
                onClick={() => { setProjectScale(scale); setIsDropdownOpen(false); }}
                className="px-6 py-4 text-morning-cream/60 hover:text-morning-cream hover:bg-white/5 transition-all cursor-pointer font-light"
              >
                {scale}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[9px] uppercase tracking-widest text-morning-cream/40 px-1">Message</label>
        <textarea rows={4} placeholder="Briefly describe your masterpiece..." required className="w-full text-gray-600 bg-charcoal/80 border border-white/5 rounded-2xl px-6 py-4 text-morning-cream placeholder-morning-cream/40 outline-none focus:border-morning-cream/20 transition-all font-light resize-none" />
      </div>

      <button type="submit" disabled={loading} className="w-full bg-morning-cream text-charcoal py-6 rounded-2xl font-heading font-medium tracking-[0.1em] text-sm hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 shadow-xl">
        {loading ? 'Processing...' : 'Send Inquiry'}
      </button>
    </form>
  );
}