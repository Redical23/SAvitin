"use client";
import React, { useEffect, useState, useRef } from "react";

const AdBox = () => {
  const [visible, setVisible] = useState(true);
  const adRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg w-[320px] h-[120px] flex items-center justify-center"
    >
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1 right-1 text-gray-700 text-sm hover:text-red-600"
        aria-label="Close Ad"
      >
        ✕
      </button>

      {/* Google AdSense Box */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: "300px",
          height: "100px",
        }}
        data-ad-client="ca-pub-4712056626954338"
        data-ad-slot="4114694115"
        data-ad-format=""
      ></ins>
    </div>
  );
};

export default AdBox;
