import {useState, useEffect} from "react";
import {useSelector} from "react-redux";

export const useAuthStatus = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
            setCheckingAuthStatus(false);
        } else {
            setIsAuthenticated(false);
            setCheckingAuthStatus(false);
        }
    }
    , [user]);

    return {isAuthenticated, checkingAuthStatus};

}