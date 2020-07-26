const mongoose = require('mongoose');

const nfseSchema = new mongoose.Schema(
    {
        ChaveAcesso: String,
        NumeroNf: Number,
        CodigoVerificacao: String,
        DataEmissao: Date,
        OutrasInformacoes: String,
        ValoresNfse: {
            BaseCalculo: String,
            Aliquota: String,
            ValorIss: String,
            ValorLiquidoNfse: String
        },
        PrestadorServico: {
            IdentificacaoPrestador: {
                CpfCnpj:{
                    Cnpj: String,
                    Cpf: String,
                },
                InscricaoMunicipal: String
            },
            Endereco:{
                Endereco: String,
                Numero: String,
                Bairro: String,
                CodigoMunicipio: Number,
                Uf: String,
                CodigoPais: Number,
                Cep: String
            },
            Contato: {
                Telefone: String,
                Email: String 
            },
            RazaoSocial: String,
        },
        OrgaoGerador:{
            CodigoMunicipio: Number,
            Uf: String
        },
        DeclaracaoPrestacaoServico: {
            InfDeclaracaoPrestacaoServico: {
                Competencia: Date,
                Servico: {
                    Valores: {
                        ValorServicos: String,
                        ValorDeducoes: String,
                        ValorPis: String,
                        ValorCofins: String,
                        ValorInss: String,
                        ValorIr: String,
                        ValorCsll: String,
                        OutrasRetencoes: String,
                        ValorIss: String,
                        Aliquota: String,
                        DescontoIncondicionado: String,
                        DescontoCondicionado: String
                    },
                    IssRetido: String,
                    ResponsavelRetencao: String,
                    ItemListaServico: String,
                    CodigoTributacaoMunicipio: String,
                    Discriminacao: String,
                    CodigoMunicipio: Number,
                    ExigibilidadeISS: String,
                    MunicipioIncidencia: Number
                },                    
                Tomador:{
                    IdentificacaoTomador:{
                        CpfCnpj:{
                            Cnpj: String,
                            Cpf: String,
                        },
                        InscricaoMunicipal: String
                    },
                    RazaoSocial: String,
                    Endereco: {
                        Endereco: String,
                        Numero: String,
                        Bairro: String,
                        CodigoMunicipio: Number,
                        Uf: String,
                        CodigoPais: Number,
                        Cep: String
                    },
                    Contato:{
                        Telefone: String,
                        Email: String
                    }
                },
                RegimeEspecialTributacao: String,
                OptanteSimplesNacional: String,
                IncentivoFiscal: String
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('NFSe', nfseSchema);