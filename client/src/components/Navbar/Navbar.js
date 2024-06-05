import React, { useState } from 'react'
import RegLogBox from '../RegLogBox/RegLogBox';

function Navbar() {

  const [showRegLogBox, setRegLogBox] = useState(false);

  return (
    <div className='navbarContainer'>
     <div className="logo">Logo</div>
     <div>
      <div className="navbarItem" onClick={() => setRegLogBox(!showRegLogBox)}>Account</div>
      {showRegLogBox && <RegLogBox/>}
     </div>
      
    </div>
  )
}

export default Navbar
