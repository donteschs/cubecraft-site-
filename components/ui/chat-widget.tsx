"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useEffect, useRef } from "react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages: chatMessages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const welcomeMsg = { id: "welcome", role: "assistant", content: "Bonjour ! 👋 Je suis CubeBot. Quel pack vous intéresse, ou avez-vous une question sur CubeCraft ?" };
  const messages = [welcomeMsg, ...chatMessages] as Array<{ id: string; role: string; content: string }>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[min(380px,calc(100vw-2rem))] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white flex flex-col"
          style={{ height: "clamp(420px,70vh,580px)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-creeper-dark border-b border-creeper-dark/30 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
                </svg>
              </div>
              <div>
                <p className="font-rubik font-bold text-white text-sm leading-tight">CubeBot</p>
                <p className="text-white/60 text-[10px] font-inter flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  En ligne · Répond instantanément
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Fermer le chat">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22z"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${(m.role as string) === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-md bg-creeper-light/40 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-creeper-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
                    </svg>
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm font-inter leading-relaxed ${
                  m.role === "user"
                    ? "bg-creeper text-white rounded-br-sm"
                    : "bg-gray-100 text-pierre rounded-bl-sm"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-md bg-creeper-light/40 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-creeper-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-pierre/40 rounded-full animate-bounce" style={{animationDelay:"0ms"}}/>
                  <span className="w-1.5 h-1.5 bg-pierre/40 rounded-full animate-bounce" style={{animationDelay:"150ms"}}/>
                  <span className="w-1.5 h-1.5 bg-pierre/40 rounded-full animate-bounce" style={{animationDelay:"300ms"}}/>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-100 px-3 py-3 flex gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Posez votre question…"
              className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm font-inter text-pierre placeholder-pierre/40 focus:outline-none focus:border-creeper focus:ring-1 focus:ring-creeper/30 transition-colors"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-xl bg-creeper text-white flex items-center justify-center flex-shrink-0 hover:bg-creeper-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2.5 13.5l11-5.5-11-5.5v4.5l7 1-7 1v4.5z"/>
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating trigger */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat CubeBot"}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-creeper shadow-lg shadow-creeper/40 flex items-center justify-center text-white hover:bg-creeper-dark hover:scale-110 active:scale-95 transition-all duration-200 border-2 border-white"
        style={{ bottom: `calc(1.5rem + env(safe-area-inset-bottom, 0px))` }}
      >
        {open ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
          </svg>
        )}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-creeper animate-ping opacity-30 pointer-events-none" />
        )}
      </button>
    </>
  );
}
