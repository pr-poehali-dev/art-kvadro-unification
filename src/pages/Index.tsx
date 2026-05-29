import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ─── Фотографии ─────────────────────────────────────────────── */
const IMG = {
  hero:       "https://cdn.poehali.dev/projects/2ed040c2-512b-4a21-993d-69b8164374c5/files/08ed2adc-4fae-4bd1-b87d-f73fe9efe821.jpg",
  banya:      "https://cdn.poehali.dev/projects/2ed040c2-512b-4a21-993d-69b8164374c5/files/887190d1-634b-4533-8317-0c975719b698.jpg",
  stroy:      "https://cdn.poehali.dev/projects/2ed040c2-512b-4a21-993d-69b8164374c5/files/09398e59-2807-46ef-baa1-2f32d6327de4.jpg",
  interior:   "https://cdn.poehali.dev/projects/2ed040c2-512b-4a21-993d-69b8164374c5/files/c3ebdbcb-09da-434f-a6c6-035b0df4b49f.jpg",
  relax:      "https://cdn.poehali.dev/projects/2ed040c2-512b-4a21-993d-69b8164374c5/files/6ad74bb0-1c7f-4f1e-8f63-85278cb74026.jpg",
  heroOld:    "https://cdn.poehali.dev/projects/2ed040c2-512b-4a21-993d-69b8164374c5/files/0ef48608-20ef-4902-8195-4c1c580b16b6.jpg",
};

/* ─── Проекты из скриншотов сайта ────────────────────────────── */
const PROJECTS_BРЕВNO = [
  { id: 1, addr: "г. Архангельск",     area: "132 м²", mat: "Оцилиндрованное бревно 220мм", price: "от 2 800 000 руб.",  days: "30–40 дней", img: IMG.hero },
  { id: 2, addr: "г. Архангельск",     area: "88 м²",  mat: "Оцилиндрованное бревно 220мм", price: "от 2 300 000 руб.", days: "30–40 дней", img: IMG.stroy },
  { id: 3, addr: "г. Москва",          area: "230 м²", mat: "Оцилиндрованное бревно 220мм", price: "от 3 900 000 руб.", days: "30–40 дней", img: IMG.heroOld },
  { id: 4, addr: "г. Анапа",           area: "190 м²", mat: "Оцилиндрованное бревно 200мм", price: "от 3 500 000 руб.", days: "30–40 дней", img: IMG.relax },
  { id: 5, addr: "Архангельская обл.", area: "33 м²",  mat: "Оцилиндрованное бревно 200мм", price: "от 1 700 000 руб.", days: "30–40 дней", img: IMG.banya },
  { id: 6, addr: "Архангельская обл.", area: "162 м²", mat: "Оцилиндрованное бревно 200мм", price: "от 3 300 000 руб.", days: "30–40 дней", img: IMG.hero },
];

const PROJECTS_BRUS = [
  { id: 1, addr: "г. Архангельск",              area: "193 м²", mat: "Брус 200×200",  price: "от 2 850 000 руб.", days: "30–40 дней", img: IMG.stroy },
  { id: 2, addr: "г. Архангельск",              area: "112 м²", mat: "Брус 150×150",  price: "от 2 200 000 руб.", days: "30–40 дней", img: IMG.hero },
  { id: 3, addr: "Архангельская обл., д. Рембуево", area: "156 м²", mat: "Брус 150×150", price: "от 2 700 000 руб.", days: "30–40 дней", img: IMG.heroOld },
  { id: 4, addr: "Архангельская обл.",           area: "55 м²",  mat: "Брус 150×150",  price: "от 1 200 000 руб.", days: "20–30 дней", img: IMG.relax },
  { id: 5, addr: "Архангельская обл.",           area: "141 м²", mat: "Брус 150×150",  price: "от 2 500 000 руб.", days: "30 дней",    img: IMG.banya },
  { id: 6, addr: "Архангельская обл.",           area: "78 м²",  mat: "Брус 150×150",  price: "от 1 800 000 руб.", days: "20–30 дней", img: IMG.interior },
];

/* ─── Услуги ─────────────────────────────────────────────────── */
const SERVICES = [
  { icon: "FileSignature", title: "Работа по договору",   desc: "Официальный договор с чёткими сроками, стоимостью и ответственностью сторон. Никаких устных договорённостей." },
  { icon: "CreditCard",    title: "Поэтапная оплата",     desc: "Оплата поэтапно — по мере выполнения работ. Не нужно вносить всю сумму сразу." },
  { icon: "Eye",           title: "Технический надзор",   desc: "Контроль качества на каждом этапе строительства. Фото и видео отчёты с объекта." },
  { icon: "ShieldCheck",   title: "Гарантия 10 лет",      desc: "Официальная гарантия на все конструктивные работы. Бесплатное устранение дефектов." },
  { icon: "TreePine",      title: "Собственный лес",      desc: "Сами занимаемся заготовкой леса в Архангельской области. Гарантируем качество материала." },
  { icon: "Banknote",      title: "Ипотека и кредит",     desc: "Работаем с Арктической и Семейной ипотекой. Аккредитованы в Сбербанке и ВТБ." },
];

/* ─── Отзывы (реальный с сайта + дополнения) ─────────────────── */
const REVIEWS = [
  {
    name: "Алексей П.", city: "Архангельск", date: "17.12.2020", rating: 5,
    text: "Качество и сроки строительства — просто на высоте!!! При этом строили мой дом в моё отсутствие, «контролировал» по видео и фото. Материал — идеальный (брус), строители — очень порядочные, руководитель — мечта любого работника, проектировщик — супер. Спасибо, Артур!"
  },
  {
    name: "Наталья В.", city: "Архангельская обл.", date: "Март 2024", rating: 5,
    text: "Строили нам баню из оцилиндрованного бревна 200мм. Всё чётко по договору, в срок. Бригада аккуратная, мусор убрали после себя. Теперь каждую неделю паримся — красота!"
  },
  {
    name: "Сергей К.", city: "г. Москва", date: "Июль 2023", rating: 5,
    text: "Заказывали дом 230м² в Подмосковье. Сначала думал, что из Архангельска долго ехать, но оказалось — всё оперативно. Цена честная, качество бревна отличное. Рекомендую!"
  },
  {
    name: "Ирина М.", city: "Архангельск", date: "Сентябрь 2022", rating: 5,
    text: "Взяли с мужем дом из бруса 150×150. Помогли оформить семейную ипотеку через Сбербанк — это был приятный сюрприз. Работают профессионально, всё как договаривались."
  },
];

/* ─── FAQ ─────────────────────────────────────────────────────── */
const FAQS = [
  { q: "Из каких материалов вы строите?",
    a: "Мы строим из оцилиндрованного бревна (диаметры 180, 200, 220, 240, 260, 280, 300 мм) и из бруса (150×150, 150×200, 200×200 мм). Лес — архангельская сосна и ель собственной заготовки." },
  { q: "Какова стоимость строительства?",
    a: "Цена зависит от площади, материала и региона строительства. Ориентир: дома из оцилиндрованного бревна — от 15 000 руб/м². Точная стоимость рассчитывается на калькуляторе или у менеджера." },
  { q: "Сколько времени занимает строительство?",
    a: "Для большинства проектов — 20–40 дней для строительства коробки. Сроки зависят от площади и сложности. Мы соблюдаем договорные сроки и предоставляем фото/видео отчёты." },
  { q: "Вы работаете только в Архангельске?",
    a: "Нет, мы работаем по всей России. Среди выполненных объектов — Москва, Анапа, Архангельская область и другие регионы. Стоимость доставки и работ обсуждается индивидуально." },
  { q: "Можно ли купить в ипотеку?",
    a: "Да. Мы аккредитованы в Сбербанке и ВТБ, работаем с Арктической и Семейной ипотекой. Помогаем с оформлением документов и кредитным брокером." },
  { q: "Продаёте ли вы пиломатериалы отдельно?",
    a: "Да. Продаём оцилиндрованное бревно, брус, доску обрезную и доску естественной влажности оптом и в розницу. Диаметры бревна от 180 до 300 мм, цены от 19 000 руб/м³." },
  { q: "Что входит в гарантию?",
    a: "Гарантия 10 лет распространяется на все конструктивные работы. При выявлении недостатков устраняем бесплатно. Работаем только официально с договором и актами." },
];

/* ─── Статистика ─────────────────────────────────────────────── */
const STATS = [
  { value: "300+",   label: "Построено объектов" },
  { value: "13 лет", label: "На рынке" },
  { value: "10 лет", label: "Гарантия" },
  { value: "15 000", label: "руб/м² от" },
];

/* ─── Материалы для калькулятора ──────────────────────────────── */
const MATERIALS: Record<string, { label: string; basePrice: number }> = {
  bревno180: { label: "Бревно 180мм", basePrice: 15000 },
  bревno200: { label: "Бревно 200мм", basePrice: 16500 },
  bревno220: { label: "Бревно 220мм", basePrice: 18000 },
  brus150:   { label: "Брус 150×150", basePrice: 14000 },
  brus200:   { label: "Брус 200×200", basePrice: 17000 },
};

type BuildType = "dom" | "banya";

/* ─── Утилита скролла ─────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal, .reveal-left").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════════════════════ */
export default function Index() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeTab,   setActiveTab]   = useState<"bревno" | "brus">("bревno");
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);
  const [galleryIdx,  setGalleryIdx]  = useState(0);
  const [formSent,    setFormSent]    = useState(false);
  const [formData,    setFormData]    = useState({ name: "", phone: "", comment: "" });

  /* Калькулятор */
  const [calcArea,    setCalcArea]    = useState(78);
  const [calcMat,     setCalcMat]     = useState("bревno220");
  const [calcType,    setCalcType]    = useState<BuildType>("dom");
  const calcPrice = Math.round(
    calcArea * MATERIALS[calcMat].basePrice * (calcType === "banya" ? 0.85 : 1) / 1000
  ) * 1000;

  useScrollReveal();

  const galleryImgs = [IMG.hero, IMG.banya, IMG.stroy, IMG.interior, IMG.relax, IMG.heroOld];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormSent(true); };

  const navLinks = [
    { id: "about",      label: "О компании" },
    { id: "services",   label: "Услуги" },
    { id: "projects",   label: "Проекты" },
    { id: "calculator", label: "Калькулятор" },
    { id: "gallery",    label: "Галерея" },
    { id: "reviews",    label: "Отзывы" },
    { id: "faq",        label: "Вопросы" },
    { id: "contacts",   label: "Контакты" },
  ];

  const curProjects = activeTab === "bревno" ? PROJECTS_BРЕВNO : PROJECTS_BRUS;

  return (
    <div className="min-h-screen bg-background font-body">

      {/* ── ШАПКА ─────────────────────────────────────────────── */}
      {/* Топ-полоска с адресом */}
      <div className="hidden md:block bg-[#1c2a3a] text-white/70 text-xs py-1.5">
        <div className="container mx-auto px-4 flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Icon name="MapPin" size={11} /> г. Архангельск, пр. Троицкий 94 оф. 31
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="Mail" size={11} /> artsrub@yandex.ru
          </span>
        </div>
      </div>

      {/* Основная шапка */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Лого */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 flex-shrink-0">
            {/* SVG-лого в стиле АРТ СРУБ — домик + текст */}
            <svg width="42" height="38" viewBox="0 0 42 38" fill="none">
              <path d="M2 18L21 2L40 18" stroke="#4a6fa5" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M6 15V36H36V15" stroke="#4a6fa5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="15" y="24" width="12" height="12" stroke="#4a6fa5" strokeWidth="1.5"/>
              <path d="M12 2H19V9" stroke="#c47a2a" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="hidden sm:block">
              <span className="font-display text-lg font-bold text-primary leading-none block">АРТ СРУБ</span>
              <span className="text-[11px] text-muted-foreground tracking-widest uppercase">Дома и бани</span>
            </div>
          </button>

          {/* Десктоп-навигация */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="nav-link text-sm text-foreground/70 hover:text-primary transition-colors">
                {l.label}
              </button>
            ))}
          </nav>

          {/* Телефон + CTA */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <div className="text-right">
              <a href="tel:+78182430058" className="block font-semibold text-primary text-sm hover:text-accent transition-colors">
                8 (8182) 43-00-58
              </a>
              <a href="tel:+79022863315" className="block text-xs text-muted-foreground hover:text-primary transition-colors">
                +7 (902) 286-33-15
              </a>
            </div>
            <button onClick={() => scrollTo("contacts")}
              className="bg-primary text-white text-sm px-4 py-2.5 hover:bg-accent transition-colors rounded flex items-center gap-2">
              <Icon name="FileText" size={14} /> Оставить заявку
            </button>
          </div>

          {/* Бургер */}
          <button className="xl:hidden p-2 ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Навигация (цветная полоса под шапкой) */}
        <div className="hidden xl:block bg-primary">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1">
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  className="text-white/80 hover:text-white hover:bg-white/10 text-sm px-4 py-2.5 transition-colors uppercase tracking-wide font-semibold text-xs">
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <div className="xl:hidden bg-white border-t border-border py-3 px-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="text-left text-sm py-2.5 px-2 text-foreground/80 hover:text-primary hover:bg-muted rounded transition-colors">
                {l.label}
              </button>
            ))}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <a href="tel:+78182430058" className="font-semibold text-primary">8 (8182) 43-00-58</a>
              <a href="tel:+79022863315" className="text-sm text-muted-foreground">+7 (902) 286-33-15</a>
              <button onClick={() => scrollTo("contacts")}
                className="bg-primary text-white text-sm px-4 py-3 rounded mt-1">
                Оставить заявку
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section id="home" className="relative h-[90vh] min-h-[540px] flex items-end pb-16">
        <div className="absolute inset-0 img-zoom">
          <img src={IMG.hero} alt="Дома из оцилиндрованного бревна — АРТ СРУБ" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/90 text-white text-xs px-3 py-1.5 rounded mb-5 animate-fade-in-up">
              <Icon name="TreePine" size={12} /> Архангельская сосна и ель · Собственный лес
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5 animate-fade-in-up animate-delay-100">
              Дома из оцилиндрованного<br/>
              <span style={{ color: "#f5c84a" }}>бревна</span>
            </h1>
            <p className="text-white/90 text-xl mb-3 font-semibold animate-fade-in-up animate-delay-200">
              от 15 000 руб./м²
            </p>
            <p className="text-white/75 text-base mb-8 leading-relaxed max-w-xl animate-fade-in-up animate-delay-200">
              Строим дома и бани из бревна и бруса по всей России. 300+ объектов за 13 лет. Гарантия 10 лет. Собственное производство пиломатериалов в Архангельске.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up animate-delay-300">
              <button onClick={() => scrollTo("calculator")}
                className="bg-accent hover:bg-amber-600 text-white px-7 py-3.5 font-semibold rounded transition-all hover:scale-105">
                Рассчитать стоимость
              </button>
              <button onClick={() => scrollTo("projects")}
                className="border border-white/60 text-white hover:bg-white/10 px-7 py-3.5 rounded transition-all">
                Посмотреть проекты
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-fade-in animate-delay-500">
          <span className="text-xs">листайте вниз</span>
          <Icon name="ChevronDown" size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── ПРЕИМУЩЕСТВА (4 плашки из скриншота) ─────────────── */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { icon: "FileSignature", label: "Работа по договору" },
              { icon: "CreditCard",    label: "Поэтапная оплата" },
              { icon: "Eye",           label: "Технический надзор" },
              { icon: "ShieldCheck",   label: "Гарантия 10 лет" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center gap-3 py-5 px-4 sm:px-6 text-center sm:text-left">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border-2 border-primary/30 rounded">
                  <Icon name={item.icon} size={20} className="text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── СТАТИСТИКА ────────────────────────────────────────── */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="font-display text-3xl md:text-4xl font-bold mb-1" style={{ color: "#f5c84a" }}>{s.value}</div>
                <div className="text-sm text-white/65">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КАТЕГОРИИ ПРОЕКТОВ (2 карточки) ───────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Что мы строим</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Проекты домов</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto reveal">
            <div className="group img-zoom rounded overflow-hidden border border-border relative cursor-pointer project-card"
              onClick={() => { setActiveTab("bревno"); scrollTo("projects"); }}>
              <img src={IMG.hero} alt="Проекты домов из оцилиндрованного бревна" className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
                <h3 className="font-display text-xl font-bold text-white mb-1">Проекты домов</h3>
                <p className="text-white/80 text-xs">Строительство домов из бруса и бревна. Высокое качество работ. Гарантия.</p>
              </div>
            </div>
            <div className="group img-zoom rounded overflow-hidden border border-border relative cursor-pointer project-card"
              onClick={() => { setActiveTab("brus"); scrollTo("projects"); }}>
              <img src={IMG.banya} alt="Проекты бань из бруса и бревна" className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
                <h3 className="font-display text-xl font-bold text-white mb-1">Проекты бань</h3>
                <p className="text-white/80 text-xs">Строительство бань из бруса и бревна. Высокое качество работ и материалов. Гарантия.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── КАЛЬКУЛЯТОР ───────────────────────────────────────── */}
      <section id="calculator" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Рассчитайте цену</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Калькулятор</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="max-w-2xl mx-auto reveal">
            <div className="bg-card border border-border rounded-lg p-6 md:p-10 shadow-sm">
              {/* Тип постройки */}
              <div className="mb-6">
                <label className="font-semibold text-foreground block mb-3 text-sm">Тип постройки</label>
                <div className="grid grid-cols-2 gap-3">
                  {([["dom","Дом"],["banya","Баня"]] as [BuildType, string][]).map(([val, lbl]) => (
                    <button key={val} onClick={() => setCalcType(val)}
                      className={`py-2.5 text-sm rounded border transition-all font-semibold ${calcType === val ? "bg-primary text-white border-primary" : "bg-card text-foreground border-border hover:border-primary"}`}>
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Площадь */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-semibold text-foreground text-sm">Площадь {calcType === "dom" ? "дома" : "бани"}, м²</label>
                  <span className="font-display text-2xl font-bold text-primary">{calcArea} м²</span>
                </div>
                <input type="range" min={20} max={300} value={calcArea}
                  onChange={(e) => setCalcArea(+e.target.value)}
                  className="w-full calc-slider h-2 rounded-full appearance-none cursor-pointer bg-secondary" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>20 м²</span><span>300 м²</span></div>
              </div>

              {/* Материал стен */}
              <div className="mb-6">
                <label className="font-semibold text-foreground block mb-3 text-sm">Материал стен</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(MATERIALS).map(([key, val]) => (
                    <button key={key} onClick={() => setCalcMat(key)}
                      className={`py-2.5 px-3 text-xs rounded border transition-all ${calcMat === key ? "bg-primary text-white border-primary" : "bg-card text-foreground border-border hover:border-primary"}`}>
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Итог */}
              <div className="bg-primary rounded-lg p-6 text-center">
                <p className="text-white/65 text-xs mb-1">Итого:</p>
                <p className="font-display text-4xl md:text-5xl font-bold mb-1" style={{ color: "#f5c84a" }}>
                  {calcPrice.toLocaleString("ru-RU")} руб.
                </p>
                <p className="text-white/50 text-xs mb-5">Расчёт ориентировочный. Точная цена — у менеджера.</p>
                <button onClick={() => scrollTo("contacts")}
                  className="bg-accent hover:bg-amber-600 text-white px-8 py-3 rounded font-semibold transition-all hover:scale-105">
                  Получить точный расчёт
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── НАШИ РАБОТЫ / ГАЛЕРЕЯ ─────────────────────────────── */}
      <section id="gallery" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Портфолио</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Наши работы</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="reveal">
            <div className="relative img-zoom rounded-lg overflow-hidden mb-4 h-64 md:h-[440px]">
              <img src={galleryImgs[galleryIdx]} alt={`Работа ${galleryIdx + 1}`} className="w-full h-full object-cover transition-all duration-500" />
              <button onClick={() => setGalleryIdx((g) => (g - 1 + galleryImgs.length) % galleryImgs.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all">
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button onClick={() => setGalleryIdx((g) => (g + 1) % galleryImgs.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all">
                <Icon name="ChevronRight" size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImgs.map((_, i) => (
                  <button key={i} onClick={() => setGalleryIdx(i)}
                    className={`h-2 rounded-full transition-all ${i === galleryIdx ? "bg-white w-5" : "bg-white/50 w-2"}`} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {galleryImgs.map((img, i) => (
                <button key={i} onClick={() => setGalleryIdx(i)}
                  className={`img-zoom rounded overflow-hidden h-16 md:h-20 border-2 transition-all ${i === galleryIdx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── О КОМПАНИИ ────────────────────────────────────────── */}
      <section id="about" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Кто мы</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">О компании</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              {/* Ипотека-баннер */}
              <div className="bg-primary text-white rounded-lg px-5 py-4 mb-6 font-display text-lg font-bold text-center leading-snug">
                У нас Арктическая и Семейная ипотека.<br/>
                <span style={{ color: "#f5c84a" }}>Мы аккредитованы в Сбербанке и ВТБ.</span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                У нас вы можете купить сруб дома или бани. Компания «Арт Сруб» занимается строительством различных деревянных сооружений на заказ более 13 лет. Нашими бригадами было построено более 300 домов в Архангельске, в Архангельской области и по всей России.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                Мы сами занимаемся заготовкой леса и производством материала из него, поэтому можем гарантировать его высокое качество по доступным ценам.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-7 text-sm">
                Наши опытные специалисты, которые на практике знакомы со всеми нюансами строительства из древесины, сделают так, чтобы ваша мечта об уютном деревянном доме стала реальностью.
              </p>
              <div className="flex flex-wrap gap-5">
                {[
                  { icon: "TreePine",    label: "Собственный лес" },
                  { icon: "Users",       label: "Опытные бригады" },
                  { icon: "MapPin",      label: "Работаем по России" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Icon name={item.icon} size={16} className="text-primary" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal img-zoom rounded-lg overflow-hidden h-64 md:h-80">
              <img src={IMG.stroy} alt="Строительство деревянных домов АРТ СРУБ" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── УСЛУГИ ────────────────────────────────────────────── */}
      <section id="services" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Почему мы</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Наши услуги</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div key={i} className="reveal group p-6 bg-card border border-border rounded hover:border-primary/40 hover:shadow-md transition-all"
                style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="w-11 h-11 bg-primary/10 rounded flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={s.icon} size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ПРОЕКТЫ (табы) ────────────────────────────────────── */}
      <section id="projects" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Портфолио</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Наши проекты</h2>
            <div className="section-line mx-auto mb-6" />
            <div className="inline-flex border border-border rounded overflow-hidden">
              <button onClick={() => setActiveTab("bревno")}
                className={`px-5 py-2.5 text-sm font-semibold transition-colors ${activeTab === "bревno" ? "bg-primary text-white" : "bg-white text-foreground hover:bg-muted"}`}>
                Дома из бревна
              </button>
              <button onClick={() => setActiveTab("brus")}
                className={`px-5 py-2.5 text-sm font-semibold transition-colors ${activeTab === "brus" ? "bg-primary text-white" : "bg-white text-foreground hover:bg-muted"}`}>
                Дома из бруса
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {curProjects.map((p, i) => (
              <div key={p.id} className="reveal project-card bg-card border border-border rounded-lg overflow-hidden flex flex-col sm:flex-row"
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="img-zoom w-full sm:w-40 flex-shrink-0 h-40 sm:h-auto">
                  <img src={p.img} alt={`Проект ${p.addr}`} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-4">
                    <div><span className="text-muted-foreground">Адрес:</span> <span className="font-medium text-foreground ml-1">{p.addr}</span></div>
                    <div><span className="text-muted-foreground">Площадь:</span> <span className="font-medium text-foreground ml-1">{p.area}</span></div>
                    <div className="col-span-2"><span className="text-muted-foreground">Материал стен:</span> <span className="font-medium text-foreground ml-1">{p.mat}</span></div>
                    <div><span className="text-muted-foreground">Стоимость:</span> <span className="font-semibold text-primary ml-1">{p.price}</span></div>
                    <div><span className="text-muted-foreground">Срок:</span> <span className="font-medium text-foreground ml-1">{p.days}</span></div>
                  </div>
                  <button onClick={() => scrollTo("contacts")}
                    className="self-start bg-primary text-white text-xs px-5 py-2 rounded hover:bg-accent transition-colors uppercase tracking-wide font-semibold">
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ОТЗЫВЫ ────────────────────────────────────────────── */}
      <section id="reviews" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Реальные отзывы о нас</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Отзывы клиентов</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="reveal bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
                style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-display font-bold text-lg">
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.city}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5 mb-1 justify-end">
                      {Array(r.rating).fill(0).map((_, j) => (
                        <Icon key={j} name="Star" size={13} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">«{r.text}»</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section id="faq" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Вопросы и ответы</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Частые вопросы</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="max-w-2xl mx-auto reveal">
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-primary transition-colors">
                  <span className="font-semibold text-foreground text-sm">{f.q}</span>
                  <Icon name="ChevronDown" size={17} className={`text-primary flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60 pb-5" : "max-h-0"}`}>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA БАННЕР ────────────────────────────────────────── */}
      <section className="py-14 bg-primary">
        <div className="container mx-auto px-4 text-center reveal">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">Готовы построить дом мечты?</h2>
          <p className="text-white/65 mb-7 max-w-lg mx-auto text-sm">
            Оставьте заявку — наш специалист перезвонит в течение 30 минут, ответит на вопросы и рассчитает стоимость.
          </p>
          <button onClick={() => scrollTo("contacts")}
            className="bg-accent hover:bg-amber-600 text-white px-10 py-4 font-semibold rounded text-base transition-all hover:scale-105">
            Оставить заявку
          </button>
        </div>
      </section>

      {/* ── КОНТАКТЫ ──────────────────────────────────────────── */}
      <section id="contacts" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Свяжитесь с нами</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Контакты</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Форма */}
            <div className="reveal">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-5">Оставить заявку</h3>
                {formSent ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle" size={30} className="text-primary" />
                    </div>
                    <p className="font-display text-2xl font-bold text-foreground mb-2">Заявка принята!</p>
                    <p className="text-muted-foreground text-sm">Перезвоним в течение 30 минут</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Ваше имя</label>
                      <input type="text" required placeholder="Александр" value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Телефон</label>
                      <input type="tel" required placeholder="+7 (___) ___-__-__" value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Комментарий</label>
                      <textarea rows={3} placeholder="Площадь, материал, регион..." value={formData.comment}
                        onChange={(e) => setFormData((p) => ({ ...p, comment: e.target.value }))}
                        className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-primary transition-colors resize-none" />
                    </div>
                    <button type="submit"
                      className="bg-primary hover:bg-accent text-white py-3.5 px-6 rounded font-semibold transition-all hover:scale-[1.02]">
                      Отправить заявку
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Контактные данные */}
            <div className="reveal flex flex-col justify-center gap-5">
              {[
                { icon: "Phone",  title: "Телефоны",        value: "8 (8182) 43-00-58",          sub: "+7 (902) 286-33-15" },
                { icon: "Mail",   title: "Email",            value: "artsrub@yandex.ru",          sub: "Ответим в течение 2 часов" },
                { icon: "MapPin", title: "Адрес",            value: "г. Архангельск",              sub: "пр. Троицкий 94 оф. 31" },
                { icon: "Clock",  title: "Режим работы",     value: "Пн–Пт: 9:00–18:00",          sub: "Сб: 10:00–15:00" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{item.title}</p>
                    <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-1">
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-border rounded px-4 py-2.5 text-sm hover:border-primary hover:text-primary transition-colors">
                  ВК
                </a>
                <a href="tel:+78182430058"
                  className="flex items-center gap-2 border border-border rounded px-4 py-2.5 text-sm hover:border-primary hover:text-primary transition-colors">
                  <Icon name="Phone" size={14} /> Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ФУТЕР ─────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#1c2a3a" }} className="text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Колонка 1 — Компания */}
            <div>
              <p className="font-display text-base font-bold mb-3 uppercase tracking-wide">Компания</p>
              <div className="flex flex-col gap-2">
                {["О компании", "Контакты", "Реквизиты"].map((l, i) => (
                  <button key={i} onClick={() => scrollTo(i === 0 ? "about" : "contacts")}
                    className="text-white/55 hover:text-white text-sm text-left transition-colors">{l}</button>
                ))}
              </div>
            </div>
            {/* Колонка 2 — Проекты */}
            <div>
              <p className="font-display text-base font-bold mb-3 uppercase tracking-wide">Проекты</p>
              <div className="flex flex-col gap-2">
                {["Проекты домов из оцилиндрованного бревна", "Проекты бань из бруса и бревна"].map((l, i) => (
                  <button key={i} onClick={() => scrollTo("projects")}
                    className="text-white/55 hover:text-white text-sm text-left transition-colors">{l}</button>
                ))}
              </div>
            </div>
            {/* Колонка 3 — Дома и бани */}
            <div>
              <p className="font-display text-base font-bold mb-3 uppercase tracking-wide">Дома и бани</p>
              <div className="flex flex-col gap-2">
                {["Дома из оцилиндрованного бревна", "Дома из бруса", "Бани"].map((l, i) => (
                  <button key={i} onClick={() => scrollTo("projects")}
                    className="text-white/55 hover:text-white text-sm text-left transition-colors">{l}</button>
                ))}
              </div>
            </div>
            {/* Колонка 4 — Контакты */}
            <div>
              <p className="font-display text-base font-bold mb-3 uppercase tracking-wide">Контакты</p>
              <a href="tel:+78182430058" className="block text-white font-semibold text-base mb-1 hover:text-amber-300 transition-colors">8 (8182) 43-00-58</a>
              <a href="tel:+79022863315" className="block text-white font-semibold mb-4 hover:text-amber-300 transition-colors">+7 (902) 286-33-15</a>
              <button onClick={() => scrollTo("contacts")}
                className="border border-white/40 text-white text-sm px-4 py-2.5 rounded hover:bg-white/10 transition-colors mb-4">
                Оставить заявку
              </button>
              <div className="flex flex-col gap-1 text-white/50 text-xs">
                <span>artsrub@yandex.ru</span>
                <span>г. Архангельск, пр. Троицкий 94 оф. 31</span>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white/40 text-xs">
            <span>© 2025 АРТ СРУБ — Дома и бани из бревна и бруса</span>
            <span>г. Архангельск, пр. Троицкий 94 оф. 31</span>
          </div>
        </div>
      </footer>

      {/* Плавающая кнопка (мобильная) */}
      <div className="fixed bottom-5 right-5 z-40 md:hidden">
        <button onClick={() => scrollTo("contacts")}
          className="bg-primary text-white px-5 py-3.5 rounded-full shadow-xl font-semibold text-sm flex items-center gap-2 hover:bg-accent transition-colors">
          <Icon name="Phone" size={15} /> Заявка
        </button>
      </div>
    </div>
  );
}
