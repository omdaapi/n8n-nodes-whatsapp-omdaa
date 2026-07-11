# @omdaapi/n8n-nodes-whatsapp-omdaa

<div align="center">

[![npm version](https://badge.fury.io/js/%40omdaapi%2Fn8n-nodes-whatsapp-omdaa.svg)](https://www.npmjs.com/package/@omdaapi/n8n-nodes-whatsapp-omdaa)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Free Forever](https://img.shields.io/badge/Pricing-Free%20Forever-10B981.svg)](https://omdaa.com)

**Official n8n community node** for [Omdaa WhatsApp API](https://omdaa.com)

**العربية:** [README.ar.md](README.ar.md)

[Website](https://omdaa.com) · [Dashboard](https://omdaa.com/dashboard) · [Docs](https://omdaa.net) · [SDK](https://github.com/omdaapi/omdaa-sdk)

</div>

---

## Overview

Connect **n8n** workflows to **Omdaa** — send WhatsApp messages, manage sessions, and receive webhooks in real time.

> **Free Forever:** Unlimited sessions, messages, Omdaa AI, and webhooks. No subscription. No credit card.

| Feature | Supported |
|---------|-----------|
| Send text, image, file | Yes |
| Session create / status / logout | Yes |
| Webhook trigger (incoming messages, QR, status) | Yes |
| Signature verification | Yes |
| Self-hosted n8n on Omdaa | [omdaa.com/n8n](https://omdaa.com/n8n/) |

---

## Installation

### n8n Desktop / Cloud UI

**Settings → Community Nodes → Install:**

```
@omdaapi/n8n-nodes-whatsapp-omdaa
```

### Self-hosted n8n

```bash
npm install @omdaapi/n8n-nodes-whatsapp-omdaa
```

Restart n8n after installation.

---

## Credentials

1. Create an account at [omdaa.com](https://omdaa.com).
2. Generate an **API Key** at [dashboard/api-keys](https://omdaa.com/dashboard/api-keys).
3. In n8n: **Credentials → New → Omdaa API**
   - **API URL:** `https://omdaa.com/api/v1`
   - **API Key:** your key

---

## Nodes

### Omdaa (Actions)

| Resource | Operations |
|----------|------------|
| **Message** | Send Text · Send Image · Send File |
| **Session** | Create · Get Status · Logout |

### Omdaa Trigger (Webhooks)

| Event | Description |
|-------|-------------|
| `message.received` | Incoming WhatsApp message |
| `session.status` | Session connection change |
| `qr.generated` | New QR code for linking |
| `*` | All events |

**Setup:**
1. Add **Omdaa Trigger** to your workflow.
2. Copy the webhook URL from n8n.
3. Configure the webhook in [Omdaa Dashboard → Webhooks](https://omdaa.com/dashboard/webhooks).
4. Optional: enable signature verification.

---

## Example workflows

### Send a message

```
Manual Trigger → Omdaa
  Resource: Message
  Operation: Send Text
  Session ID: default
  Phone Number: 966512345678
  Message: Hello from n8n!
```

### Auto-reply on incoming message

```
Omdaa Trigger (message.received) → Omdaa (Send Text)
```

Sample workflow JSON: [omdaa-sdk integrations](https://github.com/omdaapi/omdaa-sdk) · [omdaa.com/n8n](https://omdaa.com/n8n/)

---

## Related projects

| Project | Link |
|---------|------|
| Official SDK (5 languages) | [github.com/omdaapi/omdaa-sdk](https://github.com/omdaapi/omdaa-sdk) |
| Cursor MCP WhatsApp | [omdaa.com/mcp](https://omdaa.com/mcp) · [Cursor Directory](https://cursor.directory/plugins/omdaa-api) |
| API reference | [omdaa.com/api/v1/docs](https://omdaa.com/api/v1/docs) |
| Documentation | [omdaa.net](https://omdaa.net) |

---

## Development

```bash
npm install
npm run build
npm run lint
```

Publish: see [NPM_PUBLISHING_GUIDE.md](NPM_PUBLISHING_GUIDE.md)

---

## Support

- Email: [support@omdaa.com](mailto:support@omdaa.com)
- Issues: [GitHub Issues](https://github.com/omdaapi/n8n-nodes-whatsapp-omdaa/issues)

---

## License

MIT © [Omdaa API](https://omdaa.com)

---

<div align="center"><strong>Omdaa — Free Forever WhatsApp Business API</strong></div>
