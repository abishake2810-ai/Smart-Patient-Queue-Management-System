import React, { useState } from 'react';
import { useQueue, DEMO_DEPARTMENTS, DEMO_DOCTORS } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Ticket,
  Clock,
  User,
  Stethoscope,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ArrowRight,
  Printer,
  Sparkles,
  Layers,
} from 'lucide-react';

export const GetTokenPage: React.FC = () => {
  const { generateToken, setCurrentView, currentServingTokenStr } = useQueue();

  const [patientName, setPatientName] = useState('Dhanu Sri');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [department, setDepartment] = useState('General Medicine');
  const [doctor, setDoctor] = useState('Dr. Priya');
  const [appointmentType, setAppointmentType] = useState('Regular Consultation');

  const [generatedResult, setGeneratedResult] = useState<{
    tokenNumber: string;
    department: string;
    doctor: string;
    currentQueue: string;
    approximateWait: number;
    patientsAhead: number;
  } | null>(null);

  // Filter available doctors for selected department
  const filteredDoctors = DEMO_DOCTORS.filter((d) => d.department === department);

  const handleDepartmentChange = (deptName: string) => {
    setDepartment(deptName);
    const docs = DEMO_DOCTORS.filter((d) => d.department === deptName);
    if (docs.length > 0) {
      setDoctor(docs[0].name);
    } else {
      setDoctor('On-duty Consultant');
    }
  };

  const handleGenerateToken = (e: React.FormEvent) => {
    e.preventDefault();
    const result = generateToken({
      name: patientName,
      phone: mobileNumber,
      department,
      doctor,
      appointmentType,
    });

    setGeneratedResult({
      tokenNumber: result.tokenNumber,
      department,
      doctor,
      currentQueue: currentServingTokenStr,
      approximateWait: result.estimatedMinutes,
      patientsAhead: result.patientsAhead,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
          <Ticket className="w-3.5 h-3.5" />
          <span>OPD Digital Token Kiosk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Get New Patient Token
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Select department and doctor to generate an instant digital consultation token and receive real-time queue notifications.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleGenerateToken} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Patient Name
              </label>
              <div className="relative">
                <input
                  id="input-token-patient-name"
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Mobile Number (for SMS & Turn Alerts)
              </label>
              <input
                id="input-token-patient-phone"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Department Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Department Selection
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_DEPARTMENTS.map((dept) => (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => handleDepartmentChange(dept.name)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      department === dept.name
                        ? 'bg-teal-50 border-teal-500 text-teal-900 font-semibold ring-1 ring-teal-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold flex items-center justify-between">
                      <span>{dept.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                        {dept.code}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {dept.activeDoctors} Doctor{dept.activeDoctors > 1 ? 's' : ''} on duty
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Doctor Selection
              </label>
              <select
                id="select-token-doctor"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 bg-white"
              >
                {filteredDoctors.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} — {doc.cabin} (Avg ~{doc.avgTimePerPatient} min/patient)
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Appointment Type
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Regular Consultation', 'Follow-up', 'Prescription Refill', 'Diagnostic Review'].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      appointmentType === type
                        ? 'bg-teal-50 border-teal-500 text-teal-900 font-medium'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="appointmentType"
                      value={type}
                      checked={appointmentType === type}
                      onChange={() => setAppointmentType(type)}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                id="btn-generate-token-submit"
                type="submit"
                className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Generate Token</span>
              </button>
            </div>
          </form>
        </div>

        {/* Generated Result Card / Preview */}
        <div className="md:col-span-5 space-y-4">
          {generatedResult ? (
            <div className="bg-white rounded-2xl border-2 border-teal-500 p-6 shadow-md text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">
                  Token Generated Successfully
                </span>
                <div className="text-4xl font-extrabold font-mono text-slate-900 mt-2 bg-slate-100 py-3 rounded-xl border border-slate-200 tracking-tight">
                  {generatedResult.tokenNumber}
                </div>
              </div>

              {/* Required result parameters */}
              <div className="bg-slate-50 rounded-xl p-4 text-xs text-left space-y-2 border border-slate-200">
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-800">{generatedResult.department}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-semibold text-slate-800">{generatedResult.doctor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">Current Queue Serving:</span>
                  <span className="font-mono font-bold text-teal-700">{generatedResult.currentQueue}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-500">Patients Ahead:</span>
                  <span className="font-bold text-slate-800">{generatedResult.patientsAhead}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Approximate Waiting Time:</span>
                  <span className="font-bold text-teal-800 font-mono">
                    ~{generatedResult.approximateWait} minutes
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>AI-generated approximate estimate</span>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setCurrentView('live-queue')}
                  className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Track in Live Queue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.print()}
                  className="w-full py-2 px-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Token Receipt</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-200/80 text-slate-500 flex items-center justify-center mx-auto">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="font-bold text-slate-800 text-sm">Instant Token Generation</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tokens are issued in strict sequential order per OPD room. After generation, your waiting position and estimated time will be calculated dynamically.
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-left space-y-1.5">
                <div className="font-semibold text-slate-700">Current General Medicine Status:</div>
                <div className="text-slate-500 text-[11px] flex justify-between">
                  <span>Currently Serving:</span>
                  <span className="font-mono font-bold text-teal-700">{currentServingTokenStr}</span>
                </div>
                <div className="text-slate-500 text-[11px] flex justify-between">
                  <span>Consulting Doctor:</span>
                  <span>Dr. Priya (Cabin 3)</span>
                </div>
              </div>
            </div>
          )}

          <ResponsibleAIDisclaimer />
        </div>
      </div>
    </div>
  );
};
