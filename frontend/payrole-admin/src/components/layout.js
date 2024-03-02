import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from './sidebar';
import Navbar from './navbar';
import Tabel from './tabel';
import Alert from './alert';
import { clientList } from '../service/clientService';
import './css/layout.css'

const Layout = () => {
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState(1);
  const [list, setList] = useState([]);
  const [curr, set_Curr] = useState(1);
  const [message, setMessage] = useState("");
  const [show, handleShow] = useState(false);
  const [modalFetch, setModalFetch] = useState(false);
  const [query, setQuery] = useState({
    page: curr,
    row: 5,
    sort: "asc",
    filter: "ACTIVE"
  })
  useEffect(()=>{
    if (!localStorage.getItem("token")) {
      // navigate("/Payrole-Admin/")
      navigate("/")
    }
  }, []);

  useEffect(()=>{(
    async () => {
        const {success, data, message} = await clientList(query);
        if (!success) {
          handleShow(true);
          setMessage(message);
          setTimeout(()=>{
            handleShow(false);
        }, 5000);
        }
        else {
          if(data.length === 0){
            setList(data);
            set_Curr(1);
            setTotalPage(1);
          }
          else {
            setTotalPage(parseInt(data[0].page.split(" ")[2]));
            setList(data[0].list);
          }
          setModalFetch(false)
        }
      }
      )();
  }, [query, modalFetch])
  
  const handleList = (filter) => {
    setQuery({
      ...query,
      filter: filter
    });
    const navLinks = document.getElementsByClassName("navLink");
    for (const link of navLinks) {
       if(link.classList.contains("active")){
            link.classList.remove("active")
       }
       if(link.id === filter){
            link.classList.add("active")
       }
    }
  }
  return (
    <div className='mainLayout'>
        <div style={{width: "20vw"}}>
            <Sidebar />
        </div>
        <div style={{width: "80vw"}}>
            <Alert show={show} message={message}/>
            <Navbar handleList={handleList} setMessage={setMessage} handleShow={handleShow} setModalFetch={setModalFetch} />
            <Tabel query={query} setQuery={setQuery} list={list} curr={curr} set_Curr={set_Curr} deleted={query.filter === "DELETED"} activeTab={query.filter} setMessage={setMessage} handleShow={handleShow} setModalFetch={setModalFetch} totalPage={totalPage}/>
        </div>
    </div>
  )
}

export default Layout