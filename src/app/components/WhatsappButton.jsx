"use client";

import React from "react";
import Link from "next/link";
export default function WhatsappButton() {
  const phoneNumber = "911234567890";
  const message = "Hello! I want to chat with you.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (

    <div  className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
       style={{ minWidth: "50px",
        position: "sticky",
        width: "max-content",
        left: "86vw",
        }}>

    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{ minWidth: "50px",
       
        }}
        >
      {/* WhatsApp Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 m-3 md:ml-4 md:mr-2 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.82 11.82 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.1 1.52 5.84L0 24l6.48-1.52A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.18-3.48-8.52zm-8.52 18.1a9.94 9.94 0 01-5.3-1.53l-.38-.23-3.85.9.91-3.76-.24-.39A9.94 9.94 0 012.4 12 10 10 0 1112 22.58zm5.54-7.18c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.34.21-.63.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.46.14-.15.19-.25.28-.42.09-.17.05-.31-.02-.45-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.37s-1 1-1 2.43 1.02 2.83 1.16 3.03c.14.2 2 3.05 4.84 4.27.68.29 1.21.46 1.63.59.68.22 1.3.19 1.79.12.55-.08 1.66-.68 1.9-1.33.24-.65.24-1.2.17-1.33-.07-.14-.26-.22-.54-.36z" />
      </svg>

      {/* Text for desktop/tablet */}
      <span className="hidden md:inline-block mr-4 font-medium">WhatsApp</span>
    </Link>
    
        </div>
  );
}
