// src/pages/Auth/ResetPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import AuthLayout from "./AuthLayout";
import { resetPassword, parseAuthError } from "../../services/authService";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract reset token from URL query parameters (?token=... or ?resetToken=...)
  const token =
    searchParams.get("token") ||
    searchParams.get("resetToken") ||
    searchParams.get("t") ||
    "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Reset token is missing or invalid. Please request a new password reset link.");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 72) {
      setError("Password must be between 8 and 72 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please ensure both fields are identical.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({
        token,
        newPassword,
      });

      setIsSuccess(true);

      // Redirect to login after brief confirmation
      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            message: "Password reset successful! Please sign in with your new password.",
          },
        });
      }, 2000);
    } catch (err) {
      const friendlyMsg = parseAuthError(
        err,
        "This password reset link is invalid or has expired. Please request a new one."
      );
      setError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter and confirm your new account password"
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
      {/* Missing token alert */}
      {!token ? (
        <div className="space-y-5">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-[15px]">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-base text-amber-950">Missing Reset Token</p>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                The password reset link is missing a valid security token. Please click the exact link from your reset email or request a new one.
              </p>
            </div>
          </div>
          <Link
            to="/forgot-password"
            className="w-full py-3 px-4 bg-primary hover:bg-secondary text-white font-semibold text-base rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            Request New Reset Link
          </Link>
        </div>
      ) : isSuccess ? (
        <div className="space-y-4 text-center py-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Password Reset Complete!</h3>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600">
              Your password has been updated. Redirecting you to the sign-in page...
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-block py-2.5 px-6 bg-primary hover:bg-secondary text-white text-sm sm:text-base font-semibold rounded-xl transition-colors"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[15px]">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{error}</span>
                {error.includes("expired") && (
                  <div className="mt-2">
                    <Link
                      to="/forgot-password"
                      className="text-xs sm:text-sm font-semibold underline text-rose-900 hover:text-rose-950"
                    >
                      Request a new password reset link &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* New Password Field */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-[15px] sm:text-base font-semibold text-slate-800 mb-1.5"
            >
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="At least 8 characters"
                disabled={loading}
                className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                disabled={loading}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <span className="block mt-1.5 text-xs sm:text-sm text-slate-500">
              Must be between 8 and 72 characters long
            </span>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-[15px] sm:text-base font-semibold text-slate-800 mb-1.5"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Re-enter your new password"
                disabled={loading}
                className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                disabled={loading}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 px-4 bg-primary hover:bg-secondary text-white font-semibold text-base rounded-xl shadow-sm transition-all duration-150 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Resetting password...</span>
              </>
            ) : (
              <span>Set New Password</span>
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
