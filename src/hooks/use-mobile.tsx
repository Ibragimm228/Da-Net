import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * A React hook to determine if the current viewport is a mobile size.
 * This hook is safe for Server-Side Rendering (SSR) environments.
 */
export function useIsMobile() {
  // Default to `false`. This ensures the server-rendered output and the initial
  // client-side render are consistent, preventing hydration errors.
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // This effect runs only on the client, where `window` is available.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Handler to update state based on the media query's result.
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Set the initial value on mount, once we're on the client.
    setIsMobile(mql.matches)

    // Add a listener for changes.
    mql.addEventListener("change", onChange)

    // Cleanup function to remove the listener when the component unmounts.
    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, []) // The empty dependency array ensures this effect runs only once on mount.

  return isMobile
}