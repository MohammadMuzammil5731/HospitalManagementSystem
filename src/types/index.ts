// Database Models and Types for Clinic Management System

export interface Patient {
  id: string;
  name: string;
  phone: string;
  address: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  emergencyContact: string;
  medicalHistory?: string;
  allergies?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: DoctorSpecialization;
  phone: string;
  email: string;
  licenseNumber: string;
  experience: number;
  consultationFee: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type DoctorSpecialization = 
  | 'Neurologist'
  | 'Nephrologist' 
  | 'Eye Specialist'
  | 'Bone Specialist'
  | 'Cardiologist'
  | 'Dermatologist'
  | 'General Physician'
  | 'Pediatrician'
  | 'Gynecologist'
  | 'Psychiatrist';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  checkupType: string;
  appointmentDate: Date;
  appointmentTime: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  medications: Medication[];
  diagnosis: string;
  instructions: string;
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: MedicationTiming;
  instructions: string;
}

export type MedicationTiming = 
  | 'Before Meals'
  | 'After Meals'
  | 'With Meals'
  | 'Empty Stomach'
  | 'At Bedtime'
  | 'As Needed';

export interface ReceptionistRequest {
  id: string;
  patientId: string;
  doctorId: string;
  checkupType: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Pending' | 'Approved' | 'Rejected';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Form Types
export interface PatientRegistrationForm {
  name: string;
  phone: string;
  address: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  emergencyContact: string;
  medicalHistory?: string;
  allergies?: string;
}

export interface AppointmentForm {
  patientId: string;
  checkupType: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface PrescriptionForm {
  patientId: string;
  appointmentId: string;
  diagnosis: string;
  medications: Omit<Medication, 'id'>[];
  instructions: string;
  followUpDate?: string;
}

export interface CheckupType {
  id: string;
  name: string;
  specialization: DoctorSpecialization;
  description: string;
  estimatedDuration: string;
}
