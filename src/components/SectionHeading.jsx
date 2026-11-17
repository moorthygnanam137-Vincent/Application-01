// Reusable bold heading for a step or panel, e.g. "1. Your resume".
export default function SectionHeading({ children }) {
  return <p className="font-display text-lg font-semibold">{children}</p>;
}
