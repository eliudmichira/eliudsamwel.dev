# 🤖 Telegram Bot Setup Guide - FREE Notifications

## 🎯 Overview

This guide will help you set up a **completely FREE** Telegram bot to receive automatic notifications when someone submits your contact form.

**Benefits:**
- ✅ 100% FREE (no limits!)
- ✅ Instant notifications
- ✅ Works on mobile and desktop
- ✅ No API approval needed
- ✅ Easy setup (5 minutes)

---

## 📱 Step-by-Step Setup

### **Step 1: Create Your Telegram Bot**

1. **Open Telegram** (mobile app or web: https://web.telegram.org)

2. **Search for @BotFather** in Telegram

3. **Start a chat** with BotFather and send:
   ```
   /newbot
   ```

4. **Follow the prompts:**
   - BotFather will ask: "Alright, a new bot. How are we going to call it? Please choose a name for your bot."
   - **Reply with:** `Eliud Portfolio Bot` (or any name you like)
   
   - BotFather will ask: "Good. Now let's choose a username for your bot. It must end in `bot`."
   - **Reply with:** `eliud_portfolio_bot` (must be unique, try variations if taken)

5. **Copy the Bot Token**
   - BotFather will send you a message like:
     ```
     Done! Congratulations on your new bot. You will find it at t.me/eliud_portfolio_bot. Use this token to access the HTTP API:
     
     1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
     ```
   - **⚠️ IMPORTANT:** Copy this token! You'll need it in Step 3.

### **Step 2: Get Your Chat ID**

1. **Start a chat with your new bot**
   - Search for your bot username (e.g., `@eliud_portfolio_bot`)
   - Click "Start" to begin chatting

2. **Send any message** to your bot (e.g., "Hello")

3. **Get your Chat ID:**
   - Visit this URL in your browser (replace `YOUR_BOT_TOKEN` with the token from Step 1):
     ```
     https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
     ```
   - Example:
     ```
     https://api.telegram.org/bot1234567890:ABCdefGHIjklMNOpqrsTUVwxyz/getUpdates
     ```

4. **Find your Chat ID:**
   - You'll see JSON response like:
     ```json
     {
       "ok": true,
       "result": [
         {
           "update_id": 123456789,
           "message": {
             "message_id": 1,
             "from": {
               "id": 987654321,  ← This is your Chat ID!
               "first_name": "Eliud",
               "username": "eliudmichira"
             },
             "chat": {
               "id": 987654321,  ← Or this one!
               "first_name": "Eliud",
               "type": "private"
             },
             "date": 1234567890,
             "text": "Hello"
           }
         }
       ]
     }
     ```
   - **Copy the `id` number** from `"from"` or `"chat"` (they're usually the same)
   - This is your **Chat ID** (e.g., `987654321`)

### **Step 3: Configure Your Portfolio**

#### **Option A: Using Environment Variables (Recommended for Production)**

1. **Create `.env` file** in your project root:
   ```env
   VITE_TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   VITE_TELEGRAM_CHAT_ID=987654321
   ```

2. **Add to `.gitignore`** (if not already):
   ```
   .env
   .env.local
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

#### **Option B: Direct Configuration (Quick Test)**

1. **Edit `utils/telegramBot.ts`:**
   ```typescript
   const TELEGRAM_BOT_TOKEN = '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz';
   const TELEGRAM_CHAT_ID = '987654321';
   ```

   ⚠️ **Note:** Don't commit this file with real tokens! Use environment variables for production.

### **Step 4: Test Your Setup**

1. **Submit a test message** on your contact form
2. **Check Telegram** - you should receive a notification!
3. **If it works:** 🎉 You're all set!
4. **If it doesn't:** Check the troubleshooting section below

---

## 🔧 Troubleshooting

### **Problem: No notifications received**

**Solutions:**
1. ✅ Verify bot token is correct (no extra spaces)
2. ✅ Verify chat ID is correct (must be a number)
3. ✅ Make sure you sent a message to your bot first
4. ✅ Check browser console for errors
5. ✅ Verify environment variables are loaded (check `import.meta.env.VITE_TELEGRAM_BOT_TOKEN`)

### **Problem: "Unauthorized" error**

**Solution:**
- Your bot token is incorrect or expired
- Create a new bot and get a fresh token

### **Problem: "Chat not found" error**

**Solution:**
- Your chat ID is incorrect
- Make sure you sent a message to your bot first
- Get chat ID again using the `/getUpdates` endpoint

### **Problem: Environment variables not working**

**Solutions:**
1. Make sure `.env` file is in project root
2. Variables must start with `VITE_` for Vite
3. Restart dev server after adding variables
4. Check `.env` file has no quotes around values

---

## 🔒 Security Best Practices

### **For Production:**

1. **Never commit tokens to Git**
   - Add `.env` to `.gitignore`
   - Use environment variables only

2. **Use Firebase Environment Config** (Alternative)
   - Store tokens in Firebase Functions config
   - Access via server-side code only

3. **Rotate tokens if exposed**
   - If token is accidentally committed, create new bot
   - Update token immediately

---

## 📊 How It Works

1. **User submits contact form** → Form data is collected
2. **Data saved to Firestore** → Stored in database
3. **Telegram notification sent** → Message sent to your Telegram
4. **You receive instant notification** → See message on Telegram app

**Message Format:**
```
🎯 New Contact Form Submission

Name: John Doe
Email: john@example.com
Company: Example Corp
Budget: $5,000 - $10,000
Timeline: 2-3 Months
Services: web-development, ui-ux-design

Message:
I need a new website...

📅 12/20/2024, 10:30:00 AM
```

---

## 🎨 Customization

### **Change Message Format**

Edit `utils/telegramBot.ts` → `formatTelegramMessage()` function:

```typescript
const formatTelegramMessage = (data: TelegramMessage): string => {
  // Customize your message format here
  const emoji = '🎯'; // Change emoji
  const header = `${emoji} *New Contact Form Submission*\n\n`;
  // ... rest of formatting
};
```

### **Add More Fields**

1. Update `TelegramMessage` interface
2. Update `formatTelegramMessage()` function
3. Update contact form submission

---

## ✅ Verification Checklist

- [ ] Bot created with BotFather
- [ ] Bot token copied
- [ ] Chat ID obtained
- [ ] Environment variables set (or direct config)
- [ ] Test message sent successfully
- [ ] Notification received on Telegram
- [ ] `.env` added to `.gitignore`

---

## 🚀 Next Steps

Once Telegram is working:

1. ✅ **Set up Firestore** (see `CONTACT_FORM_SETUP_GUIDE.md`)
2. ✅ **Access admin dashboard** at `#admin` or `#contact-admin`
3. ✅ **Customize notification format** (optional)
4. ✅ **Add more notification channels** (optional)

---

## 💡 Pro Tips

1. **Pin Important Messages**
   - Pin your bot's messages in Telegram for quick access

2. **Create Telegram Group**
   - Add bot to a group for team notifications
   - Use group chat ID instead of personal chat ID

3. **Add Reply Functionality**
   - Use Telegram Bot API to reply directly from Telegram
   - Requires more setup but very powerful

4. **Multiple Bots**
   - Create separate bots for different purposes
   - Different notification types, different bots

---

## 📞 Support

**Telegram Bot API Docs:** https://core.telegram.org/bots/api

**Common Commands:**
- `/newbot` - Create new bot
- `/token` - Get bot token
- `/setdescription` - Set bot description
- `/setabouttext` - Set about text

---

## 🎉 Summary

You now have **FREE, unlimited Telegram notifications** for your contact form!

**Total Cost: $0/month** 🎊
**Setup Time: ~5 minutes**
**Maintenance: Zero**

Enjoy instant notifications! 🚀

---

*Last Updated: December 2024*

