import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { GithubIcon } from './BrandIcons'
import { profile } from '../data/profile'

const CURATED = [
  {
    name: 'sru-assist',
    title: 'SRU College AI Assistant',
    description:
      'RAG-powered chatbot that answers admissions, hostel, and academics queries straight from SR University’s knowledge base — vector search + LLM, served through a fast API.',
    tags: ['Python', 'RAG', 'LangChain', 'Vector DB'],
  },
  {
    name: 'smart-disaster-relief-system',
    title: 'Smart Disaster Relief System',
    description:
      'IoT + drone-based flood analysis and relief-coordination platform — live sensor telemetry, affected-area mapping, and automated aid routing.',
    tags: ['HTML/CSS/JS', 'IoT', 'Drones', 'GIS'],
  },
  {
    name: 'AI-Code-Debugger',
    title: 'AI Code Debugger',
    description:
      'Static-analysis tool that inspects Python for common bugs and style violations, then suggests precise fixes with explanations.',
    tags: ['Python', 'Static Analysis', 'Parsing'],
  },
  {
    name: 'Generative-AI-2025',
    title: 'Generative AI Lab',
    description:
      'Hands-on GenAI experiments — prompt engineering, RAG pipelines, fine-tuning, and evaluation notebooks for production LLM workflows.',
    tags: ['Python', 'GenAI', 'RAG', 'Transformers'],
  },
  {
    name: 'AI-Assistant-Coding',
    title: 'AI-Assisted Coding',
    description:
      'Notebook-driven study of AI coding assistants: generating, reviewing, and refactoring real-world code with copilots.',
    tags: ['Python', 'Jupyter', 'CodeGen'],
  },
  {
    name: 'food-delivery',
    title: 'Food Delivery Platform',
    description:
      'Full-featured food-delivery app — restaurant browsing, cart, and order flow built with modern JavaScript.',
    tags: ['JavaScript', 'ES6+', 'UI/UX'],
  },
]

function CodeCard({ repo, index }) {
  return (
    <motion.a
      href={`https://github.com/${profile.links.github.split('/').pop()}/${repo.name}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="glass glow-border group relative flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1.5 hover:border-glow-400/40"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-5 font-display text-4xl font-bold text-white/[0.05] transition-colors duration-300 group-hover:text-white/[0.12]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors group-hover:text-glow-400">
          <GithubIcon size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-xs text-slate-500">{repo.name}.git</p>
          <h3 className="truncate font-display text-sm font-semibold text-slate-100 transition-colors group-hover:text-white">
            {repo.title}
          </h3>
        </div>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-glow-400"
        />
      </div>

      <p className="mt-4 flex-1 text-xs leading-relaxed text-slate-400">{repo.description}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {repo.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-1.5 border-t border-white/5 pt-4 font-mono text-[11px] text-slate-500">
        <Star size={11} className="text-slate-600" />
        public · {profile.links.github.split('/').pop()}/
        <span className="truncate text-glow-400/80">{repo.name}</span>
      </div>
    </motion.a>
  )
}

function GitHubRepos() {
  const username = profile.links.github.split('/').pop()

  return (
    <section id="code" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="04 // Code"
          title="Selected work, off GitHub"
          description={`
            A hand-picked slice of my repositories — the projects I’m proud of,
            written up properly. No junk, no throwaway labs.
          `}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CURATED.map((repo, i) => (
            <CodeCard key={repo.name} repo={repo} index={i} />
          ))}
        </div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.45 }}
          href={profile.links.github}
          target="_blank"
          rel="noreferrer"
          className="glass mx-auto mt-10 flex max-w-xl items-center justify-center gap-3 rounded-2xl px-6 py-4 text-sm font-semibold text-slate-200 transition-all hover:-translate-y-1 hover:text-white"
        >
          <GithubIcon size={16} />
          View everything on GitHub
          <span className="font-mono text-xs text-glow-400">@{username} ↗</span>
        </motion.a>
      </div>
    </section>
  )
}

export default GitHubRepos