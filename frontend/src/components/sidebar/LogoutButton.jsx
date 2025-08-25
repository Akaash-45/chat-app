import React from "react";
import { LogOut, Power } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="relative animate-slideUp2D">
      {/* Status Line */}
      <div className="flex items-center gap-2 text-xs text-white/40 text-mono mb-3">
        <div className="w-2 h-2 border border-white/30 animate-pulse2D"></div>
        <span>SYSTEM_READY</span>
        <div className="flex-1 h-px bg-white/10"></div>
        <Power className="w-3 h-3" />
      </div>

      {!loading ? (
        <button
          className="btn-2d w-full text-xs flex items-center justify-center gap-2 group"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          <span className="text-mono">LOGOUT</span>
        </button>
      ) : (
        <div className="btn-2d w-full text-xs flex items-center justify-center gap-2 cursor-not-allowed opacity-50">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span className="text-mono">DISCONNECTING...</span>
        </div>
      )}

      {/* Bottom border accent */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-3"></div>
    </div>
  );
};

export default LogoutButton;
