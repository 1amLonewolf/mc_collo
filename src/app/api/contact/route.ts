import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/security';
import { EMAILJS_CONFIG, isEmailJSConfigured } from '@/lib/emailjs';

// Honeypot field name (must match client-side)
const HONEYPOT_FIELD = 'website';

// Minimum time (ms) a user should take to fill the form
const MIN_SUBMIT_TIME_MS = 3000;

// EmailJS server-side endpoint
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { templateParams, honeypot, formLoadTime, clientIP } = body;

    // ─────────────────────────────────────────────────────────────
    // 🔒 SECURITY CHECK 1: Honeypot (Bot Detection)
    // ─────────────────────────────────────────────────────────────
    if (honeypot && honeypot.toString().trim() !== '') {
      console.warn('🤖 Bot submission detected (honeypot filled). Ignoring.');
      return NextResponse.json({ success: true, message: 'Message received.' }, { status: 200 });
    }

    // ─────────────────────────────────────────────────────────────
    // 🔒 SECURITY CHECK 2: Time-based Validation
    // ─────────────────────────────────────────────────────────────
    if (formLoadTime) {
      const loadTime = parseInt(formLoadTime, 10);
      const submitTime = Date.now();
      const timeTaken = submitTime - loadTime;

      if (timeTaken < MIN_SUBMIT_TIME_MS) {
        console.warn(`⚡ Submission too fast (${timeTaken}ms). Likely a bot. Ignoring.`);
        return NextResponse.json({ success: true, message: 'Message received.' }, { status: 200 });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 🔒 SECURITY CHECK 3: Rate Limiting
    // ─────────────────────────────────────────────────────────────
    const ip = clientIP || request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitResult = checkRateLimit(ip);

    if (rateLimitResult.limited) {
      console.warn(`🚫 Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please wait before submitting again.' },
        { status: 429 }
      );
    }

    // ─────────────────────────────────────────────────────────────
    // ✅ Validate required fields
    // ─────────────────────────────────────────────────────────────
    if (!templateParams?.from_name || !templateParams?.from_email || !templateParams?.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────────────────────
    // ✅ Check EmailJS configuration
    // ─────────────────────────────────────────────────────────────
    if (!isEmailJSConfigured()) {
      console.log('📧 EmailJS not configured. Form submission (demo mode):', templateParams);
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been received (demo mode).',
      });
    }

    // ─────────────────────────────────────────────────────────────
    // 📧 Send Notification Email to MC COLLO
    // ─────────────────────────────────────────────────────────────
    const notificationResponse = await fetch(EMAILJS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.serviceId,
        template_id: EMAILJS_CONFIG.notificationTemplateId,
        user_id: EMAILJS_CONFIG.publicKey,
        template_params: templateParams,
      }),
    });

    if (!notificationResponse.ok) {
      const errorText = await notificationResponse.text();
      console.error('❌ EmailJS notification email failed:', errorText);
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again or email us directly.' },
        { status: 500 }
      );
    }

    // ─────────────────────────────────────────────────────────────
    // 📧 Send Confirmation Email to Submitter
    // ─────────────────────────────────────────────────────────────
    const confirmationParams = {
      ...templateParams,
      reply_to_email: 'mccollo48@gmail.com',
      reply_to_phone: '+254 721 488 132',
    };

    const confirmationResponse = await fetch(EMAILJS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_CONFIG.serviceId,
        template_id: EMAILJS_CONFIG.confirmationTemplateId,
        user_id: EMAILJS_CONFIG.publicKey,
        template_params: confirmationParams,
      }),
    });

    if (!confirmationResponse.ok) {
      const errorText = await confirmationResponse.text();
      console.error('❌ EmailJS confirmation email failed:', errorText);
      // Notification was sent, so still return success
    }

    console.log('✅ Form submission processed successfully:', {
      name: templateParams.from_name,
      email: templateParams.from_email,
      eventType: templateParams.event_type,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! We\'ll get back to you soon.',
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again or email us directly at mccollo48@gmail.com.' },
      { status: 500 }
    );
  }
}
