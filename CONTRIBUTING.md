# CareerBuilder - Contribution Guide 🤝

আপনার Career Builder এ অবদান রাখার জন্য আপনাকে স্বাগতম!

---

## আমরা এই এলাকায় অবদান খুঁজছি

### 🐛 Bug Reports
- App ক্র্যাশ হয় এরকম সমস্যা
- UI উপাদান সঠিকভাবে প্রদর্শিত না হয়
- State management সমস্যা

### ✨ নতুন বৈশিষ্ট্য
- নতুন পৃষ্ঠা এবং সেকশন
- উন্নত ড্যাশবোর্ড widgets
- রপ্তানি/আমদানি কার্যকারিতা
- মোবাইল অ্যাপ সমর্থন

### 📚 নথিকরণ
- গাইড উন্নতি
- কোড মন্তব্য
- Tutorial ভিডিও

### 🎨 UI/UX উন্নতি
- থিম আপগ্রেড
- Accessibility উন্নতি
- প্রতিক্রিয়াশীল ডিজাইন সংশোধন

---

## নীতি

1. **সম্মান**: সব অনুবাদ পড়ুন এবং অনুসরণ করুন
2. **স্পষ্টতা**: আপনার code পরিষ্কার এবং ভালভাবে মন্তব্য করুন
3. **পরীক্ষা**: নতুন বৈশিষ্ট্য পরীক্ষা করুন
4. **দক্ষতা**: Code reuse করুন, DRY নীতি অনুসরণ করুন

---

## Setting Up Development Environment

### Prerequisites
- Node.js 16+ installed
- Git configured
- Code editor (VS Code recommended)

### জন্য Setup

```bash
# Fork প্রকল্প GitHub এ
# ক্লোন করুন আপনার fork এ
git clone https://github.com/YOUR_USERNAME/career-builder.git
cd career-builder

# একটি branch তৈরি করুন
git checkout -b feature/my-awesome-feature

# Dependencies ইনস্টল করুন
npm install

# Dev server চালান
npm run dev
```

---

## Code Style Guide

### JavaScript/React

#### ১. নাম কনভেনশন
```javascript
// Components: PascalCase
function MyComponent() { }

// Functions & variables: camelCase
const handleSubmit = () => { }
let userProgress = 0

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3
const API_TIMEOUT = 5000
```

#### २. Component Structure
```javascript
// ১. imports
import { useState } from 'react'
import { useStore } from '../store/store'

// २. component definition
export default function MyComponent() {
  // Logic
  const [state, setState] = useState()
  const store = useStore()

  // Event handlers
  const handleClick = () => { }

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

#### ३. Zustand Store Updates
```javascript
// Good: Immutable updates
const addTask = (task) => {
  set((state) => ({
    roadmapTasks: [...state.roadmapTasks, task]
  }))
}

// Good: Descriptive action names
const updateTaskProgress = (taskId, progress) => {
  // ...
}
```

### Tailwind CSS

#### ১. Dark Mode Classes
```jsx
// Utility classes for dark mode
<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-white">Content</p>
</div>
```

#### २. Responsive Design
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols */}
</div>
```

#### ३. Color Palette
```css
/* Use Tailwind colors only */
bg-slate-50 to slate-900  /* Background */
text-slate-400 to slate-100  /* Text */
border-slate-200  /* Borders */
```

---

## নতুন বৈশিষ্ট্য যোগ করা

### ধাপ-দর-ধাপ প্রক্রিয়া

#### ১. একটি issue তৈরি করুন (যদি না থাকে)
```
Title: Add export to PDF feature
Description: Users should be able to export their progress report as PDF
```

#### २. একটি branch তৈরি করুন
```bash
git checkout -b feature/export-pdf
```

#### ३. আপনার বৈশিষ্ট্য বাস্তবায়ন করুন
- নতুন components তৈরি করুন `src/components/`
- নতুন pages তৈরি করুন `src/pages/` (প্রয়োজন হলে)
- Store actions যোগ করুন `src/store/store.js`

#### ४. পরীক্ষা করুন
```bash
npm run dev

# সব browsers এ পরীক্ষা করুন
# মোবাইলে পরীক্ষা করুন (Chrome DevTools)
# ডার্ক mode পরীক্ষা করুন
```

#### ५. Commit এবং Push করুন
```bash
git add .
git commit -m "feat: add export to PDF feature"
git push origin feature/export-pdf
```

#### ६. Pull Request তৈরি করুন
```
Title: feat: Add export to PDF feature
Description:
- Allows users to export progress reports
- Includes styled PDF with charts
- Works on all browsers

Closes #123
```

---

## Code Review করা

PR review করার সময় দেখুন:

- [ ] Code পরিমার্জন এবং পাঠযোগ্য
- [ ] No console errors বা সতর্কতা
- [ ] Comments এবং documentation আছে
- [ ] Dark mode সমর্থন করে
- [ ] Responsive design কাজ করে
- [ ] Performance acceptable এ আছে
- [ ] Tests pass করে

---

## বাগ রিপোর্ট করা

### ভাল bug report

```markdown
**বর্ণনা**
Dashboard এ স্ক্রল করার সময় আমার stats refresh হয় না।

**পুনরুত্পাদন পদক্ষেপ**
1. Dashboard খুলুন
2. নিচে স্ক্রল করুন
3. কোন আপডেট নেই

**প্রত্যাশিত আচরণ**
Stats স্ক্রল করার সময়ও আপডেট থাকবে।

**ব্যবহার করা browser**
Chrome 120, Windows 11

**স্ক্রীনশট**
[attach screenshot]
```

---

## Performance অপটিমাইজেশন

### পরীক্ষা করতে হবে

```bash
# Build সাইজ দেখুন
npm run build

# Performance profiles
# Chrome DevTools > Performance tab এ test করুন
```

### Best Practices

```javascript
// Good: useMemo সহ expensive calculations
const filteredTasks = useMemo(() => {
  return tasks.filter(t => t.phase === selectedPhase)
}, [tasks, selectedPhase])

// Good: React.memo সহ häufig re-rendering components
export default React.memo(TaskCard)

// Good: Code splitting
const AnalyticsPage = lazy(() => 
  import('../pages/Analytics')
)
```

---

## Accessibility (A11y)

### বাধ্যতামূলক আবশ্যকতা

```jsx
// Good: ARIA labels এবং semantic HTML
<button
  aria-label="Add new task"
  className="..."
>
  <PlusIcon />
</button>

// Good: Color এর বাইরে তথ্য convey করুন
<div className={status === 'completed' ? 
  'text-green-500 border-l-4 border-green-500' : 
  'text-yellow-500 border-l-4 border-yellow-500'
}>
  Status: {status}
</div>

// Good: Keyboard navigation সমর্থন করুন
<input
  onKeyDown={(e) => {
    if (e.key === 'Enter') handleSubmit()
  }}
/>
```

---

## Documentation টেমপ্লেট

### নতুন Component
```javascript
/**
 * TaskCard component - Displays individual task with status
 * 
 * @param {Object} task - Task object
 * @param {string} task.id - Unique task identifier
 * @param {string} task.title - Task title
 * @param {string} task.status - Task status (pending/in-progress/completed)
 * @param {Function} onUpdate - Callback when task is updated
 * 
 * @example
 * <TaskCard 
 *   task={task} 
 *   onUpdate={(updatedTask) => updateTask(updatedTask)}
 * />
 */
export default function TaskCard({ task, onUpdate }) {
  // ...
}
```

---

## Local Testing Checklist

প্রতিটি PR এর আগে নিশ্চিত করুন:

- [ ] App locally চলে `npm run dev`
- [ ] No console errors আছে
- [ ] Feature কাজ করে নতুন browsers এ
- [ ] Dark mode কাজ করে
- [ ] Mobile (DevTools) এ responsive দেখায়
- [ ] Zustand DevTools সব changes detect করে
- [ ] Previous features এখনও কাজ করে

---

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types
- `feat:` নতুন বৈশিষ্ট্য
- `fix:` বাগ ফিক্স
- `docs:` ডকুমেন্টেশন
- `style:` Code style (no logic change)
- `refactor:` Code reorganization
- `perf:` Performance improvements
- `test:` Tests
- `chore:` Dependencies,build stuff

### Examples
```
feat: add task export to PDF

- Implements PDF generation using jsPDF
- Includes progress charts in export
- Closes #42

feat: improve dashboard performance
```

---

## দ্রুত এন্ট্রি প্রজেক্ট তালিকা

Good স্টার্টার issues শুরু করতে:

- [ ] Add missing alt text to images
- [ ] Improve error message clarity
- [ ] Add localStorage persistence
- [ ] Create more course modules
- [ ] Add keyboard shortcuts
- [ ] Improve mobile layout
- [ ] Add dark mode toggle to Settings
- [ ] Create undo/redo functionality

---

## Communication এবং সাহায্য

### প্রশ্ন আছে?
- GitHub issues এ প্রশ্ন করুন
- Pull request comment এ জিজ্ঞাসা করুন

### Updates সম্পর্কে জানুন
- এই repo "Watch" করুন
- Release notes পড়ুন

---

## আইনি

### License
এই প্রজেক্ট MIT লাইসেন্সের অধীন।

### আপনার অবদান দ্বারা
আপনি আপনার কোড contribute করে, সেই কোড MIT লাইসেন্সের অধীন হয়।

---

## ধন্যবাদ! 🙏

আপনার অবদানের জন্য আমরা উত্তেজিত! Career Builder আরও ভাল করতে সাহায্য করার জন্য ধন্যবাদ।

**একসাথে, আমরা সেরা learning platform তৈরি করতে পারি!**

---

## জনপ্রিয় অবদানকারী তথ্য

সৃজনশীল contributing করতে:

1. একটি issue তৈরি করুন প্রথমে
2. একজন maintainer দ্বারা approval পান
3. বাস্তবায়ন শুরু করুন
4. Feedback জন্য PR প্রকাশ করুন
5. সংশোধনী যোগ করুন
6. Merge হওয়ার জন্য অপেক্ষা করুন

সময়ের পরে আমরা TOP contributors কে recognise করব!
