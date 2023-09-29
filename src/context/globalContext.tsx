import React, {createContext, useState} from "react";

type SelectedState = {
    [dayOfMonth: number]: boolean
}

type Props = {
    tokenJwt: any,
    setTokenJwt: React.Dispatch<React.SetStateAction<any>>;
    selected: SelectedState;
    setSelected: React.Dispatch<React.SetStateAction<any>>;
}

export const AppContext = createContext<Props | undefined>(undefined)

export function AppContextProvider({children}) {
    const [tokenJwt, setTokenJwt] = useState<any>()
    const [selected, setSelected] = useState<SelectedState>({})


    return (
        <AppContext.Provider value={{tokenJwt, setTokenJwt, selected, setSelected}}>
            {children}
        </AppContext.Provider>
    )
}