# 📋 Pre-Launch Checklist

## ⚠️ CRITICAL: EmailJS Setup Required

**Status:** ⏳ Pending - Need client's email credentials

### What Needs To Be Done:

1. **Get Client's Email Access**
   - Ask client for email account credentials (Gmail/Outlook/etc.)
   - OR have them create an EmailJS account themselves

2. **Set Up EmailJS**
   - Go to: https://www.emailjs.com/
   - Create account (if not already done)
   - Add Email Service (connect client's email)
   - Create Email Template (use template below)
   - Get these 3 values:
     - ✅ **Service ID** (e.g., `service_abc123`)
     - ✅ **Template ID** (e.g., `template_xyz789`)
     - ✅ **Public Key** (e.g., `user_def456`)

3. **Create `.env.local` File**
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

4. **Test Contact Form**
   - Run `npm run dev`
   - Fill out contact form
   - Verify email is received by client
   - Check for errors in browser console

---

## ✅ COMPLETED

- [x] **SEO** — robots.txt, sitemap.xml added
- [x] **Metadata** — Updated with domain (mccollo.com), Twitter cards, extended keywords
- [x] **Unused imports** — Cleaned up
- [x] **All real images** — 18 compressed, optimized photos
- [x] **Social links** — Facebook, WhatsApp, TikTok (live links)
- [x] **Phone number** — +254 721 488 132 updated everywhere
- [x] **Portfolio** — 9 real event flashcards with correct details
- [x] **Testimonials** — 5 entries with privacy-safe initials
- [x] **404 page** — Custom with thinking image + quippy messages
- [x] **Testing** — Jest + RTL (25 tests passing)
- [x] **CI/CD** — GitHub Actions workflow
- [x] **Error Boundary** — Global error catching
- [x] **Analytics** — Vercel Analytics integrated
- [x] **Sharp** — Image optimization installed
- [x] **Social Community section** — Added before footer

---

## 📧 Email Template to Use

**Subject:**
```
🎤 New Event Inquiry from {{from_name}}
```

**Content:**
```
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
This inquiry was submitted via MC COLLO website.
```

---

## 🚀 Deployment Checklist

### Before Going Live:

- [ ] **EmailJS configured** (see above)
- [ ] **Test contact form** in production
- [ ] **Update social media links** if any changed
  - ✅ Facebook: `https://www.facebook.com/share/1X5LJYFxY6/`
  - ✅ TikTok: `https://www.tiktok.com/@mccollohyperman`
  - ✅ WhatsApp: `+254 721 488 132`
- [ ] **Verify all images load correctly**
- [ ] **Test on mobile devices**
- [ ] **Test 404 page** (visit random URL)
- [ ] **Check analytics** in Vercel dashboard
- [ ] **Update meta tags** if needed (SEO)
- [ ] **Custom domain** configured (if applicable)

---

## 📞 Client Handoff Notes

### What to Give Client:
1. ✅ All source code
2. ✅ Deployment access (Vercel/GitHub)
3. ✅ EmailJS account access (or guide them to create)
4. ✅ Social media links are live
5. ✅ Contact number: `+254 721 488 132`
6. ✅ This checklist for future reference

---

**Last Updated:** April 3, 2026  
**Project:** MC COLLO Landing Page  
**Status:** Ready for deployment (pending EmailJS setup)
