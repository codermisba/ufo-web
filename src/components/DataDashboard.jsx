import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { motion } from 'framer-motion';
import MapChart from './MapChart';

const DataDashboard = () => {
  const shapeData = [
    { name: 'Disk', count: 420 },
    { name: 'Triangle', count: 310 },
    { name: 'Light', count: 850 },
    { name: 'Cigar', count: 120 },
    { name: 'Oval', count: 210 },
  ];

  const yearData = [
    { year: '2019', sightings: 1200 },
    { year: '2020', sightings: 1500 },
    { year: '2021', sightings: 2100 },
    { year: '2022', sightings: 1800 },
    { year: '2023', sightings: 2400 },
  ];

  const timeOfDayData = [
    { name: 'Night', value: 6500 },
    { name: 'Twilight', value: 2100 },
    { name: 'Day', value: 1200 },
  ];
  const COLORS = ['#00f3ff', '#39ff14', '#ff0055'];

  const characteristicsData = [
    { subject: 'Speed', A: 90, fullMark: 100 },
    { subject: 'Maneuverability', A: 95, fullMark: 100 },
    { subject: 'Luminosity', A: 80, fullMark: 100 },
    { subject: 'Silent Flight', A: 99, fullMark: 100 },
    { subject: 'Radar Evasion', A: 85, fullMark: 100 },
    { subject: 'Radiation', A: 60, fullMark: 100 },
  ];

  return (
    <section className="py-12 px-4 max-w-[1400px] mx-auto z-10 relative" id="dashboard">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Sighting <span className="neon-text-green">Analytics</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Analyze global UFO activity drawn from verified historical indices.</p>
      </div>

      <div className="w-full mb-8">
        <MapChart />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold mb-6 text-white text-center">Observed Characteristics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={characteristicsData}>
                <PolarGrid stroke="#ffffff40" />
                <PolarAngleAxis dataKey="subject" stroke="#ccc" tick={{fill: '#e2e8f0', fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#transparent" />
                <Radar name="UAP Capabilities" dataKey="A" stroke="var(--color-neon-blue)" fill="var(--color-neon-blue)" fillOpacity={0.6} />
                <Tooltip contentStyle={{ backgroundColor: '#0b0c10', border: '1px solid #00f3ff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold mb-6 text-white text-center">Time of Day Distribution</h3>
          <div className="h-80 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={timeOfDayData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value, percent }) => `\${name}: \${value} (\${(percent * 100).toFixed(0)}%)`}
                  labelLine={true}
                >
                  {timeOfDayData.map((entry, index) => (
                    <Cell key={`cell-\${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0b0c10', border: '1px solid #39ff14' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold mb-6 text-white text-center">Sightings by Shape</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shapeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: '#0b0c10', border: '1px solid #39ff14' }} />
                <Legend />
                <Bar dataKey="count" fill="var(--color-neon-blue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-6 rounded-2xl"
        >
          <h3 className="text-xl font-bold mb-6 text-white text-center">Trend Over Time (2019-2023)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="year" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: '#0b0c10', border: '1px solid #00f3ff' }} />
                <Legend />
                <Line type="monotone" dataKey="sightings" stroke="var(--color-neon-green)" strokeWidth={3} dot={{ r: 5, fill: "var(--color-neon-green)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataDashboard;
