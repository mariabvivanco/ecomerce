# Pharmacy E-commerce — Project Rules

These rules apply to ALL code in this project. Follow them before writing any code.

---

## Folder structure

The project uses a domain-driven structure. Every feature lives inside its domain:

```
src/
├── app/              # Global config: App.tsx, providers.tsx, router.tsx
├── domains/          # Business logic by domain
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   └── customer/
├── pages/            # Page components — compose domains, no business logic here
├── components/
│   ├── ui/           # Reusable UI primitives (Button, Input, Modal…)
│   └── layout/       # Header, Footer, PrivateRoute
├── hooks/            # Generic reusable hooks (useDebounce, useMediaQuery)
├── lib/              # Config and utilities (axios.ts, queryClient.ts, utils.ts)
├── i18n/             # i18next setup and locale files
└── types/            # Global TypeScript types
```

Each domain folder follows this pattern:
```
domains/<name>/
├── <name>.types.ts       # TypeScript types and interfaces
├── <name>.service.ts     # API calls (uses lib/axios.ts)
├── <name>.store.ts       # Zustand store (if client state needed)
├── <name>.queries.ts     # React Query hooks (useQuery, useMutation)
├── use<Name>.ts          # Hook that composes store + queries for components
└── <ComponentName>.tsx   # UI components
```

---

## File naming

| File type | Convention | Examples |
|-----------|-----------|---------|
| React component | PascalCase | `ProductCard.tsx`, `Providers.tsx`, `PrivateRoute.tsx` |
| Hook | camelCase with `use` prefix | `useCart.ts`, `useProductCard.ts` |
| Service / store / queries / types | camelCase | `cart.store.ts`, `product.service.ts`, `auth.types.ts` |
| Config / utility | camelCase | `router.tsx`, `queryClient.ts`, `axios.ts` |

> **Rule:** use PascalCase whenever the file's primary export is a React component. Use camelCase for everything else, even if the file contains some JSX (e.g. `router.tsx` exports a router instance, not a component).

---

## Component rules

### Size limit: 60 lines max
- Every component file must be under 60 lines.
- If it grows beyond 60 lines, split it into smaller components or extract logic to a hook.

### No logic inside components
- Components only handle rendering and user interaction events.
- No `useEffect` with business logic, no inline data transformations, no API calls directly in components.
- Extract all logic to a custom hook in the same domain folder.

```tsx
// WRONG — logic inside component
export function ProductCard({ id }: Props) {
  const [product, setProduct] = useState(null)
  useEffect(() => { fetch(`/api/products/${id}`).then(...) }, [id])
  const price = product?.price * 1.21
  ...
}

// CORRECT — logic in hook
export function ProductCard({ id }: Props) {
  const { product, formattedPrice } = useProductCard(id)
  ...
}
```

### One component per file
- Never export multiple components from the same file.
- Exception: small sub-components used only by the parent can be co-located but must stay under the 60-line total.

### Props interfaces
- Always define a `Props` interface (or `type`) at the top of each component file.
- Never use inline `{ prop: type }` in function signatures.

---

## Hooks rules

- Hook files are named `use<Name>.ts` (camelCase, `use` prefix).
- Each hook has a single responsibility.
- Hooks that wrap a Zustand store selector are named `use<StoreName>` and live in the domain folder.
- Hooks that combine React Query + store logic are the main interface for components.

---

## State management

| What | Tool |
|------|------|
| Server data (API responses) | React Query (`@tanstack/react-query`) |
| Client state (cart, auth session) | Zustand |
| Form state | react-hook-form |
| Local UI state (open/close) | `useState` inside component or hook |

- Never use `useState` for data that comes from the API.
- Never use Zustand for data that should be fetched from the server.

---

## API calls

- All API calls go through `lib/axios.ts` (the configured instance with auth interceptor).
- Never use `fetch` directly.
- All API calls live in `<name>.service.ts` files inside their domain.
- React Query hooks in `<name>.queries.ts` wrap the service functions.
- Cache keys must be centralized in a `<name>Keys` object in the queries file.

---

## Forms

- All forms use `react-hook-form` + `zod` resolver.
- Zod schemas are defined in the domain's `.types.ts` file or a dedicated `<name>.schema.ts`.
- Never manage form state manually with `useState`.

---

## TypeScript

- `strict` mode is enabled — no `any`, no type assertions without justification.
- All function parameters and return types must be explicitly typed.
- Prefer `type` over `interface` for props and data shapes. Use `interface` only for extensible contracts.
- No barrel files (`index.ts` re-exports) — import directly from the source file.

---

## Testing

### When to write tests
Every completed feature (approved Jira task) must include tests before it is considered done.

### What to test
| Layer | Tool | What |
|-------|------|-------|
| Hooks | Vitest + `@testing-library/react` | Logic, state transitions, edge cases |
| Components | Vitest + `@testing-library/react` | Renders correctly, user interactions |
| Services | Vitest + `msw` | API call shapes and error handling |
| Stores | Vitest | State mutations and derived values |

### Test file location
Tests live next to the file they test:
```
domains/cart/
├── cart.store.ts
├── cart.store.test.ts
├── CartItem.tsx
└── CartItem.test.tsx
```

### Rules
- No snapshot tests — test behaviour, not markup.
- No mocking of internal modules — only mock external APIs (via `msw`) and browser APIs.
- Each test must have a descriptive name: `it('adds item to cart when addItem is called')`.
- Minimum coverage per domain: all happy paths + the main error path.

---

## Styling

- Tailwind CSS only — no inline styles, no CSS modules, no styled-components.
- Use `clsx` for conditional class merging.
- Design tokens (colors, spacing) must be configured in `tailwind.config.ts`, not hardcoded.
- Responsive classes are mobile-first: `sm:`, `md:`, `lg:`.

---

## Internationalisation

- Every user-facing string must use `t('key')` from `react-i18next`.
- No hardcoded strings in Spanish or English inside components.
- Translation keys follow dot notation: `cart.emptyMessage`, `product.addToCart`.
- Both `es.json` and `en.json` must be updated together.

---

## General rules

- No `console.log` in committed code. Use the `sonner` toast library for user feedback.
- No commented-out code.
- All async functions must handle errors (try/catch or `.catch()`).
- Components and hooks that trigger loading states must show a `<Spinner />` while pending.
- All routes that require auth must be wrapped in `<PrivateRoute />`.

---

## Workflow: before writing any code for a Jira task

1. Read the task description fully.
2. Identify which domain(s) are involved.
3. Plan which files will be created/modified and confirm they respect the structure above.
4. Write the implementation following all rules in this file.
5. Write the tests.
6. Verify no file exceeds 60 lines. If it does, refactor before finishing.
