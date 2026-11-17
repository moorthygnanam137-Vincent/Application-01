import SectionHeading from "./SectionHeading.jsx";

// The server's written report, with its own loading and error states.
// It can fail on its own; the scorecard above it is still shown.
export default function WrittenReport({ report, reportError, reportLoading }) {
  return (
    <div className="space-y-3 border-t-2 border-ink pt-6">
      <SectionHeading>Written fit report</SectionHeading>
      {reportLoading && <p className="text-muted">Writing your report…</p>}
      {reportError && <p className="text-accent-ink">{reportError}</p>}
      {report && <pre className="whitespace-pre-wrap font-sans leading-relaxed text-ink">{report}</pre>}
    </div>
  );
}
