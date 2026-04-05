import { motion } from 'framer-motion';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ImageGallery = () => {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(-1);

  const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1000&q=80", title: "Space Anomaly", category: "Deep Space" },
    { id: 2, src: "https://images.unsplash.com/photo-1541873676-a18131494184?w=1000&q=80", title: "Atmospheric Phenomenon", category: "Atmosphere" },
    { id: 3, src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=80", title: "Cosmic Event", category: "Deep Space" },
    { id: 4, src: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1000&q=80", title: "Orbital Sighting", category: "Orbital" },
    { id: 5, src: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1000&q=80", title: "Milky Way Anomaly", category: "Deep Space" },
    { id: 6, src: "https://images.unsplash.com/photo-1537420327992-d6e192287183?w=1000&q=80", title: "Plasma Trail", category: "Atmosphere" },
    { id: 7, src: "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=1000&q=80", title: "Lunar Flyby", category: "Lunar" },
    { id: 8, src: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1000&q=80", title: "Aurora Flash", category: "Atmosphere" },
    { id: 9, src: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=1000&q=80", title: "Midnight Signal", category: "Deep Space" },
    { id: 10, src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&q=80", title: "Deep Space Object", category: "Deep Space" },
    { id: 11, src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1000&q=80", title: "Galactic Cluster", category: "Deep Space" },
    { id: 12, src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1000&q=80", title: "Nebula Ignition", category: "Deep Space" },
  ];

  const categories = ["All", "Atmosphere", "Deep Space", "Orbital", "Lunar"];
  
  const filteredImages = filter === "All" ? images : images.filter(img => img.category === filter);
  const slides = filteredImages.map(img => ({ src: img.src, alt: img.title }));

  return (
    <section className="py-20 px-4 max-w-[1400px] mx-auto z-10 relative" id="gallery">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">UFO <span className="neon-text-blue">Gallery</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Explore heavily classified high-resolution visual evidence and AI-enhanced celestial reconstructions.</p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
        {categories.map((c, i) => (
            <button
               key={i}
               onClick={() => setFilter(c)}
               className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold uppercase transition-colors border \${filter === c ? 'bg-neon-blue text-black border-neon-blue' : 'bg-transparent text-gray-400 border-gray-600 hover:border-neon-blue/50'}`}
            >
                {c}
            </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6 min-h-[400px]">
        {filteredImages.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05, zIndex: 30, boxShadow: "0 0 25px rgba(0, 243, 255, 0.4)" }}
            onClick={() => setIndex(idx)}
            className="relative rounded-xl overflow-hidden glass aspect-square group cursor-pointer border border-white/5 bg-black/40"
          >
            <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 opacity-70 group-hover:opacity-100" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
              <span className="text-white font-bold neon-text-blue text-[10px] md:text-sm truncate">{img.title}</span>
              <span className="text-gray-400 text-[9px] md:text-xs tracking-wider mt-1">{img.category.toUpperCase()}</span>
            </div>
          </motion.div>
        ))}
        {filteredImages.length === 0 && (
            <div className="col-span-full h-64 flex items-center justify-center text-gray-500 font-medium">
                No visual records found in this category.
            </div>
        )}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </section>
  );
};
export default ImageGallery;
