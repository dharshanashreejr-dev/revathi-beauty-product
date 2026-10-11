import { useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingBag,
  X,
  Menu,
  Plus,
  Minus,
  Check,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { img, photos } from "./photos";
import { SITE } from "../site-links";
import { content } from "./content";
import { st } from "./i18n-sections";
import { heroSlides, heroTicker } from "./hero-slides";
import { addOrder } from "../site/account";
import { NAV_LABELS } from "../shared/i18n-nav";
import { applyHomeMeta } from "../shared/i18n-meta";
import { ProductPhoto, HerbalShowcase, VideoBand, NineDays, SpaOfferings, RecommendedPicks, NewArrivals } from "./sections";
import {
  BRAND,
  products,
  categories,
  rituals,
  serviceGroups,
  allServices,
  slots,
  rupees,
  SHADES,
  type Cat,
  LANG_LABELS,
  LANG_LOCALES,
  type Lang,
} from "./data";
type Panel =
  | "search"
  | "bag"
  | "product"
  | "menu"
  | "journal"
  | "care"
  | "booking"
  | "checkout"
  | "order"
  | null;
type Language = "en" | "ta" | "hi" | "ml" | "te";
const FREE_SHIP = 1999;
const SHIP_FEE = 99;
const byId = (id: string) => products.find((p) => p.id === id)!;
const noteImages = [photos.notePeach, photos.noteJasmine, photos.noteWood];
const moods = [
  { key: "dusk", bg: "linear-gradient(160deg,#f3c79e 0%,#d98a5a 55%,#7a3f22 100%)" },
  { key: "ivory", bg: "linear-gradient(160deg,#fbf4e6 0%,#efdcc3 60%,#d9b893 100%)" },
  { key: "bloom", bg: "linear-gradient(160deg,#f8d9cf 0%,#eab49f 55%,#b8705a 100%)" },
] as const;
const hotspots = [
  { x: 50, y: 12, note: 0 },
  { x: 30, y: 52, note: 1 },
  { x: 68, y: 78, note: 2 },
];
const finePointer = () =>
  matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;
/** Pointer-driven 3D tilt with a moving light sheen (desktop only). */
function tilt(e: React.PointerEvent<HTMLElement>, depth = 10) {
  if (e.pointerType !== "mouse" || !finePointer()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  el.style.setProperty("--gx", `${px * 100}%`);
  el.style.setProperty("--gy", `${py * 100}%`);
  gsap.to(el, {
    rotateY: (px - 0.5) * depth,
    rotateX: (0.5 - py) * depth,
    transformPerspective: 900,
    duration: 0.6,
    ease: "power3.out",
  });
}
function untilt(e: React.PointerEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "power3.out" });
}
/** Buttons drift gently towards the pointer. */
function magnet(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse" || !finePointer()) return;
  const r = e.currentTarget.getBoundingClientRect();
  gsap.to(e.currentTarget, {
    x: (e.clientX - r.left - r.width / 2) * 0.25,
    y: (e.clientY - r.top - r.height / 2) * 0.35,
    duration: 0.5,
    ease: "power3.out",
  });
}
function unmagnet(e: React.PointerEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
}
/** The lotus mark, redrawn as a vector so it stays sharp at any size. */
function Lotus() {
  return (
    <svg className="brand-lotus" viewBox="0 0 64 40" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round">
        <path d="M32 3.5C25.6 11.5 25.6 23.5 32 32.5C38.4 23.5 38.4 11.5 32 3.5Z" />
        <path d="M32 32.5C24.6 30.6 19.4 22.8 19.8 12.6C25.2 15.4 29.6 21.6 32 32.5Z" />
        <path d="M32 32.5C39.4 30.6 44.6 22.8 44.2 12.6C38.8 15.4 34.4 21.6 32 32.5Z" />
        <path d="M32 32.5C22.6 33.6 13.4 29 9 20.6C17.6 19.8 26.6 24.4 32 32.5Z" />
        <path d="M32 32.5C41.4 33.6 50.6 29 55 20.6C46.4 19.8 37.4 24.4 32 32.5Z" />
        <path d="M21.5 36.2Q32 39.4 42.5 36.2" />
      </g>
    </svg>
  );
}
function Brand({ rise = false, lang }: { rise?: boolean; lang: Language }) {
  const part = (cls: string, children: React.ReactNode, i: number) =>
    rise ? (
      <span className={`rise-mask ${cls}-mask`}>
        <span className={`rise ${cls}`} style={{ "--d": `${0.25 + i * 0.22}s` } as React.CSSProperties}>
          {children}
        </span>
      </span>
    ) : (
      <span className={cls}>{children}</span>
    );
  return (
    <span className="brand-mark" role="img" aria-label={BRAND}>
      {part("brand-icon", <Lotus />, 0)}
      {rise ? (
        <span className="rise-mask brand-word-mask">
          <span className="brand-word" aria-hidden="true">
            {BRAND.split("").map((ch, i) => (
              <span className="rise rise-letter" key={i} style={{ "--d": `${0.55 + i * 0.06}s` } as React.CSSProperties}>
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
          </span>
        </span>
      ) : (
        <span className="brand-word" aria-hidden="true">{BRAND}</span>
      )}
      {part("brand-sub", NAV_LABELS[lang].BrandSub, 5)}
    </span>
  );
}
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (!finePointer() || !dot.current) return;
    const el = dot.current;
    document.documentElement.classList.add("has-cursor");
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, select, input");
      el.classList.toggle("is-hover", !!target);
      setLabel(target?.dataset.cursor ?? "");
    };
    const leave = () => el.classList.add("is-hidden");
    const enter = () => el.classList.remove("is-hidden");
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, []);
  return (
    <div ref={dot} className={`cursor ${label ? "has-label" : ""}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span className="text-mask" key={i}>
          <span className="reveal-line">{line}</span>
        </span>
      ))}
    </>
  );
}
export default function Home() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const s = localStorage.getItem("velvet-lang") as Language | null;
      if (s && ["en","ta","hi","ml","te"].includes(s)) return s;
    } catch {}
    return "en";
  }),
    [panel, setPanel] = useState<Panel>(null),
    [query, setQuery] = useState(""),
    [cart, setCart] = useState<Record<string, number>>({}),
    [productId, setProductId] = useState("eclat"),
    [filter, setFilter] = useState<"all" | Cat>("all"),
    [group, setGroup] = useState(serviceGroups[0].key),
    [slide, setSlide] = useState(0),
    [slidePaused, setSlidePaused] = useState(false),
    [appointments, setAppointments] = useState<{ date: string; time: string }[]>([]),
    [booking, setBooking] = useState({ service: "", date: "", time: "", name: "", phone: "", notes: "" }),
    [bookError, setBookError] = useState(""),
    [booked, setBooked] = useState<{ service: string; date: string; time: string; mins: number } | null>(null),
    [ship, setShip] = useState({ name: "", phone: "", address: "", city: "", pin: "" }),
    [orderError, setOrderError] = useState(""),
    [order, setOrder] = useState<{ id: string; total: number; lines: string[] } | null>(null),
    [note, setNote] = useState(0),
    [article, setArticle] = useState(0),
    [toast, setToast] = useState(""),
    [ready, setReady] = useState(false),
    [sticky, setSticky] = useState(false),
    [shade, setShade] = useState(0),
    [notesPaused, setNotesPaused] = useState(false),
    [notesTouched, setNotesTouched] = useState(false);
  const root = useRef<HTMLDivElement>(null),
    dialog = useRef<HTMLDialogElement>(null),
    lenis = useRef<Lenis | null>(null);
  const t = content[lang];
  const NL = NAV_LABELS[lang];
  const product = byId(productId);
  const lines = products.filter((p) => cart[p.id] > 0).map((p) => ({ p, qty: cart[p.id] }));
  const bag = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIP ? 0 : SHIP_FEE;
  const total = subtotal + shipping;
  const activeGroup = serviceGroups.find((g) => g.key === group) ?? serviceGroups[0];
  const todayStr = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const catLabel = (c: Cat) => categories.find((x) => x.key === c)!.label[lang];
  const notes = [
    { name: t.peach, sub: t.peachSub, copy: t.peachCopy },
    { name: t.jasmine, sub: t.jasmineSub, copy: t.jasmineCopy },
    { name: t.wood, sub: t.woodSub, copy: t.woodCopy },
  ];
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("velvet-bag") || "{}") as Record<string, unknown>;
      const clean: Record<string, number> = {};
      for (const p of products) {
        const q = Number(saved[p.id]);
        if (Number.isInteger(q) && q > 0 && q <= 10) clean[p.id] = q;
      }
      setCart(clean);
      const appts = JSON.parse(localStorage.getItem("velvet-appointments") || "[]");
      if (Array.isArray(appts)) setAppointments(appts.filter((a) => a && typeof a.date === "string" && typeof a.time === "string"));
    } catch {}
    // Long enough for the intro lines to rise slowly before the curtain lifts.
    const timeout = setTimeout(() => setReady(true), 3300);
    const scroll = () => setSticky(window.scrollY > 60);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("velvet-lang", lang); } catch {}
    applyHomeMeta(lang);
  }, [lang]);
  useEffect(() => {
    // The hero glides through its images on its own until someone takes over.
    if (!ready || slidePaused) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setSlide((n) => (n + 1) % heroSlides.length), 5600);
    return () => clearTimeout(timer);
  }, [slide, slidePaused, ready]);
  useEffect(() => {
    // Sections change height when filtered, so scroll positions are re-measured.
    const timer = setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => clearTimeout(timer);
  }, [filter, group]);
  useEffect(() => {
    // The composition gently cycles through its notes until someone takes over.
    if (notesPaused || notesTouched) return;
    const timer = setTimeout(() => setNote((n) => (n + 1) % 3), 5200);
    return () => clearTimeout(timer);
  }, [note, notesPaused, notesTouched]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (panel && dialog.current && !dialog.current.open) {
      dialog.current.showModal();
      lenis.current?.stop();
    }
    if (!panel) {
      dialog.current?.close();
      lenis.current?.start();
    }
  }, [panel]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }
    const smooth = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1,
      anchors: true,
    });
    lenis.current = smooth;
    smooth.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".statement-word",
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".statement",
            start: "top 82%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>(".scent-card").forEach((card, i) =>
        gsap.fromTo(
          card,
          { y: [150, 260, 170, 240][i] },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".scent-grid",
              start: "top 95%",
              end: "center 48%",
              scrub: 0.8,
            },
          },
        ),
      );
      gsap.utils.toArray<HTMLElement>(".reveal-line").forEach((el) =>
        gsap.from(el, {
          yPercent: 110,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        }),
      );
      gsap.set(".product-card, .ritual-card", { opacity: 0, y: 60 });
      ScrollTrigger.batch(".product-card, .ritual-card", {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power3.out" }),
        onLeave: (els) => gsap.set(els, { opacity: 1, y: 0 }),
      });
      const skew = gsap.quickTo(".marquee-row", "skewX", { duration: 0.6, ease: "power3" });
      ScrollTrigger.create({
        trigger: ".marquee",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) =>
          skew(gsap.utils.clamp(-8, 8, self.getVelocity() / -260)),
        onLeave: () => skew(0),
      });
      gsap.utils.toArray<HTMLElement>(".journal-picture").forEach((pic) =>
        gsap.fromTo(
          pic,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.6,
            ease: "power4.out",
            scrollTrigger: { trigger: pic, start: "top 88%", once: true },
          },
        ),
      );
      gsap.fromTo(
        ".closing-image",
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".closing",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const timer = setTimeout(refresh, 2500);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refresh);
      ctx.revert();
      smooth.destroy();
      gsap.ticker.remove(tick);
      lenis.current = null;
    };
  }, [lang]);
  useEffect(() => {
    type Tool = {
      name: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean };
      execute: (input: unknown) => unknown;
    };
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: Tool,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tools: Tool[] = [
      {
        name: "get_catalogue",
        description:
          "Read REVATHI HERBAL BEAUTY CARE product list and salon treatments. Does not place an order or book anything.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true },
        execute: () => ({
          brand: BRAND,
          products: products.map((p) => ({
            id: p.id,
            name: p.name.en,
            category: p.cat,
            size: p.size,
            priceInr: p.price,
          })),
          treatments: allServices.map((s) => ({
            id: s.id,
            name: s.name.en,
            minutes: s.mins,
            priceInr: s.price,
          })),
          orderingAvailable: true,
        }),
      },
      {
        name: "set_bag_quantity",
        description:
          "Set the device-local bag quantity of one product and open the bag. Does not place an order.",
        inputSchema: {
          type: "object",
          properties: {
            productId: { type: "string", enum: products.map((p) => p.id) },
            quantity: { type: "integer", minimum: 0, maximum: 10 },
          },
          required: ["productId", "quantity"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false },
        execute: async (input: unknown) => {
          const { productId: id, quantity: q } = (input ?? {}) as { productId?: unknown; quantity?: unknown };
          if (typeof id !== "string" || !products.some((p) => p.id === id))
            throw new Error("Unknown product id.");
          if (typeof q !== "number" || !Number.isInteger(q) || q < 0 || q > 10)
            throw new Error("Quantity must be an integer from 0 to 10.");
          update((c) => {
            const next = { ...c };
            if (q) next[id] = q;
            else delete next[id];
            return next;
          });
          setPanel("bag");
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
          return { productId: id, quantity: q, scope: "this browser", orderPlaced: false };
        },
      },
    ];
    for (const tool of tools) {
      try {
        Promise.resolve(
          context.registerTool(tool, { signal: lifecycle.signal }),
        ).catch(() => {});
      } catch {}
    }
    return () => lifecycle.abort();
  }, []);
  function update(fn: (c: Record<string, number>) => Record<string, number>) {
    setCart((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem("velvet-bag", JSON.stringify(next));
      } catch {}
      return next;
    });
  }
  function setQty(id: string, value: number) {
    const q = Math.max(0, Math.min(10, value));
    update((c) => {
      const next = { ...c };
      if (q) next[id] = q;
      else delete next[id];
      return next;
    });
  }
  function addMany(ids: string[], message: string = t.added) {
    update((c) => {
      const next = { ...c };
      for (const id of ids) next[id] = Math.min(10, (next[id] || 0) + 1);
      return next;
    });
        setToast(message);
    setPanel("bag");
  }
    function goCheckout() {
    if (!lines.length) {
      window.location.href = "/products/";
      return;
    }
    try {
      const items = lines.map((l) => ({
        id: l.p.id,
        name: l.p.name.en,
        price: l.p.price,
        size: l.p.size,
        qty: l.qty,
      }));
      localStorage.setItem("velvet-handoff", JSON.stringify(items));
    } catch {}
    window.location.href = "/products/#/checkout";
  }
  function openProduct(id: string) {
    setProductId(id);
    setShade(0);
    setPanel("product");
  }
  // Every "Book" button opens the appointment booking page of the site (it feeds the Tracking page).
  function openBooking(_serviceId = "") {
    window.location.href = SITE.booking;
  }
  function bookBundle(serviceId: string, productId: string) {
    update((c) => ({ ...c, [productId]: Math.min(10, (c[productId] || 0) + 1) }));
    setToast(t.added);
    openBooking(serviceId);
  }
  function go(id: string) {
    setPanel(null);
    setTimeout(() => {
      if (lenis.current) lenis.current.scrollTo(id, { offset: -90 });
      else
        document.querySelector(id)?.scrollIntoView({
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
    }, 30);
  }
  function download(name: string, text: string, type = "text/plain;charset=utf-8") {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }
  function saveBag() {
    const rows = lines
      .map((l) => `${l.p.name.en} (${l.p.size}) x ${l.qty} — ${rupees(l.p.price * l.qty)}`)
      .join("\n");
    download(
      "THE-VELVET-TOUCH-my-bag.txt",
      `${BRAND}\n\n${rows}\n\n${content.en.subtotal}: ${rupees(subtotal)}\n`,
    );
    setToast(t.saved);
  }
  const isTaken = (time: string) =>
    appointments.some((a) => a.date === booking.date && a.time === time) ||
    (booking.date === todayStr &&
      Number(time.slice(0, 2)) <= new Date().getHours());
  function submitBooking() {
    const svc = allServices.find((x) => x.id === booking.service);
    if (!svc || !booking.date || !booking.time || booking.name.trim().length < 2)
      return setBookError(t.errFill);
    if (!/^\d{10}$/.test(booking.phone.replace(/[\s-]/g, "")))
      return setBookError(t.errPhone);
    if (isTaken(booking.time)) return setBookError(t.errSlot);
    const next = [...appointments, { date: booking.date, time: booking.time }];
    setAppointments(next);
    try {
      localStorage.setItem("velvet-appointments", JSON.stringify(next));
    } catch {}
    setBookError("");
    setBooked({ service: svc.name[lang], date: booking.date, time: booking.time, mins: svc.mins });
    setBooking((b) => ({ ...b, time: "", notes: "" }));
  }
  function downloadIcs() {
    if (!booked) return;
    const [y, m, d] = booked.date.split("-").map(Number);
    const [hh, mm] = booked.time.split(":").map(Number);
    const pad = (n: number) => String(n).padStart(2, "0");
    const fmt = (dt: Date) =>
      `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
    const start = new Date(y, m - 1, d, hh, mm);
    const end = new Date(y, m - 1, d, hh, mm + booked.mins);
    download(
      "THE-VELVET-TOUCH-appointment.ics",
      [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//REVATHI HERBAL BEAUTY CARE//Booking//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@thevelvettouch`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:${booked.service} — ${BRAND}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n"),
      "text/calendar;charset=utf-8",
    );
  }
  function placeOrder() {
    const ok =
      ship.name.trim().length > 1 &&
      /^\d{10}$/.test(ship.phone.replace(/[\s-]/g, "")) &&
      ship.address.trim().length > 4 &&
      ship.city.trim().length > 1 &&
      /^\d{6}$/.test(ship.pin.trim());
    if (!ok || !lines.length) return setOrderError(t.errOrder);
    const id = "VT-" + Math.floor(100000 + Math.random() * 900000);
    const summary = lines.map((l) => `${l.p.name[lang]} × ${l.qty}`);
    try {
      const prev = JSON.parse(localStorage.getItem("velvet-orders") || "[]");
      localStorage.setItem(
        "velvet-orders",
        JSON.stringify([...(Array.isArray(prev) ? prev : []), { id, total, lines: summary, at: Date.now() }]),
      );
    } catch {}
    try {
      addOrder(
        lines.map((l) => ({
          pid: l.p.id,
          name: l.p.name.en,
          img: "facial",
          qty: l.qty,
          price: l.p.price,
          size: l.p.size,
        })),
      );
    } catch {}
    setOrder({ id, total, lines: summary });
    update(() => ({}));
    setOrderError("");
    setPanel("order");
  }
  function downloadReceipt() {
    if (!order) return;
    download(
      `${order.id}-receipt.txt`,
      `${BRAND}\n${t.orderNo}: ${order.id}\n\n${order.lines.join("\n")}\n\n${t.total}: ${rupees(order.total)}\n${t.purchaseInfo}\n`,
    );
  }
  const searchItems = [
    ...products.map((p) => ({
      title: p.name[lang],
      sub: `${p.sub[lang]} · ${rupees(p.price)}`,
      keywords: `${p.name.en} ${p.name.ta} ${p.name.hi} ${p.cat} ${p.kind} ${p.copy.en}`,
      action: () => openProduct(p.id),
      art: p,
      image: "",
    })),
    ...allServices.map((sv) => ({
      title: sv.name[lang],
      sub: `${sv.mins} ${t.mins} · ${rupees(sv.price)}`,
      keywords: `${sv.name.en} ${sv.name.ta} ${sv.name.hi} ${sv.group} salon appointment treatment ${sv.desc.en}`,
      action: () => openBooking(sv.id),
      art: null,
      image: img(photos.journalTwo, "75px").src,
    })),
    {
      title: t.notesTitle,
      sub: t.notesLabel,
      keywords: "ingredients peach pêche jasmine jasmin sandalwood santal composition",
      action: () => go("#notes"),
      art: null,
      image: img(photos.notePeach, "75px").src,
    },
    {
      title: t.worldTitle.replace("\n", " "),
      sub: t.story,
      keywords: "story histoire velvet touch boutique salon",
      action: () => go("#story"),
      art: null,
      image: img(photos.world, "75px").src,
    },
  ]
    .filter(
      (item) =>
        !query ||
        (item.title + item.keywords).toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, query ? 12 : 7);
  return (
    <div ref={root} className={`site ${ready ? "is-ready" : "is-loading"}`}>
      <svg
        width="0"
        height="0"
        aria-hidden="true"
        style={{ position: "absolute", pointerEvents: "none" }}
      >
        <defs>
          <filter id="velvet-mark-light" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.98  0 0 0 0 0.945  0 0 0 0 0.875  -1.8 -1.8 -1.8 0 3.6"
            />
          </filter>
          <filter id="velvet-mark-dark" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.259  0 0 0 0 0.173  0 0 0 0 0.125  -1.8 -1.8 -1.8 0 3.6"
            />
          </filter>
        </defs>
      </svg>
      <a className="skip-link" href="#main">
        {({ en: "Skip to content", ta: "உள்ளடக்கத்திற்குச் செல்", hi: "सामग्री पर जाएँ", ml: "ഉള്ളടക്കത്തിലേക്ക് പോകുക", te: "కంటెంట్‌కు వెళ్ళండి" } as const)[lang]}
      </a>
      <Cursor />
      <div className="intro-curtain" aria-hidden="true">
        <div className="intro-inner">
          <Brand rise lang={lang} />
          <span className="intro-line" />
          <span className="rise-mask">
            <span className="rise intro-tag" style={{ "--d": "1.7s" } as React.CSSProperties}>
              {t.introTag}
            </span>
          </span>
          <span className="rise-mask">
            <span className="rise eyebrow" style={{ "--d": "2s" } as React.CSSProperties}>
              {st("introEyebrow", lang)}
            </span>
          </span>
        </div>
      </div>
      <header className={`header ${sticky ? "is-scrolled" : ""}`}>
        <nav className="nav-left" aria-label={NL.SitePages}>
          <a href={SITE.products}>{NL.Products}</a>
          <a href={SITE.services}>{NL.Services}</a>
        </nav>
        <button
          className="mobile-menu icon-button"
          aria-label={({ en: "Open menu", ta: "மெனுவைத் திற", hi: "मेनू खोलें", ml: "മെനു തുറക്കുക", te: "మెనూ తెరవండి" } as const)[lang]}
          onClick={() => setPanel("menu")}
        >
          <Menu size={22} />
        </button>
        <a
          className="header-brand"
          href="#top"
          aria-label={`${BRAND} — ${st("homeAria", lang)}`}
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
        >
          <Brand lang={lang} />
        </a>
        <nav className="nav-right" aria-label={NL.SitePages}>
          <a href={SITE.about}>{NL.About}</a>
          <a href={SITE.tracking}>{NL.Tracking}</a>
        </nav>
        <div className="nav-tools">
          <label className="lang-select" style={{ display: "inline-flex", alignItems: "center" }}>
            <span className="sr-only">{t.language}</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              aria-label={t.language}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.45)",
                borderRadius: "999px",
                color: "inherit",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.4rem 0.65rem",
                cursor: "pointer",
              }}
            >
              <option value="en">EN</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिन्दी</option>
              <option value="ml">മലയാളം</option>
              <option value="te">తెలుగు</option>
            </select>
          </label>
          <button
            className="icon-button"
            onClick={() => setPanel("search")}
            aria-label={({ en: "Search", ta: "தேடு", hi: "खोजें", ml: "തിരയുക", te: "వెతకండి" } as const)[lang]}
          >
            <Search size={21} />
          </button>
          <button
            className="bag-button"
                                    onClick={() => setPanel("bag")}
            aria-label={`${t.bagTitle} (${bag})`}
          >
            <ShoppingBag size={21} />
            <span>({bag})</span>
          </button>
          <a className="nav-admin" href={SITE.admin}>
            {NL.Admin}
          </a>
        </div>
      </header>
      <main id="main">
        <section id="top" className="hb" aria-roledescription="carousel" aria-label="REVATHI HERBAL BEAUTY CARE">
          <div
            className="hb-stage"
            onPointerEnter={() => setSlidePaused(true)}
            onPointerLeave={() => setSlidePaused(false)}
          >
            {heroSlides.map((sl, i) => {
              const active = slide === i;
              const runAction = () => {
                if (sl.action === "book") return openBooking();
                setFilter(sl.action === "shop-makeup" ? "makeup" : "all");
                go("#shop");
              };
              return (
                <div
                  key={sl.id}
                  data-id={sl.id}
                  className={`hb-slide ${active ? "is-active" : ""}`}
                  style={{ "--hb-tone": sl.tone } as React.CSSProperties}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${heroSlides.length}`}
                  aria-hidden={!active}
                >
                  <div className="hb-copy">
                    <span className="hb-eyebrow">{sl.eyebrow[lang]}</span>
                    {i === 0 ? <h1 id="hero-title">{sl.title[lang]}</h1> : <h2>{sl.title[lang]}</h2>}
                    <p>{sl.copy[lang]}</p>
                    <div className="hb-actions">
                      <button className="hb-btn" tabIndex={active ? 0 : -1} onClick={runAction}>
                        {sl.cta[lang]}
                      </button>
                      {sl.action !== "book" && (
                        <button className="hb-btn ghost" tabIndex={active ? 0 : -1} onClick={() => openBooking()}>
                          {t.heroBook}
                        </button>
                      )}
                    </div>
                  </div>
                  <figure className="hb-media" style={{ "--hb-img": `url(${sl.image})` } as React.CSSProperties}>
                    <img
                      src={sl.image}
                      alt={sl.alt[lang]}
                      width={sl.width}
                      height={sl.height}
                      {...(i === 0 ? { fetchpriority: "high" } : { loading: "lazy" as const })}
                    />
                  </figure>
                </div>
              );
            })}
          </div>
          <div className="hb-ticker" aria-hidden="true">
            <div className="hb-ticker-track">
              {[0, 1].map((k) => (
                <div className="hb-ticker-row" key={k}>
                  {[...heroTicker.map((x) => x[lang]), BRAND].map((x) => (
                    <span key={x + k}>{x}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="hb-controls">
            <button
              className="hb-arrow"
              aria-label={t.slidePrev}
              onClick={() => setSlide((n) => (n + heroSlides.length - 1) % heroSlides.length)}
            >
              <ArrowLeft size={16} />
            </button>
            <div className="hb-dots">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`${t.slideGo} ${i + 1}`}
                  aria-current={slide === i}
                  className={slide === i ? "is-active" : ""}
                  onClick={() => setSlide(i)}
                >
                  <span className={slidePaused ? "is-paused" : ""} />
                </button>
              ))}
            </div>
            <button
              className="hb-arrow"
              aria-label={t.slideNext}
              onClick={() => setSlide((n) => (n + 1) % heroSlides.length)}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
        <section id="notes" className="notes-section collection-band">
          <div className="collection-hero">
            <video
              className="collection-video"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              poster="/assets/video/herbal-film.jpg"
            >
              <source src="/assets/video/herbal-film.mp4" type="video/mp4" />
            </video>
            <div className="collection-hero-shade" />
            <div className="collection-hero-copy">
              <span className="eyebrow">{t.label}</span>
              <h2 className="statement">
                {t.statement.split(" ").map((word, i) => (
                  <span className="statement-word" key={i}>
                    {word}{" "}
                  </span>
                ))}
              </h2>
              <p>{t.storySmall}</p>
            </div>
          </div>
          <div className="collection-products">
            {[
              { id: "eclat", name: "Éclat Glow Serum", sub: "Signature serum" },
              { id: "lipstick", name: "Velvet Matte Lipstick", sub: "Shade · Plum Rose" },
              { id: "highlighter", name: "Golden Hour Highlighter", sub: "Champagne gold" },
              { id: "rose-mist", name: "Rose Petal Face Mist", sub: "Fresh, anytime" },
            ].map((item) => (
              <button
                key={item.id}
                className="collection-card"
                data-cursor={t.open}
                onClick={() => openProduct(item.id)}
              >
                <div className="collection-card-media">
                  <ProductPhoto id={item.id} alt={item.name} />
                </div>
                <div className="collection-card-copy">
                  <h3>{item.name}</h3>
                  <span>{item.sub}</span>
                </div>
              </button>
            ))}
          </div>
        </section>
        <HerbalShowcase onOpen={openProduct} onAdd={(id) => addMany([id])} lang={lang} />
        <VideoBand onBook={() => openBooking()} lang={lang} />
        <div className="marquee" aria-hidden="true">
          <div className="marquee-row">
            {[0, 1].map((k) => (
              <span className="marquee-set" key={k}>
                {t.marquee.map((word) => (
                  <span key={word}>
                    {word}
                    <Lotus />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <section className="shop" id="shop">
          <div className="shop-heading">
            <div>
              <span className="eyebrow">{t.shopLabel}</span>
              <h2>
                <Lines text={t.shopTitle} />
              </h2>
            </div>
            <div className="shop-side">
              <p>{t.shopCopy}</p>
              <span className="shop-ship">{t.shipping}</span>
            </div>
          </div>
          <div className="shop-filters" role="tablist" aria-label={t.shopLabel}>
            {categories.map((c) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={filter === c.key}
                className={filter === c.key ? "is-active" : ""}
                onClick={() => setFilter(c.key)}
              >
                {c.label[lang]}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {products
              .filter((p) => filter === "all" || p.cat === filter)
              .map((p) => (
                <article className="product-card" key={p.id}>
                  <button
                    className="product-picture"
                    data-cursor={t.view}
                    aria-label={`${t.viewDetails}: ${p.name[lang]}`}
                    onClick={() => openProduct(p.id)}
                  >
                    <span className="product-badge">{catLabel(p.cat)}</span>
                    <ProductPhoto id={p.id} className="product-art" />
                  </button>
                  <div className="product-card-info">
                    <div>
                      <h3>{p.name[lang]}</h3>
                      <span>
                        {p.sub[lang]} · {p.size}
                      </span>
                    </div>
                    <strong>{rupees(p.price)}</strong>
                  </div>
                  <button className="product-add" onClick={() => addMany([p.id])}>
                    {t.addShort}
                    <Plus size={16} />
                  </button>
                </article>
              ))}
          </div>
        </section>
        <section
          className="composition"
          id="composition"
          onPointerEnter={() => setNotesPaused(true)}
          onPointerLeave={() => setNotesPaused(false)}
        >
          <div className="composition-image" data-cursor={t.noteTabs[note]}>
            {noteImages.map((photo, i) => (
              <img
                key={photo.src}
                {...img(photo, "(max-width: 799px) 100vw, 45vw")}
                className={note === i ? "is-active" : ""}
                width="1600"
                height="2000"
                loading="lazy"
              />
            ))}
            <span className="image-caption">
              {String(note + 1).padStart(2, "0")} / 03 — {notes[note].name}
            </span>
            <span className="note-progress" aria-hidden="true">
              <span
                key={`${note}-${notesPaused || notesTouched}`}
                className={notesPaused || notesTouched ? "is-paused" : ""}
              />
            </span>
          </div>
          <div className="composition-content">
            <span className="eyebrow">{t.notesLabel}</span>
            <h2>{t.notesTitle}</h2>
            <div className="note-tabs" role="tablist" aria-label={t.notesLabel}>
              {t.noteTabs.map((tab, i) => (
                <button
                  role="tab"
                  aria-selected={note === i}
                  aria-controls={`note-panel-${i}`}
                  id={`note-tab-${i}`}
                  tabIndex={note === i ? 0 : -1}
                  key={tab}
                  onClick={() => {
                    setNote(i);
                    setNotesTouched(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      setNotesTouched(true);
                      const next =
                        (note + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                      setNote(next);
                      document.getElementById(`note-tab-${next}`)?.focus();
                    }
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                  <span>{tab}</span>
                </button>
              ))}
            </div>
            <div
              className="note-description"
              role="tabpanel"
              id={`note-panel-${note}`}
              aria-labelledby={`note-tab-${note}`}
              key={note}
            >
              <span className="eyebrow">{notes[note].sub}</span>
              <h3>{notes[note].name}</h3>
              <p>{notes[note].copy}</p>
            </div>
          </div>
        </section>
        <section className="rituals" id="rituals">
          <div className="rituals-heading">
            <div>
              <span className="eyebrow">{t.ritualsLabel}</span>
              <h2>
                <Lines text={t.ritualsTitle} />
              </h2>
            </div>
            <p>{t.ritualsCopy}</p>
          </div>
          <div className="ritual-grid">
            {rituals.map((r, i) => (
              <article className={`ritual-card ritual-${i}`} key={r.id}>
                <span className="ritual-when">
                  {String(i + 1).padStart(2, "0")} / {r.when[lang]}
                </span>
                <h3>{r.title[lang]}</h3>
                <p>{r.copy[lang]}</p>
                <div className="ritual-items">
                  {r.items.map((id) => (
                    <button key={id} aria-label={byId(id).name[lang]} onClick={() => openProduct(id)}>
                      <ProductPhoto id={id} />
                    </button>
                  ))}
                </div>
                <small>
                  {t.includes}: {r.items.map((id) => byId(id).name[lang]).join(" · ")}
                </small>
                <button
                  className="pill dark"
                  onPointerMove={magnet}
                  onPointerLeave={unmagnet}
                  onClick={() => addMany(r.items, t.ritualAdded)}
                >
                  {t.addRitual}
                  <span className="pill-dot">
                    <Plus size={20} />
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>
        <NineDays onBook={() => openBooking("m1")} lang={lang} />
        <section className="salon salon-stack" id="salon">
          <div className="salon-banner">
            <video
              className="salon-banner-video"
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              poster="/assets/hero-2.webp"
            >
              <source src="/assets/video/salon.mp4" type="video/mp4" />
            </video>
            <div className="salon-banner-shade" />
            <div className="salon-banner-copy">
              <span className="eyebrow">{t.salonLabel}</span>
              <strong>{st("salonBanner", lang)}</strong>
            </div>
          </div>
          <div className="salon-body">
            <div className="salon-copy">
              <h2>
                <Lines text={t.salonTitle} />
              </h2>
              <p>{t.salonCopy}</p>
              <ul className="salon-perks">
                {t.perks.map((perk) => (
                  <li key={perk}>
                    <Check size={15} />
                    {perk}
                  </li>
                ))}
              </ul>
              <span className="salon-hours">{t.salonHours}</span>
              <button
                className="pill dark"
                onPointerMove={magnet}
                onPointerLeave={unmagnet}
                onClick={() => openBooking()}
              >
                {t.heroBook}
                <span className="pill-dot">
                  <Plus size={20} />
                </span>
              </button>
            </div>
            <div className="salon-menu">
              <div className="salon-tabs" role="tablist" aria-label={t.salonLabel}>
                {serviceGroups.map((g) => (
                  <button
                    key={g.key}
                    role="tab"
                    aria-selected={group === g.key}
                    className={group === g.key ? "is-active" : ""}
                    onClick={() => setGroup(g.key)}
                  >
                    {g.label[lang]}
                  </button>
                ))}
              </div>
              <p className="salon-intro" key={group}>
                {activeGroup.intro[lang]}
              </p>
              <ul className="service-list" key={`${group}-list`}>
                {activeGroup.items.map((sv, si) => (
                  <li className="service-row" key={sv.id} style={{ "--i": si } as React.CSSProperties}>
                    <div>
                      <h3>{sv.name[lang]}</h3>
                      <p>{sv.desc[lang]}</p>
                      <small>
                        {sv.mins} {t.mins}
                      </small>
                    </div>
                    <div className="service-end">
                      <strong>{rupees(sv.price)}</strong>
                      <button className="service-book" onClick={() => openBooking(sv.id)}>
                        {t.bookService}
                        <Plus size={14} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <SpaOfferings onBook={(id) => openBooking(id)} lang={lang} />
        <RecommendedPicks onBundle={bookBundle} lang={lang} />
        <NewArrivals onOpen={openProduct} onAdd={(id) => addMany([id])} onJournal={() => go("#shop")} lang={lang} />
        <section className="closing">
          <div className="closing-banner">
            <img
              className="closing-image"
              src="/assets/hero/spa.webp"
              alt=""
              width="1024"
              height="559"
              loading="lazy"
            />
            <div className="closing-shade" />
            <div className="closing-content">
              <span className="eyebrow">{BRAND}</span>
              <h2>
                {t.closing.split("\n").map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </h2>
            </div>
            <button className="closing-cta" onClick={() => openBooking()}>
              {t.closingCta}
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <div>
            <Brand lang={lang} />
            <p>{t.footerLine}</p>
          </div>
          <nav aria-label={NL.Footer}>
            <a href={SITE.products}>{NL.Products}</a>
            <a href={SITE.services}>{NL.Services}</a>
            <a href={SITE.about}>{NL.About}</a>
            <a href={SITE.tracking}>{NL.Tracking}</a>
            <a href={SITE.admin}>{NL.Admin}</a>
          </nav>
          <div className="footer-service">
            <button
              onClick={() => {
                setArticle(0);
                setPanel("care");
              }}
            >
              {t.care}
            </button>
            <button
              onClick={() => {
                setArticle(1);
                setPanel("care");
              }}
            >
              {t.privacy}
            </button>
            <button onClick={() => go("#top")}>{t.back}</button>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
  <span>revathi</span>
  <span>herbal beauty products</span>
</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {BRAND}</span>
          <span>{({ en: "THE ESSENCE OF BEAUTIFUL MOMENTS", ta: "அழகான தருணங்களின் சாரம்", hi: "सुंदर पलों का सार", ml: "സുന്ദര നിമിഷങ്ങളുടെ സാരം", te: "అందమైన క్షణాల సారం" } as const)[lang]}</span>
          <span>{({ en: "SHOP · SALON · SPA", ta: "ஷாப் · சலூன் · ஸ்பா", hi: "शॉप · सैलून · स्पा", ml: "ഷോപ്പ് · സലൂൺ · സ്പാ", te: "షాప్ · సెలూన్ · స్పా" } as const)[lang]}</span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className={`modal ${
          panel === "bag" || panel === "menu" || panel === "checkout" || panel === "order"
            ? "side-modal"
            : panel === "booking"
              ? "modal-wide"
              : ""
        }`}
        onClose={() => setPanel(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPanel(null);
        }}
        aria-label={
          panel === "bag"
            ? t.bagTitle
            : panel === "search"
              ? t.searchTitle
              : panel === "product"
                ? product.name[lang]
                : panel === "booking"
                  ? t.bookingTitle
                  : BRAND
        }
      >
        <div className="modal-inner" data-lenis-prevent>
          <button
            className="modal-close icon-button"
            onClick={() => setPanel(null)}
            aria-label={({ en: "Close", ta: "மூடு", hi: "बंद करें", ml: "അടയ്ക്കുക", te: "మూసివేయండి" } as const)[lang]}
          >
            <X size={24} />
          </button>
          {panel === "search" && (
            <div className="search-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>{t.searchTitle}</h2>
              <div className="search-input">
                <Search size={24} />
                <input
                  autoFocus
                  aria-label={t.searchPlaceholder}
                  placeholder={t.searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="search-results">
                {searchItems.length ? (
                  searchItems.map((item) => (
                    <button key={item.title} onClick={item.action}>
                      {item.art ? (
                        <span className="search-art">
                          <ProductPhoto id={item.art.id} />
                        </span>
                      ) : (
                        <img src={item.image} alt="" width="75" height="90" />
                      )}
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.sub}</small>
                      </span>
                      <Plus size={20} />
                    </button>
                  ))
                ) : (
                  <p>{t.searchEmpty}</p>
                )}
              </div>
            </div>
          )}
          {panel === "product" && (
            <div className="product-modal">
              <div
                className="product-modal-picture"
                style={{ background: moods[1].bg }}
                data-cursor="Zoom"
                onPointerMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--zx", `${((e.clientX - r.left) / r.width) * 100}%`);
                  e.currentTarget.style.setProperty("--zy", `${((e.clientY - r.top) / r.height) * 100}%`);
                }}
                onClick={(e) => e.currentTarget.classList.toggle("is-zoomed")}
                onPointerLeave={(e) => e.currentTarget.classList.remove("is-zoomed")}
              >
                <span className="product-modal-word">{product.name[lang].split(" ")[0]}</span>
                <ProductPhoto id={product.id} shade={shade} className="product-modal-art" alt={product.name[lang]} />
                {(SHADES[product.id]?.length ?? 0) > 1 && (
                  <div className="modal-moods" role="radiogroup" aria-label="Colour" onClick={(e) => e.stopPropagation()}>
                    {SHADES[product.id].map((sh, i) => (
                      <button
                        key={sh.key}
                        role="radio"
                        aria-checked={shade === i}
                        aria-label={sh.name}
                        title={sh.name}
                        className={shade === i ? "is-active" : ""}
                        style={{ background: sh.hex }}
                        onClick={() => setShade(i)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="product-modal-copy">
                <span className="eyebrow">{catLabel(product.cat)}</span>
                <h2>{product.name[lang]}</h2>
                <p className="product-scent">{SHADES[product.id]?.[shade]?.sub?.[lang] ?? product.sub[lang]}</p>
                <p>{product.copy[lang]}</p>
                <p className="product-price">{rupees(product.price)}</p>
                <div className="size-option">
                  <Check size={16} />
                  <span>{product.size}</span>
                </div>
                <button className="pill solid" onClick={() => addMany([product.id])}>
                  {t.add}
                  <ShoppingBag size={18} />
                </button>
                <p className="ordering-note">{t.shipping}. {t.purchaseInfo}</p>
                <div className="product-notes">
                  {(product.id === "eclat"
                    ? [t.peach, t.jasmine, t.wood]
                    : [product.size, catLabel(product.cat), BRAND]
                  ).map((n, i) => (
                    <span key={n}>
                      0{i + 1} — {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          {panel === "bag" && (
            <div className="bag-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>
                {t.bagTitle} <sup>({bag})</sup>
              </h2>
              {bag ? (
                <>
                  {lines.map(({ p, qty }) => (
                    <div className="bag-item" key={p.id}>
                      <div className="bag-image">
                        <ProductPhoto id={p.id} className="bag-art" />
                      </div>
                      <div>
                        <h3>{p.name[lang]}</h3>
                        <p>
                          {p.size} · {rupees(p.price)}
                        </p>
                        <div className="quantity">
                          <button
                            aria-label={({ en: "Decrease quantity", ta: "அளவைக் குறை", hi: "मात्रा घटाएँ", ml: "അളവ് കുറയ്ക്കുക", te: "పరిమాణం తగ్గించు" } as const)[lang]}
                            onClick={() => setQty(p.id, qty - 1)}
                          >
                            <Minus size={16} />
                          </button>
                          <output>{qty}</output>
                          <button
                            disabled={qty >= 10}
                            aria-label={({ en: "Increase quantity", ta: "அளவை அதிகரி", hi: "मात्रा बढ़ाएँ", ml: "അളവ് കൂട്ടുക", te: "పరిమాణం పెంచు" } as const)[lang]}
                            onClick={() => setQty(p.id, qty + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button className="remove" onClick={() => setQty(p.id, 0)}>
                          {t.remove}
                        </button>
                      </div>
                    </div>
                  ))}
                  <dl className="bag-totals">
                    <div>
                      <dt>{t.subtotal}</dt>
                      <dd>{rupees(subtotal)}</dd>
                    </div>
                    <div>
                      <dt>{t.delivery}</dt>
                      <dd>{shipping ? rupees(shipping) : t.free}</dd>
                    </div>
                    <div className="bag-total">
                      <dt>{t.total}</dt>
                      <dd>{rupees(total)}</dd>
                    </div>
                  </dl>
                  <p className="bag-information">{t.purchaseInfo}</p>
                  <button
                    className="pill solid"
                                       onClick={goCheckout}
                  >
                    {t.checkout}
                    <ShoppingBag size={18} />
                  </button>
                  <button className="text-link bag-save" onClick={saveBag}>
                    {t.save}
                    <Check size={16} />
                  </button>
                </>
              ) : (
                <div className="empty-bag">
                  <ShoppingBag size={32} />
                  <h3>{t.bagEmpty}</h3>
                  <p>{t.bagEmptyCopy}</p>
                  <button className="pill dark" onClick={() => go("#shop")}>
                    {t.explore}
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>
          )}
          {panel === "checkout" && (
            <div className="bag-panel checkout-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>{t.checkoutTitle}</h2>
              <div className="form-stack">
                <label className="field">
                  <span>{t.fullName}</span>
                  <input autoComplete="name" value={ship.name} onChange={(e) => setShip({ ...ship, name: e.target.value })} />
                </label>
                <label className="field">
                  <span>{t.phone}</span>
                  <input autoComplete="tel" inputMode="tel" value={ship.phone} onChange={(e) => setShip({ ...ship, phone: e.target.value })} />
                </label>
                <label className="field">
                  <span>{t.address}</span>
                  <input autoComplete="street-address" value={ship.address} onChange={(e) => setShip({ ...ship, address: e.target.value })} />
                </label>
                <div className="field-row">
                  <label className="field">
                    <span>{t.city}</span>
                    <input autoComplete="address-level2" value={ship.city} onChange={(e) => setShip({ ...ship, city: e.target.value })} />
                  </label>
                  <label className="field">
                    <span>{t.pincode}</span>
                    <input autoComplete="postal-code" inputMode="numeric" maxLength={6} value={ship.pin} onChange={(e) => setShip({ ...ship, pin: e.target.value })} />
                  </label>
                </div>
              </div>
              <dl className="bag-totals">
                <div>
                  <dt>{t.subtotal}</dt>
                  <dd>{rupees(subtotal)}</dd>
                </div>
                <div>
                  <dt>{t.delivery}</dt>
                  <dd>{shipping ? rupees(shipping) : t.free}</dd>
                </div>
                <div className="bag-total">
                  <dt>{t.total}</dt>
                  <dd>{rupees(total)}</dd>
                </div>
              </dl>
              <p className="bag-information">{t.purchaseInfo}</p>
              {orderError && (
                <p className="form-error" role="alert">
                  {orderError}
                </p>
              )}
              <button className="pill solid" onClick={placeOrder}>
                {t.placeOrder}
                <Check size={18} />
              </button>
              <button className="text-link bag-save" onClick={() => setPanel("bag")}>
                <ArrowLeft size={16} />
                {t.backToBag}
              </button>
            </div>
          )}
          {panel === "order" && order && (
            <div className="bag-panel order-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>{t.orderTitle}</h2>
              <p className="order-copy">{t.orderCopy}</p>
              <dl className="booking-summary">
                <div>
                  <dt>{t.orderNo}</dt>
                  <dd>{order.id}</dd>
                </div>
                <div>
                  <dt>{t.bagTitle}</dt>
                  <dd>{order.lines.join(", ")}</dd>
                </div>
                <div>
                  <dt>{t.total}</dt>
                  <dd>{rupees(order.total)}</dd>
                </div>
              </dl>
              <button className="pill solid" onClick={downloadReceipt}>
                {t.downloadReceipt}
                <Check size={18} />
              </button>
              <button className="text-link bag-save" onClick={() => go("#shop")}>
                {t.continueShopping}
                <Plus size={16} />
              </button>
            </div>
          )}
          {panel === "booking" && (
            <div className="booking-panel">
              {booked ? (
                <div className="booking-done">
                  <span className="eyebrow">{BRAND}</span>
                  <h2>{t.bookedTitle}</h2>
                  <p>{t.bookedCopy}</p>
                  <dl className="booking-summary">
                    <div>
                      <dt>{t.service}</dt>
                      <dd>{booked.service}</dd>
                    </div>
                    <div>
                      <dt>{t.date}</dt>
                      <dd>
                        {new Date(booked.date + "T00:00").toLocaleDateString(({ en: "en-IN", ta: "ta-IN", hi: "hi-IN", ml: "ml-IN", te: "te-IN" } as const)[lang], {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt>{t.time}</dt>
                      <dd>{booked.time}</dd>
                    </div>
                  </dl>
                  <div className="booking-actions">
                    <button className="pill solid" onClick={downloadIcs}>
                      {t.addToCalendar}
                      <Check size={18} />
                    </button>
                    <button className="text-link" onClick={() => setBooked(null)}>
                      {t.bookAnother}
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="booking-grid">
                  <div className="booking-intro">
                    <span className="eyebrow">{BRAND}</span>
                    <h2>{t.bookingTitle}</h2>
                    <p>{t.bookingCopy}</p>
                    <ul className="salon-perks">
                      {t.perks.map((perk) => (
                        <li key={perk}>
                          <Check size={15} />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <span className="salon-hours">{t.salonHours}</span>
                  </div>
                  <div className="booking-form">
                    <label className="field">
                      <span>{t.service}</span>
                      <select
                        value={booking.service}
                        onChange={(e) => setBooking({ ...booking, service: e.target.value })}
                      >
                        <option value="">—</option>
                        {serviceGroups.map((g) => (
                          <optgroup key={g.key} label={g.label[lang]}>
                            {g.items.map((sv) => (
                              <option key={sv.id} value={sv.id}>
                                {sv.name[lang]} · {rupees(sv.price)} · {sv.mins} {t.mins}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </label>
                    <label className="field">
                      <span>{t.date}</span>
                      <input
                        type="date"
                        min={todayStr}
                        value={booking.date}
                        onChange={(e) => setBooking({ ...booking, date: e.target.value, time: "" })}
                      />
                    </label>
                    <div className="field">
                      <span>{t.time}</span>
                      <div className="slot-grid" role="radiogroup" aria-label={t.time}>
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            role="radio"
                            aria-checked={booking.time === slot}
                            disabled={!booking.date || isTaken(slot)}
                            className={`${booking.time === slot ? "is-active" : ""} ${booking.date && isTaken(slot) ? "is-taken" : ""}`}
                            onClick={() => setBooking({ ...booking, time: slot })}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="field-row">
                      <label className="field">
                        <span>{t.fullName}</span>
                        <input autoComplete="name" value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} />
                      </label>
                      <label className="field">
                        <span>{t.phone}</span>
                        <input autoComplete="tel" inputMode="tel" value={booking.phone} onChange={(e) => setBooking({ ...booking, phone: e.target.value })} />
                      </label>
                    </div>
                    <label className="field">
                      <span>{t.notes}</span>
                      <input value={booking.notes} onChange={(e) => setBooking({ ...booking, notes: e.target.value })} />
                    </label>
                    {bookError && (
                      <p className="form-error" role="alert">
                        {bookError}
                      </p>
                    )}
                    <button className="pill solid" onClick={submitBooking}>
                      {t.confirmBooking}
                      <Check size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {panel === "menu" && (
            <div className="mobile-panel">
              <Brand lang={lang} />
              <nav>
                <a href={SITE.products}>{NL.Products}</a>
                <a href={SITE.services}>{NL.Services}</a>
                <a href={SITE.about}>{NL.About}</a>
                <a href={SITE.tracking}>{NL.Tracking}</a>
                <a href={SITE.admin}>{NL.AdminPanel}</a>
              </nav>
              <button className="text-link" onClick={() => setPanel("search")}>
                <Search size={17} />
                {t.searchTitle}
              </button>
              <div className="lang-switcher" style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <span className="eyebrow" style={{ width: "100%" }}>{t.language}</span>
                {(["en", "ta", "hi", "ml", "te"] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={lang === code ? "pill dark" : "pill ghost"}
                    style={{ fontSize: "0.75rem", padding: "0.4rem 0.75rem" }}
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                  >
                    {LANG_LABELS[code]}
                  </button>
                ))}
              </div>
            </div>
          )}
          {panel === "journal" && (
            <article className="article-panel">
              <img
                src={article === 0 ? "/assets/hero/products.webp" : "/assets/hero/spa.webp"}
                alt={article === 0 ? t.articleOne : t.articleTwo}
                width="1024"
                height="559"
              />
              <span className="eyebrow">{t.journalLabel}</span>
              <h2>{article === 0 ? t.articleOne : t.articleTwo}</h2>
              {(({
                en: article === 0
                  ? ["Healthy skin starts with a simple routine: cleanse gently, moisturise daily and protect your skin from the sun.", "Herbal ingredients such as neem, aloe vera, turmeric and sandalwood have been used for generations to soothe and nourish the skin. Choose products that suit your skin type, and patch-test anything new.", "Consistency matters more than quantity."]
                  : ["A herbal spa visit is a calm break in your day. We begin with a consultation so our therapist can understand your skin and hair needs.", "Treatments use herbal oils, packs and products from our own range, planned in an order that never feels rushed.", "Arrive relaxed. Leave refreshed."],
                ta: article === 0
                  ? ["சூரியன் மறையும் முன் உலகம் மென்மையாகும் ஒரு தருணம் உண்டு. தோல் சூடாகத் தெரியும். நிறம் செறிவாகத் தெரியும்.", "REVATHI HERBAL BEAUTY CARE-இல் நாங்கள் தேடும் பிரகாசம் இதுதான்: எக்லாட் சீரம் துளி, கன்ன எலும்புகளில் தங்க ஹைலைட்டர், வெல்வெட் உதடு. எளிய படிகள், மெதுவாக.", "சில நாட்கள் கடந்து செல்லும். மற்றவை பிரகாசிக்கும்."]
                  : ["சலூன் நாள் ஒரு இடைவேளை. நாள் அமைதியாக இருக்கும்போது ஃபேஷியலுடன் தொடங்கி, முடிக்குச் சென்று, மாலை இருந்தால் மேக்கப்புடன் முடிக்கவும்.", "உங்களுக்குத் தேவையானதைச் சொல்லுங்கள் — சிகிச்சைகளின் வரிசையைத் திட்டமிடுவோம். ஆலோசனை இலவசம்.", "நீங்கள் இருப்பது போல வாருங்கள். மிகவும் பளபளப்பான உங்களாகச் செல்லுங்கள்."],
                hi: article === 0
                  ? ["सूरज डूबने से ठीक पहले एक क्षण आता है जब दुनिया नरम लगती है। त्वचा गर्म दिखती है। रंग समृद्ध लगते हैं।", "REVATHI HERBAL BEAUTY CARE में हम जो चमक चाहते हैं: एक्ला सीरम की एक बूँद, गाल की हड्डियों पर सुनहरा हाइलाइटर, और मखमली होंठ। सरल कदम, धीरे-धीरे।", "कुछ दिन बीत जाते हैं। कुछ चमकते हैं।"]
                  : ["सैलून का दिन एक विराम है। दिन शांत हो तब फेशियल से शुरू करें, फिर बाल, और शाम हो तो मेकअप से खत्म करें।", "हमें बताएँ आपको क्या चाहिए — हम ट्रीटमेंट का क्रम प्लान करेंगे। परामर्श मुफ़्त है।", "जैसे हैं वैसे आएँ। सबसे पॉलिश्ड रूप में जाएँ।"],
                ml: article === 0
                  ? ["സൂര്യൻ അസ്തമിക്കുന്നതിന് മുമ്പ് ലോകം മൃദുവാകുന്ന ഒരു നിമിഷമുണ്ട്. ചർമ്മം ചൂടുള്ളതായി തോന്നും. നിറം സമ്പന്നമായി തോന്നും.", "REVATHI HERBAL BEAUTY CARE-ൽ ഞങ്ങൾ തേടുന്ന ഗ്ലോ: എക്ലാറ്റ് സീറത്തിന്റെ ഒരു തുള്ളി, കവിൾഎല്ലുകളിൽ ഗോൾഡൻ ഹൈലൈറ്റർ, വെൽവെറ്റ് ലിപ്. ലളിതമായ ഘട്ടങ്ങൾ, മന്ദഗതിയിൽ.", "ചില ദിവസങ്ങൾ കടന്നുപോകും. മറ്റുള്ളവ തിളങ്ങും."]
                  : ["സലൂൺ ദിനം ഒരു ഇടവേളയാണ്. ദിവസം ശാന്തമായിരിക്കുമ്പോൾ ഫേഷ്യലിൽ ആരംഭിച്ച്, മുടിയിലേക്ക് നീങ്ങി, സന്ധ്യയുണ്ടെങ്കിൽ മേക്കപ്പോടെ അവസാനിപ്പിക്കുക.", "നിങ്ങൾക്ക് എന്താണ് വേണ്ടതെന്ന് പറയുക — ട്രീറ്റ്മെന്റുകളുടെ ക്രമം ഞങ്ങൾ പ്ലാൻ ചെയ്യും. കൺസൾട്ടേഷൻ സൗജന്യം.", "നിങ്ങളായിരിക്കുന്നത് പോലെ വരുക. ഏറ്റവും പോളിഷ്ഡ് നിങ്ങളായി പോകുക."],
                te: article === 0
                  ? ["సూర్యుడు అస్తమించే ముందు ప్రపంచం మృదువుగా అనిపించే క్షణం ఉంది. చర్మం వెచ్చగా కనిపిస్తుంది. రంగు సమృద్ధంగా కనిపిస్తుంది.", "REVATHI HERBAL BEAUTY CARE వద్ద మేము వెతికే గ్లో: ఎక్లా సీరం చుక్క, బుగ్గ ఎముకలపై గోల్డెన్ హైలైటర్, వెల్వెట్ లిప్. సాధారణ అడుగులు, నెమ్మదిగా.", "కొన్ని రోజులు గడిచిపోతాయి. మరికొన్ని ప్రకాశిస్తాయి."]
                  : ["సెలూన్ రోజు ఒక విరామం. రోజు ప్రశాంతంగా ఉన్నప్పుడు ఫేషియల్‌తో ప్రారంభించి, జుట్టుకు వెళ్లి, సాయంత్రం ఉంటే మేకప్‌తో ముగించండి.", "మీకు ఏమి కావాలో చెప్పండి — ట్రీట్‌మెంట్ల క్రమాన్ని మేము ప్లాన్ చేస్తాము. కన్సల్టేషన్ ఉచితం.", "మీరు ఉన్నట్టుగా రండి. అత్యంత పాలిష్డ్ మీగా వెళ్లండి."],
              } as const)[lang]).map((p) => (
                <p key={p}>{p}</p>
              ))}
              <button className="text-link" onClick={() => (article === 0 ? go("#shop") : openBooking())}>
                {article === 0 ? t.explore : t.heroBook}
                <Plus size={16} />
              </button>
            </article>
          )}
          {panel === "care" && (
            <div className="care-panel">
              <span className="eyebrow">{BRAND}</span>
              <h2>{article === 0 ? t.care : t.privacy}</h2>
              <p>
                {article === 0
                  ? ({
                      en: "Keep skincare and makeup away from direct sunlight and heat, with caps closed tightly. Use clean hands or a clean spatula for jars, and store products in a cool, dry place. Check each product's label for its recommended use period.",
                      ta: "தோல் பராமரிப்பு மற்றும் மேக்கப்பை நேரடி சூரிய ஒளி மற்றும் வெப்பத்திலிருந்து விலக்கி, மூடிகளை இறுக்கமாக மூடி வைக்கவும். ஜார்களுக்கு சுத்தமான கைகள் அல்லது ஸ்பேட்டூலா பயன்படுத்தவும். குளிர்ந்த, உலர்ந்த இடத்தில் சேமிக்கவும்.",
                      hi: "स्किनकेयर और मेकअप को सीधी धूप और गर्मी से दूर रखें, ढक्कन कसकर बंद करें। जार के लिए साफ हाथ या स्पैचुला उपयोग करें। ठंडी, सूखी जगह पर रखें।",
                      ml: "സ്കിൻകെയറും മേക്കപ്പും നേരിട്ടുള്ള സൂര്യപ്രകാശത്തിൽ നിന്നും ചൂടിൽ നിന്നും അകറ്റി, ക്യാപ്പുകൾ ദൃഢമായി അടച്ച് വയ്ക്കുക. ജാറുകൾക്ക് വൃത്തിയുള്ള കൈകളോ സ്പാറ്റുലയോ ഉപയോഗിക്കുക. തണുത്ത, ഉണങ്ങിയ സ്ഥലത്ത് സൂക്ഷിക്കുക.",
                      te: "స్కిన్‌కేర్ మరియు మేకప్‌ను నేరుగా సూర్యకాంతి మరియు వేడి నుండి దూరంగా ఉంచి, క్యాప్‌లను గట్టిగా మూసివేయండి. జార్‌లకు శుభ్రమైన చేతులు లేదా స్పాచులా ఉపయోగించండి. చల్లని, పొడి ప్రదేశంలో నిల్వ చేయండి.",
                    } as const)[lang]
                  : ({
                      en: "Your bag, appointments and language preference are saved only in this browser. Search is performed on this page. Clearing your browser's site data removes them.",
                      ta: "உங்கள் பை, நேரங்கள் மற்றும் மொழி விருப்பம் இந்த உலாவியில் மட்டுமே சேமிக்கப்படும். தேடல் இந்தப் பக்கத்தில் செய்யப்படுகிறது. உலாவி தரவை அழித்தால் அவை நீக்கப்படும்.",
                      hi: "आपका बैग, अपॉइंटमेंट और भाषा वरीयता केवल इस ब्राउज़र में सेव होती है। खोज इसी पेज पर होती है। ब्राउज़र डेटा साफ़ करने पर वे हट जाती हैं।",
                      ml: "നിങ്ങളുടെ ബാഗ്, അപ്പോയിന്റ്മെന്റുകൾ, ഭാഷാ മുൻഗണന ഈ ബ്രൗസറിൽ മാത്രം സേവ് ചെയ്യപ്പെടും. തിരയൽ ഈ പേജിൽ നടക്കും. ബ്രൗസർ ഡാറ്റ മായ്ച്ചാൽ അവ നീക്കം ചെയ്യപ്പെടും.",
                      te: "మీ బ్యాగ్, అపాయింట్‌మెంట్లు మరియు భాషా ప్రాధాన్యత ఈ బ్రౌజర్‌లో మాత్రమే సేవ్ అవుతాయి. శోధన ఈ పేజీలో జరుగుతుంది. బ్రౌజర్ డేటా క్లియర్ చేస్తే అవి తొలగించబడతాయి.",
                    } as const)[lang]}
              </p>
              {article === 1 && (
                <button
                  className="pill dark"
                  onClick={() => {
                    update(() => ({}));
                    setToast(({ en: "Your bag has been cleared.", ta: "உங்கள் பை காலி செய்யப்பட்டது.", hi: "आपका बैग खाली कर दिया गया।", ml: "നിങ്ങളുടെ ബാഗ് ക്ലിയർ ചെയ്തു.", te: "మీ బ్యాగ్ క్లియర్ చేయబడింది." } as const)[lang]);
                  }}
                >
                  {({ en: "Clear my bag", ta: "பையை காலி செய்", hi: "बैग खाली करें", ml: "ബാഗ് ക്ലിയർ ചെയ്യുക", te: "బ్యాగ్ క్లియర్ చేయండి" } as const)[lang]}
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </dialog>
      <div className={`toast ${toast ? "visible" : ""}`} role="status">
        <Check size={16} />
        {toast}
      </div>
    </div>
  );
}