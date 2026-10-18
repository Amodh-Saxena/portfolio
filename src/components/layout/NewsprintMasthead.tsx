import { useTheme } from '@/context/ThemeContext'
import { site } from '@/data/site'

export function NewsprintMasthead() {
  const { theme } = useTheme()

  if (theme !== 'newsprint') return null

  // Format today's date in classic newspaper format
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="w-full border-b-4 border-[#111111] bg-[#F9F9F7] text-[#111111] pt-16 sm:pt-20 select-none transition-colors">
      <div className="container-page">
        {/* Top Dateline / Edition strip */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#111111] py-1.5 font-mono text-[0.6875rem] uppercase tracking-widest text-[#525252]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#111111]">VOL. II · NO. 42</span>
            <span className="hidden sm:inline text-[#A3A3A3]">|</span>
            <span className="hidden sm:inline">{today}</span>
          </div>
          <div className="text-center font-bold tracking-wider text-[#CC0000]">
            ★ SPECIAL BROADSHEET EDITION ★
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span>PRICE: 10 SECONDS OF ATTENTION</span>
            <span className="text-[#A3A3A3]">|</span>
            <span>CHENNAI & MUMBAI</span>
          </div>
        </div>

        {/* Newspaper Title / Masthead */}
        <div className="py-6 sm:py-9 text-center border-b border-[#111111]">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#737373] mb-1">
            THE JOURNAL OF RECORD FOR INTELLIGENT SYSTEMS & SCALABLE SOFTWARE
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#111111] leading-[0.95] py-2 uppercase">
            The {site.name.split(' ')[0]} Gazette
          </h1>
          <div className="mt-2 flex items-center justify-center gap-4 text-xs font-serif italic text-[#525252]">
            <span className="h-px w-12 bg-[#111111]/40" />
            <span>"All the Code That's Fit to Ship — Rigor, Scalability, and Proof"</span>
            <span className="h-px w-12 bg-[#111111]/40" />
          </div>
        </div>

        {/* Breaking News Ticker */}
        <div className="flex items-stretch border-b border-[#111111] font-mono text-xs overflow-hidden">
          <div className="flex items-center gap-2 bg-[#CC0000] text-[#F9F9F7] px-3.5 py-1.5 font-bold uppercase tracking-wider shrink-0">
            <span className="size-2 rounded-full bg-[#F9F9F7] animate-ping" />
            <span>WIRE UPDATE</span>
          </div>
          <div className="flex-1 overflow-x-auto whitespace-nowrap py-1.5 px-4 bg-[#E5E5E0]/60 text-[#111111] flex items-center gap-6 scrollbar-none">
            <span className="font-semibold">
              ✦ CANARYML DEPLOYMENTS REACH STEADY-STATE ON KUBERNETES & ARGO ROLLOUTS
            </span>
            <span className="text-[#737373]">·</span>
            <span>
              ✦ FOOD CLASSIFIER INFERENCE RUNS ON MOBILENET WITH ACCURATE NUTRITIONAL BREAKDOWN
            </span>
            <span className="text-[#737373]">·</span>
            <span>
              ✦ HEALTHCARE PLATFORM ARCHITECTURE STABILIZED WITH SPRING BOOT REST APIS
            </span>
            <span className="text-[#737373]">·</span>
            <span className="text-[#CC0000] font-bold">
              ✦ CANDIDATE OPEN FOR SOFTWARE ENGINEERING & AI/ML INTERNSHIPS (GRADUATING 2027)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
