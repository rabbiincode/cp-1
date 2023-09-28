import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router'
import './_header.css'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`header ${isScrolled && 'change-header-background'}`}>
      <div className={`box ${location.pathname === '/' && 'active-link'}`}>
        <span onClick={()=> navigate('/')}>Program Details</span>
        <span className="triangle"></span>
      </div>
      <div className={`box ${location.pathname === '/application' && 'active-link'}`}>
        <span onClick={()=> navigate('/application')}>Application Form</span>
        <span className="triangle"></span>
      </div>
      <div className='box'>
        <span>Workflow</span>
        <span className="triangle"></span>
      </div>
      <div className='box'>
        <span>Preview</span>
        <span className="triangle"></span>
      </div>
    </div>
  )
}

export default Header