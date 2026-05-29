import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  hero: "https://cdn.poehali.dev/projects/2ed040c2-512b-4a21-993d-69b8164374c5/files/0ef48608-20ef-4902-8195-4c1c580b16b6.jpg",
  interior: "https://cdn.poehali.dev/projects/2ed040c2-512b-4a21-993d-69b8164374c5/files/c3ebdbcb-09da-434f-a6c6-035b0df4b49f.jpg",
  relax: "https://cdn.poehali.dev/projects/2ed040c2-512b-4a21-993d-69b8164374c5/files/6ad74bb0-1c7f-4f1e-8f63-85278cb74026.jpg",
};

const PROJECTS = [
  { id: 1, name: "Баня «Кедровая»", size: "5×3 м", price: "от 480 000 ₽", tag: "Хит продаж", img: IMAGES.hero, desc: "Классика с просторной парной и комнатой отдыха" },
  { id: 2, name: "Баня «Люкс»", size: "6×4 м", price: "от 680 000 ₽", tag: "Премиум", img: IMAGES.interior, desc: "Панорамные окна, отделка кедром, тёплый пол" },
  { id: 3, name: "Баня «Стандарт»", size: "4×3 м", price: "от 350 000 ₽", tag: "Бюджетный", img: IMAGES.relax, desc: "Оптимальное соотношение цены и качества" },
  { id: 4, name: "Баня «Семейная»", size: "7×4 м", price: "от 890 000 ₽", tag: "Большая", img: IMAGES.hero, desc: "До 10 человек, бассейн, веранда в комплекте" },
  { id: 5, name: "Баня «Мини»", size: "3×2.5 м", price: "от 280 000 ₽", tag: "Компактная", img: IMAGES.interior, desc: "Для небольших участков, полный функционал" },
  { id: 6, name: "Баня «Эко»", size: "5×4 м", price: "от 560 000 ₽", tag: "Экостиль", img: IMAGES.relax, desc: "Натуральное дерево, экологичные материалы" },
];

const SERVICES = [
  { icon: "Package", title: "Производство", desc: "Собственный завод в Московской области. Полный цикл — от заготовки дерева до финишной отделки." },
  { icon: "Truck", title: "Доставка", desc: "Привезём баню на участок за 1–3 дня. Работаем по всей Москве и Московской области." },
  { icon: "Wrench", title: "Монтаж за 1 день", desc: "Бригада из 4 специалистов установит баню за один рабочий день. Без строительства и грязи." },
  { icon: "Shield", title: "Гарантия 5 лет", desc: "Официальная гарантия на конструкцию и все элементы. Бесплатное сервисное обслуживание." },
  { icon: "Plug", title: "Подключение", desc: "Подключим к электросети, воде и канализации. Баня готова к использованию сразу." },
  { icon: "FileText", title: "Документы", desc: "Договор, чеки, гарантийный талон. Работаем официально, принимаем все формы оплаты." },
];

const REVIEWS = [
  { name: "Андрей К.", city: "Подмосковье", rating: 5, text: "Заказали баню 5×3 в начале мая. Через 10 дней уже парились! Качество дерева отличное, бригада чистая и быстрая. Отдельное спасибо за помощь с выбором планировки.", date: "Май 2025" },
  { name: "Елена М.", city: "Москва", rating: 5, text: "Долго выбирала между несколькими компаниями. Остановилась на КвадроБане из-за реальных фото и внятных цен. Результат превзошёл ожидания — баня просто красавица.", date: "Апрель 2025" },
  { name: "Сергей Д.", city: "Дмитров", rating: 5, text: "Взяли баню «Люкс» с панорамными окнами. Монтаж занял 8 часов. Уже полгода пользуемся — ни одной проблемы. Рекомендую всем!", date: "Ноябрь 2024" },
  { name: "Ольга П.", city: "Серпухов", rating: 5, text: "Очень довольна! Ребята помогли выбрать размер под участок, всё привезли в срок. Соседи уже завидуют — просят контакты.", date: "Март 2025" },
];

const FAQS = [
  { q: "Сколько времени занимает установка?", a: "Монтаж занимает 1 рабочий день — от 6 до 10 часов. Это возможно благодаря заводской готовности всех элементов: на участке мы только собираем, а не строим." },
  { q: "Нужен ли фундамент?", a: "Нет. Бани устанавливаются на винтовые сваи или тумбы — это быстро, надёжно и не требует отдельного проекта. Мы сами подберём оптимальный вариант под ваш участок." },
  { q: "Можно ли заказать баню с индивидуальной планировкой?", a: "Да. Мы разработаем планировку под ваши пожелания: расположение парной, душевой, комнаты отдыха, размеры и отделку. Цена рассчитывается индивидуально." },
  { q: "Из какого материала изготавливаются бани?", a: "Используем профилированный брус из кедра, лиственницы или сосны — в зависимости от модели. Все материалы экологичны, проходят проверку и имеют сертификаты." },
  { q: "Как происходит доставка?", a: "Баня доставляется на грузовом транспорте в разобранном виде. Зашли на участок — и через день готово. Работаем по Москве и Московской области, выезд в регионы согласовывается." },
  { q: "Что входит в стоимость?", a: "В базовую цену входит: производство, доставка, монтаж, фундамент (сваи), кровля, отделка снаружи и внутри, установка окон и дверей. Печь, мебель и сантехника — по желанию." },
  { q: "Есть ли гарантия?", a: "Да, официальная гарантия 5 лет на конструкцию. Первое техобслуживание проводим бесплатно через 6 месяцев после установки." },
];

const STATS = [
  { value: "500+", label: "Бань установлено" },
  { value: "1 день", label: "Срок монтажа" },
  { value: "5 лет", label: "Гарантия" },
  { value: "15 лет", label: "На рынке" },
];

const EXTRAS = [
  { id: "pech", label: "Печь дровяная", price: 35000 },
  { id: "teply_pol", label: "Тёплый пол", price: 18000 },
  { id: "bassein", label: "Мини-бассейн", price: 65000 },
  { id: "veranda", label: "Веранда", price: 42000 },
  { id: "kamin", label: "Камин", price: 28000 },
];

const MATERIALS: Record<string, { label: string; coeff: number }> = {
  sosna: { label: "Сосна", coeff: 1 },
  listvennica: { label: "Лиственница", coeff: 1.25 },
  kedr: { label: "Кедр", coeff: 1.5 },
};

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll(".reveal, .reveal-left");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [calcValues, setCalcValues] = useState({ size: 15, material: "sosna", extras: [] as string[] });
  const [calcResult, setCalcResult] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [formSent, setFormSent] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const base = calcValues.size * 22000;
    const matCoeff = MATERIALS[calcValues.material].coeff;
    const extrasSum = calcValues.extras.reduce((acc, id) => {
      const extra = EXTRAS.find((e) => e.id === id);
      return acc + (extra?.price || 0);
    }, 0);
    setCalcResult(Math.round((base * matCoeff + extrasSum) / 1000) * 1000);
  }, [calcValues]);

  const toggleExtra = (id: string) => {
    setCalcValues((prev) => ({
      ...prev,
      extras: prev.extras.includes(id) ? prev.extras.filter((e) => e !== id) : [...prev.extras, id],
    }));
  };

  const galleryImages = [IMAGES.hero, IMAGES.interior, IMAGES.relax, IMAGES.hero, IMAGES.interior, IMAGES.relax];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const navLinks = [
    { id: "services", label: "Услуги" },
    { id: "projects", label: "Проекты" },
    { id: "calculator", label: "Калькулятор" },
    { id: "gallery", label: "Галерея" },
    { id: "about", label: "О компании" },
    { id: "reviews", label: "Отзывы" },
    { id: "faq", label: "Вопросы" },
    { id: "contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background font-body">

      {/* NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-display text-xl font-bold text-primary tracking-wide">
            Квадро<span className="text-accent">Баня</span>
          </button>
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link text-sm text-foreground/70 hover:text-foreground transition-colors">
                {l.label}
              </button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+74951234567" className="text-sm font-semibold text-primary hover:text-accent transition-colors">
              +7 (495) 123-45-67
            </a>
            <button onClick={() => scrollTo("contacts")} className="bg-accent text-white text-sm px-4 py-2 hover:bg-primary transition-colors rounded">
              Заказать баню
            </button>
          </div>
          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border py-4 px-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left text-sm py-2 text-foreground/80 hover:text-accent transition-colors">
                {l.label}
              </button>
            ))}
            <a href="tel:+74951234567" className="text-sm font-semibold text-primary mt-2">+7 (495) 123-45-67</a>
            <button onClick={() => scrollTo("contacts")} className="bg-accent text-white text-sm px-4 py-3 rounded text-center">Заказать баню</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-end pb-16 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <img src={IMAGES.hero} alt="КвадроБаня — просторная баня за 1 день" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent/90 text-white text-xs px-3 py-1.5 rounded mb-6 animate-fade-in-up">
              <Icon name="Zap" size={12} />
              Монтаж за 1 день · Гарантия 5 лет
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up animate-delay-100">
              Просторная баня<br />
              <span style={{ color: "#fcd34d" }}>за один день</span>
            </h1>
            <p className="text-white/85 text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up animate-delay-200 max-w-xl">
              Полноценная баня с парной, душевой и комнатой отдыха. Без стройки, переделок и разочарований. Сразу готова к использованию.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
              <button onClick={() => scrollTo("calculator")} className="bg-accent hover:bg-amber-600 text-white px-8 py-4 text-base font-semibold rounded transition-all hover:scale-105">
                Рассчитать стоимость
              </button>
              <button onClick={() => scrollTo("projects")} className="border border-white/60 text-white hover:bg-white/10 px-8 py-4 text-base rounded transition-all">
                Посмотреть проекты
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <span className="text-xs">листайте вниз</span>
          <Icon name="ChevronDown" size={18} className="animate-bounce" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="font-display text-3xl md:text-4xl font-bold mb-1" style={{ color: "#fcd34d" }}>{s.value}</div>
                <div className="text-sm opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 reveal">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Что мы делаем</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Наши услуги</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="reveal group p-6 bg-card border border-border rounded hover:border-accent/50 hover:shadow-lg transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 bg-accent/10 rounded flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon name={s.icon} size={22} className="text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 reveal">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Наши модели</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Проекты бань</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="project-card reveal bg-card rounded overflow-hidden border border-border" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="img-zoom relative h-52">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-accent text-white text-xs px-2.5 py-1 rounded">{p.tag}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-xl font-bold text-foreground">{p.name}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{p.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary text-base">{p.price}</span>
                    <button onClick={() => scrollTo("contacts")} className="text-xs bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-accent transition-colors">
                      Заказать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 reveal">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Считаем вместе</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Калькулятор стоимости</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto reveal">
            <div className="bg-card border border-border rounded-lg p-6 md:p-10">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-semibold text-foreground">Площадь бани</label>
                  <span className="font-display text-2xl font-bold text-accent">{calcValues.size} м²</span>
                </div>
                <input
                  type="range" min={6} max={40} value={calcValues.size}
                  onChange={(e) => setCalcValues((p) => ({ ...p, size: +e.target.value }))}
                  className="w-full calc-slider h-2 rounded-full appearance-none cursor-pointer bg-muted"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>6 м²</span><span>40 м²</span>
                </div>
              </div>

              <div className="mb-8">
                <label className="font-semibold text-foreground block mb-3">Материал</label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(MATERIALS).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setCalcValues((p) => ({ ...p, material: key }))}
                      className={`py-3 px-4 text-sm rounded border transition-all ${calcValues.material === key ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-accent"}`}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="font-semibold text-foreground block mb-3">Дополнительно</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXTRAS.map((ex) => (
                    <label key={ex.id} className="flex items-center gap-3 p-3 rounded border border-border cursor-pointer hover:border-accent transition-colors">
                      <input type="checkbox" checked={calcValues.extras.includes(ex.id)} onChange={() => toggleExtra(ex.id)} className="w-4 h-4 accent-amber-600" />
                      <span className="flex-1 text-sm text-foreground">{ex.label}</span>
                      <span className="text-xs text-muted-foreground">+{(ex.price / 1000).toFixed(0)} тыс.</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-primary rounded-lg p-6 text-center">
                <p className="text-primary-foreground/70 text-sm mb-2">Примерная стоимость</p>
                <p className="font-display text-4xl md:text-5xl font-bold mb-1" style={{ color: "#fcd34d" }}>
                  {calcResult.toLocaleString("ru-RU")} ₽
                </p>
                <p className="text-primary-foreground/60 text-xs mb-5">Точная цена — после замера участка</p>
                <button onClick={() => scrollTo("contacts")} className="bg-accent hover:bg-amber-600 text-white px-8 py-3 rounded font-semibold transition-all hover:scale-105">
                  Получить точный расчёт
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 reveal">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Наши работы</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Галерея</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="reveal">
            <div className="relative img-zoom rounded-lg overflow-hidden mb-4 h-72 md:h-[480px]">
              <img src={galleryImages[galleryIdx]} alt={`Баня фото ${galleryIdx + 1}`} className="w-full h-full object-cover transition-all duration-500" />
              <button onClick={() => setGalleryIdx((g) => (g - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all">
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button onClick={() => setGalleryIdx((g) => (g + 1) % galleryImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all">
                <Icon name="ChevronRight" size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, i) => (
                  <button key={i} onClick={() => setGalleryIdx(i)} className={`h-2 rounded-full transition-all ${i === galleryIdx ? "bg-white w-5" : "bg-white/50 w-2"}`} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {galleryImages.map((img, i) => (
                <button key={i} onClick={() => setGalleryIdx(i)} className={`img-zoom rounded overflow-hidden h-16 md:h-20 border-2 transition-all ${i === galleryIdx ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Кто мы</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">О компании</h2>
              <div className="section-line mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-5">
                КвадроБаня — производитель готовых бань с 2009 года. За 15 лет работы мы установили более 500 бань в Москве и Подмосковье, выработали собственные стандарты качества и научились делать всё быстро без потери в качестве.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-5">
                У нас собственный завод в Московской области. Полный производственный цикл — от закупки дерева до финишной отделки — позволяет контролировать каждый этап и держать цены честными.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Мы не субподрядчики и не посредники. Все работы выполняет наша бригада. Всегда в срок, всегда с гарантией.
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: "Factory", label: "Собственное производство" },
                  { icon: "Users", label: "Штатные монтажники" },
                  { icon: "Award", label: "Сертифицированные материалы" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Icon name={item.icon} size={18} className="text-accent" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal img-zoom rounded-lg overflow-hidden h-72 md:h-96">
              <img src={IMAGES.interior} alt="Производство КвадроБаня" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 reveal">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Клиенты о нас</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Отзывы</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="reveal bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.city}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-1">
                      {Array(r.rating).fill(0).map((_, j) => (
                        <Icon key={j} name="Star" size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-right">{r.date}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">«{r.text}»</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 reveal">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Ответы на вопросы</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Частые вопросы</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="max-w-2xl mx-auto reveal">
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-accent transition-colors">
                  <span className="font-semibold text-foreground text-base">{f.q}</span>
                  <Icon name="ChevronDown" size={18} className={`text-accent flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60 pb-5" : "max-h-0"}`}>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center reveal">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Готовы к своей бане?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Оставьте заявку — наш специалист позвонит в течение 30 минут, ответит на вопросы и рассчитает точную стоимость.
          </p>
          <button onClick={() => scrollTo("contacts")} className="bg-accent hover:bg-amber-600 text-white px-10 py-4 font-semibold rounded text-base transition-all hover:scale-105">
            Оставить заявку
          </button>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 reveal">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Свяжитесь с нами</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Контакты</h2>
            <div className="section-line mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="reveal">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">Заказать баню</h3>
                {formSent ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle" size={32} className="text-accent" />
                    </div>
                    <p className="font-display text-2xl font-bold text-foreground mb-2">Заявка принята!</p>
                    <p className="text-muted-foreground text-sm">Наш специалист позвонит вам в течение 30 минут</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Ваше имя</label>
                      <input type="text" required placeholder="Александр" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Телефон</label>
                      <input type="tel" required placeholder="+7 (___) ___-__-__" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Комментарий</label>
                      <textarea rows={3} placeholder="Размер участка, пожелания..." value={formData.comment} onChange={(e) => setFormData((p) => ({ ...p, comment: e.target.value }))} className="w-full border border-border rounded px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:border-accent transition-colors resize-none" />
                    </div>
                    <button type="submit" className="bg-accent hover:bg-amber-600 text-white py-3.5 px-6 rounded font-semibold transition-all hover:scale-[1.02] mt-1">
                      Отправить заявку
                    </button>
                    <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                  </form>
                )}
              </div>
            </div>
            <div className="reveal flex flex-col justify-center gap-6">
              {[
                { icon: "Phone", title: "Телефон", value: "+7 (495) 123-45-67", sub: "Ежедневно с 8:00 до 20:00" },
                { icon: "Mail", title: "Email", value: "info@kvadrobanya.ru", sub: "Ответим в течение 2 часов" },
                { icon: "MapPin", title: "Офис и производство", value: "Московская область", sub: "Выезд на замер — бесплатно" },
                { icon: "Clock", title: "Режим работы", value: "Пн–Вс: 8:00–20:00", sub: "Без выходных и праздников" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={18} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{item.title}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                {[{ icon: "MessageCircle", label: "WhatsApp" }, { icon: "Send", label: "Telegram" }].map((s, i) => (
                  <button key={i} className="flex items-center gap-2 border border-border rounded px-4 py-2.5 text-sm hover:border-accent hover:text-accent transition-colors">
                    <Icon name={s.icon} size={16} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display text-xl font-bold mb-1">Квадро<span style={{ color: "#fcd34d" }}>Баня</span></p>
              <p className="text-primary-foreground/60 text-sm">Просторная баня за 1 день</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/60">
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-primary-foreground transition-colors">{l.label}</button>
              ))}
            </div>
            <div className="text-sm text-primary-foreground/60 text-center md:text-right">
              <p>+7 (495) 123-45-67</p>
              <p className="mt-1">© 2025 КвадроБаня</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA (mobile) */}
      <div className="fixed bottom-5 right-5 z-40 md:hidden">
        <button onClick={() => scrollTo("contacts")} className="bg-accent text-white px-5 py-3.5 rounded-full shadow-xl font-semibold text-sm flex items-center gap-2 hover:scale-105 transition-transform">
          <Icon name="Phone" size={16} />
          Заказать
        </button>
      </div>
    </div>
  );
}