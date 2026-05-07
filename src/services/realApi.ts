// Real API service for connecting to backend
const API_BASE_URL = 'http://localhost:5000/api';

class RealClinicAPI {
  private token: string | null = null;

  constructor() {
    // Get token from localStorage on initialization
    this.token = localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'API request failed');
      }

      return data.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(identifier: string, password: string) {
    const response = await this.request<{ user: any; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });

    this.token = response.token;
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userData', JSON.stringify(response.user));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', response.user.role);
    localStorage.setItem('username', response.user.username);

    return response;
  }

  async register(userData: any) {
    const response = await this.request<{ user: any; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    this.token = response.token;
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userData', JSON.stringify(response.user));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', response.user.role);
    localStorage.setItem('username', response.user.username);

    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
    }
  }

  async getCurrentUser() {
    return this.request<{ user: any }>('/auth/me');
  }

  // Patient methods
  async getPatients(params?: { page?: number; limit?: number; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/patients?${queryString}` : '/patients';
    
    return this.request<{ patients: any[]; pagination: any }>(endpoint);
  }

  async getPatient(id: string) {
    return this.request<{ patient: any }>(`/patients/${id}`);
  }

  async createPatient(patientData: any) {
    return this.request<{ patient: any }>('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  }

  async updatePatient(id: string, patientData: any) {
    return this.request<{ patient: any }>(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    });
  }

  async searchPatients(query: string) {
    return this.request<{ patients: any[] }>(`/patients/search?q=${encodeURIComponent(query)}`);
  }

  async registerPatient(patientData: any) {
    return this.request<{ patient: any }>('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  }

  async registerStaff(staffData: any) {
    return this.request<{ user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(staffData),
    });
  }

  // Doctor methods
  async getDoctors(params?: { specialization?: string; available?: boolean }) {
    const queryParams = new URLSearchParams();
    if (params?.specialization) queryParams.append('specialization', params.specialization);
    if (params?.available !== undefined) queryParams.append('available', params.available.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/doctors?${queryString}` : '/doctors';
    
    return this.request<{ doctors: any[] }>(endpoint);
  }

  async getDoctor(id: string) {
    return this.request<{ doctor: any }>(`/doctors/${id}`);
  }

  async getDoctorSpecializations() {
    return this.request<{ specializations: string[] }>('/doctors/specializations');
  }

  async getDoctorAppointments(doctorId: string, params?: { date?: string; status?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.date) queryParams.append('date', params.date);
    if (params?.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/doctors/${doctorId}/appointments?${queryString}` : `/doctors/${doctorId}/appointments`;
    
    return this.request<{ appointments: any[] }>(endpoint);
  }

  // Appointment methods
  async getAppointments(params?: {
    page?: number;
    limit?: number;
    date?: string;
    doctor?: string;
    patient?: string;
    status?: string;
    type?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/appointments?${queryString}` : '/appointments';
    
    return this.request<{ appointments: any[]; pagination: any }>(endpoint);
  }

  async getAppointment(id: string) {
    return this.request<{ appointment: any }>(`/appointments/${id}`);
  }

  async createAppointment(appointmentData: any) {
    return this.request<{ appointment: any }>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointment(id: string, appointmentData: any) {
    return this.request<{ appointment: any }>(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
  }

  async cancelAppointment(id: string, reason?: string) {
    return this.request(`/appointments/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ reason }),
    });
  }

  async getAvailableSlots(doctorId: string, date: string, duration?: number) {
    const queryParams = new URLSearchParams();
    queryParams.append('doctorId', doctorId);
    queryParams.append('date', date);
    if (duration) queryParams.append('duration', duration.toString());

    return this.request<{ availableSlots: string[] }>(`/appointments/available-slots?${queryParams.toString()}`);
  }

  async getDoctorSchedule(doctorId: string, date: string) {
    return this.request<{ schedule: any[] }>(`/appointments/doctor/${doctorId}/schedule?date=${date}`);
  }

  // Dashboard methods
  async getDashboardStats() {
    return this.request<{ stats: any }>('/dashboard/stats');
  }

  async getRecentActivities(limit?: number) {
    const queryParams = limit ? `?limit=${limit}` : '';
    return this.request<{ activities: any[] }>(`/dashboard/recent-activities${queryParams}`);
  }

  async getUpcomingAppointments(limit?: number) {
    const queryParams = limit ? `?limit=${limit}` : '';
    return this.request<{ appointments: any[] }>(`/dashboard/upcoming-appointments${queryParams}`);
  }

  async getTodaySchedule() {
    return this.request<{ schedule: any[] }>('/dashboard/today-schedule');
  }

  // Prescription methods
  async getPrescriptions(params?: {
    page?: number;
    limit?: number;
    patient?: string;
    doctor?: string;
    status?: string;
  }) {
    const queryParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/prescriptions?${queryString}` : '/prescriptions';
    
    return this.request<{ prescriptions: any[]; pagination: any }>(endpoint);
  }

  async getPrescription(id: string) {
    return this.request<{ prescription: any }>(`/prescriptions/${id}`);
  }

  async createPrescription(prescriptionData: any) {
    return this.request<{ prescription: any }>('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescriptionData),
    });
  }

  async updatePrescription(id: string, prescriptionData: any) {
    return this.request<{ prescription: any }>(`/prescriptions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(prescriptionData),
    });
  }

  async deletePrescription(id: string) {
    return this.request(`/prescriptions/${id}`, {
      method: 'DELETE',
    });
  }

  async getPrescriptionsByPatient(patientId: string) {
    return this.request<{ prescriptions: any[] }>(`/prescriptions/patient/${patientId}`);
  }

  async getPrescriptionsByDoctor(doctorId: string) {
    return this.request<{ prescriptions: any[] }>(`/prescriptions/doctor/${doctorId}`);
  }

  async printPrescription(id: string) {
    return this.request<{ prescription: any }>(`/prescriptions/${id}/print`, {
      method: 'POST',
    });
  }

  // Billing methods
  async getBills() {
    return this.request<{ bills: any[] }>('/billing');
  }

  async createBill(billData: any) {
    return this.request<{ bill: any }>('/billing', {
      method: 'POST',
      body: JSON.stringify(billData),
    });
  }

  // User management methods (admin only)
  async getUsers(params?: { role?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.role) queryParams.append('role', params.role);

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/users?${queryString}` : '/users';
    
    return this.request<{ users: any[]; count: number }>(endpoint);
  }

  async getUser(id: string) {
    return this.request<{ user: any }>(`/users/${id}`);
  }

  async createUser(userData: any) {
    return this.request<{ user: any }>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id: string, userData: any) {
    return this.request<{ user: any }>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; message: string; timestamp: string; version: string }>('/health');
  }
}

// Create singleton instance
const realClinicAPI = new RealClinicAPI();

export default realClinicAPI;
