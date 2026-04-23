"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SD18 Brand Colors
const colors = {
  navy: "#0d4862",
  navyDark: "#092f42",
  red: "#e14352",
  redDark: "#c4313f",
  gold: "#f0a500",
  cream: "#faf8f5",
  white: "#ffffff",
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
};

const products = [
  { name: "Bats", slug: "bats", icon: "🏏", count: 24, image: "from ₹899" },
  { name: "Balls", slug: "balls", icon: "⚾", count: 18, image: "from ₹249" },
  { name: "Gloves", slug: "gloves", icon: "🧤", count: 15, image: "from ₹449" },
  { name: "Leg Guards", slug: "leg-guards", icon: "🦿", count: 12, image: "from ₹599" },
  { name: "Bags", slug: "bags", icon: "🎒", count: 8, image: "from ₹699" },
  { name: "Sportswear", slug: "sportswear", icon: "👕", count: 36, image: "from ₹349" },
];

const stats = [
  { label: "YouTube Family", value: "97K+", icon: "▶" },
  { label: "Kit Partner — Bihar Cricket Academy", value: "Official", icon: "🏆" },
  { label: "Delivery", value: "Free", icon: "🚚" },
  { label: "GST Verified", value: "100%", icon: "✓" },
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(rating)].map((_, i) => (
        <span key={i} className="text-[#f0a500] text-sm">★</span>
      ))}
    </div>
  );
}

export default function SD18MockupPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Lato', sans-serif" }}>
      {/* Google Fonts */}
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
            {/* Logo */}
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

            {/* Desktop Nav */}
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

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-gray-500 hover:text-gray-900 cursor-pointer text-xl">🔍</span>
              <span className="relative text-gray-500 hover:text-gray-900 cursor-pointer text-xl">
                🛒
                <span
                  className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold"
                  style={{ backgroundColor: colors.red }}
                >
                  2
                </span>
              </span>
              <button
                className="md:hidden text-gray-600 text-2xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
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
                <span>🏆</span> Official Kit Partner — Bihar Cricket Academy
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
                  <span>▶</span> Watch Our Story
                </button>
              </div>
            </motion.div>

            {/* Hero Visual — Placeholder for action cricket photography */}
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
                  <div className="text-center text-white/30">
                    <div className="text-8xl mb-4">🏏</div>
                    <div className="text-sm uppercase tracking-widest">Action Cricket Photography</div>
                  </div>
                </div>
                {/* Floating badge */}
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
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-6 sm:py-8 px-4 sm:px-6 text-center"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
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
                  <div className="text-4xl sm:text-5xl mb-3 transition-transform group-hover:scale-110">
                    {product.icon}
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
                    style={{ color: activeCategory === i ? "rgba(255,255,255,0.7)" : colors.gray[400] }}
                  >
                    {product.count} products
                  </div>
                  <div
                    className="text-xs mt-2 font-semibold"
                    style={{ color: activeCategory === i ? colors.red : colors.red }}
                  >
                    {product.image}
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
                { label: "Academy Partnership", emoji: "🏆", bg: colors.navy },
                { label: "Tournament Action", emoji: "🏟️", bg: colors.red },
                { label: "Community Events", emoji: "🤝", bg: colors.navyDark },
                { label: "Player Stories", emoji: "⭐", bg: `${colors.navy}ee` },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="aspect-square rounded-2xl flex flex-col items-center justify-center text-white relative overflow-hidden"
                  style={{ backgroundColor: item.bg }}
                >
                  <div className="text-5xl mb-3">{item.emoji}</div>
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
              <span className="text-red-500">▶</span> 97,300+ Subscribers
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
                  <div className="text-6xl opacity-20">🏏</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: colors.red }}
                    >
                      ▶
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
            {/* Brand */}
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
                {["YouTube", "Instagram", "Facebook"].map((social) => (
                  <span
                    key={social}
                    className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    {social[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Shop</h4>
              <div className="space-y-2 text-sm">
                {["Bats", "Balls", "Gloves", "Leg Guards", "Bags", "Sportswear"].map((item) => (
                  <div key={item} className="hover:text-white transition-colors cursor-pointer">{item}</div>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
              <div className="space-y-2 text-sm">
                {["About Us", "Community", "Tournaments", "Blog", "Contact"].map((item) => (
                  <div key={item} className="hover:text-white transition-colors cursor-pointer">{item}</div>
                ))}
              </div>
            </div>

            {/* Contact */}
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
              Policies: <span className="hover:text-white cursor-pointer">Privacy</span> · <span className="hover:text-white cursor-pointer">Refunds</span> · <span className="hover:text-white cursor-pointer">Shipping</span> · <span className="hover:text-white cursor-pointer">Terms</span>
            </div>
            <div className="text-xs">© 2026 SD18 Sports. All rights reserved.</div>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP (non-blinking!) ─── */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="w-14 h-14 rounded-full bg-green-500 text-white text-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl"
          title="Chat with us on WhatsApp"
        >
          💬
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
