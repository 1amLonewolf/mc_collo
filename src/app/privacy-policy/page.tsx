import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | MC Collo Events',
  description: 'Privacy Policy for MC Collo Events. Learn how we collect, use, and protect your personal information.',
  metadataBase: new URL('https://mccolloevents.com'),
  alternates: {
    canonical: 'https://mccolloevents.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const lastUpdated = 'April 6, 2026';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-dark-800 bg-dark-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
          <span className="text-dark-500 text-xs sm:text-sm">Last updated: {lastUpdated}</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 mb-6">
            <Shield className="w-8 h-8 text-primary-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-dark-400 text-base sm:text-lg max-w-2xl mx-auto">
            Your privacy matters to us. Here's how we collect, use, and protect your information.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 sm:space-y-12">
          <Section title="1. Information We Collect">
            <p>When you submit an inquiry through our contact form, we collect:</p>
            <ul className="list-disc list-inside space-y-2 text-dark-300 mt-3">
              <li><strong className="text-white">Personal Information:</strong> Your name, email address, and phone number.</li>
              <li><strong className="text-white">Event Details:</strong> Event type, date, expected guest count, venue, and any message you provide.</li>
              <li><strong className="text-white">Technical Information:</strong> Your IP address (used for rate limiting and security purposes).</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information you provide solely for the purpose of:</p>
            <ul className="list-disc list-inside space-y-2 text-dark-300 mt-3">
              <li>Responding to your event inquiry via email or phone.</li>
              <li>Understanding your event requirements to provide a tailored service.</li>
              <li>Sending you a confirmation email acknowledging receipt of your inquiry.</li>
              <li>Protecting our form from spam and abuse through rate limiting and bot detection.</li>
            </ul>
          </Section>

          <Section title="3. How We Protect Your Data">
            <p>We take security seriously and implement the following measures:</p>
            <ul className="list-disc list-inside space-y-2 text-dark-300 mt-3">
              <li><strong className="text-white">Encryption:</strong> All data is transmitted over HTTPS with TLS encryption.</li>
              <li><strong className="text-white">No Data Storage:</strong> We do not store your personal information in any database. Your data is only processed in real-time to send emails.</li>
              <li><strong className="text-white">Rate Limiting:</strong> We limit form submissions to prevent spam and brute-force attacks.</li>
              <li><strong className="text-white">Bot Protection:</strong> We use honeypot fields and time-based validation to detect and block automated submissions.</li>
              <li><strong className="text-white">Content Security Policy:</strong> Our site uses strict CSP headers to prevent cross-site scripting (XSS) and other injection attacks.</li>
            </ul>
          </Section>

          <Section title="4. Third-Party Services">
            <p>We use the following third-party service to process your inquiry:</p>
            <ul className="list-disc list-inside space-y-2 text-dark-300 mt-3">
              <li><strong className="text-white">EmailJS:</strong> Used to send notification and confirmation emails. EmailJS processes your data on our behalf. Their privacy policy is available at <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">emailjs.com/legal/privacy-policy</a>.</li>
              <li><strong className="text-white">Vercel Analytics:</strong> Used to measure site performance. No personally identifiable information is collected. Learn more at <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">vercel.com/legal/privacy-policy</a>.</li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <p>
              We do not retain your personal information on our servers. Your inquiry is forwarded to our email inbox (mccollo48@gmail.com), where it is stored by Google according to their privacy policy. We recommend deleting your inquiry email after we've responded if you prefer your data not to be retained.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>Under applicable data protection laws (including Kenya's Data Protection Act, 2019), you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-dark-300 mt-3">
              <li>Request access to any personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Withdraw your consent at any time.</li>
            </ul>
            <p className="text-dark-300 mt-3">
              To exercise any of these rights, please contact us at <a href="mailto:mccollo48@gmail.com" className="text-primary-400 hover:text-primary-300 underline">mccollo48@gmail.com</a>.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Our site uses a service worker for offline caching and performance optimization. We do not use tracking cookies, advertising pixels, or any third-party analytics that collect personally identifiable information.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Our website and services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with their data, please contact us immediately and we will take steps to delete it.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>If you have any questions or concerns about this Privacy Policy, please reach out:</p>
            <div className="space-y-3 mt-4">
              <a
                href="mailto:mccollo48@gmail.com"
                className="flex items-center gap-3 text-dark-300 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-5 h-5 text-primary-400" />
                mccollo48@gmail.com
              </a>
              <a
                href="tel:+254721488132"
                className="flex items-center gap-3 text-dark-300 hover:text-primary-400 transition-colors"
              >
                <Phone className="w-5 h-5 text-primary-400" />
                +254 721 488 132
              </a>
            </div>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} MC Collo Events. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 text-sm">
            <Link href="/privacy-policy" className="text-primary-400 hover:text-primary-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-dark-600">•</span>
            <Link href="/terms-of-service" className="text-dark-400 hover:text-dark-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">{title}</h2>
      <div className="text-dark-300 text-sm sm:text-base leading-relaxed">{children}</div>
    </section>
  );
}
