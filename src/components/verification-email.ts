import { type SendVerificationRequestParams } from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import resolveConfig from "tailwindcss/resolveConfig";
import config from "../../tailwind.config";

export async function sendVerificationRequest(
  params: SendVerificationRequestParams,
) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

/* Email HTML body */
function html(params: { url: string; host: string }) {
  const { url, host } = params;
  const { theme } = resolveConfig(config);

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const white = theme?.colors?.white;
  const brandColor = theme?.colors?.primary;
  const textColor = theme?.colors?.["gray.700"];

  const color = {
    background: white,
    text: textColor,
    mainBackground: white,
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: white,
  };

  const fontFamily = `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif`;

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: ${theme?.borderRadius?.xl}">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: ${theme?.fontSize?.["4xl"]?.[0]}; font-family: ${fontFamily}; color: ${color.text};">
        <strong>Sign in to ${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: ${theme?.borderRadius?.lg}" bgcolor="${color.buttonBackground}"><a href="${url}/day-list"
                target="_blank"
                style="font-size: 18px; font-family: ${fontFamily}; color: ${color.buttonText}; text-decoration: none; border-radius: ${theme?.borderRadius?.lg}; padding: ${theme?.padding?.["2"]} ${theme?.padding?.["4"]}; border: 1px solid ${color.buttonBorder}; display: inline-block;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: ${fontFamily}; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
