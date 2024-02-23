
const axios = require('axios');
const { exec } = require('child_process');

const printFile = async (docUrl) => {
    try {
        const response = await axios.get(docUrl, { responseType: 'arraybuffer' });

        // Convert to buffer -> rep binary content of the file
        const dataBuffer = Buffer.from(response.data);

        // Use lp command to print the data -> create child process
        const lpCommand = `lp -`;
        const lpProcess = exec(lpCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('Error printing file:', error.message);
            } else {
                console.log('File sent to print successfully.');
            }
        });

        lpProcess.stdin.write(dataBuffer); //transfer data to stdin of lp process
        lpProcess.stdin.end(); // close the stream to signal end of the data
    } catch (error) {
        console.error('Error fetching file:', error.message);
    }
};
module.exports = printFile;
// Example usage
// const fileLinks = [
//     'http://192.168.214.200/sharedservice/media/2024/02/22/18/bf3a3889-b54e-43a9-b93e-14978f9247ca.pdf',
//     'https://css4.pub/2017/newsletter/drylab.pdf',
//     'https://www.princexml.com/samples/invoice/invoicesample.pdf'
// ];

// fileLinks.forEach((fileLink) => {
//     printFile(fileLink);
// });
