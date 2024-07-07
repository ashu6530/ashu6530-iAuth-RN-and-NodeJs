import { createContext, useContext, useState } from "react"
const LoginContext = createContext()

const LoginProvider=({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [profile, setProfile] = useState({})
    return(
        <LoginContext.Provider value={{isLoggedIn,setIsLoggedIn,setProfile,
            profile
        }}>
            {children}
        </LoginContext.Provider>
    )

}
export const useLogin = ()=>useContext(LoginContext)
export default LoginProvider