"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle, CheckCircle } from "lucide-react";
import { changePassword } from "@/lib/adminApi";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mustReset, setMustReset] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
      return;
    }

    // Check if password reset is required
    const mustResetPassword = localStorage.getItem("mustResetPassword");
    setMustReset(mustResetPassword === "true");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate passwords
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        router.push("/admin");
        return;
      }

      const result = await changePassword(token, currentPassword, newPassword);

      if (result.success) {
        setSuccess("Password changed successfully!");
        localStorage.removeItem("mustResetPassword");

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2000);
      } else {
        setError(
          result.message ||
            "Failed to change password. Please check your current password."
        );
      }
    } catch (err) {
      console.error("Password change error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (mustReset) {
      // If password reset is required, logout
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("mustResetPassword");
      router.push("/admin");
    } else {
      // Otherwise go back to dashboard
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Change Password
          </h1>
          {mustReset && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg mt-4">
              <p className="text-sm font-medium">
                You must change your password before continuing
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start">
            <AlertCircle size={20} className="mr-2 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-start">
            <CheckCircle size={20} className="mr-2 mt-0.5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter current password"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter new password (min 8 characters)"
              required
              minLength={8}
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Confirm new password"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
            {!mustReset && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {mustReset && (
          <div className="mt-6 text-center">
            <button
              onClick={handleCancel}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Logout instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
