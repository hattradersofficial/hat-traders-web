import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, ExternalLink } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Hat Traders. Visit our store at Manzoor Plaza T Chowk, Rawat Islamabad, call us, or chat on WhatsApp for all your construction material needs.",
  alternates: { canonical: "https://hattraders.com/contact" },
};

export default function ContactPage() {
  const contactDetails = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone Support",
      value: "+92 333 509 3223",
      subText: "Call us directly for pricing & inquiries",
      href: "tel:+923335093223",
      actionText: "Call Now",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: "WhatsApp Chat",
      value: "+92 333 509 3223",
      subText: "Instant response for catalogs & support",
      href: "https://wa.me/923335093223?text=Hi%20Hat%20Traders,%20I%20have%20an%20inquiry%20regarding%20construction%20materials.",
      actionText: "Chat on WhatsApp",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email Address",
      value: "hat.traders.official@gmail.com",
      subText: "Send us your purchase lists & quotes",
      href: "mailto:hat.traders.official@gmail.com",
      actionText: "Send Email",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Business Hours",
      value: "Mon – Sat: 9:00 AM – 8:00 PM",
      subText: "Sunday: Closed",
      href: null,
      actionText: "Store Hours",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <>
      <PageHeader
        title="Contact Hat Traders"
        subtitle="Transforming spaces across Pakistan. Speak directly with our experts, visit our flagship store, or connect instantly on WhatsApp."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop"
        breadcrumb={[{ label: "Contact Us" }]}
      />

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 max-w-7xl">
          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            
            {/* Left Side: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-orange-500 text-xs font-black uppercase tracking-[0.25em] block mb-2">
                  DIRECT CHANNELS
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-none mb-4">
                  We are Always <span className="text-orange-500">Connected</span>
                </h2>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Whether you need bulk paint delivery, specialized hardware items, or premium sanitary ware, choose a channel below to get instant support.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {contactDetails.map((item) => (
                  <div
                    key={item.label}
                    className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 relative overflow-hidden shadow-sm"
                  >
                    {/* Gradient Border Accent */}
                    <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${item.gradient}`} />
                    
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} text-white rounded-xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-gray-900 font-extrabold text-base tracking-tight truncate">
                        {item.value}
                      </p>
                      <p className="text-xs text-gray-400 mb-3">{item.subText}</p>
                      
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 text-xs font-black text-orange-500 hover:text-orange-600 transition-colors uppercase tracking-widest"
                        >
                          {item.actionText} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                          {item.actionText}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Interactive Google Map Embed */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xl relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 leading-tight">Visit Our Flagship Store</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Manzoor Plaza T Chowk, Rawat Islamabad</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Manzoor+Plaza+T+Chowk+Rawat+Islamabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-gray-950 text-white hover:bg-black text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0 uppercase tracking-widest"
                  >
                    Get Directions <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Map iframe Container */}
                <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-gray-100 shadow-inner relative group">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.1772648790303!2d73.3101683!3d33.4934444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1b9b183604f3f%3A0xe54fb72a3fe3b59b!2sT-Chowk%2C%20Rawat%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hat Traders Location Map"
                    className="grayscale-[20%] contrast-[110%] group-hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Quick Support Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Pattern Accent */}
            <div className="absolute inset-0 bg-grid-white/[0.03] -z-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10" />
            
            <div className="max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/20 text-white px-3 py-1 rounded-full inline-block mb-4">
                FAST ESTIMATES
              </span>
              <h3 className="text-2xl lg:text-4xl font-black mb-4 leading-tight tracking-tight">
                Need a Custom Quote or Bulk Estimate?
              </h3>
              <p className="text-orange-100 text-sm lg:text-base leading-relaxed mb-8">
                Skip the waiting time! Send your list of requirements or architectural designs directly to us on WhatsApp, and our sales team will compile a customized, discounted quote for you within minutes.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/923335093223?text=Hi%20Hat%20Traders,%20I%20need%20a%20price%20quote%20for%20a%20construction%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-black px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg uppercase text-xs tracking-widest"
                >
                  <MessageSquare className="w-4 h-4" /> Start Quick Chat
                </a>
                <a
                  href="tel:+923335093223"
                  className="inline-flex items-center gap-2 bg-orange-400/30 hover:bg-orange-400/50 border border-white/30 font-black px-8 py-4 rounded-xl transition-all uppercase text-xs tracking-widest"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
