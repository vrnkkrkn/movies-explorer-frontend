import { useCallback, useState } from "react";

function useFormValidation() {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValidForm, setIsValidForm] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: event.target.validationMessage });
        setIsValidForm(event.target.closest('form').checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValidForm = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValidForm(newIsValidForm);
        },

        [setValues, setErrors, setIsValidForm]
    );

    return {
        values,
        handleChange,
        errors,
        isValidForm,
        setIsValidForm,
        resetForm,
        setValues
    };
}

export default useFormValidation;