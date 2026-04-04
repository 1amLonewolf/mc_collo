/**
 * EmailJS Configuration
 * 
 * To set up EmailJS:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Create a new Email Service (e.g., Gmail)
 * 3. Create a new Email Template with these variables:
 *    - {{from_name}}
 *    - {{from_email}}
 *    - {{event_type}}
 *    - {{event_date}}
 *    - {{message}}
 *    - {{phone}}
 * 4. Get your Service ID, Template ID, and Public Key from the dashboard
 * 5. Replace the placeholder values below
 * 
 * Alternative: Use environment variables for production
 * Create a .env.local file with:
 * NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
 * NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
 * NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
 */

export const EMAILJS_CONFIG = {
  // Replace with your actual EmailJS credentials
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

export const initEmailJS = () => {
  // EmailJS is initialized on the client side when the component mounts
  // This function is a placeholder for any additional setup needed
  if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.warn('EmailJS not configured. Please set up your credentials.');
  }
};
