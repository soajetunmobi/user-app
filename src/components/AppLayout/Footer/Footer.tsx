import React, { FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='footer'>
      <span>User App</span>
      <br />
      {currentYear}
    </footer>
  )
}
