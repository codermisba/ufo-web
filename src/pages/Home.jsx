import HeroSection from "../components/HeroSection";
import KnowledgeHub from "../components/KnowledgeHub";
import PredictionForm from "../components/PredictionForm";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Home = () => {
    const facts = [
        "In 2004, the USS Nimitz encountered a Tic-Tac shaped UAP dropping from 80,000 feet to sea level in seconds.",
        "Over 50% of sightings occur during the night, particularly near coastal or heavily militarized zones.",
        "The fastest recorded military jet is Mach 6.7, but UAPs have been tracked at Mach 20+ without visible propulsion.",
        "To date, the US Government has formally acknowledged the existence of UAPs through declassified footage like 'GIMBAL'."
    ];
    
    const [factIndex, setFactIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFactIndex(prev => (prev + 1) % facts.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const previewCards = [
        {
            title: "Data Dashboard",
            desc: "Immerse yourself into global heatmaps and timeline analytics.",
            path: "/dashboard",
            color: "var(--color-neon-blue)",
            colorClass: "neon-text-blue"
        },
        {
            title: "UFOCreator Hangar",
            desc: "Drag and drop modules to design your own interstellar vessel.",
            path: "/creator",
            color: "var(--color-neon-green)",
            colorClass: "neon-text-green"
        },
        {
            title: "High-Res Gallery",
            desc: "View classified sightings with advanced visual filtering.",
            path: "/gallery",
            color: "#ff0055",
            colorClass: "text-[#ff0055]"
        },
        {
            title: "Community Reports",
            desc: "Publish and review localized sightings securely.",
            path: "/report",
            color: "#ffaa00",
            colorClass: "text-[#ffaa00]"
        }
    ];

    return (
        <main className="z-10 relative">
            <HeroSection />
            
            {/* Quick Links Preview Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Platform <span className="neon-text-blue">Modules</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Access the core components of the Intelligence Platform securely.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {previewCards.map((card, idx) => (
                        <Link to={card.path} key={idx} className="block h-full">
                            <motion.div 
                                whileHover={{ y: -10, boxShadow: `0 0 25px \${card.color}40`, borderColor: card.color }}
                                className="glass p-6 rounded-2xl h-full border border-white/5 transition-all group flex flex-col items-start bg-black/30 backdrop-blur-md"
                            >
                                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 \${card.colorClass}`}>{card.title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">{card.desc}</p>
                                <span className={`mt-auto text-xs font-bold uppercase tracking-widest \${card.colorClass} opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-2`}>
                                    Initialize <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>&rarr;</motion.span>
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Did You Know? */}
            <section className="py-12 px-4 max-w-5xl mx-auto relative z-10 mb-10">
                <div className="glass p-6 md:p-8 rounded-2xl border-l-[6px] border-neon-green flex flex-col md:flex-row items-center gap-6 shadow-[0_0_30px_rgba(57,255,20,0.1)] bg-[radial-gradient(ellipse_at_left,_rgba(57,255,20,0.05)_0%,_transparent_100%)]">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-neon-green/10 flex items-center justify-center border border-neon-green shadow-[inset_0_0_15px_rgba(57,255,20,0.3)]">
                            <span className="text-3xl neon-text-green font-bold">?</span>
                        </div>
                    </div>
                    <div className="flex-1 w-full text-center md:text-left">
                        <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-3 font-semibold">Did You Know?</h4>
                        <div className="h-28 md:h-16 flex items-center justify-center md:justify-start">
                            <AnimatePresence mode="wait">
                                <motion.p 
                                    key={factIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-base md:text-lg lg:text-xl font-medium text-gray-200 leading-relaxed italic"
                                >
                                    "{facts[factIndex]}"
                                </motion.p>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <KnowledgeHub />
            <PredictionForm />
        </main>
    );
};

export default Home;
