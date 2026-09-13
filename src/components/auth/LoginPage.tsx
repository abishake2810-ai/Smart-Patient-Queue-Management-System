import React, { useState } from 'react';
import { useQueue } from '../../context/QueueContext';
import { DEMO_DEPARTMENTS, DEMO_DOCTORS } from '../../context/QueueContext';
import { ResponsibleAIDisclaimer } from '../ResponsibleAIDisclaimer';
import {
  Activity,
  LogIn,
  User,
  Stethoscope,
  Ticket,
  Sparkles,
  Phone,
  Hash,
  ShieldCheck,
  QrCode,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  Eye,
  EyeOff,
  Building2,
  Calendar,
  KeyRound,
  X,
  ScanLine,
} from 'lucide-react';

interface LoginPageProps {
  defaultTab?: 'patient' | 'staff';
}

export const LoginPage: React.FC<LoginPageProps> = ({ defaultTab = 'patient' }) => {
  const {
    loginAsPatient,
    loginAsStaff,
    generateToken,
    queue,
    currentServingTokenStr,
    currentServingTokenNum,
    setCurrentView,
  } = useQueue();

  const [portalRole, setPortalRole] = useState<'patient' | 'staff'>(defaultTab);

  // Patient Login Form State
  const [patientSubTab, setPatientSubTab] = useState<'login' | 'register' | 'kiosk-scan'>('login');
  const [patientIdInput, setPatientIdInput] = useState('CS-1001');
  const [patientPhoneInput, setPatientPhoneInput] = useState('9876543210');
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [patientError, setPatientError] = useState('');

  // Forgot ID Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // New Patient Registration State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDepartment, setNewDepartment] = useState('General Medicine');
  const [newDoctor, setNewDoctor] = useState('Dr. Priya');
  const [newAppointmentType, setNewAppointmentType] = useState('Regular Consultation');

  // Staff Login Form State
  const [staffId, setStaffId] = useState('ST-402');
  const [staffCabin, setStaffCabin] = useState('Cabin 3 (1st Floor) - Dr. Priya');
  const [staffPassword, setStaffPassword] = useState('hospital2026');
  const [showStaffPassword, setShowStaffPassword] = useState(false);
  const [staffError, setStaffError] = useState('');

  // Kiosk scanner animation state
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Handle Patient Standard Login
  const handlePatientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientIdInput.trim()) {
      setPatientError('Please enter your Patient ID or OPD Token Number.');
      return;
    }
    if (otpMode && otpCode.trim() !== '4721' && otpCode.trim().length !== 4) {
      setPatientError('Invalid demo OTP. Please enter 4721 or click "Autofill Demo OTP".');
      return;
    }

    setPatientError('');
    loginAsPatient(patientIdInput.trim(), undefined, patientPhoneInput.trim());
  };

  // Handle Quick Demo Login
  const handleQuickPatientSelect = (id: string, phone: string) => {
    setPatientIdInput(id);
    setPatientPhoneInput(phone);
    setPatientError('');
    loginAsPatient(id, undefined, phone);
  };

  // Handle New Patient Walk-in Registration
  const handleRegisterNewPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      setPatientError('Please provide both full name and contact number.');
      return;
    }
    setPatientError('');
    generateToken({
      name: newName.trim(),
      phone: newPhone.trim(),
      department: newDepartment,
      doctor: newDoctor,
      appointmentType: newAppointmentType,
    });
    loginAsPatient();
  };

  // Handle Staff Login
  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId.trim()) {
      setStaffError('Please enter your Staff / Clinician ID.');
      return;
    }
    setStaffError('');
    loginAsStaff(staffId.trim());
  };

  // Handle Quick Staff Select
  const handleQuickStaffSelect = (id: string, cabinName: string) => {
    setStaffId(id);
    setStaffCabin(cabinName);
    setStaffError('');
    loginAsStaff(id);
  };

  // Simulate Kiosk QR Scan
  const triggerKioskScan = () => {
    setIsScanning(true);
    setScanSuccess(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      setTimeout(() => {
        loginAsPatient('CS-1001', 'Dhanu Sri', '+91 98765 43210');
      }, 700);
    }, 1200);
  };

  // Filtered queue items for the lookup modal
  const filteredLookupItems = queue.filter(
    (item) =>
      item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Live Queue Status Ticker */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Hospital Portal Authentication
            </div>
            <div className="text-base font-bold text-slate-900">
              Smart Patient Queue Management System
            </div>
          </div>
        </div>

        {/* Live Queue Pulse */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-600 font-medium">OPD Live:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Currently Serving:</span>
            <span className="font-mono font-bold bg-teal-600 text-white px-2 py-0.5 rounded text-xs">
              {currentServingTokenStr}
            </span>
          </div>
          <div className="text-slate-400 hidden sm:inline">•</div>
          <div className="text-slate-500 hidden sm:inline">
            Active Doctor: <span className="font-semibold text-slate-800">Dr. Priya (Cabin 3)</span>
          </div>
        </div>
      </div>

      {/* Main Dual-Portal Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Top Role Selector Tabs */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/70 p-2 gap-2">
          <button
            id="tab-role-patient"
            type="button"
            onClick={() => {
              setPortalRole('patient');
              setPatientError('');
            }}
            className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all ${
              portalRole === 'patient'
                ? 'bg-white text-teal-900 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <User className={`w-4 h-4 ${portalRole === 'patient' ? 'text-teal-600' : 'text-slate-400'}`} />
            <span>Patient Portal Sign-In</span>
            <span className="hidden sm:inline text-xs font-normal px-2 py-0.5 rounded-full bg-teal-50 text-teal-700">
              Live Token Tracking
            </span>
          </button>

          <button
            id="tab-role-staff"
            type="button"
            onClick={() => {
              setPortalRole('staff');
              setStaffError('');
            }}
            className={`flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all ${
              portalRole === 'staff'
                ? 'bg-white text-purple-900 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Stethoscope className={`w-4 h-4 ${portalRole === 'staff' ? 'text-purple-600' : 'text-slate-400'}`} />
            <span>Staff & Doctor Portal</span>
            <span className="hidden sm:inline text-xs font-normal px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
              OPD Desk Controls
            </span>
          </button>
        </div>

        <div className="p-6 sm:p-10">
          {portalRole === 'patient' ? (
            /* ========================================================================= */
            /* PATIENT LOGIN SECTION                                                     */
            /* ========================================================================= */
            <div>
              {/* Header inside form */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Patient Sign In & Queue Verification
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Access your live token status, turn notification alerts, and estimated waiting time.
                  </p>
                </div>

                {/* Sub tabs: Login vs Walk-in Registration vs Kiosk QR */}
                <div className="inline-flex bg-slate-100 p-1 rounded-xl self-start text-xs font-semibold">
                  <button
                    id="patient-subtab-login"
                    type="button"
                    onClick={() => {
                      setPatientSubTab('login');
                      setPatientError('');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      patientSubTab === 'login'
                        ? 'bg-white text-teal-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Returning Patient
                  </button>
                  <button
                    id="patient-subtab-register"
                    type="button"
                    onClick={() => {
                      setPatientSubTab('register');
                      setPatientError('');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      patientSubTab === 'register'
                        ? 'bg-white text-teal-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    New Walk-in Token
                  </button>
                  <button
                    id="patient-subtab-kiosk"
                    type="button"
                    onClick={() => {
                      setPatientSubTab('kiosk-scan');
                      setPatientError('');
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      patientSubTab === 'kiosk-scan'
                        ? 'bg-white text-teal-800 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5 text-teal-600" />
                    <span>Scan Kiosk Slip</span>
                  </button>
                </div>
              </div>

              {patientError && (
                <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{patientError}</span>
                </div>
              )}

              {/* Subtab 1: Standard Login */}
              {patientSubTab === 'login' && (
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Form */}
                  <form onSubmit={handlePatientLogin} className="lg:col-span-7 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="input-patient-id"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                        >
                          Patient ID or Token Number
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowForgotModal(true)}
                          className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
                        >
                          <Search className="w-3 h-3" />
                          <span>Lookup ID / Find Token</span>
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Hash className="w-4 h-4" />
                        </div>
                        <input
                          id="input-patient-id"
                          type="text"
                          value={patientIdInput}
                          onChange={(e) => setPatientIdInput(e.target.value)}
                          placeholder="e.g. CS-1001 or Token A-047"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-hidden bg-slate-50/50"
                          required
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Default Demo Persona: <strong className="text-slate-800">CS-1001</strong> (Dhanu Sri, Token A-047)
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="input-patient-phone"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                        >
                          Registered Mobile Number
                        </label>
                        <button
                          type="button"
                          onClick={() => setOtpMode(!otpMode)}
                          className="text-xs text-slate-500 hover:text-teal-700 font-medium"
                        >
                          {otpMode ? 'Use Direct Access' : 'Use 4-Digit OTP Mode'}
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          id="input-patient-phone"
                          type="tel"
                          value={patientPhoneInput}
                          onChange={(e) => setPatientPhoneInput(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-hidden bg-slate-50/50"
                          required
                        />
                      </div>
                    </div>

                    {/* Optional OTP Verification Mode */}
                    {otpMode && (
                      <div className="p-3.5 bg-teal-50/60 border border-teal-200 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                            Enter 4-Digit SMS / Kiosk OTP
                          </label>
                          <button
                            type="button"
                            onClick={() => setOtpCode('4721')}
                            className="text-xs bg-teal-600 text-white font-semibold px-2 py-0.5 rounded-md hover:bg-teal-500 transition-colors"
                          >
                            Autofill Demo Code (4721)
                          </button>
                        </div>
                        <input
                          id="input-demo-otp"
                          type="text"
                          maxLength={4}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="•••• (e.g. 4721)"
                          className="w-full text-center tracking-widest text-lg font-mono font-bold py-2 rounded-lg border border-teal-300 focus:ring-2 focus:ring-teal-500 bg-white"
                        />
                        <p className="text-[11px] text-teal-800">
                          Simulated OTP for academic demonstration: <strong className="font-mono">4721</strong>
                        </p>
                      </div>
                    )}

                    {/* Remember me and academic note */}
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                        <input
                          id="chk-remember-patient"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                        />
                        <span>Remember my token on this kiosk/device</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      id="btn-patient-submit-login"
                      type="submit"
                      className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Sign In & View Live Token</span>
                    </button>
                  </form>

                  {/* Right Column: 1-Click Demo Profiles & Quick Presets */}
                  <div className="lg:col-span-5 bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        1-Click Demo Profiles
                      </span>
                      <span className="text-[10px] font-semibold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-teal-600" />
                        Quick Test
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">
                      Click any simulated patient below to test real-time queue states instantly:
                    </p>

                    {/* Profile 1: Dhanu Sri (Target Primary) */}
                    <button
                      id="btn-demo-profile-dhanu"
                      type="button"
                      onClick={() => handleQuickPatientSelect('CS-1001', '+91 98765 43210')}
                      className="w-full p-3 rounded-xl bg-white border border-teal-300 hover:border-teal-500 hover:shadow-xs transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
                            DS
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900 group-hover:text-teal-700">
                              Dhanu Sri (Project Target)
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Token <strong className="font-mono text-teal-700">A-047</strong> • General Medicine
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                            8 Ahead
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Profile 2: Arjun Nair (Currently Serving) */}
                    <button
                      id="btn-demo-profile-arjun"
                      type="button"
                      onClick={() => handleQuickPatientSelect('CS-0993', '+91 94455 12345')}
                      className="w-full p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                            AN
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900 group-hover:text-teal-700">
                              Arjun Nair
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Token <strong className="font-mono text-emerald-700">A-039</strong> • Cabin 3
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            Serving Now
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Profile 3: Balaji K. (Further in Queue) */}
                    <button
                      id="btn-demo-profile-balaji"
                      type="button"
                      onClick={() => handleQuickPatientSelect('CS-1004', '+91 98844 77889')}
                      className="w-full p-3 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-600 text-white font-bold text-xs flex items-center justify-center">
                            BK
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900 group-hover:text-teal-700">
                              Balaji K.
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Token <strong className="font-mono text-slate-700">A-050</strong> • Follow-up
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            11 Ahead (~48 min)
                          </span>
                        </div>
                      </div>
                    </button>

                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Simulated demo logins do not require real passwords.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtab 2: Walk-In Registration */}
              {patientSubTab === 'register' && (
                <form onSubmit={handleRegisterNewPatient} className="max-w-xl mx-auto space-y-4 py-2">
                  <div className="bg-teal-50/60 border border-teal-200 rounded-xl p-3.5 text-xs text-teal-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>
                      Walk-in OPD Registration: Instantly generates a sequential token number and sets up real-time queue tracking.
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Patient Full Name
                      </label>
                      <input
                        id="reg-input-name"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. Kavita Krishnan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Mobile Contact
                      </label>
                      <input
                        id="reg-input-phone"
                        type="tel"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="+91 98765 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Department
                      </label>
                      <select
                        id="reg-select-department"
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                      >
                        {DEMO_DEPARTMENTS.map((dept) => (
                          <option key={dept.id} value={dept.name}>
                            {dept.name} (Code {dept.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Attending Doctor
                      </label>
                      <select
                        id="reg-select-doctor"
                        value={newDoctor}
                        onChange={(e) => setNewDoctor(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                      >
                        {DEMO_DOCTORS.map((doc) => (
                          <option key={doc.id} value={doc.name}>
                            {doc.name} ({doc.cabin})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Consultation Type
                    </label>
                    <select
                      id="reg-select-type"
                      value={newAppointmentType}
                      onChange={(e) => setNewAppointmentType(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                    >
                      <option value="Regular Consultation">Regular Consultation (~4.5 min)</option>
                      <option value="Follow-up">Follow-up Consultation (~3.5 min)</option>
                      <option value="Diagnostic Review">Diagnostic Report Review (~4.0 min)</option>
                      <option value="Prescription Refill">Prescription Refill (~2.5 min)</option>
                    </select>
                  </div>

                  <button
                    id="btn-register-generate-token"
                    type="submit"
                    className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2 mt-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Register Walk-in & Issue Token</span>
                  </button>
                </form>
              )}

              {/* Subtab 3: Kiosk QR / Barcode Scan Simulator */}
              {patientSubTab === 'kiosk-scan' && (
                <div className="max-w-md mx-auto py-4 text-center space-y-4">
                  <p className="text-xs text-slate-600">
                    Hold your printed thermal OPD ticket or hospital kiosk barcode up to the camera or use the simulator button below:
                  </p>

                  <div className="relative w-64 h-64 mx-auto rounded-3xl bg-slate-900 border-4 border-teal-500/80 flex flex-col items-center justify-center text-white overflow-hidden shadow-inner">
                    {isScanning && (
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent animate-bounce shadow-lg shadow-teal-400"></div>
                    )}

                    {scanSuccess ? (
                      <div className="space-y-2 animate-fade-in">
                        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
                        <div className="font-bold text-sm text-emerald-300">Ticket A-047 Verified!</div>
                        <div className="text-xs text-slate-300">Signing in Dhanu Sri...</div>
                      </div>
                    ) : (
                      <div className="space-y-3 p-4">
                        <QrCode className="w-16 h-16 text-teal-400/80 mx-auto" />
                        <div className="text-xs text-slate-400">
                          {isScanning ? 'Reading digital barcode...' : 'Point camera at OPD Token Barcode'}
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-2 inset-x-0 text-[10px] text-slate-400">
                      Hospital Kiosk Scanner v2.4
                    </div>
                  </div>

                  <button
                    id="btn-simulate-qr-scan"
                    type="button"
                    disabled={isScanning || scanSuccess}
                    onClick={triggerKioskScan}
                    className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white font-bold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <ScanLine className="w-4 h-4" />
                    <span>{isScanning ? 'Scanning Ticket...' : 'Simulate Scan for Token A-047'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ========================================================================= */
            /* HOSPITAL STAFF & CLINICIAN LOGIN SECTION                                  */
            /* ========================================================================= */
            <div className="max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-1 pb-2">
                <div className="inline-flex p-3 rounded-2xl bg-purple-100 text-purple-800 mb-2">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Hospital Staff & OPD Desk Sign In
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Manage patient consultation queues, call next tokens, and adjust doctor pacing.
                </p>
              </div>

              {staffError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{staffError}</span>
                </div>
              )}

              <form onSubmit={handleStaffLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="input-staff-login-id"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Staff / Clinician Employee ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Hash className="w-4 h-4" />
                    </div>
                    <input
                      id="input-staff-login-id"
                      type="text"
                      value={staffId}
                      onChange={(e) => setStaffId(e.target.value)}
                      placeholder="e.g. ST-402"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-hidden bg-slate-50/50"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Preset demo staff ID: <strong className="text-slate-800">ST-402</strong> (Dr. Priya / Desk 1)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="select-staff-station"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Assigned OPD Cabin / Station
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <select
                      id="select-staff-station"
                      value={staffCabin}
                      onChange={(e) => setStaffCabin(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-hidden bg-slate-50/50"
                    >
                      <option value="Cabin 3 (1st Floor) - Dr. Priya">Cabin 3 (1st Floor) - Dr. Priya (General Medicine)</option>
                      <option value="Cabin 1 (Ground Floor) - Sister Mary">Cabin 1 (Ground Floor) - Sister Mary (Triage / Pediatrics)</option>
                      <option value="OPD Desk 1 - Central Registrar">OPD Desk 1 - Central Reception & Token Desk</option>
                      <option value="Cabin 7 (2nd Floor) - Dr. Vikram Rao">Cabin 7 (2nd Floor) - Orthopedics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="input-staff-login-password"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Security Access PIN / Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      id="input-staff-login-password"
                      type={showStaffPassword ? 'text' : 'password'}
                      value={staffPassword}
                      onChange={(e) => setStaffPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-hidden bg-slate-50/50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowStaffPassword(!showStaffPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showStaffPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Demo Mode: Any password accepted for evaluation.
                  </p>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    id="btn-staff-submit-login"
                    type="submit"
                    className="w-full py-3 px-4 bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white font-bold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Log In to OPD Staff Dashboard</span>
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="grow border-t border-slate-200"></div>
                    <span className="shrink mx-3 text-xs text-slate-400 uppercase font-medium">Or Quick Staff Presets</span>
                    <div className="grow border-t border-slate-200"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      id="btn-staff-preset-priya"
                      type="button"
                      onClick={() => handleQuickStaffSelect('ST-402', 'Cabin 3 (1st Floor) - Dr. Priya')}
                      className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-xs font-semibold text-left transition-colors"
                    >
                      <div className="font-bold">Dr. Priya (Doctor)</div>
                      <div className="text-[10px] text-purple-700 font-normal">Cabin 3 • Gen Med</div>
                    </button>

                    <button
                      id="btn-staff-preset-sister"
                      type="button"
                      onClick={() => handleQuickStaffSelect('ST-409', 'Cabin 1 (Ground Floor) - Sister Mary')}
                      className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-xs font-semibold text-left transition-colors"
                    >
                      <div className="font-bold">Sister Mary (Nurse)</div>
                      <div className="text-[10px] text-purple-700 font-normal">Cabin 1 • Triage</div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Forgot ID / Token Lookup Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm">Find Patient ID or Token</h3>
              </div>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 my-3">
              Search by patient name, patient ID, or token number from current OPD records:
            </p>

            <div className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 'Dhanu', 'A-047', or 'CS-1001'..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
                autoFocus
              />
            </div>

            <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 space-y-1 mb-4">
              {filteredLookupItems.length === 0 ? (
                <div className="text-center py-4 text-xs text-slate-400">No matching patient records found</div>
              ) : (
                filteredLookupItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setPatientIdInput(item.patientId);
                      setShowForgotModal(false);
                      loginAsPatient(item.patientId);
                    }}
                    className="p-2 hover:bg-teal-50/70 rounded-lg cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-800">{item.patientName}</div>
                      <div className="text-[10px] text-slate-500">ID: {item.patientId} • {item.department}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                        {item.tokenNumber}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Academic Prototype Notice */}
      <div className="mt-8">
        <ResponsibleAIDisclaimer />
      </div>
    </div>
  );
};
