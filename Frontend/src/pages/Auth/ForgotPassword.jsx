// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, AlertCircle, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import AuthLayout from "./AuthLayout";
import { forgotPassword, parseAuthError } from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponseMessage(null);

    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      setError("Please enter your registered email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(emailTrimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const data = await forgotPassword({ email: emailTrimmed });
      // Display exact backend message (do not reveal if email is registered)
      setResponseMessage(
        data?.message ||
          "If an account exists, reset instructions will be sent to your mail, please have a look at your SPAM folder."
      );
    } catch (err) {
      const friendlyMsg = parseAuthError(
        err,
        "Failed to submit password reset request. Please try again shortly."
      );
      setError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive password reset instructions"
      footerLink={
        <Link
          to="/login"
          className="inline-flex items-center gap-2 font-semibold text-primary hover:text-secondary underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      }
    >
      {responseMessage ? (
        <div className="space-y-5">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-[15px]">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="font-bold text-base text-emerald-950">Instructions Sent</p>
              <p className="text-emerald-900 leading-relaxed text-sm sm:text-base">{responseMessage}</p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/login"
              className="w-full py-3 px-4 bg-primary hover:bg-secondary text-white font-semibold text-base rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[15px]">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{error}</span>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-[15px] sm:text-base font-semibold text-slate-800 mb-2"
            >
              Registered Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="name@company.com"
                disabled={loading}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors disabled:opacity-60"
              />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              We will send a password reset link to this address if an account exists.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-primary hover:bg-secondary text-white font-semibold text-base rounded-xl shadow-sm transition-all duration-150 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting request...</span>
              </>
            ) : (
              <span>Send Reset Instructions</span>
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
