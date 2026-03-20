export const getButtonStyles = (style?: string): string => {
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

  switch (style) {
    case "btn--sun":
      // Primary CTA — warm terracotta → amber, rectangular with slight rounding
      return `${base} rounded-sm bg-linear-to-r from-primary to-accent text-primary-foreground hover:opacity-90 hover:scale-[1.02] shadow-md hover:shadow-lg h-11 px-7 text-sm tracking-wide`;

    case "btn--outline-grey":
      // Secondary — warm border, parchment feel
      return `${base} rounded-sm bg-transparent text-foreground border border-border hover:border-accent/60 hover:text-accent h-11 px-7 text-sm tracking-wide`;

    case "btn--plain":
      return "inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent underline-offset-4 hover:underline transition-colors";

    default:
      return `${base} rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-7 text-sm`;
  }
};
