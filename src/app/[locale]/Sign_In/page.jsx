"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { FaLeaf } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { locale } = useParams();

  const handleCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      toast.error("Invalid email or password");
    } else {
      toast.success("Welcome back!");
      router.push(`/${locale}`);
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-green-700 flex-col justify-center items-center p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-green-300 rounded-full opacity-20 blur-3xl" />
        </div>
        <FaLeaf className="text-8xl text-green-300 mb-6 relative z-10 drop-shadow-lg" />
        <h1 className="text-4xl font-bold mb-4 relative z-10 text-center leading-tight">
          Pure. Fresh.<br />Organic.
        </h1>
        <p className="text-green-200 text-lg text-center max-w-xs mb-10 relative z-10 leading-relaxed">
          Welcome back to our organic food family. Your health is our priority.
        </p>
        <img
          src="/vegetables.jpg"
          alt="Organic vegetables"
          className="rounded-2xl w-3/4 object-cover opacity-75 relative z-10 shadow-2xl"
        />
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 mb-10 w-fit">
            <FaLeaf className="text-green-600 text-3xl" />
            <span className="text-green-700 font-bold text-2xl">OrganicFood</span>
          </Link>

          <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome back</h2>
          <p className="text-gray-500 mb-8">Sign in to your account to continue</p>

          {/* Email / password form */}
          <form onSubmit={handleCredentials} className="space-y-4">
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
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-4 text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3">
            <button
              onClick={() => signIn("google", { callbackUrl: `/${locale}` })}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/Register"
              className="text-green-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
