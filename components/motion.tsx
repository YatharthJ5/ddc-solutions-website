"use client";
import { useRef } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "motion/react";
export const Motion = ({ children }: { children: React.ReactNode }) => <MotionConfig reducedMotion="user">{children}</MotionConfig>;
const ease = [0.22, 1, 0.36, 1] as const;
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay, ease }}>{children}</motion.div>;
}
export function SplitText({ text, as: Tag = "h2", className, delay = 0 }: { text: string; as?: "h1" | "h2" | "h3"; className?: string; delay?: number }) {
  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
            <motion.span className="inline-block" initial={{ y: "105%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 0.9, delay: delay + i * 0.045, ease }}>{w}&nbsp;</motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
export function MaskImage({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={`overflow-hidden ${className ?? ""}`} initial={{ clipPath: "inset(0 0 100% 0)" }} whileInView={{ clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-8% 0px" }} transition={{ duration: 1.1, ease }}>
      <motion.div className="h-full w-full" initial={{ scale: 1.12 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }}>{children}</motion.div>
    </motion.div>
  );
}
export function Parallax({ children, amount = 30, className }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return <div ref={ref} className={className}><motion.div style={{ y }}>{children}</motion.div></div>;
}
