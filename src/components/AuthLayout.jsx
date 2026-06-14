import React from "react";
import { motion } from "framer-motion";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Brand Logo - Top Left */}
      <header className="w-full px-6 py-6 md:px-10 md:py-8 flex items-center justify-between shrink-0">
        <a href="/" className="block transition hover:opacity-75">
          <img
            src="/assets/logoust.png"
            alt="Werdy"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </a>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center px-4 pb-12 md:pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4"
          >
            <Icon className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold tracking-tight text-foreground"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-muted-foreground mt-2"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card rounded-2xl shadow-sm border border-border p-8"
        >
          {children}
        </motion.div>
        {footer && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            {footer}
          </motion.p>
        )}
      </motion.div>
      </div>
    </div>
  );
}
