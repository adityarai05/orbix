import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/api/base";
import { toast } from "sonner";
import { Bot, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? "/auth/login" : "/auth/signup";
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await api.post(endpoint, payload);
      const { token, user } = res.data;

      // Save token and user details to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
      
      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Auth error:", err);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || "Authentication failed. Please check your details.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark min-h-screen flex items-center justify-center bg-black text-white relative font-sans overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#814bf6]/15 blur-[150px] rounded-full animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse duration-[8000ms]" />
      </div>

      <div className="relative z-10 w-full max-w-md p-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#814bf6] to-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_40px_rgba(129,75,246,0.3)] mb-4"
          >
            <div className="w-full h-full rounded-[22px] bg-[#0c0c0e] flex items-center justify-center">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <motion.h2 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-black tracking-tighter leading-none"
          >
            ORBIX<sup className="text-[40%] top-[-0.8em] font-bold ml-0.5 text-gray-500">®</sup>
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs font-bold text-[#814bf6] uppercase tracking-[0.2em] mt-1.5"
          >
            Cognitive Operations Console
          </motion.p>
        </div>

        {/* Auth Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-white/5 bg-[#111113]/50">
            <button
              onClick={() => {
                setIsLogin(true);
                setFormData({ name: "", email: "", password: "" });
              }}
              className={`flex-1 py-4.5 text-center text-xs font-black uppercase tracking-widest transition-all duration-300 relative ${
                isLogin ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Access Portal
              {isLogin && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#814bf6] shadow-[0_0_10px_rgba(129,75,246,0.8)]"
                />
              )}
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setFormData({ name: "", email: "", password: "" });
              }}
              className={`flex-1 py-4.5 text-center text-xs font-black uppercase tracking-widest transition-all duration-300 relative ${
                !isLogin ? "text-white" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Deploy Account
              {!isLogin && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#814bf6] shadow-[0_0_10px_rgba(129,75,246,0.8)]"
                />
              )}
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? "login" : "register"}
                  initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Name Field (Only on Register) */}
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Operator Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-500" />
                        <Input
                          type="text"
                          name="name"
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="pl-11 h-12 bg-white/[0.02] border-white/10 rounded-2xl focus-visible:ring-[#814bf6] focus-visible:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sync Vector (Email)</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-500" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="operator@orbix.ai"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="pl-11 h-12 bg-white/[0.02] border-white/10 rounded-2xl focus-visible:ring-[#814bf6] focus-visible:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security Cipher (Password)</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-500" />
                      <Input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="pl-11 h-12 bg-white/[0.02] border-white/10 rounded-2xl focus-visible:ring-[#814bf6] focus-visible:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-13 bg-white text-black hover:bg-gray-200 transition-colors duration-300 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                {loading ? (
                  <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? "Authenticate console" : "Initialize Link"}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Note info */}
        <div className="mt-8 text-center text-[11px] font-medium text-gray-500 flex items-center justify-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#814bf6] animate-pulse" />
          <span>Verification-free gateway active. Console initializes instantly.</span>
        </div>
      </div>
    </div>
  );
}
