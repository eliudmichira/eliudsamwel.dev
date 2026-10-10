# 🚀 n8n Quick Reference Card

## 📋 **Essential Configurations**

### **Webhook URL (Frontend)**
```javascript
const N8N_WEBHOOK_URL = 'https://michmichira.app.n8n.cloud/webhook/contact-form';
```

### **Webhook Node Settings**
- **HTTP Method**: `POST`
- **Path**: `contact-form`
- **Response Mode**: `Immediately`
- **Authentication**: `None`

---

## 📧 **Gmail Node Configurations**

### **Node 1: Send Email to You**
```json
{
  "operation": "send",
  "to": "eliudmichira7@gmail.com",
  "subject": "🚨 New Portfolio Contact: {{$json.name}}",
  "emailType": "html"
}
```

### **Node 2: Auto-Reply to Client**
```json
{
  "operation": "send",
  "to": "{{$json.email}}",
  "subject": "Thank you for contacting Eliud Michira! 🚀",
  "emailType": "html"
}
```

---

## 📱 **Telegram Node Configuration**

### **Required Setup**:
1. **Bot Token**: Get from @BotFather
2. **Chat ID**: Your personal chat ID

### **Node Settings**:
```json
{
  "chatId": "YOUR_CHAT_ID",
  "text": "🚨 **New Portfolio Contact!**\n\n👤 **Name:** {{$json.name}}\n📧 **Email:** {{$json.email}}\n{{#if $json.company}}🏢 **Company:** {{$json.company}}{{/if}}\n{{#if $json.budget}}💰 **Budget:** {{$json.budget}}{{/if}}\n{{#if $json.services}}🛠️ **Services:** {{$json.services}}{{/if}}\n{{#if $json.timeline}}⏰ **Timeline:** {{$json.timeline}}{{/if}}\n\n💬 **Message:**\n{{$json.message}}\n\n📅 **Submitted:** {{$json.timestamp}}\n🌐 **Source:** {{$json.source}}\n\n{{#if $json.isSpam}}⚠️ **Potential Spam Detected!**{{/if}}\n\n[📧 Reply via Email](mailto:{{$json.email}}?subject=Re: Your Portfolio Inquiry)",
  "parse_mode": "Markdown"
}
```

---

## 📊 **Google Sheets Configuration**

### **Sheet Structure**:
| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Company | Budget | Services | Timeline | Message | Is Spam |

### **Node Settings**:
```json
{
  "operation": "append",
  "documentId": "YOUR_SHEET_ID",
  "range": "A:I",
  "values": "={{ [$json.timestamp, $json.name, $json.email, $json.company || '', $json.budget || '', $json.services || '', $json.timeline || '', $json.message, $json.isSpam ? 'Yes' : 'No'] }}"
}
```

---

## 🔍 **Data Validation Code**

### **Code Node Configuration**:
```javascript
// Data validation and processing
const requiredFields = ['name', 'email', 'message'];
const missingFields = requiredFields.filter(field => !$json[field]);

if (missingFields.length > 0) {
  throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
}

// Basic spam filtering
const spamKeywords = ['viagra', 'casino', 'lottery', 'crypto', 'bitcoin', 'make money fast'];
const message = $json.message.toLowerCase();
const isSpam = spamKeywords.some(keyword => message.includes(keyword));

// Add metadata
const processedData = {
  ...$json,
  isSpam,
  processedAt: new Date().toISOString(),
  ipAddress: $json.userAgent ? 'Unknown' : 'Unknown',
  source: $json.source || 'Portfolio Website'
};

return [{ json: processedData }];
```

---

## ⚡ **Webhook Response Configuration**

```json
{
  "respondWith": "json",
  "responseBody": "={\n  \"success\": true,\n  \"message\": \"Thank you for your message! I'll get back to you within 2-4 hours.\",\n  \"timestamp\": new Date().toISOString(),\n  \"submissionId\": $json.processedAt\n}"
}
```

---

## 🔗 **Node Connections**

```
Webhook → Validate Data → [Gmail (You), Gmail (Auto-Reply), Telegram] → Google Sheets → Response
```

---

## 🧪 **Test Data**

### **Valid Test Submission**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Tech Corp",
  "budget": "$5,000 - $10,000",
  "services": "Web Development",
  "timeline": "1-2 months",
  "message": "I need a portfolio website built with React and Node.js",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "source": "Portfolio Website"
}
```

### **Test Command**:
```bash
curl -X POST https://michmichira.app.n8n.cloud/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'
```

---

## 🔑 **Required Credentials**

1. **Gmail OAuth2**: `eliudmichira7@gmail.com`
2. **Telegram Bot Token**: From @BotFather
3. **Google Sheets OAuth2**: For logging
4. **Chat ID**: Your Telegram chat ID

---

## ✅ **Success Indicators**

- ✅ Email received in inbox
- ✅ Auto-reply sent to client
- ✅ Telegram notification received
- ✅ Row added to Google Sheets
- ✅ Success response returned to form

**Your workflow is ready to handle real contact form submissions!** 🚀 