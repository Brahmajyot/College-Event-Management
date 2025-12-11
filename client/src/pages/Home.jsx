import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
     
      <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400"
        >
          Campus Connect <br /> <span className="text-white">2025</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xl text-gray-300 max-w-2xl"
        >
          The ultimate platform to discover, organize, and participate in college events. 
          Hackathons, Cultural Fests, Sports, and more.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex gap-4"
        >
          <Link to="/sign-in" className="px-8 py-3 bg-indigo-600 rounded-full font-bold hover:bg-indigo-700 transition flex items-center gap-2">
            Get Started <ArrowRight size={20} />
          </Link>
          <Link to="/about" className="px-8 py-3 bg-white/10 backdrop-blur-md rounded-full font-bold hover:bg-white/20 transition">
            Learn More
          </Link>
        </motion.div>
      </div>

  
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto py-20 border-t border-white/10">
        {[
          { label: "Active Events", value: "50+" },
          { label: "Colleges", value: "12" },
          { label: "Students", value: "2.5k+" },
          { label: "Prize Pool", value: "$10k" },
        ].map((stat, idx) => (
          <div key={idx} className="text-center">
            <h3 className="text-3xl font-bold text-indigo-400">{stat.value}</h3>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;