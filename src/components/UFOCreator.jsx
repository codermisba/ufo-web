import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UFOCreator = () => {
  const [deployedVessels, setDeployedVessels] = useState([]);
  
  // Track dropped components by ID
  const [hull, setHull] = useState('none');
  const [engine, setEngine] = useState('none');
  const [cockpitWindow, setCockpitWindow] = useState('none');
  const [hatch, setHatch] = useState('none');
  const [seat, setSeat] = useState('none');

  useEffect(() => {
    // Load from local storage instead of backend to prevent network errors
    const savedFleet = localStorage.getItem('local-ufo-hangar');
    if (savedFleet) {
        try {
            setDeployedVessels(JSON.parse(savedFleet));
        } catch (e) {
            console.error("Failed to parse hangar data", e);
        }
    }
  }, []);

  // Sync to local storage whenever fleet changes
  useEffect(() => {
     if(deployedVessels.length > 0) {
         localStorage.setItem('local-ufo-hangar', JSON.stringify(deployedVessels));
     }
  }, [deployedVessels]);

  const deployVessel = () => {
    const newVessel = { 
        id: Date.now().toString(), 
        shape: hull, 
        color: '#00f3ff', 
        hullMode: 'titanium', 
        shieldActive: engine !== 'none', 
        pulseEngine: true,
        hasWindow: cockpitWindow !== 'none',
        hasHatch: hatch !== 'none',
        hasSeat: seat !== 'none'
    };
    
    setDeployedVessels([newVessel, ...deployedVessels]);
  };

  const shapes = {
    scout: "M50,10 L90,80 L50,90 L10,80 Z",
    fighter: "M50,0 L100,70 L50,100 L0,70 Z",
    carrier: "M20,10 L80,10 L90,90 L10,90 Z"
  };

  const renderVesselSvg = (v, size = "100%") => (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} className="drop-shadow-xl overflow-visible filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
        <defs>
            <linearGradient id={`metal-\${v.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
            </linearGradient>
        </defs>
        <path d={shapes[v.shape] || shapes.scout} fill={`url(#metal-\${v.id})`} stroke="#cbd5e1" strokeWidth={1} />
        {v.shieldActive && (
            <circle cx="50" cy="50" r="45" fill={v.color || '#00f3ff'} opacity="0.3" filter="blur(15px)" className={v.pulseEngine ? "animate-pulse" : ""} />
        )}
        {/* Render internal upgrades */}
        {v.hasWindow && <ellipse cx="50" cy="40" rx="15" ry="8" fill="#000" opacity="0.6" stroke="#00f3ff" strokeWidth={1} />}
        {v.hasHatch && <rect x="42" y="60" width="16" height="20" rx="2" fill="#333" stroke="#cbd5e1" strokeWidth={0.5} />}
        {v.hasSeat && <path d="M45,45 L55,45 L55,38 C55,35 45,35 45,38 Z" fill="#b91c1c" />}
    </svg>
  );

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto z-10 relative" id="creator">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Spacecraft <span className="neon-text-green">Workshop</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Drag and drop modular hulls and engines into the central assembly zone. Deploy to the Global DB Hangar.</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center mb-16 h-auto lg:h-[550px]">
        
        {/* DRAG AND DROP PALETTE */}
        <div className="glass p-6 rounded-2xl w-full lg:w-1/4 flex flex-col gap-6 z-10 overflow-y-auto">
          <h3 className="font-bold text-gray-300 uppercase tracking-widest text-center border-b border-white/10 pb-2 flex-shrink-0">Parts Toolbox</h3>
          
          <div className="flex flex-col gap-4">
             <span className="text-xs text-neon-blue font-bold tracking-widest">HULL PLATFORMS</span>
             {Object.keys(shapes).map((s) => (
                 <motion.div 
                    key={s}
                    drag
                    dragSnapToOrigin={true}
                    onDragEnd={(e, info) => {
                        // Very rough bounding box check (assuming assembly zone is in center)
                        if(info.point.x > window.innerWidth / 3) setHull(s);
                    }}
                    className="aspect-video bg-black/40 border-2 border-white/10 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing hover:border-white/40 shadow-sm relative group z-50 touch-none"
                 >
                    <svg viewBox="0 0 100 100" className="w-16 h-16 pointer-events-none">
                        <path d={shapes[s]} fill="rgba(255,255,255,0.2)" stroke="#fff" strokeWidth={1} />
                    </svg>
                    <span className="absolute bottom-2 text-[10px] uppercase font-bold text-gray-400 pointer-events-none">{s}</span>
                 </motion.div>
             ))}
             
             <span className="text-xs text-neon-green font-bold mt-4 tracking-widest">THRUSTER NODES</span>
             <motion.div 
                drag
                dragSnapToOrigin={true}
                onDragEnd={(e, info) => {
                    if(info.point.x > window.innerWidth / 3) setEngine('plasma');
                }}
                className="h-16 bg-black/40 border-2 border-white/10 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing hover:border-neon-green/40 shadow-sm relative z-[60] touch-none"
             >
                <div className="w-6 h-6 rounded-full bg-neon-green/40 shadow-[0_0_15px_#39ff14] animate-pulse pointer-events-none"></div>
                <span className="absolute bottom-1 text-[9px] uppercase font-bold text-gray-400 pointer-events-none">Plasma Core</span>
             </motion.div>

             <span className="text-xs text-[#ff0055] font-bold mt-2 tracking-widest">INTERIOR COMPONENTS</span>
             <div className="grid grid-cols-3 gap-2">
                 <motion.div 
                    drag dragSnapToOrigin={true}
                    onDragEnd={(e, info) => { if(info.point.x > window.innerWidth / 3) setCockpitWindow('oval'); }}
                    className="h-16 bg-black/40 border-2 border-white/10 rounded-xl flex flex-col items-center justify-center cursor-grab hover:border-[#ff0055]/40 relative z-[70] touch-none"
                 >
                    <svg viewBox="0 0 30 20" className="w-8 h-6 pointer-events-none mb-2"><ellipse cx="15" cy="10" rx="12" ry="6" fill="#000" opacity="0.8" stroke="#00f3ff" strokeWidth={1} /></svg>
                    <span className="text-[8px] uppercase font-bold text-gray-400 pointer-events-none">Window</span>
                 </motion.div>
                 
                 <motion.div 
                    drag dragSnapToOrigin={true}
                    onDragEnd={(e, info) => { if(info.point.x > window.innerWidth / 3) setHatch('door'); }}
                    className="h-16 bg-black/40 border-2 border-white/10 rounded-xl flex flex-col items-center justify-center cursor-grab hover:border-[#ff0055]/40 relative z-[70] touch-none"
                 >
                    <svg viewBox="0 0 20 30" className="w-6 h-8 pointer-events-none mb-1"><rect x="2" y="2" width="16" height="26" rx="2" fill="#333" stroke="#cbd5e1" strokeWidth={1} /></svg>
                    <span className="text-[8px] uppercase font-bold text-gray-400 pointer-events-none">Door</span>
                 </motion.div>

                 <motion.div 
                    drag dragSnapToOrigin={true}
                    onDragEnd={(e, info) => { if(info.point.x > window.innerWidth / 3) setSeat('pilot'); }}
                    className="h-16 bg-black/40 border-2 border-white/10 rounded-xl flex flex-col items-center justify-center cursor-grab hover:border-[#ff0055]/40 relative z-[70] touch-none"
                 >
                    <svg viewBox="0 0 20 20" className="w-6 h-6 pointer-events-none mb-1"><path d="M5,15 L15,15 L15,8 C15,4 5,4 5,8 Z" fill="#b91c1c" /></svg>
                    <span className="text-[8px] uppercase font-bold text-gray-400 pointer-events-none">Seat</span>
                 </motion.div>
             </div>
          </div>
        </div>

        {/* CENTRAL ASSEMBLY ZONE */}
        <div className="glass rounded-2xl w-full lg:w-2/4 h-[400px] lg:h-full flex flex-col relative overflow-hidden bg-space-dark/80 border-2 border-neon-blue/40 shadow-[inset_0_0_50px_rgba(0,243,255,0.05)]">
            <div className="absolute top-4 left-4 font-mono text-neon-blue text-xs opacity-50">ASSEMBLY_MATRIX_ACTIVE</div>
            
            <div className="flex-1 w-full h-full flex items-center justify-center">
                {hull === 'none' ? (
                    <div className="w-48 h-48 md:w-64 md:h-64 border-4 border-dashed border-white/10 rounded-full flex flex-col gap-2 items-center justify-center text-gray-500 font-bold uppercase tracking-widest text-xs animate-pulse">
                        <span className="neon-text-blue text-3xl">+</span>
                        Drop Hull Here
                    </div>
                ) : (
                    <motion.div
                        className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center touch-none"
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Render customized ship */}
                        <svg viewBox="0 0 100 100" className="w-10/12 h-10/12 drop-shadow-2xl overflow-visible z-10 pointer-events-none relative -top-6">
                            <defs>
                                <linearGradient id="mainMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
                                </linearGradient>
                            </defs>
                            <path d={shapes[hull]} fill="url(#mainMetal)" stroke="#fff" strokeWidth={1} className="drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]" />
                            {/* Render live drag results */}
                            {cockpitWindow === 'oval' && <ellipse cx="50" cy="40" rx="15" ry="8" fill="#000" opacity="0.6" stroke="#00f3ff" strokeWidth={1} />}
                            {hatch === 'door' && <rect x="42" y="60" width="16" height="20" rx="2" fill="#333" stroke="#cbd5e1" strokeWidth={0.5} />}
                            {seat === 'pilot' && <path d="M45,45 L55,45 L55,38 C55,35 45,35 45,38 Z" fill="#b91c1c" />}
                        </svg>

                        {/* Dropped Engine Node */}
                        <AnimatePresence>
                            {engine === 'plasma' && (
                                <motion.div 
                                    initial={{ scale: 0, opacity: 0.3 }} 
                                    className="absolute z-0 w-3/4 h-3/4 rounded-full filter blur-[30px]"
                                    style={{ backgroundColor: '#00f3ff' }}
                                    animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
            
            <div className="p-4 border-t border-white/10 flex flex-col md:flex-row gap-4 bg-black/60 relative z-20">
                <button onClick={() => {setHull('none'); setEngine('none'); setCockpitWindow('none'); setHatch('none'); setSeat('none');}} className="px-4 py-3 bg-red-500/20 text-red-500 rounded-lg text-sm font-bold border border-red-500/30 hover:bg-red-500/40">
                    CLEAR
                </button>
                <div className="md:flex-1"></div>
                <button disabled={hull==='none'} onClick={deployVessel} className="px-8 py-3 bg-neon-green/20 text-neon-green rounded-lg text-sm font-bold border border-neon-green/50 hover:bg-neon-green hover:text-black tracking-widest disabled:opacity-30 transition-all font-mono">
                    COMMIT TO GLOBAL HANGAR
                </button>
            </div>
        </div>

      </div>

      {/* Deployment Hangar Area From DB */}
      <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 glass p-6 rounded-2xl border-t-2 border-neon-blue/60 shadow-[0_-10px_30px_rgba(0,243,255,0.1)]"
      >
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-white/10 gap-4 text-center md:text-left">
            <h3 className="text-2xl font-bold flex items-center justify-center gap-3">
                <span className="w-3 h-3 rounded-full bg-neon-blue animate-pulse"></span>
                Personal Fleet Hangar
            </h3>
            <div className="flex items-center gap-4">
                <button 
                  onClick={() => { setDeployedVessels([]); localStorage.removeItem('local-ufo-hangar'); }}
                  className="px-3 py-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30 rounded text-xs tracking-widest transition-colors font-bold uppercase"
                >
                  Purge Hangar
                </button>
                <span className="bg-neon-blue/10 border border-neon-blue/30 px-4 py-2 rounded-full text-xs font-bold text-neon-blue uppercase tracking-widest">{deployedVessels.length} Models Verified</span>
            </div>
          </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {deployedVessels.map(v => (
            <motion.div 
              key={v.id} 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-black/60 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center relative group hover:border-neon-blue/40 transition-all hover:bg-black/80 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]"
            >
               <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  {renderVesselSvg(v, "100%")}
               </div>
               <div className="w-full text-center mt-auto">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest truncate font-mono">{v.shape}</p>
                  <div className="flex items-center justify-center gap-2 mt-2 bg-black/50 py-1 rounded">
                      <span className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: v.color }}></span>
                      <span className="text-[10px] text-gray-500 font-mono">#{v.id?.toString().slice(-4) || 'VSSL'}</span>
                  </div>
               </div>
            </motion.div>
          ))}
          {deployedVessels.length === 0 && (
             <div className="col-span-full h-32 flex flex-col items-center justify-center text-gray-500 font-medium">
                 <span className="text-3xl mb-2 opacity-50 text-neon-blue">🛸</span>
                 Hangar is currently empty. Design the first anomalous vessel.
             </div>
          )}
        </div>
      </motion.div>

    </section>
  );
};

export default UFOCreator;
