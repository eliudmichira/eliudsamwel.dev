# 🔧 n8n Integration Setup Guide

## 📧 Contact Form → n8n → Email Automation

This guide explains how to set up n8n to handle your portfolio contact form submissions and automatically send emails.

## 🚀 **Step 1: Install & Setup n8n**

### **Option A: Cloud Hosting (Recommended for beginners)**
```bash
# Visit https://n8n.cloud and create an account
# Or use n8n.io hosted version
```

### **Option B: Self-Hosted (VPS/Server)**
```bash
# Install n8n globally
npm install n8n -g

# Or using Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Or using Docker Compose
# Create docker-compose.yml file with n8n configuration
```

### **Option C: Local Development**
```bash
# Install locally for testing
npx n8n

# Access at http://localhost:5678
```

## 🎯 **Step 2: Create Contact Form Workflow**

### **1. Create New Workflow**
- Open n8n interface
- Click "New Workflow"
- Name it "Portfolio Contact Form Handler"

### **2. Add Webhook Trigger**
- Add "Webhook" node as trigger
- Set HTTP Method: `POST`
- Set Path: `contact-form`
- Authentication: `None` (or add authentication if needed)
- Copy the webhook URL (e.g., `https://your-n8n-instance.com/webhook/contact-form`)

### **3. Add Data Processing (Optional)**
- Add "Set" node to transform/validate data
- Add "IF" node for conditional logic (e.g., spam filtering)

### **4. Add Email Node**
```json
// Email node configuration
{
  "to": "eliudmichira7@gmail.com",
  "subject": "New Portfolio Contact: {{$json.name}}",
  "html": `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {{$json.name}}</p>
    <p><strong>Email:</strong> {{$json.email}}</p>
    <p><strong>Company:</strong> {{$json.company}}</p>
    <p><strong>Budget:</strong> {{$json.budget}}</p>
    <p><strong>Services:</strong> {{$json.services}}</p>
    <p><strong>Timeline:</strong> {{$json.timeline}}</p>
    <p><strong>Message:</strong></p>
    <p>{{$json.message}}</p>
    
    <hr>
    <p><strong>Submitted:</strong> {{$json.timestamp}}</p>
    <p><strong>Source:</strong> {{$json.source}}</p>
    <p><strong>Referrer:</strong> {{$json.referrer}}</p>
  `
}
```

## ⚙️ **Step 3: Configure Email Provider**

### **Option A: Gmail (Recommended)**
```bash
# In Email node, select Gmail
# Authenticate with your Google account
# Or use App Password for enhanced security
```

### **Option B: SMTP (Any provider)**
```json
{
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "auth": {
    "user": "your-email@gmail.com",
    "pass": "your-app-password"
  }
}
```

### **Option C: SendGrid, Mailgun, etc.**
```json
{
  "service": "sendgrid",
  "auth": {
    "api_key": "your-sendgrid-api-key"
  }
}
```

## 🔧 **Step 4: Update Your Website Code**

### **1. Replace the Webhook URL**
In `contact/ContactPage.tsx`, replace:
```typescript
const N8N_WEBHOOK_URL = 'https://your-actual-n8n-instance.com/webhook/contact-form';
```

### **2. Test the Integration**
```bash
# Test with curl
curl -X POST https://your-n8n-instance.com/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Co",
    "budget": "$5,000 - $10,000",
    "services": ["Web Development"],
    "timeline": "1-2 months",
    "message": "This is a test message",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "source": "Portfolio Website"
  }'
```

## 🎨 **Step 5: Advanced n8n Workflow Features**

### **1. Auto-Reply to Client**
```json
// Add second Email node
{
  "to": "{{$json.email}}",
  "subject": "Thank you for contacting Eliud Michira",
  "html": `
    <h2>Thank you for your interest!</h2>
    <p>Hi {{$json.name}},</p>
    <p>Thank you for reaching out! I've received your project inquiry and will get back to you within 2-4 hours.</p>
    
    <h3>What's Next?</h3>
    <ul>
      <li>I'll review your project details</li>
      <li>Prepare a detailed proposal</li>
      <li>Schedule a call if needed</li>
    </ul>
    
    <p>Best regards,<br>Eliud Michira</p>
    <p>📧 eliudmichira7@gmail.com<br>📱 +254 705 893 137</p>
  `
}
```

### **2. Slack/Discord Notifications**
```json
// Add Slack node for instant notifications
{
  "channel": "#projects",
  "text": "🚨 New portfolio contact from {{$json.name}} ({{$json.email}}) - Budget: {{$json.budget}}"
}
```

### **3. Google Sheets Logging**
```json
// Add Google Sheets node to log all submissions
{
  "operation": "append",
  "range": "A:H",
  "values": [
    ["{{$json.timestamp}}", "{{$json.name}}", "{{$json.email}}", "{{$json.company}}", "{{$json.budget}}", "{{$json.services}}", "{{$json.timeline}}", "{{$json.message}}"]
  ]
}
```

### **4. Spam Filtering**
```javascript
// Add Code node for spam detection
const spamKeywords = ['viagra', 'casino', 'lottery', 'crypto'];
const message = $json.message.toLowerCase();
const isSpam = spamKeywords.some(keyword => message.includes(keyword));

if (isSpam) {
  return [{ json: { ...items[0].json, isSpam: true } }];
}
return [{ json: { ...items[0].json, isSpam: false } }];
```

## 🛡️ **Step 6: Security & Best Practices**

### **1. Rate Limiting**
```javascript
// Add rate limiting logic
const clientIP = $json.userAgent;
// Implement IP-based rate limiting
```

### **2. Data Validation**
```javascript
// Validate required fields
const requiredFields = ['name', 'email', 'message'];
const missingFields = requiredFields.filter(field => !$json[field]);

if (missingFields.length > 0) {
  throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
}
```

### **3. CORS Configuration**
```json
// In webhook settings
{
  "cors": {
    "origin": ["https://yourdomain.com", "https://www.yourdomain.com"],
    "methods": ["POST"]
  }
}
```

## 📊 **Step 7: Monitoring & Analytics**

### **1. Error Handling**
```javascript
// Add error handling node
try {
  // Main workflow logic
} catch (error) {
  // Send error notification
  // Log to monitoring service
}
```

### **2. Success Metrics**
```javascript
// Track submission metrics
const metrics = {
  timestamp: new Date(),
  source: $json.source,
  budget: $json.budget,
  services: $json.services
};
// Send to analytics service
```

## 🚀 **Step 8: Deployment & Testing**

### **1. Test Workflow**
- Send test submission from your website
- Verify email delivery
- Check auto-reply functionality
- Test error scenarios

### **2. Production Deployment**
```bash
# Ensure n8n is running in production mode
# Set up SSL/HTTPS
# Configure proper authentication
# Set up monitoring/alerts
```

## 📝 **Sample Complete Workflow JSON**

```json
{
  "nodes": [
    {
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [240, 300],
      "parameters": {
        "httpMethod": "POST",
        "path": "contact-form"
      }
    },
    {
      "name": "Validate Data",
      "type": "n8n-nodes-base.code",
      "position": [440, 300],
      "parameters": {
        "jsCode": "// Add validation logic here"
      }
    },
    {
      "name": "Send Email to Me",
      "type": "n8n-nodes-base.gmail",
      "position": [640, 200],
      "parameters": {
        "operation": "send",
        "to": "eliudmichira7@gmail.com",
        "subject": "New Portfolio Contact: {{$json.name}}",
        "emailType": "html",
        "message": "<!-- Email template here -->"
      }
    },
    {
      "name": "Send Auto-Reply",
      "type": "n8n-nodes-base.gmail",
      "position": [640, 400],
      "parameters": {
        "operation": "send",
        "to": "{{$json.email}}",
        "subject": "Thank you for contacting Eliud Michira",
        "emailType": "html",
        "message": "<!-- Auto-reply template here -->"
      }
    }
  ],
  "connections": {
    "Webhook": {
      "main": [["Validate Data"]]
    },
    "Validate Data": {
      "main": [["Send Email to Me", "Send Auto-Reply"]]
    }
  }
}
```

## 🎯 **Benefits of n8n Integration**

### **✅ Advantages:**
- **Visual Workflow Builder**: Easy to modify without coding
- **Multiple Integrations**: Email, Slack, Sheets, CRM, etc.
- **Error Handling**: Built-in retry and error management
- **Self-Hosted**: Full control over your data
- **Free & Open Source**: No per-message costs
- **Scalable**: Handle thousands of submissions

### **📊 Features You Get:**
- ✅ Instant email notifications
- ✅ Auto-reply to clients
- ✅ Spam filtering
- ✅ Data logging to Google Sheets
- ✅ Slack/Discord notifications
- ✅ Lead scoring and routing
- ✅ CRM integration
- ✅ Analytics and reporting

## 🔧 **Quick Start Commands**

```bash
# 1. Install n8n
npm install n8n -g

# 2. Start n8n
n8n start

# 3. Open browser to http://localhost:5678

# 4. Import the workflow JSON above

# 5. Configure your email credentials

# 6. Update the webhook URL in your React app

# 7. Test and deploy!
```

## 🎉 **Result**

Your contact form will now:
1. **Instantly notify you** via email with all submission details
2. **Auto-reply to clients** with a professional message
3. **Log all submissions** for tracking and analytics
4. **Filter spam** automatically
5. **Integrate with other tools** as needed

**Your "Send Message" button is now fully functional with enterprise-grade automation!** 🚀 