var soap = require('soap');
const NFSe = require('../models/nfse');

exports.get = async (req,res) => {
    var urlTeste = 'http://fi1.fiorilli.com.br:5663/IssWeb-ejb/IssWebWS/IssWebWS?wsdl';
    var urlProd = 'C:\\Users\\fabiu\\Desktop\\IssWebWS-prod.xml';
    var consultarNfseServicoPrestadoProd = {
        ConsultarNfseServicoPrestadoEnvio: {
            Prestador: {
                CpfCnpj: {
                    Cnpj: '14775228000168'
                },
                InscricaoMunicipal: '4.864' 
            },
            NumeroNfse: '3',
            Pagina: '1'
        },
        username: '14775228000168',
        password: '14775228'
    };

    var nf = {};
    return (
        soap.createClientAsync(urlProd).then((client) => {
            return client.consultarNfseServicoPrestadoAsync(consultarNfseServicoPrestadoProd).then((result) => {
                if (!!result[0]?.ConsultarNfseServicoPrestadoResposta?.ListaMensagemRetorno?.MensagemRetorno[0])
                    return res.json({error: result[0].ConsultarNfseServicoPrestadoResposta?.ListaMensagemRetorno?.MensagemRetorno[0].Mensagem})
                
                nf = result[0]?.ConsultarNfseServicoPrestadoResposta?.ListaNfse?.CompNfse[0]?.Nfse?.InfNfse;
                
                if (!!nf) {
                    var NFse = new NFSe(); 
                    NFse = nf.InfNfse;
                    NFse.ChaveAcesso = NFse.attributes.Id;
                    NFse.attributes = null;
                   
                    NFSe.create(NFse).then((data) => {
                        return res.json(data);
                    })
                    .catch(error => { return res.json(error)});
                } else
                    return res.json({error: 'Erro ao buscar NF.'});
            });
        }).catch(e => {
            if (!!e?.response) {
                console.log(e?.response?.statusCode)
                console.log(e?.body);
                if (e?.response?.statusCode == 500) 
                    return res.json({error: e.body?.split('Error:')[1]?.split('<')[0]});
            }
        })
    );   
    
};