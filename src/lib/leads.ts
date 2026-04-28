export type LeadSource =
  | "whatsapp_property"
  | "alert_property"
  | "alert_search"
  | "list_property";

export type LeadPayload = {
  source: LeadSource;
  createdAt: string; // ISO
  pageUrl: string;
  ref?: {
    propertyId?: string;
    propertyTitle?: string;
    neighborhood?: string;
    operation?: "buy" | "rent" | "all";
  };
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  message?: string;
};

type LeadSendResult = { ok: true } | { ok: false; error: string };

const LOCAL_STORAGE_KEY = "jtg:leads";

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function storeLeadLocally(lead: LeadPayload) {
  const prev = safeJsonParse<LeadPayload[]>(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? [];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([lead, ...prev].slice(0, 200)));
}

export async function sendLead(lead: LeadPayload): Promise<LeadSendResult> {
  const webhookUrl = import.meta.env.VITE_LEADS_WEBHOOK_URL as string | undefined;

  // Sempre armazena localmente como “fila” simples (não perde lead se webhook falhar).
  storeLeadLocally(lead);

  if (!webhookUrl) {
    return { ok: false, error: "VITE_LEADS_WEBHOOK_URL não configurada" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      return { ok: false, error: `Webhook respondeu ${res.status}` };
    }

    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Falha ao enviar webhook" };
  }
}

