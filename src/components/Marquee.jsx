const ITEMS = [
  'Python',
  'TypeScript',
  'JavaScript',
  'React',
  'Node.js',
  'Flask',
  'Express',
  'REST APIs',
  'MySQL',
  'SQLite',
  'AWS',
  'Docker',
  'GitHub Actions',
  'CI/CD',
  'LangChain',
  'RAG',
  'Agentic AI',
  'TensorFlow',
  'XGBoost',
  'Git',
]

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.02] py-5">
      <div className="marquee-mask flex overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 pr-10 whitespace-nowrap hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <span
              key={`${item}-${i}`}
              aria-hidden={i >= ITEMS.length}
              className="flex items-center gap-10 font-mono text-sm text-slate-500"
            >
              <span>{item}</span>
              <span className="text-glow-400">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}