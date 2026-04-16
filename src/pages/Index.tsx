import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "vr", label: "VR" },
  { id: "ar", label: "AR" },
  { id: "types", label: "Типы реальности" },
  { id: "compare", label: "Различия" },
  { id: "future", label: "Перспективы" },
];

const VR_APPS = [
  { icon: "🏥", title: "Медицина", desc: "Обучение хирургов, лечение фобий, реабилитация пациентов через VR-терапию" },
  { icon: "🎓", title: "Образование", desc: "Виртуальные классы, исторические реконструкции, обучение в опасных средах" },
  { icon: "🎮", title: "Игры", desc: "Полное погружение в игровые миры с поддержкой движений тела" },
  { icon: "🏗️", title: "Архитектура", desc: "Просмотр зданий до строительства, виртуальные туры по объектам" },
  { icon: "🚀", title: "Космос", desc: "Тренировки астронавтов NASA и SpaceX в симулированных условиях" },
  { icon: "🧘", title: "Психология", desc: "Лечение ПТСР, тревожных расстройств и реабилитация" },
];

const AR_APPS = [
  { icon: "🛒", title: "Ритейл", desc: "Примерка одежды и мебели до покупки через камеру смартфона" },
  { icon: "🔧", title: "Промышленность", desc: "Наложение инструкций на оборудование при ремонте и техобслуживании" },
  { icon: "📍", title: "Навигация", desc: "AR-стрелки на дороге в реальном времени, Google Maps Live View" },
  { icon: "🏛️", title: "Туризм", desc: "Информация о достопримечательностях при наведении камеры" },
  { icon: "🩺", title: "Хирургия", desc: "Отображение МРТ данных на теле пациента во время операции" },
  { icon: "🎨", title: "Дизайн", desc: "Визуализация интерьеров, упаковок, продуктов в реальной среде" },
];

const REALITY_TYPES = [
  {
    name: "VR",
    full: "Виртуальная реальность",
    color: "cyan",
    borderClass: "neon-border-cyan",
    desc: "Полное погружение в цифровой мир с изоляцией от реальной среды",
    tech: ["Шлемы (Quest, Valve Index)", "Контроллеры движения", "Трекинг тела", "Haptic-перчатки"],
    immersion: 95,
  },
  {
    name: "AR",
    full: "Дополненная реальность",
    color: "magenta",
    borderClass: "neon-border-magenta",
    desc: "Наложение цифровых объектов на реальный мир через экран или очки",
    tech: ["Смартфоны (ARKit/ARCore)", "Microsoft HoloLens", "Magic Leap", "Smart Glasses"],
    immersion: 40,
  },
  {
    name: "MR",
    full: "Смешанная реальность",
    color: "violet",
    borderClass: "border-purple-500",
    desc: "Цифровые объекты взаимодействуют с физическим миром",
    tech: ["HoloLens 2", "Magic Leap 2", "Apple Vision Pro", "Varjo XR-4"],
    immersion: 70,
  },
  {
    name: "XR",
    full: "Расширенная реальность",
    color: "cyan",
    borderClass: "neon-border-cyan",
    desc: "Зонтичный термин для VR, AR и MR — все технологии расширения восприятия",
    tech: ["Все вышеперечисленные", "Будущие нейроинтерфейсы", "Голографические дисплеи"],
    immersion: 100,
  },
];

const COMPARE_ROWS = [
  { param: "Погружение", vr: "Полное (100%)", ar: "Частичное (30-50%)" },
  { param: "Изоляция", vr: "Полная от реальности", ar: "Реальный мир виден" },
  { param: "Устройства", vr: "Шлем VR обязателен", ar: "Смартфон / очки" },
  { param: "Мобильность", vr: "Ограничена", ar: "Высокая" },
  { param: "Стоимость входа", vr: "От $300 (Quest 3)", ar: "Смартфон (бесплатно)" },
  { param: "Применение", vr: "Симуляции, игры, обучение", ar: "Навигация, шопинг, ремонт" },
  { param: "Сходство", vr: "3D визуализация", ar: "3D визуализация" },
  { param: "Рынок 2024", vr: "$40 млрд", ar: "$35 млрд" },
];

const FUTURE_ITEMS = [
  {
    year: "2026",
    title: "Нейроинтерфейсы",
    desc: "Прямое подключение мозга к VR без физических устройств. Neuralink и конкуренты выходят на потребительский рынок.",
    color: "cyan",
  },
  {
    year: "2028",
    title: "Тактильные костюмы",
    desc: "Полноценная передача осязания в VR — температура, давление, боль. Медицина и обучение хирургов трансформируются.",
    color: "magenta",
  },
  {
    year: "2030",
    title: "Метавселенная 2.0",
    desc: "Полноценные виртуальные экономики, работа, образование и социализация в едином цифровом пространстве.",
    color: "violet",
  },
  {
    year: "2035",
    title: "Голографические города",
    desc: "AR-слои поверх физической реальности — магазины, офисы, памятники существуют только в цифре.",
    color: "cyan",
  },
];

function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 10}s`,
            background: i % 2 === 0 ? "var(--neon-cyan)" : "var(--neon-magenta)",
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }}
        />
      ))}
    </div>
  );
}

function ImmersionBar({ value, color }: { value: number; color: string }) {
  const colors: Record<string, string> = {
    cyan: "from-cyan-400 to-cyan-300",
    magenta: "from-pink-500 to-fuchsia-400",
    violet: "from-violet-500 to-purple-400",
  };
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>Погружение</span>
        <span style={{ color: color === "cyan" ? "var(--neon-cyan)" : color === "magenta" ? "var(--neon-magenta)" : "#8b5cf6" }}>{value}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colors[color]}`}
          style={{ width: `${value}%`, transition: "width 1.5s ease" }}
        />
      </div>
    </div>
  );
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <span className="tech-tag mb-4 inline-block">{tag}</span>
      <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wide leading-tight">{title}</h2>
      <div className="section-divider" />
      {subtitle && <p className="text-gray-400 text-lg max-w-2xl">{subtitle}</p>}
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_ITEMS.map((n) => n.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "var(--dark-bg)" }}>
      <Particles />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full pulse-glow" style={{ background: "var(--neon-cyan)", boxShadow: "0 0 20px var(--neon-cyan)" }} />
            <span className="text-white font-bold text-xl tracking-widest uppercase" style={{ fontFamily: "Oswald, sans-serif" }}>
              <span style={{ color: "var(--neon-cyan)" }}>XR</span>Universe
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-200 rounded ${
                  activeSection === item.id
                    ? "text-black"
                    : "text-gray-400 hover:text-white"
                }`}
                style={activeSection === item.id ? { background: "var(--neon-cyan)", fontFamily: "Oswald, sans-serif" } : { fontFamily: "Oswald, sans-serif" }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden nav-blur px-6 pb-4 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-gray-300 py-2 uppercase tracking-wider text-sm" style={{ fontFamily: "Oswald" }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
        <div className="gradient-line" />
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center hero-gradient grid-bg overflow-hidden">
        <div className="scan-line" />
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="fade-in-up-delay-1 mb-6">
                <span className="tech-tag">Технологии будущего</span>
              </div>
              <h1 className="fade-in-up-delay-2 text-5xl md:text-7xl font-black uppercase leading-none mb-6 text-white tracking-tight">
                Входи в<br />
                <span className="neon-cyan">реальность</span><br />
                <span style={{ color: "var(--neon-magenta)", textShadow: "0 0 30px var(--neon-magenta)" }}>будущего</span>
              </h1>
              <p className="fade-in-up-delay-3 text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                VR и AR меняют медицину, образование, архитектуру и развлечения. 
                Узнайте как эти технологии уже сегодня трансформируют нашу жизнь.
              </p>
              <div className="fade-in-up-delay-4 flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("vr")}
                  className="px-8 py-3 font-bold uppercase tracking-wider text-black transition-all hover:scale-105"
                  style={{ background: "var(--neon-cyan)", fontFamily: "Oswald", boxShadow: "0 0 30px rgba(0,245,255,0.4)" }}
                >
                  Погрузиться
                </button>
                <button
                  onClick={() => scrollTo("types")}
                  className="px-8 py-3 font-bold uppercase tracking-wider text-white border transition-all hover:scale-105"
                  style={{ fontFamily: "Oswald", borderColor: "var(--neon-magenta)", boxShadow: "0 0 20px rgba(255,0,255,0.2)" }}
                >
                  Типы XR
                </button>
              </div>
            </div>
            <div className="fade-in-up-delay-5 relative flex justify-center">
              <div className="float-anim relative">
                <div
                  className="w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle, rgba(0,245,255,0.15) 0%, rgba(255,0,255,0.1) 50%, transparent 70%)",
                    boxShadow: "0 0 80px rgba(0,245,255,0.3), 0 0 160px rgba(255,0,255,0.1)",
                    border: "1px solid rgba(0,245,255,0.2)",
                  }}
                >
                  <div className="text-center">
                    <div className="text-8xl mb-4">🥽</div>
                    <div className="text-white text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: "Oswald" }}>VR / AR</div>
                    <div className="text-xs tracking-widest mt-1" style={{ color: "var(--neon-cyan)" }}>EXTENDED REALITY</div>
                  </div>
                </div>
                {/* Orbiting dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: i % 2 === 0 ? "var(--neon-cyan)" : "var(--neon-magenta)",
                      top: `${50 + 47 * Math.sin((deg * Math.PI) / 180)}%`,
                      left: `${50 + 47 * Math.cos((deg * Math.PI) / 180)}%`,
                      transform: "translate(-50%, -50%)",
                      boxShadow: `0 0 10px ${i % 2 === 0 ? "var(--neon-cyan)" : "var(--neon-magenta)"}`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: "$75B", l: "рынок XR в 2024" },
              { n: "171M", l: "пользователей VR" },
              { n: "2.4B", l: "пользователей AR" },
              { n: "40%", l: "рост год к году" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-lg border" style={{ borderColor: "rgba(0,245,255,0.1)", background: "rgba(0,245,255,0.03)" }}>
                <div className="stat-number">{s.n}</div>
                <div className="text-gray-400 text-sm mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VR SECTION */}
      <section id="vr" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            tag="Виртуальная реальность"
            title="VR — Новый мир внутри"
            subtitle="Технология полного погружения, которая заменяет реальность цифровым окружением через специальный шлем"
          />
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {VR_APPS.map((app, i) => (
              <div
                key={i}
                className="card-hover p-6 rounded-xl border"
                style={{ background: "var(--dark-card)", borderColor: "rgba(0,245,255,0.15)" }}
              >
                <div className="text-4xl mb-4">{app.icon}</div>
                <h3 className="text-white font-bold text-xl mb-2 uppercase tracking-wide" style={{ fontFamily: "Oswald" }}>{app.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
          {/* VR Video */}
          <div>
            <h3 className="text-2xl font-bold text-white uppercase mb-6 tracking-wide" style={{ fontFamily: "Oswald" }}>
              <span style={{ color: "var(--neon-cyan)" }}>→</span> VR в действии
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="video-wrapper rounded-xl overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/vYjB4bWWJeA"
                    title="VR технологии"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="video-wrapper rounded-xl overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/p9p4QCGsW2Y"
                    title="VR в медицине"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AR SECTION */}
      <section id="ar" className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,0,255,0.05) 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            tag="Дополненная реальность"
            title="AR — Цифровой слой реального"
            subtitle="AR добавляет виртуальные объекты в реальный мир — через смартфон или специальные очки"
          />
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {AR_APPS.map((app, i) => (
              <div
                key={i}
                className="card-hover p-6 rounded-xl border"
                style={{ background: "var(--dark-card)", borderColor: "rgba(255,0,255,0.15)", boxShadow: "0 4px 20px rgba(255,0,255,0.05)" }}
              >
                <div className="text-4xl mb-4">{app.icon}</div>
                <h3 className="font-bold text-xl mb-2 uppercase tracking-wide" style={{ fontFamily: "Oswald", color: "var(--neon-magenta)" }}>{app.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{app.desc}</p>
              </div>
            ))}
          </div>
          {/* AR Video */}
          <div>
            <h3 className="text-2xl font-bold text-white uppercase mb-6 tracking-wide" style={{ fontFamily: "Oswald" }}>
              <span style={{ color: "var(--neon-magenta)" }}>→</span> AR в действии
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 0 0 2px rgba(255,0,255,0.3), 0 0 40px rgba(255,0,255,0.1)" }}>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/WxzcD04is3M"
                    title="AR технологии"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 0 0 2px rgba(255,0,255,0.3), 0 0 40px rgba(255,0,255,0.1)" }}>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/onYKEkAE4IQ"
                    title="AR в промышленности"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TYPES SECTION */}
      <section id="types" className="relative py-24 overflow-hidden grid-bg">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            tag="Классификация"
            title="Типы реальности"
            subtitle="От физического мира до полной цифровой симуляции — континуум реальности Милгрэма"
          />
          {/* Milgram scale */}
          <div className="mb-12 p-6 rounded-xl border" style={{ background: "var(--dark-card)", borderColor: "rgba(0,245,255,0.15)" }}>
            <div className="text-sm text-gray-400 mb-3 uppercase tracking-widest">Континуум реальности Милгрэма</div>
            <div className="relative h-12 rounded-full overflow-hidden">
              <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #1a1a4e, #0ff 30%, #f0f 70%, #1a1a4e)" }} />
              <div className="absolute inset-0 flex items-center justify-between px-6 text-xs font-bold uppercase tracking-widest">
                <span className="text-black bg-white/80 px-2 py-1 rounded">Реальный мир</span>
                <span style={{ color: "var(--dark-bg)" }} className="bg-cyan-300 px-2 py-1 rounded">AR</span>
                <span style={{ color: "var(--dark-bg)" }} className="bg-fuchsia-400 px-2 py-1 rounded">MR</span>
                <span className="text-black bg-white/80 px-2 py-1 rounded">VR</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {REALITY_TYPES.map((type, i) => (
              <div
                key={i}
                className={`card-hover p-6 rounded-xl border ${type.borderClass}`}
                style={{ background: "var(--dark-card)" }}
              >
                <div
                  className="text-4xl font-black mb-2 uppercase"
                  style={{
                    fontFamily: "Oswald",
                    color: type.color === "cyan" ? "var(--neon-cyan)" : type.color === "magenta" ? "var(--neon-magenta)" : "#8b5cf6",
                    textShadow: `0 0 20px ${type.color === "cyan" ? "var(--neon-cyan)" : type.color === "magenta" ? "var(--neon-magenta)" : "#8b5cf6"}`,
                  }}
                >
                  {type.name}
                </div>
                <div className="text-white font-medium mb-3 text-sm uppercase tracking-wider" style={{ fontFamily: "Oswald" }}>{type.full}</div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{type.desc}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {type.tech.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.05)", color: "#aaa" }}>{t}</span>
                  ))}
                </div>
                <ImmersionBar value={type.immersion} color={type.color} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE SECTION */}
      <section id="compare" className="relative py-24">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            tag="Сравнение"
            title="VR vs AR — Различия и сходства"
            subtitle="Обе технологии меняют мир, но по-разному. Разберём ключевые отличия"
          />
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(0,245,255,0.15)" }}>
            <div className="grid grid-cols-3 py-4 px-6" style={{ background: "rgba(0,245,255,0.08)" }}>
              <div className="text-gray-400 text-sm uppercase tracking-widest font-medium">Параметр</div>
              <div className="text-center font-bold uppercase text-lg tracking-wide" style={{ fontFamily: "Oswald", color: "var(--neon-cyan)" }}>VR</div>
              <div className="text-center font-bold uppercase text-lg tracking-wide" style={{ fontFamily: "Oswald", color: "var(--neon-magenta)" }}>AR</div>
            </div>
            {COMPARE_ROWS.map((row, i) => (
              <div
                key={i}
                className="compare-row grid grid-cols-3 py-4 px-6 border-t"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
              >
                <div className="text-gray-300 text-sm font-medium">{row.param}</div>
                <div className="text-center text-sm text-gray-400">{row.vr}</div>
                <div className="text-center text-sm text-gray-400">{row.ar}</div>
              </div>
            ))}
          </div>
          {/* Venn diagram conceptual */}
          <div className="mt-12 flex justify-center">
            <div className="relative w-80 h-40">
              <div
                className="absolute left-0 top-0 w-52 h-40 rounded-full opacity-60 flex items-center justify-center"
                style={{ background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.3)" }}
              >
                <span className="ml-4 text-sm font-bold uppercase" style={{ fontFamily: "Oswald", color: "var(--neon-cyan)" }}>VR</span>
              </div>
              <div
                className="absolute right-0 top-0 w-52 h-40 rounded-full opacity-60 flex items-center justify-center"
                style={{ background: "rgba(255,0,255,0.12)", border: "1px solid rgba(255,0,255,0.3)" }}
              >
                <span className="mr-4 text-sm font-bold uppercase" style={{ fontFamily: "Oswald", color: "var(--neon-magenta)" }}>AR</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="text-xs text-white font-bold uppercase tracking-wider" style={{ fontFamily: "Oswald" }}>XR</div>
                  <div className="text-xs text-gray-400">3D • Иммерсив</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE SECTION */}
      <section id="future" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,245,255,0.08) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            tag="Будущее технологий"
            title="Перспективы развития"
            subtitle="Как VR и AR изменят человечество в ближайшие 10 лет"
          />
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, var(--neon-cyan), var(--neon-magenta))" }} />
            <div className="space-y-8">
              {FUTURE_ITEMS.map((item, i) => (
                <div key={i} className="card-hover relative pl-16">
                  {/* Year dot */}
                  <div
                    className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      fontFamily: "Oswald",
                      background: "var(--dark-card)",
                      border: `2px solid ${item.color === "cyan" ? "var(--neon-cyan)" : item.color === "magenta" ? "var(--neon-magenta)" : "#8b5cf6"}`,
                      color: item.color === "cyan" ? "var(--neon-cyan)" : item.color === "magenta" ? "var(--neon-magenta)" : "#8b5cf6",
                      boxShadow: `0 0 15px ${item.color === "cyan" ? "rgba(0,245,255,0.3)" : item.color === "magenta" ? "rgba(255,0,255,0.3)" : "rgba(139,92,246,0.3)"}`,
                    }}
                  >
                    {item.year}
                  </div>
                  <div
                    className="p-6 rounded-xl border"
                    style={{
                      background: "var(--dark-card)",
                      borderColor: item.color === "cyan" ? "rgba(0,245,255,0.15)" : item.color === "magenta" ? "rgba(255,0,255,0.15)" : "rgba(139,92,246,0.15)",
                    }}
                  >
                    <h3
                      className="text-xl font-bold mb-2 uppercase tracking-wide"
                      style={{
                        fontFamily: "Oswald",
                        color: item.color === "cyan" ? "var(--neon-cyan)" : item.color === "magenta" ? "var(--neon-magenta)" : "#8b5cf6",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Impact stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { icon: "🌍", title: "Глобальный охват", desc: "К 2030 году более 50% населения Земли будет ежедневно взаимодействовать с AR через смартфоны" },
              { icon: "💰", title: "Экономический эффект", desc: "McKinsey оценивает вклад XR в мировую экономику к 2030 году в $1.5 триллиона" },
              { icon: "🧠", title: "Трансформация обучения", desc: "Студенты, обучающиеся в VR, запоминают материал на 75% лучше, чем при традиционных методах" },
            ].map((card, i) => (
              <div
                key={i}
                className="card-hover p-6 rounded-xl border text-center"
                style={{ background: "var(--dark-card)", borderColor: "rgba(0,245,255,0.15)" }}
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2 uppercase" style={{ fontFamily: "Oswald" }}>{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 border-t" style={{ borderColor: "rgba(0,245,255,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="gradient-line mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full" style={{ background: "var(--neon-cyan)", boxShadow: "0 0 12px var(--neon-cyan)" }} />
              <span className="text-white font-bold uppercase tracking-widest text-lg" style={{ fontFamily: "Oswald" }}>
                <span style={{ color: "var(--neon-cyan)" }}>XR</span>Universe
              </span>
            </div>
            <div className="flex gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-gray-500 hover:text-white text-sm uppercase tracking-wider transition-colors"
                  style={{ fontFamily: "Oswald" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="text-gray-600 text-sm">© 2024 XRUniverse</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
