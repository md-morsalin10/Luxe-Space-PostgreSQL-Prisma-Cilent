import React from 'react';
import Link from 'next/link';
import { FiSlash, FiMail } from 'react-icons/fi';

export const metadata = {
  title: 'Account Suspended | LuxeSpace',
  description: 'Your account has been suspended. Please contact support.',
};

export default function SuspendedPage() {
  return (
    <div className="min-h-screen bg-[#0B1329] flex flex-col items-center justify-center px-4 py-20">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Icon */}
        <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-900/20">
          <FiSlash className="w-10 h-10 text-red-400" />
        </div>

        {/* Headline */}
        <div className="mb-3">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-500/70">
            Account Restricted
          </span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white mb-4">
          Your Account Has Been{' '}
          <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
            Suspended
          </span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-md mx-auto">
          Access to the LuxeSpace platform has been temporarily restricted by an administrator.
          You cannot view your dashboard, list properties, or perform any actions while your
          account remains suspended.
        </p>

        {/* Info Box */}
        <div className="bg-white/5 border border-amber-500/10 rounded-2xl px-6 py-5 mb-10 text-left space-y-3">
          <p className="text-gray-300 text-sm font-medium">What you can do:</p>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">→</span>
              Contact our support team to understand the reason for suspension.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">→</span>
              Review our Terms of Service to ensure compliance.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">→</span>
              Wait for an admin to unsuspend your account.
            </li>
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="mailto:support@luxespace.com"
            className="flex items-center gap-2 bg-[#C9A227] hover:bg-[#b08d22] text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-amber-900/30 w-full sm:w-auto justify-center"
          >
            <FiMail className="w-4 h-4" />
            Contact Support
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-8 py-3 rounded-xl transition-all w-full sm:w-auto justify-center"
          >
            Back to Homepage
          </Link>
        </div>

        <p className="mt-10 text-gray-600 text-xs">
          LuxeSpace Administration • support@luxespace.com
        </p>
      </div>
    </div>
  );
}
