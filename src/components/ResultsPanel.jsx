import { SAMPLE_RESULT } from "../lib/sampleResult.js";
import Button from "./Button.jsx";
import ScoreCard from "./ScoreCard.jsx";
import SectionHeading from "./SectionHeading.jsx";
import WrittenReport from "./WrittenReport.jsx";

// The right-hand column. It shows the live result, or the sample report if the visitor asked for it.
// It only reads the analysis state it is given; it never runs one.
export default function ResultsPanel({ analysis, showExample, onToggleExample }) {
  const { status, result, report, reportError, reportLoading } = analysis;
  const idle = status !== "loading" && status !== "done";

  return (
    <div className="space-y-6 md:sticky md:top-8">
      <SectionHeading>2. Your results</SectionHeading>

      {status === "loading" && <p className="text-muted">Reading your resume and scoring it…</p>}

      {status === "done" && result && (
        <>
          <ScoreCard result={result} />
          <WrittenReport report={report} reportError={reportError} reportLoading={reportLoading} />
        </>
      )}

      {idle && !showExample && (
        <p className="text-muted">Add your resume and a job description, then compare them to see your scorecard here.</p>
      )}

      {status !== "done" && showExample && (
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-widest text-accent">Example report</p>
            <p className="text-sm text-muted">This is a sample, not a real resume.</p>
          </div>
          <ScoreCard result={SAMPLE_RESULT} />
        </div>
      )}

      {idle && (
        <Button onClick={onToggleExample}>
          {showExample ? "Hide example report" : "Show an example report"}
        </Button>
      )}
    </div>
  );
}
