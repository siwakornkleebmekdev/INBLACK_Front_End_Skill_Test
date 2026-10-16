"use client";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  Bell,
  Check,
  Copy,
  FileSearch,
  Menu,
  Search,
  ShoppingBasket,
  TriangleAlert,
  X,
} from "lucide-react";
import {
  ORDERS,
  looksLikeOrderId,
  matchOrders,
  type OrderStatus,
} from "@/lib/order-lookup";


type TabId = "all" | "current" | "past";

const STATUS_META: Record<
  OrderStatus,
  { label: string; badgeClass: string }
> = {
  queued: {
    label: "อยู่ในคิว",
    badgeClass: "bg-status-queued text-status-queued-foreground",
  },
  pending: {
    label: "รอชำระเงิน",
    badgeClass: "bg-status-pending text-status-pending-foreground",
  },
  done: {
    label: "เสร็จสิ้น",
    badgeClass: "bg-status-done text-status-done-foreground",
  },
};

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "ทั้งหมด" },
  { id: "current", label: "ออเดอร์ปัจจุบัน" },
  { id: "past", label: "ประวัติออเดอร์" },
];

const NAV_LINKS = [{label: "ติดตามออเดอร์", href: "/"}, {label: "วิธีใช้งาน", href: "/help"}];

export default function OrderTracker() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<TabId>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();

  const tabOrders = useMemo(
    () =>
      ORDERS.filter((o) => {
        if (tab === "all") return true;
        if (tab === "current")
          return o.status === "queued" || o.status === "pending";
        return o.status === "done";
      }),
    [tab],
  );

  const visibleOrders = useMemo(
    () => matchOrders(tabOrders, trimmed),
    [tabOrders, trimmed],
  );

  const suggestions = useMemo(
    () => matchOrders(ORDERS, trimmed).slice(0, 5),
    [trimmed],
  );

  const showFormatError =
    trimmed !== "" &&
    !looksLikeOrderId(trimmed) &&
    visibleOrders.length === 0 &&
    suggestions.length === 0;

  useEffect(() => {
    setActive(0);
  }, [trimmed]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const pick = (id: string) => {
    setQuery(id);
    setTab("all");
    setOpen(false);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCopy = async (id: string) => {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(id);
    } catch {
      const el = document.createElement("textarea");
      el.value = id;
      document.body.appendChild(el);
      el.select();
      let succeeded = false;
      try { succeeded = document.execCommand("copy"); } catch { /* Manual copy remains available. */ }
      finally { el.remove(); }
      if (!succeeded) { setCopyError("ไม่สามารถคัดลอกได้ กรุณาเลือกหมายเลขแล้วคัดลอกด้วยตนเอง"); return; }
    }
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1600);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (showFormatError) return;
    if (trimmed && open && suggestions[active]) {
      pick(suggestions[active].id);
      return;
    }
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open || !trimmed || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + suggestions.length) % suggestions.length);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-primary text-primary-foreground">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <a href="/" className="flex flex-col leading-none">
            <span className="font-pixel text-sm leading-6 sm:text-base">INBLACKM</span>
            <span className="mt-1 text-[9px] tracking-[0.2em] opacity-80">
              GAMING STORE
            </span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium opacity-90 transition-opacity hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden h-10 w-64 items-center gap-2 rounded-full bg-primary-foreground/15 px-3 lg:flex">
              <Search className="size-4 opacity-80" />
              <input
                aria-label="ค้นหาชื่อเกม"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setTab("all"); }}
                placeholder="ค้นหาชื่อเกม..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-primary-foreground/70"
              />
            </div>
            <button
              aria-label="การแจ้งเตือน"
              aria-expanded={notificationsOpen}
              onClick={() => setNotificationsOpen(v => !v)}
              className="rounded-full border border-primary-foreground/30 p-2 transition-colors hover:bg-primary-foreground/10"
            >
              <Bell className="size-4" />
            </button>
            <button
              aria-label="เมนู"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full border border-primary-foreground/30 p-2 transition-colors hover:bg-primary-foreground/10 md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-primary-foreground/20 md:hidden">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block px-6 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10"
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {notificationsOpen && <aside role="status" className="mx-auto mt-4 w-full max-w-2xl rounded-xl border bg-card p-4 text-sm">ข้อมูลตัวอย่าง: มีออเดอร์รอชำระเงิน 1 รายการ และอยู่ในคิว 1 รายการ <button className="ml-2 underline" onClick={() => setNotificationsOpen(false)}>ปิด</button></aside>}
      {/* ── Main ───────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <section className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            ติดตามออเดอร์
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            กรอกหมายเลขออเดอร์หรือชื่อเกมเพื่อตรวจสอบสถานะ
          </p>
        </section>

        <p className="mt-4 rounded-lg bg-status-pending px-4 py-2 text-center text-xs text-status-pending-foreground">โหมดตัวอย่าง · แสดงข้อมูลเดิม 5 รายการ ไม่มีการเรียกเก็บเงินจริง</p>
        {/* ── Search ───────────────────────────────────────────── */}
        <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="size-5 text-primary" />
            <h2 className="text-lg font-semibold">หมายเลขออเดอร์</h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-4" noValidate>
            <label
              htmlFor="order-id"
              className="text-sm text-muted-foreground"
            >
              หมายเลขออเดอร์ <span className="text-destructive">*</span>
            </label>
            <div className="relative mt-1.5" ref={boxRef}>
              <div className="flex gap-2">
                <input
                  id="order-id"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="ORD-1024"
                  autoComplete="off"
                  role="combobox"
                  aria-expanded={open && trimmed !== "" && suggestions.length > 0}
                  aria-activedescendant={open && trimmed !== "" && suggestions[active] ? `suggestion-${suggestions[active].id}` : undefined}
                  aria-controls="order-suggestions"
                  aria-autocomplete="list"
                  className={`h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring ${
                    showFormatError ? "border-destructive" : "border-input"
                  }`}
                />
                <button
                  type="submit"
                  aria-label="ค้นหา"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Search className="size-5" />
                </button>
              </div>
              {open && trimmed !== "" && suggestions.length > 0 && (
                <ul
                  id="order-suggestions"
                  role="listbox"
                  aria-label="หมายเลขออเดอร์ในระบบ"
                  className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-border bg-card shadow-lg"
                >
                  {suggestions.map((o, i) => {
                    const meta = STATUS_META[o.status];
                    return (
                      <li id={`suggestion-${o.id}`} key={o.id} role="option" aria-selected={i === active}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive(i)}
                          onClick={() => pick(o.id)}
                          className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                            i === active ? "bg-accent" : ""
                          }`}
                        >
                          <span className="font-pixel text-xs leading-4">
                            {o.id}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-muted-foreground">
                            {o.game}
                          </span>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.badgeClass}`}
                          >
                            {meta.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            {showFormatError && (
              <p
                role="alert"
                className="mt-2 flex items-center gap-1.5 text-sm text-destructive"
              >
                <TriangleAlert className="size-4 shrink-0" />
                ไม่พบคำค้นหานี้ ลองหมายเลข ORD-1024 หรือชื่อเกม เช่น Roblox
              </p>
            )}
          </form>
        </section>

        {/* ── Tabs + list ──────────────────────────────────────── */}
        <div ref={listRef} className="mt-8 scroll-mt-24">
          <div className="border-b border-border" aria-label="กรองออเดอร์">
            <div className="flex">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                    tab === t.id
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <p aria-live="polite" className="mt-4 text-xs text-muted-foreground">พบ {visibleOrders.length} ออเดอร์ {query && <button className="ml-2 text-primary underline" onClick={() => {setQuery(""); setOpen(false);}}>ล้างคำค้นหา</button>}</p>
          {copyError && <p role="alert" className="mt-2 text-sm text-destructive">{copyError}</p>}
          <div className="mt-6 space-y-3">
            {visibleOrders.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-14 text-center">
                <FileSearch className="size-10 text-muted-foreground/60" />
                <p className="text-sm font-medium">
                  {trimmed
                    ? "ไม่พบออเดอร์ที่ตรงกับคำค้นหา"
                    : "ยังไม่มีออเดอร์ในหมวดนี้"}
                </p>
              </div>
            ) : (
              visibleOrders.map((order) => {
                const meta = STATUS_META[order.status];
                const isCopied = copiedId === order.id;
                return (
                  <article
                    key={order.id}
                    className="rounded-xl border border-border bg-card p-4 shadow-xs transition-colors hover:border-primary/40"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-pixel text-xs leading-4">
                            {order.id}
                          </span>
                          <button
                            onClick={() => handleCopy(order.id)}
                            aria-label={
                              isCopied
                                ? "คัดลอกแล้ว"
                                : `คัดลอกหมายเลขออเดอร์ ${order.id}`
                            }
                            className={`inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium transition-colors hover:bg-accent hover:text-foreground ${
                              isCopied
                                ? "text-status-done-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {isCopied ? (
                              <Check className="size-3.5" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                            {isCopied ? "Copied!" : "คัดลอก"}
                          </button>
                        </div>
                        <p className="mt-1.5 truncate text-sm text-muted-foreground">
                          {order.game}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {order.date}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${meta.badgeClass}`}
                        >
                          {meta.label}
                        </span>
                        <span className="text-sm font-semibold">
                          {order.amount}
                        </span>
                        <Link href={`/orders/${order.id}`} className="text-xs font-medium text-primary underline underline-offset-4">ดูรายละเอียด →</Link>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 INBLACKM Gaming Co., Ltd. — บริการเติมเกม
        </p>
      </footer>
    </div>
  );
}
