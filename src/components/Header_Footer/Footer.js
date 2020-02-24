import React from 'react'

function Footer() {
    return (
        <div className='footer'>
           <footer className="bg-transparent text-white p-4 text-center" >
               Copyright &copy; {new Date().getFullYear()} KurePay
           </footer>
        </div>
    )
}

export default Footer;
