import React from 'react';
import { useNavigate } from "react-router-dom";
import './css/sidebar.css';
import CardTitle from 'react-bootstrap/esm/CardTitle';
import ListGroup from 'react-bootstrap/ListGroup';
import { BoxArrowLeft, Briefcase } from 'react-bootstrap-icons';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  }
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
          <ListGroup.Item className='item' onClick={handleLogout}>
            <div>
              <BoxArrowLeft fontSize={16}/>
              <p className='ps-2'>Logout</p>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  )
}

export default Sidebar