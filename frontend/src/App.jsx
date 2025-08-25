import "./App.css";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="fixed inset-0 overflow-hidden bg-black geometric-bg">
      {/* Global Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Grid Lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-black bg-grid-lines"></div>
        </div>

        {/* Corner Frame Elements */}
        <div className="absolute top-0 left-0 w-8 h-8 border-r border-b border-white/10"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-white/10"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-r border-t border-white/10"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-l border-t border-white/10"></div>

        {/* Animated Scan Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse2D"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse2D delay-500"></div>
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse2D delay-300"></div>
        <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent animate-pulse2D delay-700"></div>
      </div>

      {/* Main Application Container */}
      <div className="relative h-full w-full flex flex-col">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
      </div>

      {/* Enhanced Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(0, 0, 0, 0.95)",
            color: "#fff",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "0",
            fontFamily: "JetBrains Mono, Fira Code, Source Code Pro, monospace",
            fontSize: "14px",
            fontWeight: "600",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
          },
          success: {
            iconTheme: {
              primary: "#fff",
              secondary: "#000",
            },
            style: {
              border: "2px solid rgba(255, 255, 255, 0.5)",
            },
          },
          error: {
            iconTheme: {
              primary: "#fff",
              secondary: "#000",
            },
            style: {
              border: "2px solid rgba(255, 100, 100, 0.5)",
            },
          },
          loading: {
            iconTheme: {
              primary: "#fff",
              secondary: "#000",
            },
            style: {
              border: "2px solid rgba(255, 255, 255, 0.3)",
            },
          },
        }}
      />

      {/* Connection Status Indicator */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-center gap-2 px-3 py-2 bg-black/80 border border-white/20 text-xs text-mono text-white/60">
          <div className="w-2 h-2 bg-white animate-pulse2D"></div>
          <span>SYSTEM_ACTIVE</span>
        </div>
      </div>
    </div>
  );
}

export default App;
