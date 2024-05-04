import React from 'react'

function Layout({children}) {
  return (
  <div className="container mx-auto flex flex-col gap-4">
    {children}
    </div>
  )
}

export default Layout