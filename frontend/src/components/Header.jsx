import React from 'react';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";
const Header = () => {

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isLoading, isSuccess,isError, message} = useSelector(state => state.auth)
    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'> Support Desk</Link>
            </div>
            <ul>
                {user ? (<>
                <li>
                    <button className={'btn'} onClick={onLogout}>
                    <FaSignInAlt /> Logout
                    </button>
                </li>
                </>
                ) : (<>
                    <li>
                        <Link to='/login'>
                            <FaSignInAlt /> Login
                        </Link>
                    </li>
                    <li>
                        <Link to='/register'>
                            <FaUser /> Register
                        </Link>
                    </li>
                </>)}

            </ul>
        </header>
    );
};

export default Header;
