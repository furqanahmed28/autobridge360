"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import type { ProvenanceEvent } from "../src/lib/mockData";
import { FileText, MapPin, X } from "lucide-react";

interface TimelineProps {
  events: ProvenanceEvent[];
}

export const Timeline = ({ events }: TimelineProps) => {
  const [selected, setSelected] = useState<ProvenanceEvent | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      height: "100%",
      transition: { duration: 0.8, ease: "easeInOut" }
    });
  }, [controls]);

  const sorted = [...events].sort(
    (a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="relative flex gap-6">
      <div className="relative flex-1">
        <div className="relative ml-4">
          <motion.div
            initial={{ height: 0 }}
            animate={controls}
            className="absolute left-[7px] top-0 w-[2px] bg-gradient-to-b from-emerald-400 via-sky-400 to-slate-300"
          />
          <ul className="space-y-6">
            {sorted.map((event, index) => {
              const isCompleted = event.status === "Completed";
              const isPending = event.status === "Pending";
              return (
                <li key={event.id} className="relative flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSelected(event)}
                    className="group flex flex-1 items-start gap-4 rounded-lg border border-slate-200 bg-white/90 px-4 py-3 text-left shadow-sm transition hover:border-emerald-500 hover:shadow-md"
                  >
                    <div className="relative">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                          isCompleted
                            ? "border-emerald-500 bg-emerald-500"
                            : isPending
                            ? "border-slate-300 bg-slate-100"
                            : "border-sky-400 bg-sky-400"
                        }`}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                      <div className="absolute -left-[11px] top-[7px] h-0.5 w-3 bg-slate-200 group-hover:bg-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900">
                          {index + 1}. {event.title}
                        </div>
                        <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                          {event.status}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                        <span>
                          {new Date(event.timestamp).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                        {event.documentUrl && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            <FileText className="h-3 w-3" />
                            Linked Document
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {selected && (
        <motion.aside
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          className="hidden w-72 shrink-0 rounded-xl border border-slate-200 bg-white p-4 shadow-lg lg:block"
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Event Detail
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {selected.title}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Timestamp
              </div>
              <div>
                {new Date(selected.timestamp).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Location
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{selected.location}</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Status
              </div>
              <div className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                {selected.status}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Document
              </div>
              {selected.documentUrl ? (
                <div className="mt-1 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">
                  <FileText className="h-4 w-4 text-slate-500" />
                  <div>
                    <div className="font-medium">
                      Mock PDF • {selected.title}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Prototype document viewer – demonstrates linkage, not
                      actual content.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-1 rounded-md bg-slate-50 p-2 text-[11px] text-slate-500">
                  No document attached for this event in the prototype dataset.
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      )}
    </div>
  );
};

