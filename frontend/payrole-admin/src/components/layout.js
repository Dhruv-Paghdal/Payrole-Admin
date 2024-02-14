import React from 'react';
import Sidebar from './sidebar';
import Navibar from './navbar';
import Tabel from './tabel';
import './css/layout.css'

const Layout = () => {
  return (
    <div className='mainLayout'>
        <div style={{width: "20vw"}}>
            <Sidebar />
        </div>
        <div style={{width: "80vw"}}>
            <Navibar />
            <Tabel />
        </div>
    </div>
  )
}

export default Layout