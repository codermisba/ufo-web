import { useState } from 'react';

const CommunityForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto" id="report">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Report a <span className="neon-text-green">Sighting</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Contribute to the global database. Your report remains anonymous but feeds our insights.</p>
      </div>

      <div className="max-w-3xl mx-auto glass p-8 rounded-2xl relative overflow-hidden">
        {submitted ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-neon-green rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(57,255,20,0.5)]">
              <span className="text-black text-3xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
            <p className="text-gray-400">Your sighting has been logged securely into the network.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 font-bold mb-2">City</label>
                <input required type="text" className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-neon-green outline-none" />
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-2">State/Region</label>
                <input required type="text" className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-neon-green outline-none" />
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-2">Country</label>
                <input required type="text" className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-neon-green outline-none" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-bold mb-2">Shape Observed</label>
                <select className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-neon-green outline-none">
                  <option>Disk</option>
                  <option>Triangle</option>
                  <option>Light/Orb</option>
                  <option>Cigar</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 font-bold mb-2">Duration (Secs)</label>
                <input type="number" min="1" className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-neon-green outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-2">Description</label>
              <textarea required rows="4" className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-neon-green outline-none resize-none" placeholder="Describe the erratic movement or characteristics..."></textarea>
            </div>

            <button type="submit" className="mt-4 py-4 rounded-lg bg-transparent border-2 border-neon-green text-neon-green font-bold uppercase tracking-widest hover:bg-neon-green hover:text-black transition-colors shadow-[0_0_15px_rgba(57,255,20,0.3)] cursor-pointer">
              Transmit Data
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default CommunityForm;
