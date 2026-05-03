import { useMemo, useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/api/chatApi";
import { cn } from "@/lib/utils";

interface ChatMessage {
id: string;
role: "user" | "assistant";
content: string;
}

interface ChatWindowProps {
botId: string;
}

export default function ChatWindow({ botId }: ChatWindowProps) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! Ask me anything to test your chatbot.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const mutation = useMutation({
    mutationFn: (message: string) => sendMessage(botId, message),
    onSuccess: (response: any) => {
      console.log("CHAT RESPONSE:", response);

      const reply =
        response?.reply ||
        response?.message ||
        "AI did not return a reply.";

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: reply,
        },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant-error`,
          role: "assistant",
          content: "Sorry, I could not reach the server. Please try again.",
        },
      ]);
    },
  });

  const canSend = useMemo(
    () => input.trim().length > 0 && !mutation.isPending,
    [input, mutation.isPending]
  );

  const handleSend = () => {
    if (!canSend) return;

    const message = input.trim();

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        role: "user",
        content: message,
      },
    ]);

    mutation.mutate(message);
  };

  return (
    <div className="rounded-[40px] border border-gray-200 bg-[#f4f4f4] p-6 md:p-10 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
      <div className="space-y-1">
        <h2 className="text-xl font-black text-black uppercase tracking-tight">
          System Console
        </h2>
        <p className="text-sm font-semibold text-gray-500">
          Running local testing environment for AI responses.
        </p>
      </div>

      <div 
        className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        data-lenis-prevent
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-4",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <div className="h-10 w-10 shrink-0 rounded-2xl bg-black flex items-center justify-center shadow-md">
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}

            <div
              className={cn(
                "max-w-[80%] rounded-[24px] px-6 py-4 text-[15px] leading-relaxed shadow-sm font-medium",
                message.role === "user"
                  ? "bg-[#814bf6] text-white rounded-tr-sm"
                  : "bg-white text-black border border-gray-200 rounded-tl-sm"
              )}
            >
              {message.content}
            </div>

            {message.role === "user" && (
              <div className="h-10 w-10 shrink-0 rounded-2xl bg-gray-200 flex items-center justify-center shadow-md">
                <User className="h-5 w-5 text-black" />
              </div>
            )}
          </div>
        ))}
        {mutation.isPending && (
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce" />
            <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200/60">
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="bg-white border-gray-200 shadow-sm rounded-[20px] h-16 text-black px-6 text-lg placeholder:text-gray-400 focus-visible:ring-[#814bf6]"
          placeholder="Send a test message..."
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSend();
            }
          }}
        />

        <Button
          onClick={handleSend}
          disabled={!canSend}
          className="h-16 px-8 rounded-[20px] bg-black text-white hover:bg-gray-800 font-bold uppercase tracking-widest text-[13px] transition-all hover:scale-[1.02] shadow-xl"
        >
          {mutation.isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5 mr-0 sm:mr-2" />
          )}
          <span className="hidden sm:inline">Send</span>
        </Button>
      </div>
    </div>
  );
}
