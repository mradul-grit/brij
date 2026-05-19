import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/data";

// ─── Container ────────────────────────────────────────────────────────────────
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

// ─── GoldText ─────────────────────────────────────────────────────────────────
export function GoldText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn("text-gradient-gold", className)}
      style={{
        background: "linear-gradient(135deg,#D4AF37,#FF9933)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}
export function SectionHeader({
  eyebrow, title, highlight, description,
  align = "center", dark = false, className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(align === "center" ? "text-center" : "text-left", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <p className="text-[#FF9933] tracking-[0.25em] uppercase text-xs font-semibold mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-bold leading-tight",
          dark ? "text-white" : "text-[#1C1C1E]",
        )}
        style={{ fontFamily: "Georgia, serif" }}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <GoldText>{highlight}</GoldText>
          </>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 leading-relaxed",
            dark ? "text-white/50" : "text-[#1C1C1E]/55",
            align === "center" && "max-w-2xl mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

// ─── PageHero ─────────────────────────────────────────────────────────────────
interface PageHeroProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  glowPos?: string;
  children?: ReactNode;
}
export function PageHero({
  eyebrow, title, highlight, description,
  glowPos = "50% 80%", children,
}: PageHeroProps) {
  return (
    <section
      className="pt-24 pb-14 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#1C1C1E 0%,#2C2C2E 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle at ${glowPos}, #D4AF37 0%, transparent 55%)` }}
      />
      <Container className="relative z-10 text-center">
        {eyebrow && (
          <motion.p
            className="text-[#FF9933] tracking-[0.25em] uppercase text-xs font-semibold mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          className="text-4xl sm:text-6xl font-bold text-white mb-4"
          style={{ fontFamily: "Georgia, serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
          {highlight && (
            <>
              {" "}
              <GoldText>{highlight}</GoldText>
            </>
          )}
        </motion.h1>
        {description && (
          <motion.p
            className="text-white/50 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {children}
          </motion.div>
        )}
      </Container>
    </section>
  );
}

// ─── FadeUp ───────────────────────────────────────────────────────────────────
interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  margin?: string;
}
export function FadeUp({
  children, delay = 0, className, once = true, margin = "-40px",
}: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── GoldButton ───────────────────────────────────────────────────────────────
const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
  </svg>
);

type GoldButtonSize = "sm" | "md" | "lg";
interface GoldButtonProps {
  href?: string;
  type?: "button" | "submit";
  children: ReactNode;
  className?: string;
  size?: GoldButtonSize;
  external?: boolean;
  showWhatsappIcon?: boolean;
  onClick?: () => void;
}
const BTN_SIZE: Record<GoldButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-8 py-3.5 text-sm",
  lg: "px-10 py-4 text-base",
};
export function GoldButton({
  href, type = "button", children, className, size = "md",
  external = false, showWhatsappIcon = false, onClick,
}: GoldButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold text-[#1C1C1E] gradient-gold transition-all",
    BTN_SIZE[size],
    className,
  );
  const motionProps = {
    whileHover: { scale: 1.04, boxShadow: "0 0 45px rgba(212,175,55,0.55)" },
    whileTap: { scale: 0.97 },
    style: { boxShadow: "0 0 25px rgba(212,175,55,0.3)" } as React.CSSProperties,
  };
  if (href) {
    return (
      <motion.a
        href={href}
        className={base}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
        {showWhatsappIcon && WHATSAPP_ICON}
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} className={base} onClick={onClick} {...motionProps}>
      {showWhatsappIcon && WHATSAPP_ICON}
      {children}
    </motion.button>
  );
}

// ─── StatBar ──────────────────────────────────────────────────────────────────
interface Stat { value: string; label: string }
interface StatBarProps {
  stats: Stat[];
  dark?: boolean;
  className?: string;
}
export function StatBar({ stats, dark = false, className }: StatBarProps) {
  return (
    <FadeUp className={cn("grid gap-6", `grid-cols-${Math.min(stats.length, 4)}`, className)}>
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="text-3xl font-bold text-[#D4AF37]">{s.value}</p>
          <p className={cn("text-xs mt-1", dark ? "text-white/40" : "text-[#1C1C1E]/50")}>
            {s.label}
          </p>
        </div>
      ))}
    </FadeUp>
  );
}

// ─── SectionWrapper ───────────────────────────────────────────────────────────
interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  py?: string;
  style?: React.CSSProperties;
  id?: string;
}
export function SectionWrapper({
  children, className, py = "py-16 lg:py-20", style, id,
}: SectionWrapperProps) {
  return (
    <section className={cn(py, "relative", className)} style={style} id={id}>
      {children}
    </section>
  );
}

// ─── PageCTA ──────────────────────────────────────────────────────────────────
interface PageCTAProps {
  title: string;
  description?: string;
  buttonText?: string;
  href?: string;
}
export function PageCTA({
  title,
  description = "Let's plan your perfect Vrindavan pilgrimage together — WhatsApp us and we'll get back in minutes.",
  buttonText = "Plan My Vrindavan Trip",
  href = WHATSAPP_URL,
}: PageCTAProps) {
  return (
    <SectionWrapper
      py="py-16"
      style={{ background: "linear-gradient(135deg,#1C1C1E 0%,#2C1A00 60%,#1C1C1E 100%)" }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ background: "radial-gradient(circle at 50% 50%,#D4AF37 0%,transparent 60%)" }}
      />
      <Container className="relative z-10 text-center">
        <SectionHeader
          title={title}
          dark
          description={description}
          className="mb-8"
        />
        <GoldButton href={href} external size="lg" showWhatsappIcon>
          {buttonText}
        </GoldButton>
      </Container>
    </SectionWrapper>
  );
}

// ─── GoldDivider ─────────────────────────────────────────────────────────────
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px rounded-full", className)}
      style={{ background: "linear-gradient(90deg,transparent,#D4AF37,transparent)" }}
    />
  );
}

// ─── PageLoader ───────────────────────────────────────────────────────────────
// ─── PageLoader ───────────────────────────────────────────────────────────────
export function PageLoader() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{
        background: `
          radial-gradient(circle at top, rgba(255,255,255,0.5), transparent 35%),
          linear-gradient(135deg, #FFFDF8 0%, #F7EFE2 50%, #EADFCF 100%)
        `,
      }}
    >
      <motion.img
        src="/logo_nobag.png"
        alt="My Vrindavan Tours"
        className="w-56 sm:w-64 object-contain drop-shadow-[0_0_35px_rgba(212,175,55,0.28)]"
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
<motion.div
  className="h-[3px] w-40 rounded-full overflow-hidden"
  style={{
    background:
      "linear-gradient(90deg, rgba(140,106,26,0), rgba(140,106,26,0.25), rgba(140,106,26,0))",
  }}
>
  <motion.div
    className="h-full w-full rounded-full"
    style={{
      background:
        "linear-gradient(90deg, transparent, #A67C2E, #D4AF37, #A67C2E, transparent)",
      boxShadow: "0 0 18px rgba(166,124,46,0.45)",
    }}
    animate={{
      x: ["-40%", "40%", "-40%"],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</motion.div>

      <p className="text-[#8B7355]/70 text-xs tracking-widest uppercase">
        Loading
      </p>
    </div>
  );
}