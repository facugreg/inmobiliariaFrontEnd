
import { CForm, CFormInput, CFormTextarea} from '@coreui/react';

export function FormSolicitudVisita({onSubmit}) {
  return (
    <CForm id="visita-form" onSubmit={onSubmit}>
            <CFormInput
              type="date"
              label="Fecha"
              placeholder="Seleccione una fecha"
              className="mb-3"
              required
            />
            <CFormInput
              type="text"
              label="Telefono de contacto"
              placeholder="3364-123456"
              className="mb-3"
              required
            />
            <CFormTextarea
              type="text"
              label="Observaciones"
              placeholder="Ingrese alguna observación de ser necesario"
              className="mb-3"
            />
          </CForm>
  );
}