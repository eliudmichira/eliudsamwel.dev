# 🔧 Fix CORS Issue with n8n Webhook

## 🚨 **Current Error:**
```
Access to fetch at 'https://michmichira.app.n8n.cloud/webhook/contact-form' from origin 'https://eliudsamwel.dev' has been blocked by CORS policy
```

## ✅ **Solution: Configure n8n CORS Settings**

### **Step 1: Update n8n Webhook Node**

In your n8n workflow, update the **Webhook node** settings:

1. **Open your n8n workflow**
2. **Select the Webhook node**
3. **Add CORS configuration:**

```json
{
  "httpMethod": "POST",
  "path": "contact-form",
  "responseMode": "responseNode",
  "options": {
    "cors": {
      "origin": [
        "https://eliudsamwel.dev",
        "https://www.eliudsamwel.dev",
        "https://eliudsamwel-dev.web.app"
      ],
      "methods": ["POST", "OPTIONS"],
      "headers": ["Content-Type", "Authorization"],
      "credentials": true
    }
  }
}
```

### **Step 2: Alternative - Use n8n Environment Variables**

If the above doesn't work, you can also configure CORS globally in your n8n instance:

1. **Go to your n8n settings**
2. **Add environment variable:**
   ```
   N8N_CORS_ORIGIN=https://eliudsamwel.dev,https://www.eliudsamwel.dev,https://eliudsamwel-dev.web.app
   ```

### **Step 3: Test the Webhook**

After updating the CORS settings, test with:

```bash
curl -X POST https://michmichira.app.n8n.cloud/webhook/contact-form \
  -H "Content-Type: application/json" \
  -H "Origin: https://eliudsamwel.dev" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

## 🔄 **Temporary Workaround**

If you can't immediately fix the n8n CORS issue, you can temporarily disable the contact form and use email fallback:

```typescript
// In ContactPage.tsx, temporarily comment out the fetch call
// and use mailto: instead
```

## 📞 **Next Steps:**

1. **Update your n8n webhook CORS settings**
2. **Test the webhook with curl**
3. **Verify the contact form works**
4. **Deploy the updated site**

The CORS issue is the main blocker preventing your contact form from working properly. 