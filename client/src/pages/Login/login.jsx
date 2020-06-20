import React  from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import { Content } from "../../styles";
import { Container } from '@material-ui/core';
import LoginService from '../../services/login';
import { useAuth } from '../../contexts/auth';
import './styles.css';

export default function Login(props) {
    const {login} = useAuth();
      
    const responseFacebook = response => {     
        LoginService.login(response)
        .then(res => {
            login({data: res.data, facebook: response}, (user) => {
                if (user) {
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
                    appId={process.env.REACT_APP_FACEBOOK_CLIENT}
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
