import {Controller} from "react-hook-form";
import { CFormInput, CFormLabel } from "@coreui/react";

const InputRegistro = ({nombre, control, label, type, error}) => {
    return(
        <>
        <CFormLabel htmlFor={nombre}>{label}</CFormLabel>
            <Controller name={nombre} control={control} render={({field}) => (
                <CFormInput {...field} type={type} id={nombre} invalid={!!error} className="bg-light"/>
        )}/>
        {error && <div className="text-danger">{error.message}</div>}
        </>
    )
}

export default InputRegistro;