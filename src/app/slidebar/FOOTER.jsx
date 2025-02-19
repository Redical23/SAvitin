"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  const router = useRouter();

  const handleFilterClick = (filter) => {
    router.push(`/pruser/homepage?filter=${filter}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-12 px-4 text-sm">
      <motion.div className="container flex-col mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <Image
              src="/IMAGES/propersid.png"
              alt="ProperAid Logo"
              width={150}
              height={50}
              className="mb-4 mx-auto md:mx-0"
            />
            <h3 className="text-xl font-semibold text-white mb-4">ProperAid</h3>
            <p className="mb-4">
              Your trusted partner in legal solutions. Connecting you with top-tier lawyers for all your legal needs.
            </p>
            <p>&copy; {new Date().getFullYear()} ProperAid. All Rights Reserved.</p>
          </motion.div>

          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">Practice Areas</h4>
            <nav className="space-y-2">
              {["Corporate Law", "Intellectual Property", "Civil Litigation", "Criminal Defense", "Family Law"].map(
                (area) => (
                  <motion.button
                    key={area}
                    onClick={() => handleFilterClick(area)}
                    className="block w-full text-left hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {area}
                  </motion.button>
                )
              )}
            </nav>
          </motion.div>

          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {["Find a Lawyer", "About Us", "FAQ", "Terms of Service", "Privacy Policy"].map((link, index) => (
                <motion.a
                  key={index}
                  href={`/${link.replace(/\s+/g, "").toLowerCase()}`}
                  className="block hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          <motion.div className="text-center md:text-left" variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-2">
              <p className="flex items-center justify-center md:justify-start">
                <Mail size={18} className="mr-2" /> Properaid45@.com
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <MapPin size={18} className="mr-2" /> Headquarter in Prayagraj
              </p>
            </div>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              {[
                { href: "#", icon: <Facebook size={18} />, label: "Facebook" },
                { href: "#", icon: <Twitter size={18} />, label: "Twitter" },
                { href: "#", icon: <Linkedin size={18} />, label: "LinkedIn" },
                {
                  href: "https://www.instagram.com/proper_aid?igsh=eGl2Yms2NWRmYjF5",
                  icon: <Instagram size={18} />,
                  label: "Instagram",
                },
                {
                  href: "https://youtube.com/@properaid?si=4INyBT4tBoHuDvRb",
                  icon: <Youtube size={18} />,
                  label: "YouTube",
                },
              ].map((social, index) => (
                <SocialIcon key={index} href={social.href} aria-label={social.label}>
                  {social.icon}
                </SocialIcon>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400" variants={itemVariants}>
          <p>ProperAid is a lawyer referral service. We do not provide legal advice or representation.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

const SocialIcon = ({ href, children, ...props }) => (
  <motion.a
    href={href}
    className="bg-gray-700 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    {...props}
  >
    {children}
  </motion.a>
);

export default Footer;
