import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, SignIn } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Background3D from "./components/Background3D";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent"; 
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <div className="relative min-h-screen font-sans">
      <Background3D />

      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155'
          }
        }}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route 
          path="/sign-in/*" 
          element={
            <div className="flex items-center justify-center min-h-[80vh]">
              <SignIn routing="path" path="/sign-in" appearance={{
                elements: {
                  formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
                  card: 'bg-slate-900 border border-slate-700 text-white',
                  headerTitle: 'text-white',
                  headerSubtitle: 'text-slate-400',
                  socialButtonsBlockButton: 'bg-white text-black hover:bg-slate-200'
                }
              }}/>
            </div>
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            <>
              <SignedIn><Dashboard /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } 
        />
        
        <Route 
          path="/create-event" 
          element={
            <>
              <SignedIn><CreateEvent /></SignedIn>
              <SignedOut><RedirectToSignIn /></SignedOut>
            </>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;