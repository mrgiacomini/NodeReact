var Mustache = require("mustache");
var fs = require("fs");
var pdf = require("html-pdf");

exports.createNfse = async (nfse) => {    
   // console.log("generatePdf" + nfse);

    var page = fs.readFileSync("C:\\Users\\supero\\Desktop\\Pessoal\\Aplicativo Giacomini Pinturas\\nfse-template.html").toString();    

    var html = Mustache.render(page, nfse);

    //console.log(h);

    const options = {
        type: 'pdf',
        format: 'A4',
        orientation: 'portrait'
    }

    return createResult = pdf.create(html, options);
};
