import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createBot } from "@/api/botApi";

const toneOptions = ["Professional", "Friendly", "Concise", "Playful", "Technical"];

export default function CreateBot() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    description: "",
    tone: "Professional",
    language: "English",
    welcomeMessage: "Hello! How can I help you today?",
  });

  const mutation = useMutation({
    mutationFn: () => createBot(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bots"] });
      navigate("/dashboard/chatbots");
    },
  });

  return (
    <div className="space-y-16">
      <header className="space-y-4">
        <h1 className="text-[4rem] md:text-[6rem] font-bold text-white tracking-tighter uppercase leading-[0.9]">
          Create<br/>
          <span className="text-gray-500">Agent</span>
        </h1>
        <p className="text-gray-400 text-lg font-medium tracking-tight max-w-lg mt-4">
          Configure a new intelligence protocol. Give your agent a target persona and functionality.
        </p>
      </header>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
        className="rounded-[30px] border border-white/10 bg-[#111] p-8 md:p-12 lg:p-16 space-y-10"
      >
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Identity Tag</Label>
            <Input
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="bg-black border-white/10 rounded-[14px] h-14 text-white placeholder:text-gray-600 focus-visible:ring-[#814bf6] focus-visible:border-[#814bf6] transition-all px-5 font-medium"
              placeholder="e.g. Sales Architect"
              required
            />
          </div>
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Core Language</Label>
            <Input
              value={form.language}
              onChange={(event) => setForm((prev) => ({ ...prev, language: event.target.value }))}
              className="bg-black border-white/10 rounded-[14px] h-14 text-white placeholder:text-gray-600 focus-visible:ring-[#814bf6] transition-all px-5 font-medium"
              placeholder="English"
              required
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Operational Directive (Description)</Label>
          <Textarea
            value={form.description}
            onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            className="bg-black border-white/10 rounded-[20px] min-h-[160px] text-white placeholder:text-gray-600 focus-visible:ring-[#814bf6] transition-all p-5 font-medium resize-none"
            placeholder="Define the primary functionality and operational limits of this agent..."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Persona Tone</Label>
            <Select value={form.tone} onValueChange={(value) => setForm((prev) => ({ ...prev, tone: value }))}>
              <SelectTrigger className="bg-black border-white/10 rounded-[14px] h-14 text-white focus:ring-[#814bf6] px-5 font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#111] border-white/10 text-white rounded-[14px]">
                {toneOptions.map((tone) => (
                  <SelectItem key={tone} value={tone} className="focus:bg-white/10 rounded-lg cursor-pointer my-1">
                    {tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Activation Message</Label>
            <Input
              value={form.welcomeMessage}
              onChange={(event) => setForm((prev) => ({ ...prev, welcomeMessage: event.target.value }))}
              className="bg-black border-white/10 rounded-[14px] h-14 text-white placeholder:text-gray-600 focus-visible:ring-[#814bf6] transition-all px-5 font-medium"
            />
          </div>
        </div>

        {mutation.isError && (
          <div className="p-4 rounded-[14px] bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-sm tracking-tight">
            System Error: Failed to deploy agent configuration. Please reload and try again.
          </div>
        )}

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full h-16 mt-8 rounded-[20px] bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-widest text-[13px] transition-all hover:scale-[1.01]"
        >
          {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Deploy Intelligence"}
        </Button>
      </form>
    </div>
  );
}
