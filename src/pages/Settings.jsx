import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Eye, Lock, Save, LogOut } from 'lucide-react';

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

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8">
        <div className="flex items-center space-x-4 mb-2">
          <SettingsIcon size={32} className="text-blue-400" />
          <h1 className="text-4xl font-bold text-white">সেটিংস</h1>
        </div>
        <p className="text-slate-400">আপনার পছন্দ এবং পরিবেশ কাস্টমাইজ করুন</p>
      </div>

      {/* Notification Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell size={24} className="text-blue-400" />
          <h2 className="text-2xl font-bold text-white">বিজ্ঞপ্তি</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-700 bg-opacity-50 rounded-lg p-4">
            <div>
              <p className="text-white font-semibold">পুশ বিজ্ঞপ্তি সক্ষম করুন</p>
              <p className="text-slate-400 text-sm">নতুন কাজ এবং মাইলস্টোনের জন্য বিজ্ঞপ্তি পান</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>

          <div className="flex items-center justify-between bg-slate-700 bg-opacity-50 rounded-lg p-4">
            <div>
              <p className="text-white font-semibold">ইমেল বিজ্ঞপ্তি</p>
              <p className="text-slate-400 text-sm">আপনার ইমেলে সাপ্তাহিক সারসংক্ষেপ পান</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>

          <div className="flex items-center justify-between bg-slate-700 bg-opacity-50 rounded-lg p-4">
            <div>
              <p className="text-white font-semibold">দৈনিক অনুস্মারক</p>
              <p className="text-slate-400 text-sm">প্রতিদিন শিক্ষা চালিয়ে যাওয়ার অনুস্মারক</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dailyReminder}
                onChange={(e) => handleChange('dailyReminder', e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>

          {settings.dailyReminder && (
            <div className="bg-slate-700 bg-opacity-30 rounded-lg p-4 border border-slate-600">
              <label className="block text-white font-semibold mb-2">অনুস্মারক সময়</label>
              <input
                type="time"
                value={settings.reminderTime}
                onChange={(e) => handleChange('reminderTime', e.target.value)}
                className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Lock size={24} className="text-green-400" />
          <h2 className="text-2xl font-bold text-white">গোপনীয়তা এবং নিরাপত্তা</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4">
            <label className="block text-white font-semibold mb-3">প্রোফাইল গোপনীয়তা</label>
            <select
              value={settings.privacy}
              onChange={(e) => handleChange('privacy', e.target.value)}
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-green-500"
            >
              <option value="private">ব্যক্তিগত</option>
              <option value="friends">বন্ধুদের কাছে দৃশ্যমান</option>
              <option value="public">সর্বজনীন</option>
            </select>
            <p className="text-slate-400 text-sm mt-2">নিয়ন্ত্রণ করুন কে আপনার অগ্রগতি দেখতে পারে</p>
          </div>

          <div className="flex items-center justify-between bg-slate-700 bg-opacity-50 rounded-lg p-4">
            <div>
              <p className="text-white font-semibold">ডেটা সংগ্রহ</p>
              <p className="text-slate-400 text-sm">উন্নতির জন্য ব্যবহার বিশ্লেষণ শেয়ার করুন</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dataCollection}
                onChange={(e) => handleChange('dataCollection', e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Eye size={24} className="text-purple-400" />
          <h2 className="text-2xl font-bold text-white">পছন্দ</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4">
            <label className="block text-white font-semibold mb-3">ভাষা</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="bengali">বাংলা</option>
              <option value="english">English</option>
              <option value="hindi">हिन्दी</option>
            </select>
          </div>

          <div className="bg-slate-700 bg-opacity-50 rounded-lg p-4">
            <label className="block text-white font-semibold mb-3">থিম</label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-purple-500"
            >
              <option value="dark">অন্ধকার</option>
              <option value="light">হালকা</option>
              <option value="auto">স্বয়ংক্রিয়</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">অ্যাকাউন্ট</h2>
        <button className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all">
          <LogOut size={20} />
          <span>লগআউট</span>
        </button>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-lg transition-all"
        >
          <Save size={20} />
          <span>সংরক্ষণ করুন</span>
        </button>
        {saved && (
          <div className="flex items-center space-x-2 text-green-400 animate-pulse">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm font-semibold">সংরক্ষিত হয়েছে!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
