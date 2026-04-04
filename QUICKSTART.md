# CareerBuilder - দ্রুত শুরুর গাইড

## ৫ মিনিটে চলু করুন 🚀

### প্রয়োজনীয়তা
- Node.js 16+ (ডাউনলোড: https://nodejs.org/)
- npm (Node এর সাথে আসে)

### ইনস্টলেশন

```bash
# ১. প্রজেক্টে যান
cd CareerBuilder

# २. Dependencies ইনস্টল করুন
npm install

# ३. Development সার্ভার চালান
npm run dev
```

ব্রাউজার স্বয়ংক্রিয়ভাবে খুলবে `http://localhost:3000`

---

## প্রথম পদক্ষেপ 👣

### ড্যাশবোর্ড অন্বেষণ করুন
1. **ড্যাশবোর্ড তাবে**: আপনার সামগ্রিক অগ্রগতি দেখুন
2. **রোডম্যাপ**: প্রথম কাজ "Python ইনস্টলেশন" ক্লিক করুন
3. **জ্ঞান ট্র্যাকার**: নতুন টপিক যোগ করুন
4. **কোর্সেস**: উপলব্ধ শিক্ষা কোর্স ব্রাউজ করুন

### প্রথম কাজ সম্পূর্ণ করুন
1. রোডম্যাপ খুলুন
2. "Python এবং Environment সেটআপ" খুঁজুন
3. "শুরু করুন" বোতাম ক্লিক করুন
4. চেকলিস্ট আইটেমগুলি চিহ্নিত করুন যখন আপনি সেগুলি সম্পূর্ণ করেন

### আপনার Data Track করুন
1. জ্ঞান ট্র্যাকার খুলুন
2. "নতুন টপিক যোগ করুন" ক্লিক করুন
3. আপনার প্রথম শেখা বিষয় যোগ করুন (যেমন "Python Basics")

---

## কমান্ড রেফারেন্স

```bash
# Development সার্ভার চালান
npm run dev

# Production বিল্ড তৈরি করুন
npm run build

# Build প্রিভিউ করুন
npm run preview

# সব dependencies আপডেট করুন
npm update
```

---

## ফোল্ডার স্ট্রাকচার ব্যাখ্যা

```
src/
├── components/     ← ছোট reusable components
├── pages/          ← মেইন পৃষ্ঠা components
├── store/          ← Data management (Zustand)
├── App.jsx         ← মূল অ্যাপ
└── index.css       ← Styles

index.html         ← HTML entry point
public/            ← Static files
```

---

## কাস্টমাইজ করুন ⚙️

### থিম পরিবর্তন করুন
`tailwind.config.js` খুলুন এবং রঙ পরিবর্তন করুন:

```javascript
colors: {
  blue: '#3b82f6',   // আপনার রঙ এখানে
  purple: '#8b5cf6',
}
```

### নতুন পৃষ্ঠা যোগ করুন
1. `src/pages/NewPage.jsx` তৈরি করুন
2. Component রপ্তানি করুন
3. `src/App.jsx` এ import করুন
4. Sidebar এ রুট যোগ করুন

### নতুন কাজ যোগ করুন
`src/store/store.js` খুলুন এবং `roadmapTasks` array এ যোগ করুন:

```javascript
{
  id: 4,
  title: 'আমার নতুন কাজ',
  description: 'বর্ণনা',
  phase: 1,
  status: 'pending',
  dueDate: '2026-04-20',
  priority: 'high',
  resources: [],
  checklist: [
    { id: 1, text: 'করার জিনিস', completed: false },
  ],
}
```

---

## Troubleshooting 🔧

### Port ৩००० ব্যবহারে আছে
```bash
# Port পরিবর্তন করুন vite.config.js এ:
server: {
  port: 3001, // নতুন port
}
```

### Dependencies এ সমস্যা
```bash
# সব রিইনস্টল করুন
rm -rf node_modules package-lock.json
npm install
```

### Dark mode কাজ করছে না
নিশ্চিত করুন `index.css` এ Tailwind imports আছে

---

## পরবর্তী পদক্ষেপ 🎯

1. **সব কোর্স পড়ুন** - কোর্স লাইব্রেরিতে
2. **রোডম্যাপ অনুসরণ করুন** - পর্যায় ক্রমানুসারে
3. **জ্ঞান Track করুন** - শেখার সাথে সাথে
4. **প্রগতি দেখুন** - Analytics পৃষ্ঠায়

---

## সাহায্য এবং সাপোর্ট 💬

### সমস্যার সমাধান
1. Browser console চেক করুন (F12)
2. `npm run dev` এর output দেখুন
3. README.md পড়ুন সম্পূর্ণ তথ্যের জন্য

### অতিরিক্ত রিসোর্স
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [LEARNING_GUIDE.md](./LEARNING_GUIDE.md) - বিস্তারিত শিক্ষা পরিকল্পনা

---

**আপনার যাত্রা শুরু করুন আজই! 🎓**

সবকিছুর জন্য প্রস্তুত? এগিয়ে যান এবং আপনার Personal AI সিস্টেম তৈরি করুন।
