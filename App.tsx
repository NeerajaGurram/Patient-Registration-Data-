import React, { useState, useEffect } from 'react';
import { User, Patient } from './types';
import { storage } from './utils/storage';
import { AuthForm } from './components/AuthForm';
import { PatientForm } from './components/PatientForm';
import { PatientList } from './components/PatientList';
import { PatientDetails } from './components/PatientDetails';
import { UserCircle } from 'lucide-react';

// Initialize admin user if not exists
if (storage.getUsers().length === 0) {
  storage.addUser({
    id: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  });
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'patient') {
      const patientData = storage.getPatientByUserId(user.id);
      if (patientData) {
        setSelectedPatient(patientData);
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedPatient(null);
  };

  const handleCreatePatient = (formData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatient: Patient = {
      ...formData,
      id: crypto.randomUUID(),
      userId: currentUser!.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    storage.addPatient(newPatient);
    setSelectedPatient(newPatient);
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    storage.updatePatient(updatedPatient);
    setSelectedPatient(updatedPatient);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm onSuccess={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <UserCircle className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Patient Management System
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">
                {currentUser.email} ({currentUser.role})
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentUser.role === 'admin' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h2 className="text-lg font-medium text-gray-900">Patients</h2>
                <PatientList
                  patients={storage.getPatients()}
                  onSelectPatient={setSelectedPatient}
                />
              </div>
            </div>
            <div className="md:col-span-2">
              {selectedPatient ? (
                <PatientDetails
                  patient={selectedPatient}
                  // isAdmin={true}
                  onUpdate={handleUpdatePatient}
                />
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  Select a patient to view details
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {selectedPatient ? (
              <PatientDetails
                patient={selectedPatient}
                // isAdmin={false}
                onUpdate={handleUpdatePatient}
              />
            ) : (
              <div className="bg-white shadow sm:rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Complete Your Profile
                </h2>
                <PatientForm onSubmit={handleCreatePatient} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;