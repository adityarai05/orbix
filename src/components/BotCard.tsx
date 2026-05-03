import { Button } from "@/components/ui/button";
import { Bot, BookOpen, MessageSquare, Code, BarChart3, Trash2 } from "lucide-react";

export interface Bot {
  id: string;
  name: string;
  description?: string;
}

interface BotCardProps {
  bot: Bot;
  onTrain: (botId: string) => void;
  onTest: (botId: string) => void;
  onEmbed: (botId: string) => void;
  onAnalytics: (botId: string) => void;
  onDelete?: (botId: string) => void;
}

export default function BotCard({
  bot,
  onTrain,
  onTest,
  onEmbed,
  onAnalytics,
  onDelete,
}: BotCardProps) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#111] p-8 space-y-8 relative overflow-hidden group hover:bg-[#151515] transition-colors">
      {/* Background Ambience */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 blur-[50px] rounded-full group-hover:bg-[#814bf6]/20 transition-all pointer-events-none" />

      <div className="flex items-start gap-5 relative z-10">
        <div className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center shrink-0">
          <Bot className="h-6 w-6" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tighter leading-none">{bot.name}</h3>
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(bot.id)}
                className="h-10 w-10 text-gray-500 hover:text-[#ff4a3d] hover:bg-[#ff4a3d]/10 rounded-full transition-colors"
                title="Delete Agent"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
          <p className="text-[13px] font-medium text-gray-400 leading-snug pr-8 tracking-tight">
            {bot.description || "No operational description provided."}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 relative z-10">
        <Button
          variant="outline"
          onClick={() => onTrain(bot.id)}
          className="h-12 rounded-[14px] border-white/10 bg-transparent text-[11px] font-bold uppercase tracking-widest hover:bg-white text-gray-300 hover:text-black transition-colors"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Train Info
        </Button>
        <Button
          variant="outline"
          onClick={() => onTest(bot.id)}
          className="h-12 rounded-[14px] border-white/10 bg-transparent text-[11px] font-bold uppercase tracking-widest hover:bg-white text-gray-300 hover:text-black transition-colors"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Test Agent
        </Button>
        <Button
          variant="outline"
          onClick={() => onEmbed(bot.id)}
          className="h-12 rounded-[14px] border-white/10 bg-transparent text-[11px] font-bold uppercase tracking-widest hover:bg-white text-gray-300 hover:text-black transition-colors"
        >
          <Code className="h-4 w-4 mr-2" />
          Embed
        </Button>
        <Button
          variant="outline"
          onClick={() => onAnalytics(bot.id)}
          className="h-12 rounded-[14px] border-white/10 bg-transparent text-[11px] font-bold uppercase tracking-widest hover:bg-white text-gray-300 hover:text-black transition-colors"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Metrics
        </Button>
      </div>
    </div>
  );
}
