import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the Hat Traders terms of service to understand the conditions for using our website and purchasing our products.",
  alternates: { canonical: "https://hattraders.com/terms" },
};

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing or using the Hat Traders website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.",
    },
    {
      title: "Use of Website",
      content:
        "You may use our website for lawful purposes only. You agree not to use the site in any way that violates applicable laws or regulations, or that harms the rights of others. We reserve the right to terminate access for any user who violates these terms.",
    },
    {
      title: "Product Information",
      content:
        "We make every effort to ensure product information, descriptions and pricing on our website are accurate. However, errors may occur. We reserve the right to correct any errors and to change or update information at any time without prior notice.",
    },
    {
      title: "Pricing & Availability",
      content:
        "All prices displayed on our website are in Pakistani Rupees (PKR) and are subject to change without notice. Product availability is not guaranteed and may vary. Contact us directly for current pricing and stock availability.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content on this website, including text, images, logos and graphics, is the property of Hat Traders and is protected by applicable copyright and intellectual property laws. You may not reproduce or distribute any content without our express written permission.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Hat Traders shall not be liable for any indirect, incidental, special or consequential damages arising from your use of our website or products. Our total liability shall not exceed the value of the product purchased.",
    },
    {
      title: "Changes to Terms",
      content:
        "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of our website after changes constitutes your acceptance of the new terms.",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-4">
            <Link href="/" className="hover:text-orange-300 transition-colors">Home</Link>
            <span>/</span>
            <span>Terms of Service</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black mb-4">Terms of Service</h1>
          <p className="text-gray-300">Last updated: {new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-600 mb-10 leading-relaxed">
            Please read these Terms of Service carefully before using the Hat
            Traders website. These terms govern your use of our website and the
            purchase of our products and services.
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
          <div className="mt-12 p-6 bg-orange-50 border border-orange-100 rounded-2xl">
            <p className="text-sm text-gray-600">
              For any questions regarding these terms, please{" "}
              <Link href="/contact" className="text-orange-500 hover:text-orange-600 font-semibold">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
