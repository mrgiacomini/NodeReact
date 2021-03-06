import React, { useState } from 'react'
import { Content } from "../../styles";
import { Container, Card, CardContent, CardHeader,  Divider, IconButton, Button, Tooltip } from '@material-ui/core';
import Service from '../../services/service';
import Form from '../../components/Form/form';
import ConfirmationDialog from '../../components/Dialogs/confirmation';
import { FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { getCookie, isAuth } from '../../helpers/auth';
import './styles.css';


function Register (props) {
    const client = props.location.initialValues;

    const [open, setOpen] = React.useState(false);
    
    function openDeleteConfirmation() {
        setOpen(true);
    }

    function closeDeleteConfirmation(option) {
        setOpen(false);
        if (option)
            deleteClient();
    }

    const [initialValues, setInitialValues] = useState({
        name: '',
        phone: '',
        email: '',
        date: new Date(),
        location: '',
        totalAmount: '',
        description: '',
        disabled: false,
        success: false
    });

    function saveClient(values) {
        const userLogged = getCookie('token');
        if (userLogged) {
            values.userId = isAuth().data.user._id;
            if (!client) {
                Service.addClient(values)
                    .then(res => {
                        if (!res.data.errors) {
                            setInitialValues({success: true});
                            setTimeout(() => props.history.push('/'), 2000);
                        } else 
                            setInitialValues({success: false});                
                });
            } else 
                Service.updateClient(values)
                    .then(res => {
                        if (!res.data.errors) {
                            setInitialValues({success: true});
                            setTimeout(() => props.history.push('/'), 2000);
                        } else 
                            setInitialValues({success: false});                
                    });
        }
    }

    function deleteClient() {
        if (!!client)
            Service.deleteClient(client._id)
                .then(res => {
                    if (!res.data.errors) {
                        setInitialValues({success: true});
                        props.history.push('/');
                    } else 
                        setInitialValues({success: false});
                
                });
    }

    function sendEmail() {
        Service.sendEmail(client)
            .then(res => {
                console.log('enviado');
            });
    }

    return (
            <Container maxWidth="lg">
                <Content>
                    <Card> 
                        <CardHeader 
                            title={!client ? "Cadastro" : "Edição"} 
                            className="header"
                            action={
                                !!client &&
                                <IconButton onClick={openDeleteConfirmation} >
                                    <Tooltip title="Excluir Cliente" arrow>
                                    <span><FiTrash2 className="trash"/></span>
                                    </Tooltip>
                                </IconButton>
                            }/> 
                        <Divider variant="middle"/>
                        <CardContent>
                            <Form 
                                initialValues={client ? client : initialValues} 
                                saveClient={saveClient}
                                sendEmail={sendEmail}
                            />
                        </CardContent>
                    </Card>
                    { initialValues.success &&
                        <div className="success">
                            <h1>
                                <FiCheckCircle />
                                Salvo com sucesso!
                            </h1>
                        </div>
                    }
                </Content>

                <ConfirmationDialog
                    title={() => "Excluir"}
                    content={() => "Deseja realmente excluir?"}
                    footer={() => (
                    <>
                        <Button onClick={() => closeDeleteConfirmation(false)}> Não </Button>
                        <Button onClick={() => closeDeleteConfirmation(true)} color="primary"> Sim </Button>
                    </>
                    )}
                    open={open}
                />
            </Container>     
    );

}

export default Register;
