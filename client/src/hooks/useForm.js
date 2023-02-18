import { useState } from 'react'

export default function useForm(getFreshModelObject) {
    const [values, setValues] = useState(getFreshModelObject())
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        if (e.target) {
            const {name, value} = e.target
            setValues({
                ...values,
                [name]: value
            })
        }
        else {
            const {name, value} = e
            setValues({
                ...values,
                [name]: value
            })
        }
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }
}