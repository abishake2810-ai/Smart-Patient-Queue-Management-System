import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Bell,
  CheckCheck,
  Trash2,
  AlertTriangle,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
  PlusCircle,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    soundEnabled,
    setSoundEnabled,
    triggerChime,
    currentServingTokenStr,
    patient,
  } = useQueue();

  const [filter, setFilter] = useState<'all' | 'unread' | 'approaching'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'approaching') return n.type === 'approaching' || n.type === 'serving';
    return true;
  });

  const handleTestTrigger = () => {
    triggerChime('approaching');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-100">
              Queue Notifications
            </span>
            <span className="text-xs text-slate-400">• Simulated Alerts</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Patient Turn & Queue Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Automated notifications keep patients informed when their turn approaches, reducing anxiety and hallway congestion.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-teal-50 border-teal-200 text-teal-800'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
            title="Toggle Notification Chime"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-teal-600" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Chime ON' : 'Muted'}</span>
          </button>

          <button
            onClick={markAllNotificationsRead}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors flex items-center gap-1.5"
            title="Mark all read"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mark All Read</span>
          </button>

          <button
            onClick={clearNotifications}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-200 text-slate-600 hover:text-rose-700 text-xs transition-colors"
            title="Clear all alerts"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-medium text-slate-600">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'all' ? 'bg-teal-600 text-white font-semibold shadow-xs' : 'hover:bg-slate-100'
          }`}
        >
          All Alerts ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'unread' ? 'bg-teal-600 text-white font-semibold shadow-xs' : 'hover:bg-slate-100'
          }`}
        >
          Unread ({notifications.filter((n) => !n.read).length})
        </button>
        <button
          onClick={() => setFilter('approaching')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            filter === 'approaching' ? 'bg-teal-600 text-white font-semibold shadow-xs' : 'hover:bg-slate-100'
          }`}
        >
          Turn & Approaching
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
            <Bell className="w-8 h-8 text-slate-300 mx-auto" />
            <div className="text-sm font-semibold text-slate-700">No alerts found</div>
            <p className="text-xs text-slate-400">
              You will receive simulated notifications here as tokens advance in the OPD.
            </p>
          </div>
        ) : (
          filteredNotifications.map((n) => {
            const isServing = n.type === 'serving';
            const isApproaching = n.type === 'approaching';

            return (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                  !n.read
                    ? isServing
                      ? 'bg-emerald-50/90 border-emerald-300 shadow-sm'
                      : isApproaching
                      ? 'bg-amber-50/90 border-amber-300 shadow-sm'
                      : 'bg-teal-50/70 border-teal-200 shadow-xs'
                    : 'bg-white border-slate-200 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isServing
                          ? 'bg-emerald-600 text-white'
                          : isApproaching
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{n.title}</span>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                        )}
                        {n.token && (
                          <span className="px-2 py-0.5 rounded bg-slate-200/80 font-mono text-[10px] font-semibold text-slate-800">
                            {n.token}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {n.message}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono shrink-0">
                    {n.timestamp}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* College Demo Helper Box with Sample Notifications */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Sample Notification Cases (Demonstration)</span>
          </h3>
          <button
            onClick={handleTestTrigger}
            className="text-xs text-teal-700 font-semibold hover:underline"
          >
            Play Test Chime
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <div className="font-semibold text-slate-800 mb-1">1. Turn Approaching</div>
            <div className="text-slate-500 text-[11px]">"Your token is approaching."</div>
            <div className="text-slate-400 text-[10px] mt-1">Triggers when 2 patients remain</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <div className="font-semibold text-slate-800 mb-1">2. Token Progress</div>
            <div className="text-slate-500 text-[11px]">"Current token is A-045."</div>
            <div className="text-slate-400 text-[10px] mt-1">Broadcasts OPD progression</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <div className="font-semibold text-slate-800 mb-1">3. Consultation Ready</div>
            <div className="text-slate-500 text-[11px]">"Please be ready near consultation area."</div>
            <div className="text-slate-400 text-[10px] mt-1">Directs patient to Cabin 3</div>
          </div>
        </div>
      </div>

      <ResponsibleAIDisclaimer />
    </div>
  );
};
