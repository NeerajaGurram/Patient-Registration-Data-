import { Patient, User } from '../types';

// Simulate database operations
export const storage = {
  getUsers: (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  },

  getPatients: (): Patient[] => {
    const patients = localStorage.getItem('patients');
    return patients ? JSON.parse(patients) : [];
  },

  addUser: (user: User) => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  },

  addPatient: (patient: Patient) => {
    const patients = storage.getPatients();
    patients.push(patient);
    localStorage.setItem('patients', JSON.stringify(patients));
  },

  updatePatient: (updatedPatient: Patient) => {
    const patients = storage.getPatients();
    const index = patients.findIndex(p => p.id === updatedPatient.id);
    if (index !== -1) {
      patients[index] = updatedPatient;
      localStorage.setItem('patients', JSON.stringify(patients));
    }
  },

  getPatientById: (id: string): Patient | undefined => {
    const patients = storage.getPatients();
    return patients.find(p => p.id === id);
  },

  getPatientByUserId: (userId: string): Patient | undefined => {
    const patients = storage.getPatients();
    return patients.find(p => p.userId === userId);
  },

  authenticate: (email: string, password: string): User | null => {
    const users = storage.getUsers();
    return users.find(u => u.email === email && u.password === password) || null;
  },
};
