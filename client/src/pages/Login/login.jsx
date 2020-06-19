import React  from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import { Content } from "../../styles";
import { Container } from '@material-ui/core';
import LoginService from '../../services/login';
import { authenticate, isAuth } from '../../helpers/auth';
import './styles.css';

export default function Login(props) {
    const responseFacebook = response => {     
        LoginService.login(response)
        .then(res => {
            authenticate({data: res.data, facebook: response}, () => {
                const user = isAuth();
                if (user) {
                    props.handleLogin(user);
                    props.history.push('/');
                }
            });
            
        });
    };

    return (
        <Container maxWidth="lg">
            <Content>
                <div style={{textAlign: 'center'}}>
                    <FacebookLoginWithButton
                    appId="3115359865198631"
                    autoLoad={false}
                    fields="name,email,picture"
                    language="pt_BR"
                    callback={responseFacebook}
                    icon="fa-facebook"
                    textButton={<span style={{textTransform: 'none'}}>Entrar com o Facebook</span>}
                    disableMobileRedirect={true}/>
                </div>
           
            </Content>
        </Container>
    )
}
