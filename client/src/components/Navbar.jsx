import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { PlusSquare, Calendar, Sparkles } from "lucide-react";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-shadow duration-300">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-300">
            CampusEvents
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors text-sm tracking-wide">
            HOME
          </Link>
          
          {isSignedIn && (
            <Link to="/dashboard" className="text-gray-300 hover:text-white font-medium transition-colors text-sm tracking-wide">
              DASHBOARD
            </Link>
          )}

          {isSignedIn ? (
            <div className="flex items-center gap-6">
              <Link 
                to="/create-event" 
                className="flex items-center gap-2 bg-indigo-600/80 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg border border-indigo-500/50 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all duration-300"
              >
                <PlusSquare className="w-4 h-4" />
                <span className="font-semibold">Create</span>
              </Link>
              
              <div className="border-2 border-white/10 rounded-full p-0.5 hover:border-indigo-500 transition-colors">
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9"
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/sign-in" 
                className="text-gray-300 hover:text-white font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/sign-in" 
                className="group relative px-6 py-2 rounded-full bg-white text-black font-bold hover:bg-gray-100 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <Sparkles className="w-4 h-4 text-indigo-600 group-hover:rotate-12 transition-transform" />
                </span>
              
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;