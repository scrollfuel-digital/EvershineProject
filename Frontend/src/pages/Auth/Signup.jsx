// src/pages/Auth/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import AuthLayout from "./AuthLayout";
import { registerUser, parseAuthError } from "../../services/authService";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNum: "",
    address: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Please enter your full name.";
    }

    const emailTrimmed = formData.username.trim();
    if (!emailTrimmed) {
      return "Please enter your email address.";
    }
    if (!/\S+@\S+\.\S+/.test(emailTrimmed)) {
      return "Please enter a valid email address.";
    }

    const phoneTrimmed = formData.phoneNum.trim();
    if (!phoneTrimmed) {
      return "Please enter your phone number.";
    }
    const cleanPhone = phoneTrimmed.replace(/[\s\-()]/g, "");
    if (!/^\+?[0-9]{10,15}$/.test(cleanPhone)) {
      return "Please enter a valid phone number (10 to 15 digits).";
    }

    if (!formData.address.trim()) {
      return "Please enter your address or city.";
    }

    if (!formData.password) {
      return "Please enter a password.";
    }
    if (formData.password.length < 8 || formData.password.length > 72) {
      return "Password must be between 8 and 72 characters long.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        name: formData.name.trim(),
        username: formData.username.trim(),
        phoneNum: formData.phoneNum.trim(),
        address: formData.address.trim(),
        password: formData.password,
      });

      // Redirect to login with friendly success confirmation
      navigate("/login", {
        replace: true,
        state: {
          message: "Registration successful! Please sign in with your credentials.",
        },
      });
    } catch (err) {
      const friendlyMsg = parseAuthError(err, "Failed to create account. Please try again.");
      setError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Register to access your Evershine portal"
      footerLink={
        <span>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-secondary underline transition-colors"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Alert */}
        {error && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[15px]">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-[15px] sm:text-base font-semibold text-slate-800 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              disabled={loading}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors disabled:opacity-60"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="username" className="block text-[15px] sm:text-base font-semibold text-slate-800 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              id="username"
              name="username"
              type="email"
              autoComplete="email"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="name@company.com"
              disabled={loading}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors disabled:opacity-60"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNum" className="block text-[15px] sm:text-base font-semibold text-slate-800 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-5 h-5" />
            </div>
            <input
              id="phoneNum"
              name="phoneNum"
              type="tel"
              autoComplete="tel"
              required
              value={formData.phoneNum}
              onChange={handleChange}
              placeholder="e.g. 9860118911"
              disabled={loading}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors disabled:opacity-60"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-[15px] sm:text-base font-semibold text-slate-800 mb-1.5">
            Address / City
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              id="address"
              name="address"
              type="text"
              autoComplete="street-address"
              required
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. Nagpur, Maharashtra"
              disabled={loading}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors disabled:opacity-60"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-[15px] sm:text-base font-semibold text-slate-800 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              disabled={loading}
              className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <span className="block mt-1.5 text-xs sm:text-sm text-slate-500">
            Must be at least 8 characters long
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 py-3 px-4 bg-primary hover:bg-secondary text-white font-semibold text-base rounded-xl shadow-sm transition-all duration-150 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
