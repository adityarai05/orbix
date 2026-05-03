import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bot, BarChart3, PlusCircle, LogOut, Menu, X, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: BarChart3, label: "Overview", end: true },
  { to: "/dashboard/chatbots", icon: Bot, label: "Chatbots" },
  { to: "/dashboard/create", icon: PlusCircle, label: "Create Bot" },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dark min-h-screen flex bg-black text-white selection:bg-[#814bf6] selection:text-white font-sans overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#814bf6]/10 blur-[150px] rounded-full" />
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-4 left-4 z-50 w-72 flex flex-col transition-all duration-300 transform lg:translate-x-0 lg:static rounded-[30px]",
        sidebarOpen ? "translate-x-0 shadow-[0_30px_100px_rgba(0,0,0,0.8)]" : "-translate-x-[120%]",
        "bg-[#111] border border-white/10 lg:my-4 lg:ml-4 overflow-hidden"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-8 pt-10 pb-6 group">
          <div className="flex flex-col">
            <span className="font-black text-3xl tracking-tight leading-none text-white">ORBIX<sup className="text-[40%] top-[-1em] font-bold ml-1 text-gray-400">®</sup></span>
            <span className="text-[11px] font-bold text-[#814bf6] uppercase tracking-[0.2em] mt-1">Intelligence</span>
          </div>
          <button className="ml-auto lg:hidden p-2 text-gray-400 hover:text-white bg-white/5 rounded-full" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => cn(
                "group relative flex items-center gap-4 px-4 py-4 md:py-5 rounded-2xl text-[13px] font-bold transition-all duration-300 uppercase tracking-widest",
                isActive
                  ? "bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-300 group-hover:scale-110"
              )} />
              {item.label}
              
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full opacity-0 group-[.active]:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6">
          <div className="flex items-center gap-3 p-4 bg-[#1a1a1a] rounded-2xl border border-white/5">
            <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center text-xs font-black">AD</div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white truncate">Aditya Studio</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Admin Operator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden lg:pl-4">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#814bf6] animate-pulse" />
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">System Online</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Back to Landing Page */}
            <button
              onClick={() => navigate("/")}
              className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(129,75,246,0.15), rgba(129,75,246,0.05))",
                border: "1px solid rgba(129,75,246,0.4)",
                color: "#c4a5ff",
                boxShadow: "0 0 0 0 rgba(129,75,246,0)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(129,75,246,0.35)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(129,75,246,0.8)";
                (e.currentTarget as HTMLButtonElement).style.color = "#e2d2ff";
                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(129,75,246,0.28), rgba(129,75,246,0.1))";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 0 rgba(129,75,246,0)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(129,75,246,0.4)";
                (e.currentTarget as HTMLButtonElement).style.color = "#c4a5ff";
                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(129,75,246,0.15), rgba(129,75,246,0.05))";
              }}
            >
              <Home className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </button>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/5 rounded-full w-12 h-12 border border-white/10 bg-white/5"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-auto custom-scrollbar relative z-10 w-full rounded-tl-[40px] border-t border-l border-white/10 bg-[#111111]/50 backdrop-blur-3xl shadow-[0_-20px_100px_rgba(0,0,0,0.5)]">
          <div className="relative p-6 md:p-12 lg:p-16 max-w-[1400px] mx-auto min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
      
    </div>
  );
}
