import { useState, useEffect } from "react"
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { register, reset } from "../features/auth/authSlice"
import { useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";


function Register() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
    })

    const {name, email, password, confirmPassword} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess,isError, message} = useSelector(state => state.auth)

    useEffect(() => {
        if(isSuccess || user){
            navigate('/')
        }
        if(isError){
            toast.error(message.message)
        }
        dispatch(reset())

    }, [isError, isSuccess, user, message, navigate])
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
        }
        else{
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }

    }

    if(isLoading){
      return <Spinner />
    }
  
    return (
    <>
      <section className="heading">
        <h1>
            <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                
                type="text" 
                className="form-control" 
                id='name' 
                value={name}
                name="name" 
                onChange={onChange}
                placeholder="Enter your name"/>

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

                <input 
                
                type="password" 
                className="form-control" 
                id='confirmPassword' 
                value={confirmPassword}
                name="confirmPassword" 
                onChange={onChange}
                placeholder="Confirm password"/>

                
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

export default Register
