import { useState } from "react";
import Button from "./components/Button.jsx";
import DropZone from "./components/DropZone.jsx";
import History from "./components/History.jsx";
import JobDescriptionInput from "./components/JobDescriptionInput.jsx";
import ResultsPanel from "./components/ResultsPanel.jsx";
import SectionHeading from "./components/SectionHeading.jsx";
import TabBar from "./components/TabBar.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";
import { useAnalysis } from "./hooks/useAnalysis.js";
import { useAnalysisForm } from "./hooks/useAnalysisForm.js";
import { useTheme } from "./hooks/useTheme.js";
import { useToggle } from "./hooks/useToggle.js";

const TABS = [
  { id: "compare", label: "Compare" },
  { id: "history", label: "History" },
];

// The page composes components and hooks. Each hook owns one job:
// useAnalysis runs the scoring, useAnalysisForm checks the inputs, useToggle and useTheme hold small UI state.
export default function App() {
  const analysis = useAnalysis();
  const form = useAnalysisForm(analysis.run);
  const [showExample, toggleExample] = useToggle();
  const { theme, toggle } = useTheme();
  const [tab, setTab] = useState("compare");

  const message = form.inputError || (analysis.status === "error" ? analysis.error : "");

  return (
    <main className="min-h-screen bg-page text-ink">
      <div className="max-w-5xl mx-auto px-6 py-8 md:py-12 space-y-16">
        <div className="flex items-center justify-between border-b-2 border-ink pb-4">
          <p className="font-display text-xl font-bold tracking-tight">Resume Parser</p>
          <ThemeToggle theme={theme} onToggle={toggle} />
        </div>

        <header className="space-y-6 max-w-3xl">
          <h1 className="font-display font-bold text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] tracking-tight [font-stretch:75%]">
            See how well your resume fits the job
          </h1>
          <p className="text-lg leading-relaxed text-muted max-w-[65ch]">
            Drop in your resume (PDF or Word) and paste a job description. You get a scorecard showing
            what matches, what is missing, and where your resume is strong or weak.
          </p>
        </header>

        <TabBar tabs={TABS} active={tab} onChange={setTab} />

        {tab === "compare" && (
          <section className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start">
            {/* Left: the inputs */}
            <div className="space-y-10">
              <div className="space-y-3">
                <SectionHeading>1. Your resume</SectionHeading>
                <DropZone file={form.file} onFile={form.setFile} />
              </div>

              <JobDescriptionInput value={form.jobDescription} onChange={form.setJobDescription} />

              <div className="flex flex-col items-start gap-3">
                <Button onClick={form.submit} loading={analysis.isLoading}>
                  Compare resume to job
                </Button>
                <p className="text-sm text-accent-ink min-h-[1.25rem]">{message}</p>
              </div>
            </div>

            {/* Right: the results. Nothing is shown here until a run starts or the example is requested. */}
            <ResultsPanel analysis={analysis} showExample={showExample} onToggleExample={toggleExample} />
          </section>
        )}

        {tab === "history" && (
          <section className="space-y-4">
            <SectionHeading>Previous runs</SectionHeading>
            <History refreshKey={analysis.report} />
          </section>
        )}
      </div>
    </main>
  );
}
