import React, { useContext } from 'react'
import useStateContext, { stateContext } from '../hooks/useStateContext'

export default function Entry() {
    const { context, setContext } = useStateContext()
    
    return (
        <div>Entry</div>
    )
}
