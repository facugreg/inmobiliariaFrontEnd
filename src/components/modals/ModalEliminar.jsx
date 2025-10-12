import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CButton,
} from '@coreui/react';

export default function ModalEliminar({
  visibleEliminar,
  setVisibleEliminar,
  handleConfirm,
  titulo,
}) {
  return (
    <CModal visible={visibleEliminar} onClose={() => setVisibleEliminar(false)}>
      <CModalHeader>
        <CModalTitle>Eliminar {titulo}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>¿Está seguro? La accion no se podrá deshacer</p>
      </CModalBody>
      <CModalFooter>
        <CButton
          onClick={() => {
            setVisibleEliminar(false);
          }}
          color="secondary"
        >
          Cancelar
        </CButton>
        <CButton onClick={handleConfirm} color="danger">
          Eliminar
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
