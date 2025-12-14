import { Clock, CodeXml, Pin, Save, Search, Terminal } from "lucide-react";

export const features = [
  {
    Icon: Save,
    title: "Save Snippets Instantly",
    description:
      "Quickly save any piece of code form anywhere with just a few clicks.",
  },
  {
    Icon: Pin,
    title: "Organize with Tags",
    description:
      "Use tags to categorize your snippets for easy retrieval and management.",
  },
  {
    Icon: CodeXml,
    title: "Syntax Highlighting",
    description:
      "Automatically highlight your code snippets with syntax highlighting.",
  },
  {
    Icon: Search,
    title: "Powerful Smart Search",
    description:
      "Find the exact snippet you need in seconds with our intelligent search engine.",
  },
];

export const steps = [
  {
    step: 1,
    title: "Create Snippet",
    description:
      "Easily create and save new code snippets from your browser or editor.",
  },
  {
    step: 2,
    title: "Organize & Tag",
    description:
      "Add tags and description to keep your code library neat and searchable.",
  },
  {
    step: 3,
    title: "Access Anywhere",
    description:
      "Your snippets are synced to the cloud, accessible from any device.",
  },
];

export const stats = [
  {
    Icon: CodeXml,
    title: "Total Snippets",
    count: "1,209",
  },
  {
    Icon: Terminal,
    title: "Language Count",
    count: "12",
  },
  {
    Icon: Pin,
    title: "Pinned Snippets",
    count: "28",
  },
  {
    Icon: Clock,
    title: "Recent Activity",
    count: "05",
  },
];

export const languages = [
  "JavaScript",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "Go",
  "Ruby",
  "PHP",
  "TypeScript",
  "Kotlin",
  "Swift",
  "Scala",
  "Perl",
  "Haskell",
  "Elixir",
  "Dart",
  "R",
  "MATLAB",
  "HTML",
  "CSS",
  "SQL",
  "JSON",
  "XML",
  "Golang",
  "Rust",
  "Bash"
];

export const tags = [
  "algorithm",
  "api",
  "async",
  "authentication",
  "backend",
  "binary-tree",
  "cli",
  "cloud-functions",
  "cms",
  "compiler",
  "caching",
  "containerization",
  "continuous-integration",
  "data-structures",
  "database",
  "devops",
  "encryption",
  "event-driven",
  "frontend",
  "framework",
  "http",
  "ide",
  "immutable",
  "javascript",
  "json",
  "linux",
  "machine-learning",
  "microservices",
  "middleware",
  "oop",
  "orm",
  "parallel-processing",
  "performance",
  "react",
  "refactoring",
  "rest-api",
  "scripting",
  "security",
  "serverless",
  "testing",
  "threading",
  "typescript",
  "version-control",
  "virtualization",
  "websocket",
];

// Mock data pools
const titles = [
  "Debounce Function",
  "React useFetch Hook",
  "JWT Auth Middleware",
  "Array Chunk Utility",
  "Next.js API Route",
  "String Formatter",
  "MongoDB Query Helper",
  "Promise Retry Logic",
  "CSS Center Trick",
  "Node File Uploader",
];

const descriptions = [
  "A handy utility to optimize performance.",
  "Useful for API handling in frontend apps.",
  "Reusable logic for backend authentication.",
  "A snippet for manipulating arrays efficiently.",
  "Commonly used pattern in frontend projects.",
  "Lightweight helper used in multiple modules.",
  "Performance optimized implementation.",
  "Short and clean example for everyday use.",
];

const tagPool = [
  "react",
  "utils",
  "hooks",
  "node",
  "api",
  "auth",
  "css",
  "array",
  "performance",
  "frontend",
  "backend",
];

// Helper to pick random item
const r = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

// Helper for random ID
const randomId = () => crypto.randomUUID();

// Generate a random snippet
export function generateSnippet() {
  return {
    _id: randomId(),
    title: r(titles),
    language: r(languages),
    description: r(descriptions),
    updatedAt: new Date(Date.now() - Math.random() * 1e10).toISOString(),
    tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
      r(tagPool)
    ).filter((v, i, a) => a.indexOf(v) === i), // remove duplicates
  };
}

// Generate multiple snippets
export function generateSnippets(count = 5) {
  return Array.from({ length: count }, generateSnippet);
}

export const snippet = {
  _id: "snip_" + Math.random().toString(36).slice(2),
  title: "Debounce Function",
  language: "JavaScript",
  description:
    "A utility function that delays invoking a callback until after a pause in rapid events—useful for search inputs, resize handlers, and performance optimization.",
  tags: ["JavaScript", "API", "React"],
  updated: "2 days ago",
  code: `function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Example:
const handleInput = debounce((value) => {
  console.log("Search:", value);
}, 500);`,
};

export const snippetFolders = [
  "React",
  "ReactHooks",
  "NextJS",
  "NodeJS",
  "Express",
  "API",
  "Database",
  "SQL",
  "MongoDB",
  "Auth",
  "UI",
  "Components",
  "Styles",
  "CSS",
  "Tailwind",
  "Utils",
  "Helpers",
  "Algorithms",
  "Validation",
  "Testing",
  "Types",
  "ErrorHandling",
  "Config",
  "Performance",
  "Animations",
];
