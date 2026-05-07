import { 
  Patient, 
  Doctor, 
  Appointment, 
  Prescription, 
  ReceptionistRequest,
  PatientRegistrationForm,
  AppointmentForm,
  PrescriptionForm,
  DoctorSpecialization,
  AppointmentStatus,
  CheckupType
} from '@/types';

// Mock data storage (in a real app, this would be API calls to backend)
class MockDatabase {
  private static instance: MockDatabase;
  private patients: Patient[] = [];
  private doctors: Doctor[] = [];
  private appointments: Appointment[] = [];
  private prescriptions: Prescription[] = [];
  private requests: ReceptionistRequest[] = [];

  static getInstance(): MockDatabase {
    if (!MockDatabase.instance) {
      MockDatabase.instance = new MockDatabase();
    }
    return MockDatabase.instance;
  }

  // Initialize with sample data
  initialize() {
    this.doctors = [
      {
        id: 'D001',
        name: 'Dr. Emily Chen',
        specialization: 'Neurologist',
        phone: '+1 (555) 100-0001',
        email: 'emily.chen@clinic.com',
        licenseNumber: 'MD123456',
        experience: 8,
        consultationFee: 150,
        isAvailable: true,
        createdAt: new Date('2020-01-15'),
        updatedAt: new Date('2024-10-20')
      },
      {
        id: 'D002',
        name: 'Dr. Robert Smith',
        specialization: 'Nephrologist',
        phone: '+1 (555) 100-0002',
        email: 'robert.smith@clinic.com',
        licenseNumber: 'MD123457',
        experience: 12,
        consultationFee: 180,
        isAvailable: true,
        createdAt: new Date('2019-03-20'),
        updatedAt: new Date('2024-10-20')
      },
      {
        id: 'D003',
        name: 'Dr. Sarah Johnson',
        specialization: 'Eye Specialist',
        phone: '+1 (555) 100-0003',
        email: 'sarah.johnson@clinic.com',
        licenseNumber: 'MD123458',
        experience: 6,
        consultationFee: 120,
        isAvailable: true,
        createdAt: new Date('2021-06-10'),
        updatedAt: new Date('2024-10-20')
      },
      {
        id: 'D004',
        name: 'Dr. Michael Lee',
        specialization: 'Bone Specialist',
        phone: '+1 (555) 100-0004',
        email: 'michael.lee@clinic.com',
        licenseNumber: 'MD123459',
        experience: 15,
        consultationFee: 200,
        isAvailable: true,
        createdAt: new Date('2018-09-05'),
        updatedAt: new Date('2024-10-20')
      },
      {
        id: 'D005',
        name: 'Dr. Lisa Wang',
        specialization: 'Cardiologist',
        phone: '+1 (555) 100-0005',
        email: 'lisa.wang@clinic.com',
        licenseNumber: 'MD123460',
        experience: 10,
        consultationFee: 175,
        isAvailable: true,
        createdAt: new Date('2020-08-12'),
        updatedAt: new Date('2024-10-20')
      }
    ];

    this.patients = [
      {
        id: 'P001',
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, State 12345',
        age: 34,
        gender: 'Female',
        bloodType: 'O+',
        emergencyContact: '+1 (555) 123-4568',
        medicalHistory: 'Hypertension',
        allergies: 'Penicillin',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-10-15')
      },
      {
        id: 'P002',
        name: 'Michael Brown',
        phone: '+1 (555) 234-5678',
        address: '456 Oak Ave, City, State 12345',
        age: 45,
        gender: 'Male',
        bloodType: 'A+',
        emergencyContact: '+1 (555) 234-5679',
        medicalHistory: 'Diabetes Type 2',
        allergies: 'None',
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-10-18')
      }
    ];
  }

  // Patient operations
  getPatients(): Patient[] {
    return this.patients;
  }

  getPatient(id: string): Patient | undefined {
    return this.patients.find(p => p.id === id);
  }

  addPatient(patientData: PatientRegistrationForm): Patient {
    const newPatient: Patient = {
      id: `P${String(this.patients.length + 1).padStart(3, '0')}`,
      ...patientData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  updatePatient(id: string, updates: Partial<Patient>): Patient | null {
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.patients[index] = {
      ...this.patients[index],
      ...updates,
      updatedAt: new Date()
    };
    return this.patients[index];
  }

  // Doctor operations
  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorsBySpecialization(specialization: DoctorSpecialization): Doctor[] {
    return this.doctors.filter(d => d.specialization === specialization);
  }

  getDoctor(id: string): Doctor | undefined {
    return this.doctors.find(d => d.id === id);
  }

  // Appointment operations
  getAppointments(): Appointment[] {
    return this.appointments;
  }

  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return this.appointments.filter(a => a.doctorId === doctorId);
  }

  getAppointmentsByPatient(patientId: string): Appointment[] {
    return this.appointments.filter(a => a.patientId === patientId);
  }

  addAppointment(appointmentData: AppointmentForm): Appointment {
    const doctor = this.getDoctorBySpecialization(appointmentData.checkupType);
    const newAppointment: Appointment = {
      id: `A${String(this.appointments.length + 1).padStart(3, '0')}`,
      doctorId: doctor?.id || '',
      appointmentDate: new Date(appointmentData.preferredDate),
      appointmentTime: appointmentData.preferredTime,
      status: 'Pending',
      notes: appointmentData.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...appointmentData
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  updateAppointmentStatus(id: string, status: AppointmentStatus): Appointment | null {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    this.appointments[index] = {
      ...this.appointments[index],
      status,
      updatedAt: new Date()
    };
    return this.appointments[index];
  }

  private getDoctorBySpecialization(checkupType: string): Doctor | undefined {
    const specializationMap: { [key: string]: DoctorSpecialization } = {
      'neurology': 'Neurologist',
      'brain': 'Neurologist',
      'kidney': 'Nephrologist',
      'renal': 'Nephrologist',
      'eye': 'Eye Specialist',
      'vision': 'Eye Specialist',
      'bone': 'Bone Specialist',
      'orthopedic': 'Bone Specialist',
      'heart': 'Cardiologist',
      'cardiac': 'Cardiologist',
      'skin': 'Dermatologist',
      'dermatology': 'Dermatologist',
      'general': 'General Physician',
      'child': 'Pediatrician',
      'pediatric': 'Pediatrician',
      'women': 'Gynecologist',
      'gynecology': 'Gynecologist',
      'mental': 'Psychiatrist',
      'psychiatry': 'Psychiatrist'
    };

    const lowerCheckupType = checkupType.toLowerCase();
    for (const [key, specialization] of Object.entries(specializationMap)) {
      if (lowerCheckupType.includes(key)) {
        return this.doctors.find(d => d.specialization === specialization);
      }
    }
    return this.doctors[0]; // Default to first doctor
  }

  // Prescription operations
  getPrescriptions(): Prescription[] {
    return this.prescriptions;
  }

  getPrescriptionsByPatient(patientId: string): Prescription[] {
    return this.prescriptions.filter(p => p.patientId === patientId);
  }

  addPrescription(prescriptionData: PrescriptionForm): Prescription {
    const newPrescription: Prescription = {
      id: `PR${String(this.prescriptions.length + 1).padStart(3, '0')}`,
      doctorId: 'D001', // Current doctor
      followUpDate: prescriptionData.followUpDate ? new Date(prescriptionData.followUpDate) : undefined,
      medications: prescriptionData.medications.map((med, index) => ({
        id: `M${index + 1}`,
        ...med
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...prescriptionData
    };
    this.prescriptions.push(newPrescription);
    return newPrescription;
  }

  // Request operations
  getRequests(): ReceptionistRequest[] {
    return this.requests;
  }

  addRequest(patientId: string, checkupType: string, priority: 'Low' | 'Medium' | 'High' | 'Emergency' = 'Medium'): ReceptionistRequest {
    const doctor = this.getDoctorBySpecialization(checkupType);
    const newRequest: ReceptionistRequest = {
      id: `R${String(this.requests.length + 1).padStart(3, '0')}`,
      patientId,
      doctorId: doctor?.id || '',
      checkupType,
      priority,
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.requests.push(newRequest);
    return newRequest;
  }

  updateRequestStatus(id: string, status: 'Pending' | 'Approved' | 'Rejected'): ReceptionistRequest | null {
    const index = this.requests.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    this.requests[index] = {
      ...this.requests[index],
      status,
      updatedAt: new Date()
    };
    return this.requests[index];
  }
}

// API Service Class
export class ClinicAPI {
  private db: MockDatabase;

  constructor() {
    this.db = MockDatabase.getInstance();
    this.db.initialize();
  }

  // Patient API
  async getPatients(): Promise<Patient[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getPatients()), 500);
    });
  }

  async getPatient(id: string): Promise<Patient | undefined> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getPatient(id)), 300);
    });
  }

  async createPatient(patientData: PatientRegistrationForm): Promise<Patient> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.addPatient(patientData)), 800);
    });
  }

  async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | null> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.updatePatient(id, updates)), 600);
    });
  }

  // Doctor API
  async getDoctors(): Promise<Doctor[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getDoctors()), 400);
    });
  }

  async getDoctorsBySpecialization(specialization: DoctorSpecialization): Promise<Doctor[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getDoctorsBySpecialization(specialization)), 300);
    });
  }

  async getDoctor(id: string): Promise<Doctor | undefined> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getDoctor(id)), 300);
    });
  }

  // Appointment API
  async getAppointments(): Promise<Appointment[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getAppointments()), 400);
    });
  }

  async getAppointmentsByDoctor(doctorId: string): Promise<Appointment[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getAppointmentsByDoctor(doctorId)), 300);
    });
  }

  async createAppointment(appointmentData: AppointmentForm): Promise<Appointment> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.addAppointment(appointmentData)), 800);
    });
  }

  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<Appointment | null> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.updateAppointmentStatus(id, status)), 500);
    });
  }

  // Prescription API
  async getPrescriptions(): Promise<Prescription[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getPrescriptions()), 400);
    });
  }

  async getPrescriptionsByPatient(patientId: string): Promise<Prescription[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getPrescriptionsByPatient(patientId)), 300);
    });
  }

  async createPrescription(prescriptionData: PrescriptionForm): Promise<Prescription> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.addPrescription(prescriptionData)), 1000);
    });
  }

  // Request API
  async getRequests(): Promise<ReceptionistRequest[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.getRequests()), 400);
    });
  }

  async createRequest(patientId: string, checkupType: string, priority: 'Low' | 'Medium' | 'High' | 'Emergency' = 'Medium'): Promise<ReceptionistRequest> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.addRequest(patientId, checkupType, priority)), 600);
    });
  }

  async updateRequestStatus(id: string, status: 'Pending' | 'Approved' | 'Rejected'): Promise<ReceptionistRequest | null> {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.db.updateRequestStatus(id, status)), 500);
    });
  }

  // Checkup Types
  getCheckupTypes(): CheckupType[] {
    return [
      {
        id: 'neuro',
        name: 'Neurology Consultation',
        specialization: 'Neurologist',
        description: 'Brain and nervous system disorders',
        estimatedDuration: '30-45 minutes'
      },
      {
        id: 'nephro',
        name: 'Kidney Function Test',
        specialization: 'Nephrologist',
        description: 'Kidney and urinary system evaluation',
        estimatedDuration: '20-30 minutes'
      },
      {
        id: 'eye',
        name: 'Eye Examination',
        specialization: 'Eye Specialist',
        description: 'Vision and eye health assessment',
        estimatedDuration: '15-25 minutes'
      },
      {
        id: 'bone',
        name: 'Bone/Joint Consultation',
        specialization: 'Bone Specialist',
        description: 'Musculoskeletal system evaluation',
        estimatedDuration: '25-35 minutes'
      },
      {
        id: 'cardio',
        name: 'Heart Checkup',
        specialization: 'Cardiologist',
        description: 'Cardiovascular system assessment',
        estimatedDuration: '30-40 minutes'
      },
      {
        id: 'general',
        name: 'General Health Checkup',
        specialization: 'General Physician',
        description: 'Comprehensive health evaluation',
        estimatedDuration: '20-30 minutes'
      }
    ];
  }
}

// Export singleton instance
export const clinicAPI = new ClinicAPI();
