/**
 * A small, dependency-free expression evaluator for the in-test calculator.
 *
 * Deliberately NOT eval(): this runs on user input during a timed test, and a
 * hand-written parser gives predictable errors, no injection surface, and
 * control over SAT-specific behaviour — notably that trigonometry defaults to
 * DEGREES, which is what SAT questions use.
 *
 * Grammar (precedence low → high):
 *   expr   := term (('+' | '-') term)*
 *   term   := unary (('*' | '/' | implicit) unary)*
 *   unary  := ('-' | '+')? power
 *   power  := atom ('^' unary)?            -- right associative
 *   atom   := number | constant | func '(' expr ')' | '(' expr ')' | atom '!'
 */

export type AngleMode = "deg" | "rad";

type Token =
  | { t: "num"; v: number }
  | { t: "op"; v: string }
  | { t: "name"; v: string }
  | { t: "lp" }
  | { t: "rp" };

const FUNCS = new Set([
  "sin", "cos", "tan", "asin", "acos", "atan",
  "sqrt", "abs", "ln", "log", "exp", "round", "floor", "ceil",
]);

const CONSTS: Record<string, number> = { pi: Math.PI, π: Math.PI, e: Math.E };

class CalcError extends Error {}

function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const s = src.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/√/g, "sqrt");

  while (i < s.length) {
    const c = s[i]!;
    if (c === " " || c === "\t" || c === ",") {
      i++;
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j]!)) j++;
      const raw = s.slice(i, j);
      if ((raw.match(/\./g) ?? []).length > 1) throw new CalcError(`Bad number "${raw}"`);
      out.push({ t: "num", v: Number(raw) });
      i = j;
      continue;
    }
    if (/[a-zA-Zπ]/.test(c)) {
      let j = i;
      while (j < s.length && /[a-zA-Zπ0-9]/.test(s[j]!)) j++;
      out.push({ t: "name", v: s.slice(i, j).toLowerCase() });
      i = j;
      continue;
    }
    if (c === "(") { out.push({ t: "lp" }); i++; continue; }
    if (c === ")") { out.push({ t: "rp" }); i++; continue; }
    if ("+-*/^%!".includes(c)) { out.push({ t: "op", v: c }); i++; continue; }
    throw new CalcError(`Unexpected character "${c}"`);
  }
  return out;
}

export function evaluate(input: string, mode: AngleMode = "deg"): number {
  const tokens = tokenize(input);
  let pos = 0;

  const peek = (): Token | undefined => tokens[pos];
  const next = (): Token | undefined => tokens[pos++];

  const toRad = (x: number) => (mode === "deg" ? (x * Math.PI) / 180 : x);
  const fromRad = (x: number) => (mode === "deg" ? (x * 180) / Math.PI : x);

  function applyFunc(name: string, x: number): number {
    switch (name) {
      case "sin": return Math.sin(toRad(x));
      case "cos": return Math.cos(toRad(x));
      case "tan": return Math.tan(toRad(x));
      case "asin": return fromRad(Math.asin(x));
      case "acos": return fromRad(Math.acos(x));
      case "atan": return fromRad(Math.atan(x));
      case "sqrt": {
        if (x < 0) throw new CalcError("Square root of a negative number");
        return Math.sqrt(x);
      }
      case "abs": return Math.abs(x);
      case "ln": {
        if (x <= 0) throw new CalcError("ln needs a positive number");
        return Math.log(x);
      }
      case "log": {
        if (x <= 0) throw new CalcError("log needs a positive number");
        return Math.log10(x);
      }
      case "exp": return Math.exp(x);
      case "round": return Math.round(x);
      case "floor": return Math.floor(x);
      case "ceil": return Math.ceil(x);
      default: throw new CalcError(`Unknown function "${name}"`);
    }
  }

  function parseAtom(): number {
    const tk = next();
    if (!tk) throw new CalcError("Unexpected end of expression");

    let value: number;

    if (tk.t === "num") {
      value = tk.v;
    } else if (tk.t === "lp") {
      value = parseExpr();
      const close = next();
      if (!close || close.t !== "rp") throw new CalcError("Missing closing bracket");
    } else if (tk.t === "name") {
      if (FUNCS.has(tk.v)) {
        const open = next();
        if (!open || open.t !== "lp") throw new CalcError(`${tk.v} needs brackets, e.g. ${tk.v}(30)`);
        const arg = parseExpr();
        const close = next();
        if (!close || close.t !== "rp") throw new CalcError("Missing closing bracket");
        value = applyFunc(tk.v, arg);
      } else if (tk.v in CONSTS) {
        value = CONSTS[tk.v]!;
      } else {
        throw new CalcError(`Unknown name "${tk.v}"`);
      }
    } else {
      throw new CalcError("Expected a number");
    }

    // percent and factorial are postfix
    for (;;) {
      const p = peek();
      if (p && p.t === "op" && p.v === "%") { pos++; value = value / 100; continue; }
      if (p && p.t === "op" && p.v === "!") {
        pos++;
        if (value < 0 || !Number.isInteger(value) || value > 170)
          throw new CalcError("Factorial needs a whole number from 0 to 170");
        let acc = 1;
        for (let k = 2; k <= value; k++) acc *= k;
        value = acc;
        continue;
      }
      break;
    }
    return value;
  }

  function parsePower(): number {
    const base = parseAtom();
    const p = peek();
    if (p && p.t === "op" && p.v === "^") {
      pos++;
      return Math.pow(base, parseUnary()); // right associative
    }
    return base;
  }

  function parseUnary(): number {
    const p = peek();
    if (p && p.t === "op" && (p.v === "-" || p.v === "+")) {
      pos++;
      const v = parseUnary();
      return p.v === "-" ? -v : v;
    }
    return parsePower();
  }

  function parseTerm(): number {
    let value = parseUnary();
    for (;;) {
      const p = peek();
      if (p && p.t === "op" && (p.v === "*" || p.v === "/")) {
        pos++;
        const rhs = parseUnary();
        if (p.v === "/") {
          if (rhs === 0) throw new CalcError("Division by zero");
          value /= rhs;
        } else value *= rhs;
        continue;
      }
      // Implicit multiplication: 2(3+1), 3pi, 2sqrt(9)
      if (p && (p.t === "lp" || p.t === "num" || (p.t === "name" && (FUNCS.has(p.v) || p.v in CONSTS)))) {
        value *= parseUnary();
        continue;
      }
      break;
    }
    return value;
  }

  function parseExpr(): number {
    let value = parseTerm();
    for (;;) {
      const p = peek();
      if (p && p.t === "op" && (p.v === "+" || p.v === "-")) {
        pos++;
        const rhs = parseTerm();
        value = p.v === "+" ? value + rhs : value - rhs;
        continue;
      }
      break;
    }
    return value;
  }

  const result = parseExpr();
  if (pos !== tokens.length) throw new CalcError("Could not read the whole expression");
  if (!Number.isFinite(result)) throw new CalcError("Result is not a finite number");
  return result;
}

/** Evaluate without throwing — the UI wants a value or a message, never a crash. */
export function tryEvaluate(
  input: string,
  mode: AngleMode = "deg",
): { ok: true; value: number } | { ok: false; error: string } {
  if (!input.trim()) return { ok: false, error: "" };
  try {
    return { ok: true, value: evaluate(input, mode) };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Invalid expression" };
  }
}

/**
 * Display a result the way the SAT expects an answer to be entered: exact
 * where possible, otherwise trimmed to a sensible precision rather than
 * dumping floating-point noise like 0.30000000000000004.
 */
export function formatResult(n: number): string {
  if (Number.isInteger(n)) return String(n);
  // 10 significant digits everywhere: enough precision for any SAT answer,
  // and it collapses floating-point noise like 0.30000000000000004 to 0.3.
  return String(Number(n.toPrecision(10)));
}
