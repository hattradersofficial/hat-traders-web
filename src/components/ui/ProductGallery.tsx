"use client";

import { useState } from "react";

interface ProductGalleryProps {
  mainImage: string;
  gallery?: string[];
  title: string;
}

export default function ProductGallery({ mainImage, gallery, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);

  if (!gallery || gallery.length === 0) {
    return (
      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200 relative group">
        {mainImage ? (
          <img
            src={mainImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
            No Image Available
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image View */}
      <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-150 relative group shadow-sm">
        <img
          src={selectedImage}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {gallery.map((img, idx) => {
          const isActive = selectedImage === img;
          return (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`aspect-[4/3] rounded-2xl overflow-hidden bg-white border-2 transition-all duration-300 relative ${
                isActive
                  ? "border-teal-500 shadow-md shadow-teal-500/10 scale-95"
                  : "border-gray-200 hover:border-gray-400 hover:scale-[1.02]"
              }`}
            >
              <img
                src={img}
                alt={`${title} Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {!isActive && <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-300" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
