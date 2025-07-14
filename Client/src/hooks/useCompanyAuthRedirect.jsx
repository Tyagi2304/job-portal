import { useContext, useEffect } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"


const useCompanyAuthRedirect = () => {
    const { companyToken, isAuthLoading } = useContext(AppContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthLoading && !companyToken) {
            navigate('/dashboard')
        }
    }, [companyToken, isAuthLoading]);

}

export default useCompanyAuthRedirect