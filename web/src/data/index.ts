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
  "Rust",
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

export const snippets = [
  {
    title: "Throttle Function",
    description:
      "A utility that limits how often a function can run. Useful for scroll handlers, window resizing, and rate-limited APIs.",
    tags: ["JavaScript", "Performance", "Frontend"],
    updated: "Updated 5 days ago",
    language: "JavaScript",
  },
  {
    title: "Custom Hook: useFetch",
    description:
      "A reusable hook for fetching data inside React components. Handles loading, error states, and caching of responses.",
    tags: ["React", "API", "Hooks"],
    updated: "Updated 1 day ago",
    language: "JavaScript",
  },
  {
    title: "API Request Wrapper",
    description:
      "A lightweight helper to centralize API calls with built-in retries, error normalization, and response parsing.",
    tags: ["JavaScript", "API", "Utilities"],
    updated: "Updated 3 days ago",
    language: "JavaScript",
  },
  {
    title: "LocalStorage Sync",
    description:
      "A utility to sync state with LocalStorage, providing persistence across sessions with minimal boilerplate.",
    tags: ["JavaScript", "Storage", "Web"],
    updated: "Updated 8 hours ago",
    language: "JavaScript",
  },
  {
    title: "React Memoization Patterns",
    description:
      "A collection of patterns using memo, useCallback, and useMemo to optimize component rendering performance.",
    tags: ["React", "Performance", "Memoization"],
    updated: "Updated 4 days ago",
    language: "JavaScript",
  },
];
