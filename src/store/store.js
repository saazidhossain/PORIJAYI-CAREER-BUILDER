import create from 'zustand';

const useStore = create((set) => ({
  // User Progress
  userProgress: {
    currentLevel: 1,
    totalHoursLearned: 0,
    skillPoints: 0,
    completedCourses: 0,
  },

  // Roadmap Tasks
  roadmapTasks: [
    {
      id: 1,
      title: 'Python এবং Environment সেটআপ',
      description: 'Python 3.11+ ইনস্টল এবং Virtual Environment তৈরি',
      phase: 1,
      status: 'pending', // pending, in-progress, completed
      dueDate: '2026-04-10',
      priority: 'high',
      resources: ['python.org', 'Virtual Env Guide'],
      checklist: [
        { id: 1, text: 'Python ডাউনলোড করুন', completed: false },
        { id: 2, text: 'PATH যুক্ত করুন', completed: false },
        { id: 3, text: 'Virtual env তৈরি করুন', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Ollama এবং প্রথম মডেল',
      description: 'Ollama ইনস্টল এবং Mistral মডেল চালান',
      phase: 1,
      status: 'pending',
      dueDate: '2026-04-15',
      priority: 'high',
      resources: ['ollama.ai', 'API Documentation'],
      checklist: [
        { id: 1, text: 'Ollama ডাউনলোড করুন', completed: false },
        { id: 2, text: 'Mistral pull করুন', completed: false },
        { id: 3, text: 'সার্ভার চালান', completed: false },
      ],
    },
    {
      id: 3,
      title: 'FastAPI সার্ভার তৈরি',
      description: 'প্রথম REST API endpoint তৈরি করুন',
      phase: 2,
      status: 'pending',
      dueDate: '2026-04-22',
      priority: 'high',
      resources: ['FastAPI Docs', 'Tutorial'],
      checklist: [
        { id: 1, text: 'FastAPI ইনস্টল করুন', completed: false },
        { id: 2, text: '/query endpoint তৈরি করুন', completed: false },
        { id: 3, text: 'Swagger UI দিয়ে পরীক্ষা করুন', completed: false },
      ],
    },
  ],

  // Knowledge Items
  knowledge: [
    {
      id: 1,
      title: 'Neural Networks বেসিক',
      category: 'AI/ML',
      level: 'beginner',
      progress: 0,
      importance: 'high',
      resources: [
        { type: 'video', url: 'https://youtu.be/...', title: 'NN Fundamentals' },
        { type: 'article', url: '#', title: 'What is Neural Network' },
      ],
    },
  ],

  // Methods
  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      roadmapTasks: state.roadmapTasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    })),

  updateTaskProgress: (taskId, checklistId) =>
    set((state) => ({
      roadmapTasks: state.roadmapTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              checklist: task.checklist.map((item) =>
                item.id === checklistId
                  ? { ...item, completed: !item.completed }
                  : item
              ),
            }
          : task
      ),
    })),

  updateUserProgress: (updates) =>
    set((state) => ({
      userProgress: { ...state.userProgress, ...updates },
    })),

  addTask: (task) =>
    set((state) => ({
      roadmapTasks: [...state.roadmapTasks, task],
    })),

  addKnowledge: (item) =>
    set((state) => ({
      knowledge: [...state.knowledge, item],
    })),
}));

export default useStore;
