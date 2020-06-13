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
            authenticate(res, () => {
                if (isAuth()) {
                    props.handleLogin();
                    props.history.push('/');
                }
            });
            
        });
    };

    const componentClicked = () => {
    }

    return (
        <Container maxWidth="lg">
            <Content>
                <div style={{textAlign: 'center'}}>
                    <FacebookLoginWithButton
                    appId="3115359865198631"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                    icon="fa-facebook"
                    textButton={<span style={{textTransform: 'none'}}>Entrar com o Facebook</span>}
                    disableMobileRedirect={true}
                    isMobile={false}
                    redirectUri='https://teste-fb-login.herokuapp.com'/>
                </div>
           
            </Content>
        </Container>
    )
}
