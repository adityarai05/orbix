import { useParams, Link } from "react-router-dom";
import ChatWindow from "@/components/ChatWindow";

export default function TestChat() {
  const { botId } = useParams<{ botId: string }>();

  if (!botId) {
    return (
      <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 text-sm text-gray-400">
        Missing bot ID. Return to{" "}
        <Link className="text-primary underline" to="/dashboard/chatbots">
          chatbots
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <header className="space-y-4">
        <h1 className="text-[4rem] md:text-[6rem] font-bold text-white tracking-tighter uppercase leading-[0.9]">
          Live<br/>
          <span className="text-gray-500">Preview</span>
        </h1>
        <p className="text-gray-400 text-lg font-medium tracking-tight max-w-lg mt-4">
          Chat with your intelligent agent in real-time to review operational accuracy.
        </p>
      </header>

      <ChatWindow botId={botId} />
    </div>
  );
}
