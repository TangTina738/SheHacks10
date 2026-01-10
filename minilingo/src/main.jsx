
import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Nav from './Nav.jsx'
import Home from './Home.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav/>
    <Home/>
    <App />
  </StrictMode>,
)
