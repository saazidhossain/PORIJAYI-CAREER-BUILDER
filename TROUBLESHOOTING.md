# CareerBuilder - Troubleshooting Guide 🔧

সাধারণ সমস্যা এবং তাদের সমাধান।

---

## Installation সমস্যা

### সমস্যা: `npm install` ব্যর্থ হচ্ছে

#### বার্তা: "Cannot find module"
```bash
# Solution: Cache পরিষ্কার করুন
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

#### বার্তা: "ERR! node-gyp rebuild"
```bash
# Python ইনস্টল করুন (Windows এ প্রয়োজন)
# https://www.python.org/downloads/

# তারপর পুনরায় চেষ্টা করুন
npm install
```

#### বার্তা: "EACCES: permission denied"
```bash
# Linux/Mac এ:
sudo npm install -g npm
npm install
```

---

## Development Server সমস্যা

### সমস্যা: পোর্ট ৩০০০ ব্যবহৃত

```bash
# কোন প্রক্রিয়া পোর্ট ব্যবহার করছে তা খুঁজুন

# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Linux/Mac:
lsof -i :3000

# প্রক্রিয়া বন্ধ করুন বা পোর্ট পরিবর্তন করুন
# vite.config.js এ:
server: {
  port: 3001,
}
```

### সমস্যা: "Vite server দ্রুত load হচ্ছে না"

```bash
# পুরানো build artifacts সাফ করুন
rm -rf dist

# Restart dev server
npm run dev
```

### সমস্যা: Hot Module Replacement কাজ করছে না

```javascript
// vite.config.js পরীক্ষা করুন:
export default {
  server: {
    port: 3000,
    hot: true,
  }
}
```

---

## Browser সমস্যা

### সমস্যা: Page খালি দেখা যাচ্ছে

#### ডিবাগিং ধাপ:
1. **Browser Console খুলুন** (F12)
2. **Errors দেখুন** (লাল X icons)
3. **Network tab চেক করুন** - সব files loaded?

#### সাধারণ কারণ:
```javascript
// ✅ Correct - App.jsx rendering
export default function App() {
  return <div>{/* pages */}</div>
}

// ❌ Wrong - component exported সঠিকভাবে নয়
const App = () => { }
// Missing: export default App
```

### সমস্যা: Styles কাজ করছে না (Dark mode নেই)

```bash
# tailwind.config.js পরীক্ষা করুন
# নিশ্চিত করুন সব CSS files imported:

# src/index.css এ:
@tailwind base;
@tailwind components;
@tailwind utilities;

# src/main.jsx এ:
import './index.css'
```

### সমস্যা: Icons (Lucide) দেখা যাচ্ছে না

```bash
# npm install পুনরায় চালান:
npm install lucide-react

# Component import পরীক্ষা করুন:
import { BarChart3, Settings, LogOut } from 'lucide-react'
```

### সমস্যা: "Uncaught ReferenceError: React is not defined"

```javascript
// ❌ Wrong - React import ছাড়া
export default function MyComponent() {
  return <div>Hello</div>
}

// ✅ Correct - React imported
import React from 'react'

export default function MyComponent() {
  return <div>Hello</div>
}

// Also correct - JSX এ React automatic imports:
// (এটি আধুনিক React 17+ এ স্বয়ংক্রিয়)
import { useState } from 'react'
```

---

## State Management (Zustand) সমস্যা

### সমস্যা: State changes store এ দেখা যাচ্ছে না

```javascript
// ✅ Correct - immer মিডলওয়্যার ছাড়া ম্যানুয়াল update
const useStore = create((set) => ({
  roadmapTasks: [],
  updateTask: (id, updates) => 
    set((state) => ({
      roadmapTasks: state.roadmapTasks.map(t =>
        t.id === id ? { ...t, ...updates } : t
      )
    }))
}))

// ❌ Wrong - mutation (non-immutable)
set((state) => {
  state.roadmapTasks[0].title = 'New Title' // ✗ Mutating!
  return state
})
```

### সমস্যা: Components re-rendering ঘটছে না

```javascript
// React DevTools Profiler ব্যবহার করুন:
// 1. Chrome এ React DevTools extension ইনস্টল করুন
// 2. DevTools > Profiler খুলুন
// 3. Record করুন এবং পরীক্ষা করুন

// হতে পারে:
const useStore = create((set) => ({
  tasks: [],
  // Missing: selector functions cause re-renders
}))

// ✅ Better: use selectors
const tasks = useStore(state => state.tasks)
const updateTask = useStore(state => state.updateTask)
```

### সমস্যা: Store state localStorage এ save হচ্ছে না

```javascript
// Zustand localStorage persist করতে:
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set) => ({
      // ... store definition
    }),
    {
      name: 'career-builder-store',
    }
  )
)
```

---

## Component সমস্যা

### সমস্যা: Props undefined পাওয়া যাচ্ছে

```javascript
// ✅ Correct - Props extract and use
function TaskCard({ task, onUpdate }) {
  console.log(task) // ✓ defined
  
  return (
    <div onClick={() => onUpdate(task.id)}>
      {task.title}
    </div>
  )
}

// ❌ Wrong - Props not extracted
function TaskCard(props) {
  console.log(props.task.title) 
  // May error if props.task is undefined
}
```

### সমস্যা: Child component parent state update করছে না

```javascript
// ❌ Wrong - trying to mutate parent state
function ChildComponent({ task }) {
  const handleClick = () => {
    task.status = 'completed' // ✗ Direct mutation!
  }
}

// ✅ Correct - pass callback
function ChildComponent({ task, onUpdate }) {
  const handleClick = () => {
    onUpdate(task.id, { status: 'completed' })
  }
}
```

---

## Performance সমস্যা

### সমস্যা: App ধীর অনুভব করছে

#### ডিবাগ করুন:
```javascript
// Chrome DevTools > Performance tab:
// 1. Recording শুরু করুন
// 2. Action perform করুন
// 3. Recording বন্ধ করুন
// 4. Bottlenecks খুঁজুন

// Common issues:
// - Expensive calculations render প্রতিবার
// - Large lists without virtualization
// - Unnecessary re-renders
```

#### সমাধান:
```javascript
// ✅ useMemo সহ expensive calculations
import { useMemo } from 'react'

function Dashboard() {
  const stats = useMemo(() => {
    return calculateComplexStats(tasks)
  }, [tasks])
  
  return <div>{stats}</div>
}

// ✅ React.memo সহ frequently updating list items
const TaskItem = React.memo(function TaskItem({ task }) {
  return <div>{task.title}</div>
})
```

### সমস্যা: Bundle size বড়

```bash
# Build analyze করুন
npm run build

# Check output:
# vite v4.4.0 building for production...

# যদি > 2MB হয় তবে অপটিমাইজ করুন:

# ১. Code splitting করুন
import { lazy } from 'react'

const Analytics = lazy(() => 
  import('./pages/Analytics')
)

# २. Import করুন যা প্রয়োজন
// ❌ Wrong
import _ from 'lodash'

// ✅ Right
import pick from 'lodash/pick'
```

---

## Data সমস্যা

### সমস্যা: Form input value changes হচ্ছে না

```javascript
// ❌ Wrong - controlled component mistake
function Form() {
  const [name, setName] = useState('')
  
  // Missing onChange handler!
  return <input value={name} />
}

// ✅ Correct
function Form() {
  const [name, setName] = useState('')
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  )
}
```

### সমস্যা: Array/Object updates properly হচ্ছে না

```javascript
// ❌ Wrong - direct array mutation
const tasks = [...]
tasks[0].status = 'completed'
setTasks(tasks) // Won't trigger re-render!

// ✅ Correct - create new array
const updatedTasks = tasks.map(t =>
  t.id === 1
    ? { ...t, status: 'completed' }
    : t
)
setTasks(updatedTasks)

// ✅ Also correct - spread operator
const tasks = [...oldTasks]
tasks[0] = { ...tasks[0], status: 'completed' }
setTasks(tasks)
```

---

## Build সমস্যা

### সমস্যা: `npm run build` fail হচ্ছে

```bash
# Step 1: সব errors দেখুন
npm run build

# Step 2: Common issues check করুন
# - Missing imports?
# - Syntax errors?
# - Undefined variables?

# Step 3: Build cache clear করুন
rm -rf dist .vite
npm run build
```

### সমস্যা: Build succeed হয় কিন্তু production broken

```bash
# Development এ কাজ করে কিন্তু production এ নয়?
# সম্ভ্যব কারণ:
# 1. Environment variables missing
# 2. Process.env সাথে hard-coded paths
# 3. Relative paths incorrect

# Test করুন:
npm run build
npm run preview

# Preview production build locally
```

---

## Deployment সমস্যা

### Vercel build fail

```bash
# Check Framework Detection:
# Settings > Build & Development Settings

# Ensure value:
# Framework: Other
# Build Command: npm run build
# Output Directory: dist
```

### Netlify blank page

```bash
# Check:
# Site settings > Build & deploy
# Build command: npm run build
# Publish directory: dist

# If still blank:
# Logs > Deploy log টি দেখুন specific errors এর জন্য
```

### Firebase deploy fail

```bash
# Firebase project সঠিক?
firebase projects:list

# Ensure dist folder exists:
npm run build
firebase deploy
```

---

## Browser Compatibility সমস্যা

### সমস্যা: Old browsers এ broken

```javascript
// ✅ Compatible - basic JavaScript
const tasks = [...oldTasks]

// ❌ May break - newer features
const tasks = (oldTasks ?? []).at(-1)

// Check browser support:
// https://caniuse.com/

// Use polyfills যদি প্রয়োজন হয়:
npm install @babel/polyfill
```

---

## Environment Variables সমস্যা

### সমস্যা: Env variables undefined

```javascript
// ❌ Wrong
const apiUrl = process.env.API_URL

// ✅ Correct - Vite prefix required
const apiUrl = import.meta.env.VITE_API_URL

// ✅ .env file
VITE_API_URL=http://localhost:5000
```

---

## Security সমস্যা

### সমস্যা: console에 secrets दिख रहे हैं

```javascript
// ❌ Never do this
const API_KEY = 'sk-1234567890abcdef'

// ✅ Use environment variables
// .env:
// VITE_API_KEY=sk-1234567890abcdef

// code:
const apiKey = import.meta.env.VITE_API_KEY
```

---

## সাধারণ Error Messages

### "Module not found"
```bash
# Import path সঠিক?
# File existing?
npm install # dependency missing?
```

### "Cannot read properties of undefined"
```javascript
// Object undefined?
console.log(task?.title) // Use optional chaining
```

### "Too many re-renders"
```javascript
// setState infinite loop এ?
// ❌ Wrong
<button onClick={setCount(count + 1)}>

// ✅ Correct
<button onClick={() => setCount(count + 1)}>
```

---

## যখন সব else ব্যর্থ

### পুরোপুরি reset করুন:

```bash
# 1. সব প্রকল্প ফাইল মুছুন (সাবধান!)
rm -rf node_modules dist package-lock.json

# 2. Fresh start করুন
npm install
npm run dev

# 3. Developer Tools খুলুন (F12)
# Application > Storage > Clear All
```

### আরও help পান:

1. **GitHub Issues** - search existing issues
2. **Stack Overflow** - tag দিয়ে search করুন `[react]` `[vite]`
3. **Discord Communities** - React, Zustand communities এ জিজ্ঞাসা করুন

---

## Reporting Bugs কার্যকরভাবে

যখন সাহায্য চান, provide করুন:

```markdown
**Error message:**
(সম্পূর্ণ error text)

**Steps to reproduce:**
1. ...
2. ...

**Expected behavior:**
What should happen

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Node version: 18.x

**Screenshot/Video:**
[If applicable]

**Console errors:**
(F12 > Console লগ)
```

---

**এখনও stuck? প্রশ্ন জিজ্ঞাসা করুন! Community সাহায্য করতে এখানে আছে। যারা সাহায্য করেছেন তাদের ধন্যবাদ! 🙏**
