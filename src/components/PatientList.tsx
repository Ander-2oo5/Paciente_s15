import React from 'react';

interface Patient {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  telefono: string;
}

interface PatientListProps {
  patients: Patient[];
  onEdit: (patient: Patient) => void;
  onDelete: (id: number) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onEdit, onDelete }) => {
  return (
    <div className="PatientList">
      <h2>Patient List</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.nombre}</td>
              <td>{patient.apellido}</td>
              <td>{patient.fechaNacimiento}</td>
              <td>{patient.telefono}</td>
              <td>
                <button onClick={() => onEdit(patient)}>Editar</button>
                <button className="delete-button" onClick={() => onDelete(patient.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;