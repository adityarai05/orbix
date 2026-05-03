import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { getBots, deleteBot } from "@/api/botApi";
import { toast } from "sonner";
import BotCard from "@/components/BotCard";
import { Button } from "@/components/ui/button";

interface BotRecord {
  id?: string;
  _id?: string;
  name?: string;
  description?: string;
}

export default function Chatbots() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bots"],
    queryFn: getBots,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots"] });
      toast.success("Bot deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete bot");
    }
  });

  const bots = useMemo(() => {
    const payload = Array.isArray(data?.data) ? data?.data : data?.data?.bots;
    const list: BotRecord[] = Array.isArray(payload) ? payload : [];
    return list.map((bot) => ({
      id: bot.id ?? bot._id ?? "",
      name: bot.name ?? "Untitled Bot",
      description: bot.description ?? "",
    }));
  }, [data]);

  return (
    <div className="space-y-16">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <header className="space-y-4">
          <h1 className="text-[4rem] md:text-[6rem] font-bold text-white tracking-tighter uppercase leading-[0.9]">
            Bot<br/>
            <span className="text-gray-500">Library</span>
          </h1>
          <p className="text-gray-400 text-lg font-medium tracking-tight max-w-lg mt-4">
            Manage all your active AI agents and configurations.
          </p>
        </header>

        <Button
          onClick={() => navigate("/dashboard/create")}
          className="bg-white text-black hover:bg-gray-200 transition-colors duration-300 px-10 h-16 rounded-[20px] font-bold uppercase tracking-widest text-sm"
        >
          <Plus className="h-5 w-5 mr-3 stroke-[3px]" /> Create Agent
        </Button>
      </div>

      {isLoading && (
        <div className="rounded-[30px] border border-white/5 bg-white/[0.02] p-10 text-sm text-gray-400 font-bold tracking-widest uppercase">
          Loading library...
        </div>
      )}

      {isError && (
        <div className="rounded-[30px] border border-red-500/30 bg-red-500/5 p-10 text-sm text-red-400 font-bold tracking-widest uppercase">
          System Error: Failed to load agents.
        </div>
      )}

      {!isLoading && !isError && bots.length === 0 && (
        <div className="rounded-[30px] border border-dashed border-white/10 bg-white/[0.02] p-16 text-center text-gray-500 font-bold tracking-tight text-lg">
          No active agents found. Create your first agent to get started.
        </div>
      )}

      {!isLoading && !isError && bots.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {bots.map((bot) => (
            <BotCard
              key={bot.id}
              bot={{ id: bot.id, name: bot.name, description: bot.description }}
              onTrain={(botId) => navigate(`/dashboard/knowledge/${botId}`)}
              onTest={(botId) => navigate(`/dashboard/test/${botId}`)}
              onEmbed={(botId) => navigate(`/dashboard/embed/${botId}`)}
              onAnalytics={(botId) => navigate(`/dashboard/analytics/${botId}`)}
              onDelete={(botId) => {
                if (window.confirm("Are you sure you want to completely delete this bot?")) {
                  deleteMutation.mutate(botId);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
