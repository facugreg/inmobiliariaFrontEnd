import React from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";

export function ModalNecesitaLogueo({showModal, setShowModal}) {
  return (
    <CModal visible={showModal} onClose={() => setShowModal(false)}>
          <CModalHeader>
            <CModalTitle>Acceso requerido</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Debés iniciar sesión para compartir tu opinión.
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => setShowModal(false)}>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
  );
}