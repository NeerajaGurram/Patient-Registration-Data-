import React, { useState } from 'react';
import { Patient } from '../types';
import { PatientForm } from './PatientForm';

interface PatientDetailsProps {
  patient: Patient;
  isAdmin: boolean;
  onUpdate: (patient: Patient) => void;
}

export function PatientDetails({ patient, isAdmin=true, onUpdate }: PatientDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (formData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const updatedPatient: Patient = {
      ...patient,
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedPatient);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white shadow sm:rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Patient Details</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="text-gray-600 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
        <PatientForm initialData={patient} onSubmit={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Patient Information
          </h3>
          {(isAdmin || patient.id === localStorage.getItem('currentUserId')) && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patient.firstName} {patient.lastName}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patient.email}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {new Date(patient.dateOfBirth).toLocaleDateString()}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patient.phone}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patient.address}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Medical History</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {patient.medicalHistory || 'No medical history recorded'}
            </dd>
          </div>
          {patient.imageUrl && (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Profile Image</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <img
                  src={patient.imageUrl}
                  alt={`${patient.firstName} ${patient.lastName}`}
                  className="h-32 w-32 rounded-full object-cover"
                />
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}