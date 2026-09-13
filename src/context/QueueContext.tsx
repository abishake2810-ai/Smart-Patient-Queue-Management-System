import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { QueueItem, PatientProfile, NotificationItem, AppointmentItem, StaffUser, AppView, DoctorInfo, DepartmentInfo } from '../types';
import { playHospitalChime } from '../utils/audio';

export const DEMO_DEPARTMENTS: DepartmentInfo[] = [
  { id: 'gen-med', name: 'General Medicine', code: 'A', activeDoctors: 3, currentQueueLength: 12 },
  { id: 'pediatrics', name: 'Pediatrics', code: 'B', activeDoctors: 2, currentQueueLength: 8 },
  { id: 'orthopedics', name: 'Orthopedics', code: 'C', activeDoctors: 2, currentQueueLength: 6 },
  { id: 'cardiology', name: 'Cardiology', code: 'D', activeDoctors: 1, currentQueueLength: 5 },
  { id: 'dermatology', name: 'Dermatology', code: 'E', activeDoctors: 2, currentQueueLength: 7 },
  { id: 'ent', name: 'ENT', code: 'F', activeDoctors: 1, currentQueueLength: 4 },
];

export const DEMO_DOCTORS: DoctorInfo[] = [
  { id: 'doc-1', name: 'Dr. Priya', department: 'General Medicine', cabin: 'Cabin 3 (1st Floor)', avgTimePerPatient: 4.4, available: true },
  { id: 'doc-2', name: 'Dr. Rajesh Kumar', department: 'General Medicine', cabin: 'Cabin 4 (1st Floor)', avgTimePerPatient: 4.8, available: true },
  { id: 'doc-3', name: 'Dr. Ananya Sen', department: 'Pediatrics', cabin: 'Cabin 1 (Ground Floor)', avgTimePerPatient: 5.0, available: true },
  { id: 'doc-4', name: 'Dr. Vikram Rao', department: 'Orthopedics', cabin: 'Cabin 7 (2nd Floor)', avgTimePerPatient: 6.0, available: true },
  { id: 'doc-5', name: 'Dr. Sunita Murthy', department: 'Cardiology', cabin: 'Cabin 9 (2nd Floor)', avgTimePerPatient: 7.5, available: true },
  { id: 'doc-6', name: 'Dr. Rohan Verma', department: 'Dermatology', cabin: 'Cabin 5 (1st Floor)', avgTimePerPatient: 4.0, available: true },
];

export const INITIAL_DEMO_PATIENT: PatientProfile = {
  id: 'CS-1001',
  name: 'Dhanu Sri',
  phone: '+91 98765 43210',
  department: 'General Medicine',
  doctor: 'Dr. Priya',
  tokenNumber: 'A-047',
  numericToken: 47,
  appointmentType: 'Regular Consultation',
  appointmentDate: 'Today, 13 Sep 2026',
  appointmentTime: '10:30 AM',
  cabin: 'Cabin 3 (1st Floor)',
  status: 'Waiting',
  isDemo: true,
};

const INITIAL_QUEUE_DATA: QueueItem[] = [
  { id: 'q-39', tokenNumber: 'A-039', numericToken: 39, patientId: 'CS-0993', patientName: 'Arjun Nair', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Regular Consultation', status: 'serving', estimatedMinutes: 0, cabin: 'Cabin 3', registeredAt: '09:40 AM', calledAt: '10:15 AM' },
  { id: 'q-40', tokenNumber: 'A-040', numericToken: 40, patientId: 'CS-0994', patientName: 'Deepa V.', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Follow-up', status: 'waiting', estimatedMinutes: 4, cabin: 'Cabin 3', registeredAt: '09:45 AM' },
  { id: 'q-41', tokenNumber: 'A-041', numericToken: 41, patientId: 'CS-0995', patientName: 'Suresh Babu', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Prescription Refill', status: 'waiting', estimatedMinutes: 9, cabin: 'Cabin 3', registeredAt: '09:50 AM' },
  { id: 'q-42', tokenNumber: 'A-042', numericToken: 42, patientId: 'CS-0996', patientName: 'Kavitha R.', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Regular Consultation', status: 'waiting', estimatedMinutes: 13, cabin: 'Cabin 3', registeredAt: '09:55 AM' },
  { id: 'q-43', tokenNumber: 'A-043', numericToken: 43, patientId: 'CS-0997', patientName: 'Farhan Ali', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Diagnostic Review', status: 'waiting', estimatedMinutes: 18, cabin: 'Cabin 3', registeredAt: '10:00 AM' },
  { id: 'q-44', tokenNumber: 'A-044', numericToken: 44, patientId: 'CS-0998', patientName: 'Meenakshi S.', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Regular Consultation', status: 'waiting', estimatedMinutes: 22, cabin: 'Cabin 3', registeredAt: '10:05 AM' },
  { id: 'q-45', tokenNumber: 'A-045', numericToken: 45, patientId: 'CS-0999', patientName: 'Ramesh Chen', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Follow-up', status: 'waiting', estimatedMinutes: 26, cabin: 'Cabin 3', registeredAt: '10:10 AM' },
  { id: 'q-46', tokenNumber: 'A-046', numericToken: 46, patientId: 'CS-1000', patientName: 'Revathi Pillai', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Regular Consultation', status: 'waiting', estimatedMinutes: 30, cabin: 'Cabin 3', registeredAt: '10:15 AM' },
  { id: 'q-47', tokenNumber: 'A-047', numericToken: 47, patientId: 'CS-1001', patientName: 'Dhanu Sri', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Regular Consultation', status: 'waiting', estimatedMinutes: 35, cabin: 'Cabin 3', registeredAt: '10:20 AM' },
  { id: 'q-48', tokenNumber: 'A-048', numericToken: 48, patientId: 'CS-1002', patientName: 'Vivek Sharma', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Prescription Refill', status: 'waiting', estimatedMinutes: 40, cabin: 'Cabin 3', registeredAt: '10:25 AM' },
  { id: 'q-49', tokenNumber: 'A-049', numericToken: 49, patientId: 'CS-1003', patientName: 'Anitha Joseph', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Follow-up', status: 'waiting', estimatedMinutes: 44, cabin: 'Cabin 3', registeredAt: '10:28 AM' },
  { id: 'q-50', tokenNumber: 'A-050', numericToken: 50, patientId: 'CS-1004', patientName: 'Balaji K.', department: 'General Medicine', doctor: 'Dr. Priya', appointmentType: 'Regular Consultation', status: 'waiting', estimatedMinutes: 48, cabin: 'Cabin 3', registeredAt: '10:30 AM' },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Token Generated',
    message: 'Your token A-047 is registered for Dr. Priya (General Medicine, Cabin 3).',
    timestamp: '10:20 AM',
    type: 'info',
    token: 'A-047',
    read: true,
  },
  {
    id: 'n-2',
    title: 'OPD Queue Active',
    message: 'Current token being served is A-039. There are 8 patients ahead of you.',
    timestamp: '10:22 AM',
    type: 'info',
    token: 'A-039',
    read: false,
  },
];

const INITIAL_APPOINTMENTS: AppointmentItem[] = [
  {
    id: 'apt-1',
    patientName: 'Dhanu Sri',
    patientId: 'CS-1001',
    department: 'General Medicine',
    doctor: 'Dr. Priya',
    date: 'Today, 13 Sep 2026',
    time: '10:30 AM',
    tokenNumber: 'A-047',
    status: 'Waiting',
    cabin: 'Cabin 3 (1st Floor)',
    type: 'Regular Consultation',
  },
  {
    id: 'apt-prev',
    patientName: 'Dhanu Sri',
    patientId: 'CS-1001',
    department: 'General Medicine',
    doctor: 'Dr. Priya',
    date: '15 Aug 2026',
    time: '11:15 AM',
    tokenNumber: 'A-012',
    status: 'Completed',
    cabin: 'Cabin 3 (1st Floor)',
    type: 'Initial Checkup',
  },
];

const DEMO_STAFF: StaffUser = {
  id: 'ST-402',
  name: 'Sister Mary / Nurse Station 3',
  role: 'OPD Desk Coordinator & Dr. Priya Assistant',
  department: 'General Medicine',
  cabin: 'Cabin 3',
  hospitalUnit: 'Outpatient Block A',
};

interface QueueContextType {
  // Navigation & Role
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  isStaffLoggedIn: boolean;
  isPatientLoggedIn: boolean;
  loginAsPatient: (patientId?: string, customName?: string, customPhone?: string) => void;
  loginAsStaff: (staffId?: string) => void;
  logoutPatient: () => void;
  logoutStaff: () => void;

  // Patient Info
  patient: PatientProfile;
  setPatient: React.Dispatch<React.SetStateAction<PatientProfile>>;
  appointments: AppointmentItem[];

  // Queue State
  currentServingTokenNum: number;
  currentServingTokenStr: string;
  queue: QueueItem[];
  completedCount: number;
  avgConsultationMinutes: number;
  patientsAhead: number;
  estimatedWaitMinutes: number;
  patientQueueStatus: 'Waiting' | 'In Consultation' | 'Completed' | 'Upcoming';

  // Queue Actions
  callNextToken: () => void;
  updateCurrentServingToken: (targetNum: number) => void;
  markConsultationCompleted: () => void;
  resetDemoQueue: () => void;
  generateToken: (data: {
    name: string;
    phone: string;
    department: string;
    doctor: string;
    appointmentType: string;
  }) => { tokenNumber: string; estimatedMinutes: number; patientsAhead: number };

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Auto Simulation
  autoSimulation: boolean;
  setAutoSimulation: React.Dispatch<React.SetStateAction<boolean>>;
  autoSimulationCountdown: number;

  // Staff Info
  staffUser: StaffUser;

  // AI & Feedback Model Info
  doctorConsultationPace: number; // e.g. 4.4 min
  setDoctorConsultationPace: (pace: number) => void;
  complexityFactor: number; // 1.0 = normal, 1.2 = slightly complex cases
  setComplexityFactor: (factor: number) => void;
  aiCalculationDetails: {
    formula: string;
    patientsAhead: number;
    baseRate: number;
    calculatedMinutes: number;
    varianceConfidence: string;
    feedbackAdjustment: string;
  };

  // Sound
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  triggerChime: (type?: 'token-called' | 'approaching' | 'notification') => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('patient-dashboard');
  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState<boolean>(true);
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState<boolean>(false);

  const [patient, setPatient] = useState<PatientProfile>(INITIAL_DEMO_PATIENT);
  const [currentServingTokenNum, setCurrentServingTokenNum] = useState<number>(39);
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_QUEUE_DATA);
  const [completedCount, setCompletedCount] = useState<number>(24);
  const [doctorConsultationPace, setDoctorConsultationPace] = useState<number>(4.375); // 35 min / 8 patients = 4.375 min
  const [complexityFactor, setComplexityFactor] = useState<number>(1.0);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [appointments, setAppointments] = useState<AppointmentItem[]>(INITIAL_APPOINTMENTS);
  const [autoSimulation, setAutoSimulation] = useState<boolean>(false);
  const [autoSimulationCountdown, setAutoSimulationCountdown] = useState<number>(15);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const staffUser = DEMO_STAFF;

  const currentServingTokenStr = useMemo(() => {
    return `A-${String(currentServingTokenNum).padStart(3, '0')}`;
  }, [currentServingTokenNum]);

  // Derive patients ahead for Dhanu Sri (numeric token 47) or active patient
  const patientsAhead = useMemo(() => {
    const diff = patient.numericToken - currentServingTokenNum;
    return diff > 0 ? diff : 0;
  }, [patient.numericToken, currentServingTokenNum]);

  // Approximate AI wait time calculation: N_ahead * Pace * Complexity
  const estimatedWaitMinutes = useMemo(() => {
    if (patientsAhead <= 0) return 0;
    // Exactly 35 minutes when 8 ahead with baseline pace (4.375 * 8 = 35)
    return Math.max(1, Math.round(patientsAhead * doctorConsultationPace * complexityFactor));
  }, [patientsAhead, doctorConsultationPace, complexityFactor]);

  // Current patient status
  const patientQueueStatus = useMemo(() => {
    if (currentServingTokenNum === patient.numericToken) return 'In Consultation';
    if (currentServingTokenNum > patient.numericToken) return 'Completed';
    return 'Waiting';
  }, [currentServingTokenNum, patient.numericToken]);

  const triggerChime = useCallback((type: 'token-called' | 'approaching' | 'notification' = 'token-called') => {
    if (soundEnabled) {
      playHospitalChime(type);
    }
  }, [soundEnabled]);

  // Handle Turn Approaching and Turn Now alerts
  const addNotification = useCallback((title: string, message: string, type: 'approaching' | 'serving' | 'info' | 'system', token?: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      token,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  // Sync queue item statuses based on currentServingTokenNum
  const updateQueueForToken = useCallback((servingNum: number) => {
    setQueue((prevQueue) => {
      return prevQueue.map((item) => {
        if (item.numericToken < servingNum) {
          return { ...item, status: 'completed' as const };
        } else if (item.numericToken === servingNum) {
          return {
            ...item,
            status: 'serving' as const,
            calledAt: item.calledAt || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            estimatedMinutes: 0,
          };
        } else {
          const ahead = item.numericToken - servingNum;
          return {
            ...item,
            status: 'waiting' as const,
            estimatedMinutes: Math.round(ahead * doctorConsultationPace * complexityFactor),
          };
        }
      });
    });
  }, [doctorConsultationPace, complexityFactor]);

  // Call Next Token
  const callNextToken = useCallback(() => {
    const nextTokenNum = currentServingTokenNum + 1;
    setCurrentServingTokenNum(nextTokenNum);
    setCompletedCount((prev) => prev + 1);
    updateQueueForToken(nextTokenNum);

    const tokenStr = `A-${String(nextTokenNum).padStart(3, '0')}`;
    const diff = patient.numericToken - nextTokenNum;

    if (diff === 0) {
      // It's Dhanu Sri's turn!
      triggerChime('token-called');
      addNotification(
        "It's Your Turn! (Token " + patient.tokenNumber + ")",
        `Please proceed immediately to ${patient.cabin} for consultation with ${patient.doctor}.`,
        'serving',
        patient.tokenNumber
      );
    } else if (diff === 2 || diff === 1) {
      // Turn is approaching!
      triggerChime('approaching');
      addNotification(
        'Your Token is Approaching!',
        `Current token is ${tokenStr}. Only ${diff} patient${diff > 1 ? 's' : ''} ahead. Please be ready near the consultation area.`,
        'approaching',
        tokenStr
      );
    } else if (nextTokenNum > patient.numericToken) {
      // Completed
      addNotification(
        'Consultation Completed',
        `Token ${patient.tokenNumber} marked completed. Take care and collect your prescription.`,
        'info',
        patient.tokenNumber
      );
    } else {
      // Standard progression
      triggerChime('notification');
      addNotification(
        `Queue Update: Current Token is ${tokenStr}`,
        `Now calling token ${tokenStr} to Cabin 3. Approximate wait updated to ${Math.max(1, Math.round(diff * doctorConsultationPace))} minutes.`,
        'info',
        tokenStr
      );
    }
  }, [currentServingTokenNum, patient, triggerChime, addNotification, updateQueueForToken, doctorConsultationPace]);

  // Directly jump to a specific token number
  const updateCurrentServingToken = useCallback((targetNum: number) => {
    if (targetNum < 1) return;
    setCurrentServingTokenNum(targetNum);
    updateQueueForToken(targetNum);
    const tokenStr = `A-${String(targetNum).padStart(3, '0')}`;
    const diff = patient.numericToken - targetNum;

    if (diff === 0) {
      triggerChime('token-called');
      addNotification(
        "It's Your Turn! (Token " + patient.tokenNumber + ")",
        `Please proceed to ${patient.cabin} for ${patient.doctor}.`,
        'serving',
        patient.tokenNumber
      );
    } else if (diff > 0 && diff <= 2) {
      triggerChime('approaching');
      addNotification(
        'Your Token is Approaching!',
        `Current token is ${tokenStr}. You are next in line. Please be ready near the consultation area.`,
        'approaching',
        tokenStr
      );
    } else {
      addNotification(
        `Queue Updated to ${tokenStr}`,
        `Current token serving is now ${tokenStr}.`,
        'info',
        tokenStr
      );
    }
  }, [patient, triggerChime, addNotification, updateQueueForToken]);

  // Mark Consultation Completed
  const markConsultationCompleted = useCallback(() => {
    callNextToken();
  }, [callNextToken]);

  // Reset Demo Queue to Initial Spec State
  const resetDemoQueue = useCallback(() => {
    setCurrentServingTokenNum(39);
    setPatient(INITIAL_DEMO_PATIENT);
    setQueue(INITIAL_QUEUE_DATA);
    setCompletedCount(24);
    setDoctorConsultationPace(4.375);
    setComplexityFactor(1.0);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAppointments(INITIAL_APPOINTMENTS);
    setAutoSimulation(false);
    setAutoSimulationCountdown(15);
    triggerChime('notification');
  }, [triggerChime]);

  // Generate Token
  const generateToken = useCallback((data: {
    name: string;
    phone: string;
    department: string;
    doctor: string;
    appointmentType: string;
  }) => {
    const nextNumeric = Math.max(...queue.map((q) => q.numericToken), currentServingTokenNum) + 1;
    const tokenStr = `A-${String(nextNumeric).padStart(3, '0')}`;
    const doc = DEMO_DOCTORS.find((d) => d.name === data.doctor) || DEMO_DOCTORS[0];
    const ahead = Math.max(0, nextNumeric - currentServingTokenNum);
    const estWait = Math.round(ahead * (doc.avgTimePerPatient || 4.5));

    const newItem: QueueItem = {
      id: `q-${nextNumeric}`,
      tokenNumber: tokenStr,
      numericToken: nextNumeric,
      patientId: `CS-${1000 + nextNumeric - 30}`,
      patientName: data.name,
      department: data.department,
      doctor: data.doctor,
      appointmentType: data.appointmentType,
      status: 'waiting',
      estimatedMinutes: estWait,
      cabin: doc.cabin,
      registeredAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setQueue((prev) => [...prev, newItem]);

    // Update patient profile if generated from the UI
    const updatedPatient: PatientProfile = {
      id: newItem.patientId,
      name: data.name,
      phone: data.phone || '+91 98765 43210',
      department: data.department,
      doctor: data.doctor,
      tokenNumber: tokenStr,
      numericToken: nextNumeric,
      appointmentType: data.appointmentType,
      appointmentDate: 'Today, 13 Sep 2026',
      appointmentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cabin: doc.cabin,
      status: 'Waiting',
      isDemo: true,
    };
    setPatient(updatedPatient);

    const newApt: AppointmentItem = {
      id: `apt-${Date.now()}`,
      patientName: data.name,
      patientId: newItem.patientId,
      department: data.department,
      doctor: data.doctor,
      date: 'Today, 13 Sep 2026',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tokenNumber: tokenStr,
      status: 'Waiting',
      cabin: doc.cabin,
      type: data.appointmentType,
    };
    setAppointments((prev) => [newApt, ...prev]);

    addNotification(
      'New Token Generated: ' + tokenStr,
      `Your token ${tokenStr} has been successfully issued for ${data.doctor} (${data.department}). Approximate wait time is ~${estWait} minutes.`,
      'info',
      tokenStr
    );
    triggerChime('notification');

    return { tokenNumber: tokenStr, estimatedMinutes: estWait, patientsAhead: ahead };
  }, [queue, currentServingTokenNum, addNotification, triggerChime]);

  // Notifications Helpers
  const unreadNotificationCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Login handlers
  const loginAsPatient = useCallback((patientId?: string, customName?: string, customPhone?: string) => {
    setIsPatientLoggedIn(true);
    if (!patientId || patientId.toUpperCase() === 'CS-1001') {
      setPatient(INITIAL_DEMO_PATIENT);
    } else {
      const trimmed = patientId.trim().toUpperCase();
      const matchInQueue = queue.find(
        (q) => q.patientId.toUpperCase() === trimmed || q.tokenNumber.toUpperCase() === trimmed
      );
      if (matchInQueue) {
        setPatient({
          id: matchInQueue.patientId,
          name: matchInQueue.patientName,
          phone: customPhone || '+91 98765 43210',
          department: matchInQueue.department,
          doctor: matchInQueue.doctor,
          tokenNumber: matchInQueue.tokenNumber,
          numericToken: matchInQueue.numericToken,
          appointmentType: matchInQueue.appointmentType,
          appointmentDate: 'Today, 13 Sep 2026',
          appointmentTime: '10:30 AM',
          cabin: matchInQueue.cabin,
          status: matchInQueue.status === 'serving' ? 'In Consultation' : matchInQueue.status === 'completed' ? 'Completed' : 'Waiting',
          isDemo: true,
        });
      } else if (customName) {
        setPatient({
          id: patientId,
          name: customName,
          phone: customPhone || '+91 98765 43210',
          department: 'General Medicine',
          doctor: 'Dr. Priya',
          tokenNumber: 'A-047',
          numericToken: 47,
          appointmentType: 'Regular Consultation',
          appointmentDate: 'Today, 13 Sep 2026',
          appointmentTime: '10:30 AM',
          cabin: 'Cabin 3 (1st Floor)',
          status: 'Waiting',
          isDemo: true,
        });
      } else {
        setPatient(INITIAL_DEMO_PATIENT);
      }
    }
    setCurrentView('patient-dashboard');
  }, [queue]);

  const loginAsStaff = useCallback((_staffId?: string) => {
    setIsStaffLoggedIn(true);
    setCurrentView('staff-dashboard');
  }, []);

  const logoutPatient = useCallback(() => {
    setIsPatientLoggedIn(false);
    setCurrentView('patient-login');
  }, []);

  const logoutStaff = useCallback(() => {
    setIsStaffLoggedIn(false);
    setCurrentView('staff-login');
  }, []);

  // Auto-Simulation effect
  useEffect(() => {
    if (!autoSimulation) return;

    const interval = setInterval(() => {
      setAutoSimulationCountdown((prev) => {
        if (prev <= 1) {
          callNextToken();
          return 12; // reset countdown to 12s
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoSimulation, callNextToken]);

  // AI Calculation details for explanation component
  const aiCalculationDetails = useMemo(() => {
    const baseRate = doctorConsultationPace;
    const calculatedMinutes = estimatedWaitMinutes;
    return {
      formula: 'Wait Time (mins) ≈ (Patient Token - Current Token) × Avg Consultation Pace × Case Complexity',
      patientsAhead,
      baseRate,
      calculatedMinutes,
      varianceConfidence: '±3.5 minutes (based on 24 prior OPD consultations today)',
      feedbackAdjustment: 'Dynamically adapted after each token completion',
    };
  }, [doctorConsultationPace, estimatedWaitMinutes, patientsAhead]);

  return (
    <QueueContext.Provider
      value={{
        currentView,
        setCurrentView,
        isStaffLoggedIn,
        isPatientLoggedIn,
        loginAsPatient,
        loginAsStaff,
        logoutPatient,
        logoutStaff,
        patient,
        setPatient,
        appointments,
        currentServingTokenNum,
        currentServingTokenStr,
        queue,
        completedCount,
        avgConsultationMinutes: doctorConsultationPace,
        patientsAhead,
        estimatedWaitMinutes,
        patientQueueStatus,
        callNextToken,
        updateCurrentServingToken,
        markConsultationCompleted,
        resetDemoQueue,
        generateToken,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        autoSimulation,
        setAutoSimulation,
        autoSimulationCountdown,
        staffUser,
        doctorConsultationPace,
        setDoctorConsultationPace,
        complexityFactor,
        setComplexityFactor,
        aiCalculationDetails,
        soundEnabled,
        setSoundEnabled,
        triggerChime,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (!context) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
