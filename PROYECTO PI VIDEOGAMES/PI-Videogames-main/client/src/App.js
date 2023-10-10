import "./App.css";
import Home from "./views/Home/Home";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Detail from "./views/Detail/Detail";
import Form from "./views/Form/Form";
import NavBar from "./components/NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const location = useLocation();
  const [videogame, setVideogame] = useState([]);

  const navigate= useNavigate();
  const [access, setAccess] = useState(false);
  const EMAIL = '';
  const PASSWORD = '';

  const login=(userData)=>{
    if(userData.email === EMAIL && userData.password === PASSWORD){
      setAccess(true);
      navigate('/home');
    }
  }

  useEffect(()=>{
    !access && navigate('/')
  },[access, navigate])


  function onSearch(name) {
    axios(`http://localhost:3001/videogames/name?name=${name}`)
      .then((response) => {
        setVideogame(response.data);
      })
      .catch((error) => {
        alert("Debe agregar un nombre!");
      });
  }

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar onSearch={onSearch} />}
      <Routes>
        <Route path="/" element={<Landing login={login}/>} />
        <Route path="/home" element={<Home videogame={videogame} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
