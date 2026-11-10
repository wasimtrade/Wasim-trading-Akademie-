// KI-Proxy für die Wasim Trading Akademie (Cloudflare Worker).
// Hält deinen API-Schlüssel geheim: Die Webseite schickt Fragen an diesen Worker, der Worker fragt die Claude-API.
// Einrichtung: siehe HOSTING-ANLEITUNG.md
export default {
  async fetch(req, env) {
    const allow = env.ALLOWED_ORIGIN || "*";
    const cors = { "Access-Control-Allow-Origin": allow, "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
    const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
    let b; try { b = await req.json(); } catch { return json({ error: "Bad request" }, 400); }
    let msgs = (Array.isArray(b.messages) ? b.messages : []).slice(-12).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content || "").slice(0, 4000) }));
    while (msgs.length && msgs[0].role !== "user") msgs.shift();
    if (!msgs.length) return json({ error: "No messages" }, 400);
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: env.MODEL || "claude-sonnet-5-5", max_tokens: 900, system: String(b.system || "").slice(0, 3000), messages: msgs })
    });
    if (!r.ok) return json({ error: "Upstream error", status: r.status }, 502);
    const d = await r.json();
    return json({ text: (d.content || []).map(c => c.text || "").join("") });
  }
};
