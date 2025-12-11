import { Calendar, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion"; 
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg text-white"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={event.bannerUrl || "https://via.placeholder.com/400x200"} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
          {event.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 truncate">{event.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>{new Date(event.date).toDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>{event.capacity} Slots</span>
          </div>
        </div>

      <Link to={`/events/${event._id}`} className="block w-full mt-4 text-center bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-medium transition-colors">
  View Details
</Link>
      </div>
    </motion.div>
  );
};

export default EventCard;