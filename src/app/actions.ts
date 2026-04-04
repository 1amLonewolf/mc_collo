'use server';

import { z } from 'zod';

// Form validation schema
const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required').max(50),
  eventType: z.string().min(1, 'Please select an event type'),
  eventDate: z.string().min(1, 'Event date is required'),
  guestCount: z.string().optional(),
  venue: z.string().max(300).optional(),
  message: z.string().min(20, 'Please provide more details (at least 20 characters)').max(2000),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export interface FormSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Server Action to handle contact form submission
 * Validates input and processes the form
 * 
 * @param prevState - Previous form state
 * @param formData - Form data from the client
 * @returns Submission result
 */
export async function submitContactForm(
  prevState: FormSubmissionResult | null,
  formData: FormData
): Promise<FormSubmissionResult> {
  // Extract and validate form data
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

  // Validate with Zod
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
    // Try to send email via EmailJS or your preferred email service
    // For now, we'll log to console (replace with your actual email sending logic)
    console.log('📧 New contact form submission:', {
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

    // TODO: Integrate with your email service here
    // Options:
    // 1. Use EmailJS server-side SDK
    // 2. Use Nodemailer with SMTP
    // 3. Use Resend API (https://resend.com)
    // 4. Use SendGrid, AWS SES, etc.

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
