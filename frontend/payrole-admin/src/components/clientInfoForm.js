import React, {useEffect,useState} from 'react';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { useForm } from "react-hook-form";
import { clientDetail } from '../service/clientService';

const ClientInfoForm = (props) => {
    const { register, setValue } = useForm();
    const [clientCredExist, setClientCredExist] = useState(false)
    useEffect(()=>{
        (
          async () => {
            const {success, message, data} = await clientDetail(props?.clientId);
            if(!success) {
              props.handleShow(true);
              props.setMessage(message);
              props.handleClose();
              setTimeout(()=>{
                props.handleShow(false);
              }, 3000);
            }
            else {
              if(data?.companyAdminUsername && data?.companyAdminPassword) {
                setClientCredExist(true);
                setValue('clientUsername', data.companyAdminUsername);
                setValue('clientPassword', data.companyAdminPassword);
              }
              setValue('clientInfoName', data.companyName);
              setValue('clientInfoEmail', data.companyEmail);
              setValue('clientInfoMobile', data.compnayMobile);
              setValue('clientInfoEnd', moment(data.subscriptionEnd).format("DD-MM-YYYY"));
              setValue('clientInfoStart', moment(data.subscriptionStart).format("DD-MM-YYYY"));
              document.getElementById("clientInfoHistory").innerHTML = (()=>{
                let text = "";
                for (let index = 0; index < data.subscriptionHistory.length; index++) {
                  text += `<b>${index+1}</b>. ${data.subscriptionHistory[index]}<br>`
                }
                return text;
              })();
              setValue('clientInfoStatus', data.isActive ? "Active" : "Inactive");
            }
          }
        ) ();
    }, [])
  return (
    <Form>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Company Name</Form.Label>
            </Col>  
            <Col>
              <Form.Control type="text" placeholder=""  disabled {...register("clientInfoName")}/>
            </Col>  
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Company Email</Form.Label>
            </Col>  
            <Col>
              <Form.Control type="text" placeholder=""  disabled {...register("clientInfoEmail")}/>
            </Col>  
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Company Mobile</Form.Label>
            </Col>  
            <Col>
              <Form.Control type="text" placeholder=""  disabled {...register("clientInfoMobile")}/>
            </Col>  
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Subscription Start Date</Form.Label>
            </Col>  
            <Col>
              <Form.Control type="text" placeholder=""  disabled  {...register("clientInfoStart")}/>
            </Col>  
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Subscription End Date</Form.Label>
            </Col>  
            <Col>
              <Form.Control type="text" placeholder=""  disabled {...register("clientInfoEnd")}/>
            </Col>  
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Subscription History</Form.Label>
            </Col>  
            <Col>
            <div id='clientInfoHistory'>
            </div>
            </Col>  
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Status</Form.Label>
            </Col>  
            <Col>
              <Form.Control type="text" placeholder="" disabled {...register("clientInfoStatus")}/>
            </Col>  
          </Row>
        </Form.Group>
        {clientCredExist && <><Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Client Username</Form.Label>
            </Col>  
            <Col>
              <Form.Control type="text" placeholder="" disabled {...register("clientUsername")}/>
            </Col>  
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label>Client Password</Form.Label>
            </Col>  
            <Col>
              <Form.Control type="text" placeholder="" disabled {...register("clientPassword")}/>
            </Col>  
          </Row>
        </Form.Group></>}
    </Form>
  )
}

export default ClientInfoForm