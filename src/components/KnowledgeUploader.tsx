import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { uploadKnowledge, uploadFromUrl } from "@/api/knowledgeApi";

interface Props {
  botId: string;
}

export default function KnowledgeUploader({ botId }: Props) {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [tab, setTab] = useState("text");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!botId) throw new Error("Bot not selected");

      if (tab === "url") {
        if (!url.trim()) throw new Error("Enter URL");
        return uploadFromUrl(botId, url);
      }

      if (!content.trim()) throw new Error("Enter content");

      return uploadKnowledge(botId, content);
    },
    onSuccess: () => {
      setContent("");
      setUrl("");
      alert("Knowledge added successfully");
    },
    onError: (err: any) => {
      alert(err.message || "Error uploading");
    },
  });

  return (
    <div className="p-6 border rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Add Knowledge</h2>

      {/* 🔥 TAB SWITCH */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
        </TabsList>

        {/* TEXT TAB */}
        <TabsContent value="text">
          <Textarea
            placeholder="Paste your knowledge..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </TabsContent>

        {/* URL TAB */}
        <TabsContent value="url">
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </TabsContent>
      </Tabs>

      <Button onClick={() => mutation.mutate()}>
        {mutation.isPending ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}