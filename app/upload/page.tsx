"use client";

import { useEffect, useState } from "react";
import { CloudUpload, FileText, Loader2, CheckCircle2 } from "lucide-react";

type Stage = "idle" | "ocr" | "translate" | "verify" | "done";

const stages: { key: Stage; label: string }[] = [
  { key: "ocr", label: "OCR Scanning..." },
  { key: "translate", label: "Translating Japanese..." },
  { key: "verify", label: "Verifying VIN & Consistency..." }
];

export default function UploadPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (stage === "idle" || stage === "done") return;
    const timeouts: NodeJS.Timeout[] = [];
    const nextStages: Stage[] =
      stage === "ocr" ? ["translate", "verify", "done"] : [];

    nextStages.forEach((s, index) => {
      const t = setTimeout(() => {
        setStage(s);
      }, (index + 1) * 1000);
      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [stage]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setStage("ocr");
  };

  const progress =
    stage === "idle"
      ? 0
      : stage === "ocr"
      ? 30
      : stage === "translate"
      ? 60
      : stage === "verify"
      ? 90
      : 100;

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          AI Document Processing (Prototype)
        </div>
        <h1 className="text-lg font-semibold text-slate-900 md:text-xl">
          Upload Japanese Export Certificate or Auction Sheet
        </h1>
        <p className="text-xs text-slate-500 md:text-sm">
          Simulated OCR, translation and VIN verification to prove automation
          and data quality controls.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)]">
        <div className="space-y-4">
          <label
            htmlFor="file-upload"
            className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/70 px-4 py-10 text-center text-sm text-slate-600 transition hover:border-emerald-500 hover:bg-emerald-50/40"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-emerald-300">
              <CloudUpload className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-slate-900">
                Drag &amp; drop a document, or click to browse
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Export Certificate (日本語), Auction Sheet or Bill of Lading
              </div>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={onFileChange}
            />
          </label>

          {stage !== "idle" && (
            <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {stage !== "done" ? (
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                  <span className="font-medium text-slate-800">
                    {stage === "done"
                      ? "AI extraction completed"
                      : stages.find((s) => s.key === stage)?.label}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  {progress}% complete
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <ul className="space-y-1 text-[11px] text-slate-500">
                <li>
                  • OCR: extracting VIN, mileage and grade from Japanese layout.
                </li>
                <li>
                  • NLP: translating fields to structured English labels.
                </li>
                <li>
                  • Rules: cross-checking against target vehicle profile.
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-emerald-300">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Extracted Vehicle Snapshot
                </div>
                <div className="text-xs text-slate-500">
                  Pre-filled from uploaded document – editable for corrections.
                </div>
              </div>
            </div>
            <div className="grid gap-3 text-xs md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Chassis / VIN
                </label>
                <input
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] font-mono text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  defaultValue="JTNAX3AH7N100001"
                />
                <p className="text-[10px] text-emerald-600">
                  98% confidence • Matches auction record.
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Auction Grade
                </label>
                <input
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  defaultValue="4.5"
                />
                <p className="text-[10px] text-slate-500">
                  Extracted from handwritten auction sheet.
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Mileage (km)
                </label>
                <input
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  defaultValue="32,450"
                />
                <p className="text-[10px] text-emerald-600">
                  94% confidence • No anomaly vs. Japan history.
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Exporter Name
                </label>
                <input
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-[11px] text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  defaultValue="Nagoya Prime Exports Co."
                />
                <p className="text-[10px] text-slate-500">
                  Mapped from Japanese corporate name.
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-md bg-emerald-50 px-3 py-2">
              <div className="text-[11px] text-emerald-800">
                Prototype AI pipeline is simulated – behaviour mirrors intended
                production flow.
              </div>
              <CheckCircle2 className="hidden h-4 w-4 text-emerald-600 md:block" />
            </div>
          </div>

          {fileName && (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
              <span className="font-medium">Selected file:</span> {fileName}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

