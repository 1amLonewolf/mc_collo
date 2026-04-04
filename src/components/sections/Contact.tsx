'use client';

import { useState, FormEvent, useTransition } from 'react';
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
import { submitContactForm, FormSubmissionResult } from '@/app/actions';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs';
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

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  venue: string;
  message: string;
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
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState<FormSubmissionResult | null>(null);
  const [useServerAction, setUseServerAction] = useState(true);

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

  const handleSubmitWithServerAction = async () => {
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    const result = await submitContactForm(null, formDataObj);

    if (result.success) {
      setSubmitStatus(result);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        venue: '',
        message: '',
      });
      setErrors({});
    } else {
      if (result.errors) {
        const clientErrors: FormErrors = {};
        Object.entries(result.errors).forEach(([key, messages]) => {
          clientErrors[key] = messages[0];
        });
        setErrors(clientErrors);
      } else {
        setSubmitStatus(result);
      }
    }
  };

  const handleSubmitWithEmailJS = async () => {
    try {
      if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            event_type: formData.eventType,
            event_date: formData.eventDate,
            guest_count: formData.guestCount,
            venue: formData.venue,
            message: formData.message,
          },
          EMAILJS_CONFIG.publicKey
        );
      } else {
        console.log('Form submitted (demo mode):', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
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
      });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again or email me directly.',
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitStatus(null);

    if (useServerAction) {
      startTransition(async () => {
        await handleSubmitWithServerAction();
      });
    } else {
      handleSubmitWithEmailJS();
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

  const toggleSubmissionMethod = () => {
    setUseServerAction(prev => !prev);
    setSubmitStatus(null);
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
                value="hello@mccollo.com"
                href="mailto:hello@mccollo.com"
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
              {/* Success Message */}
              {submitStatus?.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-green-400 font-medium text-sm sm:text-base">Message sent successfully!</p>
                    <p className="text-green-400/70 text-xs sm:text-sm">{submitStatus.message}</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus && !submitStatus.success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-red-400 font-medium text-sm sm:text-base">Something went wrong</p>
                    <p className="text-red-400/70 text-xs sm:text-sm">{submitStatus.message}</p>
                  </div>
                </motion.div>
              )}

              {/* Submission Method Toggle */}
              <div className="mb-4 sm:mb-6 flex items-center justify-between">
                <p className="text-dark-400 text-xs sm:text-sm">
                  Using: <span className="text-white font-medium">{useServerAction ? 'Server Action (Recommended)' : 'EmailJS (Fallback)'}</span>
                </p>
                <button
                  type="button"
                  onClick={toggleSubmissionMethod}
                  className="text-xs text-primary-400 hover:text-primary-300 transition-colors underline"
                >
                  Switch method
                </button>
              </div>

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
                    disabled={isPending}
                  />
                  <Input
                    label="Email Address *"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled={isPending}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    label="Phone Number *"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    disabled={isPending}
                  />
                  <Select
                    label="Event Type *"
                    name="eventType"
                    options={eventTypes}
                    value={formData.eventType}
                    onChange={handleChange}
                    error={errors.eventType}
                    disabled={isPending}
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
                    disabled={isPending}
                  />
                  <Select
                    label="Guest Count"
                    name="guestCount"
                    options={guestCounts}
                    value={formData.guestCount}
                    onChange={handleChange}
                    disabled={isPending}
                  />
                </div>

                <Input
                  label="Venue / Location"
                  name="venue"
                  type="text"
                  placeholder="Event venue or city"
                  value={formData.venue}
                  onChange={handleChange}
                  disabled={isPending}
                />

                <Textarea
                  label="Tell Me About Your Event *"
                  name="message"
                  placeholder="Share details about your vision, special requirements, or any questions you have..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  disabled={isPending}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
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
