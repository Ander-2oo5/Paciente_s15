import React, { useState, useEffect } from 'react';

interface Patient {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
}

interface PatientFormProps {
  onPatientAdded: (newPatient: Patient) => void;
  editingPatient: Patient | null;
  onPatientUpdated: (updatedPatient: Patient) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onPatientAdded, editingPatient, onPatientUpdated }) => {
  const [patient, setPatient] = useState<Omit<Patient, 'id'>>({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    telefono: ''
  });

  useEffect(() => {
    if (editingPatient) {
      setPatient(editingPatient);
    }
  }, [editingPatient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      fetch(`/api/clinicadental/pacientes/${editingPatient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Patient updated:', data);
        onPatientUpdated(data);
      })
      .catch(error => console.error('Error updating patient:', error));
    } else {
      fetch('/api/clinicadental/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Patient created:', data);
        onPatientAdded(data);
      })
      .catch(error => console.error('Error creating patient:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={patient.nombre} onChange={handleChange} />
      </div>
      <div>
        <label>Apellido:</label>
        <input type="text" name="apellido" value={patient.apellido} onChange={handleChange} />
      </div>
      <div>
        <label>Fecha de Nacimiento:</label>
        <input type="date" name="fechaNacimiento" value={patient.fechaNacimiento} onChange={handleChange} />
      </div>
      <div>
        <label>Teléfono:</label>
        <input type="text" name="telefono" value={patient.telefono} onChange={handleChange} />
      </div>
      <button type="submit">{editingPatient ? 'Actualizar Paciente' : 'Registrar Paciente'}</button>
    </form>
  );
};

export default PatientForm;