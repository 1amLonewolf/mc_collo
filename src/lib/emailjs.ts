/**
 * EmailJS Configuration
 *
 * This setup uses TWO email templates:
 * 1. NOTIFICATION TEMPLATE - Sent to MC COLLO when someone submits the form
 * 2. CONFIRMATION TEMPLATE - Sent to the person who submitted the form
 *
 * SETUP STEPS:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Create a new Email Service (connect client's email - Gmail, Outlook, etc.)
 * 3. Create TWO Email Templates in the EmailJS dashboard:
 *
 *    Template 1 (Notification to MC COLLO):
 *    - Use variables: {{from_name}}, {{from_email}}, {{phone}}, {{event_type}},
 *      {{event_date}}, {{guest_count}}, {{venue}}, {{message}}, {{to_email}}
 *    - Set "To Email" to: {{to_email}} (which will be mccollo48@gmail.com)
 *
 *    Template 2 (Confirmation to Submitter):
 *    - Use variables: {{from_name}}, {{from_email}}, {{event_type}}, {{event_date}},
 *      {{guest_count}}, {{venue}}, {{message}}, {{confirmation_title}},
 *      {{reply_to_email}}, {{reply_to_phone}}
 *    - Set "To Email" to: {{from_email}} (the submitter's email)
 *
 * 4. Get your Service ID, both Template IDs, and Public Key from the dashboard
 * 5. Create a .env.local file with these values (see .env.local.example)
 *
 * Environment Variables:
 * NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
 * NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID=your_notification_template_id
 * NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID=your_confirmation_template_id
 * NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
 */

export const EMAILJS_CONFIG = {
  // Replace with your actual EmailJS credentials
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  notificationTemplateId: process.env.NEXT_PUBLIC_EMAILJS_NOTIFICATION_TEMPLATE_ID || 'YOUR_NOTIFICATION_TEMPLATE_ID',
  confirmationTemplateId: process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID || 'YOUR_CONFIRMATION_TEMPLATE_ID',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

/**
 * Check if EmailJS is properly configured
 */
export const isEmailJSConfigured = (): boolean => {
  return (
    EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY' &&
    EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
    EMAILJS_CONFIG.notificationTemplateId !== 'YOUR_NOTIFICATION_TEMPLATE_ID' &&
    EMAILJS_CONFIG.confirmationTemplateId !== 'YOUR_CONFIRMATION_TEMPLATE_ID'
  );
};
