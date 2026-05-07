// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

export const validateAge = (dateOfBirth: string): boolean => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= 0 && age <= 150;
};

export const validateZipCode = (zipCode: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

export const validateBloodType = (bloodType: string): boolean => {
  const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return validBloodTypes.includes(bloodType);
};

export const validateGender = (gender: string): boolean => {
  const validGenders = ['Male', 'Female', 'Other'];
  return validGenders.includes(gender);
};

// Form validation interface
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Patient form validation
export const validatePatientForm = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  // Required field validations
  if (!validateRequired(formData.firstName)) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }

  if (!validateRequired(formData.lastName)) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  }

  if (!validateRequired(formData.email)) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(formData.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!validateRequired(formData.phone)) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!validatePhone(formData.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
  }

  if (!validateRequired(formData.dateOfBirth)) {
    errors.push({ field: 'dateOfBirth', message: 'Date of birth is required' });
  } else if (!validateAge(formData.dateOfBirth)) {
    errors.push({ field: 'dateOfBirth', message: 'Please enter a valid date of birth' });
  }

  if (!validateRequired(formData.gender)) {
    errors.push({ field: 'gender', message: 'Gender is required' });
  } else if (!validateGender(formData.gender)) {
    errors.push({ field: 'gender', message: 'Please select a valid gender' });
  }

  if (!validateRequired(formData.bloodType)) {
    errors.push({ field: 'bloodType', message: 'Blood type is required' });
  } else if (!validateBloodType(formData.bloodType)) {
    errors.push({ field: 'bloodType', message: 'Please select a valid blood type' });
  }

  // Address validations
  if (!validateRequired(formData.address.street)) {
    errors.push({ field: 'address.street', message: 'Street address is required' });
  }

  if (!validateRequired(formData.address.city)) {
    errors.push({ field: 'address.city', message: 'City is required' });
  }

  if (!validateRequired(formData.address.state)) {
    errors.push({ field: 'address.state', message: 'State is required' });
  }

  if (!validateRequired(formData.address.zipCode)) {
    errors.push({ field: 'address.zipCode', message: 'ZIP code is required' });
  } else if (!validateZipCode(formData.address.zipCode)) {
    errors.push({ field: 'address.zipCode', message: 'Please enter a valid ZIP code' });
  }

  // Emergency contact validations
  if (!validateRequired(formData.emergencyContact.name)) {
    errors.push({ field: 'emergencyContact.name', message: 'Emergency contact name is required' });
  }

  if (!validateRequired(formData.emergencyContact.phone)) {
    errors.push({ field: 'emergencyContact.phone', message: 'Emergency contact phone is required' });
  } else if (!validatePhone(formData.emergencyContact.phone)) {
    errors.push({ field: 'emergencyContact.phone', message: 'Please enter a valid emergency contact phone number' });
  }

  if (!validateRequired(formData.emergencyContact.relationship)) {
    errors.push({ field: 'emergencyContact.relationship', message: 'Emergency contact relationship is required' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Staff form validation
export const validateStaffForm = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  // Required field validations
  if (!validateRequired(formData.firstName)) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }

  if (!validateRequired(formData.lastName)) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  }

  if (!validateRequired(formData.username)) {
    errors.push({ field: 'username', message: 'Username is required' });
  } else if (!validateMinLength(formData.username, 3)) {
    errors.push({ field: 'username', message: 'Username must be at least 3 characters long' });
  }

  if (!validateRequired(formData.email)) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(formData.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!validateRequired(formData.password)) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (!validateMinLength(formData.password, 6)) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
  }

  if (!validateRequired(formData.confirmPassword)) {
    errors.push({ field: 'confirmPassword', message: 'Please confirm your password' });
  } else if (formData.password !== formData.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
  }

  if (!validateRequired(formData.role)) {
    errors.push({ field: 'role', message: 'Role is required' });
  }

  if (!validateRequired(formData.department)) {
    errors.push({ field: 'department', message: 'Department is required' });
  }

  if (!validateRequired(formData.phone)) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!validatePhone(formData.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Appointment form validation
export const validateAppointmentForm = (formData: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!validateRequired(formData.patientId)) {
    errors.push({ field: 'patientId', message: 'Patient selection is required' });
  }

  if (!validateRequired(formData.checkupType)) {
    errors.push({ field: 'checkupType', message: 'Appointment type is required' });
  }

  if (!validateRequired(formData.preferredDate)) {
    errors.push({ field: 'preferredDate', message: 'Preferred date is required' });
  }

  if (!validateRequired(formData.preferredTime)) {
    errors.push({ field: 'preferredTime', message: 'Preferred time is required' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

