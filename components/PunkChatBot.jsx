import { useState, useEffect, useRef } from "react";

export default function PunkChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Oi! I'm SID — your punk culture expert. Ask me anything about punk history, bands, subgenres, fashion, DIY, Christian punk, documentaries... whatever you want to know. 🤘" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = newMessages
        .filter((m, i) => !(i === 0 && m.role === "assistant"))
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/punk-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Try again in a sec. ⚡" }]);
    }
    setLoading(false);
  }

  const SUGGESTIONS = [
    "Best hardcore bands of the 80s?",
    "What is straight edge?",
    "Difference between Oi! and street punk?",
    "Best punk documentaries?",
    "Christian punk bands to know?",
    "How do I build a battle jacket?",
  ];

  return (
    <>
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">S</div>
              <div>
                <div className="chat-name">SID</div>
                <div className="chat-status">● Punk Culture Expert</div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role === "user" ? "chat-msg-user" : "chat-msg-bot"}`}>
                {msg.role === "assistant" && <div className="chat-msg-avatar">S</div>}
                <div className="chat-msg-bubble">{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg chat-msg-bot">
                <div className="chat-msg-avatar">S</div>
                <div className="chat-msg-bubble chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} className="chat-suggestion" onClick={() => { setInput(s); }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-row">
            <input
              className="chat-input"
              type="text"
              placeholder="Ask SID anything about punk..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button className="chat-send" onClick={sendMessage} disabled={loading || !input.trim()}>
              ▶
            </button>
          </div>
        </div>
      )}

      <button className={`chat-fab ${open ? "chat-fab-open" : ""}`} onClick={() => setOpen(o => !o)}>
        {open ? "✕" : "🤘"}
        {!open && <span className="chat-fab-label">ASK SID</span>}
      </button>
    </>
  );
}
