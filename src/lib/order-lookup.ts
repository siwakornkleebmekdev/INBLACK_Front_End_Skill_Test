// Mock order data + the rules for turning typed text into a list of real orders.
// Kept out of the route file so the matching rules can be tested on their own.

export type OrderStatus = "queued" | "pending" | "done";

export interface Order {
  id: string;
  game: string;
  date: string;
  status: OrderStatus;
  amount: string;
}

export const ORDERS: Order[] = [
  {
    id: "ORD-1024",
    game: "Roblox — 1,000 Robux",
    date: "12 ต.ค. 2026 · 18:42",
    status: "queued",
    amount: "฿89",
  },
  {
    id: "ORD-1023",
    game: "Genshin Impact — 300 Genesis Crystals",
    date: "11 ต.ค. 2026 · 21:05",
    status: "pending",
    amount: "฿199",
  },
  {
    id: "ORD-1022",
    game: "Free Fire — 520 เพชร",
    date: "10 ต.ค. 2026 · 14:30",
    status: "done",
    amount: "฿129",
  },
  {
    id: "ORD-1021",
    game: "Honor of Kings — 250 Tokens",
    date: "8 ต.ค. 2026 · 09:12",
    status: "done",
    amount: "฿59",
  },
  {
    id: "ORD-1020",
    game: "Roblox — 400 Robux",
    date: "5 ต.ค. 2026 · 20:17",
    status: "done",
    amount: "฿35",
  },
];

/** "ORD-1024", "ord 1024", "ORD1024" all collapse to "ord1024". */
export function normalize(raw: string) {
  return raw.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Does the typed text read as an order number? "ORD", "ORD-", "ORD-10", "1024"
 * all count, so the lookup works while the number is still being typed.
 */
export function looksLikeOrderId(raw: string) {
  const t = raw.trim();
  return /^ORD[ -]?\d*$/i.test(t) || /^\d+$/.test(t);
}

/**
 * Live filter over the orders that exist in the system. Matches the order
 * number (ignoring case, spacing and the dash) or the game name, so typing
 * "ORD" alone calls up every order on file.
 */
export function matchOrders<T extends { id: string; game: string }>(
  orders: T[],
  raw: string,
) {
  const typed = raw.trim();
  if (typed === "") return orders;
  const q = normalize(typed);
  const name = typed.toLowerCase();
  return orders.filter(
    (o) => (q !== "" && /^[a-z0-9\s-]+$/i.test(typed) && normalize(o.id).includes(q)) || o.game.toLowerCase().includes(name),
  );
}
