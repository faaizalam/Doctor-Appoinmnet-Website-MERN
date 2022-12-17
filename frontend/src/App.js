import './App.css';
import {BrowserRouter,Link ,Route,Routes} from "react-router-dom"
// import { Login } from './Screen/Login';
// import 'antd/dist/antd.css';
// booo

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Login } from './Screen/Login';
import { Register } from './Screen/Register';
import { useDispatch, useSelector } from 'react-redux';

import { Home } from './Screen/UserScreen/Home';
import {  Usersignout } from './Store/Action';
import { ToastContainer } from 'react-toastify';
// import { useEffect } from 'react';
import Att from './Screen/Att';
import { Protected } from './Component/Protected';
import { Appoinment } from './Screen/UserScreen/Appoinment';
import Apply from './Screen/UserScreen/Apply';
import { Admin } from './Component/Admin';
import { Userlist } from './Screen/Adminscreen/Userlist';
import { Doctors } from './Screen/Adminscreen/Doctors';
import { Profile } from './Screen/Adminscreen/Profile';
import Notification from './Screen/Adminscreen/Notification';
import NotificationAdmin from './Screen/Adminscreen/NotificationAdmin';
import { useEffect } from 'react';
import Axios  from 'axios';
import { login } from './Store/Reducer';
import Video from './Screen/Adminscreen/Video';
import AlluserProtected from './Component/AlluserProtected';
import { Erroroage } from './Screen/Erroroage';
import DrProfile from './Screen/Adminscreen/DrProfile';
import DRAppoinmentScreen from './Screen/UserScreen/DRAppoinmentScreen';
// import { useSelector } from 'react-redux';


function App() {
  const  {Userinfo}= useSelector((state)=>state.UserLogin)
  const disptach=useDispatch()
 
  const signout=(()=>{
    disptach(Usersignout())
  })
  // const {pathname} = useLocation()
  // const {Userinfo}=useSelector((state)=>state.UserSign)
  useEffect(()=>{
    if (Userinfo.name) {
      
      const re=(async()=>{
        const {data}=await Axios.get(`/postman/dr/${Userinfo._id}`)
        console.log(data,"app")
          let payload=data
        if (data.user) {
          disptach(login.loginsucess(payload))
          
          localStorage.setItem("userInfo",JSON.stringify(data.user))
        }
      })
      re()
    }
       
  
   },[Userinfo._id, Userinfo.name, disptach])
 
  return (
    <BrowserRouter>
    
   
    <div className="App">
   <header className=''>
   <Navbar collapseOnSelect expand="lg" bg="" variant="dark" className='h'>
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {/* <Link to="/Admin" className='as'>{Userinfo.name&&Userinfo.email}</Link> */}
            <ToastContainer/>
            {/* <Link to="/" className='as' onClick={signout}>Logout</Link>
            <Link to="/Login" className='as'>Login</Link> */}
            {
              (Userinfo.name&& Userinfo.isAdmin)&&(<div><Link to="/video">Video</Link></div>)
            }
            {
              Userinfo.name?( <span><Link to="/" className='as' onClick={signout}>Logout {" "} {Userinfo.name} {Userinfo.isAdmin&&<div>Admin</div>}</Link></span>):( <Link to="/Login" className='as'>Login</Link>)
      }
          
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    

   </header>

   
  <main>
    <Routes>
      
      <Route path='/' element={<Register/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Home' element={<Protected><Home/></Protected>}/>
      <Route path='/Appoinment' element={<Protected><Appoinment/></Protected>}/>
      <Route path='/Apply' element={<Protected><Apply/></Protected>}/>
      <Route path='/att' element={<Att/>}/>
      {/* ....Admnin */}
      <Route path='/users'  element={<Admin><Userlist/></Admin>}></Route>
      <Route path='/users/:id' element={<Admin><Userlist/></Admin>}></Route>
      <Route path='/Doctors' element={<Admin><Doctors/></Admin>}></Route>
      <Route path='/Profile' element={<Admin><Profile/></Admin>}></Route>
      <Route path='/RedirectNoti' element={<AlluserProtected><Notification/></AlluserProtected>}></Route>
      <Route path='/Admin/Notifiaction' element={<Admin><NotificationAdmin/></Admin>}></Route>
      <Route path='/Drprofile' element={<AlluserProtected><DrProfile/></AlluserProtected>}></Route>
      <Route path="/DrAppoinment/:id"element={<AlluserProtected><DRAppoinmentScreen/></AlluserProtected>} ></Route>
      <Route path='*' element={<Erroroage></Erroroage>}></Route>

   
      
    </Routes>

  </main>


    

     
    <footer>
      
     <div className='footers'> All right reserverd</div>
     
      </footer>
     
    </div>

    </BrowserRouter>
  );
}

export default App;
