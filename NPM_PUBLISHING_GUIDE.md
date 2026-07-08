# 📦 دليل نشر n8n Community Node على npm

## 🎯 المتطلبات الأساسية

- ✅ Node.js 16+ مثبت
- ✅ npm 8+ مثبت
- ✅ حساب npm (سنقوم بإنشائه)
- ✅ Git مثبت

---

## 📋 الخطوة 1: إنشاء حساب npm

### 1.1 التسجيل على npmjs.com

1. افتح المتصفح وانتقل إلى: https://www.npmjs.com/signup
2. املأ البيانات التالية:
   - **Username**: اختر اسم مستخدم فريد (مثال: `omdaa-api`)
   - **Email**: بريدك الإلكتروني (مثال: `support@omdaa.com`)
   - **Password**: كلمة مرور قوية (16+ حرف)
3. اضغط على **Create an Account**
4. تحقق من بريدك الإلكتروني وقم بتفعيل الحساب

### 1.2 تفعيل Two-Factor Authentication (2FA) - مطلوب للنشر

1. بعد تسجيل الدخول، اذهب إلى: https://www.npmjs.com/settings/YOUR_USERNAME/tfa
2. اختر **Enable 2FA**
3. استخدم تطبيق مثل:
   - Google Authenticator (iOS/Android)
   - Authy (iOS/Android)
   - Microsoft Authenticator (iOS/Android)
4. امسح الـ QR Code من التطبيق
5. أدخل الـ 6-digit code للتأكيد
6. **احفظ الـ Recovery Codes** في مكان آمن!

### 1.3 تسجيل الدخول من Terminal

افتح PowerShell أو Command Prompt وقم بتشغيل:

```bash
npm login
```

ستظهر لك الأسئلة التالية:

```
Username: omdaa-api
Password: [أدخل كلمة المرور]
Email: support@omdaa.com
Enter one-time password: [أدخل 6-digit code من تطبيق المصادقة]
```

### 1.4 التحقق من تسجيل الدخول

```bash
npm whoami
```

يجب أن يظهر اسم المستخدم الخاص بك.

---

## 🔧 الخطوة 2: التحضير للنشر

### 2.1 الانتقال إلى مجلد المشروع

```bash
cd c:\xampp\htdocs\omdaa\n8n-node
```

### 2.2 تثبيت Dependencies

```bash
npm install --legacy-peer-deps
```

**ملاحظة:** نستخدم `--legacy-peer-deps` لأن n8n-workflow و n8n-core يتم توفيرهم من n8n نفسه.

### 2.3 بناء المشروع

```bash
npm run build
```

هذا الأمر سيقوم بـ:
- ✅ تشغيل TypeScript compiler (tsc)
- ✅ نسخ الأيقونات SVG إلى dist/

### 2.4 فحص Linting

```bash
npm run lint
```

إذا كانت هناك أخطاء، قم بإصلاحها باستخدام:

```bash
npm run lintfix
```

### 2.5 التحقق من محتويات dist/

تأكد من وجود الملفات التالية في `dist/`:

```
dist/
├── credentials/
│   └── OmdaaApi.credentials.js
├── nodes/
│   └── Omdaa/
│       ├── Omdaa.node.js
│       ├── OmdaaTrigger.node.js
│       └── omdaa.svg
```

---

## 🚀 الخطوة 3: النشر على npm

### 3.1 التحقق من اسم الحزمة

تأكد من أن اسم الحزمة في `package.json` هو:

```json
{
  "name": "@omdaa/n8n-nodes-whatsapp-omdaa"
}
```

### 3.2 التحقق من الإصدار

في المرة الأولى، يجب أن يكون:

```json
{
  "version": "1.0.0"
}
```

### 3.3 اختبار النشر (Dry Run)

قبل النشر الفعلي، اختبر بدون رفع:

```bash
npm publish --dry-run --access public
```

سيظهر لك ما سيتم نشره. تحقق من:
- ✅ حجم الحزمة معقول (< 1 MB)
- ✅ الملفات الصحيحة موجودة
- ✅ لا توجد ملفات حساسة (.env, node_modules, إلخ)

### 3.4 النشر الفعلي

```bash
npm publish --access public
```

**ملاحظة:** نستخدم `--access public` لأن الحزمة scoped (`@omdaa/`) تكون private بشكل افتراضي.

ستحتاج إلى إدخال 2FA code مرة أخرى.

### 3.5 التحقق من النشر

بعد النشر الناجح:

1. افتح المتصفح: https://www.npmjs.com/package/@omdaa/n8n-nodes-whatsapp-omdaa
2. تحقق من ظهور الحزمة
3. تحقق من README يظهر بشكل صحيح

---

## 🧪 الخطوة 4: اختبار الحزمة المنشورة

### 4.1 تثبيت n8n (إذا لم يكن مثبتاً)

```bash
npm install n8n -g
```

### 4.2 تثبيت Community Node

```bash
# الطريقة 1: من npm
npm install @omdaa/n8n-nodes-whatsapp-omdaa -g

# أو الطريقة 2: في مجلد n8n custom nodes
cd ~/.n8n/nodes
npm install @omdaa/n8n-nodes-whatsapp-omdaa
```

### 4.3 تشغيل n8n

```bash
n8n start
```

### 4.4 التحقق من ظهور Node

1. افتح المتصفح: http://localhost:5678
2. أنشئ workflow جديد
3. اضغط على `+` لإضافة node
4. ابحث عن "Omdaa"
5. يجب أن تظهر:
   - **Omdaa** (للإجراءات)
   - **Omdaa Trigger** (للـ Webhooks)

### 4.5 اختبار Node

#### اختبار 1: إعداد Credentials

1. اذهب إلى **Credentials** → **New**
2. ابحث عن "Omdaa API"
3. أدخل:
   - API URL: `https://your-omdaa-instance.com/api/v1`
   - API Key: `your-api-key`
4. اضغط **Save**

#### اختبار 2: إرسال رسالة

1. أضف **Omdaa** node
2. اختر:
   - Resource: Message
   - Operation: Send Text
   - Session ID: your-session-id
   - Phone Number: 966xxxxxxxxx
   - Message: Test from n8n
3. Execute node
4. تحقق من إرسال الرسالة بنجاح

#### اختبار 3: Webhook

1. أضف **Omdaa Trigger** node
2. اختر Events: message.received
3. انسخ الـ Webhook URL
4. في Omdaa Dashboard:
   - اذهب إلى Webhooks
   - أضف الـ URL
   - اختبر الـ Webhook
5. تحقق من استقبال البيانات في n8n

---

## 🔄 الخطوة 5: تحديث الحزمة (في المستقبل)

### 5.1 تحديث الإصدار

استخدم semantic versioning:

```bash
# Patch (1.0.0 → 1.0.1) - إصلاحات بسيطة
npm version patch

# Minor (1.0.0 → 1.1.0) - ميزات جديدة متوافقة
npm version minor

# Major (1.0.0 → 2.0.0) - تغييرات غير متوافقة
npm version major
```

### 5.2 بناء ونشر التحديث

```bash
npm run build
npm run lint
npm publish --access public
```

### 5.3 الإعلان عن التحديث

- أضف التغييرات في README.md (قسم Changelog)
- أنشئ GitHub Release
- أعلن في المجتمع

---

## ❌ حل المشاكل الشائعة

### المشكلة 1: "You must sign in to publish packages"

**الحل:**
```bash
npm logout
npm login
```

### المشكلة 2: "403 Forbidden"

**الحل:**
- تأكد من تفعيل 2FA
- تأكد من أنك مسجل الدخول: `npm whoami`
- تأكد من أن اسم الحزمة غير مستخدم

### المشكلة 3: "Payment Required - put a credit card on file"

**الحل:**
- اذهب إلى https://www.npmjs.com/settings/billing
- أضف بطاقة ائتمان (مجاني للحزم العامة)

### المشكلة 4: "tsc: command not found"

**الحل:**
```bash
npm install
```

أو ثبت TypeScript عالمياً:
```bash
npm install -g typescript
```

### المشكلة 5: "n8n doesn't recognize the node"

**الحل:**
- تأكد من وجود `n8n` في `package.json` keywords
- تأكد من `n8nNodesApiVersion: 1` في package.json
- أعد تشغيل n8n بالكامل
- امسح cache: `rm -rf ~/.n8n/cache`

---

## 📊 معلومات إضافية

### تكلفة النشر

- ✅ النشر على npm: **مجاني 100%** للحزم العامة
- ✅ Bandwidth: **غير محدود**
- ✅ Downloads: **غير محدود**

### الصلاحيات المطلوبة

لنشر حزم scoped (`@omdaa/`):
1. يجب أن تكون عضواً في منظمة `omdaa` على npm، أو
2. يجب أن يكون اسم المستخدم الخاص بك هو `omdaa`

إذا لم يكن لديك المنظمة:

```bash
# إنشاء منظمة
# اذهب إلى: https://www.npmjs.com/org/create
```

أو استخدم اسم مستخدمك:

```json
{
  "name": "@your-username/n8n-nodes-whatsapp-omdaa"
}
```

### الإحصائيات والتحليلات

بعد النشر، يمكنك متابعة:
- عدد التحميلات: https://www.npmjs.com/package/@omdaa/n8n-nodes-whatsapp-omdaa
- npm trends: https://npmtrends.com/@omdaa/n8n-nodes-whatsapp-omdaa

---

## 🎉 تهانينا!

أصبح لديك الآن Community Node منشور على npm! 🚀

### الخطوات التالية:

1. ✅ أضف badge إلى README:
   ```markdown
   [![npm version](https://badge.fury.io/js/%40omdaa%2Fn8n-nodes-whatsapp-omdaa.svg)](https://www.npmjs.com/package/@omdaa/n8n-nodes-whatsapp-omdaa)
   [![npm downloads](https://img.shields.io/npm/dm/@omdaa/n8n-nodes-whatsapp-omdaa.svg)](https://www.npmjs.com/package/@omdaa/n8n-nodes-whatsapp-omdaa)
   ```

2. ✅ أضف إلى n8n Community Nodes:
   https://docs.n8n.io/integrations/community-nodes/registry/

3. ✅ أنشئ documentation شاملة

4. ✅ أنشئ example workflows

5. ✅ شارك في مجتمع n8n:
   - Discord: https://discord.gg/n8n
   - Forum: https://community.n8n.io/

---

## 📞 الدعم

إذا واجهت أي مشاكل:
- Email: support@omdaa.com
- GitHub Issues: https://github.com/omdaapi/n8n-nodes-whatsapp-omdaa/issues
- n8n Community: https://community.n8n.io/

---

## 📚 مصادر إضافية

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [npm Publishing Documentation](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning Guide](https://semver.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**آخر تحديث:** 2026-01-15
