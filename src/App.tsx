import React, { useState } from 'react';
import './App.css';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';

interface Patient {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
}

const App: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [message, setMessage] = useState<string>('');
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const handlePatientAdded = (newPatient: Patient) => {
    setPatients([...patients, newPatient]);
    setMessage('Patient added successfully!');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const handlePatientUpdated = (updatedPatient: Patient) => {
    setPatients(patients.map(patient => (patient.id === updatedPatient.id ? updatedPatient : patient)));
    setMessage('Patient updated successfully!');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    setEditingPatient(null);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
  };

  const handleDelete = (id: number) => {
    fetch(`/api/clinicadental/pacientes/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setPatients(patients.filter(patient => patient.id !== id));
      setMessage('Patient deleted successfully!');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    })
    .catch(error => console.error('Error deleting patient:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Registro de Pacientes</h1>
      </header>
      {message && <div className="success-message">{message}</div>}
      <PatientForm 
        onPatientAdded={handlePatientAdded} 
        editingPatient={editingPatient} 
        onPatientUpdated={handlePatientUpdated} 
      />
      <PatientList 
        patients={patients} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;