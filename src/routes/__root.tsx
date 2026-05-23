import React, { useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "../components/Nav";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Prabal Batra — AI Engineer" },
      { name: "description", content: "Cinematic portfolio · AI · Geospatial Intelligence · Multi-Agent Systems." },
      { name: "author", content: "Prabal Batra" },
      { property: "og:title", content: "Prabal Batra — AI Engineer" },
      { property: "og:description", content: "Building Intelligent AI Systems for Real-World Intelligence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const routeOrder = [
  { path: "/", sector: "CORE INITIATION // SECTOR 00" },
  { path: "/about", sector: "NEURAL IDENTITY // SECTOR 01" },
  { path: "/stack", sector: "TECH ECOSYSTEM // SECTOR 02" },
  { path: "/expertise", sector: "VISUAL INTELLIGENCE // SECTOR 03" },
  { path: "/work", sector: "PRODUCTION REPOSITORIES // SECTOR 04" },
  { path: "/experience", sector: "PROFESSIONAL TRAJECTORY // SECTOR 05" },
  { path: "/honors", sector: "ACADEMIC DECORATIONS // SECTOR 06" },
  { path: "/contact", sector: "COMMUNICATOR SYSTEM // SECTOR 07" }
];

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  const [checkpointActive, setCheckpointActive] = useState(false);
  const [checkpointProgress, setCheckpointProgress] = useState(0);
  const [checkpointSector, setCheckpointSector] = useState("");
  const checkpointActiveRef = useRef(false);
  const lastTriggeredRef = useRef(0);

  const setCheckpointActiveState = (val: boolean) => {
    setCheckpointActive(val);
    checkpointActiveRef.current = val;
  };

  useEffect(() => {
    // Keep Lenis initialized for silky-smooth kinetic scrolling globally
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    // Bind global page-route transition handler
    (window as any).__triggerRouteTransition = (toPath: string, sectorName: string) => {
      if (checkpointActiveRef.current) return;
      
      setCheckpointSector(sectorName);
      setCheckpointActiveState(true);
      setCheckpointProgress(0);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 18) + 14;
        if (currentProgress >= 100) {
          currentProgress = 100;
          setCheckpointProgress(100);
          clearInterval(interval);
          
          setTimeout(() => {
            router.navigate({ to: toPath });
            // Smoothly snap browser window to top on page load
            window.scrollTo(0, 0);

            setTimeout(() => {
              setCheckpointActiveState(false);
            }, 300);
          }, 250);
        } else {
          setCheckpointProgress(currentProgress);
        }
      }, 60);
    };

    // Scroll Gesture Router Transition Triggers (Wheel + Touch)
    const handleWheel = (e: WheelEvent) => {
      if (typeof window === "undefined") return;
      const now = Date.now();
      if (now - lastTriggeredRef.current < 2200) return; // Debounce double transitions
      if (checkpointActiveRef.current) return;

      const currentPath = router.state.location.pathname;
      const currentIndex = routeOrder.findIndex(r => r.path === currentPath);
      if (currentIndex === -1) return;

      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      
      const isAtBottom = scrollY + winHeight >= docHeight - 8;
      const isAtTop = scrollY <= 8;

      // Scroll Down at bottom -> Next Page
      if (e.deltaY > 25 && isAtBottom) {
        if (currentIndex < routeOrder.length - 1) {
          const nextRoute = routeOrder[currentIndex + 1];
          lastTriggeredRef.current = now;
          if ((window as any).__triggerRouteTransition) {
            (window as any).__triggerRouteTransition(nextRoute.path, nextRoute.sector);
          }
        }
      }

      // Scroll Up at top -> Previous Page
      if (e.deltaY < -25 && isAtTop) {
        if (currentIndex > 0) {
          const prevRoute = routeOrder[currentIndex - 1];
          lastTriggeredRef.current = now;
          if ((window as any).__triggerRouteTransition) {
            (window as any).__triggerRouteTransition(prevRoute.path, prevRoute.sector);
          }
        }
      }
    };

    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY || 0;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (typeof window === "undefined") return;
      const now = Date.now();
      if (now - lastTriggeredRef.current < 2200) return;
      if (checkpointActiveRef.current) return;

      const currentPath = router.state.location.pathname;
      const currentIndex = routeOrder.findIndex(r => r.path === currentPath);
      if (currentIndex === -1) return;

      const touchEndY = e.changedTouches[0]?.clientY || 0;
      const diffY = touchStartY - touchEndY; // Positive means swipe up (scroll down gesture)

      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      const isAtBottom = scrollY + winHeight >= docHeight - 12;
      const isAtTop = scrollY <= 12;

      if (Math.abs(diffY) > 50) {
        // Swipe Up (Scroll Down Attempt) -> Next Page
        if (diffY > 0 && isAtBottom) {
          if (currentIndex < routeOrder.length - 1) {
            const nextRoute = routeOrder[currentIndex + 1];
            lastTriggeredRef.current = now;
            if ((window as any).__triggerRouteTransition) {
              (window as any).__triggerRouteTransition(nextRoute.path, nextRoute.sector);
            }
          }
        }
        
        // Swipe Down (Scroll Up Attempt) -> Previous Page
        if (diffY < 0 && isAtTop) {
          if (currentIndex > 0) {
            const prevRoute = routeOrder[currentIndex - 1];
            lastTriggeredRef.current = now;
            if ((window as any).__triggerRouteTransition) {
              (window as any).__triggerRouteTransition(prevRoute.path, prevRoute.sector);
            }
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(reqId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      delete (window as any).__triggerRouteTransition;
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Outlet />

      {/* 🚀 SCREEN-EDGE HOLOGRAPHIC GLOW FRAME TRANSITION (ZERO CLUTTER, PURE VISCERAL BORDER GLOW) */}
      <AnimatePresence>
        {checkpointActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] pointer-events-none"
          >
            {/* Pulsing screen-edge glowing laser borders */}
            <div 
              className="absolute inset-0 border-[5px] border-cyan-400 shadow-[inset_0_0_60px_rgba(34,211,238,0.5),0_0_30px_rgba(34,211,238,0.3)]"
              style={{
                animation: "border-pulse 1.2s ease-in-out infinite alternate"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}




