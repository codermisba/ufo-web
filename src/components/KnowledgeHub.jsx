import { motion } from "framer-motion";
import { BookOpen, AlertTriangle, Eye } from "lucide-react";

const KnowledgeHub = () => {
  const cards = [
    {
      title: "What are UAPs?",
      desc: "Unidentified Anomalous Phenomena represents objects that cannot be immediately identified. The military recently disclosed footage of phenomena tracking along at incredible speeds.",
      icon: <BookOpen className="w-8 h-8 text-neon-blue" />
    },
    {
      title: "Key Findings",
      desc: "Data from hundreds of thousands of sightings show patterns in coastal areas, with 'Disk' and 'Triangle' being the most frequently reported geometric shapes globally.",
      icon: <Eye className="w-8 h-8 text-neon-green" />
    },
    {
      title: "Declassified Ops",
      desc: "Project Blue Book, AATIP, and recent congressional hearings have fundamentally shifted how humanity perceives objects flying in restricted airspace.",
      icon: <AlertTriangle className="w-8 h-8 text-yellow-400" />
    }
  ];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto border-b border-white/10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">UFO <span className="neon-text-blue">Knowledge Hub</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Equip yourself with the latest truth pulled directly from declassified documents and global reporting databases.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            whileHover={{ y: -10 }}
            className="glass p-8 rounded-2xl flex flex-col items-center text-center group cursor-pointer hover:border-neon-blue/50 transition-all"
          >
            <div className="p-4 rounded-full bg-white/5 mb-6 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
            <p className="text-gray-400 leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default KnowledgeHub;
