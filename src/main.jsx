import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { asset } from './data.js'
import './styles.css'

// Background images used in styles.css. Built with asset() so they work at /portfolio/ on GitHub Pages.
const rootStyle = document.documentElement.style
rootStyle.setProperty('--img-bg', `url("${asset('images/bg.webp')}")`)
rootStyle.setProperty('--img-cards', `url("${asset('images/cards.webp')}")`)

createRoot(document.getElementById('root')).render(<App />)
