import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Hat Traders. Visit our store, call us or send an email for all your construction material needs. We're here to help.",
  alternates: { canonical: "https://hattraders.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Hat Traders"
        subtitle="Have a question or need expert advice? We're here to help. Reach out to us through any of the channels below."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop"
        breadcrumb={[{ label: "Contact Us" }]}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900">Get in Touch</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Phone / WhatsApp",
                    value: "+92 333 509 3223",
                    href: "https://wa.me/923335093223",
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Email",
                    value: "hat.traders.official@gmail.com",
                    href: "mailto:hat.traders.official@gmail.com",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Address",
                    value: "Manzoor Plaza T Chowk, near wateem hospital Rawat Islamabad",
                    href: "https://maps.google.com/?q=Manzoor+Plaza+T+Chowk+Rawat+Islamabad",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    label: "Hours",
                    value: "Mon–Sat: 9:00 AM – 8:00 PM",
                    href: null,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-800 font-semibold hover:text-orange-500 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-800 font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6">Send Us a Message</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-semibold text-gray-700 mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        placeholder="+92 300 000 0000"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      placeholder="What is this about?"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-gray-700 mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project or inquiry..."
                      required
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm bg-white resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-500/25"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
