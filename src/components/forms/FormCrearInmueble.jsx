
import { CButton,CFormSelect, CCard, CCardTitle, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow, CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter } from '@coreui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { usePropietarios } from '../../hooks/propietarios.hooks';
import { useTipoServicios } from '../../hooks/tipoServicio.hooks';
const addInmuebleApi = async ({ formData }) => {
    const PATH = 'http://localhost:3000/api/inmuebles';
    const response = await axios.post(PATH, formData);
    return response.data.data;
    };

export default function FormCrearInmueble() {   
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { propietarios } = usePropietarios();
  const { tiposervicios } = useTipoServicios();
  const [formData, setFormData] = useState({
    tipo: "",
    mtrs: "",
    descripcion: "",
    precioDolar:"",
    direccionCalle: "",
    direccionNumero: "",
    fechaConstruccion: "",
    fechaPublicacion: "",
    requisitos: "",
    propietario: "",
    tipoServicio: "",
    localidad: "",
    // campos opcionales por tipo
    piso: "",
    depto: "",
    precioExpensas:"",
    cantAmbientes: "",
    cantBanios: "",
    patio: false,
    pileta: false,
    balcon: false,
    techo: false,
    tipoVehiculo: "",
    nroParcela: "",
    zonificacion: "",
  });

  const [showModal, setShowModal] = useState(false);
  const { mutate, error } = useMutation({
    mutationFn: addInmuebleApi,
    onSuccess: ( data ) => {
      queryClient.invalidateQueries(['inmuebles']);
      setFormData(data);
      setShowModal(true);
    },
    onError: (err) => {
      console.error(err);
    }
  });

const opcionesPropietarios = propietarios?.map((pro) => ({
  value: pro.id,
  label: `${pro.nombrePropietario} ${pro.apellidoPropietario}`,
})).sort((a, b) => a.label.localeCompare(b.label)) || [];

const opcionesTipoServicio = tiposervicios?.map((tipoS) => ({
  value: tipoS.id,
  label: tipoS.nombreTipoServicio,
})).sort((a, b) => a.label.localeCompare(b.label)) || [];

  const handleSubmit = (e) => {
  e.preventDefault();
  
  const baseData = {
    tipo: formData.tipo,
    mtrs: Number(formData.mtrs),
    descripcion: formData.descripcion,
    precioDolar: Number(formData.precioDolar),
    direccionCalle: formData.direccionCalle,
    direccionNumero: Number(formData.direccionNumero),
    fechaConstruccion: formData.fechaConstruccion,
    fechaPublicacion: formData.fechaPublicacion,
    requisitos: formData.requisitos,
    propietario: Number(formData.propietario),
    tipoServicio: Number(formData.tipoServicio),
    localidad: Number(formData.localidad),
  };

  // Agregar SOLO campos del tipo específico
  if (formData.tipo === 'casa') {
    baseData.cantAmbientes = Number(formData.cantAmbientes);
    baseData.cantBanios = Number(formData.cantBanios);
    baseData.patio = formData.patio;
    baseData.pileta = formData.pileta;
  } else if (formData.tipo === 'departamento') {
    baseData.piso = Number(formData.piso);
    baseData.depto = formData.depto;
    baseData.precioExpensas = Number(formData.precioExpensas);
    baseData.cantAmbientes = Number(formData.cantAmbientes);
    baseData.cantBanios = Number(formData.cantBanios);
    baseData.balcon = formData.balcon;
  } else if (formData.tipo === 'cochera') {
    baseData.techo = formData.techo;
    baseData.tipoVehiculo = formData.tipoVehiculo;
  } else if (formData.tipo === 'terreno') {
    baseData.nroParcela = Number(formData.nroParcela);
    baseData.zonificacion = formData.zonificacion;
  }

  mutate({ formData: baseData });
};

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  //supuestamente usar el prev es mas seguro para condiciones de 
  // carrera que usar el ...formdata
  setFormData((prev) => {
    let newVal;
    if (type === 'checkbox') {
      newVal = checked;
    } else if (type === 'number') {
      newVal = value === '' ? '' : Number(value);
    } else {
      newVal = value;
    }
    return {
      ...prev,
      [name]: newVal,
    };
  });
};
  const handleCloseModal = () => {
    setShowModal(false)
    navigate('/inmuebles'); 
  };
   const handleCancelar = () => {
    window.history.back();
  };


  return (
    <CCard className= "p-3 w-100 bg-light">
      <CCardBody>
      <CCardTitle>
        Nuevo Inmueble
      </CCardTitle>
        <CForm onSubmit={handleSubmit} className= "mt-3">
        <CRow>
           <CFormLabel htmlFor="tipo">Tipo de Inmueble</CFormLabel>
            <CFormSelect
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required>
            <option value="">-- Selecciona un tipo --</option>
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="cochera">Cochera</option>
            <option value="terreno">Terreno</option>
            </CFormSelect>
        </CRow>
        <CRow>
            <CFormLabel htmlFor="mtrs">
            Metros*
            </CFormLabel>
            <CFormInput
            type="number"
            id="mtrs"
            name="mtrs"
            placeholder="Metros cuadrados del inmueble"
            value={formData.mtrs}
            onChange={handleChange}
            required
            className="mb-3"
            />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="descripcion">Descripción</CFormLabel>
            <CFormInput
                type="text"
                id="descripcion"
                placeholder='Descripción  detallada de su inmueble'
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="mb-3"
                required
            />
        </CRow>
        <CRow>
          <CFormLabel htmlFor='precioDolar'>
            Precio según tipo de servicio (mensual, cuatrimestral, anual o total)*
          </CFormLabel>
          <CFormInput
            type="number"
            name="precioDolar"
            id='precioDolar'
            placeholder="precio en dolares (usd)"
            value={formData.precioDolar}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor='direccionCalle'>
            Calle*
          </CFormLabel>
          <CFormInput
            type="text"
            name="direccionCalle"
            id='direccionCalle'
            placeholder="Calle del inmueble"
            value={formData.direccionCalle}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor='direccionNumero'>
            Número*
          </CFormLabel>
          <CFormInput
            type="number"
            name="direccionNumero"
            id='direccionNumero'
            placeholder="Número del inmueble"
            value={formData.direccionNumero}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor='fechaConstruccion'>
            fecha de construcción*
          </CFormLabel>
          <CFormInput
            type="date"
            name="fechaConstruccion"
            id='fechaConstruccion'
            placeholder="Fecha de construcción del inmueble"
            value={formData.fechaConstruccion}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor='fechaPublicacion'>
            fecha de publicación (seleccionar día de hoy o mas adelante)*
          </CFormLabel>
          <CFormInput
            type="date"
            name="fechaPublicacion"
            id='fechaPublicacion'
            placeholder=" fecha publicación del inmueble"
            value={formData.fechaPublicacion}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor='requisitos'>
            Requisitos*
          </CFormLabel>
          <CFormInput
            type="text"
            name="requisitos"
            id='requisitos'
            placeholder="Requisitos del inmueble"
            value={formData.requisitos}
            onChange={handleChange}
            className="mb-3"
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="propietario">Propietario</CFormLabel>
          <CFormSelect
            id="propietario"
            name="propietario"
            value={formData.propietario}
            onChange={handleChange}
            required
          >
            <option value="">Seleccioná un propietario</option>
            {opcionesPropietarios.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </CFormSelect>
        </CRow>
        <CRow>
          <CFormLabel htmlFor="tipoServicio">Tipo de servicio</CFormLabel>
          <CFormSelect
            id="tipoServicio"
            name="tipoServicio"
            value={formData.tipoServicio}
            onChange={handleChange}
            required
          >
            <option value="">Seleccioná un tipo de servicio</option>
            {opcionesTipoServicio.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </CFormSelect>
        </CRow>
        <CRow>
          <CFormLabel htmlFor='localidad'>
            Id de la localidad*
          </CFormLabel> 
          <CFormInput
            type="number"
            name="localidad"
            id='localidad'
            placeholder="Id de la localidad del inmueble"
            value={formData.localidad}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        {formData.tipo === "departamento" && (
        <>
        <CRow>
          <CFormLabel htmlFor="piso">Piso</CFormLabel>
          <CFormInput
            type="number"
            id="piso"
            name="piso"
            value={formData.piso}
            onChange={handleChange}
            placeholder="En que piso está el departamento"
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="depto">Número o sección de departamento</CFormLabel>
          <CFormInput
            type="text"
            id="depto"
            name="depto"
            value={formData.depto}
            onChange={handleChange}
            placeholder="Número de departamento"
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor='precioExpensas'>
            Precio de las expensas*
          </CFormLabel>
          <CFormInput
            type="number"
            name="precioExpensas"
            id='precioExpensas'
            placeholder="precio de expensas (pesos)"
            value={formData.precioExpensas}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="balcon">Balcón</CFormLabel>
          <input
            type="checkbox"
            id="balcon"
            name="balcon"
            checked={formData.balcon}
            onChange={handleChange}
            className="mb-3"
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="cantAmbientes">Cantidad de ambientes</CFormLabel>
          <CFormInput
            type="number"
            id="cantAmbientes"
            name="cantAmbientes"
            value={formData.cantAmbientes}
            onChange={handleChange}
            placeholder="Cantidad de ambientes del departamento"
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="cantBanios">Cantidad de baños</CFormLabel>
          <CFormInput
            type="number"
            id="cantBanios"
            name="cantBanios"
            value={formData.cantBanios}
            onChange={handleChange}
            placeholder="Cantidad de baños del departamento"
            className="mb-3"
            required
          />
        </CRow>
        </>
      )}

      {formData.tipo === "casa" && (
        <>
        <CRow>
          <CFormLabel htmlFor="cantAmbientes">Cantidad de ambientes</CFormLabel>
          <CFormInput
            type="number"
            id="cantAmbientes"
            name="cantAmbientes"
            value={formData.cantAmbientes}
            onChange={handleChange}
            placeholder="Cantidad de ambientes de la casa"
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="cantBanios">Cantidad de baños</CFormLabel>
          <CFormInput
            type="number"
            id="cantBanios"
            name="cantBanios"
            value={formData.cantBanios}
            onChange={handleChange}
            placeholder="Cantidad de baños de la casa"
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="patio">Patio</CFormLabel>
          <input
            type="checkbox"
            id="patio"
            name="patio"
            checked={formData.patio}
            onChange={handleChange}
            className="mb-3"
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="pileta">Pileta</CFormLabel>
          <input
            type="checkbox"
            id="pileta"
            name="pileta"
            checked={formData.pileta}
            onChange={handleChange}
            className="mb-3"
          />
        </CRow>
        </>
      )}

      {formData.tipo === "cochera" && (
        <>
        <CRow>
          <CFormLabel htmlFor="techo">Techo</CFormLabel>
          <input
            type="checkbox"
            id="techo"
            name="techo"
            checked={formData.techo}
            onChange={handleChange}
            className="mb-3"
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="tipoVehiculo">Tipo de vehículo</CFormLabel>
          <CFormInput
            type="text"
            id="tipoVehiculo"
            name="tipoVehiculo"
            value={formData.tipoVehiculo}
            onChange={handleChange}
            placeholder="Tipos de vehículo permimtidos en la cochera"
            className="mb-3"
            required
          />
        </CRow>
        </>
      )}

      {formData.tipo === "terreno" && (
        <>
        <CRow>
          <CFormLabel htmlFor="nroParcela">Número de parcela</CFormLabel>
          <CFormInput
            type="number"
            id="nroParcela"
            name="nroParcela"
            value={formData.nroParcela}
            onChange={handleChange}
            placeholder="Número de parcela"
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor="zonificacion">Zonificación</CFormLabel>
          <CFormInput
            type="text"
            id="zonificacion"
            name="zonificacion"
            value={formData.zonificacion}
            onChange={handleChange}
            placeholder="Zonificación"
            className="mb-3"
            required
          />
        </CRow>
        </>
      )}

        {error && (
            <div className="text-danger mb-3">
              {error.response?.data?.message || error.message}
            </div>
          )}
        <CRow className='justify-content-end'>
          <CCol lg={1}>
          <CButton type='button' color='secondary' className='mt-3 mx-3' onClick={handleCancelar}>Cancelar</CButton>
          </CCol>
          <CCol lg={1}>
          <CButton type='submit' color='primary'className='mt-3 mx-3'>Guardar</CButton>
          </CCol>
        </CRow>
        </CForm>

        {/* Modal de create exitoso */}
        <CModal visible={showModal} onClose={handleCloseModal}>
          <CModalHeader>
            <CModalTitle>Guardado exitoso</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p><strong>{formData?.tipo}</strong> guardado/a</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={handleCloseModal}>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>

  );
}


