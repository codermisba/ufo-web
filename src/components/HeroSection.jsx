import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 w-full pt-16">
      {/* Background space elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[15%] w-72 h-72 bg-neon-blue rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute top-[40%] right-[20%] w-96 h-96 bg-neon-green rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated UFO crossing directly inside Hero representing immediate flight action */}
          <motion.div 
             initial={{ x: '-100vw', y: 150, rotate: 25 }}
             animate={{ x: '100vw', y: -150, rotate: -25 }}
             transition={{ duration: 5, delay: 0.2, ease: "easeInOut" }}
             className="absolute top-20 w-32 h-8 bg-white/20 rounded-[50%] shadow-[0_0_30px_15px_rgba(57,255,20,0.4)] blur-[1px] pointer-events-none hidden md:block"
          >
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-12 h-8 bg-white/40 rounded-t-full"></div>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
            <span className="text-white drop-shadow-md">Explore the </span>
            <span className="neon-text-green inline-block">Unknown</span>
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Uncover the truth with real-world UAP data insights, interactive visualizations, and an AI-powered portal to the cosmos.
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap max-w-4xl mx-auto">
            <Link to="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(57, 255, 20, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent border border-neon-green text-neon-green font-bold uppercase tracking-wider backdrop-blur-sm text-sm md:text-base transition-all"
              >
                Explore Data
              </motion.button>
            </Link>
            <Link to="/creator">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 243, 255, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-neon-blue text-black font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.6)] text-sm md:text-base border-none transition-all"
              >
                Create UFO
              </motion.button>
            </Link>
            <Link to="/gallery">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 0, 85, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-transparent border border-[#ff0055] text-[#ff0055] font-bold uppercase tracking-wider backdrop-blur-sm text-sm md:text-base transition-all"
              >
                View Gallery
              </motion.button>
            </Link>
            <a href="#chat" onClick={(e) => { e.preventDefault(); document.getElementById('chat-trigger')?.click(); }}>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 text-white border border-white/20 font-bold uppercase tracking-wider backdrop-blur-sm text-sm md:text-base transition-all"
              >
                Chat with AI
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
