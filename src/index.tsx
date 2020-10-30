import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './components/App'
import { UserContextProvider } from './providers'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
