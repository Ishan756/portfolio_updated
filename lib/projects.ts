export type Project = {
  id: number;
  slug: string;
  title: string;
  date: string;
  year: string;
  subtitle: string;
  description: string;
  role: string;
  techStack: string[];
  image: string;
  video?: string;
  liveUrl?: string;
  sourceUrl?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'codesnippets',
    title: 'CodeSnippets',
    date: '09 2025',
    year: '2025',
    subtitle: 'High-performance code sharing platform for developers & students',
    description:
      'A full-stack web application for sharing, storing, and collaborating on code logic. Features a premium "blank canvas" UI with AI-powered code generation via Google Gemini, Cypress E2E testing, and a CI/CD pipeline with GitHub Actions that automatically lints, type-checks, and runs tests on every push.',
    role: 'Full Stack Developer',
    techStack: ['Next.js 14', 'PostgreSQL', 'Prisma', 'Redis', 'Cypress', 'GitHub Actions', 'Google Gemini API', 'Tailwind CSS', 'Framer Motion'],
    image: '/images/codesnippets.png',
    liveUrl: 'https://snippets-nimy.vercel.app/',
    sourceUrl: 'https://github.com/Ishan756/snippets',
  },
  {
    id: 2,
    slug: 'donati',
    title: 'Donati',
    date: '07 2025',
    year: '2025',
    subtitle: 'Modern community-driven crowdfunding platform',
    description:
      'A secure fundraising platform empowering individuals, NGOs, and organizations to raise funds for meaningful causes. Features Google and GitHub OAuth via NextAuth, Razorpay payment integration, MongoDB data storage, an animated responsive dashboard, and email notifications to donors via Nodemailer.',
    role: 'Full Stack Developer',
    techStack: ['Next.js', 'React', 'MongoDB', 'NextAuth', 'Razorpay', 'Nodemailer', 'Tailwind CSS'],
    image: '/images/donnati.png',
    liveUrl: 'https://donati-a2ci.vercel.app/',
    sourceUrl: 'https://github.com/Ishan756/donati',
  },
  {
    id: 3,
    slug: 'gitgpt',
    title: 'RepoGPT',
    date: '05 2025',
    year: '2025',
    subtitle: 'Chat with your GitHub repositories using AI',
    description:
      'A Next.js application that lets you import GitHub repositories into a PostgreSQL + pgvector database and chat with them using natural language. Enables developers to ask codebase-specific questions, explore context, and accelerate internal development workflows through semantic search and RAG.',
    role: 'Full Stack Developer',
    techStack: ['Next.js', 'OpenAI', 'LangChain', 'TypeScript', 'PostgreSQL', 'pgvector', 'pnpm'],
    image: '/images/gitgpt.png',
    // no liveUrl — no Visit Website button
    sourceUrl: 'https://github.com/Ishan756/GitGpt',
  },
  {
    id: 4,
    slug: 'scraping-agent',
    title: 'Lead-Gen Agent',
    date: '03 2025',
    year: '2025',
    subtitle: 'n8n workflow for automated local lead generation',
    description:
      'A production-oriented n8n workflow that automates lead generation from Google Maps, enriches each lead with an AI-generated company summary via Google Gemini, extracts business emails from scraped HTML, stores results in Google Sheets, and sends Telegram completion notifications — all triggered by a simple Telegram command.',
    role: 'Automation Engineer',
    techStack: ['n8n', 'Google Gemini API', 'Apify', 'Google Sheets API', 'Telegram Bot API', 'Docker'],
    image: '/images/scraping_agent.png',
    video: '/assets/videos/Screen Recording 2026-06-01 032625.mp4',
    // no liveUrl — no Visit Website button
    sourceUrl: 'https://github.com/Ishan756/scraping_agent',
  },
  {
    id: 5,
    slug: 'cv-analyzer',
    title: 'CV-Analyzer',
    date: '01 2025',
    year: '2025',
    subtitle: 'ATS resume checker with AI-powered feedback',
    description:
      'An ATS-style resume analysis tool that highlights keyword gaps, structural issues, and rewrite opportunities with clear scoring and actionable feedback. Leverages LangChain and FastAPI to parse uploaded resumes and generate improvement recommendations in seconds.',
    role: 'Full Stack Developer',
    techStack: ['Next.js', 'React', 'Python', 'FastAPI', 'LangChain'],
    image: '/images/cv_analyzer.png',
    // no liveUrl — no Visit Website button
    sourceUrl: 'https://github.com/Ishan756/cv_analyzer',
  },
  {
    id: 6,
    slug: 'unnati',
    title: 'Unnati',
    date: '11 2024',
    year: '2024',
    subtitle: 'AI-powered study assistant for interactive learning',
    description:
      'An AI-powered study platform that transforms educational material into interactive learning experiences. Uses RAG to generate summaries, answer questions based on uploaded documents, and track student progress — helping learners engage more deeply with complex topics.',
    role: 'Full Stack Developer',
    techStack: ['Next.js', 'React', 'FastAPI', 'TypeScript', 'RAG', 'LangChain'],
    image: '/images/unnati.png',
    liveUrl: 'https://f1-assignment.vercel.app/',
    sourceUrl: 'https://github.com/Ishan756/unnati',
  },
  {
    id: 7,
    slug: 'agrilink',
    title: 'AgriLink',
    date: '09 2024',
    year: '2024',
    subtitle: 'Modern agriculture platform connecting farmers and buyers',
    description:
      'A centralized digital marketplace bridging technology and agriculture. Provides farmers with dashboards to showcase products, buyers with discovery and search tools, real-time analytics, and a fully responsive UI — all focused on improving transparency and efficiency in the agricultural ecosystem.',
    role: 'Full Stack Developer',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'PostgreSQL', 'MongoDB', 'Server Actions'],
    image: '/images/agrilink.png',
    liveUrl: 'https://agrilink-8q1mhjiyo-ishan756s-projects.vercel.app/',
    sourceUrl: 'https://github.com/Ishan756/agrilink',
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
