import React,{useState} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';
import './css/tabel.css';
import Modal from './modal';

const TabelSection = () => {
  const deleted = false;
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Add Client");
  const [type, setType] = useState("add");
  const handleShow = () => setShow(true);
  const maxLimit = 10;
    const [curr, set_Curr] = useState(1);
    const pageChangeFunction = (p) => {
        if (p >= 1 && p <= maxLimit) {
            set_Curr(p);
        }
    };
    const showPageItemsFunction = () => {
      const data = [];
      const numPage = 5;
      if (maxLimit <= numPage) {
          for (let i = 1; i <= maxLimit; i++) {
              data.push(
                  <Pagination.Item
                      key={i}
                      active={i === curr}
                      onClick={() => pageChangeFunction(i)}
                  >
                      {i}
                  </Pagination.Item>
              );
          }
      } else {
          const leftside = curr - numPage / 2 > 1;
          const rightside = curr + numPage / 2 < maxLimit;
          data.push(
              <Pagination.First
                  key="first"
                  onClick={() => pageChangeFunction(1)}
              />
          );
          data.push(
              <Pagination.Prev
                  key="prev"
                  onClick={() => pageChangeFunction(curr - 1)}
              />
          );
          if (leftside) {
              data.push(<Pagination.Ellipsis key="leftEllipsis" />);
          }
          const str = Math.max(1, Math.round(curr - numPage / 2));
          const end = Math.min(maxLimit, Math.round(curr + numPage / 2));
          for (let i = str; i <= end; i++) {
              data.push(
                  <Pagination.Item
                      key={i}
                      active={i === curr}
                      onClick={() => pageChangeFunction(i)}
                  >
                      {i}
                  </Pagination.Item>
              );
          }
          if (rightside) {
              data.push(<Pagination.Ellipsis key="rightEllipsis" />);
          }
          data.push(
              <Pagination.Next
                  key="next"
                  onClick={() => pageChangeFunction(curr + 1)}
              />
          );
          data.push(
              <Pagination.Last
                  key="last"
                  onClick={() => pageChangeFunction(maxLimit)}
              />
          );
      }
      return data;
    };  
  return (
    <div style={{height: "89vh", background: "#FFFFFF",borderRadius: "0.8rem"}} className='mx-3 p-3'>
      <header>
        <div>
          <p className='my-0 mx-2'>Show</p> 
          <Form.Select aria-label="rows">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
          <p className='my-0 mx-2'>Entries</p>
        </div>
        <div>
          <p className='my-0 ms-2'>Company</p>
          <p className='my-0 mx-2'>Name</p>
          <Form.Select aria-label="sort">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </Form.Select>
        </div>
      </header>
      <hr />
      <div className='tabelSection'>
        <Table striped>
        <thead style={{position: "sticky", top: "0"}}>
          <tr>
            <th>Company Name</th>
            <th>Company Email</th>
            <th>Company Mobile</th>
            <th>Subscription Start</th>
            <th>Subscription End</th>
            {!deleted && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HK Industries</td>
            <td>hk@gmail.com</td>
            <td>1234567890</td>
            <td>11-01-2023</td>
            <td>11-05-2023</td>
           {!deleted && <td className='action'>
              <p className='edit mb-0'><PencilSquare onClick={()=>{handleShow(); setTitle("Edit Client"); setType("active-edit")}} /></p>
              <p className='delete mb-0'><Trash3 onClick={()=>{handleShow(); setTitle("Delete Client"); setType("delete")}}/></p>
            </td>}
          </tr>
        </tbody>
        </Table>
      </div>
      <hr />
    <footer>
      <div>
      <Pagination>{showPageItemsFunction()}</Pagination>
      </div>
    </footer>
    <Modal show={show} setShow={setShow} title={title} type={type}/>
    </div>
  )
}

export default TabelSection;