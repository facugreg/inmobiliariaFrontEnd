
import { CButton, CCard, CCardTitle, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow, CModal, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useInmueble from '../../pages/admin/inmueble/getInmueble';


const updateInmuebleApi = async ({ id, formData }) => {
  const response = await axios.put(`http://localhost:3000/api/inmuebles/${id}`, formData);
  return response.data?.data ?? response.data;
};

export function FormUpdateInmueble({ id }) {   
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    mtrs: "",
    descripcion: "",
    fechaConstruccion: "",
    fechaPublicacion: "",
    requisitos: "",
    propietario: "",
    tipoServicio: "",
    // campos opcionales por tipo
    depto: "",
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
  const { inmueble, isLoading } = useInmueble(id);
  const [tipo, setTipo] = useState('');

useEffect(() => {
  if (inmueble) {
    console.log('🔍 inmueble.tipo:', inmueble.tipo);
    setTipo(inmueble.tipo);
    const baseData = {
      descripcion: inmueble.descripcion,
      mtrs: inmueble.mtrs,
      requisitos: inmueble.requisitos,
      propietario: inmueble.propietario?.id || '',
      tipoServicio: inmueble.tipoServicio?.id || '',
      fechaConstruccion: inmueble.fechaConstruccion?.split('T')[0] || '',
      fechaPublicacion: inmueble.fechaPublicacion?.split('T')[0] || '',
    };

    // Agrega solo los campos del tipo específico
    if (inmueble.tipo === 'departamento') {
      baseData.depto = inmueble.depto;
      baseData.cantAmbientes = inmueble.cantAmbientes;
      baseData.cantBanios = inmueble.cantBanios;
      baseData.balcon = inmueble.balcon;
    } else if (inmueble.tipo === 'casa') {
      baseData.cantAmbientes = inmueble.cantAmbientes;
      baseData.cantBanios = inmueble.cantBanios;
      baseData.patio = inmueble.patio;
      baseData.pileta = inmueble.pileta;
    } else if (inmueble.tipo === 'cochera') {
      baseData.techo = inmueble.techo;
      baseData.tipoVehiculo = inmueble.tipoVehiculo;
    } else if (inmueble.tipo === 'terreno') {
      baseData.nroParcela = inmueble.nroParcela;
      baseData.zonificacion = inmueble.zonificacion;
    }

    setFormData(baseData);
  }
}, [inmueble]);
  const { mutate, isError, error } = useMutation({
    mutationFn: updateInmuebleApi,
     onSuccess: () => {
      queryClient.invalidateQueries(['inmueble', id]);
      setShowModal(true);
    },
    onError: (err) => {
      console.error(err);
      console.error('server response:', err.response?.data);
    }
  });

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
const handleSubmit = (e) => {
  e.preventDefault();
  
  const dataToSend = {
    tipo: tipo,
    descripcion: formData.descripcion,
    mtrs: formData.mtrs,
    requisitos: formData.requisitos,
    fechaConstruccion: formData.fechaConstruccion,
    fechaPublicacion: formData.fechaPublicacion,
    direccionCalle: inmueble.direccionCalle,
    direccionNumero: inmueble.direccionNumero,
    
    // Solo IDs, no objetos
    propietario: formData.propietario,
    tipoServicio: formData.tipoServicio,
    localidad: inmueble.localidad?.id || inmueble.localidad,
    
    // Campos específicos por tipo
    ...(tipo === 'departamento' && {
      depto: formData.depto,
      cantAmbientes: formData.cantAmbientes,
      cantBanios: formData.cantBanios,
      balcon: formData.balcon,
    }),
    ...(tipo === 'casa' && {
      cantAmbientes: formData.cantAmbientes,
      cantBanios: formData.cantBanios,
      patio: formData.patio,
      pileta: formData.pileta,
    }),
    ...(tipo === 'cochera' && {
      techo: formData.techo,
      tipoVehiculo: formData.tipoVehiculo,
    }),
    ...(tipo === 'terreno' && {
      nroParcela: formData.nroParcela,
      zonificacion: formData.zonificacion,
    }),
  };
  // convertir strings de fecha YYYY-MM-DD a ISO (el backend suele esperar parseable)
if (dataToSend.fechaConstruccion && typeof dataToSend.fechaConstruccion === 'string') {
  dataToSend.fechaConstruccion = new Date(dataToSend.fechaConstruccion).toISOString();
}
if (dataToSend.fechaPublicacion && typeof dataToSend.fechaPublicacion === 'string') {
  dataToSend.fechaPublicacion = new Date(dataToSend.fechaPublicacion).toISOString();
}

// asegurar que los ids de relaciones son números (si vienen como string)
dataToSend.propietario = Number(dataToSend.propietario);
dataToSend.tipoServicio = Number(dataToSend.tipoServicio);
dataToSend.localidad = Number(dataToSend.localidad);

  console.log('Enviando:', dataToSend);
  mutate({ id, formData: dataToSend }); 
};

  if (isLoading) return <p>Cargando datos...</p>;

  return (
    <CCard className="p-3 w-100 bg-light">
      <CCardBody>
        <CCardTitle>Modificar Inmueble</CCardTitle>
        <CForm onSubmit={handleSubmit} className="mt-3">
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
          <CFormLabel htmlFor='propietario'>
            Id del propietario*
          </CFormLabel>
          <CFormInput
            type="number"
            name="propietario"
            id='propietario'
            placeholder="Id del propietario del inmueble"
            value={formData.propietario}
            onChange={handleChange}
            className="mb-3"
            required
          />
        </CRow>
        <CRow>
          <CFormLabel htmlFor='tipoServicio'>
            Id del tipo de Servicio*
          </CFormLabel> 
          <CFormInput
            type="number"
            name="tipoServicio"
            id='tipoServicio'
            placeholder="Id del tipo de Servicio del inmueble"
            value={formData.tipoServicio}
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
            fecha de publicación (seleccionar día de hoy o dejar la fecha anterior)*
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
        {tipo === "departamento" && (
        <>
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

      {tipo === "casa" && (
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

      {tipo === "cochera" && (
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

      {tipo === "terreno" && (
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

          {isError && <div className="text-danger mb-3">{error.message}</div>}
          <CRow className="justify-content-end">
            <CCol lg={1}>
              <CButton type="button" color="secondary" className="mt-3 mx-3" onClick={() => navigate('/inmuebles')}>
                Cancelar
              </CButton>
            </CCol>
            <CCol lg={1}>
              <CButton type="submit" color="primary" className="mt-3 mx-3">
                Guardar
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CModal visible={showModal} onClose={() => setShowModal(false)}>
          <CModalHeader>
            <CModalTitle>Guardado exitoso</CModalTitle>
          </CModalHeader>
          <CModalFooter>
            <CButton color="primary" onClick={() => navigate('/inmuebles')}>
              Cerrar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
}
