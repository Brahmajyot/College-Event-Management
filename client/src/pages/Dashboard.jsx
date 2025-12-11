import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import api from "../services/api";
import EventCard from "../components/EventCard";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <Loader2 className="animate-spin w-10 h-10 text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, <span className="text-indigo-400">{user?.firstName}</span>! 👋
        </h1>
        <p className="text-gray-400 mt-2">Here is what's happening around campus.</p>
      </div>

      <h2 className="text-xl font-semibold text-white mb-6 border-l-4 border-indigo-500 pl-3">
        Upcoming Events
      </h2>
      
      {events.length === 0 ? (
        <div className="text-center text-gray-500 py-20 bg-white/5 rounded-xl">
          <p>No events found. Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;