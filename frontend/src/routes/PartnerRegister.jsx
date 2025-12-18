import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/variables.css'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PartnerRegister = () => {
  const navigate = useNavigate()

  const BACKEND_URL = "https://zomato-clone-backend.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault()
    const businessName = e.target.businessName.value
    const email = e.target.email.value
    const password = e.target.password.value
    const phone = e.target.phone.value
    const address = e.target.address.value

    console.log('Form submitted:', { businessName, email, password, phone, address })

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/food-partner/register`, {
        businessName,
        email,
        password,
        phone,
        address
      }, {
        withCredentials: true,
        timeout: 30000,
      })
      console.log("response", response.data)


      navigate('/create-food')
    } catch (error) {
      console.error('There was an error registering the partner!', error)
    }
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-title">Partner Sign up</div>
          <div className="auth-sub">Register your kitchen to start receiving orders.</div>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <PartnerForm />
        </form>
      </div>
    </div>
  )
}

function PartnerForm() {
  const [values, setValues] = useState({ businessName: '', email: '', password: '', phone: '', address: '', showPassword: false })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validators = {
    businessName: v => !v ? 'Business name is required.' : (/^[A-Za-z0-9\s\-&',.]{2,}$/.test(v) ? '' : 'Use a valid business name.'),
    email: v => !v ? 'Email is required.' : '',
    password: v => !v ? 'Password is required.' : ((/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/).test(v) ? '' : 'Minimum 8 chars, include letter and number.'),
    phone: v => !v ? 'Phone is required.' : ((/^\+?[0-9\s\-]{7,15}$/).test(v) ? '' : 'Enter a valid phone number.'),
    address: v => !v ? 'address is required.' : ((/^[A-Za-z\s\-]{2,}$/).test(v) ? '' : 'Enter a valid address name.')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(s => ({ ...s, [name]: value }))
    setErrors(s => ({ ...s, [name]: validators[name] ? validators[name](value) : '' }))
  }
  const handleBlur = (e) => {
    const { name, value } = e.target
    setErrors(s => ({ ...s, [name]: validators[name] ? validators[name](value) : '' }))
  }

  return (
    <>
      <div className="input">
        <label>Kitchen / Business name</label>
        <input placeholder="My Tasty Kitchen" name="businessName" value={values.businessName} onChange={handleChange} onBlur={handleBlur} className={errors.businessName ? 'invalid' : ''} required />
        {errors.businessName && <div className="field-error">{errors.businessName}</div>}
      </div>

      <div className="input">
        <label>Contact email</label>
        <input type="email" placeholder="contact@kitchen.com" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email ? 'invalid' : ''} required />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>

      <div className="input">
        <label>Password</label>
        <div className="pw-row">
          <input type={values.showPassword ? 'text' : 'password'} placeholder="Create a password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password ? 'invalid' : ''} required />
          <button type="button" className="pw-toggle" aria-pressed={values.showPassword ? 'true' : 'false'} onClick={() => setValues(s => ({ ...s, showPassword: !s.showPassword }))} aria-label={values.showPassword ? 'Hide password' : 'Show password'}>{values.showPassword ? 'Hide' : 'Show'}</button>
        </div>
        {errors.password && <div className="field-error">{errors.password}</div>}
      </div>

      <div className="row">
        <div style={{ flex: 1 }} className="input">
          <label>Phone</label>
          <input placeholder="+1 555 555 555" name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} className={errors.phone ? 'invalid' : ''} required />
          {errors.phone && <div className="field-error">{errors.phone}</div>}
        </div>

        <div style={{ flex: 1 }} className="input">
          <label>Address</label>
          <input placeholder="Address" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} className={errors.address ? 'invalid' : ''} required />
          {errors.address && <div className="field-error">{errors.address}</div>}
        </div>
      </div>

      <div className="actions">
        <button type='submit' className="btn">Create partner account</button>
        <button onClick={() => navigate('/partner/login')} className="btn ghost" type="button">Sign in</button>
      </div>
      <div className="muted">Want to order instead? <Link className='links' to="/register">Register as a user</Link></div>
    </>
  )
}

export default PartnerRegister
