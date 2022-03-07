import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useForm } from '../../custom-hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    // Esto se hace para tomar el estado del store
    const {msgError} = useSelector( state => state.ui)

    const [formValues, handleInputChange] = useForm({
      name:'Jesus',
      email:'jesus@gmail.com',
      password:'123456',
      password2:'123456'
    })

    const {name, email, password, password2} = formValues;

    const handleRegister = (e) => {
      e.preventDefault();
      
      if(isFormValid()){
        dispatch(startRegisterWithEmailPasswordName(email, password, name))
      }
    }

    const isFormValid = () => {
      if( name.trim().length === 0){
        dispatch(setError('Name is required'));
        return false;
      }else if ( !validator.isEmail(email) ){
        dispatch(setError('Email is not valid'));
        return false;
      }else if (password !== password2 || password.length < 6){
        dispatch(setError('Password should be at least 6 characters and match each other'));
        return false;
      }else (
        dispatch(removeError())
      )
      
      return true;
    }
    return (
        <>
      <h3 className="auth__title">Register</h3>

      {
        msgError &&
        (
          <div className='auth__alert-error'>
            {msgError}
          </div>
        )
      }
      <form onSubmit={handleRegister}>

      <input 
          type="text" 
          placeholder="Name" 
          name="name" 
          autoComplete='off'
          className="auth__input" 
          value={name}
          onChange={handleInputChange}
        />

        <input 
          type="text" 
          placeholder="Email" 
          name="email" 
          autoComplete='off'
          className="auth__input"
          value={email} 
          onChange={handleInputChange}
        />

        <input 
          type="password" 
          placeholder="Password" 
          name="password" 
          autoComplete='off'
          className="auth__input" 
          value={password}
          onChange={handleInputChange}
        />
        <input 
          type="password" 
          placeholder="Confirm" 
          name="password2" 
          autoComplete='off'
          className="auth__input" 
          value={password2}
          onChange={handleInputChange}
        />


        <button 
          type="submit"
          className="btn btn-primary btn-block mb-5"
          //disabled= {true}
        >
          Register
        </button>

        <Link 
          to="/auth/login"
          className="link"
        >
            Already registered?
        </Link>
      </form>
    </>
    
    )
};
