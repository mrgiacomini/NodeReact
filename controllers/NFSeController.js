var soap = require('soap');
const NFSe = require('../models/nfse');

exports.getByNumber = async (req,res) => {
    const {numeroNfse, username, password} = req.body;
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
            NumeroNfse: numeroNfse,
            Pagina: '1'
        },
        username: username,
        password: password
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

exports.get = async (req,res) => {
    const {username, password} = req.body;
    var urlTeste = 'http://fi1.fiorilli.com.br:5663/IssWeb-ejb/IssWebWS/IssWebWS?wsdl';
    var urlProd = 'C:\\Users\\fabiu\\Desktop\\IssWebWS-prod.xml';
    var numberOfNFSE = 3;

    // numberOfNFSE = await NFSe.countDocuments({});
    // console.log(numberOfNFSE)
    
    var consultarNfseFaixaProd = {
        ConsultarNfseFaixaEnvio: {
            Prestador: {
                CpfCnpj: {
                    Cnpj: '14775228000168'
                },
                InscricaoMunicipal: '4.864' 
            },
            Faixa: {
                NumeroNfseInicial: '1',
                NumeroNfseFinal: numberOfNFSE.toString()
            },
            Pagina: '1'
        },
        username: username,
        password: password
    };
    
    var loop = false, retornoAnterior = {}, retorno = {};
    
    try {
        const client = await soap.createClientAsync(urlProd);
            
        do {            
            const result = await client.consultarNfsePorFaixaAsync(consultarNfseFaixaProd);
          
            const msgError = result[0]?.ConsultarNfseFaixaResposta?.ListaMensagemRetorno?.MensagemRetorno;
            const nfList = result[0]?.ConsultarNfseFaixaResposta?.ListaNfse;
          
            if (!!nfList && nfList.CompNfse.length > 0) {
                retorno = nfList;
                loop = true;
                var num = Number(consultarNfseFaixaProd.ConsultarNfseFaixaEnvio.Faixa.NumeroNfseFinal);
                consultarNfseFaixaProd.ConsultarNfseFaixaEnvio.Faixa.NumeroNfseFinal = ++num;
            
            } else if (!!msgError && !!msgError[0] && msgError[0].Codigo == 'E323') { //NF final não encontrada 
                loop = false;
                retorno = {...retornoAnterior};
                return res.json(retornoAnterior);
            }

            if (!!msgError && !!msgError[0]) {          
                retorno = res.json({error: msgError[0].Mensagem});
                console.log(msgError[0].Mensagem);
            }

            retornoAnterior = {...retorno};
        } while (loop);
        
        return res.json(retorno);
            
    } catch(e) {
        if (!!e?.response) {
            console.log(e?.response?.statusCode)
            console.log(e?.body);
            if (e?.response?.statusCode == 500) 
                return res.json({error: e.body?.split('Error:')[1]?.split('<')[0]});
        }
    }
};

