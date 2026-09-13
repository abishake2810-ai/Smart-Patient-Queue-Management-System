import React from 'react';
import { AlertCircle, Sparkles } from 'lucide-react';

interface ResponsibleAIDisclaimerProps {
  compact?: boolean;
}

export const ResponsibleAIDisclaimer: React.FC<ResponsibleAIDisclaimerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div id="ai-disclaimer-compact" className="flex items-center gap-2 px-3 py-1.5 bg-amber-50/80 border border-amber-200/80 rounded-lg text-xs text-amber-900">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span className="font-medium">AI-generated approximate estimate</span>
        <span className="text-amber-700/80 hidden sm:inline">• Academic prototype (simulated data)</span>
      </div>
    );
  }

  return (
    <div id="ai-disclaimer-full" className="bg-gradient-to-r from-teal-50/80 via-blue-50/60 to-slate-50 border border-teal-200/80 rounded-xl p-4 shadow-xs text-slate-700 text-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-teal-100/80 text-teal-800 rounded-lg shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-900 text-sm">Responsible AI & Academic Prototype Disclaimer</span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-teal-100 text-teal-800">
              AI-generated approximate estimate
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            AI is used only as a supporting technology for approximate waiting-time estimation. The problem was identified through real-world observation. This prototype uses simulated data and does not provide medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};
