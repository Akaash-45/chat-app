import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { Menu, Wifi, Lock, Bot } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { selectedConversation } = useConversation();
  const { socket, onlineUsers } = useSocketContext();

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-hide sidebar on mobile when conversation is selected
  useEffect(() => {
    if (isMobile && selectedConversation) {
      setShowSidebar(false);
    }
  }, [selectedConversation, isMobile]);

  const shouldShowSidebar = isMobile ? showSidebar : showSidebar;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Corner Frames */}
        <div className="absolute top-0 left-0 w-16 h-16 border-r border-b border-white/5 animate-slideIn2D"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-white/5 animate-slideIn2D delay-100"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-r border-t border-white/5 animate-slideIn2D delay-200"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-l border-t border-white/5 animate-slideIn2D delay-300"></div>

        {/* Animated Scan Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent animate-pulse2D"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent animate-pulse2D delay-500"></div>
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent animate-pulse2D delay-300"></div>
        <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent animate-pulse2D delay-700"></div>
      </div>

      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/80 border-b border-white/10 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-4 text-xs text-white/60 text-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white animate-pulse2D"></div>
            <span>CHAT_SYS_v2.0</span>
          </div>

          <div className="flex items-center gap-2">
            <Wifi
              className={`w-3 h-3 ${socket?.connected ? "text-white" : "text-white/30"}`}
            />
            <span>{socket?.connected ? "CONNECTED" : "CONNECTING"}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-white/60 text-mono">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3" />
            <span>E2E_ENCRYPTED</span>
          </div>

          <div className="flex items-center gap-2">
            <Bot className="w-3 h-3" />
            <span>AI_READY</span>
          </div>

          <div className="flex items-center gap-2">
            <span>USERS: {onlineUsers.length}</span>
            <div className="w-2 h-2 border border-white/30"></div>
          </div>
        </div>
      </div>

      {/* Main App Container */}
      <div className="flex h-full w-full pt-8">
        {/* Mobile Overlay */}
        {isMobile && shouldShowSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            shouldShowSidebar ? "translate-x-0" : "-translate-x-full"
          } transition-all duration-300 ease-out ${
            isMobile
              ? "fixed left-0 top-8 bottom-0 w-80 z-50"
              : "relative w-80 lg:w-96"
          } bg-black/95 border-r border-white/10`}
        >
          <Sidebar onClose={() => setShowSidebar(false)} />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 h-full flex flex-col relative">
          {/* Mobile Sidebar Toggle */}
          {isMobile && !shouldShowSidebar && (
            <button
              onClick={() => setShowSidebar(true)}
              className="absolute top-4 left-4 z-30 p-2 bg-black/80 border border-white/20 hover:bg-white/10 transition-colors"
            >
              <Menu className="text-white w-5 h-5" />
            </button>
          )}

          {/* Message Container */}
          <div className="flex-1">
            <MessageContainer onOpenSidebar={() => setShowSidebar(true)} />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Indicator */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent z-30"></div>
      )}
    </div>
  );
};

export default Home;
