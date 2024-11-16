export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  address: string;
  medicalHistory: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId: string,
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'patient';
  patientId?: string;
}