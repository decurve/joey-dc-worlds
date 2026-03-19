"use client";

import { useState, useEffect } from "react";
import {
  User,
  Gift,
  CreditCard,
  Bell,
  Copy,
  Check,
} from "lucide-react";

type Tab = "account" | "referral" | "plan" | "billing" | "notifications";

export default function SettingsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("account");
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) { setVisible(true); setClosing(false); }
  }, [open]);

  function handleClose() {
    setClosing(true);
    setTimeout(() => { setVisible(false); setClosing(false); onClose(); }, 250);
  }

  if (!visible) return null;

  function copyLink() {
    navigator.clipboard.writeText("https://demandcurve.com/r/abc123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "account", label: "Account", icon: User },
    { id: "referral", label: "Referral", icon: Gift },
    { id: "plan", label: "Plan", icon: CreditCard },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="fixed inset-0 retro-cursor" style={{ zIndex: 9999 }}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${closing ? "modal-backdrop-exit" : "modal-backdrop-enter"}`}
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className={`absolute flex flex-col overflow-hidden retro-cursor ${closing ? "panel-exit" : "panel-enter"}`}
        style={{
          top: 56,
          left: 12,
          right: 12,
          bottom: 0,
          borderRadius: "24px 24px 0 0",
          backgroundColor: "#111113",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          zIndex: 10000,
          cursor: 'url("/cursors/default.png") 3 1, auto',
        }}
      >
        {/* Win98 title bar */}
        <div className="flex items-center justify-between px-4 py-3" style={{ zIndex: 10001, background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)' }}>
          <span className="text-[11px] font-bold text-white">Settings</span>
          <div className="flex gap-2">
            <button className="win98-btn" aria-hidden="true">
              <svg width="9" height="2" viewBox="0 0 9 2" fill="currentColor"><rect width="9" height="2"/></svg>
            </button>
            <button className="win98-btn" aria-hidden="true">
              <svg width="9" height="8" viewBox="0 0 9 8" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="0.75" y="0.75" width="7.5" height="6.5"/></svg>
            </button>
            <button onClick={handleClose} className="win98-btn" aria-label="Close settings" style={{ marginLeft: 4 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="1" x2="7" y2="7"/><line x1="7" y1="1" x2="1" y2="7"/></svg>
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Tab nav */}
          <div className="w-52 border-r border-white/[0.08] p-4 pt-6 space-y-1 shrink-0 flex flex-col">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  tab === t.id
                    ? "bg-white/[0.08] text-white"
                    : "text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-200"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 p-8 overflow-y-auto retro-scrollbar">
            {tab === "account" && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-6">
                  Profile
                </h3>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-600" />
                  <div>
                    <p className="text-sm font-medium text-white">Ezzie Cat</p>
                    <p className="text-xs text-neutral-500">
                      ezzie@demandcurve.com
                    </p>
                  </div>
                </div>
                <hr className="frontier-divider mb-6" />
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 block mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Ezzie Cat"
                      className="w-full max-w-sm bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="ezzie@demandcurve.com"
                      className="w-full max-w-sm bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/25 transition-colors"
                    />
                  </div>
                </div>
                <hr className="frontier-divider my-6" />
                <button className="text-sm text-neutral-500 hover:text-white transition-colors">
                  Log out
                </button>
                <p className="text-[10px] text-neutral-600 mt-6">Changes saved automatically</p>
              </div>
            )}

            {tab === "referral" && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  Refer a friend
                </h3>
                <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                  Share your unique link. When someone signs up, you both get perks.
                </p>
                <div className="flex items-center gap-2 mb-8">
                  <input
                    type="text"
                    readOnly
                    value="https://demandcurve.com/r/abc123"
                    className="flex-1 max-w-md bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-2.5 text-sm text-neutral-400"
                  />
                  <button
                    onClick={copyLink}
                    className="frontier-card px-4 py-2.5 text-sm text-white flex items-center gap-2 hover:bg-white/[0.06] transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <hr className="frontier-divider mb-6" />
                <div className="grid grid-cols-3 gap-4 max-w-md">
                  {[
                    { value: "0", label: "Signups" },
                    { value: "0", label: "Converted" },
                    { value: "$0", label: "Earnings" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="frontier-card p-4 text-center"
                    >
                      <div className="text-lg font-semibold text-white tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-[10px] tracking-[0.1em] uppercase text-neutral-500">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "plan" && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  Current Plan
                </h3>
                <p className="text-xs text-neutral-400 mb-6">
                  You&apos;re on the Premium plan.
                </p>
                <div className="frontier-card p-6 max-w-md mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading text-lg text-white">
                      Premium
                    </span>
                    <span className="frontier-tag">Active</span>
                  </div>
                  <p className="text-xs text-neutral-400 mb-4">
                    Full access to all playbooks, skills, SOPs, teardowns,
                    and community features.
                  </p>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-neutral-600">
                    Renews March 1, 2027
                  </div>
                </div>
              </div>
            )}

            {tab === "billing" && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  Payment Method
                </h3>
                <p className="text-xs text-neutral-400 mb-6">
                  Manage your billing information.
                </p>
                <div className="frontier-card p-5 max-w-md mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-neutral-500" />
                    <div>
                      <p className="text-sm text-white">•••• •••• •••• 4242</p>
                      <p className="text-[10px] text-neutral-500">
                        Expires 12/28
                      </p>
                    </div>
                  </div>
                  <button className="text-xs text-neutral-500 hover:text-white transition-colors">
                    Update
                  </button>
                </div>
                <hr className="frontier-divider mb-6" />
                <h3 className="text-sm font-semibold text-white mb-4">
                  Invoice History
                </h3>
                <div className="text-xs text-neutral-500">
                  No invoices yet.
                </div>
              </div>
            )}

            {tab === "notifications" && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  Email Preferences
                </h3>
                <p className="text-xs text-neutral-400 mb-6">
                  Choose what you want to hear about.
                </p>
                <div className="space-y-4 max-w-md">
                  {[
                    {
                      label: "Weekly growth newsletter",
                      desc: "Tactics and strategies every Tuesday",
                      on: true,
                    },
                    {
                      label: "New playbook alerts",
                      desc: "When we publish a new playbook or teardown",
                      on: true,
                    },
                    {
                      label: "Community digest",
                      desc: "Top posts and discussions from the community",
                      on: false,
                    },
                    {
                      label: "Product updates",
                      desc: "New features and improvements",
                      on: false,
                    },
                  ].map((pref) => (
                    <div
                      key={pref.label}
                      className="flex items-center justify-between py-3 border-b border-white/[0.06]"
                    >
                      <div>
                        <p className="text-sm text-white">{pref.label}</p>
                        <p className="text-[10px] text-neutral-500 mt-0.5">
                          {pref.desc}
                        </p>
                      </div>
                      <div
                        className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${
                          pref.on
                            ? "bg-white/[0.2]"
                            : "bg-white/[0.06]"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                            pref.on ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
