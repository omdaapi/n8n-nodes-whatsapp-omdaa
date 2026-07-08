# @omdaapi/n8n-nodes-whatsapp-omdaa

<div align="center">

[![npm version](https://badge.fury.io/js/%40omdaapi%2Fn8n-nodes-whatsapp-omdaa.svg)](https://www.npmjs.com/package/@omdaapi/n8n-nodes-whatsapp-omdaa)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![مجاني للأبد](https://img.shields.io/badge/التسعير-مجاني%20للأبد-10B981.svg)](https://omdaa.com)

**عقدة n8n المجتمعية الرسمية** لـ [Omdaa WhatsApp API](https://omdaa.com)

**English:** [README.md](README.md)

[الموقع](https://omdaa.com) · [لوحة التحكم](https://omdaa.com/dashboard) · [التوثيق](https://omdaa.net) · [SDK](https://github.com/omdaapi/omdaa-sdk)

</div>

---

## نظرة عامة

اربط سير عمل **n8n** بـ **Omdaa** — أرسل رسائل واتساب، أدر الجلسات، واستقبل webhooks فوراً.

> **مجاني للأبد:** جلسات ورسائل وOmdaa AI وwebhooks بلا حدود. بدون اشتراك وبدون بطاقة ائتمان.

| الميزة | مدعوم |
|--------|-------|
| إرسال نص · صورة · ملف | نعم |
| إنشاء جلسة / الحالة / تسجيل خروج | نعم |
| Webhook trigger (رسائل واردة، QR، حالة) | نعم |
| التحقق من التوقيع | نعم |
| n8n مستضاف على Omdaa | [omdaa.com/n8n](https://omdaa.com/n8n/) |

---

## التثبيت

### من واجهة n8n

**Settings → Community Nodes → Install:**

```
@omdaapi/n8n-nodes-whatsapp-omdaa
```

### n8n ذاتي الاستضافة

```bash
npm install @omdaapi/n8n-nodes-whatsapp-omdaa
```

أعد تشغيل n8n بعد التثبيت.

---

## بيانات الاعتماد

1. أنشئ حساباً في [omdaa.com](https://omdaa.com).
2. أنشئ **API Key** من [dashboard/api-keys](https://omdaa.com/dashboard/api-keys).
3. في n8n: **Credentials → New → Omdaa API**
   - **API URL:** `https://omdaa.com/api/v1`
   - **API Key:** مفتاحك

---

## العقد

### Omdaa (إجراءات)

| المورد | العمليات |
|--------|----------|
| **Message** | Send Text · Send Image · Send File |
| **Session** | Create · Get Status · Logout |

### Omdaa Trigger (Webhooks)

| الحدث | الوصف |
|-------|--------|
| `message.received` | رسالة واتساب واردة |
| `session.status` | تغيّر حالة الاتصال |
| `qr.generated` | QR جديد للربط |
| `*` | جميع الأحداث |

---

## أمثلة سير العمل

### إرسال رسالة

```
Manual Trigger → Omdaa
  Resource: Message
  Operation: Send Text
  Session ID: default
  Phone Number: 966512345678
  Message: مرحباً من n8n!
```

### رد تلقائي على رسالة واردة

```
Omdaa Trigger (message.received) → Omdaa (Send Text)
```

---

## مشاريع مرتبطة

| المشروع | الرابط |
|---------|--------|
| SDK رسمي (5 لغات) | [github.com/omdaapi/omdaa-sdk](https://github.com/omdaapi/omdaa-sdk) |
| Cursor MCP واتساب | [omdaa.com/mcp](https://omdaa.com/mcp) |
| مرجع API | [omdaa.com/api/v1/docs](https://omdaa.com/api/v1/docs) |
| التوثيق | [omdaa.net](https://omdaa.net) |

---

## التطوير

```bash
npm install
npm run build
npm run lint
```

---

## الدعم

- البريد: [support@omdaa.com](mailto:support@omdaa.com)
- المشاكل: [GitHub Issues](https://github.com/omdaapi/n8n-nodes-whatsapp-omdaa/issues)

---

## الترخيص

MIT © [Omdaa API](https://omdaa.com)

---

<div align="center"><strong>Omdaa — WhatsApp Business API مجاني للأبد</strong></div>
