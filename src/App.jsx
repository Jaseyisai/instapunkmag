import { useState, useEffect, useRef } from "react";

const SECTIONS = ["HOME", "HISTORY", "MUSIC", "FASHION", "STORES", "ARTICLES", "CHRISTIAN PUNK", "GALLERY"];

const PUNK_BANDS = [
  { name: "The Clash", era: "1976–1986", origin: "London, UK", genre: "Punk Rock / Post-Punk", desc: "One of the most influential punk bands ever, blending punk with reggae, ska, and rockabilly." },
  { name: "Sex Pistols", era: "1975–1978", origin: "London, UK", genre: "Punk Rock", desc: "Sparked the UK punk explosion. 'Never Mind the Bollocks' remains a defining moment in rock history." },
  { name: "Ramones", era: "1974–1996", origin: "New York, USA", genre: "Punk Rock / Proto-Punk", desc: "The founding fathers of American punk. Fast, loud, short songs that defined the genre." },
  { name: "Dead Kennedys", era: "1978–1986", origin: "San Francisco, USA", genre: "Hardcore Punk", desc: "Savage political satire wrapped in blistering hardcore punk. Jello Biafra's lyrics cut like a razor." },
  { name: "Black Flag", era: "1976–1986", origin: "Los Angeles, USA", genre: "Hardcore Punk", desc: "Henry Rollins-era Black Flag defined American hardcore and DIY touring ethics." },
  { name: "Buzzcocks", era: "1976–2019", origin: "Manchester, UK", genre: "Punk Rock / Pop Punk", desc: "Brought melody and romantic angst to punk, influencing pop-punk for decades." },
  { name: "X-Ray Spex", era: "1976–1995", origin: "London, UK", genre: "Punk Rock / New Wave", desc: "Poly Styrene's sax-driven punk was years ahead of its time — feminist, joyful, chaotic." },
  { name: "Siouxsie and the Banshees", era: "1976–1996", origin: "London, UK", genre: "Post-Punk / Gothic Rock", desc: "Evolved from punk's raw edge into the founders of goth rock. Darkly majestic." },
];

const NEW_MUSIC_CARDS = [
  { title: "Amyl and the Sniffers", genre: "Pub Rock / Punk", desc: "Australia's most ferocious band right now. Raw, sweaty, and absolutely unhinged live.", emoji: "🔥" },
  { title: "Scowl", genre: "Hardcore Punk", desc: "Santa Cruz hardcore with Kat Moss on vocals. Aggressive, political, and one of the most exciting new hardcore acts in years.", emoji: "⚡" },
  { title: "IDLES", genre: "Post-Punk / Art Punk", desc: "Bristol's finest. Brutalist anthems about toxic masculinity, Brexit, and grief. Cathartic punk for the modern age.", emoji: "✊" },
  { title: "Militarie Gun", genre: "Hardcore / Post-Hardcore", desc: "Los Angeles hardcore that somehow sounds like a massive pop record. Hooks sharp enough to draw blood.", emoji: "🎸" },
  { title: "Destroy Boys", genre: "Punk Rock", desc: "Sacramento trio who grew up DIY and never forgot it. Loud, melodic, and completely their own thing.", emoji: "💥" },
  { title: "The Chats", genre: "Garage Punk", desc: "Three Australians who recorded their debut in a shed. The songs are two minutes long. Every one is perfect.", emoji: "🍺" },
];

const TIMELINE = [
  { year: "1974–1975", event: "Proto-Punk Emerges", detail: "The Ramones form in NYC. Television and Patti Smith play CBGB. The blueprint is laid." },
  { year: "1976", event: "Year Zero", detail: "Sex Pistols sign to EMI. The Clash, Buzzcocks, and Siouxsie all form. UK punk explodes." },
  { year: "1977", event: "The Summer of Hate", detail: "'God Save the Queen' hits #1 in the UK despite a BBC ban. Punk is everywhere and everyone is angry." },
  { year: "1978–1980", event: "Hardcore Rises", detail: "Black Flag, Dead Kennedys, and Minor Threat emerge. Faster, harder, more political." },
  { year: "1981–1985", event: "DIY & Zine Culture", detail: "Photocopy zines spread punk philosophy. Independent labels like SST and Dischord thrive." },
  { year: "1991–1994", event: "Punk Goes Mainstream", detail: "Nirvana and Green Day bring punk to the masses. Debates rage about authenticity." },
  { year: "2000s–Now", event: "Global Punk", detail: "Punk scenes flourish in Japan, Brazil, Indonesia, Nigeria, and beyond. The spirit never dies." },
];

const FASHION_ITEMS = [
  { category: "Footwear", items: [
    { name: "Dr. Martens 1460", desc: "The original bovver boot. Steel-toed, air-cushioned, immortal.", icon: "👢" },
    { name: "Converse Chuck Taylor", desc: "Lo-top or hi-top, the canvas sneaker of every punk stage.", icon: "👟" },
    { name: "Creepers", desc: "Thick-soled brothel creepers born in rockabilly, adopted by punk.", icon: "👞" },
    { name: "Vans Old Skool", desc: "West Coast skate/punk staple. Side stripe. Forever.", icon: "👟" },
  ]},
  { category: "Clothing", items: [
    { name: "Ripped Denim", desc: "Slashed jeans with patches, band names, and safety pins.", icon: "👖" },
    { name: "Leather Jacket", desc: "The Perfecto moto jacket, studded and painted — a wearable manifesto.", icon: "🧥" },
    { name: "Band Tee", desc: "Faded, cut up, or bleached. The uniform of the converted.", icon: "👕" },
    { name: "Tartan / Plaid", desc: "McLaren and Westwood weaponized tartan as anti-establishment irony.", icon: "🟥" },
  ]},
  { category: "Accessories", items: [
    { name: "Spiked Collar", desc: "Borrowed from BDSM, worn as defiance. The original choker.", icon: "🔗" },
    { name: "Safety Pins", desc: "Structural, decorative, symbolic — punk's Swiss army knife.", icon: "📌" },
    { name: "Studded Belt", desc: "Pyramid or spike studs on leather. Functional and aggressive.", icon: "🔩" },
    { name: "Mohawk / Liberty Spikes", desc: "Hair as sculpture. Egg whites, gelatin, or glue — whatever works.", icon: "💈" },
  ]},
];

const DIY_PROJECTS = [
  {
    title: "The Studded Leather Jacket",
    difficulty: "INTERMEDIATE",
    time: "3–5 hours",
    cost: "$15–$40",
    emoji: "🧥",
    tools: ["Thrifted leather or faux-leather jacket", "Pyramid or spike studs (bulk pack)", "Awl or leather punch", "Pliers", "Marker or chalk"],
    steps: [
      "Plan your stud pattern on paper first — rows, chaos, symbols, or band logos. Transfer the design to the jacket with chalk.",
      "Use the awl or leather punch to make a small hole at each marked point. Apply even pressure — don't rush or the leather will tear.",
      "Push each stud prong through the hole from the outside. On the inside, use pliers to fold the prongs flat against the liner.",
      "For spike studs, screw the spike onto the post from outside. Tighten firmly but don't over-torque.",
      "Add painted details with fabric or leather paint using a stiff brush or stencil. Seal with a matte fabric sealer.",
    ],
    tips: "Thrift stores are the best source for jackets — look for real leather when possible. Faux leather works but prongs can tear over time. Bulk stud packs on Amazon or AliExpress cost a fraction of craft store prices.",
  },
  {
    title: "Ripped & Patched Denim",
    difficulty: "BEGINNER",
    time: "1–2 hours",
    cost: "$0–$10",
    emoji: "👖",
    tools: ["Old jeans or jacket", "Scissors or seam ripper", "Sandpaper (medium grit)", "Fabric patches or old band tees", "Needle & thread or fabric glue", "Safety pins"],
    steps: [
      "Lay jeans flat and mark tear locations with chalk — knees, thighs, and back pockets work best. Cut horizontal slits, then pull threads vertically to create fringe.",
      "Rub sandpaper along edges, hems, and pocket corners to distress the fabric. The more uneven, the more authentic it looks.",
      "Cut patches from old band tees, thrift store finds, or printed fabric. Size them slightly larger than the holes or areas you want to cover.",
      "Sew patches on by hand with a visible running stitch in contrasting thread — imperfect stitching is the goal. Or use fabric glue for a faster bond.",
      "Add safety pins along seams, through patch edges, or clustered at the waistband for a classic punk accent.",
      "Write band names, slogans, or symbols with a fabric marker or fabric paint pen directly on the denim.",
    ],
    tips: "Washing the finished piece once or twice will naturally fray the rips further. The more you wear it, the better it looks. Never dry-clean punk denim.",
  },
  {
    title: "Screen-Printed Band Tee",
    difficulty: "INTERMEDIATE",
    time: "2–4 hours + drying time",
    cost: "$20–$50 for supplies (reusable)",
    emoji: "👕",
    tools: ["Plain tee (thrifted or blank)", "Speedball screen printing ink", "Silk screen frame (or DIY with embroidery hoop + sheer curtain)", "Squeegee or old credit card", "Transparency film + printer", "Photo emulsion kit (Mod Podge works for basic designs)", "Painter's tape"],
    steps: [
      "Design your image in black and white on a computer. Simple, high-contrast graphics work best for beginners. Print onto transparency film.",
      "Coat your screen with photo emulsion in a dark room. Let it dry completely (1–2 hours). Tape your transparency to the screen.",
      "Expose the screen to bright light for 1–2 minutes. The emulsion hardens everywhere except under the black ink of your design.",
      "Rinse the screen with water — the unexposed areas wash away, leaving open mesh in the shape of your design.",
      "Lay the tee flat with cardboard inside to prevent bleed-through. Place the screen on top. Apply a line of ink above the design.",
      "Pull the squeegee firmly across the screen in one smooth stroke. Lift the screen straight up. Repeat if needed for opacity.",
      "Heat-set the ink with an iron (medium heat, no steam) or a heat gun to make it permanent and washable.",
    ],
    tips: "The Mod Podge method skips emulsion entirely — paint Mod Podge directly onto the screen in the negative space of your design. Cheaper but less durable. Great for one-off prints.",
  },
  {
    title: "DIY Spiked Collar & Cuffs",
    difficulty: "BEGINNER",
    time: "45 min – 1 hour",
    cost: "$8–$20",
    emoji: "🔗",
    tools: ["Wide leather or faux-leather strip (belt or craft store)", "Spike or pyramid studs", "Hole punch", "Pliers", "Belt buckle or D-rings + Chicago screws", "Ruler & marker"],
    steps: [
      "Cut the leather strip to your neck or wrist measurement plus 2 inches. Round or cut the ends at an angle for a clean finish.",
      "Mark stud positions evenly along the center of the strip with a ruler and marker. Punch a hole at each mark.",
      "Insert studs from the front, fold prongs flat on the back with pliers. For screw-back spikes, insert the post and tighten the spike from outside.",
      "Punch holes at one end for the buckle tongue. Attach a belt buckle using a Chicago screw or by folding the leather over a bar and stitching.",
      "Optional: add D-rings, chains, or a padlock for extra detail. Layer two collars at different widths for a stacked look.",
    ],
    tips: "Hardware stores sell leather strapping cheaply. Old belts from thrift stores are ideal — they're already the right width and thickness. For wrist cuffs, duplicate the process with a shorter strip.",
  },
  {
    title: "Bleach & Dye Destruction Tee",
    difficulty: "BEGINNER",
    time: "30 min + drying",
    cost: "$3–$10",
    emoji: "🎨",
    tools: ["Dark cotton tee", "Household bleach (undiluted)", "Spray bottle", "Rubber gloves", "Drop cloth or trash bags", "Optional: Rit dye in red or yellow", "Stencils (tape, paper cutouts)"],
    steps: [
      "Work outside or in a very well-ventilated space. Lay the tee on the drop cloth. Put on rubber gloves — bleach will burn and stain skin and clothing.",
      "For a splatter effect: dip a brush in bleach and flick it at the tee from 12–18 inches. For a spray effect: fill a spray bottle with bleach and mist from different angles.",
      "For stenciled designs: cut a shape from cardstock or use tape to block areas. Apply bleach carefully inside the stencil with a brush.",
      "Wait 10–20 minutes. Watch the color change — black becomes orange-red, navy becomes pale blue, dark red becomes pink. Rinse thoroughly in cold water.",
      "Optional second step: while still damp, apply diluted fabric dye over the bleached areas for a two-tone or color-explosion effect.",
      "Machine wash cold on its own (bleach will continue to affect other fabrics). Air dry.",
    ],
    tips: "Never mix bleach with ammonia-based cleaners — toxic fumes. Rinse the spray bottle thoroughly after use. Old band tees that are already faded bleach beautifully into a washed-out look.",
  },
  {
    title: "The Battle Vest (Cut-Off)",
    difficulty: "BEGINNER",
    time: "1 hour + ongoing",
    cost: "$5–$15 to start",
    emoji: "🦺",
    tools: ["Denim jacket (thrift store)", "Scissors", "Seam ripper", "Iron-on or sew-on patches", "Fabric paint or markers", "Safety pins, pins, badges"],
    steps: [
      "Cut the sleeves off the jacket close to the shoulder seam using sharp scissors. Use a seam ripper to remove any remaining threads cleanly.",
      "Fray the armhole edges and hem by rubbing with sandpaper or pulling threads with a pin. Wash once to encourage natural fraying.",
      "Iron-on patches go on the back panel first — this is your canvas. Layout before committing: spread all patches on a table to plan placement.",
      "Sew patches around the edges after ironing for permanence. A backstitch in visible thread adds to the handmade aesthetic.",
      "Add painted elements: stencil an anarchy symbol, paint band logos freehand, or write slogans with a paint pen.",
      "The battle vest is never finished. Add pins, buttons, and badges over time. It should tell the story of shows you've attended.",
    ],
    tips: "The back panel is the centerpiece — usually one large patch or a hand-painted mural. Side panels and front lapels are for collections of smaller pins and patches. There are no rules, only your own history.",
  },
];

const DIY_TOOLS_ESSENTIALS = [
  { name: "Leather Punch / Awl", use: "Making holes for studs, rivets, eyelets, and lacing in leather and thick fabric.", emoji: "🔨" },
  { name: "Flat-Nose Pliers", use: "Folding stud prongs, bending wire, and tightening hardware without marring surfaces.", emoji: "🔧" },
  { name: "Fabric Paint (Tulip / Jacquard)", use: "Painting designs directly on fabric. Heat-set for permanence. Available in metallics, neons, and matte black.", emoji: "🎨" },
  { name: "Seam Ripper", use: "Removing stitching cleanly. Essential for deconstructing garments and removing logos.", emoji: "✂️" },
  { name: "Heavy-Duty Needle & Thread", use: "Hand-sewing patches onto denim and leather. Use upholstery thread for strength. Visible stitches are part of the aesthetic.", emoji: "🪡" },
  { name: "Speedball Screen Printing Ink", use: "Fabric-ready, vibrant, washable. Available at craft stores. Works on any natural fiber.", emoji: "🖨️" },
  { name: "Safety Pins (bulk)", use: "Structural, decorative, and symbolic. Keep a bag of assorted sizes at all times.", emoji: "📌" },
  { name: "Bleach + Spray Bottle", use: "Controlled destruction of dark fabrics. Transform a $2 thrift tee into something striking.", emoji: "💧" },
];

const ARTICLES = [
  {
    title: "The Anatomy of a Perfect Punk Riff",
    category: "Music",
    excerpt: "Three chords, maximum fury. How punk distilled rock and roll down to its bare bones — and why that simplicity turned out to be the most radical thing anyone ever did with a guitar.",
    readTime: "7 min read",
    emoji: "🎸",
  },
  {
    title: "Punk Venues: The Dying Heartbeat of the Scene",
    category: "Culture",
    excerpt: "From CBGB to your city's basement — the small venues where punk lives are disappearing fast. Why saving them matters more than any reunion tour.",
    readTime: "6 min read",
    emoji: "🏚️",
  },
  {
    title: "How to Build a Battle Jacket That Tells Your Story",
    category: "DIY",
    excerpt: "The cut-off denim vest is punk's most personal canvas. A guide to sourcing patches, planning your back panel, and building a wearable autobiography one pin at a time.",
    readTime: "5 min read",
    emoji: "🦺",
  },
  {
    title: "Ska Punk: The Genre Everyone Pretends to Forget",
    category: "Music",
    excerpt: "Horns, checkered patterns, and mosh pits — ska punk had its moment and the internet will never let it live it down. But here's the thing: it was actually great.",
    readTime: "8 min read",
    emoji: "🎺",
  },
  {
    title: "Faith and Fury: Inside the Christian Hardcore Scene",
    category: "Faith",
    excerpt: "Long before Underoath played arenas, Christian hardcore was a sweaty secret shared between believers in basements. The theology was heavy. The breakdowns were heavier.",
    readTime: "9 min read",
    emoji: "✝️",
  },
  {
    title: "Dr. Martens: From Factory Floors to Punk Icons",
    category: "Fashion",
    excerpt: "Klaus Märtens designed them for his sore ankle. British skinheads adopted them. Punks made them immortal. The strange, working-class journey of the world's most rebellious boot.",
    readTime: "6 min read",
    emoji: "👢",
  },
];

const CHRISTIAN_PUNK_BANDS = [
  { name: "Underøath", genre: "Post-Hardcore / Metalcore", note: "Tampa's finest. 'They're Only Chasing Safety' is a landmark record." },
  { name: "MxPx", genre: "Pop Punk", note: "Bremerton, WA. Infectiously melodic Christian pop-punk since 1992." },
  { name: "The Chariot", genre: "Hardcore / Post-Hardcore", note: "Chaotic, physical, spiritually intense. Mosh pits as liturgy." },
  { name: "Norma Jean", genre: "Metalcore / Hardcore", note: "Reinvented themselves as a genre-defying force. Heavy theology, heavier riffs." },
  { name: "Switchfoot", genre: "Alternative / Post-Grunge", note: "San Diego surfers. Mainstream crossover with deep spiritual roots." },
  { name: "Five Iron Frenzy", genre: "Ska Punk", note: "Denver's ska-punk legends with satirical, compassionate Christian lyrics." },
  { name: "Anberlin", genre: "Post-Hardcore / Alternative", note: "Melodic Florida post-hardcore. Passionate live performances, thoughtful faith." },
  { name: "Project 86", genre: "Christian Hardcore / Post-Hardcore", note: "Aggressive, literary, and spiritually complex. A thinking-person's hardcore." },
];

const GALLERY_PROMPTS = [
  { prompt: "punk rock concert crowd moshing stage lights dramatic dark atmosphere", alt: "Punk show" },
  { prompt: "studded leather punk jacket spikes patches close up detail photography", alt: "Studded leather jacket" },
  { prompt: "electric guitar close up distortion pedals dark moody punk rock aesthetic", alt: "Guitar close up" },
  { prompt: "punk rock band performing on stage dramatic lighting crowd energy", alt: "Band on stage" },
  { prompt: "punk fashion mohawk hair colorful spikes street style portrait", alt: "Punk style portrait" },
  { prompt: "vintage vinyl records punk albums underground record store aesthetic", alt: "Vinyl records" },
  { prompt: "punk zine collage cut and paste typography anarchy symbols photocopied", alt: "Punk zine" },
  { prompt: "Dr Martens boots worn leather laces punk fashion street photography", alt: "Dr Martens boots" },
];

// Gallery Image Component — generates unique AI image via Pollinations on each load
function GalleryImage({ prompt, alt, span }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const seed = useRef(Math.floor(Math.random() * 999999));

  useEffect(() => {
    let cancelled = false;
    async function fetchImage() {
      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, seed: seed.current }),
        });
        if (!response.ok) throw new Error("Failed");
        const blob = await response.blob();
        if (!cancelled) {
          setImgSrc(URL.createObjectURL(blob));
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }
    fetchImage();
    return () => { cancelled = true; };
  }, [prompt]);

  return (
    <div className="gallery-item" style={span ? { gridColumn: `span ${span}` } : {}}>
      {loading && (
        <div className="gallery-placeholder">
          <div className="gallery-spinner" />
          <span>Generating...</span>
        </div>
      )}
      {error && (
        <div className="gallery-placeholder">
          <span style={{ color: "var(--grey)", fontSize: "0.75rem" }}>Image unavailable</span>
        </div>
      )}
      {imgSrc && (
        <>
          <img src={imgSrc} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="gallery-overlay" />
        </>
      )}
    </div>
  );
}

// DIY Workshop Component
function DIYWorkshop() {
  const [openCard, setOpenCard] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const difficulties = ["ALL", "BEGINNER", "INTERMEDIATE"];
  const filtered = filter === "ALL" ? DIY_PROJECTS : DIY_PROJECTS.filter(p => p.difficulty === filter);

  return (
    <div>
      <div className="diy-filter-bar">
        {difficulties.map(d => (
          <button key={d} className={`diy-filter-btn ${filter === d ? "active" : ""}`} onClick={() => setFilter(d)}>
            {d}
          </button>
        ))}
      </div>

      <div className="diy-projects-grid">
        {filtered.map((project, i) => {
          const isOpen = openCard === i;
          return (
            <div key={i} className="diy-card">
              <div className="diy-card-header" onClick={() => setOpenCard(isOpen ? null : i)}>
                <div className="diy-card-emoji">{project.emoji}</div>
                <div className="diy-card-meta">
                  <div className={`diy-difficulty ${project.difficulty}`}>{project.difficulty}</div>
                </div>
              </div>
              <div className="diy-card-title" onClick={() => setOpenCard(isOpen ? null : i)} style={{cursor:"pointer"}}>{project.title}</div>
              <div className="diy-card-stats">
                <div className="diy-stat">TIME<span>{project.time}</span></div>
                <div className="diy-stat">COST<span>{project.cost}</span></div>
              </div>

              <div className={`diy-card-body ${isOpen ? "open" : ""}`}>
                <div className="diy-tools-list">
                  <div className="diy-tools-label">// YOU'LL NEED</div>
                  {project.tools.map((t, j) => <span key={j} className="diy-tool-chip">{t}</span>)}
                </div>
                <div className="diy-steps-label">// STEPS</div>
                {project.steps.map((step, j) => (
                  <div key={j} className="diy-step">
                    <div className="diy-step-num">{j + 1}</div>
                    <div className="diy-step-text">{step}</div>
                  </div>
                ))}
                <div className="diy-tip">{project.tips}</div>
              </div>

              <button className="diy-toggle-btn" onClick={() => setOpenCard(isOpen ? null : i)}>
                {isOpen ? "▲ COLLAPSE" : "▼ EXPAND TUTORIAL"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="punk-divider"><span>// THE ESSENTIAL DIY TOOLKIT //</span></div>
      <div className="diy-tools-essentials">
        {DIY_TOOLS_ESSENTIALS.map((tool, i) => (
          <div key={i} className="diy-tool-card">
            <div className="diy-tool-emoji">{tool.emoji}</div>
            <div>
              <div className="diy-tool-name">{tool.name}</div>
              <div className="diy-tool-use">{tool.use}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Show Finder Component
function ShowFinder() {
  const [location, setLocation] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function findShows() {
    if (!location.trim()) return;
    setLoading(true);
    setResults(null);
    try {
      const response = await fetch("/api/find-shows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location }),
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([{ venue: "Search Error", band: "", genre: "", vibe: data.error || "Could not find shows. Try a nearby city.", tip: "" }]);
      }
    } catch (e) {
      setResults([{ venue: "Search Error", band: "", genre: "", vibe: "Could not connect. Please try again.", tip: "" }]);
    }
    setLoading(false);
  }

  return (
    <div className="store-finder">
      <div className="finder-controls">
        <input
          type="text"
          placeholder="Enter your city or zip code..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyDown={e => e.key === "Enter" && findShows()}
          className="finder-input"
        />
        <button onClick={findShows} className="finder-btn" disabled={loading}>
          {loading ? "SEARCHING..." : "FIND SHOWS"}
        </button>
      </div>

      {loading && (
        <div className="finder-loading">
          <div className="loading-bars">
            {[...Array(8)].map((_, i) => <span key={i} style={{ animationDelay: `${i * 0.1}s` }} />)}
          </div>
          <p>Scanning the underground...</p>
        </div>
      )}

      {results && (
        <div className="show-results">
          {results.map((show, i) => (
            <div key={i} className="show-card">
              <div className="show-header">
                <div>
                  <div className="show-band">{show.band}</div>
                  <div className="show-venue">📍 {show.venue}</div>
                </div>
                <span className="store-type-badge">{show.genre}</span>
              </div>
              <p className="store-reason">{show.vibe}</p>
              {show.tip && <p className="show-tip">💡 {show.tip}</p>}
            </div>
          ))}
        </div>
      )}

      {!results && !loading && (
        <div className="finder-placeholder">
          <div className="anarchy-symbol">🎸</div>
          <p>Enter your location to find punk shows and venues near you</p>
        </div>
      )}
    </div>
  );
}

// Music Feature Reader Component
function MusicReader({ track, onClose }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeature() {
      try {
        const response = await fetch("/api/generate-music", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: track.title, genre: track.genre, desc: track.desc }),
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setContent(data);
      } catch (e) {
        setError("Could not load feature. Please try again.");
      }
      setLoading(false);
    }
    fetchFeature();
  }, [track]);

  return (
    <div className="article-reader-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="article-reader">
        <button className="article-reader-close" onClick={onClose}>✕ CLOSE</button>

        {loading && (
          <div className="article-reader-loading">
            <div className="loading-bars">
              {[...Array(8)].map((_, i) => <span key={i} style={{ animationDelay: `${i * 0.1}s` }} />)}
            </div>
            <p>Generating music feature...</p>
          </div>
        )}

        {error && <div className="article-reader-error">{error}</div>}

        {content && (
          <div className="article-reader-content">
            <div className="ar-category">{track.genre}</div>
            <h1 className="ar-headline">{content.headline || track.title}</h1>
            <p className="ar-standfirst">{content.standfirst}</p>
            <div className="ar-meta">
              <span>{track.emoji}</span>
              <span>Music Feature</span>
              <span>Insta Punk Mag</span>
            </div>
            <div className="ar-divider" />
            {content.body && content.body.split("\n\n").map((para, i) => {
              if (i === 2 && content.pullquote) {
                return (
                  <div key={i}>
                    <blockquote className="ar-pullquote">{content.pullquote}</blockquote>
                    <p className="ar-para">{para}</p>
                  </div>
                );
              }
              return <p key={i} className="ar-para">{para}</p>;
            })}
            {content.listenTo && (
              <div style={{marginTop:"1.5rem", padding:"1rem", background:"rgba(204,0,0,0.07)", borderLeft:"3px solid var(--red)"}}>
                <div className="diy-tools-label" style={{marginBottom:"0.5rem"}}>// LISTEN TO</div>
                {content.listenTo.map((item, i) => (
                  <div key={i} style={{fontFamily:"'Share Tech Mono', monospace", fontSize:"0.78rem", color:"#ccc", marginBottom:"0.3rem"}}>▶ {item}</div>
                ))}
              </div>
            )}
            {content.tags && (
              <div className="ar-tags">
                {content.tags.map((tag, i) => <span key={i} className="ar-tag">#{tag}</span>)}
              </div>
            )}
            <div className="ar-kofi">
              <p className="ar-kofi-text">Enjoyed this feature? Help keep Insta Punk Mag alive and independent.</p>
              <a href="https://ko-fi.com/instapunkmag" target="_blank" rel="noopener noreferrer" className="kofi-btn">
                ☕ BUY US A COFFEE ON KO-FI
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Article Reader Component
function ArticleReader({ article, onClose }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch("/api/generate-article", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: article.title, category: article.category, excerpt: article.excerpt }),
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setContent(data);
      } catch (e) {
        setError("Could not load article. Please try again.");
      }
      setLoading(false);
    }
    fetchArticle();
  }, [article]);

  return (
    <div className="article-reader-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="article-reader">
        <button className="article-reader-close" onClick={onClose}>✕ CLOSE</button>

        {loading && (
          <div className="article-reader-loading">
            <div className="loading-bars">
              {[...Array(8)].map((_, i) => <span key={i} style={{ animationDelay: `${i * 0.1}s` }} />)}
            </div>
            <p>Generating article...</p>
          </div>
        )}

        {error && <div className="article-reader-error">{error}</div>}

        {content && (
          <div className="article-reader-content">
            <div className="ar-category">{article.category}</div>
            <h1 className="ar-headline">{content.headline || article.title}</h1>
            <p className="ar-standfirst">{content.standfirst}</p>
            <div className="ar-meta">
              <span>{article.emoji}</span>
              <span>{article.readTime}</span>
              <span>Insta Punk Mag</span>
            </div>
            <div className="ar-divider" />
            {content.body && content.body.split("\n\n").map((para, i) => {
              if (i === 2 && content.pullquote) {
                return (
                  <div key={i}>
                    <blockquote className="ar-pullquote">{content.pullquote}</blockquote>
                    <p className="ar-para">{para}</p>
                  </div>
                );
              }
              return <p key={i} className="ar-para">{para}</p>;
            })}
            {content.tags && (
              <div className="ar-tags">
                {content.tags.map((tag, i) => <span key={i} className="ar-tag">#{tag}</span>)}
              </div>
            )}
            <div className="ar-kofi">
              <p className="ar-kofi-text">Enjoyed this article? Help keep Insta Punk Mag alive and independent.</p>
              <a href="https://ko-fi.com/instapunkmag" target="_blank" rel="noopener noreferrer" className="kofi-btn">
                ☕ BUY US A COFFEE ON KO-FI
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Store Finder Component
function StoreFinder() {
  const [location, setLocation] = useState("");
  const [storeType, setStoreType] = useState("all");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  async function findStores() {
    if (!location.trim()) return;
    setLoading(true);
    setResults(null);
    try {
      const response = await fetch("/api/find-stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, storeType }),
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setResults(data);
      } else if (data && data.error) {
        setResults([{ name: "Search Error", type: "Error", reason: data.error, items: "" }]);
      } else {
        setResults([{ name: "No Results", type: "Info", reason: "No stores found for that location. Try a nearby city name instead.", items: "" }]);
      }
    } catch (e) {
      setResults([{ name: "Search Error", type: "Error", reason: "Could not connect to the store finder. Please try again in a moment.", items: "" }]);
    }
    setLoading(false);
  }

  return (
    <div className="store-finder">
      <div className="finder-controls">
        <input
          type="text"
          placeholder="Enter your city or zip code..."
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyDown={e => e.key === "Enter" && findStores()}
          className="finder-input"
        />
        <select value={storeType} onChange={e => setStoreType(e.target.value)} className="finder-select">
          <option value="all">All Store Types</option>
          <option value="mainstream">Punk / Alt Stores</option>
          <option value="thrift">Thrift & Vintage</option>
        </select>
        <button onClick={findStores} className="finder-btn" disabled={loading}>
          {loading ? "SEARCHING..." : "FIND STORES"}
        </button>
      </div>

      {loading && (
        <div className="finder-loading">
          <div className="loading-bars">
            {[...Array(8)].map((_, i) => <span key={i} style={{ animationDelay: `${i * 0.1}s` }} />)}
          </div>
          <p>Locating the underground...</p>
        </div>
      )}

      {results && (
        <div className="store-results">
          {results.map((store, i) => (
            <div key={i} className={`store-card store-card-${store.type?.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '')}`}>
              <div className="store-header">
                <span className="store-name">{store.name}</span>
                <span className="store-type-badge">{store.type}</span>
              </div>
              <p className="store-reason">{store.reason}</p>
              {store.items && <p className="store-items">📦 {store.items}</p>}
            </div>
          ))}
        </div>
      )}

      {!results && !loading && (
        <div className="finder-placeholder">
          <div className="anarchy-symbol">Ⓐ</div>
          <p>Enter your location to find punk shops, thrift stores, and vintage spots near you</p>
        </div>
      )}
    </div>
  );
}

export default function PunkHub() {
  const [activeSection, setActiveSection] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sec) => {
    setActiveSection(sec);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="punk-hub">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Permanent+Marker&family=Oswald:wght@300;400;700&family=Share+Tech+Mono&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black: #0a0a0a;
          --off-black: #111;
          --dark: #1a1a1a;
          --red: #cc0000;
          --red-hot: #ff1a1a;
          --yellow: #f5c400;
          --white: #f0ece2;
          --grey: #888;
          --mid: #333;
          --christian-gold: #c9a84c;
          --christian-purple: #4a1a6b;
        }

        body { background: var(--black); color: var(--white); font-family: 'Oswald', sans-serif; overflow-x: hidden; }

        .punk-hub { min-height: 100vh; background: var(--black); }

        /* === NOISE OVERLAY === */
        .punk-hub::before {
          content: '';
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9999; opacity: 0.4;
        }

        /* === HEADER === */
        .punk-header {
          position: sticky; top: 0; z-index: 100;
          background: var(--black);
          border-bottom: 3px solid var(--red);
          padding: 0 1.5rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem;
          box-shadow: 0 4px 30px rgba(204,0,0,0.4);
        }

        .site-logo {
          font-family: 'Permanent Marker', cursive;
          font-size: clamp(1.4rem, 4vw, 2.2rem);
          color: var(--white);
          letter-spacing: 2px;
          padding: 0.75rem 0;
          text-shadow: 3px 3px 0 var(--red), 5px 5px 0 rgba(204,0,0,0.3);
          white-space: nowrap;
          cursor: pointer;
        }
        .site-logo .sub { font-family: 'Share Tech Mono', monospace; font-size: 0.45em; color: var(--grey); display: block; margin-top: -4px; text-shadow: none; }

        .site-logo.glitch { animation: glitch 0.2s steps(2) forwards; }

        @keyframes glitch {
          0% { clip-path: inset(10% 0 70% 0); transform: translate(-4px, 0); }
          25% { clip-path: inset(50% 0 20% 0); transform: translate(4px, 0); color: var(--yellow); }
          50% { clip-path: inset(30% 0 40% 0); transform: translate(-2px, 0); }
          100% { clip-path: none; transform: translate(0,0); }
        }

        .punk-nav { display: flex; gap: 0; flex-wrap: wrap; }

        .nav-btn {
          background: none; border: none; color: var(--grey);
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.08em;
          padding: 1.1rem 0.7rem;
          cursor: pointer; position: relative;
          transition: color 0.15s;
          white-space: nowrap;
        }
        .nav-btn:hover, .nav-btn.active { color: var(--white); }
        .nav-btn.active::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: var(--red);
        }
        .nav-btn:hover::before {
          content: '//';
          position: absolute; left: -2px;
          color: var(--red); font-size: 0.6rem;
        }

        .hamburger { display: none; background: none; border: 2px solid var(--red); color: var(--red); padding: 0.3rem 0.6rem; font-size: 1.2rem; cursor: pointer; }

        @media (max-width: 768px) {
          .punk-nav { display: none; }
          .punk-nav.open { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: var(--off-black); border-bottom: 3px solid var(--red); z-index: 200; }
          .hamburger { display: block; }
          .nav-btn { padding: 0.8rem 1.5rem; border-bottom: 1px solid var(--mid); }
        }

        /* === HERO === */
        .hero {
          min-height: 80vh;
          background: var(--black);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 4rem 1.5rem;
          position: relative; overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: 
            repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(204,0,0,0.03) 30px, rgba(204,0,0,0.03) 31px),
            repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(204,0,0,0.03) 30px, rgba(204,0,0,0.03) 31px);
        }

        .hero-anarchy {
          font-size: clamp(6rem, 20vw, 14rem);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 2px var(--red);
          font-family: 'Permanent Marker', cursive;
          animation: pulse-border 3s ease-in-out infinite;
          position: relative; z-index: 1;
        }

        @keyframes pulse-border {
          0%, 100% { -webkit-text-stroke-color: var(--red); }
          50% { -webkit-text-stroke-color: var(--yellow); }
        }

        .hero-title {
          font-family: 'Special Elite', cursive;
          font-size: clamp(2.5rem, 8vw, 6rem);
          line-height: 0.9;
          text-transform: uppercase;
          margin: 0.5rem 0;
          position: relative; z-index: 1;
        }
        .hero-title em { color: var(--red); font-style: normal; }

        .hero-sub {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(0.75rem, 2vw, 1rem);
          color: var(--grey);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-top: 1.5rem;
          position: relative; z-index: 1;
        }

        .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 2.5rem; position: relative; z-index: 1; }

        .cta-btn {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.8rem 2rem;
          cursor: pointer; border: none;
          transition: all 0.15s;
        }
        .cta-primary { background: var(--red); color: var(--white); }
        .cta-primary:hover { background: var(--red-hot); transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--yellow); }
        .cta-secondary { background: transparent; color: var(--white); border: 2px solid var(--white); }
        .cta-secondary:hover { background: var(--white); color: var(--black); }

        .diagonal-tape {
          position: absolute; top: 0; right: 0;
          width: 300px; height: 300px;
          background: repeating-linear-gradient(-45deg, var(--red) 0, var(--red) 2px, transparent 2px, transparent 20px);
          opacity: 0.08;
        }

        /* === SECTION WRAPPER === */
        .section-wrap { max-width: 1100px; margin: 0 auto; padding: 4rem 1.5rem; }

        .section-title {
          font-family: 'Special Elite', cursive;
          font-size: clamp(2rem, 5vw, 3.5rem);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          position: relative; display: inline-block;
        }
        .section-title::after {
          content: '';
          display: block; height: 4px;
          background: linear-gradient(90deg, var(--red), var(--yellow), transparent);
          margin-top: 0.3rem;
        }

        .section-sub {
          font-family: 'Share Tech Mono', monospace;
          color: var(--grey); font-size: 0.8rem;
          letter-spacing: 0.15em; margin-bottom: 3rem;
        }

        /* === TIMELINE === */
        .timeline { position: relative; padding-left: 2rem; }
        .timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, var(--red), var(--yellow)); }

        .timeline-item { position: relative; margin-bottom: 2.5rem; padding-left: 1.5rem; }
        .timeline-item::before {
          content: '';
          position: absolute; left: -2.4rem; top: 0.4rem;
          width: 12px; height: 12px; background: var(--red);
          transform: rotate(45deg);
        }

        .timeline-year { font-family: 'Share Tech Mono', monospace; color: var(--yellow); font-size: 0.85rem; letter-spacing: 0.1em; }
        .timeline-event { font-family: 'Special Elite', cursive; font-size: 1.3rem; margin: 0.2rem 0; }
        .timeline-detail { color: #aaa; font-weight: 300; font-size: 0.95rem; line-height: 1.6; }

        /* === BAND GRID === */
        .band-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }

        .band-card {
          background: var(--dark);
          border: 1px solid var(--mid);
          border-top: 3px solid var(--red);
          padding: 1.5rem;
          transition: transform 0.15s, border-color 0.15s;
          position: relative; overflow: hidden;
        }
        .band-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(204,0,0,0.05) 0%, transparent 60%);
        }
        .band-card:hover { transform: translateY(-4px); border-color: var(--red-hot); }

        .band-name { font-family: 'Special Elite', cursive; font-size: 1.4rem; color: var(--red); }
        .band-era { font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: var(--yellow); letter-spacing: 0.1em; margin: 0.2rem 0; }
        .band-genre { font-size: 0.75rem; color: var(--grey); margin-bottom: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; }
        .band-desc { font-size: 0.9rem; color: #ccc; line-height: 1.6; font-weight: 300; }

        /* === FASHION === */
        .fashion-section { margin-bottom: 3rem; }
        .fashion-category { font-family: 'Share Tech Mono', monospace; font-size: 0.75rem; letter-spacing: 0.2em; color: var(--yellow); text-transform: uppercase; border-left: 3px solid var(--yellow); padding-left: 0.75rem; margin-bottom: 1.2rem; }

        .fashion-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; }

        .fashion-item {
          background: var(--dark); border: 1px solid var(--mid);
          padding: 1.2rem; display: flex; gap: 1rem; align-items: flex-start;
          transition: background 0.15s;
        }
        .fashion-item:hover { background: #222; }
        .fashion-icon { font-size: 2rem; flex-shrink: 0; }
        .fashion-name { font-family: 'Special Elite', cursive; font-size: 1.05rem; margin-bottom: 0.3rem; }
        .fashion-desc { font-size: 0.82rem; color: #aaa; line-height: 1.5; font-weight: 300; }

        /* === STORE FINDER === */
        .store-finder { }
        .finder-controls { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem; }

        .finder-input {
          flex: 1; min-width: 200px;
          background: var(--dark); border: 2px solid var(--mid);
          color: var(--white); padding: 0.9rem 1.2rem;
          font-family: 'Share Tech Mono', monospace; font-size: 0.9rem;
          outline: none; transition: border-color 0.15s;
        }
        .finder-input:focus { border-color: var(--red); }
        .finder-input::placeholder { color: var(--grey); }

        .finder-select {
          background: var(--dark); border: 2px solid var(--mid);
          color: var(--white); padding: 0.9rem 1rem;
          font-family: 'Share Tech Mono', monospace; font-size: 0.8rem;
          outline: none; cursor: pointer;
        }

        .finder-btn {
          background: var(--red); color: var(--white); border: none;
          padding: 0.9rem 1.8rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; transition: background 0.15s;
          white-space: nowrap;
        }
        .finder-btn:hover:not(:disabled) { background: var(--red-hot); }
        .finder-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .finder-loading { text-align: center; padding: 3rem; }
        .loading-bars { display: flex; gap: 4px; justify-content: center; margin-bottom: 1rem; }
        .loading-bars span {
          display: block; width: 4px; height: 40px;
          background: var(--red);
          animation: bar-bounce 0.8s ease-in-out infinite alternate;
        }
        @keyframes bar-bounce { from { transform: scaleY(0.2); } to { transform: scaleY(1); } }
        .finder-loading p { font-family: 'Share Tech Mono', monospace; color: var(--grey); font-size: 0.85rem; letter-spacing: 0.1em; }

        .finder-placeholder { text-align: center; padding: 4rem 2rem; border: 2px dashed var(--mid); }
        .anarchy-symbol { font-size: 4rem; color: var(--red); opacity: 0.4; margin-bottom: 1rem; }
        .finder-placeholder p { color: var(--grey); font-family: 'Share Tech Mono', monospace; font-size: 0.85rem; line-height: 1.7; }

        .store-results { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }

        .store-card {
          background: var(--dark); border: 1px solid var(--mid);
          border-left: 4px solid var(--red);
          padding: 1.3rem;
        }
        .store-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.6rem; flex-wrap: wrap; }
        .store-name { font-family: 'Special Elite', cursive; font-size: 1.15rem; }
        .store-type-badge {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.08em;
          background: var(--mid); color: var(--yellow);
          padding: 0.2rem 0.5rem; white-space: nowrap;
        }
        .store-reason { font-size: 0.88rem; color: #ccc; line-height: 1.6; margin-bottom: 0.5rem; font-weight: 300; }
        .store-items { font-family: 'Share Tech Mono', monospace; font-size: 0.75rem; color: var(--grey); }

        /* === ARTICLES === */
        .article-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.2rem; }

        .article-card {
          background: var(--dark); border: 1px solid var(--mid);
          padding: 1.5rem; cursor: pointer;
          transition: transform 0.15s, border-color 0.15s;
          position: relative; overflow: hidden;
        }
        .article-card::after {
          content: '→ READ MORE';
          position: absolute; bottom: 1.5rem; right: 1.5rem;
          font-family: 'Share Tech Mono', monospace; font-size: 0.65rem;
          color: var(--red); letter-spacing: 0.1em; opacity: 0;
          transition: opacity 0.15s;
        }
        .article-card:hover { transform: translateY(-4px); border-color: var(--grey); }
        .article-card:hover::after { opacity: 1; }

        .article-emoji { font-size: 2.5rem; margin-bottom: 0.75rem; display: block; }
        .article-category { font-family: 'Share Tech Mono', monospace; font-size: 0.65rem; letter-spacing: 0.15em; color: var(--yellow); text-transform: uppercase; margin-bottom: 0.4rem; }
        .article-title { font-family: 'Special Elite', cursive; font-size: 1.25rem; margin-bottom: 0.7rem; line-height: 1.3; }
        .article-excerpt { font-size: 0.88rem; color: #bbb; line-height: 1.7; font-weight: 300; margin-bottom: 1rem; }
        .article-read-time { font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: var(--grey); }

        /* === CHRISTIAN PUNK === */
        .christian-section { background: linear-gradient(135deg, var(--off-black) 0%, #150a1e 100%); border: 2px solid var(--christian-purple); padding: 2.5rem; margin-bottom: 2rem; }

        .christian-intro { font-size: 1rem; color: #ccc; line-height: 1.8; font-weight: 300; max-width: 700px; margin-bottom: 2.5rem; border-left: 3px solid var(--christian-gold); padding-left: 1.25rem; }

        .christian-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }

        .christian-card {
          background: rgba(74,26,107,0.2); border: 1px solid var(--christian-purple);
          border-top: 3px solid var(--christian-gold);
          padding: 1.3rem;
          transition: transform 0.15s;
        }
        .christian-card:hover { transform: translateY(-3px); }
        .christian-band-name { font-family: 'Special Elite', cursive; font-size: 1.15rem; color: var(--christian-gold); margin-bottom: 0.2rem; }
        .christian-genre { font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: #a87fd0; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.6rem; }
        .christian-note { font-size: 0.87rem; color: #ccc; line-height: 1.6; font-weight: 300; }

        .christian-values {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0.75rem; margin-top: 2rem;
        }
        .value-chip {
          background: rgba(201,168,76,0.1); border: 1px solid var(--christian-gold);
          padding: 0.8rem 1rem;
          font-family: 'Share Tech Mono', monospace; font-size: 0.75rem;
          color: var(--christian-gold); letter-spacing: 0.05em;
          text-align: center;
        }

        /* === GALLERY === */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 200px);
          gap: 0.5rem;
        }

        @media (max-width: 600px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(4, 150px); }
        }

        .gallery-item {
          overflow: hidden; position: relative; cursor: pointer;
        }
        .gallery-item:nth-child(1) { grid-column: span 2; grid-row: span 1; }
        .gallery-item:nth-child(5) { grid-column: span 2; }

        .gallery-item img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.4s, filter 0.4s;
          filter: grayscale(40%) contrast(1.1);
        }
        .gallery-item:hover img { transform: scale(1.06); filter: grayscale(0%) contrast(1.2); }
        .gallery-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(204,0,0,0.4), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .gallery-item:hover .gallery-overlay { opacity: 1; }

        .video-section { margin-top: 2rem; }
        .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem; }

        .video-embed {
          aspect-ratio: 16/9; background: var(--dark); border: 1px solid var(--mid);
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 1rem; cursor: pointer;
          position: relative; overflow: hidden;
          transition: border-color 0.15s;
        }
        .video-embed:hover { border-color: var(--red); }
        .video-play { font-size: 3rem; color: var(--red); }
        .video-title { font-family: 'Share Tech Mono', monospace; font-size: 0.75rem; color: var(--grey); text-align: center; padding: 0 1rem; letter-spacing: 0.05em; }

        .show-results { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }
        .show-card { background: var(--dark); border: 1px solid var(--mid); border-left: 4px solid var(--yellow); padding: 1.3rem; }
        .show-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.6rem; flex-wrap: wrap; }
        .show-band { font-family: 'Special Elite', cursive; font-size: 1.2rem; margin-bottom: 0.2rem; }
        .show-venue { font-family: 'Share Tech Mono', monospace; font-size: 0.72rem; color: var(--grey); letter-spacing: 0.05em; }
        .show-tip { font-family: 'Share Tech Mono', monospace; font-size: 0.72rem; color: var(--yellow); margin-top: 0.5rem; }

        .new-music-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .new-music-card {
          background: var(--dark); border: 1px solid var(--mid);
          border-top: 3px solid var(--yellow);
          padding: 1.3rem; cursor: pointer;
          transition: transform 0.15s, border-color 0.15s;
          position: relative; overflow: hidden;
        }
        .new-music-card:hover { transform: translateY(-4px); border-top-color: var(--red); }
        .new-music-card:hover::after { content: '→ READ FEATURE'; position: absolute; bottom: 1rem; right: 1rem; font-family: 'Share Tech Mono', monospace; font-size: 0.65rem; color: var(--red); letter-spacing: 0.1em; }
        .new-music-emoji { font-size: 2rem; margin-bottom: 0.5rem; display: block; }
        .new-music-genre { font-family: 'Share Tech Mono', monospace; font-size: 0.65rem; letter-spacing: 0.15em; color: var(--yellow); text-transform: uppercase; margin-bottom: 0.4rem; }
        .new-music-title { font-family: 'Special Elite', cursive; font-size: 1.3rem; margin-bottom: 0.5rem; }
        .new-music-desc { font-size: 0.87rem; color: #bbb; line-height: 1.65; font-weight: 300; }

        /* === DIY SECTION === */
        .diy-section-header {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 2rem;
        }
        .diy-badge {
          background: var(--yellow); color: var(--black);
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.15em;
          padding: 0.3rem 0.7rem; font-weight: bold;
        }

        .diy-filter-bar {
          display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;
        }
        .diy-filter-btn {
          background: var(--dark); border: 1px solid var(--mid);
          color: var(--grey); padding: 0.45rem 1rem;
          font-family: 'Share Tech Mono', monospace; font-size: 0.7rem;
          letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: all 0.15s;
        }
        .diy-filter-btn:hover, .diy-filter-btn.active {
          background: var(--red); border-color: var(--red); color: var(--white);
        }

        .diy-projects-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.2rem; margin-bottom: 3rem;
        }

        .diy-card {
          background: var(--dark);
          border: 1px solid var(--mid);
          border-top: 3px solid var(--yellow);
          overflow: hidden;
          transition: transform 0.15s, border-color 0.15s;
        }
        .diy-card:hover { transform: translateY(-4px); }

        .diy-card-header {
          padding: 1.3rem 1.3rem 0.8rem;
          cursor: pointer; display: flex; justify-content: space-between; align-items: flex-start;
        }
        .diy-card-emoji { font-size: 2.2rem; line-height: 1; }
        .diy-card-meta { text-align: right; }
        .diy-difficulty {
          font-family: 'Share Tech Mono', monospace; font-size: 0.6rem;
          letter-spacing: 0.12em; padding: 0.2rem 0.5rem;
          display: inline-block; margin-bottom: 0.3rem;
        }
        .diy-difficulty.BEGINNER { background: rgba(80,200,80,0.15); color: #6dca6d; border: 1px solid #6dca6d; }
        .diy-difficulty.INTERMEDIATE { background: rgba(245,196,0,0.15); color: var(--yellow); border: 1px solid var(--yellow); }
        .diy-difficulty.ADVANCED { background: rgba(204,0,0,0.15); color: var(--red); border: 1px solid var(--red); }
        .diy-card-title {
          font-family: 'Special Elite', cursive;
          font-size: 1.3rem; line-height: 1.2;
          padding: 0.2rem 1.3rem 0.3rem;
        }
        .diy-card-stats {
          display: flex; gap: 1.5rem; padding: 0.5rem 1.3rem 0.8rem;
        }
        .diy-stat { font-family: 'Share Tech Mono', monospace; font-size: 0.68rem; color: var(--grey); }
        .diy-stat span { color: var(--white); display: block; font-size: 0.78rem; }

        .diy-card-body {
          border-top: 1px solid var(--mid);
          padding: 1rem 1.3rem 1.3rem;
          display: none;
        }
        .diy-card-body.open { display: block; }

        .diy-tools-list {
          margin-bottom: 1rem;
        }
        .diy-tools-label {
          font-family: 'Share Tech Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.15em; color: var(--yellow); text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .diy-tool-chip {
          display: inline-block; background: rgba(245,196,0,0.08);
          border: 1px solid rgba(245,196,0,0.25);
          padding: 0.2rem 0.6rem; margin: 0.2rem 0.2rem 0.2rem 0;
          font-size: 0.75rem; color: #ccc;
          font-family: 'Share Tech Mono', monospace;
        }

        .diy-steps-label {
          font-family: 'Share Tech Mono', monospace; font-size: 0.65rem;
          letter-spacing: 0.15em; color: var(--red); text-transform: uppercase;
          margin: 1rem 0 0.6rem;
        }
        .diy-step {
          display: flex; gap: 0.75rem; margin-bottom: 0.75rem;
          align-items: flex-start;
        }
        .diy-step-num {
          flex-shrink: 0; width: 1.4rem; height: 1.4rem;
          background: var(--red); color: var(--white);
          font-family: 'Share Tech Mono', monospace; font-size: 0.65rem;
          display: flex; align-items: center; justify-content: center;
          margin-top: 0.1rem;
        }
        .diy-step-text { font-size: 0.87rem; color: #ccc; line-height: 1.65; font-weight: 300; }

        .diy-tip {
          background: rgba(245,196,0,0.07); border-left: 3px solid var(--yellow);
          padding: 0.75rem 1rem; margin-top: 1rem;
          font-size: 0.83rem; color: #ccc; line-height: 1.65; font-weight: 300;
        }
        .diy-tip::before { content: '💡 PRO TIP: '; font-family: 'Share Tech Mono', monospace; font-size: 0.65rem; letter-spacing: 0.1em; color: var(--yellow); }

        .diy-toggle-btn {
          width: 100%; background: none; border: none; border-top: 1px solid var(--mid);
          color: var(--grey); padding: 0.7rem;
          font-family: 'Share Tech Mono', monospace; font-size: 0.7rem;
          letter-spacing: 0.1em; cursor: pointer; text-align: center;
          transition: color 0.15s, background 0.15s;
        }
        .diy-toggle-btn:hover { color: var(--white); background: rgba(255,255,255,0.03); }

        .diy-tools-essentials {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 0.75rem; margin-top: 1rem;
        }
        .diy-tool-card {
          background: var(--dark); border: 1px solid var(--mid);
          padding: 1rem; display: flex; gap: 0.75rem; align-items: flex-start;
        }
        .diy-tool-emoji { font-size: 1.6rem; flex-shrink: 0; margin-top: 0.1rem; }
        .diy-tool-name { font-family: 'Special Elite', cursive; font-size: 1rem; margin-bottom: 0.3rem; }
        .diy-tool-use { font-size: 0.82rem; color: #aaa; line-height: 1.55; font-weight: 300; }

        .gallery-placeholder {
          width: 100%; height: 100%;
          background: var(--dark);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.75rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; color: var(--grey);
          letter-spacing: 0.1em;
        }
        .gallery-spinner {
          width: 28px; height: 28px;
          border: 2px solid var(--mid);
          border-top-color: var(--red);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* === ARTICLE READER === */
        .article-reader-overlay {
          position: fixed; inset: 0; z-index: 500;
          background: rgba(0,0,0,0.92);
          display: flex; align-items: flex-start; justify-content: center;
          padding: 2rem 1rem; overflow-y: auto;
        }
        .article-reader {
          background: var(--off-black);
          border: 1px solid var(--mid);
          border-top: 4px solid var(--red);
          max-width: 720px; width: 100%;
          padding: 2rem; position: relative;
          margin: auto;
        }
        .article-reader-close {
          background: none; border: 1px solid var(--mid);
          color: var(--grey); padding: 0.4rem 1rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.7rem; letter-spacing: 0.1em;
          cursor: pointer; margin-bottom: 2rem;
          display: block; transition: all 0.15s;
        }
        .article-reader-close:hover { border-color: var(--red); color: var(--white); }
        .article-reader-loading { text-align: center; padding: 4rem 0; }
        .article-reader-loading p { font-family: 'Share Tech Mono', monospace; color: var(--grey); font-size: 0.85rem; margin-top: 1rem; letter-spacing: 0.1em; }
        .article-reader-error { color: var(--red); font-family: 'Share Tech Mono', monospace; font-size: 0.85rem; padding: 2rem; text-align: center; }
        .ar-category { font-family: 'Share Tech Mono', monospace; font-size: 0.65rem; letter-spacing: 0.2em; color: var(--yellow); text-transform: uppercase; margin-bottom: 0.75rem; }
        .ar-headline { font-family: 'Special Elite', cursive; font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.15; margin-bottom: 1rem; }
        .ar-standfirst { font-size: 1.1rem; color: #ddd; line-height: 1.7; font-style: italic; border-left: 3px solid var(--red); padding-left: 1rem; margin-bottom: 1rem; }
        .ar-meta { display: flex; gap: 1.5rem; font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: var(--grey); letter-spacing: 0.08em; margin-bottom: 1.5rem; }
        .ar-divider { height: 2px; background: linear-gradient(90deg, var(--red), transparent); margin-bottom: 1.5rem; }
        .ar-para { font-size: 1rem; line-height: 1.85; color: #ccc; font-weight: 300; margin-bottom: 1.2rem; }
        .ar-pullquote { border-left: 4px solid var(--red); padding: 1rem 1.5rem; margin: 1.5rem 0; font-family: 'Special Elite', cursive; font-size: 1.25rem; color: var(--white); line-height: 1.5; background: rgba(204,0,0,0.07); }
        .ar-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--mid); }
        .ar-tag { font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: var(--grey); background: var(--dark); border: 1px solid var(--mid); padding: 0.3rem 0.7rem; letter-spacing: 0.05em; }

        .kofi-wrap { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--mid); }
        .kofi-label { font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: var(--grey); letter-spacing: 0.15em; margin-bottom: 1rem; }
        .kofi-btn {
          display: inline-block;
          background: #ff5e5b; color: #fff;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem; letter-spacing: 0.1em;
          padding: 0.8rem 2rem; text-decoration: none;
          border: none; cursor: pointer;
          transition: all 0.15s;
        }
        .kofi-btn:hover { background: #ff3a37; transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--yellow); }
        .ar-kofi { margin-top: 2.5rem; padding: 1.5rem; background: rgba(255,94,91,0.07); border: 1px solid rgba(255,94,91,0.25); text-align: center; }
        .ar-kofi-text { font-family: 'Share Tech Mono', monospace; font-size: 0.75rem; color: var(--grey); letter-spacing: 0.08em; margin-bottom: 1rem; }

        /* === FOOTER === */
        .punk-footer {
          background: var(--off-black);
          border-top: 3px solid var(--red);
          padding: 2rem 1.5rem;
          text-align: center;
        }
        .footer-logo { font-family: 'Permanent Marker', cursive; font-size: 1.8rem; color: var(--red); margin-bottom: 0.5rem; }
        .footer-text { font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: var(--grey); letter-spacing: 0.15em; line-height: 1.8; }
        .footer-icons { font-size: 1.5rem; margin: 1rem 0; display: flex; gap: 1rem; justify-content: center; }

        /* === DIVIDER === */
        .punk-divider { display: flex; align-items: center; gap: 1rem; margin: 2.5rem 0; }
        .punk-divider::before, .punk-divider::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--mid)); }
        .punk-divider::after { background: linear-gradient(90deg, var(--mid), transparent); }
        .punk-divider span { font-family: 'Share Tech Mono', monospace; font-size: 0.7rem; color: var(--red); letter-spacing: 0.2em; white-space: nowrap; }

        /* === MANIFESTO BOX === */
        .manifesto {
          background: var(--red);
          padding: 2rem; margin: 2rem 0;
          position: relative;
        }
        .manifesto::before { content: '"'; position: absolute; top: -0.5rem; left: 1rem; font-size: 6rem; color: rgba(0,0,0,0.15); font-family: 'Permanent Marker', cursive; line-height: 1; }
        .manifesto-text { font-family: 'Special Elite', cursive; font-size: clamp(1.1rem, 3vw, 1.6rem); line-height: 1.6; color: var(--white); position: relative; }
        .manifesto-attr { font-family: 'Share Tech Mono', monospace; font-size: 0.75rem; color: rgba(240,236,226,0.7); margin-top: 1rem; letter-spacing: 0.1em; }
      `}</style>

      {/* HEADER */}
      <header className="punk-header">
        <div className={`site-logo ${glitching ? "glitch" : ""}`} onClick={() => scrollToSection("HOME")}>
          INSTA <em style={{color:"#ff2020", WebkitTextStroke:"0px", textShadow:"0 0 20px rgba(255,32,32,0.6)"}}>PUNK</em> MAG
          <span className="sub">// INSTA PUNK MAG //</span>
        </div>
        <nav className={`punk-nav ${menuOpen ? "open" : ""}`}>
          {SECTIONS.map(s => (
            <button key={s} className={`nav-btn ${activeSection === s ? "active" : ""}`} onClick={() => scrollToSection(s)}>
              {s}
            </button>
          ))}
        </nav>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>☰</button>
      </header>

      {/* HOME */}
      {activeSection === "HOME" && (
        <>
          <section className="hero">
            <div className="diagonal-tape" />
            <div className="hero-anarchy">Ⓐ</div>
            <h1 className="hero-title">One Sound.<br /><em>No Rules.</em><br />All Culture.</h1>
            <p className="hero-sub">// FASHION · MUSIC · HISTORY · COMMUNITY · FAITH //</p>
            <div className="hero-ctas">
              <button className="cta-btn cta-primary" onClick={() => scrollToSection("HISTORY")}>EXPLORE HISTORY</button>
              <button className="cta-btn cta-secondary" onClick={() => scrollToSection("STORES")}>FIND STORES</button>
            </div>
          </section>

          <div className="section-wrap">
            <div className="manifesto">
              <p className="manifesto-text">Punk is not just music. It's a way of thinking. A way of refusing. A way of making something out of nothing and saying it louder than anyone who told you to be quiet.</p>
              <p className="manifesto-attr">— INSTA PUNK MAG MANIFESTO</p>
            </div>

            <div className="punk-divider"><span>// WHAT'S INSIDE //</span></div>

            <div className="band-grid">
              {[
                { nav: "HISTORY", label: "History", icon: "📜", desc: "From CBGB to global stages — trace punk's explosive timeline from 1974 to now." },
                { nav: "MUSIC", label: "Music", icon: "🎸", desc: "Essential bands, albums, and the sounds that changed everything. Loud. Fast. Angry." },
                { nav: "FASHION", label: "Fashion", icon: "🥾", desc: "Dr. Martens. Leather jackets. Safety pins. Mohawks. The complete punk style guide." },
                { nav: "STORES", label: "Store Finder", icon: "📍", desc: "Find punk shops, thrift stores, and vintage spots anywhere in your area." },
                { nav: "ARTICLES", label: "Articles", icon: "📋", desc: "Stories, essays, and deep dives into the culture. By punks, for punks." },
                { nav: "CHRISTIAN PUNK", label: "Christian Punk", icon: "✝️", desc: "Faith meets fury. The bands who found God in the pit and brought the gospel to the stage." },
              ].map(item => (
                <div key={item.nav} className="band-card" onClick={() => scrollToSection(item.nav)} style={{cursor:"pointer"}}>
                  <div style={{fontSize:"2rem", marginBottom:"0.5rem"}}>{item.icon}</div>
                  <div className="band-name">{item.label}</div>
                  <p className="band-desc" style={{marginTop:"0.5rem"}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* HISTORY */}
      {activeSection === "HISTORY" && (
        <div className="section-wrap">
          <h2 className="section-title">Punk History</h2>
          <p className="section-sub">// FROM THE GUTTERS OF NEW YORK AND LONDON TO THE WORLD //</p>

          <div className="manifesto">
            <p className="manifesto-text">Punk arrived like a brick through a window. Nobody asked for it. Nobody was ready. And that was exactly the point.</p>
          </div>

          <div className="punk-divider"><span>// TIMELINE //</span></div>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-event">{t.event}</div>
                <div className="timeline-detail">{t.detail}</div>
              </div>
            ))}
          </div>

          <div className="punk-divider"><span>// ORIGINS & ROOTS //</span></div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem"}}>
            {[
              { title: "CBGB, New York", body: "The filthy Bowery bar where Television, Patti Smith, and the Ramones invented what punk would become. 1974–1976. No stage lights. No pretension. Just electricity." },
              { title: "Malcolm McLaren & Vivienne Westwood", body: "The architects of UK punk's look. Their King's Road shop SEX sold bondage trousers and anarchy shirts. They created the Sex Pistols almost as a performance art stunt." },
              { title: "The Situationists", body: "Punk borrowed from French Situationist philosophy — the idea that consumer society is a spectacle to be disrupted. This is why punk collagist ransom-note aesthetics matter." },
              { title: "Reggae & Ska", body: "The Clash, specifically, fused punk with reggae and Jamaican sounds. This was not appropriation — it was genuine cross-cultural solidarity in multi-racial '70s Britain." },
            ].map((c, i) => (
              <div key={i} className="band-card">
                <div className="band-name" style={{marginBottom:"0.5rem"}}>{c.title}</div>
                <div className="band-desc">{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MUSIC */}
      {activeSection === "MUSIC" && (
        <div className="section-wrap">
          {selectedTrack && (
            <MusicReader track={selectedTrack} onClose={() => setSelectedTrack(null)} />
          )}
          <h2 className="section-title">The Music</h2>
          <p className="section-sub">// BANDS THAT STARTED FIRES AND NEVER LOOKED BACK //</p>

          <div className="punk-divider"><span>// NEW & NOW — CLICK TO READ FULL FEATURE //</span></div>
          <div className="new-music-grid">
            {NEW_MUSIC_CARDS.map((track, i) => (
              <div key={i} className="new-music-card" onClick={() => setSelectedTrack(track)}>
                <span className="new-music-emoji">{track.emoji}</span>
                <div className="new-music-genre">{track.genre}</div>
                <div className="new-music-title">{track.title}</div>
                <div className="new-music-desc">{track.desc}</div>
              </div>
            ))}
          </div>

          <div className="punk-divider"><span>// FIND SHOWS NEAR YOU //</span></div>
          <ShowFinder />

          <div className="punk-divider"><span>// ESSENTIAL BANDS //</span></div>
          <div className="band-grid">
            {PUNK_BANDS.map((b, i) => (
              <div key={i} className="band-card">
                <div className="band-name">{b.name}</div>
                <div className="band-era">{b.era} · {b.origin}</div>
                <div className="band-genre">{b.genre}</div>
                <div className="band-desc">{b.desc}</div>
              </div>
            ))}
          </div>

          <div className="punk-divider"><span>// ESSENTIAL ALBUMS //</span></div>

          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:"1rem"}}>
            {[
              { band: "Ramones", album: "Ramones (1976)", note: "29 minutes. 14 songs. Year zero." },
              { band: "Sex Pistols", album: "Never Mind the Bollocks (1977)", note: "Only album. Still deafening." },
              { band: "The Clash", album: "London Calling (1979)", note: "The greatest rock album, full stop." },
              { band: "Dead Kennedys", album: "Fresh Fruit for Rotting Vegetables (1980)", note: "Political fury, surgical wit." },
              { band: "Minor Threat", album: "Complete Discography (1989)", note: "Birthed straight edge. Ian MacKaye for president." },
              { band: "Bad Brains", album: "Bad Brains (1982)", note: "Fastest, tightest, most spiritual hardcore ever recorded." },
              { band: "Bikini Kill", album: "Pussy Whipped (1993)", note: "Riot Grrrl's canonical text. Required listening." },
              { band: "Refused", album: "The Shape of Punk to Come (1998)", note: "Exploded the genre and then the band. Flawless." },
            ].map((a, i) => (
              <div key={i} className="fashion-item" style={{flexDirection:"column", gap:"0.4rem"}}>
                <div className="fashion-name">{a.album}</div>
                <div className="fashion-category" style={{marginBottom:"0"}}>{a.band}</div>
                <div className="fashion-desc">{a.note}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FASHION */}
      {activeSection === "FASHION" && (
        <div className="section-wrap">
          <h2 className="section-title">Punk Fashion</h2>
          <p className="section-sub">// CLOTHES AS PROTEST · STYLE AS RESISTANCE //</p>

          <div className="manifesto">
            <p className="manifesto-text">The leather jacket is a wearable manifesto. The ripped jeans are a rejection of propriety. The safety pin is a repair that refuses to hide its damage.</p>
          </div>

          {FASHION_ITEMS.map((cat, i) => (
            <div key={i} className="fashion-section">
              <div className="punk-divider"><span>// {cat.category.toUpperCase()} //</span></div>
              <div className="fashion-grid">
                {cat.items.map((item, j) => (
                  <div key={j} className="fashion-item">
                    <div className="fashion-icon">{item.icon}</div>
                    <div>
                      <div className="fashion-name">{item.name}</div>
                      <div className="fashion-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="punk-divider"><span>// BUILDING YOUR LOOK ON A BUDGET //</span></div>
          <div className="band-grid">
            {[
              { title: "Thrift First", desc: "90% of an authentic punk wardrobe can come from Goodwill, Salvation Army, or estate sales. Look for oversized flannels, vintage tees, leather jackets, and worn denim." },
              { title: "Customize Everything", desc: "Bleach it. Cut it. Paint it. Stencil it. A $3 band tee from a thrift store plus some bleach and an X-Acto knife is worth more than anything from Hot Topic." },
              { title: "Invest in Boots", desc: "Dr. Martens are expensive new, but they last decades. Buy secondhand. A beat-up pair of 1460s is more punk than pristine ones anyway." },
              { title: "The Art of the Patch", desc: "Band patches can be ironed or sewn onto jackets and bags. Mix punk, anarcho-punk, and personal art. The jacket tells your story, not a brand's." },
            ].map((t, i) => (
              <div key={i} className="band-card">
                <div className="band-name" style={{marginBottom:"0.5rem"}}>{t.title}</div>
                <div className="band-desc">{t.desc}</div>
              </div>
            ))}
          </div>

          {/* DIY WORKSHOP */}
          <div style={{marginTop:"3rem"}}>
            <div className="diy-section-header">
              <h3 className="section-title" style={{fontSize:"clamp(1.6rem, 4vw, 2.5rem)", marginBottom:0}}>DIY Workshop</h3>
              <span className="diy-badge">BUILD IT YOURSELF</span>
            </div>
            <p className="section-sub" style={{marginBottom:"1.5rem"}}>// STEP-BY-STEP GUIDES TO MAKE YOUR OWN PUNK CLOTHING & GEAR //</p>

            <div className="manifesto" style={{marginBottom:"2rem"}}>
              <p className="manifesto-text">Punk was never supposed to be purchased. It was supposed to be made. Every stud you set, every patch you sew, every tee you bleach is a rejection of the idea that identity can be bought off a rack.</p>
            </div>

            <DIYWorkshop />

            <div className="punk-divider"><span>// WHERE TO GET SUPPLIES //</span></div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:"0.75rem", marginBottom:"1rem"}}>
              {[
                { name: "AliExpress", tag: "Online", note: "Cheapest bulk studs, spikes, and hardware. Order weeks in advance for shipping." },
                { name: "Amazon", tag: "Online", note: "Fast shipping on Speedball inks, Tulip fabric paint, bulk safety pins, and tools." },
                { name: "Jo-Ann Fabrics", tag: "Craft Store", note: "Patches, leather strips, fabric paint, needles, and thread. Sales are frequent." },
                { name: "Michaels", tag: "Craft Store", note: "Screen printing supplies, paint, stencils, and mod podge. Good beginner section." },
                { name: "Etsy", tag: "Independent", note: "Custom-cut patches, hand-dyed fabric, and unique hardware from indie makers." },
                { name: "Hardware Store", tag: "Local", note: "Cheaper than craft stores for Chicago screws, D-rings, rivets, and leather awls." },
              ].map((s, i) => (
                <div key={i} className="store-card" style={{borderLeftColor:"var(--yellow)"}}>
                  <div className="store-header">
                    <span className="store-name">{s.name}</span>
                    <span className="store-type-badge">{s.tag}</span>
                  </div>
                  <p className="store-reason">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STORES */}
      {activeSection === "STORES" && (
        <div className="section-wrap">
          <h2 className="section-title">Find Stores</h2>
          <p className="section-sub">// PUNK SHOPS · THRIFT STORES · VINTAGE SPOTS NEAR YOU //</p>
          <StoreFinder />
          <div className="punk-divider"><span>// WELL-KNOWN CHAINS & ONLINE SPOTS //</span></div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:"0.75rem"}}>
            {[
              { name: "Hot Topic", type: "Chain", note: "Mainstream but accessible. Good for band merch, basics, and accessories." },
              { name: "Spencer's", type: "Chain", note: "Accessories, novelty, and edgy items at mall prices." },
              { name: "Depop", type: "Online", note: "Peer-to-peer vintage and punk fashion. App-based. Wide selection." },
              { name: "Etsy", type: "Online", note: "Custom patches, handmade studded gear, and independent punk makers." },
              { name: "eBay Vintage", type: "Online", note: "Best for rare band tees, vintage Levi's, and original-era leather jackets." },
              { name: "Grailed", type: "Online", note: "Curated secondhand fashion with strong punk and alt selection." },
              { name: "Goodwill / Salvation Army", type: "Thrift", note: "The original punk store. Budget, local, unpredictable. Go weekly." },
              { name: "Local Record Shops", type: "Independent", note: "Often sell patches, pins, and zines alongside vinyl. Ask the staff." },
            ].map((s, i) => (
              <div key={i} className="store-card" style={{borderLeftColor: s.type === "Thrift" ? "#f5c400" : s.type === "Online" ? "#888" : "#cc0000"}}>
                <div className="store-header">
                  <span className="store-name">{s.name}</span>
                  <span className="store-type-badge">{s.type}</span>
                </div>
                <p className="store-reason">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ARTICLES */}
      {activeSection === "ARTICLES" && (
        <div className="section-wrap">
          {selectedArticle && (
            <ArticleReader article={selectedArticle} onClose={() => setSelectedArticle(null)} />
          )}
          <h2 className="section-title">Articles & Stories</h2>
          <p className="section-sub">// CULTURE · HISTORY · DIY · POLITICS · COMMUNITY //</p>

          <div className="article-grid">
            {ARTICLES.map((a, i) => (
              <div key={i} className="article-card" onClick={() => setSelectedArticle(a)} style={{cursor:"pointer"}}>
                <span className="article-emoji">{a.emoji}</span>
                <div className="article-category">{a.category}</div>
                <h3 className="article-title">{a.title}</h3>
                <p className="article-excerpt">{a.excerpt}</p>
                <span className="article-read-time">⏱ {a.readTime} &nbsp;·&nbsp; <span style={{color:"var(--red)"}}>READ NOW →</span></span>
              </div>
            ))}
          </div>

          <div className="punk-divider"><span>// ZINE CULTURE //</span></div>
          <div className="manifesto">
            <p className="manifesto-text">A photocopier, a staple, and something to say. That's all a zine requires. Punk's underground press distributed truth when mainstream media wouldn't touch it. Photocopy. Distribute. Repeat.</p>
          </div>

          <div className="band-grid">
            {[
              { title: "Sniffin' Glue (UK, 1976)", desc: "The original punk zine. Typed on a typewriter, photocopied, sold at shows. Ran for 12 issues. The blueprint." },
              { title: "Maximumrocknroll (US, 1982)", desc: "San Francisco's punk institution. Covered global DIY music for 38 years. Free to download online." },
              { title: "Riot Grrrl Press (1990s)", desc: "Kathleen Hanna and the Bikini Kill collective wrote feminist manifestos and circulated them at shows and via mail." },
              { title: "Make Your Own", desc: "Fold 8 pages from one sheet of paper. Write. Draw. Photocopy. Leave at shows, coffee shops, record stores. This is still how it's done." },
            ].map((z, i) => (
              <div key={i} className="band-card">
                <div className="band-name" style={{marginBottom:"0.5rem"}}>{z.title}</div>
                <div className="band-desc">{z.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHRISTIAN PUNK */}
      {activeSection === "CHRISTIAN PUNK" && (
        <div className="section-wrap">
          <h2 className="section-title" style={{color: "var(--christian-gold)"}}>Christian Punk</h2>
          <p className="section-sub" style={{color:"#a87fd0"}}>// FAITH · FURY · COMMUNITY · GRACE IN THE PIT //</p>

          <div className="christian-section">
            <p className="christian-intro">
              Christian punk is not a contradiction. Punk's core values — radical authenticity, community over commerce, rage at injustice, and care for the marginalized — map naturally onto a prophetic faith tradition. 
              From the hardcore stages of the late '80s to massive festival crowds in the 2000s, Christian punks have screamed their faith as loudly as their politics. 
              The pit can be sacred. The distortion can be a prayer. These bands proved it.
            </p>

            <div className="punk-divider"><span style={{color:"var(--christian-gold)"}}>// KEY BANDS //</span></div>

            <div className="christian-grid">
              {CHRISTIAN_PUNK_BANDS.map((b, i) => (
                <div key={i} className="christian-card">
                  <div className="christian-band-name">{b.name}</div>
                  <div className="christian-genre">{b.genre}</div>
                  <div className="christian-note">{b.note}</div>
                </div>
              ))}
            </div>

            <div className="punk-divider"><span style={{color:"var(--christian-gold)"}}>// CORE VALUES //</span></div>

            <div className="christian-values">
              {["Radical Authenticity", "Care for the Outcast", "DIY Community", "Anti-Materialism", "Social Justice", "Raw Honesty in Worship", "Non-Conformity", "Grace Over Judgment"].map((v, i) => (
                <div key={i} className="value-chip">{v}</div>
              ))}
            </div>
          </div>

          <div className="punk-divider"><span>// LABELS & COMMUNITY //</span></div>
          <div className="band-grid">
            {[
              { title: "Tooth & Nail Records", desc: "Seattle-based Christian alternative label founded 1993. Home to Underoath, MxPx, Anberlin, Norma Jean, and dozens more. The Epitaph of Christian punk." },
              { title: "Solid State Records", desc: "Tooth & Nail's heavier imprint. The Chariot, Demon Hunter, Haste the Day. Uncompromisingly brutal, explicitly Christian." },
              { title: "Cornerstone Festival", desc: "Annual festival in Illinois (1984–2012) that was the heartbeat of the Christian alternative scene. Punk, metal, folk, and theology under one sky." },
              { title: "The Warped Tour Factor", desc: "Christian punk bands regularly played Warped Tour alongside secular acts, proving the music could stand on its own merits in any company." },
            ].map((t, i) => (
              <div key={i} className="band-card" style={{borderTopColor:"var(--christian-gold)"}}>
                <div className="band-name" style={{color:"var(--christian-gold)", marginBottom:"0.5rem"}}>{t.title}</div>
                <div className="band-desc">{t.desc}</div>
              </div>
            ))}
          </div>

          <div className="manifesto" style={{background:"var(--christian-purple)"}}>
            <p className="manifesto-text">"We are not the ones the world has sanitized. We are the ones who show up to the show with our Bibles dog-eared, our jeans torn, and our voices raw. The gospel was never meant to be polite."</p>
            <p className="manifesto-attr">— THE SPIRIT OF CHRISTIAN PUNK</p>
          </div>
        </div>
      )}

      {/* GALLERY */}
      {activeSection === "GALLERY" && (
        <div className="section-wrap">
          <h2 className="section-title">Gallery</h2>
          <p className="section-sub">// AI-GENERATED PUNK IMAGERY · UNIQUE EVERY VISIT //</p>

          <p style={{fontFamily:"'Share Tech Mono', monospace", fontSize:"0.72rem", color:"var(--grey)", marginBottom:"1.5rem", letterSpacing:"0.08em"}}>
            ⚡ Each image is generated fresh by AI on every page load — no two visits look the same.
          </p>

          <div className="gallery-grid">
            {GALLERY_PROMPTS.map((item, i) => (
              <GalleryImage
                key={i}
                prompt={item.prompt}
                alt={item.alt}
                span={i === 0 ? 2 : i === 4 ? 2 : null}
              />
            ))}
          </div>

          <div className="punk-divider"><span>// ICONIC VIDEOS //</span></div>
          <div className="video-grid">
            {[
              { title: "The Clash — 'London Calling' (Official HD Video)", url: "https://www.youtube.com/watch?v=a3XqMtam1I0" },
              { title: "Ramones — 'Blitzkrieg Bop' (Official Music Video)", url: "https://www.youtube.com/watch?v=268C3N2dDYk" },
              { title: "Dead Kennedys — 'Holiday in Cambodia' (Official Video)", url: "https://www.youtube.com/watch?v=Qr6NOsluHYg" },
              { title: "Bad Brains — 'Pay to Cum' Live at CBGB's 1979", url: "https://www.youtube.com/watch?v=OP_gUFvN3Mc" },
              { title: "Bad Brains — 'Banned in D.C.' (Official)", url: "https://www.youtube.com/watch?v=221K0gSHBJc" },
              { title: "Black Flag — 'Rise Above' (Official Video)", url: "https://www.youtube.com/watch?v=9TLHM-TCNWQ" },
            ].map((v, i) => (
              <a key={i} href={v.url} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
                <div className="video-embed">
                  <div className="video-play">▶</div>
                  <div className="video-title">{v.title}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="punk-divider"><span>// DOCUMENT YOUR SCENE //</span></div>
          <div className="manifesto">
            <p className="manifesto-text">Punk has always been documented by the people inside it. If you have photos, zines, or footage from local shows — share them. The archive belongs to the community.</p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="punk-footer">
        <div className="footer-logo">INSTA <span style={{color:"#ff2020", textShadow:"0 0 16px rgba(255,32,32,0.5)"}}>PUNK</span> MAG</div>
        <div className="footer-icons">
          {["🎸", "✊", "Ⓐ", "📋", "✝️"].map((e, i) => <span key={i}>{e}</span>)}
        </div>
        <div className="footer-text">
          THE COMPLETE PUNK CULTURE HUB<br />
          FASHION · MUSIC · HISTORY · FAITH · COMMUNITY<br /><br />
          <span style={{color:"#555"}}>Built with noise, static, and something to say. // Not for sale. Never for sale.</span>
        </div>
        <div className="kofi-wrap">
          <p className="kofi-label">// LIKE WHAT WE'RE DOING? KEEP THE NOISE ALIVE //</p>
          <a href="https://ko-fi.com/instapunkmag" target="_blank" rel="noopener noreferrer" className="kofi-btn">
            ☕ BUY US A COFFEE ON KO-FI
          </a>
        </div>
      </footer>
    </div>
  );
}
