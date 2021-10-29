import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar, Button} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {useHistory} from 'react-router-dom'
import {logOut} from "../http/userAPI";

const NavBar = () => {
    const {user} = useContext(Context)
    const history = useHistory()
    const logOutUser = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Купи товар</NavLink>
                {user.isAuth ?

                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant="outline-light"
                            onClick={()=>
                                history.push(ADMIN_ROUTE)


                            }
                        >
                            Админ панель
                        </Button>
                        <Button
                            style={{marginLeft: '10px'}}
                            variant="outline-light"
                            onClick={logOutUser}
                        >
                            Выйти
                        </Button>

                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>

                        <Button variant="outline-light" onClick={()=>history.push(LOGIN_ROUTE)}>Авторизация</Button>

                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default observer(NavBar);