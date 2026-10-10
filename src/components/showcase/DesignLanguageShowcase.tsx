import React, { useState } from 'react';
import { 
  Home, 
  Star, 
  MapPin, 
  ArrowRight, 
  Crown, 
  ChevronRight, 
  Zap, 
  Heart, 
  User,
  Search,
  TrendingUp,
  Building,
  Award,
  Leaf,
  Shield,
  Gamepad2,
  Stethoscope,
  GraduationCap,
  Coffee,
  Camera,
  Palette,
  Code,
  Briefcase,
  Sparkles,
  Mountain,
  Sunrise
} from 'lucide-react';

const DesignLanguageShowcase = () => {
  const [activeStyle, setActiveStyle] = useState('premium');

  const styles = {
    premium: { name: 'Premium Real Estate', category: 'Professional' },
    luxury: { name: 'Luxury Business', category: 'Executive' },
    trendy: { name: 'Cool Young Trendy', category: 'Modern' },
    minimal: { name: 'Clean Minimal', category: 'Minimal' },
    brutalist: { name: 'Bold Brutalist', category: 'Experimental' },
    glassmorphism: { name: 'Glass Morphism', category: 'Modern' },
    neomorphism: { name: 'Soft Neomorphism', category: 'Minimal' },
    cyberpunk: { name: 'Cyberpunk Tech', category: 'Futuristic' },
    organic: { name: 'Natural Organic', category: 'Organic' },
    retro: { name: 'Retro Vintage', category: 'Nostalgic' },
    medical: { name: 'Medical Clean', category: 'Professional' },
    education: { name: 'Educational Fresh', category: 'Friendly' },
    gaming: { name: 'Gaming Dynamic', category: 'Entertainment' },
    creative: { name: 'Creative Studio', category: 'Artistic' },
    portfolio: { name: 'Portfolio Showcase', category: 'Professional' }
  };

  const PremiumPreview = () => (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-white shadow-sm border-b border-gray-100 px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-gray-900">PremiumHomes</div>
            <div className="hidden md:flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Properties</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Agents</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
            </div>
          </div>
          <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300">
            Contact Us
          </button>
        </div>
      </nav>

      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Discover premium properties in the most desirable neighborhoods with our expert guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Browse Properties
            </button>
            <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300">
              Schedule Tour
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Home, title: "Luxury Listings", desc: "Curated collection of premium properties" },
            { icon: MapPin, title: "Prime Locations", desc: "Properties in the most sought-after areas" },
            { icon: TrendingUp, title: "Market Insights", desc: "Expert analysis and market trends" }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <feature.icon className="w-12 h-12 text-gray-900 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const LuxuryPreview = () => (
    <div className="bg-slate-900 min-h-screen">
      <nav className="bg-slate-900 border-b border-slate-700 px-8 lg:px-12 xl:px-16 py-6">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="text-2xl font-semibold tracking-tight text-white">ExecutiveCorp</div>
            <div className="hidden lg:flex gap-8">
              <a href="#" className="text-slate-300 hover:text-white font-medium tracking-wide transition-colors">Services</a>
              <a href="#" className="text-slate-300 hover:text-white font-medium tracking-wide transition-colors">Expertise</a>
            </div>
          </div>
          <button className="px-12 py-6 bg-slate-100 text-slate-900 font-semibold tracking-wide rounded-xl hover:bg-white transform hover:scale-[1.02] transition-all duration-500 shadow-xl shadow-slate-900/20">
            Executive Consultation
          </button>
        </div>
      </nav>

      <section className="py-32 lg:py-40 px-8 lg:px-12 xl:px-16">
        <div className="max-w-8xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 rounded-full mb-8 border border-amber-200">
            <Crown className="w-5 h-5 text-amber-600" />
            <span className="text-amber-700 font-medium tracking-wide">Executive Excellence</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white mb-8">
            Distinguished
            <span className="block text-transparent bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text">
              Leadership
            </span>
          </h1>
          <p className="text-xl leading-relaxed text-slate-100 max-w-4xl mx-auto mb-16">
            Sophisticated consulting services for discerning executives who demand excellence
          </p>
        </div>
      </section>

      <section className="py-16 px-8 lg:px-12">
        <div className="max-w-8xl mx-auto grid lg:grid-cols-3 gap-12">
          {[
            { icon: Crown, title: "Executive Strategy", desc: "Distinguished leadership consulting for transformation" },
            { icon: Building, title: "Corporate Excellence", desc: "Sophisticated operational frameworks" },
            { icon: Award, title: "Leadership Development", desc: "Curated executive development programs" }
          ].map((service, idx) => (
            <div key={idx} className="p-12 rounded-3xl bg-slate-800 shadow-xl border border-slate-700 hover:shadow-2xl hover:-translate-y-3 transition-all duration-700">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-8">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-white mb-6">{service.title}</h3>
              <p className="text-slate-300 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const TrendyPreview = () => (
    <div className="bg-gray-900 min-h-screen">
      <nav className="bg-gray-900 border-b border-gray-700 px-4 md:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold tracking-tight text-white">NextGen</div>
            <div className="hidden md:flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white font-medium transition-colors">Vibes</a>
              <a href="#" className="text-gray-400 hover:text-white font-medium transition-colors">Squad</a>
            </div>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:from-cyan-400 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-cyan-500/25">
            Let's Go!
          </button>
        </div>
      </nav>

      <section className="py-20 md:py-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mb-8 border border-purple-500/30">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 font-medium tracking-wide">NEW DROP</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
            Next Level
            <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">
              Experience
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-8 mb-12">
            We're pushing boundaries and creating experiences that Gen Z actually wants
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Blazing speed that hits different", color: "cyan" },
            { icon: Heart, title: "Built Different", desc: "Made for the culture", color: "pink" },
            { icon: TrendingUp, title: "Always Fresh", desc: "Updates that keep you on top", color: "lime" }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 md:p-8 rounded-3xl bg-gray-800 border border-gray-700 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-2">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                feature.color === 'cyan' ? 'from-cyan-400 to-blue-500' :
                feature.color === 'pink' ? 'from-pink-500 to-purple-500' :
                'from-lime-400 to-green-500'
              } flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-7">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const MinimalPreview = () => (
    <div className="bg-white min-h-screen">
      <nav className="bg-white border-b border-gray-100 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-xl font-light text-gray-900">Minimal</div>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-light transition-colors">Work</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-light transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-light transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-light text-gray-900 mb-8 leading-tight">
            Less is
            <br />
            <span className="font-normal">More</span>
          </h1>
          <p className="text-xl font-light text-gray-600 max-w-2xl leading-relaxed">
            Clean design principles focused on what matters most. Simplicity without compromise.
          </p>
        </div>
      </section>

      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="h-64 bg-gray-100"></div>
            <h3 className="text-2xl font-light text-gray-900">Pure Focus</h3>
            <p className="text-gray-600 font-light leading-relaxed">Eliminate distractions to highlight what truly matters in your design.</p>
          </div>
          <div className="space-y-8">
            <div className="h-64 bg-gray-50"></div>
            <h3 className="text-2xl font-light text-gray-900">Clean Lines</h3>
            <p className="text-gray-600 font-light leading-relaxed">Geometric precision creates harmony between form and function.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const BrutalistPreview = () => (
    <div className="bg-black min-h-screen font-mono">
      <nav className="bg-black border-b-4 border-yellow-400 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-yellow-400 uppercase tracking-wider">BRUTAL</div>
          <div className="flex gap-6">
            <a href="#" className="text-white hover:text-yellow-400 font-bold uppercase tracking-wide transition-colors">WORK</a>
            <a href="#" className="text-white hover:text-yellow-400 font-bold uppercase tracking-wide transition-colors">ABOUT</a>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase leading-none mb-8 tracking-tighter">
            BOLD
            <br />
            <span className="text-yellow-400">BRUTAL</span>
            <br />
            DESIGN
          </h1>
          <div className="bg-yellow-400 text-black p-6 max-w-2xl transform -skew-x-12">
            <p className="text-lg font-bold uppercase tracking-wide transform skew-x-12">
              UNAPOLOGETIC DESIGN THAT DEMANDS ATTENTION AND BREAKS ALL THE RULES
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { title: "NO COMPROMISE", desc: "PURE FUNCTION OVER FORM" },
            { title: "BOLD CHOICES", desc: "AGGRESSIVE VISUAL HIERARCHY" },
            { title: "RAW POWER", desc: "UNFILTERED CREATIVE EXPRESSION" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white text-black p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <h3 className="text-2xl font-black uppercase mb-4 tracking-wide">{item.title}</h3>
              <p className="font-bold uppercase text-sm tracking-wider">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const GlassmorphismPreview = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-yellow-500/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <nav className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 mx-6 mt-6 rounded-2xl">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-white">Glassmorphism</div>
          <div className="flex gap-6">
            <a href="#" className="text-white/80 hover:text-white transition-colors">Products</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
          </div>
        </div>
      </nav>

      <section className="relative z-10 py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Glass
            <br />
            <span className="text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
              Morphism
            </span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Frosted glass effects that blend reality with digital interfaces seamlessly
          </p>
          <button className="px-8 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/30 transition-all duration-300">
            Explore Magic
          </button>
        </div>
      </section>

      <section className="relative z-10 py-16 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Sparkles, title: "Ethereal UI", desc: "Floating interfaces that feel magical" },
            { icon: Heart, title: "Soft Depth", desc: "Layered glass with subtle shadows" },
            { icon: Zap, title: "Blur Effects", desc: "Backdrop filters for modern aesthetics" }
          ].map((item, idx) => (
            <div key={idx} className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300">
              <item.icon className="w-12 h-12 text-white mb-6" />
              <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
              <p className="text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const NeomorphismPreview = () => (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-gray-100 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-semibold text-gray-700 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] px-6 py-3 rounded-xl">
            Neomorph
          </div>
          <div className="flex gap-4">
            {['Home', 'About', 'Contact'].map((item, idx) => (
              <div key={idx} className="px-4 py-2 text-gray-600 shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.9)] rounded-lg cursor-pointer hover:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(255,255,255,0.9)] transition-all duration-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-700 mb-8">
            Soft UI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Subtle shadows and highlights create depth that feels natural and tactile
          </p>
          <button className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-all duration-300">
            Touch Me
          </button>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: "Soft Shadows", desc: "Natural lighting effects" },
            { icon: Home, title: "Tactile Feel", desc: "Physical button sensations" },
            { icon: Star, title: "Subtle Depth", desc: "Layered visual hierarchy" }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-100 p-8 rounded-3xl shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.9)]">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl shadow-[inset_6px_6px_12px_rgba(0,0,0,0.1),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const CyberpunkPreview = () => (
    <div className="bg-black min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <nav className="relative z-10 bg-black/80 backdrop-blur border-b border-cyan-400/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-cyan-400 font-mono uppercase tracking-wider">
            CYBER_CORP
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-green-400 hover:text-green-300 font-mono uppercase tracking-wider transition-colors">ACCESS</a>
            <a href="#" className="text-pink-400 hover:text-pink-300 font-mono uppercase tracking-wider transition-colors">NEURAL</a>
            <a href="#" className="text-purple-400 hover:text-purple-300 font-mono uppercase tracking-wider transition-colors">MATRIX</a>
          </div>
        </div>
      </nav>

      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-bold text-white font-mono uppercase leading-none mb-8 tracking-tighter">
            CYBER
            <br />
            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text animate-pulse">
              PUNK
            </span>
            <br />
            <span className="text-green-400">2077</span>
          </h1>
          <div className="border border-cyan-400/50 bg-black/50 backdrop-blur p-8 max-w-2xl transform skew-x-1">
            <p className="text-lg text-cyan-100 font-mono leading-relaxed transform -skew-x-1">
              &gt; ACCESSING NEURAL NETWORK...<br />
              &gt; CONNECTION ESTABLISHED<br />
              &gt; WELCOME TO THE FUTURE_
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: "NEURAL_LINK", desc: "Direct brain interface technology", color: "cyan" },
            { icon: Shield, title: "QUANTUM_SECURITY", desc: "Unhackable encryption protocols", color: "green" },
            { icon: Code, title: "MATRIX_ACCESS", desc: "Reality manipulation systems", color: "purple" }
          ].map((item, idx) => (
            <div key={idx} className="bg-black/60 backdrop-blur border border-cyan-400/30 p-8 transform skew-y-1 hover:skew-y-0 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              <div className={`w-16 h-16 border-2 ${
                item.color === 'cyan' ? 'border-cyan-400 text-cyan-400' :
                item.color === 'green' ? 'border-green-400 text-green-400' :
                'border-purple-400 text-purple-400'
              } flex items-center justify-center mb-6`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-mono">{item.title}</h3>
              <p className="text-gray-300 font-mono text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const OrganicPreview = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-100">
      <nav className="bg-white/80 backdrop-blur border-b border-emerald-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-emerald-900 font-semibold">EcoNature</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition">Get Involved</button>
        </div>
      </nav>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-emerald-900 mb-6">Design Inspired by Nature</h1>
            <p className="text-lg text-emerald-800/80 mb-8">Organic shapes, soft gradients, and earth tones create a calming, human feel.</p>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500">Explore</button>
              <button className="px-6 py-3 bg-white text-emerald-800 rounded-xl border border-emerald-200 hover:bg-emerald-50">Our Mission</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 rounded-2xl bg-gradient-to-br from-emerald-200 to-green-200" />
            <div className="h-40 rounded-2xl bg-gradient-to-br from-lime-200 to-teal-200" />
            <div className="h-40 rounded-2xl bg-gradient-to-br from-teal-200 to-emerald-300" />
            <div className="h-40 rounded-2xl bg-gradient-to-br from-green-200 to-lime-300" />
          </div>
        </div>
      </section>
    </div>
  );

  const RetroPreview = () => (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100">
      <nav className="bg-white/80 backdrop-blur border-b border-amber-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-amber-700" />
            <span className="text-amber-900 font-semibold tracking-wide">RetroWorks</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-amber-700 text-white hover:bg-amber-600 transition">View Gallery</button>
        </div>
      </nav>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-amber-900 mb-4">Vintage Vibes</h1>
          <p className="text-amber-800/80 max-w-2xl mx-auto mb-10">Warm palettes, bold serifs, grainy textures, and throwback layouts reminiscent of print era.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {['Poster', 'Magazine', 'Record'].map((label, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-amber-200 shadow-sm hover:shadow-md transition">
                <div className="h-40 rounded-xl bg-gradient-to-tr from-rose-200 via-amber-200 to-orange-200 mb-4" />
                <div className="font-bold text-amber-900">{label} Style</div>
                <div className="text-sm text-amber-800/80">Classic composition with modern fidelity</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const EducationPreview = () => (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur border-b border-sky-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-sky-700" />
            <span className="text-sky-900 font-semibold">Learnly</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500 transition">Start Learning</button>
        </div>
      </nav>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-6">Friendly, Inspiring Education</h1>
          <p className="text-lg text-sky-800/80 mb-8">Clear hierarchy, approachable colors, and playful accents designed for learning.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Courses', color: 'from-sky-300 to-blue-400' },
              { title: 'Workshops', color: 'from-indigo-300 to-purple-400' },
              { title: 'Resources', color: 'from-blue-300 to-cyan-400' }
            ].map((c, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-sky-200">
                <div className={`h-32 rounded-xl bg-gradient-to-br ${c.color} mb-4`} />
                <div className="font-semibold text-sky-900">{c.title}</div>
                <div className="text-sm text-sky-800/80">Everything you need to succeed</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const GamingPreview = () => (
    <div className="min-h-screen bg-slate-950">
      <nav className="bg-slate-950 border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-5 h-5 text-fuchsia-400" />
            <span className="text-white font-semibold">Clutch.gg</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white hover:from-fuchsia-400 hover:to-violet-400 transition">Join Match</button>
        </div>
      </nav>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4">Play. Win. Repeat.</h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-10">High contrast, neon accents, and dynamic components for competitive energy.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Ranked', grad: 'from-fuchsia-500 to-rose-500' },
              { title: 'Casual', grad: 'from-cyan-500 to-blue-500' },
              { title: 'Tournaments', grad: 'from-amber-400 to-orange-500' }
            ].map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-fuchsia-400/50 transition">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${m.grad} mx-auto mb-4`} />
                <div className="font-bold text-white">{m.title}</div>
                <div className="text-sm text-slate-400">Find your squad and queue up</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const CreativePreview = () => (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100">
      <nav className="bg-white/80 backdrop-blur border-b border-fuchsia-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-fuchsia-600" />
            <span className="text-fuchsia-900 font-semibold">StudioNova</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-fuchsia-600 text-white hover:bg-fuchsia-500 transition">Start a Project</button>
        </div>
      </nav>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-fuchsia-900 mb-6">Creative Freedom</h1>
            <p className="text-lg text-fuchsia-800/80 mb-8">Expressive palettes, asymmetric layouts, and playful micro-interactions.</p>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-fuchsia-600 text-white rounded-xl hover:bg-fuchsia-500">See Work</button>
              <button className="px-6 py-3 bg-white text-fuchsia-800 rounded-xl border border-fuchsia-200 hover:bg-fuchsia-50">Capabilities</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-white border border-fuchsia-200 shadow-sm" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const MedicalPreview = () => (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur border-b border-sky-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-5 h-5 text-sky-700" />
            <span className="text-sky-900 font-semibold">CarePlus Health</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500 transition">Book Appointment</button>
        </div>
      </nav>
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-sky-900 mb-6">Trusted, Clinical, Professional</h1>
            <p className="text-lg text-sky-800/80 mb-8">Clean layout, high contrast for readability, and accessible components suited for healthcare.</p>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-500">Find a Doctor</button>
              <button className="px-6 py-3 bg-white text-sky-800 rounded-xl border border-sky-200 hover:bg-sky-50">Insurance</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: 'Primary Care', icon: Stethoscope },
              { title: 'Pediatrics', icon: Heart },
              { title: 'Emergency', icon: Shield }
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-sky-200">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="font-semibold text-sky-900 text-sm">{s.title}</div>
                <div className="text-xs text-sky-800/80">Compassionate, expert care</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const PortfolioPreview = () => (
    <div className="min-h-screen" style={{ backgroundColor: '#FDFCFA' }}>
      {/* Animated background pattern */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-orange-100 px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-gray-900">Eliud Samwel</div>
            <div className="hidden md:flex gap-6">
              <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Projects</a>
              <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Contact</a>
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/25">
            Get In Touch
          </button>
        </div>
      </nav>

      <section className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full mb-8 border border-orange-200">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-orange-700 font-medium">Full-Stack Developer</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Building Digital
            <span className="block text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">
              Experiences
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Firebase-inspired design meets modern development. Creating sophisticated web applications 
            with warm, professional aesthetics and cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-orange-500/25">
              View My Work
            </button>
            <button className="px-8 py-4 border-2 border-orange-500 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all duration-300">
              Download Resume
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Code, 
              title: "Full-Stack Development", 
              desc: "React, TypeScript, Node.js, and modern web technologies",
              color: "from-orange-500 to-amber-500"
            },
            { 
              icon: Palette, 
              title: "Design Systems", 
              desc: "Firebase-inspired aesthetics with professional polish",
              color: "from-amber-500 to-yellow-500"
            },
            { 
              icon: Zap, 
              title: "Performance First", 
              desc: "Optimized applications with exceptional user experience",
              color: "from-yellow-500 to-orange-500"
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-orange-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating elements for visual interest */}
      <div className="fixed top-20 right-20 w-32 h-32 bg-orange-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-40 left-20 w-48 h-48 bg-amber-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </div>
  );

  const renderPreview = () => {
    switch (activeStyle) {
      case 'premium': return <PremiumPreview />;
      case 'luxury': return <LuxuryPreview />;
      case 'trendy': return <TrendyPreview />;
      case 'minimal': return <MinimalPreview />;
      case 'brutalist': return <BrutalistPreview />;
      case 'glassmorphism': return <GlassmorphismPreview />;
      case 'neomorphism': return <NeomorphismPreview />;
      case 'cyberpunk': return <CyberpunkPreview />;
      case 'organic': return <OrganicPreview />;
      case 'retro': return <RetroPreview />;
      case 'education': return <EducationPreview />;
      case 'gaming': return <GamingPreview />;
      case 'creative': return <CreativePreview />;
      case 'medical': return <MedicalPreview />;
      case 'portfolio': return <PortfolioPreview />;
      default: return <PremiumPreview />;
    }
  };

  const categories = ['All', 'Professional', 'Executive', 'Modern', 'Minimal', 'Experimental', 'Futuristic', 'Organic', 'Nostalgic', 'Friendly', 'Entertainment', 'Artistic'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStyles = selectedCategory === 'All' 
    ? Object.entries(styles)
    : Object.entries(styles).filter(([_, style]) => style.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Design Language Showcase</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore 15 unique design languages with complete UI previews. Each style includes navigation, hero sections, 
            feature cards, and interactive elements to help you choose the perfect aesthetic for your project.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Style Selector */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {filteredStyles.map(([key, style]) => (
              <button
                key={key}
                onClick={() => setActiveStyle(key)}
                className={`p-4 rounded-xl text-left transition-all duration-200 ${
                  activeStyle === key
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                }`}
              >
                <div className="font-semibold text-sm mb-1">{style.name}</div>
                <div className={`text-xs ${
                  activeStyle === key ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {style.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative">
        {renderPreview()}
      </div>
    </div>
  );
};

export default DesignLanguageShowcase;
