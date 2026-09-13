export type QueueItemStatus = 'serving' | 'waiting' | 'completed' | 'skipped';

export interface QueueItem {
  id: string;
  tokenNumber: string; // e.g. "A-047"
  numericToken: number; // e.g. 47
  patientId: string;
  patientName: string;
  department: string;
  doctor: string;
  appointmentType: string;
  status: QueueItemStatus;
  estimatedMinutes: number;
  cabin: string;
  registeredAt: string;
  calledAt?: string;
  completedAt?: string;
}

export interface PatientProfile {
  id: string; // e.g. "CS-1001"
  name: string; // e.g. "Dhanu Sri"
  phone: string; // e.g. "9876543210"
  department: string; // "General Medicine"
  doctor: string; // "Dr. Priya"
  tokenNumber: string; // "A-047"
  numericToken: number; // 47
  appointmentType: string;
  appointmentDate: string;
  appointmentTime: string;
  cabin: string;
  status: 'Waiting' | 'In Consultation' | 'Completed';
  isDemo: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'approaching' | 'serving' | 'info' | 'system';
  token?: string;
  read: boolean;
}

export interface AppointmentItem {
  id: string;
  patientName: string;
  patientId: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  tokenNumber: string;
  status: 'Waiting' | 'Confirmed' | 'Completed' | 'Cancelled';
  cabin: string;
  type: string;
}

export interface StaffUser {
  id: string;
  name: string;
  role: string;
  department: string;
  cabin: string;
  hospitalUnit: string;
}

export type AppView =
  // Unified Auth
  | 'login'
  // Patient Portal
  | 'patient-login'
  | 'patient-dashboard'
  | 'get-token'
  | 'live-queue'
  | 'notifications'
  | 'appointments'
  | 'profile'
  // Staff Portal
  | 'staff-login'
  | 'staff-dashboard'
  | 'queue-management'
  // Academic Concept & Info Pages
  | 'ai-estimation'
  | 'feedback-loop'
  | 'how-it-works'
  | 'features'
  | 'about-project';

export interface DoctorInfo {
  id: string;
  name: string;
  department: string;
  cabin: string;
  avgTimePerPatient: number; // minutes
  available: boolean;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  activeDoctors: number;
  currentQueueLength: number;
}
