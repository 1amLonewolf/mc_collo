import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Scale, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | MC Collo Events',
  description: 'Terms of Service for MC Collo Events. Understand the terms governing your use of our website and services.',
  metadataBase: new URL('https://mccollo.com'),
  alternates: {
    canonical: 'https://mccollo.com/terms-of-service',
  },
};

const lastUpdated = 'April 6, 2026';

export default function TermsOfService() {
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
            <Scale className="w-8 h-8 text-primary-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-dark-400 text-base sm:text-lg max-w-2xl mx-auto">
            By using our website and submitting inquiries, you agree to the following terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 sm:space-y-12">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the MC Collo Events website (<strong className="text-white">mccollo.com</strong>), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </Section>

          <Section title="2. Use of the Website">
            <p>You agree to use this website only for lawful purposes and in a way that does not:</p>
            <ul className="list-disc list-inside space-y-2 text-dark-300 mt-3">
              <li>Infringe the rights of others or exploit the site for unauthorized purposes.</li>
              <li>Attempt to gain unauthorized access to our systems, servers, or networks.</li>
              <li>Use automated systems (bots, scrapers, scripts) to interact with our contact form.</li>
              <li>Transmit harmful, malicious, or illegal code or content.</li>
            </ul>
          </Section>

          <Section title="3. Contact Form Submissions">
            <p>When you submit an inquiry through our contact form:</p>
            <ul className="list-disc list-inside space-y-2 text-dark-300 mt-3">
              <li><strong className="text-white">Accuracy:</strong> You agree that the information you provide is accurate and truthful.</li>
              <li><strong className="text-white">Purpose:</strong> Your submission is solely for the purpose of inquiring about MC services for a genuine event.</li>
              <li><strong className="text-white">No Spam:</strong> You will not submit duplicate, frivolous, or malicious inquiries.</li>
              <li><strong className="text-white">Rate Limits:</strong> You acknowledge that submissions are rate-limited to 3 per hour per IP address. Exceeding this limit will temporarily block further submissions.</li>
              <li><strong className="text-white">Consent:</strong> By submitting the form, you consent to receive a response via email or phone and agree to our <Link href="/privacy-policy" className="text-primary-400 hover:text-primary-300 underline">Privacy Policy</Link>.</li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            <p>
              All content on this website, including but not limited to text, images, logos, graphics, and design, is the property of MC Collo Events and is protected by applicable intellectual property laws.
            </p>
            <p className="text-dark-300 mt-3">
              You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent.
            </p>
          </Section>

          <Section title="5. Service Availability">
            <p>
              We strive to keep our website operational at all times, but we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of the website at any time without notice.
            </p>
          </Section>

          <Section title="6. Inquiry Response">
            <p>
              Submitting an inquiry through our contact form does not constitute a confirmed booking. All inquiries are subject to availability, review, and mutual agreement on terms. A booking is only confirmed upon written confirmation and receipt of any required deposit.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, MC Collo Events shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of this website, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-dark-300 mt-3">
              <li>Loss of data or information submitted through our contact form.</li>
              <li>Temporary unavailability of the website due to maintenance or technical issues.</li>
              <li>Any errors, omissions, or inaccuracies in the content of this website.</li>
            </ul>
          </Section>

          <Section title="8. External Links">
            <p>
              Our website may contain links to external websites (e.g., Facebook, TikTok, WhatsApp). We are not responsible for the content, privacy practices, or terms of service of these third-party sites. We encourage you to review their respective policies before interacting with them.
            </p>
          </Section>

          <Section title="9. Governing Law">
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising from these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts of Kenya.
            </p>
          </Section>

          <Section title="10. Changes to These Terms">
            <p>
              We reserve the right to update these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have any questions or concerns about these Terms of Service, please contact us:</p>
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
            <Link href="/privacy-policy" className="text-dark-400 hover:text-dark-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-dark-600">•</span>
            <Link href="/terms-of-service" className="text-primary-400 hover:text-primary-300 transition-colors">
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
