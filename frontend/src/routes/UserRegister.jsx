import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/variables.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const nameRegex = /^[A-Za-z\s.'-]{2,}$/
const passwordRegex = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/

const UserRegister = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({ fullName: '', email: '', password: '', showPassword: false })
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullName = e.target.fullName.value
    const email = e.target.email.value
    const password = e.target.password.value
    console.log('Form submitted:', { fullName, email, password })
try {
  
      const response = await axios.post('/api/auth/user/register', {
        fullName,
        email,
        password
      }, {
           withCredentials: true
      })
  
      console.log("response",response.data)
  
        navigate('/')
} catch (error) {
      console.error('There was an error registering the user!', error)
}
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value) return 'Full name is required.'
        if (!nameRegex.test(value)) return 'Use letters and spaces (min 2 chars).'
        return ''
      case 'email':
        if (!value) return 'Email is required.'
        return ''
      case 'password':
        if (!value) return 'Password is required.'
        if (!passwordRegex.test(value)) return 'Minimum 8 chars, at least one letter and one number.'
        return ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((s) => ({ ...s, [name]: value }))
    // live-validate while typing
    setErrors((s) => ({ ...s, [name]: validateField(name, value) }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors((s) => ({ ...s, [name]: validateField(name, value) }))
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-title">Create your account</div>
          <div className="auth-sub">Sign up to order delicious meals.</div>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="input">
            <label>Full name</label>
            <input
              placeholder="Jane Doe"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.fullName ? 'invalid' : ''}
              required
            />
            {errors.fullName && <div className="field-error">{errors.fullName}</div>}
          </div>

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
                placeholder="Create a password"
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
            <button type='submit' className="btn">Create account</button>
            <Link
              to="/login"
              className="btn ghost"
              style={{ textDecoration: 'none', textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Sign in instead
            </Link>
          </div>
          <div className="muted">Are you a food partner? <Link className='links' to="/partner/register">Register as a food partner</Link></div>
        </form>
      </div>
    </div>
  )
}



export default UserRegister
