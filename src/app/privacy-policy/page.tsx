import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Hat Traders privacy policy to understand how we collect, use and protect your personal information.",
  alternates: { canonical: "https://hattraders.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as your name, email address, phone number and any message you send through our contact form. We may also collect certain information automatically when you visit our website, including your IP address, browser type and pages viewed.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use the information we collect to respond to your enquiries, provide customer support, improve our website and services, and send you relevant information about our products and promotions. We will never sell your personal information to third parties.",
    },
    {
      title: "Information Sharing",
      content:
        "We do not share, sell, rent or trade your personal information with third parties for their commercial purposes. We may share your information with trusted service providers who assist us in operating our website, provided they agree to keep your information confidential.",
    },
    {
      title: "Cookies",
      content:
        "Our website may use cookies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences and understand how you use our site. You can disable cookies through your browser settings.",
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure or destruction. However, no method of transmission over the internet is 100% secure.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at info@hattraders.com or visit our Contact page.",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-4">
            <Link href="/" className="hover:text-orange-300 transition-colors">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Privacy Policy</h1>
          <p className="text-gray-300">Last updated: {new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-600 mb-10 leading-relaxed">
            At Hat Traders, we are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use and safeguard your
            information when you visit our website or interact with us.
          </p>
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={section.title}>
                <h2 className="text-xl font-black text-gray-900 mb-3 flex items-center gap-3">
                  <span className="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center text-sm font-black">
                    {i + 1}
                  </span>
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed pl-11">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
