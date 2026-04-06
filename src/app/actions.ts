'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/security';

// Form validation schema
const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Please enter a valid email'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (val) => /^(\+254|0)[17]\d{8}$/.test(val.replace(/\s/g, '')),
      { message: 'Please enter a valid Kenyan phone number (e.g., +254 700 000 000)' }
    ),
  eventType: z.string().min(1, 'Please select an event type'),
  eventDate: z.string().min(1, 'Event date is required'),
  guestCount: z.string().optional(),
  venue: z.string().max(300).optional(),
  message: z.string().min(20, 'Please provide more details (at least 20 characters)').max(2000),
});

// Honeypot field name (must match the client-side hidden field)
const HONEYPOT_FIELD = 'website';

// Minimum time (in ms) a user should take to fill the form
// Bots submit instantly; humans take at least 3-5 seconds
const MIN_SUBMIT_TIME_MS = 3000;

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  eventType?: string;
}

/**
 * Server Action to handle contact form submission
 * Includes: Zod validation, honeypot check, time validation, rate limiting
 */
export async function submitContactForm(
  prevState: FormSubmissionResult | null,
  formData: FormData
): Promise<FormSubmissionResult> {
  // ─────────────────────────────────────────────────────────────
  // 🔒 SECURITY CHECK 1: Honeypot (Bot Detection)
  // Humans won't see or fill this field. Bots will fill everything.
  // ─────────────────────────────────────────────────────────────
  const honeypotValue = formData.get(HONEYPOT_FIELD);
  if (honeypotValue && honeypotValue.toString().trim() !== '') {
    console.warn('🤖 Bot submission detected (honeypot filled). Ignoring.');
    // Return success to confuse the bot, but don't actually send the email
    return {
      success: true,
      message: 'Message received.',
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 🔒 SECURITY CHECK 2: Time-based Validation
  // Bots submit instantly. Humans take time to read and fill forms.
  // ─────────────────────────────────────────────────────────────
  const formLoadTime = formData.get('_formLoadTime') as string;
  if (formLoadTime) {
    const loadTime = parseInt(formLoadTime, 10);
    const submitTime = Date.now();
    const timeTaken = submitTime - loadTime;

    if (timeTaken < MIN_SUBMIT_TIME_MS) {
      console.warn(`⚡ Submission too fast (${timeTaken}ms). Likely a bot. Ignoring.`);
      return {
        success: true,
        message: 'Message received.',
      };
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 🔒 SECURITY CHECK 3: Rate Limiting
  // Limit submissions to prevent spam and brute force attacks.
  // ─────────────────────────────────────────────────────────────
  const headersList = await headers();
  const clientIP = headersList.get('x-forwarded-for') || 
                   headersList.get('x-real-ip') || 
                   'unknown';
  
  const rateLimitResult = checkRateLimit(clientIP);
  
  if (rateLimitResult.limited) {
    console.warn(`🚫 Rate limit exceeded for IP: ${clientIP}`);
    return {
      success: false,
      message: 'Too many submissions. Please wait before submitting again.',
    };
  }

  // ─────────────────────────────────────────────────────────────
  // ✅ Extract and validate form data with Zod
  // ─────────────────────────────────────────────────────────────
  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    eventType: formData.get('eventType') as string,
    eventDate: formData.get('eventDate') as string,
    guestCount: formData.get('guestCount') as string,
    venue: formData.get('venue') as string,
    message: formData.get('message') as string,
  };

  const validationResult = ContactFormSchema.safeParse(rawData);

  if (!validationResult.success) {
    const fieldErrors = validationResult.error.flatten().fieldErrors;
    const errorMessages: Record<string, string[]> = {};

    Object.entries(fieldErrors).forEach(([field, errors]) => {
      if (errors) {
        errorMessages[field] = errors;
      }
    });

    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: errorMessages,
    };
  }

  const validatedData = validationResult.data;

  try {
    // Log the validated submission
    console.log('✅ New contact form submission:', {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      eventType: validatedData.eventType,
      eventDate: validatedData.eventDate,
      guestCount: validatedData.guestCount,
      venue: validatedData.venue,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Your message has been sent successfully! I\'ll get back to you soon.',
    };
  } catch (error) {
    console.error('Error processing contact form:', error);

    return {
      success: false,
      message: 'Failed to send message. Please try again or email me directly.',
    };
  }
}
