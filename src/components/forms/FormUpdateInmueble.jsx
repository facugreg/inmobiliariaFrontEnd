import { CFormSelect, CButton, CCard, CCardTitle, CCardBody, CCol, CForm, CFormInput, CFormLabel, CRow, CModal, CModalHeader, CModalTitle, CModalFooter } from '@coreui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useInmueble from '../../pages/admin/inmueble/getInmueble';
import { usePropietarios } from '../../hooks/propietarios.hooks';
import { useTipoServicios } from '../../hooks/tipoServicio.hooks';


const updateInmuebleApi = async ({ id, formData }) => {
  const response = await axios.put(`http://localhost:3000/api/inmuebles/${id}`, formData);
  return response.data?.data ?? response.data;
};

export function FormUpdateInmueble({ id }) {   
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Solo los campos EDITABLES
  const [formData, setFormData] = useState({
    mtrs: "",
    descripcion: "",
    precioDolar:"",
    fechaConstruccion: "",
    fechaPublicacion: "",
    requisitos: "",
    propietario: "",
    tipoServicio: "",
    // campos opcionales por tipo (editables)
    depto: "",
    cantAmbientes: "",
    cantBanios: "",
    precioExpensas:"",
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
  const { propietarios } = usePropietarios();
  const { tiposervicios} = useTipoServicios();
  const opcionesPropietarios = propietarios
  ?.map((pro) => ({
    value: pro.id,
    label: `${pro.nombrePropietario} ${pro.apellidoPropietario}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label))|| [];

  const opcionesTipoServicio = tiposervicios?.map((tipoS) => ({
  value: tipoS.id,
  label: tipoS.nombreTipoServicio,
})).sort((a, b) => a.label.localeCompare(b.label)) || [];


  useEffect(() => {
    if (inmueble) {
      console.log('inmueble.tipo:', inmueble.tipo);
      setTipo(inmueble.tipo);
      
      const baseData = {
        descripcion: inmueble.descripcion,
        mtrs: inmueble.mtrs,
        precioDolar: inmueble.precioDolar,
        requisitos: inmueble.requisitos || '',
        propietario: inmueble.propietario?.id || '',
        tipoServicio: inmueble.tipoServicio?.id || '',
        fechaConstruccion: inmueble.fechaConstruccion?.split('T')[0] || '',
        fechaPublicacion: inmueble.fechaPublicacion?.split('T')[0] || '',
      };

      // Agrega solo los campos EDITABLES del tipo específico
      if (inmueble.tipo === 'departamento') {
        baseData.depto = inmueble.depto || '';
        baseData.precioExpensas = inmueble.precioExpensas || 0;
        baseData.cantAmbientes = inmueble.cantAmbientes || 0;
        baseData.cantBanios = inmueble.cantBanios || 0;
        baseData.balcon = inmueble.balcon || false;
      } else if (inmueble.tipo === 'casa') {
        baseData.cantAmbientes = inmueble.cantAmbientes || 0;
        baseData.cantBanios = inmueble.cantBanios || 0;
        baseData.patio = inmueble.patio || false;
        baseData.pileta = inmueble.pileta || false;
      } else if (inmueble.tipo === 'cochera') {
        baseData.techo = inmueble.techo || false;
        baseData.tipoVehiculo = inmueble.tipoVehiculo || '';
      } else if (inmueble.tipo === 'terreno') {
        baseData.nroParcela = inmueble.nroParcela || 0;
        baseData.zonificacion = inmueble.zonificacion || '';
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
      console.error('Error completo:', err);
      console.error('Respuesta del servidor:', err.response?.data);
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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
    
    // CLAVE: Empezamos con TODOS los datos del inmueble original
    // y solo sobreescribimos los campos editables
    const dataToSend = {
      tipo: tipo,
      
      // Campos NO editables (del inmueble original)
      direccionCalle: inmueble.direccionCalle,
      direccionNumero: inmueble.direccionNumero,
      localidad: inmueble.localidad?.id || inmueble.localidad,
      
      // Campos editables (del formulario)
      descripcion: formData.descripcion,
      mtrs: Number(formData.mtrs),
      precioDolar: Number(formData.precioDolar),
      requisitos: formData.requisitos,
      fechaConstruccion: formData.fechaConstruccion ? new Date(formData.fechaConstruccion).toISOString() : undefined,
      fechaPublicacion: formData.fechaPublicacion ? new Date(formData.fechaPublicacion).toISOString() : undefined,
      propietario: Number(formData.propietario),
      tipoServicio: Number(formData.tipoServicio),
    };

    // Campos específicos por tipo (solo editables)
    if (tipo === 'departamento') {
      dataToSend.piso = inmueble.piso; // NO editable
      dataToSend.depto = formData.depto;
      dataToSend.precioExpensas = Number(formData.precioExpensas);
      dataToSend.cantAmbientes = Number(formData.cantAmbientes);
      dataToSend.cantBanios = Number(formData.cantBanios);
      dataToSend.balcon = formData.balcon;
    } else if (tipo === 'casa') {
      dataToSend.cantAmbientes = Number(formData.cantAmbientes);
      dataToSend.cantBanios = Number(formData.cantBanios);
      dataToSend.patio = formData.patio;
      dataToSend.pileta = formData.pileta;
    } else if (tipo === 'cochera') {
      dataToSend.techo = formData.techo;
      dataToSend.tipoVehiculo = formData.tipoVehiculo;
    } else if (tipo === 'terreno') {
      dataToSend.nroParcela = Number(formData.nroParcela);
      dataToSend.zonificacion = formData.zonificacion;
    }

    console.log('Enviando:', dataToSend);
    mutate({ id, formData: dataToSend }); 
  };

  if (isLoading) return <p>Cargando datos...</p>;
  if (!inmueble || !tipo) return <p>Cargando información del inmueble...</p>;

  return (
    <CCard className="p-3 w-100 bg-light">
      <CCardBody>
        <CCardTitle>Modificar Inmueble</CCardTitle>
        
        {/* Mostrar datos NO editables */}
        <div className="mb-4 p-3 bg-white rounded">
          <h6 className="text-muted mb-3">Información fija del inmueble:</h6>
          <p className="mb-1"><strong>Tipo:</strong> {tipo ? tipo.charAt(0).toUpperCase() + tipo.slice(1) : 'N/A'}</p>
          <p className="mb-1"><strong>Dirección:</strong> {inmueble.direccionCalle} {inmueble.direccionNumero}</p>
          <p className="mb-1"><strong>Localidad:</strong> {inmueble.localidad?.nombre || 'N/A'}</p>
          {tipo === 'departamento' && (
            <p className="mb-1"><strong>Piso:</strong> {inmueble.piso}</p>
          )}
        </div>

        <CForm onSubmit={handleSubmit} className="mt-3">
          <CRow>
            <CFormLabel htmlFor="descripcion">Descripción*</CFormLabel>
            <CFormInput
              type="text"
              id="descripcion"
              placeholder='Descripción detallada de su inmueble'
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="mb-3"
              required
            />
          </CRow>
          <CRow>
            <CFormLabel htmlFor="precioDolar">Precio según tipo de servicio (mensual, cuatrimestral, anual o total)*</CFormLabel>
            <CFormInput
              type="number"
              id="precioDolar"
              name="precioDolar"
              placeholder="precio en dolares (usd)"
              value={formData.precioDolar}
              onChange={handleChange}
              required
              className="mb-3"
            />
          </CRow>
          <CRow>
            <CFormLabel htmlFor="mtrs">Metros Cuadrados*</CFormLabel>
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
            <CFormLabel htmlFor='requisitos'>Requisitos</CFormLabel>
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
            <CCol md={6}>              
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
            </CCol>
            <CCol md={6}>
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
            </CCol>
          </CRow>

          <CRow>
            <CCol md={6}>
              <CFormLabel htmlFor='fechaConstruccion'>Fecha de Construcción*</CFormLabel>
              <CFormInput
                type="date"
                name="fechaConstruccion"
                id='fechaConstruccion'
                value={formData.fechaConstruccion}
                onChange={handleChange}
                className="mb-3"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor='fechaPublicacion'>Fecha de Publicación*</CFormLabel>
              <CFormInput
                type="date"
                name="fechaPublicacion"
                id='fechaPublicacion'
                value={formData.fechaPublicacion}
                onChange={handleChange}
                className="mb-3"
                required
              />
            </CCol>
          </CRow>

          {/* Campos específicos por tipo */}
          {tipo === "departamento" && (
            <>
              <CRow>
                <CFormLabel htmlFor="depto">Número o Sección de Departamento</CFormLabel>
                <CFormInput
                  type="text"
                  id="depto"
                  name="depto"
                  value={formData.depto}
                  onChange={handleChange}
                  placeholder="Ej: A, B, 1, 2"
                  className="mb-3"
                />
              </CRow>
              <CRow>
                <CFormLabel htmlFor="precioExpensas">Precio de las expensas*</CFormLabel>
                <CFormInput
                  type="number"
                  id="precioExpensas"
                  name="precioExpensas"
                  placeholder="precio de expensas (pesos)"
                  value={formData.precioExpensas}
                  onChange={handleChange}
                  required
                  className="mb-3"
                />
              </CRow>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="cantAmbientes">Cantidad de Ambientes*</CFormLabel>
                  <CFormInput
                    type="number"
                    id="cantAmbientes"
                    name="cantAmbientes"
                    value={formData.cantAmbientes}
                    onChange={handleChange}
                    className="mb-3"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="cantBanios">Cantidad de Baños*</CFormLabel>
                  <CFormInput
                    type="number"
                    id="cantBanios"
                    name="cantBanios"
                    value={formData.cantBanios}
                    onChange={handleChange}
                    className="mb-3"
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="balcon"
                      name="balcon"
                      checked={formData.balcon}
                      onChange={handleChange}
                    />
                    <CFormLabel className="form-check-label" htmlFor="balcon">
                      Tiene Balcón
                    </CFormLabel>
                  </div>
                </CCol>
              </CRow>
            </>
          )}

          {tipo === "casa" && (
            <>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="cantAmbientes">Cantidad de Ambientes*</CFormLabel>
                  <CFormInput
                    type="number"
                    id="cantAmbientes"
                    name="cantAmbientes"
                    value={formData.cantAmbientes}
                    onChange={handleChange}
                    className="mb-3"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="cantBanios">Cantidad de Baños*</CFormLabel>
                  <CFormInput
                    type="number"
                    id="cantBanios"
                    name="cantBanios"
                    value={formData.cantBanios}
                    onChange={handleChange}
                    className="mb-3"
                    required
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6}>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="patio"
                      name="patio"
                      checked={formData.patio}
                      onChange={handleChange}
                    />
                    <CFormLabel className="form-check-label" htmlFor="patio">
                      Tiene Patio
                    </CFormLabel>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="pileta"
                      name="pileta"
                      checked={formData.pileta}
                      onChange={handleChange}
                    />
                    <CFormLabel className="form-check-label" htmlFor="pileta">
                      Tiene Pileta
                    </CFormLabel>
                  </div>
                </CCol>
              </CRow>
            </>
          )}

          {tipo === "cochera" && (
            <>
              <CRow>
                <CCol md={6}>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="techo"
                      name="techo"
                      checked={formData.techo}
                      onChange={handleChange}
                    />
                    <CFormLabel className="form-check-label" htmlFor="techo">
                      Tiene Techo
                    </CFormLabel>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CFormLabel htmlFor="tipoVehiculo">Tipo de Vehículo*</CFormLabel>
                <CFormInput
                  type="text"
                  id="tipoVehiculo"
                  name="tipoVehiculo"
                  value={formData.tipoVehiculo}
                  onChange={handleChange}
                  placeholder="Tipos de vehículo permitidos en la cochera"
                  className="mb-3"
                  required
                />
              </CRow>
            </>
          )}

          {tipo === "terreno" && (
            <>
              <CRow>
                <CFormLabel htmlFor="nroParcela">Número de Parcela*</CFormLabel>
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
                  placeholder="Ej: residencial, comercial, industrial"
                  className="mb-3"
                />
              </CRow>
            </>
          )}

          {isError && (
            <div className="alert alert-danger mb-3">
              Error al actualizar: {error?.response?.data?.message || error.message}
            </div>
          )}

          <CRow className="justify-content-end">
            <CCol xs="auto">
              <CButton 
                type="button" 
                color="secondary" 
                className="mt-3" 
                onClick={() => navigate('/inmuebles')}
              >
                Cancelar
              </CButton>
            </CCol>
            <CCol xs="auto">
              <CButton type="submit" color="primary" className="mt-3">
                Guardar Cambios
              </CButton>
            </CCol>
          </CRow>
        </CForm>

        <CModal visible={showModal} onClose={() => setShowModal(false)}>
          <CModalHeader>
            <CModalTitle>Guardado Exitoso</CModalTitle>
          </CModalHeader>
          <CModalFooter>
            <CButton color="primary" onClick={() => navigate('/inmuebles')}>
              Aceptar
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
}