export async function submitEmail(email: string, source: string) {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("No webhook URL configured");
    return { success: false, error: "No webhook configured" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source,
        timestamp: new Date().toISOString(),
        page_url: typeof window !== "undefined" ? window.location.href : "",
      }),
    });

    return { success: res.ok };
  } catch {
    return { success: false, error: "Network error" };
  }
}
