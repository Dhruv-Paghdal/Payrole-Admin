import React from 'react';
import { Link } from "react-router-dom";
import './css/sidebar.css';
import CardTitle from 'react-bootstrap/esm/CardTitle';
import ListGroup from 'react-bootstrap/ListGroup';
import { BoxArrowLeft, Briefcase } from 'react-bootstrap-icons';

const  Sidebar = () => {
  return (
    <div className='sidebar px-3'>
      <CardTitle className='text-start pt-2' style={{fontFamily: "sans-serif", fontWeight: 600}}>Payroll</CardTitle>
      <hr />
      <div className='sidebarList'>
        <ListGroup>
          <ListGroup.Item className='item active'>
            <div>
              <Briefcase fontSize={16}/>
              <p className='ps-2'>Clients</p>
            </div>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item className='item'>
            <div>
              <Link to="/" onClick={()=>{localStorage.removeItem("token")}}><BoxArrowLeft fontSize={16} /> Logout</Link>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  )
}

export default Sidebar