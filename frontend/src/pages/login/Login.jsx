import React, { useState } from "react";
import { User, Lock, Eye, EyeOff, MessageSquare } from "lucide-react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black grid-lines relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Corner Lines */}
        <div className="absolute top-0 left-0 w-32 h-32 border-r border-b border-white/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-white/10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-r border-t border-white/10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-l border-t border-white/10"></div>

        {/* Moving Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse2D"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse2D delay-500"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-8 h-8 border-2 border-white/20 animate-float2D"></div>
        <div className="absolute bottom-20 left-20 w-6 h-6 bg-white/10 animate-float2D delay-300"></div>
        <div className="absolute top-1/2 left-10 w-4 h-4 border border-white/30 transform rotate-45 animate-float2D delay-200"></div>
      </div>

      <div className="relative w-full max-w-md mx-4 animate-slideUp2D">
        <div className="glass-card p-8 border-geometric">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6 animate-expand2D">
              <div className="w-16 h-16 border-2 border-white/30 flex items-center justify-center relative">
                <MessageSquare className="w-8 h-8 text-white animate-float2D" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white animate-pulse2D"></div>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2 text-mono animate-slideIn2D delay-200">
              LOGIN
            </h1>
            <div className="w-16 h-px bg-white/50 mx-auto animate-slideIn2D delay-300"></div>
            <p className="text-white/60 text-sm mt-4 text-mono animate-slideIn2D delay-400">
              Enter credentials to access secure chat
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="relative animate-slideIn2D delay-500">
              <label className="block text-xs text-white/80 mb-2 text-mono uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-2d w-full pl-12"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative animate-slideIn2D delay-600">
              <label className="block text-xs text-white/80 mb-2 text-mono uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-2d w-full pl-12 pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs animate-slideIn2D delay-700">
              <label className="flex items-center space-x-2 cursor-pointer text-mono">
                <input
                  type="checkbox"
                  className="w-4 h-4 bg-transparent border-2 border-white/30 text-white focus:ring-white/20"
                />
                <span className="text-white/60 hover:text-white transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors text-mono"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary-2d text-mono text-sm animate-slideIn2D delay-800"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="loading-dots mr-2">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  CONNECTING...
                </div>
              ) : (
                "ACCESS SYSTEM"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-6 border-t border-white/10 animate-slideIn2D delay-900">
              <p className="text-white/60 text-sm text-mono">
                No account yet?{" "}
                <a
                  href="/signup"
                  className="text-white hover:text-white/80 transition-colors font-semibold"
                >
                  Create Account
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Bottom Accent Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-8 animate-slideIn2D delay-1000"></div>
      </div>
    </div>
  );
};

export default Login;
