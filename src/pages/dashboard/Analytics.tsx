import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/api/base";
import {
  BarChart3, Bot, MessageSquare, Zap, TrendingUp,
  Brain, Activity, Clock, Hash, AlertCircle, Loader2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Conversation {
  _id: string;
  userMessage: string;
  botReply: string;
  timestamp: string;
  botId?: string;
  botName?: string;
}

interface BotRecord {
  id?: string;
  _id?: string;
  name?: string;
  botName?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  // Articles, pronouns, prepositions, and basic helping words
  "i", "a", "an", "the", "is", "it", "in", "on", "of", "to", "do", "my", "me",
  "can", "you", "how", "what", "why", "for", "are", "was", "be", "with", "as",
  "at", "by", "or", "and", "not", "but", "so", "if", "no", "yes", "this", "that",
  "have", "has", "does", "did", "will", "would", "could", "should", "please",
  "your", "from", "about", "get", "use", "hi", "hello", "hey", "ok", "okay",
  "us", "them", "him", "her", "their", "its", "our", "yours", "hers", "ours",
  "theirs", "mine", "am", "were", "been", "being", "had", "doing", "who",
  "whom", "whose", "which", "when", "where", "above", "after", "again",
  "against", "all", "any", "both", "each", "few", "more", "most", "other",
  "some", "such", "than", "too", "very", "just", "only", "also", "now", "then",
  "once", "here", "there", "somebody", "someone", "something", "anybody",
  "anyone", "anything", "nobody", "nothing", "everyone", "everything",
  
  // Common conversational verbs and helper verbs
  "give", "guve", "gve", "tell", "show", "send", "need", "want", "help",
  "thanks", "thank", "know", "find", "ask", "like", "make", "take", "come",
  "go", "shall", "may", "might", "must", "say", "see", "think", "look", "work",
  "call", "try", "keep", "start", "stop", "hear", "listen", "talk", "speak",
  "write", "read", "run", "play", "put", "set", "meet", "leave", "pay", "buy",
  "sell", "bring", "carry", "hold", "turn", "begin", "end", "live", "die",
  
  // Contractions & slang/typos/noise
  "dont", "cant", "wont", "ive", "youre", "theyre", "weve", "couldnt", "shouldnt",
  "wouldnt", "didnt", "doesnt", "hasnt", "havent", "hadnt", "isnt", "arent",
  "wasnt", "werent", "gimme", "pls", "plz", "idk", "lol", "brb", "tbh", "imma",
  "wanna", "gonna", "gotta", "thru", "tho", "yeah", "yep", "nope",

  // 2-letter stop words
  "am", "an", "as", "at", "be", "by", "do", "go", "he", "hi", "if", "in", "is",
  "it", "me", "my", "no", "of", "oh", "ok", "on", "or", "so", "to", "up", "us",
  "we", "ye"
]);

function extractKeywords(messages: string[]): { word: string; count: number }[] {
  const freq: Record<string, number> = {};
  messages.forEach((msg) => {
    msg
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length >= 2 && !STOP_WORDS.has(w))
      .forEach((w) => { freq[w] = (freq[w] ?? 0) + 1; });
  });
  return Object.entries(freq)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Limit to top 5 keywords
}

function groupQuestions(messages: string[]): { question: string; count: number }[] {
  const freq: Record<string, number> = {};
  messages.forEach((m) => {
    const clean = m.trim().toLowerCase().slice(0, 80);
    if (clean.length > 5) freq[clean] = (freq[clean] ?? 0) + 1;
  });
  return Object.entries(freq)
    .map(([question, count]) => ({ question, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function getTimeline(conversations: Conversation[]) {
  const dayMap: Record<string, number> = {};
  conversations.forEach((c) => {
    const d = new Date(c.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    dayMap[d] = (dayMap[d] ?? 0) + 1;
  });
  const sorted = Object.entries(dayMap).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );
  return sorted.slice(-10);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function GlowCard({ children, accent = "purple" }: { children: React.ReactNode; accent?: "purple" | "cyan" | "green" | "pink" }) {
  const colors: Record<string, string> = {
    purple: "border-[#814bf6]/20 hover:border-[#814bf6]/50 hover:shadow-[0_0_40px_rgba(129,75,246,0.12)]",
    cyan:   "border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]",
    green:  "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(52,211,153,0.12)]",
    pink:   "border-pink-500/20 hover:border-pink-500/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.12)]",
  };
  return (
    <div className={`relative rounded-[28px] border bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-500 overflow-hidden ${colors[accent]}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent, sub }: { icon: React.ElementType; label: string; value: string | number; accent: string; sub?: string }) {
  const iconBg: Record<string, string> = {
    purple: "bg-[#814bf6]/15 text-[#a78bfa] border-[#814bf6]/30",
    cyan:   "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    green:  "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    pink:   "bg-pink-500/15 text-pink-400 border-pink-500/30",
    orange: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    blue:   "bg-blue-500/15 text-blue-400 border-blue-500/30",
  };
  return (
    <GlowCard accent={accent as any}>
      <div className="flex flex-col gap-4">
        <div className={`h-11 w-11 rounded-2xl border flex items-center justify-center ${iconBg[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
          {sub && <p className="text-xs text-gray-500 mt-1 font-medium">{sub}</p>}
        </div>
      </div>
    </GlowCard>
  );
}

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl border border-white/5 bg-white/[0.01]">
      <div className="h-12 w-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center mb-4 text-gray-400">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-1">{title}</h3>
      <p className="text-gray-500 text-xs max-w-[260px] leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AnalyticsDashboard() {
  const { botId } = useParams<{ botId?: string }>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [bots, setBots] = useState<BotRecord[]>([]);
  const [selectedBotId, setSelectedBotId] = useState<string>(botId ?? "all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAllRecent, setShowAllRecent] = useState(false);

  useEffect(() => {
    if (botId) {
      setSelectedBotId(botId);
    } else {
      setSelectedBotId("all");
    }
  }, [botId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        // Fetch all bots
        const botsRes = await api.get("/bots");
        const rawBots: BotRecord[] = Array.isArray(botsRes.data)
          ? botsRes.data
          : botsRes.data?.bots ?? botsRes.data?.data ?? [];
        if (!cancelled) setBots(rawBots);

        // Fetch conversations for every bot in parallel
        const all: Conversation[] = [];
        await Promise.allSettled(
          rawBots.map(async (bot) => {
            const id = bot.id ?? bot._id ?? "";
            if (!id) return;
            try {
              const res = await api.get(`/conversations/${id}`);
              const convs: Conversation[] = Array.isArray(res.data) ? res.data : [];
              convs.forEach((c) => {
                c.botId = id;
                c.botName = bot.name ?? bot.botName ?? "Unknown Bot";
              });
              all.push(...convs);
            } catch { /* skip failed bot */ }
          })
        );
        if (!cancelled) {
          setConversations(all.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ── Derived analytics ────────────────────────────────────────────────────────
  const analytics = useMemo(() => {
    const filteredConvs = selectedBotId === "all"
      ? conversations
      : conversations.filter((c) => c.botId === selectedBotId);

    const totalConversations = filteredConvs.length;
    const totalMessages = filteredConvs.length * 2; // user + bot per convo
    const activeBots = selectedBotId === "all" ? bots.length : 1;
    const avgMsgsPerConv = activeBots > 0
      ? (totalMessages / Math.max(totalConversations, 1)).toFixed(1)
      : "0";

    // Bot performance map
    const botMsgMap: Record<string, { name: string; count: number }> = {};
    bots.forEach((b) => {
      const id = b.id ?? b._id ?? "";
      botMsgMap[id] = { name: b.name ?? b.botName ?? "Bot", count: 0 };
    });
    filteredConvs.forEach((c) => {
      if (c.botId && botMsgMap[c.botId]) botMsgMap[c.botId].count += 2;
    });
    const botPerf = Object.values(botMsgMap).sort((a, b) => b.count - a.count);
    const selectedBot = selectedBotId === "all" ? null : bots.find(b => (b.id ?? b._id) === selectedBotId);
    const mostActiveBot = selectedBot ? (selectedBot.name ?? selectedBot.botName ?? "—") : (botPerf[0]?.name ?? "—");
    const leastActiveBot = botPerf[botPerf.length - 1]?.name ?? "—";
    const maxBotMsgs = botPerf[0]?.count ?? 1;

    const aiResponseRate = totalConversations > 0
      ? ((filteredConvs.filter((c) => c.botReply?.length > 0).length / totalConversations) * 100).toFixed(0)
      : "0";

    const userMsgs = filteredConvs.map((c) => c.userMessage).filter(Boolean);
    const keywords = extractKeywords(userMsgs);
    const topQuestions = groupQuestions(userMsgs);
    const timeline = getTimeline(filteredConvs);
    const maxTimeline = Math.max(...timeline.map(([, n]) => n), 1);
    const recent = filteredConvs;

    return {
      totalConversations, totalMessages, activeBots, avgMsgsPerConv,
      mostActiveBot, leastActiveBot, aiResponseRate,
      botPerf, maxBotMsgs, keywords, topQuestions, timeline, maxTimeline, recent,
    };
  }, [conversations, bots, selectedBotId]);

  // ─── Loading ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 rounded-full border-2 border-[#814bf6] border-t-transparent animate-spin" />
        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest animate-pulse">Compiling Analytics...</p>
      </div>
    </div>
  );

  // ─── Error ──────────────────────────────────────────────────────────────────
  if (error) return (
    <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-10 flex items-center gap-4 text-red-300">
      <AlertCircle className="h-6 w-6 flex-shrink-0" />
      <p className="font-bold">Failed to load analytics. Please ensure the backend is running.</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-16">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#814bf6]/20 border border-[#814bf6]/40 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-[#a78bfa]" />
            </div>
            <h1 className="text-[2.5rem] md:text-[3.5rem] font-black text-white tracking-tighter uppercase leading-none">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#814bf6] via-cyan-400 to-emerald-400">Intelligence</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base font-light tracking-wide max-w-2xl">
            Enterprise-grade analytics across all your chatbot agents. Computed entirely on the frontend.
          </p>
        </div>

        {/* Chatbot Selector */}
        <div className="flex flex-col gap-1.5 min-w-[220px]">
          <label htmlFor="bot-select" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            Filter by Chatbot
          </label>
          <div className="relative">
            <select
              id="bot-select"
              value={selectedBotId}
              onChange={(e) => setSelectedBotId(e.target.value)}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-[#121214] hover:bg-white/[0.05] hover:border-white/20 px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#814bf6]/50 transition-all duration-300 pr-10 cursor-pointer"
            >
              <option value="all" className="bg-[#121214] text-white">All Chatbots</option>
              {bots.map((b) => (
                <option key={b.id ?? b._id} value={b.id ?? b._id} className="bg-[#121214] text-white">
                  {b.name ?? b.botName ?? "Unnamed Bot"}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* ── Top KPI Cards ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={MessageSquare} label="Total Conversations" value={analytics.totalConversations} accent="purple" />
        <StatCard icon={Zap} label="Total Messages" value={analytics.totalMessages} accent="cyan" />
        <StatCard icon={Activity} label="AI Response Rate" value={`${analytics.aiResponseRate}%`} accent="blue" />
      </div>

      {/* ── Row: Recent Conversations + Keyword Intelligence ─────────── */}
      <div className="grid lg:grid-cols-5 gap-6">

        {/* Recent Conversations - wider */}
        <div className="lg:col-span-3">
          <GlowCard accent="green">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <Clock className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-white font-black text-sm uppercase tracking-widest">Recent Conversations</h2>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Latest interactions</p>
              </div>
            </div>
            {analytics.recent.length === 0 ? (
              <EmptyState icon={MessageSquare} title="No Conversations" desc="User interactions will appear here once your bots receive messages." />
            ) : (
              <div className="space-y-3">
                {analytics.recent.slice(0, showAllRecent ? undefined : 5).map((c) => (
                  <div key={c._id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.05] transition-all duration-300 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-[#814bf6]/20 border border-[#814bf6]/30 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-3 w-3 text-[#a78bfa]" />
                        </div>
                        <span className="text-[10px] font-black text-[#a78bfa] uppercase tracking-widest">{c.botName ?? "Bot"}</span>
                      </div>
                      <span className="text-[10px] text-gray-600 font-medium">{new Date(c.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="space-y-1 pl-8">
                      <p className="text-white text-xs font-medium truncate">
                        <span className="text-gray-500 mr-1">User:</span>{c.userMessage}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        <span className="text-emerald-500 mr-1">AI:</span>{c.botReply}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Show More / Show Less Button */}
                {analytics.recent.length > 5 && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setShowAllRecent(!showAllRecent)}
                      className="px-6 py-2 rounded-xl border border-white/10 hover:border-emerald-500/30 bg-white/[0.02] hover:bg-emerald-500/10 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-all duration-300"
                    >
                      {showAllRecent ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </GlowCard>
        </div>

        {/* Keyword Intelligence */}
        <div className="lg:col-span-2">
          <GlowCard accent="pink">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
                <Brain className="h-4 w-4 text-pink-400" />
              </div>
              <div>
                <h2 className="text-white font-black text-sm uppercase tracking-widest">Keyword Intel</h2>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Top user terms</p>
              </div>
            </div>
            {analytics.keywords.length === 0 ? (
              <EmptyState icon={Brain} title="No Keywords" desc="Common words from conversations will appear here." />
            ) : (
              <div className="flex flex-wrap gap-2">
                {analytics.keywords.map((kw, i) => {
                  const opacity = Math.max(0.4, 1 - i * 0.03);
                  const size = i < 5 ? "text-sm font-black" : i < 12 ? "text-xs font-bold" : "text-[11px] font-medium";
                  const styles = [
                    "bg-[#814bf6]/15 text-[#a78bfa] border-[#814bf6]/25 hover:bg-[#814bf6]/25",
                    "bg-cyan-500/15 text-cyan-300 border-cyan-500/25 hover:bg-cyan-500/25",
                    "bg-pink-500/15 text-pink-300 border-pink-500/25 hover:bg-pink-500/25",
                    "bg-emerald-500/15 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/25",
                    "bg-orange-500/15 text-orange-300 border-orange-500/25 hover:bg-orange-500/25",
                  ];
                  return (
                    <span
                      key={kw.word}
                      style={{ opacity }}
                      className={`px-3 py-1.5 rounded-full border transition-all duration-300 cursor-default ${size} ${styles[i % styles.length]}`}
                    >
                      {kw.word}
                      <span className="ml-1.5 text-[9px] opacity-60">{kw.count}</span>
                    </span>
                  );
                })}
              </div>
            )}
          </GlowCard>
        </div>
      </div>

    </div>
  );
}
