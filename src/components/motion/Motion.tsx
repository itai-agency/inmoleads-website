import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type Variants,
  type HTMLMotionProps,
  type MotionValue,
} from "framer-motion";
import {
  useRef,
  useEffect,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from "react";

/* ------------------------------------------------------------------ */
/*  Easing & shared variants                                           */
/* ------------------------------------------------------------------ */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const blurUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

export const staggerContainer = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "variants">;

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
  amount = 0.25,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger                                                            */
/* ------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  stagger = 0.12,
  delay = 0,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variants = fadeUp,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
} & Omit<HTMLMotionProps<"div">, "variants">) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={variants} {...rest}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  AnimatedWords — kinetic word-by-word headline reveal               */
/* ------------------------------------------------------------------ */
export function AnimatedWords({
  text,
  className,
  wordClassName,
  delay = 0,
  highlight = [],
  highlightClassName = "text-[#F26120]",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  highlight?: number[];
  highlightClassName?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span
            key={i}
            className={highlight.includes(i) ? highlightClassName : undefined}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      variants={staggerContainer(0.08, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="mr-[0.25em] inline-block overflow-hidden align-bottom last:mr-0"
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""} ${
              highlight.includes(i) ? highlightClassName : ""
            }`}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.7, ease: EASE_OUT },
              },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Parallax — continuous scroll-linked translate                      */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: ReactNode;
  /** px of total drift across the viewport; +down, -up */
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Hook variant of parallax for custom transforms */
export function useParallax(speed = 60): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return { ref, y, progress: scrollYProgress };
}

/* ------------------------------------------------------------------ */
/*  Marquee — infinite, seamless, pause-on-hover                       */
/* ------------------------------------------------------------------ */
export function Marquee({
  children,
  reverse = false,
  speed = 32,
  className,
  itemClassName,
}: {
  children: ReactNode;
  reverse?: boolean;
  /** seconds for one full loop */
  speed?: number;
  className?: string;
  itemClassName?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`flex overflow-hidden ${className ?? ""}`}>
        <div className={`flex shrink-0 ${itemClassName ?? ""}`}>{children}</div>
      </div>
    );
  }

  return (
    <div className={`flex overflow-hidden ${className ?? ""}`}>
      <div
        className={`flex shrink-0 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } ${itemClassName ?? ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={`flex shrink-0 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } ${itemClassName ?? ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TiltCard — 3D tilt following the cursor                            */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className,
  max = 10,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const gx = useSpring(useMotionValue(50), { stiffness: 200, damping: 20 });
  const gy = useSpring(useMotionValue(50), { stiffness: 200, damping: 20 });
  const glareBg = useTransform(
    [gx, gy] as [MotionValue<number>, MotionValue<number>],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.28), transparent 55%)`
  );

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
      }}
      className={`group relative ${className ?? ""}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MagneticButton — element gets attracted to the cursor              */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 15 });

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  SpotlightCursor — soft light following the mouse over a section    */
/* ------------------------------------------------------------------ */
export function SpotlightCursor({
  color = "rgba(242,97,32,0.18)",
  size = 480,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 25 });
  const y = useSpring(useMotionValue(-1000), { stiffness: 120, damping: 25 });
  const ref = useRef<HTMLDivElement>(null);
  const bg = useTransform(
    [x, y] as [MotionValue<number>, MotionValue<number>],
    ([lx, ly]: number[]) =>
      `radial-gradient(${size}px circle at ${lx}px ${ly}px, ${color}, transparent 70%)`
  );

  useEffect(() => {
    if (reduce) return;
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const onMove = (e: globalThis.MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 ${className ?? ""}`}
      style={{ background: bg }}
    />
  );
}

export { motion, useReducedMotion, useScroll, useTransform };
