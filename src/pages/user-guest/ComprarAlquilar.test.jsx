import { describe, test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'  // ← Agregá esta línea
import { ComprarAlquilar } from './ComprarAlquilar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../../context/AuthProvider'

// Mock de los hooks
vi.mock('../admin/inmueble/getInmuebles', () => ({
  default: vi.fn(() => ({
    inmuebles: [
      {
        id: 1,
        mtrs: 150,
        descripcion: 'Casa amplia con jardín',
        precioDolar: 100000,
        direccionCalle: 'Pellegrini',
        direccionNumero: 1234,
        fechaConstruccion: new Date('2020-01-15'),
        fechaPublicacion: new Date('2024-01-10'),
        tipo: 'casa',
        propietario: { id: 1, nombrePropietario: 'Juan' },
        tipoServicio: { id: 1, nombre: 'Venta' },
        localidad: { id: 1, nombre: 'Rosario' },
        imagenes: [],
        // Campos específicos de Casa
        cantAmbientes: 3,
        cantBanios: 2,
        patio: true,
        pileta: false
      },
      {
        id: 2,
        mtrs: 80,
        descripcion: 'Departamento céntrico',
        precioDolar: 80000,
        direccionCalle: 'San Martín',
        direccionNumero: 567,
        fechaConstruccion: new Date('2018-05-20'),
        fechaPublicacion: new Date('2024-02-01'),
        tipo: 'departamento',
        propietario: { id: 2, nombrePropietario: 'María' },
        tipoServicio: { id: 2, nombre: 'Alquiler' },
        localidad: { id: 2, nombre: 'Funes' },
        imagenes: [],
        // Campos específicos de Departamento
        piso: 5,
        depto: 'B',
        precioExpensas: 5000,
        cantAmbientes: 2,
        cantBanios: 1,
        balcon: true
      }
    ],
    isLoading: false,
    isError: false
  }))
}))

vi.mock('../../hooks/localidades.hooks', () => ({
  useLocalidades: vi.fn(() => ({
    localidades: [
      { id: 1, nombre: 'Rosario' },
      { id: 2, nombre: 'Funes' }
    ]
  }))
}))

describe('ComprarAlquilar - Test de Integración', () => {
  
  const queryClient = new QueryClient()
  
  const renderWithProviders = (component) => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {component}
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    )
  }
  
  test('renderiza el buscador y los filtros correctamente', () => {
    renderWithProviders(<ComprarAlquilar tipoServicio="venta" />)
    
    expect(screen.getByPlaceholderText(/buscar por calle/i)).toBeInTheDocument()
    expect(screen.getByText('Tipo')).toBeInTheDocument()
    expect(screen.getByText('Precio')).toBeInTheDocument()
    expect(screen.getByText('Localidad')).toBeInTheDocument()
  })

    test('muestra los inmuebles correctamente', () => {
    renderWithProviders(<ComprarAlquilar tipoServicio="venta" />)
    
    expect(screen.getByText(/casa amplia/i)).toBeInTheDocument()
    expect(screen.getByText(/departamento céntrico/i)).toBeInTheDocument()
    })
  test('el buscador actualiza cuando el usuario escribe', () => {
    renderWithProviders(<ComprarAlquilar tipoServicio="venta" />)
    
    const input = screen.getByPlaceholderText(/buscar por calle/i)
    fireEvent.change(input, { target: { value: 'Pellegrini' } })
    expect(input.value).toBe('Pellegrini')
  })

  test('los filtros cambian cuando el usuario selecciona una opción', () => {
  renderWithProviders(<ComprarAlquilar tipoServicio="venta" />)
  
  // Obtener todos los selects
  const selects = screen.getAllByRole('combobox')
  const selectTipo = selects[0]  // Primer select
  
  fireEvent.change(selectTipo, { target: { value: 'casa' } })
  expect(selectTipo.value).toBe('casa')
  })
})