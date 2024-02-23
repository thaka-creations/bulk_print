const fs = require('fs');
const pdfMake = require('pdfmake');

function createPdf(data, outputFilename) {
    const fonts = {
        Roboto: {
            normal: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
            bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
            italics: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
            bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
        },
    };

    const printer = new pdfMake(fonts);

    const docDefinition = {
        content: [],
    };

    // Add data to the PDF
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            docDefinition.content.push(`${key}: ${data[key]}`);
        }
    }

    // Create PDF
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream(outputFilename));
    pdfDoc.end();

    console.log(`PDF created: ${outputFilename}`);
}

function batchPrintFromJson(jsonData) {
    jsonData.forEach((data, index) => {
        const outputFilename = `output_${index + 1}.pdf`;
        (data, outputFilename);
    });
}

// Example JSON data
const jsonData = [
    { Name: 'John Doe', Age: 25, City: 'Example City' },
    { Name: 'Jane Smith', Age: 30, City: 'Another City' },
    // Add more data as needed
];

// Print PDFs from JSON data
batchPrintFromJson(jsonData);
