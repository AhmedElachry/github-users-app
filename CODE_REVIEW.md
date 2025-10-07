# Code Review & Self-Critical Notes

This file documents known limitations, edge cases, and recommended next steps for the
**GitHub Users App** project (Hiring Challenge Q3 2025). It is intended to be honest
and constructive for reviewers.

---

## Summary

The app meets the challenge: it fetches GitHub users, supports debounced search, provides
infinite scroll (Intersection Observer), manages favorites with Zustand + persist,
supports dark mode, and includes basic loading/error UX (skeletons + Sonner toasts).
Implementation favors simplicity and reviewability over heavy dependencies.

---

## Key limitations & edge cases (explicit)

1. **Infinite scroll without virtualization**

   - The app appends all loaded users to memory and to the DOM. For short sessions this is fine,
     but heavy scrolling (hundreds/thousands of items) can cause memory growth and UI jank.
   - **Mitigation / next step:** add virtualization (`react-window` / `react-virtual`) or a capped cache with a "load earlier" control.

2. **Rate limits & token usage**

   - Unauthenticated requests are limited to **60/hour**; hitting limits returns 403 and prevents loading.
   - **Mitigation:** s display clear rate-limit UI when 403 occurs, and offer retry guidance or a backoff strategy.

3. **Error handling scope**

   - Current UX uses toasts and a simple error message. It lacks structured retry/backoff and multi-step fallbacks.
   - **Mitigation:** add a small error component with a Retry button and explicit guidance (e.g., “Try again or use a token”).

---

## Priority backlog (ordered)

1. **(High)** Prevent unbounded DOM growth — implement virtualization or a bounded cache.
2. **(High)** Improve rate-limit UX — show remaining quota, clear 403 message, and retry guidance.
3. **(Medium)** Add minimal tests for `useUsers` (mock fetch), `useFavourites`, and expand component tests later.

---

## Suggested implementation notes (practical)

- **Virtualization**: integrate `react-window` with your list component if you expect many loaded users. For small demo usage, add a cap (e.g., max cached pages = 10) to avoid immediate complexity.
- **Rate-limit UI**: read `X-RateLimit-Remaining` and `Retry-After` headers. When remaining ≤ 0 or 403, show an inline message with a link to `.env.example` instructions for adding a token.

---

## What I would do next if given more time

- Add virtualization + maintain scroll position on navigation.
- Add robust tests for `useUsers` and `useFavourites`.
- Add retry/backoff for recoverable network errors and a better offline/empty-state UX.
- Instrument ErrorBoundary to report to a monitoring service.

---

## Final note

These trade-offs were chosen to deliver a clear, reviewable implementation within the hiring challenge timebox. The app is intentionally minimal in dependencies and focuses on correctness and UX clarity for typical usage. The items in this file are prioritized to guide improvements that would move this prototype toward production-readiness.
