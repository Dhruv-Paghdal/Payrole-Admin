import React,{useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import { PencilSquare, Trash3, InfoCircle } from 'react-bootstrap-icons';
import { useForm } from "react-hook-form"
import './css/tabel.css';
import Modal from './modal';

const TabelSection = (props) => {
  const { register, handleSubmit } = useForm();
  const [data, setdata] = useState({});
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Add Client");
  const [type, setType] = useState("add");
  const handleModal = (params) => {
    setShow(params.visibility);
    setTitle(params.title); 
    setType(params.type);
    setdata(params.data);
  };
  const maxLimit = props.totalPage;
  const pageChangeFunction = (p) => {
        if (p >= 1 && p <= maxLimit) {
            props.set_Curr(p);
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
                      active={i === props.curr}
                      onClick={() => pageChangeFunction(i)}
                  >
                      {i}
                  </Pagination.Item>
              );
          }
      } else {
          const leftside = props.curr - numPage / 2 > 1;
          const rightside = props.curr + numPage / 2 < maxLimit;
          data.push(
              <Pagination.First
                  key="first"
                  onClick={() => pageChangeFunction(1)}
              />
          );
          data.push(
              <Pagination.Prev
                  key="prev"
                  onClick={() => pageChangeFunction(props.curr - 1)}
              />
          );
          if (leftside) {
              data.push(<Pagination.Ellipsis key="leftEllipsis" />);
          }
          const str = Math.max(1, Math.round(props.curr - numPage / 2));
          const end = Math.min(maxLimit, Math.round(props.curr + numPage / 2));
          for (let i = str; i <= end; i++) {
              data.push(
                  <Pagination.Item
                      key={i}
                      active={i === props.curr}
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
                  onClick={() => pageChangeFunction(props.curr + 1)}
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
  const onSubmit = (payload) => {
    props.setQuery({
      ...props.query,
      row: payload.row,
      sort: payload.sort
    })
  }

  useEffect(()=>{
    props.setQuery({
      ...props.query,
      page: props.curr
    })
  }, [props.curr])
  return (
    <div style={{height: "89vh", background: "#FFFFFF",borderRadius: "0.8rem"}} className='mx-3 p-3'>
      <header>
        <Form onChange={handleSubmit(onSubmit)}>
          <div>
            <p className='my-0 mx-2'>Show</p> 
            <Form.Select aria-label="rows"  {...register('row')}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </Form.Select>
            <p className='my-0 mx-2'>Entries</p>
          </div>
          <div>
            <p className='my-0 ms-2'>Company</p>
            <p className='my-0 mx-2'>Name</p>
            <Form.Select aria-label="sort" {...register('sort')}>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </Form.Select>
          </div>
        </Form>
      </header>
      <hr />
      <div className='tabelSection'>
        <Table striped>
        <thead style={{position: "sticky", top: "0"}}>
          <tr>
            <th>Company Name</th>
            <th>Company Email</th>
            <th>Company Mobile</th>
            <th>Company Info</th>
            {!props.deleted && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {props.list.length ? props.list.map(element => {
            return <tr key={element._id}>
              <td>{element.companyName}</td>
              <td>{element.companyEmail}</td>
              <td>{element.compnayMobile}</td>
              <td className='mb-0'><InfoCircle className='edit' onClick={()=>{
                handleModal({
                visibility: true,
                title: "Client Info",
                type: "info",
                data: {
                  _id: element._id
                }
              })}}/></td>
            {!props.deleted && <td>
                <Row>
                  <Col>
                    <p className='mb-0' ><PencilSquare className='edit' onClick={()=>{
                      handleModal({
                        visibility: true,
                        title: "Edit Client",
                        type: (
                          ()=>{
                            if(props.activeTab === "ACTIVE") {
                              return 'active-edit'
                            }
                            if(props.activeTab === "INACTIVE") {
                              return 'inactive-edit'
                            }
                            if(props.activeTab === "EXPIRED") {
                              return 'edit'
                            }
                          }
                        ),
                        data: {
                          _id: element._id,
                          defaultChecked: (
                            ()=>{
                              if(props.activeTab === "ACTIVE") {
                                return true
                              }
                              return false
                            } 
                          )()
                        }
                    })}}/></p>
                  </Col>
                  <Col>
                  <p className='mb-0' ><Trash3 className='delete' onClick={()=>{
                    handleModal({
                      visibility: true,
                      title: "Delete Client",
                      type: "delete",
                      data: {
                        _id: element._id
                      }
                    })}}/></p>
                  </Col>
                </Row>
              </td>}
            </tr>
          }) : <tr>
            <td colSpan={7}>
              <div style={{textAlign: "center"}}>
                No data to display
              </div>
            </td>
          </tr>}
        </tbody>
        </Table>
      </div>
      <hr />
    <footer>
      <div>
      <Pagination>{showPageItemsFunction()}</Pagination>
      </div>
    </footer>
    <Modal show={show} setShow={setShow} title={title} type={type} data={data} setMessage={props.setMessage} handleShow={props.handleShow} setModalFetch={props.setModalFetch}/>
    </div>
  )
}

export default TabelSection;