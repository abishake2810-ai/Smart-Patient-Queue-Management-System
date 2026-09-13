import React, { useState } from 'react';
import { useQueue } from '../context/QueueContext';
import { Play, Pause, RotateCcw, FastForward, UserCheck, BellRing, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';

export const DemoControlBar: React.FC = () => {
  const {
    currentServingTokenNum,
    currentServingTokenStr,
    patient,
    callNextToken,
    updateCurrentServingToken,
    resetDemoQueue,
    autoSimulation,
    setAutoSimulation,
    autoSimulationCountdown,
    soundEnabled,
    setSoundEnabled,
    currentView,
    setCurrentView,
    isStaffLoggedIn,
    loginAsStaff,
    loginAsPatient,
  } = useQueue();

  const [collapsed, setCollapsed] = useState(false);

  const isStaffView = currentView.startsWith('staff-') || currentView === 'queue-management';

  return (
    <div id="demo-controller-bar" className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Left: Academic Project Tag & Current Token Ticker */}
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 font-semibold border border-teal-500/30 uppercase tracking-wide text-[10px]">
              Academic Demo Control
            </span>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-slate-400">Serving:</span>
              <span className="bg-teal-600 text-white font-mono px-2 py-0.5 rounded font-bold shadow-xs">
                {currentServingTokenStr}
              </span>
              <span className="text-slate-400 ml-1">| Target:</span>
              <span className="bg-blue-900/60 text-blue-200 font-mono px-2 py-0.5 rounded">
                {patient.tokenNumber} ({patient.name})
              </span>
            </div>
          </div>

          {/* Right: Quick Demo Scenarios & Simulation Controls */}
          <div className="flex items-center gap-2">
            <button
              id="btn-toggle-demo-collapse"
              onClick={() => setCollapsed(!collapsed)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors md:hidden"
              title="Toggle demo controls"
            >
              {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            <div className={`flex flex-wrap items-center gap-1.5 ${collapsed ? 'hidden md:flex' : 'flex'}`}>
              {/* Call Next Step */}
              <button
                id="btn-demo-next-patient"
                onClick={callNextToken}
                className="flex items-center gap-1 px-2.5 py-1 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-medium rounded transition-colors shadow-xs"
                title="Advance queue by 1 token"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Call Next</span>
              </button>

              {/* Jump to Turn Approaching (A-045) */}
              <button
                id="btn-demo-approaching"
                onClick={() => updateCurrentServingToken(45)}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors font-medium ${
                  currentServingTokenNum === 45
                    ? 'bg-amber-500 text-slate-900 font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-300'
                }`}
                title="Jump to A-045 (2 ahead notification trigger)"
              >
                <BellRing className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Trigger</span> Approaching (A-45)
              </button>

              {/* Jump to Your Turn (A-047) */}
              <button
                id="btn-demo-your-turn"
                onClick={() => updateCurrentServingToken(47)}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors font-medium ${
                  currentServingTokenNum === 47
                    ? 'bg-emerald-500 text-slate-900 font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-emerald-300'
                }`}
                title="Jump to A-047 (Dhanu Sri turn)"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Your Turn (A-47)</span>
              </button>

              {/* Auto Simulation Toggle */}
              <button
                id="btn-demo-auto-simulation"
                onClick={() => setAutoSimulation(!autoSimulation)}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors font-medium ${
                  autoSimulation
                    ? 'bg-indigo-600 text-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
                title="Simulate automatic queue progression every 12 seconds"
              >
                {autoSimulation ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Auto ({autoSimulationCountdown}s)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Auto-Sim</span>
                  </>
                )}
              </button>

              {/* Sound toggle */}
              <button
                id="btn-demo-sound-toggle"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                title={soundEnabled ? 'Hospital Chime Sound: ON' : 'Hospital Chime Sound: OFF'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-teal-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
              </button>

              {/* Reset to Spec Baseline */}
              <button
                id="btn-demo-reset"
                onClick={resetDemoQueue}
                className="flex items-center gap-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors"
                title="Reset queue to A-039 serving & A-047 waiting (spec initial state)"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden lg:inline">Reset</span>
              </button>

              {/* Role Switcher Pill */}
              <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block"></div>

              {isStaffView ? (
                <button
                  id="btn-switch-to-patient"
                  onClick={() => {
                    loginAsPatient();
                    setCurrentView('patient-dashboard');
                  }}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded transition-colors shadow-xs"
                >
                  View as Patient
                </button>
              ) : (
                <button
                  id="btn-switch-to-staff"
                  onClick={() => {
                    if (!isStaffLoggedIn) loginAsStaff();
                    setCurrentView('staff-dashboard');
                  }}
                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded transition-colors shadow-xs"
                >
                  View as Staff / Doctor
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
