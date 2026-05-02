interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export function buildContactEmailHtml({ name, email, message }: ContactEmailProps): string {
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0f0d1f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0d1f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#16132d;border-radius:16px;overflow:hidden;border:1px solid rgba(99,102,241,0.15);">

          <!-- Header gradient bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa);"></td>
          </tr>

          <!-- Logo area -->
          <tr>
            <td style="padding:32px 40px 16px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:40px;height:40px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:10px;text-align:center;vertical-align:middle;">
                    <span style="color:#ffffff;font-size:18px;font-weight:700;line-height:40px;">A</span>
                  </td>
                  <td style="padding-left:12px;">
                    <span style="color:#fafafa;font-size:16px;font-weight:600;">Portfolio · Nova Mensagem</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:24px 40px;">
              <!-- From card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.12);border-radius:12px;margin-bottom:20px;">
                <tr>
                  <td style="padding:20px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <span style="color:#a78bfa;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">De</span>
                          <br />
                          <span style="color:#fafafa;font-size:16px;font-weight:600;">${escapedName}</span>
                          <br />
                          <a href="mailto:${escapedEmail}" style="color:#818cf8;font-size:14px;text-decoration:none;">${escapedEmail}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;">
                <tr>
                  <td style="padding:20px;">
                    <span style="color:#a78bfa;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Mensagem</span>
                    <div style="margin-top:12px;color:#d1d5db;font-size:15px;line-height:1.7;">
                      ${escapedMessage}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 40px 32px;" align="center">
              <a href="mailto:${escapedEmail}?subject=Re: Mensagem do Portfolio" style="display:inline-block;padding:12px 32px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:10px;">
                Responder ${escapedName}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;background-color:rgba(0,0,0,0.2);border-top:1px solid rgba(255,255,255,0.04);">
              <span style="color:#6b7280;font-size:12px;">
                Enviado via formulário de contato · portfolio.andrifullstack.workers.dev
              </span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildContactEmailText({ name, email, message }: ContactEmailProps): string {
  return `Nova mensagem do portfolio

De: ${name}
Email: ${email}

Mensagem:
${message}

---
Enviado via formulário de contato · portfolio.andrifullstack.workers.dev`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
