# CareerBuilder - API Integration Guide 🔌

Frontend কে আপনার Ollama বা FastAPI backend এর সাথে সংযুক্ত করুন।

---

## Architecture Overview

```
Frontend (React)          Backend (FastAPI/Ollama)    Database
      |                          |                        |
  Pages/                      API Routes              PostgreSQL/
  Components                  Endpoints               Firestore
      |                          |                        |
  Zustand Store      <--API Calls--->      <--Database-->
      |
  API Services
```

---

## পদক্ষেপ ১: API Service তৈরি করুন

### ফাইল তৈরি করুন: `src/api/api.js`

```javascript
// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// ============================================
// ١. Health Check
// ============================================
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) throw new Error('API unreachable')
    return await response.json()
  } catch (error) {
    console.error('Health check failed:', error)
    return { status: 'error' }
  }
}

// ============================================
// २. User Progress
// ============================================
export const getUserProgress = async (userId) => {
  return fetch(`${API_BASE_URL}/api/progress/${userId}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${getToken()}` },
  }).then(r => r.json())
}

export const updateUserProgress = async (userId, data) => {
  return fetch(`${API_BASE_URL}/api/progress/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  }).then(r => r.json())
}

// ============================================
// ३. Tasks (Roadmap)
// ============================================
export const getTasks = async (userId) => {
  return fetch(`${API_BASE_URL}/api/tasks?user_id=${userId}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${getToken()}` },
  }).then(r => r.json())
}

export const createTask = async (userId, taskData) => {
  return fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      ...taskData,
      user_id: userId,
    }),
  }).then(r => r.json())
}

export const updateTask = async (taskId, updates) => {
  return fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updates),
  }).then(r => r.json())
}

export const deleteTask = async (taskId) => {
  return fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` },
  }).then(r => r.json())
}

// ============================================
// ४. Knowledge Items
// ============================================
export const getKnowledge = async (userId) => {
  return fetch(
    `${API_BASE_URL}/api/knowledge?user_id=${userId}`,
    {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${getToken()}` },
    }
  ).then(r => r.json())
}

export const addKnowledge = async (userId, knowledgeData) => {
  return fetch(`${API_BASE_URL}/api/knowledge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      ...knowledgeData,
      user_id: userId,
    }),
  }).then(r => r.json())
}

export const deleteKnowledge = async (knowledgeId) => {
  return fetch(`${API_BASE_URL}/api/knowledge/${knowledgeId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` },
  }).then(r => r.json())
}

// ============================================
// ५. Analytics Data
// ============================================
export const getAnalytics = async (userId) => {
  return fetch(`${API_BASE_URL}/api/analytics/${userId}`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${getToken()}` },
  }).then(r => r.json())
}

// ============================================
// ६. Ollama AI Features
// ============================================
export const generateTaskSuggestions = async (userLevel) => {
  return fetch(`${API_BASE_URL}/api/ollama/suggest-tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ user_level: userLevel }),
  }).then(r => r.json())
}

export const generateLearningPlan = async (goalInput) => {
  return fetch(`${API_BASE_URL}/api/ollama/learning-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ goal: goalInput }),
  }).then(r => r.json())
}

export const getAIInsight = async (topic) => {
  return fetch(`${API_BASE_URL}/api/ollama/insight`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ topic }),
  }).then(r => r.json())
}

// ============================================
// ७. Authentication
// ============================================
export const login = async (email, password) => {
  return fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(r => r.json())
}

export const signup = async (userData) => {
  return fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(r => r.json())
}

export const logout = async () => {
  localStorage.removeItem('token')
  return { success: true }
}

// ============================================
// Helper Functions
// ============================================

// JWT token obtain করুন
const getToken = () => {
  return localStorage.getItem('token') || ''
}

// Error handling wrapper
export const handleApiError = (error) => {
  if (error.response?.status === 401) {
    // Token expired - redirect to login
    logout()
    window.location.href = '/login'
  }
  console.error('API Error:', error)
  return { error: error.message }
}
```

---

## পদক্ষেপ २: .env setup করুন

### ফাইল তৈরি করুন: `.env.local`

```env
# Backend API
VITE_API_URL=http://localhost:8000

# Firebase (যদি ব্যবহার করেন)
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_PROJECT_ID=your_project_id

# Ollama
VITE_OLLAMA_URL=http://localhost:11434

# Environment
VITE_ENV=development
```

### Production এর জন্য: `.env.production`

```env
VITE_API_URL=https://api.yourdomain.com
VITE_FIREBASE_API_KEY=prod_key_here
VITE_OLLAMA_URL=https://ollama.yourdomain.com
```

---

## পদক্ষেপ ३: Store সাথে API সংযুক্ত করুন

### Update: `src/store/store.js`

```javascript
import { create } from 'zustand'
import * as api from '../api/api'

export const useStore = create((set, get) => ({
  // ============ Data State ============
  userProgress: {
    currentLevel: 1,
    totalHoursLearned: 0,
    skillPoints: 0,
    completedCourses: 0,
  },
  
  roadmapTasks: [],
  knowledge: [],
  analytics: null,
  
  // ============ UI State ============
  loading: false,
  error: null,
  
  // ============ Sync Data from API ============
  
  // Initialize data on app load
  initializeData: async (userId) => {
    set({ loading: true })
    try {
      const [tasks, knowledge, analytics] = await Promise.all([
        api.getTasks(userId),
        api.getKnowledge(userId),
        api.getAnalytics(userId),
      ])
      
      set({
        roadmapTasks: tasks.data || [],
        knowledge: knowledge.data || [],
        analytics: analytics.data || null,
        error: null,
      })
    } catch (err) {
      set({ 
        error: err.message,
        roadmapTasks: [],
        knowledge: [],
      })
    } finally {
      set({ loading: false })
    }
  },
  
  // ============ Task Management ============
  
  updateTaskStatus: async (taskId, status) => {
    try {
      const updated = await api.updateTask(taskId, { status })
      
      set((state) => ({
        roadmapTasks: state.roadmapTasks.map(t =>
          t.id === taskId ? updated.data : t
        ),
      }))
      
      return updated
    } catch (err) {
      set({ error: err.message })
    }
  },
  
  updateTaskProgress: async (taskId, progress) => {
    try {
      const updated = await api.updateTask(taskId, {
        progress,
      })
      
      set((state) => ({
        roadmapTasks: state.roadmapTasks.map(t =>
          t.id === taskId ? { ...t, progress } : t
        ),
      }))
      
      return updated
    } catch (err) {
      set({ error: err.message })
    }
  },
  
  // ============ Knowledge Management ============
  
  addKnowledge: async (userId, knowledgeData) => {
    try {
      const result = await api.addKnowledge(userId, knowledgeData)
      
      set((state) => ({
        knowledge: [...state.knowledge, result.data],
      }))
      
      return result
    } catch (err) {
      set({ error: err.message })
    }
  },
  
  // ============ AI Features ============
  
  generateSuggestions: async (userLevel) => {
    set({ loading: true })
    try {
      const suggestions = await api.generateTaskSuggestions(userLevel)
      return suggestions.data
    } catch (err) {
      set({ error: err.message })
      return []
    } finally {
      set({ loading: false })
    }
  },
  
  // ============ Utility ============
  
  clearError: () => set({ error: null }),
}))
```

---

## পদক্ষেপ ४: Components এ API integrate করুন

### উদাহরণ: Dashboard.jsx

```javascript
import { useEffect } from 'react'
import { useStore } from '../store/store'

export default function Dashboard() {
  const { 
    userProgress, 
    loading, 
    error,
    initializeData,
    generateSuggestions,
  } = useStore()
  
  // Data load করুন on mount
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      initializeData(userId)
    }
  }, [initializeData])
  
  // Suggestions generate করুন
  const handleGetSuggestions = async () => {
    await generateSuggestions(userProgress.currentLevel)
  }
  
  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Level: {userProgress.currentLevel}</p>
      <button onClick={handleGetSuggestions}>
        Get AI Suggestions
      </button>
    </div>
  )
}
```

---

## পদক্ষেপ ५: FastAPI Backend Example

### ফাইল: `backend/main.py`

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ Models ============

class Task(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    phase: int
    status: str = "pending"
    user_id: int

class Knowledge(BaseModel):
    id: Optional[int] = None
    title: str
    category: str
    level: str
    user_id: int

# ============ Health Check ============

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "career-builder-api"}

# ============ Task Endpoints ============

@app.get("/api/tasks")
async def get_tasks(user_id: int):
    # Database query here
    return {
        "data": [
            {
                "id": 1,
                "title": "Python Setup",
                "phase": 1,
                "status": "completed",
            }
        ]
    }

@app.post("/api/tasks")
async def create_task(task: Task):
    # Save to database
    return {
        "data": {**task.dict(), "id": 1},
        "message": "Task created successfully"
    }

@app.put("/api/tasks/{task_id}")
async def update_task(task_id: int, updates: dict):
    # Update database
    return {
        "data": {"id": task_id, **updates},
        "message": "Task updated"
    }

@app.delete("/api/tasks/{task_id}")
async def delete_task(task_id: int):
    return {"message": "Task deleted"}

# ============ AI Endpoints (Ollama Integration) ============

@app.post("/api/ollama/suggest-tasks")
async def suggest_tasks(request: dict):
    # Use Ollama for AI suggestions
    user_level = request.get('user_level', 1)
    
    # Call Ollama API
    suggestions = generate_with_ollama(
        f"Suggest 3 learning tasks for level {user_level}"
    )
    
    return {"data": suggestions}

@app.post("/api/ollama/learning-plan")
async def create_learning_plan(request: dict):
    goal = request.get('goal', '')
    
    plan = generate_with_ollama(
        f"Create a detailed learning plan for: {goal}"
    )
    
    return {"data": plan}

# ============ Helper Functions ============

def generate_with_ollama(prompt: str):
    import requests
    
    response = requests.post(
        'http://localhost:11434/api/generate',
        json={
            'model': 'mistral',
            'prompt': prompt,
            'stream': False,
        }
    )
    
    return response.json()['response']

# ============ Run ============

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

## পদক্ষেপ ६: Ollama Integration

### ফাইল: `src/api/ollama.js`

```javascript
const OLLAMA_URL = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434'

// Direct Ollama integration (no backend required)
export const queryOllama = async (prompt, model = 'mistral') => {
  try {
    const response = await fetch(
      `${OLLAMA_URL}/api/generate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
        }),
      }
    )
    
    const data = await response.json()
    return data.response
  } catch (error) {
    console.error('Ollama error:', error)
    throw error
  }
}

// Generate task suggestions
export const generateTasks = async (level) => {
  const prompt = `
    Generate 5 practical learning tasks for a developer at level ${level}.
    Format as JSON array with: { title, description, days_to_complete }
  `
  
  const response = await queryOllama(prompt)
  return JSON.parse(response)
}

// Generate learning plan
export const generatePlan = async (goal) => {
  const prompt = `
    Create a detailed 12-week learning plan for: ${goal}
    Include: phases, weekly goals, resources, and success criteria
  `
  
  const response = await queryOllama(prompt)
  return response
}
```

---

## পদক্ষেপ ७: Error Handling

### সাধারণ Pattern

```javascript
// ✅ Good error handling
export const safeFetch = async (url, options) => {
  try {
    const response = await fetch(url, options)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`API call failed: ${url}`, error)
    
    // User-friendly message
    if (error instanceof TypeError) {
      throw new Error('Network error - check your connection')
    }
    
    throw error
  }
}
```

---

## পদক্ষেপ ८: Testing API Integration

### Test file: `src/api/__tests__/api.test.js`

```javascript
import {
  getTasks,
  createTask,
  updateTask,
} from '../api'

// Mock fetch
global.fetch = jest.fn()

describe('API Integration', () => {
  beforeEach(() => {
    fetch.mockClear()
  })
  
  test('should fetch tasks', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [{ id: 1, title: 'Task 1' }]
      })
    })
    
    const result = await getTasks(1)
    expect(result.data).toHaveLength(1)
  })
  
  test('should handle API errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    })
    
    try {
      await getTasks(1)
      fail('Should throw error')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
```

---

## Checklist: Local Testing

আপনার backend সাথে সংযোগ পরীক্ষা করার আগে:

- [ ] Backend server চলছে (localhost:8000)
- [ ] CORS enabled আছে backend এ
- [ ] JWT tokens properly configured
- [ ] Database connected এবং ready
- [ ] Environment variables সঠিকভাবে সেট
- [ ] Browser DevTools > Network tab check করছেন
- [ ] Console errors দেখছেন

---

## সম্পূর্ণ Workflow

```
User Action (UI)
    ↓
Component (React)
    ↓
API Service (src/api/api.js)
    ↓
Backend (FastAPI)
    ↓
Ollama (AI)
    ↓
Database
    ↓
Response Back → Update Zustand Store → Re-render Component
```

---

**এখন আপনার React frontend Backend এর সাথে সম্পূর্ণভাবে সংযুক্ত! 🚀**

পরবর্তী: Database setup এবং Authentication implement করুন।
