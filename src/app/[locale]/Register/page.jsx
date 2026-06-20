"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { FaLeaf } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { locale } = useParams();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Auto sign-in after successful registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.success("Account created! Please sign in.");
        router.push("/Sign_In");
      } else {
        toast.success("Welcome to OrganicFood!");
        router.push(`/${locale}`);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-700 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-56 h-56 bg-green-300 rounded-full opacity-20 blur-3xl" />
        </div>
        <FaLeaf className="text-8xl text-green-300 mb-6 relative z-10 drop-shadow-lg" />
        <h1 className="text-4xl font-bold mb-4 relative z-10 text-center leading-tight">
          Join Our<br />Community
        </h1>
        <p className="text-green-200 text-lg text-center max-w-xs mb-10 relative z-10 leading-relaxed">
          Start your organic journey today. Fresh, healthy, and sustainable food for a better life.
        </p>
        <div className="grid grid-cols-2 gap-3 w-3/4 relative z-10">
          {["Vegetables", "Fruits", "Grains", "Superfoods", "Herbs & Spices", "Nuts & Seeds"].map(
            (cat) => (
              <div
                key={cat}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center text-sm font-medium border border-white/20"
              >
                {cat}
              </div>
            )
          )}
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 mb-10 w-fit">
            <FaLeaf className="text-green-600 text-3xl" />
            <span className="text-green-700 font-bold text-2xl">OrganicFood</span>
          </Link>

          <h2 className="text-3xl font-bold text-gray-800 mb-1">Create an account</h2>
          <p className="text-gray-500 mb-8">Join thousands of health-conscious shoppers</p>

          {/* OAuth buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => signIn("google", { callbackUrl: `/${locale}` })}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700"
            >
              <FcGoogle className="text-2xl" />
              Sign up with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-4 text-sm text-gray-400">or register with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Credentials form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link
              href="/Sign_In"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
