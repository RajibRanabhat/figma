"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSsoModal, setShowSsoModal] = useState(false);
  const [ssoEmail, setSsoEmail] = useState("");
  const [ssoPassword, setSsoPassword] = useState("");

  const [ssoStep, setSsoStep] = useState<"email" | "password">("email");
  const [ssoEmailFocused, setSsoEmailFocused] = useState(false);
  const [ssoPasswordFocused, setSsoPasswordFocused] = useState(false);
  const [ssoEmailError, setSsoEmailError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Invalid email or password");
        return;
      }

      alert(`Welcome back, ${data.email}!`);
    } catch {
      setLoginError("Something went wrong. Please try again.");
    }
  };

  const handleSsoContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ssoEmail, password: ssoPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Invalid email or password");
        return;
      }

      setShowSsoModal(false);
      setSsoEmail("");
      setSsoPassword("");
      setSsoStep("email");
      alert(`Welcome back, ${data.email}!`);
    } catch {
      setLoginError("Something went wrong. Please try again.");
    }
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
      <div className="flex flex-col items-center px-4 pt-8">
        <h1
          className="text-black mb-10 text-center"
          style={{
            fontSize: "32px",
            fontWeight: 500,
            lineHeight: "41.6px",
            letterSpacing: "-0.32px",
          }}
        >
          Sign in to Figma
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
          style={{ width: "358px" }}
        >
          {/* Google-styled button */}
          <button
            type="button"
            onClick={() => {
              setShowSsoModal(true);
              setLoginError("");
            }}
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

          {/* Email */}
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

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
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
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Error message */}
          {loginError && (
            <div className="text-red-600 text-sm text-center mt-1">
              {loginError}
            </div>
          )}

          {/* Log in button */}
          <button
            type="submit"
            className="w-full bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors mt-4"
            style={{
              height: "48px",
              fontSize: "18px",
              fontWeight: 480,
              lineHeight: "25.2px",
              letterSpacing: "-0.09px",
            }}
          >
            Log in
          </button>
        </form>

        {/* Links */}
        <div className="mt-8 flex flex-col items-center gap-3 text-[13px]">
          <a href="#" className="text-blue-600 font-semibold underline">
            Use single sign-on
          </a>
          <a href="#" className="text-blue-600 font-semibold underline">
            Reset password
          </a>
          <p className="text-neutral-600">
            No account?{" "}
            <a href="/signup" className="text-blue-600 font-semibold underline">
              Create one
            </a>
          </p>
        </div>
      </div>

      {showSsoModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => {
            setShowSsoModal(false);
            setSsoStep("email");
            setSsoEmail("");
            setSsoPassword("");
            setSsoEmailError(false);
            setLoginError("");
          }}
        >
          <div
            className="bg-white rounded-lg shadow-xl flex flex-col items-center relative"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "450px",
              padding: "48px 40px 36px",
              border: "1px solid #dadce0",
            }}
          >
            {/* Close X button */}
            <button
              type="button"
              onClick={() => {
                setShowSsoModal(false);
                setSsoStep("email");
                setSsoEmail("");
                setSsoPassword("");
                setSsoEmailError(false);
                setLoginError("");
              }}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 transition-colors p-1"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Google Logo */}
            <div className="mb-6">
              <Image
                src="/google.png"
                alt="Google"
                width={90}
                height={30}
                priority
              />
            </div>

            {ssoStep === "email" ? (
              <>
                <h2
                  className="text-center text-neutral-800"
                  style={{ fontSize: "24px", fontWeight: 400, lineHeight: "32px" }}
                >
                  Sign in
                </h2>
                <p
                  className="text-center text-neutral-700"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    marginTop: "4px",
                    marginBottom: "32px",
                  }}
                >
                  with your Google Account
                </p>

                <div className="w-full space-y-5">
                  {/* Email Input */}
                  <div className="relative w-full">
                    <input
                      id="sso-email"
                      type="email"
                      value={ssoEmail}
                      onChange={(e) => {
                        setSsoEmail(e.target.value);
                        if (ssoEmailError) setSsoEmailError(false);
                      }}
                      onFocus={() => setSsoEmailFocused(true)}
                      onBlur={() => setSsoEmailFocused(false)}
                      className={`w-full rounded-md px-4 pt-5 pb-2 text-base text-neutral-900 bg-white border-2 outline-none transition-colors ${
                        ssoEmailError
                          ? "border-red-500"
                          : ssoEmailFocused
                          ? "border-blue-500"
                          : "border-neutral-300"
                      }`}
                      style={{ height: "56px" }}
                    />
                    <label
                      htmlFor="sso-email"
                      className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                        ssoEmailFocused || ssoEmail
                          ? "top-0 -translate-y-1/2 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2 text-base text-neutral-500"
                      }`}
                    >
                      Email or phone
                    </label>
                  </div>

                  {ssoEmailError && (
                    <div className="text-left -mt-3">
                      <span className="text-red-600 text-xs font-medium">
                        Enter an email or phone number
                      </span>
                    </div>
                  )}

                  <div className="text-left">
                    <span className="text-blue-600 text-sm font-medium cursor-default select-none">
                      Forgot email?
                    </span>
                  </div>

                  <div className="text-left text-sm text-neutral-600 leading-relaxed">
                    Not your computer? Use Guest mode to sign in privately.
                    <br />
                    <span className="text-blue-600 font-medium cursor-default select-none">
                      Learn more
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-blue-600 text-sm font-medium cursor-default select-none">
                      Create account
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (!ssoEmail.trim()) {
                          setSsoEmailError(true);
                          return;
                        }
                        setLoginError("");
                        setSsoStep("password");
                      }}
                      className="bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                      style={{ padding: "10px 24px" }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2
                  className="text-center text-neutral-800"
                  style={{ fontSize: "24px", fontWeight: 400, lineHeight: "32px" }}
                >
                  Welcome
                </h2>
                <p
                  className="text-center text-neutral-700"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    marginTop: "4px",
                    marginBottom: "32px",
                  }}
                >
                  {ssoEmail}
                </p>

                <form onSubmit={handleSsoContinue} className="w-full space-y-4">
                  {/* Password Input */}
                  <div className="relative w-full">
                    <input
                      id="sso-password"
                      type="password"
                      value={ssoPassword}
                      onChange={(e) => setSsoPassword(e.target.value)}
                      onFocus={() => setSsoPasswordFocused(true)}
                      onBlur={() => setSsoPasswordFocused(false)}
                      className={`w-full rounded-md px-4 pt-5 pb-2 text-base text-neutral-900 bg-white border-2 outline-none transition-colors ${
                        ssoPasswordFocused ? "border-blue-500" : "border-neutral-300"
                      }`}
                      style={{ height: "56px" }}
                    />
                    <label
                      htmlFor="sso-password"
                      className={`absolute left-3 bg-white px-1 transition-all duration-200 pointer-events-none ${
                        ssoPasswordFocused || ssoPassword
                          ? "top-0 -translate-y-1/2 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2 text-base text-neutral-500"
                      }`}
                    >
                      Enter your password
                    </label>
                  </div>

                  {loginError && (
                    <div className="text-red-600 text-sm text-center">
                      {loginError}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSsoStep("email");
                        setLoginError("");
                      }}
                      className="text-blue-600 text-sm font-medium hover:bg-blue-50 rounded-md transition-colors"
                      style={{ padding: "8px 16px" }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                      style={{ padding: "10px 24px" }}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </>
            )}
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