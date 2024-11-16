import React from 'react';
import { Patient } from '../types';

interface PatientListProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

export function PatientList({ patients, onSelectPatient }: PatientListProps) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {patients.map((patient) => (
          <li key={patient.id}>
            <button
              onClick={() => onSelectPatient(patient)}
              className="block hover:bg-gray-50 w-full text-left"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {patient.imageUrl && (
                      <img
                        src={patient.imageUrl}
                        alt={`${patient.firstName} ${patient.lastName}`}
                        className="h-10 w-10 rounded-full mr-4 object-cover"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {patient.email}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <p className="text-sm text-gray-500">ID: {patient.id.slice(0, 8)}</p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}