import React, { useState } from 'react'
import '../styles/variables.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
   
    const navigate = useNavigate()

   

    const handleSubmit = async (e) => {
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value
      console.log('Form submitted:', { email, password })
      
      try {
          const response = await axios.post('/api/auth/user/login', {
            email,
            password
          }, {
               withCredentials: true  
          })
          console.log("response",response.data) 
          navigate('/')
      } catch (error) {
          console.error('There was an error logging in the user!', error)
          
      }
    }
   

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-title">Welcome back</div>
          <div className="auth-sub">Sign in to continue to your account.</div>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <EmailPasswordLogin />
        </form>
      </div>
    </div>
  )
}

function EmailPasswordLogin(){
  const [values, setValues] = useState({ email: '', password: '', showPassword: false })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validateField = (name, value) => {
    if(name === 'email'){
      if(!value) return 'Email is required.'
      return ''
    }
    if(name === 'password'){
      if(!value) return 'Password is required.'
      return ''
    }
    return ''
  }

  const handleChange = (e)=>{
    const {name,value} = e.target
    setValues(s=>({...s,[name]:value}))
    setErrors(s=>({...s,[name]:validateField(name,value)}))
  }

  const handleBlur = (e)=>{
    const {name,value} = e.target
    setErrors(s=>({...s,[name]:validateField(name,value)}))
  }

  return (
    <>
      <div className="input">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email ? 'invalid' : ''}
          required
        />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>

      <div className="input">
        <label>Password</label>
        <div className="pw-row">
          <input
            type={values.showPassword ? 'text' : 'password'}
            placeholder="Your password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password ? 'invalid' : ''}
            required
          />
          <button
            type="button"
            className="pw-toggle"
            aria-pressed={values.showPassword ? 'true' : 'false'}
            onClick={() => setValues(s => ({ ...s, showPassword: !s.showPassword }))}
            aria-label={values.showPassword ? 'Hide password' : 'Show password'}
          >
            {values.showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <div className="field-error">{errors.password}</div>}
      </div>

      <div className="actions">
        <button type='submit' className="btn">Sign in</button>
        <button onClick={()=>navigate('/register')} className="btn ghost" type="button">Create account</button>
      </div>
    </>
  )
}

export default UserLogin
