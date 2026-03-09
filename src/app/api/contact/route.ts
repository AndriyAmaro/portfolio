import { contactSchema } from "@/lib/validations";
import { getResend } from "@/lib/resend";
import { buildContactEmailHtml, buildContactEmailText } from "@/lib/email-templates";
import { NextRequest, NextResponse } from "next/server";

// Rate limiting (in-memory, resets on cold start — acceptable for portfolio)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

const RECIPIENT_EMAIL = "andrifullstackdev@gmail.com";

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Muitas requisições. Tente novamente em 1 minuto." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { success: false, error: "Validação falhou", details: errors },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Send email via Resend
    const resend = getResend();
    if (!resend) {
      console.log("[Contact] RESEND_API_KEY not set. Message from:", name, email);
      console.log("[Contact] Message:", message);
      return NextResponse.json(
        { success: true, message: "Mensagem recebida (modo dev)." },
        { status: 201 }
      );
    }

    const { error: sendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Portfolio · Nova mensagem de ${name}`,
      html: buildContactEmailHtml({ name, email, message }),
      text: buildContactEmailText({ name, email, message }),
    });

    if (sendError) {
      console.error("[Contact] Resend error:", sendError);
      return NextResponse.json(
        { success: false, error: "Falha ao enviar mensagem. Tente novamente." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Mensagem enviada com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return NextResponse.json(
      { success: false, error: "Erro inesperado. Tente novamente." },
      { status: 500 }
    );
  }
}
