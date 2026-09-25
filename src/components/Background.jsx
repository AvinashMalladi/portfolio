export default function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden bg-ink-950" aria-hidden="true">
        <div className="grid-overlay absolute inset-0" />
        <div className="animate-blob absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-brand-500/20 blur-[120px]" />
        <div className="animate-blob animation-delay-4000 absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-glow-400/15 blur-[120px]" />
        <div className="animate-blob animation-delay-8000 absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="noise absolute inset-0" />
      </div>
      <div className="film-grain fixed inset-0 z-[65] pointer-events-none" aria-hidden="true" />
      <div className="vignette fixed inset-0 z-[70] pointer-events-none" aria-hidden="true" />
    </>
  )
}