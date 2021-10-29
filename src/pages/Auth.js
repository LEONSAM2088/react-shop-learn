import React, {useContext, useState} from 'react';
import {Container, Form, Button} from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)

            }
            user.setUser(user)
            user.setIsAuth(true)

            history.push(SHOP_ROUTE)

        } catch (e) {
            alert(e.response.data.message)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 56}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin?'Авторизация':'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите почту..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Лох получается!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Не лох получается!</NavLink>
                            </div>
                        }
                        <Button
                            className="align-self-end"
                            variant="outline-success"
                            onClick={click}
                        >

                            {isLogin?'Войти':'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>

        </Container>
    );
};

export default observer(Auth);




/*
import React from 'react';
import {Container, Form, FormControl, Button} from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import {REGISTRATION_ROUTE} from "../utils/consts";
import {NavLink} from "react-router-dom";



const Auth = () => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 56}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите почту..."
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль..."
                    />
                    <Row className="d-flex justify-content-between mt-3">
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Лох получается!</NavLink>
                        </div>
                        <Button
                            className="mt-3 align-self-end"
                            variant="outline-success"
                        >

                            Войти
                        </Button>
                    </Row>

                </Form>
            </Card>

        </Container>
    );
};

export default Auth;







 */