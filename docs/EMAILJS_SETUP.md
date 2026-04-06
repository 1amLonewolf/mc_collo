# 📧 EmailJS Setup Guide for MC COLLO

## Overview

This guide walks you through setting up **EmailJS** with **TWO email templates**:
1. **Notification Email** → Sent to MC COLLO (mccollo48@gmail.com) when someone submits the form
2. **Confirmation Email** → Sent to the person who submitted the form (auto-reply)

---

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Create an account (use client's email or your own)

---

## Step 2: Add Email Service

1. In your EmailJS dashboard, click **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended - easiest setup)
   - **Outlook/Hotmail**
   - **Custom SMTP** (for business emails)
4. Follow the authentication prompts to connect the email account
5. **Copy the Service ID** (e.g., `service_abc123`)

> 💡 **Note:** This is the email account that will **send** the emails. The free plan allows 200 emails/month.

---

## Step 3: Create Template 1 - Notification to MC COLLO

This template sends form details to MC COLLO's inbox.

### Setup:
1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Choose **"Blank Template"**
4. Configure as follows:

### Template Settings:

**To Email:**
```
mccollo48@gmail.com
```
*(Or whatever email MC COLLO uses to receive inquiries)*

**Subject:**
```
🎤 New Event Inquiry from {{from_name}}
```

**Content (HTML or Plain Text):**

```html
Hello MC Collo,

You have received a new event inquiry:

👤 Name: {{from_name}}
📧 Email: {{from_email}}
📱 Phone: {{phone}}
🎉 Event Type: {{event_type}}
📅 Event Date: {{event_date}}
👥 Guest Count: {{guest_count}}
📍 Venue: {{venue}}

💬 Message:
{{message}}

---
This inquiry was submitted via the MC COLLO website.
```

5. Click **"Save"**
6. **Copy the Template ID** (e.g., `template_xyz789`)
7. Rename this template to something like: **"MC COLLO - Notification"**

---

## Step 4: Create Template 2 - Confirmation to Submitter

This template sends a personalized thank-you email to the person who filled out the form.

### Setup:
1. Click **"Email Templates"** again
2. Click **"Create New Template"**
3. Choose **"Blank Template"**
4. Configure as follows:

### Template Settings:

**To Email:**
```
{{from_email}}
```
*(This sends to the person who submitted the form)*

**Subject:**
```
✅ Thanks for Your Inquiry, {{from_name}}!
```

**Content (HTML or Plain Text):**

```html
Hi {{from_name}},

{{confirmation_title}}

Thank you for reaching out to MC COLLO! Here's a summary of your inquiry:

🎉 Event Type: {{event_type}}
📅 Event Date: {{event_date}}
👥 Expected Guests: {{guest_count}}
📍 Venue: {{venue}}

📝 Your Message:
{{message}}

---

**What Happens Next?**

MC COLLO will review your inquiry and get back to you as soon as possible via email or phone.

📧 Email: mccollo48@gmail.com
📱 Phone/WhatsApp: {{reply_to_phone}}

We're excited to help make your event unforgettable!

Warm regards,
MC COLLO Team
https://mccollo.com

---
This is an automated confirmation email. Please do not reply directly to this message.
```

5. Click **"Save"**
6. **Copy the Template ID** (e.g., `template_def456`)
7. Rename this template to: **"MC COLLO - Confirmation"**

---

## Step 5: Get Your Public Key

1. Click **"Account Settings"** (or your profile icon) in the top right
2. Go to **"General"** tab
3. Find your **Public Key** (e.g., `user_abc123def456`)
4. **Copy this value**

---

## Step 6: Update `.env.local` File

1. Open the `.env.local` file in your project root (already created)
2. Replace the placeholder values with your actual credentials:

```env
# EmailJS Configuration
# Get these values from https://www.emailjs.com/

# Service ID (from EmailJS Email Services)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123  # ← Replace with your Service ID

# Template ID for notification email (sent to MC COLLO)
NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID=template_xyz789  # ← Replace with Template 1 ID

# Template ID for confirmation email (sent to person who filled form)
NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=template_def456  # ← Replace with Template 2 ID

# Public Key (from EmailJS Account Settings)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=user_abc123def456  # ← Replace with your Public Key
```

> ⚠️ **IMPORTANT:** Never commit `.env.local` to Git! It's already in `.gitignore`.

---

## Step 7: Test the Contact Form

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact form section

3. Fill out the form with test data:
   - Use a **real email** you can access
   - Select an event type (e.g., "Wedding")
   - Fill in all required fields

4. Submit the form

5. **Verify:**
   - ✅ You see a success message with event-specific title (e.g., "🎉 Wedding Inquiry Received!")
   - ✅ MC COLLO's email receives the notification
   - ✅ The test email receives the confirmation email

6. Test with **different event types** to verify dynamic messages:
   - Wedding → "🎉 Wedding Inquiry Received!"
   - Corporate → "💼 Corporate Event Inquiry Received!"
   - Gala → "✨ Gala/Award Ceremony Inquiry Received!"
   - etc.

---

## Step 8: Transfer to Client (If Needed)

If you set this up with your email and need to transfer to the client later:

### Option A: Keep EmailJS Account, Change Email Service
1. In EmailJS dashboard → **Email Services**
2. Disconnect your email
3. Connect the client's email account
4. Templates remain the same
5. Update `.env.local` if Service ID changes

### Option B: Transfer Entire EmailJS Account
1. Give client access to the EmailJS account credentials
2. Or add them as a team member (paid plans)
3. They can update billing and settings

### Option C: Client Creates Their Own Account
1. Client creates their own EmailJS account
2. Recreate the two templates (copy-paste from this guide)
3. Update `.env.local` with their new credentials
4. Test thoroughly

---

## Troubleshooting

### Form submits but no emails received:
- ✅ Check `.env.local` has correct values (no typos)
- ✅ Verify EmailJS service is connected and authenticated
- ✅ Check EmailJS dashboard → "Email Logs" for delivery status
- ✅ Check spam/junk folder

### "EmailJS not configured" warning in console:
- ✅ Make sure `.env.local` exists (not `.env.local.example`)
- ✅ Restart your dev server after adding `.env.local`
- ✅ Verify all 4 environment variables are set

### Emails going to spam:
- ✅ Use a verified business email (not free Gmail)
- ✅ Set up SPF/DKIM records for your domain
- ✅ Upgrade to paid EmailJS plan for custom domain

### Only one email sends (not both):
- ✅ Check that BOTH template IDs are correct in `.env.local`
- ✅ Verify both templates exist in EmailJS dashboard
- ✅ Check browser console for errors

---

## Event Type Confirmation Messages

The following dynamic messages are shown based on event type selection:

| Event Type | Success Title |
|------------|---------------|
| Wedding | 🎉 Wedding Inquiry Received! |
| Corporate | 💼 Corporate Event Inquiry Received! |
| Gala/Award | ✨ Gala/Award Ceremony Inquiry Received! |
| Conference | 🎤 Conference/Seminar Inquiry Received! |
| Private | 🎊 Private Celebration Inquiry Received! |
| Community | 🤝 Community Event Inquiry Received! |
| Other | ✅ Inquiry Received! |

---

## Files Modified

- ✅ `src/lib/emailjs.ts` - Dual template support
- ✅ `src/components/sections/Contact.tsx` - Sends both emails + dynamic messages
- ✅ `src/app/actions.ts` - Added eventType to FormSubmissionResult
- ✅ `.env.local` - Created with placeholders

---

**Need Help?**
- EmailJS Docs: https://www.emailjs.com/docs/
- MC COLLO Support: mccollo48@gmail.com

---

**Last Updated:** April 6, 2026
