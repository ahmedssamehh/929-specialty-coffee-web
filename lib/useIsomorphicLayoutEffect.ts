import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server.
 *
 * Anything that lets GSAP restructure the DOM — above all ScrollTrigger's
 * `pin: true`, which wraps the pinned element in a `.pin-spacer` div — must
 * clean up in the layout phase. Passive (`useEffect`) cleanups run *after*
 * React has already detached the nodes, so React calls `removeChild` on a
 * parent that no longer owns the element and throws:
 *
 *   NotFoundError: Failed to execute 'removeChild' on 'Node'
 *
 * which aborts the commit and leaves the next route blank. Layout cleanups
 * run before removal, so `ctx.revert()` unwraps the spacer in time.
 *
 * The server alias just keeps React from warning that useLayoutEffect does
 * nothing during SSR.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
