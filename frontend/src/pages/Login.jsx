import {useEffect, useState} from "react"
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { login, reset } from "../features/auth/authSlice"
import { useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";

function Login() {
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
    })

    const navigate = useNavigate()

    const {email, password} = formData

    const dispatch = useDispatch()

    const {user, isLoading,isError, isSuccess, message} = useSelector(state => state.auth)

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if(isSuccess || user){
            navigate('/')
        }
        if(isError){
            toast.error(message.message)
        }
        dispatch(reset())

    }, [isError, isSuccess, user, message, navigate])

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner />
    }
  
    return (
    <>
      <section className="heading">
        <h1>
            <FaSignInAlt /> Login
        </h1>
        <p>Please login</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                
                <input 
                
                type="email" 
                className="form-control" 
                id='email' 
                value={email}
                name="email" 
                onChange={onChange}
                placeholder="Enter your email"/>

                <input 
                
                type="password" 
                className="form-control" 
                id='password' 
                value={password}
                name="password" 
                onChange={onChange}
                placeholder="Enter your password"/>

                
            </div>
            <div className="form-group">
                <button className="btn btn-block">
                    Submit
                </button>
            </div>
        </form>
      </section>
    </>
  )
}

export default Login
