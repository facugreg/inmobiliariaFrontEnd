import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Inmuebles from './Inmuebles';
import { MemoryRouter } from 'react-router-dom';
vi.mock('./getInmuebles', () => ({
  default: () => {
    const inmuebles = [
      {
        id: 1,
        direccionCalle: 'Mendoza',
        direccionNumero: 1500,
        localidad: 'Rosario',
      },
      {
        id: 2,
        direccionCalle: 'Cordoba',
        direccionNumero: 999,
        localidad: 'Rosario',
      },
      {
        id: 3,
        direccionCalle: 'Zeballos',
        direccionNumero: 1341,
        localidad: 'Rosario',
      },
    ];

    return {
      inmuebles: inmuebles,
      isLoading: false,
      isError: false,
      error: null,
    };
  },
}));
vi.mock('../../../hooks/localidades.hooks', () => ({
  useLocalidades: vi.fn(() => ({
    localidades: [
      { id: 1, nombre: 'Rosario' },
      { id: 2, nombre: 'Reconquista' },
    ],
  })),
}));

describe('Listado inmuebles  -  test', () => {
  beforeEach(() => {
    //se hace el render antes de cada test
    render(
      <MemoryRouter>
        <Inmuebles />
      </MemoryRouter>,
    );
  });

  test('Muestra buscador y filtros ', () => {
    screen.debug();
    //expect(screen.getByText('Inmuebles')).ToBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/buscar por calle/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/tipo de inmueble/i)).toBeInTheDocument();
    expect(screen.getAllByText(/localidad/i)[0]).toBeInTheDocument();
  });
  test('Muestra inmuebles', () => {
    expect(screen.getByText(/mendoza/i)).toBeInTheDocument();
    expect(screen.getByText(/cordoba/i)).toBeInTheDocument();
    expect(screen.getByText(/zeballos/i)).toBeInTheDocument();
  });

  test('cambia buscador al escribir', () => {
    const input = screen.getByPlaceholderText(/buscar por calle/i);
    fireEvent.change(input, { target: { value: 'Zeballos' } });
    expect(input.value).toBe('Zeballos');
  });

  test('cambia filtro de localidad al seleccionar ', () => {
    const filtros = screen.getAllByRole('combobox');
    const localidad = filtros[1];
    fireEvent.change(localidad, {
      target: { value: '2' },
    });
    expect(localidad.value).toBe('2');
  });
});
