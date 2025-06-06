import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {DataProvider} from './Components/DataProvider/DataProvider'
// import {initialState,reducer} from './Utility/reducer.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>,
)


//<DataProvider reducer={reducer} initialState ={initialState}> 