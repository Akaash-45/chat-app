import React, { useState } from "react";
import { User, Lock, Eye, EyeOff, Users, UserPlus } from "lucide-react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black grid-lines relative overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Corner Lines */}
        <div className="absolute top-0 left-0 w-40 h-40 border-r border-b border-white/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 border-l border-b border-white/10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 border-r border-t border-white/10"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-l border-t border-white/10"></div>

        {/* Animated Grid Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulse2D"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulse2D delay-300"></div>
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent animate-pulse2D delay-400"></div>
        <div className="absolute right-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent animate-pulse2D delay-500"></div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-16 right-16 w-6 h-6 border-2 border-white/20 animate-float2D"></div>
        <div className="absolute bottom-16 left-16 w-8 h-8 bg-white/5 animate-float2D delay-200"></div>
        <div className="absolute top-1/2 right-10 w-4 h-4 border border-white/30 transform rotate-45 animate-float2D delay-300"></div>
        <div className="absolute top-1/4 left-10 w-5 h-5 bg-white/10 transform rotate-12 animate-float2D delay-400"></div>
      </div>

      <div className="relative w-full max-w-lg mx-4 animate-slideUp2D">
        <div className="glass-card p-8 border-geometric">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-block mb-4 animate-expand2D">
              <div className="w-16 h-16 border-2 border-white/30 flex items-center justify-center relative">
                <UserPlus className="w-8 h-8 text-white animate-float2D" />
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-white animate-pulse2D"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border border-white animate-pulse2D delay-200"></div>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2 text-mono animate-slideIn2D delay-200">
              REGISTER
            </h1>
            <div className="w-20 h-px bg-white/50 mx-auto animate-slideIn2D delay-300"></div>
            <p className="text-white/60 text-sm mt-3 text-mono animate-slideIn2D delay-400">
              Create new account for secure messaging
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="relative animate-slideIn2D delay-500">
              <label className="block text-xs text-white/80 mb-2 text-mono uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="input-2d w-full pl-12"
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="relative animate-slideIn2D delay-600">
              <label className="block text-xs text-white/80 mb-2 text-mono uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-2d w-full pl-12"
                  placeholder="Choose username"
                  required
                />
              </div>
            </div>

            {/* Password Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="relative animate-slideIn2D delay-700">
                <label className="block text-xs text-white/80 mb-2 text-mono uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-2d w-full pl-12 pr-12"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative animate-slideIn2D delay-800">
                <label className="block text-xs text-white/80 mb-2 text-mono uppercase tracking-wider">
                  Confirm
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-2d w-full pl-12 pr-12"
                    placeholder="Confirm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="relative animate-slideIn2D delay-900">
              <label className="block text-xs text-white/80 mb-2 text-mono uppercase tracking-wider">
                Gender
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-2d w-full appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled className="bg-black text-white">
                    Select Gender
                  </option>
                  <option value="male" className="bg-black text-white">
                    Male
                  </option>
                  <option value="female" className="bg-black text-white">
                    Female
                  </option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/40"></div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn-primary-2d text-mono text-sm animate-slideIn2D delay-1000"
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
                  CREATING ACCOUNT...
                </div>
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-white/10 animate-slideIn2D delay-1100">
              <p className="text-white/60 text-sm text-mono">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-white hover:text-white/80 transition-colors font-semibold"
                >
                  Login Here
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Bottom Accent Lines */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mt-6 animate-slideIn2D delay-1200"></div>
        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-2 animate-slideIn2D delay-1300"></div>
      </div>
    </div>
  );
};

export default SignUp;
