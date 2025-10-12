import {Controller} from "react-hook-form";
import { CFormInput, CFormLabel } from "@coreui/react";

const InputPropietario = ({nombre, control, label, type, error}) => {
  return(
    <>
      <CFormLabel htmlFor={nombre}>{label}</CFormLabel>
      <Controller
        name={nombre}
        control={control}
        render={({ field }) => (
          <CFormInput
            {...field}
            type={type}
            id={nombre}
            invalid={!!error}
          />
        )}
      />
      {error && <div className="text-danger">{error.message}</div>}
    </>
  );
};

export default InputPropietario;
