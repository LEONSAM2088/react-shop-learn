import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/Navbar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {load} from "dotenv";
import {Spinner} from "react-bootstrap";

function App() {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(()=> setLoading(false))
    }, [])
    if(loading) {
        return (


                <Spinner animation={"grow"}/>

        )
    }
  return (
      <BrowserRouter>
          <NavBar/>
          <AppRouter/>
      </BrowserRouter>
  );
}

export default observer(App);
