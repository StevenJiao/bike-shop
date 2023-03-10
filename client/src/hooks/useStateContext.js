import React, { createContext, useContext, useState, useEffect } from 'react'


export const stateContext = createContext();

const getFreshContext = () => {
    if (localStorage.getItem('context') == null) {
        localStorage.setItem('context', JSON.stringify({
            admin_name: 'NO_USER_LOGGED_IN'
        }))
    }
    return JSON.parse(localStorage.getItem('context'));
}

export default function useStateContext() {
    const { context, setContext } = useContext(stateContext)
    return {
        context,
        setContext: obj => { setContext({ ...context, ...obj }) }
    };
}

export function ContextProvider({ children }) {
    const [context, setContext] = useState(getFreshContext())

    useEffect(() => {
        localStorage.setItem('context', JSON.stringify(context))
    }, [context])

    return (
        <stateContext.Provider value={{ context, setContext }}>
            {children}
        </stateContext.Provider>
    )
}