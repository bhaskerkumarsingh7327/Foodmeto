import React, { createContext, useState } from 'react'
import { food_items } from '../food'
export const dataContext = createContext()


function UserContext({ children }) {
    let [Cat, setCat] = useState(food_items)
    let [input, setInput] = useState("")

    let data = {
        input,
        setInput,
        Cat,
        setCat
    }
    return (
        <div>
            <dataContext.Provider value={data}> 
                {children}
            </dataContext.Provider>

        </div>
    )
}

export default UserContext