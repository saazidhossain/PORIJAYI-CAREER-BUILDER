import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Eye, Lock, Save, LogOut, CheckCircle2 } from 'lucide-react';

/* ── Toggle Switch component ──────────────────────────────────── */
const Toggle = ({ checked, onChange }) => (
  <label className="toggle-wrapper" aria-label="toggle">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="toggle-track">
      <span className="toggle-thumb" />
    </span>
  </label>
);

/* ── Section card ──────────────────────────────────────────────── */
const Section = ({ icon: Icon, iconClass, title, children }) => (
  <div className="glass-card rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconClass}`}>
        <Icon size={18} className="text-white" />
      </div>
      <h2 className="type-h2 text-white">{title}</h2>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

/* ── Toggle row ─────────────────────────────────────────────────── */
const ToggleRow = ({ title, desc, checked, onChange }) => (
  <div
    className="flex items-center justify-between p-4 rounded-xl"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
  >
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

/* ── Select row ─────────────────────────────────────────────────── */
const SelectRow = ({ label, desc, value, onChange, options }) => (
  <div
    className="p-4 rounded-xl"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
  >
    <p className="text-sm font-semibold text-white mb-3">{label}</p>
    <select value={value} onChange={onChange} className="input-base">
      {options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
    </select>
    {desc && <p className="text-xs text-slate-500 mt-2">{desc}</p>}
  </div>
);

/* ── Main component ─────────────────────────────────────────────── */
const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    emailNotifications: false,
    dailyReminder: true,
    reminderTime: '09:00',
    privacy: 'private',
    dataCollection: false,
    language: 'bengali',
  });
  const [saved, setSaved] = useState(false);

  const set = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">

      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="relative rounded-3xl p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(30,58,138,0.45) 0%, rgba(15,23,42,0.6) 100%)',
          border: '1px solid rgba(59,130,246,0.2)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center stat-icon-blue flex-shrink-0">
            <SettingsIcon size={24} className="text-white" />
          </div>
          <div>
            <p className="type-label text-blue-300/70 mb-1">কনফিগারেশন</p>
            <h1 className="type-h1 text-white">সেটিংস</h1>
            <p className="text-slate-400 text-sm mt-1">আপনার পছন্দ এবং পরিবেশ কাস্টমাইজ করুন</p>
          </div>
        </div>
      </div>

      {/* ── Notifications ─────────────────────────────────── */}
      <Section icon={Bell} iconClass="stat-icon-blue" title="বিজ্ঞপ্তি">
        <ToggleRow
          title="পুশ বিজ্ঞপ্তি সক্ষম করুন"
          desc="নতুন কাজ এবং মাইলস্টোনের জন্য বিজ্ঞপ্তি পান"
          checked={settings.notifications}
          onChange={(e) => set('notifications', e.target.checked)}
        />
        <ToggleRow
          title="ইমেল বিজ্ঞপ্তি"
          desc="আপনার ইমেলে সাপ্তাহিক সারসংক্ষেপ পান"
          checked={settings.emailNotifications}
          onChange={(e) => set('emailNotifications', e.target.checked)}
        />
        <ToggleRow
          title="দৈনিক অনুস্মারক"
          desc="প্রতিদিন শিক্ষা চালিয়ে যাওয়ার অনুস্মারক"
          checked={settings.dailyReminder}
          onChange={(e) => set('dailyReminder', e.target.checked)}
        />
        {settings.dailyReminder && (
          <div
            className="p-4 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <label className="block text-sm font-semibold text-white mb-2">অনুস্মারক সময়</label>
            <input
              type="time"
              value={settings.reminderTime}
              onChange={(e) => set('reminderTime', e.target.value)}
              className="input-base"
              style={{ maxWidth: '180px' }}
            />
          </div>
        )}
      </Section>

      {/* ── Privacy ───────────────────────────────────────── */}
      <Section icon={Lock} iconClass="stat-icon-green" title="গোপনীয়তা এবং নিরাপত্তা">
        <SelectRow
          label="প্রোফাইল গোপনীয়তা"
          desc="নিয়ন্ত্রণ করুন কে আপনার অগ্রগতি দেখতে পারে"
          value={settings.privacy}
          onChange={(e) => set('privacy', e.target.value)}
          options={[['private', 'ব্যক্তিগত'], ['friends', 'বন্ধুদের কাছে দৃশ্যমান'], ['public', 'সর্বজনীন']]}
        />
        <ToggleRow
          title="ডেটা সংগ্রহ"
          desc="উন্নতির জন্য ব্যবহার বিশ্লেষণ শেয়ার করুন"
          checked={settings.dataCollection}
          onChange={(e) => set('dataCollection', e.target.checked)}
        />
      </Section>

      {/* ── Preferences ───────────────────────────────────── */}
      <Section icon={Eye} iconClass="stat-icon-violet" title="পছন্দ">
        <SelectRow
          label="ভাষা"
          value={settings.language}
          onChange={(e) => set('language', e.target.value)}
          options={[['bengali', 'বাংলা'], ['english', 'English'], ['hindi', 'हिन्दी']]}
        />
        <SelectRow
          label="থিম"
          value={settings.theme}
          onChange={(e) => set('theme', e.target.value)}
          options={[['dark', 'অন্ধকার'], ['light', 'হালকা'], ['auto', 'স্বয়ংক্রিয়']]}
        />
      </Section>

      {/* ── Account ───────────────────────────────────────── */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="type-h2 text-white mb-5">অ্যাকাউন্ট</h2>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.25)', color: '#fca5a5' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(244,63,94,0.18)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(244,63,94,0.1)'; }}
        >
          <LogOut size={16} />
          লগআউট
        </button>
      </div>

      {/* ── Save ──────────────────────────────────────────── */}
      <div className="flex items-center gap-4 pb-4">
        <button onClick={handleSave} className="btn-primary px-8 py-3">
          <Save size={16} />
          সংরক্ষণ করুন
        </button>
        {saved && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold animate-fadeIn">
            <CheckCircle2 size={16} />
            সফলভাবে সংরক্ষিত হয়েছে!
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
