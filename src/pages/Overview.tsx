import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bot, MessageSquare } from "lucide-react";
import { getBots } from "@/api/botApi";

interface BotRecord {
  id?: string;
  _id?: string;
  name?: string;
  description?: string;
  totalConversations?: number;
}

export default function Overview() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bots"],
    queryFn: getBots,
  });

  const bots: BotRecord[] = useMemo(() => {
    const payload = Array.isArray(data?.data) ? data?.data : data?.data?.bots;
    return Array.isArray(payload) ? payload : [];
  }, [data]);

  const totalBots = bots.length;
  const totalConversations = bots.reduce(
    (sum, bot) => sum + (bot.totalConversations ?? 0),
    0
  );

  return (
    <div className="space-y-16">
      <header className="space-y-4">
        <h1 className="text-[4rem] md:text-[6rem] font-bold text-white tracking-tighter uppercase leading-[0.9]">
          Platform<br/>
          <span className="text-gray-500">Overview</span>
        </h1>
        <p className="text-gray-400 text-lg font-medium tracking-tight max-w-lg mt-4">
          Monitor your intelligent agents and cross-platform interactions.
        </p>
      </header>

      {isLoading && (
        <div className="rounded-[30px] border border-white/5 bg-white/[0.02] p-10 text-sm text-gray-400 font-bold tracking-widest uppercase">
          Loading metrics...
        </div>
      )}

      {isError && (
        <div className="rounded-[30px] border border-red-500/30 bg-red-500/5 p-10 text-sm text-red-400 font-bold tracking-widest uppercase">
          System Error: Failed to load metrics.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          <div className="rounded-[30px] border border-white/10 bg-[#111] p-10 space-y-8 relative overflow-hidden group hover:bg-[#151515] transition-colors">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#814bf6]/20 blur-[50px] rounded-full group-hover:bg-[#814bf6]/30 transition-all" />
            <div className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center relative z-10">
              <Bot className="h-6 w-6" />
            </div>
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Total Agents</p>
              <p className="text-[4rem] leading-none font-bold text-white tracking-tighter">{totalBots}</p>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-[#111] p-10 space-y-8 relative overflow-hidden group hover:bg-[#151515] transition-colors">
            <div className="h-14 w-14 rounded-full bg-[#222] text-white flex items-center justify-center relative z-10">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Total Queries Processed</p>
              <p className="text-[4rem] leading-none font-bold text-white tracking-tighter">{totalConversations}</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
