'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { FormSubmissionResult } from '@/app/actions';
import { isValidEmail } from '@/lib/utils';

const eventTypes = [
  { value: '', label: 'Select Event Type' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'gala', label: 'Gala / Award Ceremony' },
  { value: 'conference', label: 'Conference / Seminar' },
  { value: 'private', label: 'Private Celebration' },
  { value: 'community', label: 'Community Event' },
  { value: 'other', label: 'Other' },
];

const guestCounts = [
  { value: '', label: 'Expected Guest Count' },
  { value: '1-50', label: '1-50 guests' },
  { value: '51-100', label: '51-100 guests' },
  { value: '101-250', label: '101-250 guests' },
  { value: '251-500', label: '251-500 guests' },
  { value: '500+', label: '500+ guests' },
];

const confirmationMessages: Record<string, { title: string; message: string }> = {
  wedding: {
    title: '🎉 Wedding Inquiry Received!',
    message: 'Thank you for reaching out! I specialize in creating unforgettable wedding experiences. I\'ll review your details and get back to you within 24 hours to discuss your special day.',
  },
  corporate: {
    title: '💼 Corporate Event Inquiry Received!',
    message: 'Thanks for considering MC COLLO for your corporate event! I\'ll review your requirements and respond promptly to help make your event a success.',
  },
  gala: {
    title: '✨ Gala/Award Ceremony Inquiry Received!',
    message: 'Thank you for your inquiry! Galas and award ceremonies are my passion. I\'ll be in touch soon to discuss how we can create a memorable evening.',
  },
  conference: {
    title: '🎤 Conference/Seminar Inquiry Received!',
    message: 'Thanks for reaching out! I\'d be honored to be part of your conference. I\'ll review your details and get back to you with next steps.',
  },
  private: {
    title: '🎊 Private Celebration Inquiry Received!',
    message: 'Thank you for thinking of MC COLLO! Private celebrations are all about making memories. I\'ll contact you soon to discuss your vision.',
  },
  community: {
    title: '🤝 Community Event Inquiry Received!',
    message: 'Thanks for your inquiry! Community events are close to my heart. I\'ll review your details and respond as soon as possible.',
  },
  other: {
    title: '✅ Inquiry Received!',
    message: 'Thank you for reaching out! I\'ll review your message and get back to you soon. Looking forward to hearing more about your event!',
  },
};

const getConfirmationMessage = (eventType: string) => {
  return confirmationMessages[eventType] || confirmationMessages.other;
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  venue: string;
  message: string;
  website: string; // Honeypot field — must match API route
}

interface FormErrors {
  [key: string]: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    venue: '',
    message: '',
    website: '', // Honeypot — must remain empty
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<FormSubmissionResult | null>(null);
  const [submittedEventType, setSubmittedEventType] = useState<string>('');
  const [formLoadTime] = useState<number>(Date.now());

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+254|0)[17]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Kenyan phone number (e.g., +254 700 000 000)';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Please select an event type';
    }

    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell me about your event';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide more details (at least 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmittedEventType('');

    try {
      // Get user's IP for rate limiting (approximate, works on client)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateParams: {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            event_type: formData.eventType,
            event_date: formData.eventDate,
            guest_count: formData.guestCount,
            venue: formData.venue,
            message: formData.message,
            to_email: 'mccollo48@gmail.com',
            confirmation_title: getConfirmationMessage(formData.eventType).title,
          },
          honeypot: formData.website,
          formLoadTime: formLoadTime,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const confirmation = getConfirmationMessage(formData.eventType);
        setSubmittedEventType(formData.eventType);
        setSubmitStatus({
          success: true,
          message: confirmation.message,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guestCount: '',
          venue: '',
          message: '',
          website: '',
        });
        setErrors({});
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again or email me directly at mccollo48@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <Section id="contact" variant="alternate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Let's Create Something Amazing"
          subtitle="Ready to make your event unforgettable? Get in touch and let's discuss your vision."
        />

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-1 space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 sm:mb-4">
                Get in Touch
              </h3>
              <p className="text-dark-400 leading-relaxed text-sm sm:text-base">
                Whether you're planning a wedding, corporate event, or any special occasion,
                I'd love to hear from you. Let's discuss how I can help make your event extraordinary.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4 sm:space-y-6">
              <ContactInfoItem
                icon={Mail}
                label="Email"
                value="mccollo48@gmail.com"
                href="mailto:mccollo48@gmail.com"
              />
              <ContactInfoItem
                icon={Phone}
                label="Phone / WhatsApp"
                value="+254 721 488 132"
                href="tel:+254721488132"
              />
              <ContactInfoItem
                icon={MapPin}
                label="Location"
                value="Available Worldwide"
              />
              <ContactInfoItem
                icon={Clock}
                label="Response Time"
                value="As soon as possible"
              />
            </div>

            {/* Social Proof */}
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-dark-700">
              <div className="flex items-center mb-3 sm:mb-4">
                <Calendar className="w-5 h-5 text-primary-400 mr-2" />
                <span className="text-white font-medium text-sm sm:text-base">Booking Status</span>
              </div>
              <p className="text-white font-medium text-xs sm:text-sm mb-1">
                Currently accepting bookings.
              </p>
              <p className="text-dark-400 text-xs sm:text-sm mb-2 sm:mb-3">
                Popular dates fill quickly!
              </p>
              <div className="flex items-center text-green-400 text-xs sm:text-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>Available for inquiry</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border border-dark-700">
              {/* Success Popup Modal */}
              {submitStatus?.success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setSubmitStatus(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="relative w-full max-w-md bg-dark-800 border border-green-500/30 rounded-3xl shadow-2xl p-6 sm:p-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setSubmitStatus(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-dark-700 hover:bg-dark-600 transition-colors"
                      aria-label="Close"
                    >
                      <svg className="w-5 h-5 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Success Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                      className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
                    >
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </motion.div>

                    {/* Success Title */}
                    <h3 className="text-center text-lg sm:text-xl font-display font-bold text-green-400 mb-3">
                      {submittedEventType ? getConfirmationMessage(submittedEventType).title : 'Message Sent Successfully!'}
                    </h3>

                    {/* Success Message */}
                    <p className="text-center text-dark-400 text-sm sm:text-base leading-relaxed mb-6">
                      {submitStatus.message}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-dark-700 mb-6"></div>

                    {/* Contact Info */}
                    <div className="space-y-3 text-center">
                      <p className="text-dark-400 text-xs sm:text-sm">
                        Questions? Reach us at:
                      </p>
                      <a
                        href="mailto:mccollo48@gmail.com"
                        className="block text-primary-400 hover:text-primary-300 text-sm transition-colors"
                      >
                        📧 mccollo48@gmail.com
                      </a>
                      <a
                        href="tel:+254721488132"
                        className="block text-primary-400 hover:text-primary-300 text-sm transition-colors"
                      >
                        📱 +254 721 488 132
                      </a>
                    </div>

                    {/* Close Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSubmitStatus(null)}
                      className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                    >
                      Got it!
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Error Popup Modal */}
              {submitStatus && !submitStatus.success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setSubmitStatus(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="relative w-full max-w-md bg-dark-800 border border-red-500/30 rounded-3xl shadow-2xl p-6 sm:p-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setSubmitStatus(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-dark-700 hover:bg-dark-600 transition-colors"
                      aria-label="Close"
                    >
                      <svg className="w-5 h-5 text-dark-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Error Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                      className="mx-auto w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4"
                    >
                      <AlertCircle className="w-10 h-10 text-red-400" />
                    </motion.div>

                    {/* Error Title */}
                    <h3 className="text-center text-lg sm:text-xl font-display font-bold text-red-400 mb-3">
                      {submitStatus.message.includes('Failed to send') ? '❌ Submission Failed' : '⚠️ Error Occurred'}
                    </h3>

                    {/* Error Message */}
                    <p className="text-center text-dark-400 text-sm sm:text-base leading-relaxed mb-6">
                      {submitStatus.message}
                    </p>

                    {/* Error Type Details */}
                    {submitStatus.message.includes('network') || submitStatus.message.includes('connection') ? (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                        <p className="text-red-300 text-xs sm:text-sm font-medium mb-1">🔴 Error Type: Network/Connection Issue</p>
                        <p className="text-dark-400 text-xs">Please check your internet connection and try again.</p>
                      </div>
                    ) : submitStatus.message.includes('invalid') || submitStatus.message.includes('required') ? (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                        <p className="text-red-300 text-xs sm:text-sm font-medium mb-1">🔴 Error Type: Invalid Form Data</p>
                        <p className="text-dark-400 text-xs">Please review the fields below and ensure all required information is filled out correctly.</p>
                      </div>
                    ) : (
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
                        <p className="text-yellow-300 text-xs sm:text-sm font-medium mb-1">🟡 Error Type: Server/Processing Error</p>
                        <p className="text-dark-400 text-xs">Something went wrong on our end. Please try again or contact us directly.</p>
                      </div>
                    )}

                    {/* Direct Contact Info */}
                    <div className="space-y-3 text-center mb-6">
                      <p className="text-dark-400 text-xs sm:text-sm">
                        Need immediate help? Contact us directly:
                      </p>
                      <a
                        href="mailto:mccollo48@gmail.com"
                        className="block text-primary-400 hover:text-primary-300 text-sm transition-colors"
                      >
                        📧 mccollo48@gmail.com
                      </a>
                      <a
                        href="tel:+254721488132"
                        className="block text-primary-400 hover:text-primary-300 text-sm transition-colors"
                      >
                        📱 +254 721 488 132
                      </a>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSubmitStatus(null)}
                        className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                      >
                        Try Again
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSubmitStatus(null)}
                        className="w-full bg-dark-700 hover:bg-dark-600 text-dark-200 font-medium py-3 px-4 rounded-xl transition-colors"
                      >
                        Dismiss
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    label="Your Name *"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    disabled={isSubmitting}
                  />
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    label="Phone Number / WhatsApp *"
                    name="phone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    disabled={isSubmitting}
                  />
                  <Select
                    label="Event Type *"
                    name="eventType"
                    options={eventTypes}
                    value={formData.eventType}
                    onChange={handleChange}
                    error={errors.eventType}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    label="Event Date *"
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    error={errors.eventDate}
                    min={new Date().toISOString().split('T')[0]}
                    disabled={isSubmitting}
                  />
                  <Select
                    label="Guest Count"
                    name="guestCount"
                    options={guestCounts}
                    value={formData.guestCount}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                <Input
                  label="Venue / Location"
                  name="venue"
                  type="text"
                  placeholder="Event venue or city"
                  value={formData.venue}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />

                <Textarea
                  label="Tell Me About Your Event *"
                  name="message"
                  placeholder="Share details about your vision, special requirements, or any questions you have..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  disabled={isSubmitting}
                />

                {/* 🔒 SECURITY: Honeypot field — hidden from humans, bots will fill it */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                {/* 🔒 SECURITY: Form load time — used to detect instant bot submissions */}
                <input
                  type="hidden"
                  name="_formLoadTime"
                  value={formLoadTime}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Inquiry
                    </>
                  )}
                </Button>

                <p className="text-dark-500 text-xs sm:text-sm text-center">
                  By submitting, you agree to receive a response via email or phone.
                  Your information is kept confidential.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

interface ContactInfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

function ContactInfoItem({ icon: Icon, label, value, href }: ContactInfoItemProps) {
  const content = (
    <div className="flex items-start group">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/20 group-hover:border-primary-500/50 transition-colors">
        <Icon className="w-5 h-5 text-primary-400" />
      </div>
      <div className="ml-4">
        <p className="text-dark-400 text-sm">{label}</p>
        <p className={`text-white font-medium ${href ? 'group-hover:text-primary-400' : ''} transition-colors`}>
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
