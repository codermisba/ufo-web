import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Starfield = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    const generatedStars = [];
    for (let i = 0; i < 250; i++) {
        generatedStars.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2.5 + 0.5,
            duration: Math.random() * 4 + 2,
            delay: Math.random() * 5
        });
    }
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#0d0f1a_0%,_#0b0c10_100%)]">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full opacity-60"
          style={{
            left: `\${star.x}%`,
            top: `\${star.y}%`,
            width: `\${star.size}px`,
            height: `\${star.size}px`,
          }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay
          }}
        />
      ))}
      
      {/* Animated Realistic Moon */}
      <motion.div 
        className="absolute rounded-full z-0 pointer-events-none"
        style={{
            width: '180px',
            height: '180px',
            background: 'radial-gradient(circle at 30% 30%, #e2e8f0, #94a3b8)',
            boxShadow: '0 0 50px 10px rgba(226, 232, 240, 0.2), inset -20px -20px 40px rgba(0,0,0,0.6)',
            top: '8%',
            left: '8%'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      >
        {/* Craters */}
        <div className="absolute top-[20%] left-[30%] w-[10%] h-[10%] bg-black/20 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)]"></div>
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[15%] bg-black/15 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)] transform rotate-12"></div>
        <div className="absolute top-[60%] left-[20%] w-[12%] h-[12%] bg-black/25 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)]"></div>
        <div className="absolute top-[75%] left-[50%] w-[8%] h-[8%] bg-black/10 rounded-full shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]"></div>
      </motion.div>

      {/* Orbiting Ringed Planet */}
      <motion.div 
        className="absolute rounded-full z-0 hidden md:block opacity-60"
        style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle at 30% 30%, #201a40, #0a081a)',
            boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.8), 0 0 60px 10px rgba(0, 243, 255, 0.1)',
            bottom: '10%',
            right: '-10%',
            border: '2px solid rgba(0,243,255,0.05)'
        }}
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Planet Ring */}
        <div className="absolute top-1/2 left-1/2 w-[450px] h-[80px] border-[8px] border-neon-blue/20 rounded-[50%] -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] mix-blend-screen shadow-[0_0_20px_rgba(0,243,255,0.2)]"></div>
      </motion.div>
      
      {/* Passing Spaceship 1 (Fast Scout) */}
      <motion.div
        className="absolute blur-[1px] opacity-60 shadow-[0_0_20px_var(--color-neon-blue)] flex justify-center items-center gap-1 z-0"
        style={{ top: '25%', left: '-10%' }}
        animate={{
          left: ['-20%', '120%'],
          top: ['25%', '15%']
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
      >
        <div className="w-12 h-2 bg-gray-400 rounded-full relative">
            <div className="absolute -inset-1 bg-neon-blue/40 animate-pulse rounded-full filter blur-[4px]"></div>
            <div className="w-6 h-6 border-[3px] border-neon-blue rounded-full absolute -top-2 left-3 shadow-[0_0_15px_#00f3ff]"></div>
            <div className="w-3 h-3 bg-neon-blue rounded-full absolute top-[0.5px] left-0 shadow-[0_0_10px_#00f3ff]"></div>
        </div>
      </motion.div>

      {/* Passing Spaceship 2 (Slow Cruiser) */}
      <motion.div
        className="absolute blur-[2px] opacity-30 shadow-[0_0_30px_#ff0055] flex justify-center items-center gap-2 z-0 hidden lg:flex"
        style={{ bottom: '30%', right: '-10%' }}
        animate={{
          right: ['-20%', '120%'],
          bottom: ['30%', '40%']
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 8 }}
      >
        <div className="w-32 h-6 bg-slate-800 rounded-full relative overflow-visible">
            <div className="absolute inset-0 bg-[#ff0055]/30 animate-pulse rounded-full"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#ff0055] filter blur-[8px]"></div>
            {/* multiple windows */}
            <div className="absolute top-2 left-6 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-2 left-10 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-2 left-14 w-2 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
      
      {/* Meteor Shower */}
      <motion.div
        className="absolute w-[2px] h-[100px] bg-gradient-to-b from-white to-transparent rotate-45 opacity-0 shadow-[0_0_15px_#fff]"
        style={{ top: '-10%', left: '40%' }}
        animate={{
            top: ['-10%', '120%'],
            left: ['60%', '-10%'],
            opacity: [0, 1, 0],
            scaleY: [1, 4, 1]
        }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[1px] h-[60px] bg-gradient-to-b from-cyan-200 to-transparent rotate-45 opacity-0 shadow-[0_0_10px_#00f3ff]"
        style={{ top: '-10%', left: '80%' }}
        animate={{
            top: ['-10%', '110%'],
            left: ['80%', '20%'],
            opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 18, ease: "linear" }}
      />
    </div>
  );
};
export default Starfield;
