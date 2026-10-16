// Cloudflare Pages Function: /api/health
export async function onRequestGet() {
  const data = {
    status: "healthy",
    agency: "Tabish Web",
    service: "Cloudflare Pages Function Inquiries API",
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
