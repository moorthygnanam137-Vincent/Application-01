import { useState } from "react";
import { MIN_JD_LENGTH } from "../lib/constants.js";

// Custom hook: holds the two inputs (the resume file and the job description) and checks them.
// Only when both pass does it call `run`, the function from useAnalysis that does the work.
export function useAnalysisForm(run) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [inputError, setInputError] = useState("");

  const submit = () => {
    setInputError("");
    if (!file) {
      setInputError("Add your resume first.");
      return;
    }
    if (jobDescription.trim().length < MIN_JD_LENGTH) {
      setInputError("Paste a fuller job description (at least a few sentences).");
      return;
    }
    run(file, jobDescription);
  };

  return { file, setFile, jobDescription, setJobDescription, inputError, submit };
}
