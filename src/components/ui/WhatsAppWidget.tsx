"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function WhatsAppWidget() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show the tooltip after a 2-second delay to catch user attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Speech Tooltip Bubble */}
      {showTooltip && (
        <div className="mb-3 max-w-[260px] bg-white border border-emerald-100 text-gray-800 rounded-2xl p-4 shadow-2xl relative pointer-events-auto transition-all duration-500 transform translate-y-0 opacity-100 animate-fade-in flex items-start gap-2.5">
          {/* Green active dot */}
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mt-1.5 animate-pulse shrink-0" />
          
          <div className="flex-1">
            <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-0.5">
              Online Support
            </p>
            <p className="text-xs font-bold leading-relaxed text-gray-600">
              Hi! How may I help you? Contact us on WhatsApp!
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 p-0.5"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Speech Bubble Arrow pointing down to WhatsApp button */}
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-r border-b border-emerald-100 rotate-45" />
        </div>
      )}

      {/* Floating Animated WhatsApp Button */}
      <a
        href="https://wa.me/923335093223?text=Hi,%20I%20want%20to%20know%20more%20about%20the%20products%20of%20Hat%20Traders."
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto relative group flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 animate-float cursor-pointer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing Outer Rings */}
        <div className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-ring -z-10" />

        {/* WhatsApp Official SVG Icon */}
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 1.967 14.06 .94 11.437.94 6.01.94 1.587 5.31 1.583 10.74c-.001 1.745.467 3.447 1.353 4.96l-.982 3.582 3.693-.968zm11.567-5.64c-.327-.164-1.93-.953-2.229-1.062-.299-.109-.517-.164-.734.164-.218.327-.844 1.062-1.035 1.28-.19.218-.38.245-.708.081-.327-.164-1.38-.508-2.63-1.622-.972-.867-1.628-1.939-1.819-2.265-.19-.327-.02-.504.143-.668.147-.147.327-.38.491-.572.164-.19.218-.327.327-.545.109-.218.055-.408-.027-.572-.081-.164-.734-1.77-.1005-2.59-.267-.652-.581-.762-.8-.767-.163-.005-.361-.006-.557-.006-.196 0-.514.073-.784.368-.27.295-1.031 1.008-1.031 2.455 0 1.447 1.054 2.846 1.202 3.04.148.196 2.074 3.167 5.025 4.44.702.302 1.25.483 1.677.619.706.224 1.349.193 1.857.117.566-.085 1.93-.788 2.203-1.55.273-.762.273-1.417.191-1.55-.082-.132-.299-.218-.627-.382z" />
        </svg>
      </a>
      
    </div>
  );
}
