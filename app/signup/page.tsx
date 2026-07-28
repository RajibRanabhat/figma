"use client";

import { useState } from "react";
import Image from "next/image";
import { KeyRound } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [modalPassword, setModalPassword] = useState("");

  const handleContinueWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setModalEmail(email); // pre-fill with typed email
    setShowModal(true);
  };

  const handleContinueWithGoogle = () => {
    setModalEmail(""); // empty for Google flow
    setShowModal(true);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Account created:", { modalEmail, modalPassword });
    setShowModal(false);
    alert(`Account created for ${modalEmail} (demo only)`);
    setModalPassword("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <div className="pl-8 pt-6">
        <Image
          src="/figma.png"
          alt="ERD"
          width={32}
          height={47}
          className="rounded-md"
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center px-4 pt-24">
        <h1
          className="text-black mb-10 text-center"
          style={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "41.6px",
            letterSpacing: "-0.32px",
          }}
        >
          Welcome to Figma
        </h1>

        <div className="space-y-3" style={{ width: "358px" }}>
          {/* Google button */}
          <button
            type="button"
            onClick={handleContinueWithGoogle}
            className="w-full flex items-center justify-center gap-2.5 rounded-lg text-black hover:bg-black/[0.03] transition-colors"
            style={{
              height: "48px",
              border: "0.8px solid rgb(44,44,44)",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="text-center text-[13px] text-neutral-600 py-1">
            or
          </div>

          {/* Email + Continue with email form */}
          <form onSubmit={handleContinueWithEmail} className="space-y-3">
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute uppercase text-black pointer-events-none"
                style={{
                  top: "8px",
                  left: "12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "13.75px",
                  letterSpacing: "0.55px",
                }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md text-black outline-none"
                style={{
                  height: "53px",
                  backgroundColor: "rgba(0,0,0,0.08)",
                  fontSize: "18px",
                  fontWeight: 320,
                  lineHeight: "25px",
                  letterSpacing: "-0.09px",
                  paddingTop: "24px",
                  paddingBottom: "6px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors mt-6"
              style={{
                height: "48px",
                fontSize: "18px",
                fontWeight: 480,
                lineHeight: "25.2px",
                letterSpacing: "-0.09px",
              }}
            >
              Continue with email
            </button>
          </form>
        </div>
      </div>

      {/* Modal — shared for both Google and email flows */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-8 w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-center mb-1 text-neutral-900">
              Continue to Figma
            </h2>
            

            <form onSubmit={handleFinalSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={modalEmail}
                onChange={(e) => setModalEmail(e.target.value)}
                className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={modalPassword}
                onChange={(e) => setModalPassword(e.target.value)}
                className="w-full border border-neutral-300 rounded-md px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-neutral-900"
                required
                autoFocus
              />

              <div className="flex justify-between items-center pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-neutral-600 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-neutral-900 text-white text-sm font-medium px-6 py-2 rounded-md hover:bg-neutral-800"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.85.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.96 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}