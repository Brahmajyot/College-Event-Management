import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle } from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useUser(); 
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);

        const alreadyJoined = res.data.attendees.some(
           attendee => attendee.clerkId === user?.id
        );
        if (alreadyJoined) setIsRegistered(true);

      } catch (error) {
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id, user]);

  const handleJoin = async () => {
    if (!user) return toast.error("Please login to join!");
    
    setJoining(true);
    try {
      await api.post(`/events/${id}/join`);
      toast.success("Successfully Registered! 🎉");
      setIsRegistered(true);
      const res = await api.get(`/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading details...</div>;
  if (!event) return <div className="text-white text-center mt-20">Event not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 relative z-10">
      
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white mb-6 transition">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        
        <div className="h-64 md:h-80 relative">
          <img 
            src={event.bannerUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
             <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase rounded-full">
               {event.category}
             </span>
             <h1 className="text-4xl font-bold text-white mt-2">{event.title}</h1>
          </div>
        </div>

        <div className="p-8 grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">About Event</h3>
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
            </div>
            
            <div className="bg-black/20 p-4 rounded-xl border border-white/10">
               <h4 className="text-indigo-400 font-bold mb-2">Organizer</h4>
               <p className="text-white">{event.organizer?.name || "College Committee"}</p>
               <p className="text-sm text-gray-400">{event.organizer?.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4 text-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="text-indigo-400" /> 
                <span>{new Date(event.date).toDateString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-indigo-400" /> 
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-indigo-400" /> 
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-indigo-400" /> 
                <span>{event.registeredCount} / {event.capacity} Registered</span>
              </div>
            </div>

            <button
              onClick={handleJoin}
              disabled={isRegistered || joining || event.registeredCount >= event.capacity}
              className={`w-full py-3 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
                ${isRegistered 
                  ? "bg-green-600/20 text-green-400 border border-green-500/50 cursor-default"
                  : event.registeredCount >= event.capacity
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30"
                }
              `}
            >
              {isRegistered ? (
                <> <CheckCircle size={20} /> Registered </>
              ) : joining ? (
                "Processing..."
              ) : event.registeredCount >= event.capacity ? (
                "Full"
              ) : (
                "Register Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;