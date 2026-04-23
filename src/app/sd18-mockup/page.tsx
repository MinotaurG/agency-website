"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const colors = {
  navy: "#0d4862",
  navyDark: "#092f42",
  red: "#e14352",
  cream: "#faf8f5",
  white: "#ffffff",
};

// ─── SVG ICONS ───

function IconSearch({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function IconCart({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  );
}

function IconMenu({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function IconClose({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconTrophy({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228M15.003 11.078a7.454 7.454 0 01-.983 3.172" />
    </svg>
  );
}

function IconTruck({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.149-.504 1.031-1.114a12.054 12.054 0 00-1.124-3.22 9.012 9.012 0 00-5.814-4.104 18.209 18.209 0 00-4.529-.57H3.375c-.621 0-1.125.504-1.125 1.125v9.75" />
    </svg>
  );
}

function IconShield({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconPlay({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}

function IconStar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function IconWhatsApp({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconYouTube({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function IconInstagram({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function IconFacebook({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconCricketBat({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M28 4l-16 16-2 6 6-2 16-16M28 4l4 4M28 4l2-2 4 4-2 2M10 26l-4 4a2 2 0 000 2.83l1.17 1.17a2 2 0 002.83 0l4-4" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <IconStar key={i} className="w-4 h-4 text-[#f0a500]" />
      ))}
    </div>
  );
}

// ─── DATA ───

const products = [
  { name: "Bats", slug: "bats", count: 24, price: "from ₹899" },
  { name: "Balls", slug: "balls", count: 18, price: "from ₹249" },
  { name: "Gloves", slug: "gloves", count: 15, price: "from ₹449" },
  { name: "Leg Guards", slug: "leg-guards", count: 12, price: "from ₹599" },
  { name: "Bags", slug: "bags", count: 8, price: "from ₹699" },
  { name: "Sportswear", slug: "sportswear", count: 36, price: "from ₹349" },
];

const trustItems = [
  { label: "YouTube Family", value: "97K+", Icon: IconPlay },
  { label: "Kit Partner — Bihar Cricket Academy", value: "Official", Icon: IconTrophy },
  { label: "Delivery", value: "Free", Icon: IconTruck },
  { label: "GST Verified", value: "100%", Icon: IconShield },
];

const testimonials = [
  {
    name: "Rahul K.",
    location: "Patna, Bihar",
    text: "Best quality cricket bat at this price range. SD18 understands what club-level players actually need.",
    rating: 5,
  },
  {
    name: "Priya S.",
    location: "Asansol, WB",
    text: "Ordered the full cricket kit for my son. Delivered in 3 days. The quality is comparable to brands costing 3x more.",
    rating: 5,
  },
  {
    name: "Coach Deepak",
    location: "Bihar Cricket Academy",
    text: "We use SD18 kits for all our academy players. Durable, well-made, and the team genuinely cares about the sport.",
    rating: 5,
  },
];

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Community", href: "/community" },
  { name: "Tournaments", href: "/tournaments" },
  { name: "Blog", href: "/blog" },
];

// ─── PAGE ───

export default function SD18MockupPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Lato', sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Montserrat:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* ─── TOP BAR ─── */}
      <div className="text-white text-xs py-2 px-4 text-center" style={{ backgroundColor: colors.navyDark }}>
        <span className="hidden sm:inline">Official Kit Partner — Bihar State Cricket Academy</span>
        <span className="sm:hidden">Official Kit Partner — Bihar Cricket Academy</span>
        <span className="mx-3 opacity-40">|</span>
        <span>Free Delivery Pan-India</span>
        <span className="mx-3 opacity-40 hidden sm:inline">|</span>
        <span className="hidden sm:inline">97K+ YouTube Family</span>
      </div>

      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-black text-lg sm:text-xl"
                style={{ backgroundColor: colors.navy, fontFamily: "'Montserrat', sans-serif" }}
              >
                SD
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: colors.navy, fontFamily: "'Montserrat', sans-serif" }}>
                  SD18 <span style={{ color: colors.red }}>Sports</span>
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400 -mt-0.5 hidden sm:block">
                  Gear Up. Play On.
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <span
                  key={link.name}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-colors tracking-wide uppercase"
                >
                  {link.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-gray-500 hover:text-gray-900 cursor-pointer">
                <IconSearch />
              </span>
              <span className="relative text-gray-500 hover:text-gray-900 cursor-pointer">
                <IconCart />
                <span
                  className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold"
                  style={{ backgroundColor: colors.red }}
                >
                  2
                </span>
              </span>
              <button
                className="md:hidden text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <IconClose /> : <IconMenu />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <div key={link.name} className="text-sm font-medium text-gray-700 uppercase tracking-wide py-1">
                    {link.name}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: colors.navy }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, ${colors.red}40 0%, transparent 60%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
                style={{ backgroundColor: `${colors.red}20`, color: colors.red }}
              >
                <IconTrophy className="w-4 h-4" /> Official Kit Partner — Bihar Cricket Academy
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Gear Built for
                <br />
                <span style={{ color: colors.red }}>Real Players.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed font-light">
                From gully cricket to state tournaments — SD18 equips athletes who play with heart.
                Trusted by 97,000+ cricketers across India.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className="px-8 py-4 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: colors.red }}
                >
                  Shop Now
                </button>
                <button className="px-8 py-4 bg-white/10 text-white font-bold text-sm uppercase tracking-wider rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2">
                  <IconPlay className="w-4 h-4" /> Watch Our Story
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div
                className="aspect-[4/5] rounded-3xl overflow-hidden relative"
                style={{
                  background: `linear-gradient(135deg, ${colors.navyDark} 0%, ${colors.navy} 50%, ${colors.red}30 100%)`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/20">
                    <IconCricketBat className="w-24 h-24 mx-auto mb-4" />
                    <div className="text-sm uppercase tracking-widest">Action Cricket Photography</div>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">Best Seller</div>
                      <div className="font-bold text-gray-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        SD18 Pro Kashmir Willow
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400 line-through">₹2,499</div>
                      <div className="text-xl font-black" style={{ color: colors.red }}>₹1,499</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="border-b border-gray-100" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200/60">
            {trustItems.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-6 sm:py-8 px-4 sm:px-6 text-center"
              >
                <div className="flex justify-center mb-2" style={{ color: colors.navy }}>
                  <stat.Icon className="w-6 h-6" />
                </div>
                <div className="text-lg sm:text-xl font-black" style={{ color: colors.navy, fontFamily: "'Montserrat', sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCT CATEGORIES ─── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-3"
              style={{ color: colors.navy, fontFamily: "'Montserrat', sans-serif" }}
            >
              Shop by Category
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Everything you need, from your first bat to your tournament kit.
            </p>
            <div className="mt-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
              sd18sports.com<span style={{ color: colors.red }}>/shop</span>/bats — not /subcategory/bat
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onHoverStart={() => setActiveCategory(i)}
                className="group cursor-pointer"
              >
                <div
                  className="aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl relative overflow-hidden"
                  style={{
                    backgroundColor: activeCategory === i ? colors.navy : colors.cream,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: activeCategory === i ? `${colors.red}30` : `${colors.navy}15`,
                    }}
                  >
                    <IconCricketBat
                      className="w-6 h-6"
                    />
                  </div>
                  <div
                    className="font-bold text-sm sm:text-base transition-colors"
                    style={{
                      color: activeCategory === i ? colors.white : colors.navy,
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    className="text-xs mt-1 transition-colors"
                    style={{ color: activeCategory === i ? "rgba(255,255,255,0.7)" : "#9ca3af" }}
                  >
                    {product.count} products
                  </div>
                  <div className="text-xs mt-2 font-semibold" style={{ color: colors.red }}>
                    {product.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND STORY ─── */}
      <section style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs uppercase tracking-[0.25em] font-semibold mb-4" style={{ color: colors.red }}>
                Our Story
              </div>
              <h2
                className="text-3xl sm:text-4xl font-black mb-6 leading-tight"
                style={{ color: colors.navy, fontFamily: "'Montserrat', sans-serif" }}
              >
                More Than a Brand.
                <br />
                A Movement.
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  SD18 Sports was born in Asansol with a simple belief: every cricketer, from gully
                  to ground, deserves gear that does not hold them back.
                </p>
                <p>
                  Today, we are the official kit partner of Bihar State Cricket Academy, we organize
                  cricket tournaments that bring communities together, and we equip thousands of
                  players across India.
                </p>
                <p className="font-semibold" style={{ color: colors.navy }}>
                  We do not just sell cricket gear. We invest in the game.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-black" style={{ color: colors.navy, fontFamily: "'Montserrat', sans-serif" }}>
                    97K+
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">YouTube Family</div>
                </div>
                <div>
                  <div className="text-3xl font-black" style={{ color: colors.navy, fontFamily: "'Montserrat', sans-serif" }}>
                    50+
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Tournament Matches</div>
                </div>
                <div>
                  <div className="text-3xl font-black" style={{ color: colors.navy, fontFamily: "'Montserrat', sans-serif" }}>
                    1
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">State Academy Partner</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Academy Partnership", bg: colors.navy },
                { label: "Tournament Action", bg: colors.red },
                { label: "Community Events", bg: colors.navyDark },
                { label: "Player Stories", bg: `${colors.navy}ee` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="aspect-square rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden"
                  style={{ backgroundColor: item.bg }}
                >
                  <IconCricketBat className="w-12 h-12 opacity-30 mb-3" />
                  <div className="text-xs uppercase tracking-wider font-semibold opacity-80">{item.label}</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity cursor-pointer">
                    <span className="text-sm font-bold uppercase tracking-wider">View Gallery</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── YOUTUBE SECTION ─── */}
      <section className="py-16 sm:py-24" style={{ backgroundColor: colors.navyDark }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-semibold mb-6">
              <IconYouTube className="w-5 h-5 text-red-500" /> 97,300+ Subscribers
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Watch. Learn. Play.
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Cricket tips, product reviews, tournament highlights, and behind-the-scenes content.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "SD18 Pro Bat — Full Review", views: "45K views", time: "12:34" },
              { title: "Bihar Cricket Academy Training Day", views: "28K views", time: "8:21" },
              { title: "Tournament Highlights — Asansol Cup", views: "62K views", time: "15:07" },
            ].map((video, i) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-video rounded-xl bg-white/5 mb-3 flex items-center justify-center relative overflow-hidden">
                  <IconCricketBat className="w-16 h-16 text-white/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: colors.red }}
                    >
                      <IconPlay className="w-6 h-6 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    {video.time}
                  </div>
                </div>
                <div className="text-white font-semibold text-sm group-hover:text-gray-300 transition-colors">
                  {video.title}
                </div>
                <div className="text-gray-500 text-xs mt-1">{video.views}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="px-8 py-3 border border-white/20 text-white font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-white/10 transition-all">
              Visit Our YouTube Channel
            </button>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-black mb-3"
              style={{ color: colors.navy, fontFamily: "'Montserrat', sans-serif" }}
            >
              Trusted by Players
            </h2>
            <p className="text-gray-500 text-lg">Real reviews from real cricketers.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 sm:p-8"
                style={{ backgroundColor: colors.cream }}
              >
                <StarRating rating={review.rating} />
                <p className="text-gray-700 mt-4 mb-6 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: colors.navy }}
                  >
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: colors.navy }}>
                      {review.name}
                    </div>
                    <div className="text-xs text-gray-400">{review.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: `linear-gradient(135deg, ${colors.navy} 0%, ${colors.navyDark} 100%)` }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Join the SD18 Family
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Get early access to new gear, tournament updates, and exclusive discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
              />
              <button
                className="px-8 py-4 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all hover:scale-105"
                style={{ backgroundColor: colors.red }}
              >
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-4">No spam. Unsubscribe anytime. We respect your inbox.</p>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-900 text-gray-400 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
                  style={{ backgroundColor: colors.navy, fontFamily: "'Montserrat', sans-serif" }}
                >
                  SD
                </div>
                <span className="text-white font-black text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  SD18 <span style={{ color: colors.red }}>Sports</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Gear built for real players. Official kit partner of Bihar State Cricket Academy.
              </p>
              <div className="flex gap-3">
                <span className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer text-gray-400 hover:text-white">
                  <IconYouTube className="w-4 h-4" />
                </span>
                <span className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer text-gray-400 hover:text-white">
                  <IconInstagram className="w-4 h-4" />
                </span>
                <span className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer text-gray-400 hover:text-white">
                  <IconFacebook className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Shop</h4>
              <div className="space-y-2 text-sm">
                {["Bats", "Balls", "Gloves", "Leg Guards", "Bags", "Sportswear"].map((item) => (
                  <div key={item} className="hover:text-white transition-colors cursor-pointer">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                {["About Us", "Community", "Tournaments", "Blog", "Contact"].map((item) => (
                  <div key={item} className="hover:text-white transition-colors cursor-pointer">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <div>info@sd18sports.com</div>
                <div>+91 800 181 8666</div>
                <div>Payel Multiplaza, Asansol</div>
                <div>West Bengal 713301</div>
              </div>
              <div className="mt-4 text-xs text-gray-600">GSTIN: 19AFQFS1742G1ZM</div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs">
              Policies:{" "}
              <span className="hover:text-white cursor-pointer">Privacy</span> ·{" "}
              <span className="hover:text-white cursor-pointer">Refunds</span> ·{" "}
              <span className="hover:text-white cursor-pointer">Shipping</span> ·{" "}
              <span className="hover:text-white cursor-pointer">Terms</span>
            </div>
            <div className="text-xs">© 2026 SD18 Sports. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP ─── */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl"
          title="Chat with us on WhatsApp"
        >
          <IconWhatsApp className="w-7 h-7" />
        </button>
      </div>

      {/* ─── REDESIGN CREDIT BAR ─── */}
      <div
        className="fixed bottom-0 left-0 right-0 text-white text-xs text-center py-2 z-40"
        style={{ backgroundColor: colors.red }}
      >
        Redesign concept by <strong>Elevate Strategy</strong> — elevatestrategy.co.in
      </div>
    </div>
  );
}
