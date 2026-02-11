interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-2xl mb-16 ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {label && (
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold font-jakarta">{title}</h2>
      {description && (
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
