import React  from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import { Content } from "../../styles";
import { Container, Button } from '@material-ui/core';
import Service from '../../services/service';
import { authenticate, isAuth } from '../../helpers/auth';
import './styles.css';

export default function Login(props) {
    const responseFacebook = response => {        
        Service.login(response)
        .then(res => {
            authenticate(res, () => {
                if (isAuth())
                    props.history.push('/');
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
                    textButton={<span style={{textTransform: 'none'}}>Entrar com o Facebook</span>}/>
                </div>
           
            </Content>
        </Container>
    )
}