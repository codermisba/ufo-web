import { useState } from 'react';
import { motion } from 'framer-motion';

const PredictionForm = () => {
  const [formData, setFormData] = useState({ time_of_day: 'night', location_type: 'rural', duration_minutes: 5 });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call to backend
    setTimeout(() => {
      setPrediction({
        shape: formData.location_type === 'rural' ? 'Triangle' : 'Disk',
        confidence: (Math.random() * 0.3 + 0.6).toFixed(2)
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto border-b border-white/10" id="predict">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">AI Shape <span className="neon-text-blue">Prediction</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Input parameters of a hypothetical or real sighting, and our AI will predict the most probable UAP shape based on historical datasets.</p>
      </div>

      <div className="max-w-2xl mx-auto glass p-8 rounded-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-bold mb-2">Time of Day</label>
              <select 
                value={formData.time_of_day}
                onChange={e => setFormData({...formData, time_of_day: e.target.value})}
                className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-neon-blue outline-none"
              >
                <option value="night">Night</option>
                <option value="day">Day</option>
                <option value="twilight">Twilight</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 font-bold mb-2">Location Type</label>
              <select 
                value={formData.location_type}
                onChange={e => setFormData({...formData, location_type: e.target.value})}
                className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-neon-blue outline-none"
              >
                <option value="rural">Rural</option>
                <option value="urban">Urban</option>
                <option value="coastal">Coastal/Oceanic</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-300 font-bold mb-2">Duration (minutes)</label>
            <input 
              type="number" 
              min="1"
              value={formData.duration_minutes}
              onChange={e => setFormData({...formData, duration_minutes: Number(e.target.value)})}
              className="w-full bg-space-dark border border-white/10 rounded-lg p-3 text-white focus:ring-1 focus:ring-neon-blue outline-none"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-4 rounded-lg bg-neon-blue text-black font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Analyzing...' : 'Predict Shape'}
          </button>
        </form>

        {prediction && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 rounded-lg bg-white/5 border border-neon-green/30 text-center"
          >
            <h4 className="text-lg text-gray-400 mb-2">Predicted Classification</h4>
            <div className="text-4xl font-bold neon-text-green mb-2">{prediction.shape}</div>
            <p className="text-sm text-gray-400">Confidence: {(prediction.confidence * 100).toFixed(0)}%</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PredictionForm;
