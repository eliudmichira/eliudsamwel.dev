# 🔧 n8n Node Configuration Guide

## 📋 Complete Workflow Setup

This guide will walk you through setting up each node in your contact form automation workflow.

---

## 🎯 **Step 1: Webhook Node (Already Configured)**

✅ **Status**: Ready to use
- **HTTP Method**: `POST`
- **Path**: `contact-form`
- **URL**: `https://michmichira.app.n8n.cloud/webhook/contact-form`
- **Authentication**: None (for now)

---

## 🔍 **Step 2: Validate & Process Data Node**

### **Node Type**: Code Node
### **Purpose**: Data validation, spam filtering, and metadata addition

### **Configuration**:
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

## 📧 **Step 3: Gmail Node - Send Email to You**

### **Node Type**: Gmail Node
### **Purpose**: Send detailed notification email to your inbox

### **Setup Instructions**:

1. **Authentication**:
   - Click "Add Credential"
   - Select "Gmail OAuth2 API"
   - Follow Google OAuth flow
   - Grant necessary permissions

2. **Node Configuration**:
   - **Operation**: `Send`
   - **To**: `eliudmichira7@gmail.com`
   - **Subject**: `🚨 New Portfolio Contact: {{$json.name}}`
   - **Email Type**: `HTML`
   - **Message**: Use the HTML template from the workflow file

3. **HTML Template Features**:
   - Professional styling with gradient header
   - All form fields displayed clearly
   - Spam warning if detected
   - Direct reply button
   - Metadata and timestamps

---

## 📧 **Step 4: Gmail Node - Auto-Reply to Client**

### **Node Type**: Gmail Node
### **Purpose**: Send professional auto-reply to the person who submitted the form

### **Setup Instructions**:

1. **Use same Gmail credentials** as Step 3

2. **Node Configuration**:
   - **Operation**: `Send`
   - **To**: `{{$json.email}}`
   - **Subject**: `Thank you for contacting Eliud Michira! 🚀`
   - **Email Type**: `HTML`
   - **Message**: Use the auto-reply HTML template

3. **Auto-Reply Features**:
   - Professional thank you message
   - Clear next steps
   - Your contact information
   - Response time expectations
   - Mobile-friendly design

---

## 📱 **Step 5: Telegram Notification Node**

### **Node Type**: Telegram Node
### **Purpose**: Send instant notification to your Telegram

### **Setup Instructions**:

1. **Get Telegram Bot Token**:
   - Message @BotFather on Telegram
   - Create new bot: `/newbot`
   - Save the bot token

2. **Get Your Chat ID**:
   - Message your bot
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your `chat_id` in the response

3. **Node Configuration**:
   - **Authentication**: Add Telegram Bot Token
   - **Chat ID**: `YOUR_CHAT_ID` (replace with actual ID)
   - **Text**: Use the markdown template from workflow
   - **Parse Mode**: `Markdown`

4. **Message Template Features**:
   - All form data in organized format
   - Direct email reply link
   - Spam warning if detected
   - Clean markdown formatting

---

## 📊 **Step 6: Google Sheets Node**

### **Node Type**: Google Sheets Node
### **Purpose**: Log all submissions for tracking and analytics

### **Setup Instructions**:

1. **Create Google Sheet**:
   - Create new Google Sheet
   - Add headers: `Timestamp | Name | Email | Company | Budget | Services | Timeline | Message | Is Spam`
   - Copy the Sheet ID from URL

2. **Authentication**:
   - Click "Add Credential"
   - Select "Google Sheets OAuth2 API"
   - Follow Google OAuth flow
   - Grant necessary permissions

3. **Node Configuration**:
   - **Operation**: `Append`
   - **Document ID**: `YOUR_SHEET_ID` (replace with actual ID)
   - **Range**: `A:I`
   - **Values**: Use the expression from workflow

4. **Data Structure**:
   ```javascript
   [
     $json.timestamp,
     $json.name,
     $json.email,
     $json.company || '',
     $json.budget || '',
     $json.services || '',
     $json.timeline || '',
     $json.message,
     $json.isSpam ? 'Yes' : 'No'
   ]
   ```

---

## ⚡ **Step 7: Webhook Response Node**

### **Node Type**: Respond to Webhook Node
### **Purpose**: Send success response back to the form

### **Configuration**:
- **Respond With**: `JSON`
- **Response Body**:
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you within 2-4 hours.",
  "timestamp": "{{new Date().toISOString()}}",
  "submissionId": "{{$json.processedAt}}"
}
```

---

## 🔗 **Step 8: Connect the Nodes**

### **Connection Flow**:
```
Webhook → Validate Data → [Send Email to Me, Send Auto-Reply, Telegram] → Log to Sheets → Response
```

### **Parallel Processing**:
- Email to you, auto-reply, and Telegram notification run in parallel
- All three connect to Google Sheets logging
- Sheets logging connects to webhook response

---

## 🧪 **Step 9: Testing**

### **Test with curl**:
```bash
curl -X POST https://michmichira.app.n8n.cloud/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "company": "Test Company",
    "budget": "$5,000 - $10,000",
    "services": "Web Development",
    "timeline": "1-2 months",
    "message": "This is a test message from the portfolio form",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "source": "Portfolio Website"
  }'
```

### **Expected Results**:
1. ✅ Email received in your inbox
2. ✅ Auto-reply sent to test email
3. ✅ Telegram notification received
4. ✅ Row added to Google Sheets
5. ✅ Success response returned

---

## 🛡️ **Security Considerations**

### **Optional Enhancements**:
1. **Add Authentication** to webhook
2. **Rate Limiting** to prevent spam
3. **IP Whitelisting** for production
4. **Data Encryption** for sensitive fields

### **Current Security**:
- ✅ Input validation
- ✅ Spam filtering
- ✅ Error handling
- ✅ Secure OAuth flows

---

## 🚀 **Deployment Checklist**

- [ ] Webhook node configured
- [ ] Gmail credentials added
- [ ] Telegram bot created and configured
- [ ] Google Sheets created and configured
- [ ] All nodes connected properly
- [ ] Test submission successful
- [ ] Frontend URL updated
- [ ] Workflow activated

---

## 📞 **Support**

If you encounter any issues:
1. Check n8n execution logs
2. Verify all credentials are correct
3. Test each node individually
4. Ensure proper data flow between nodes

**Your contact form automation is now ready to handle real submissions!** 🎉 