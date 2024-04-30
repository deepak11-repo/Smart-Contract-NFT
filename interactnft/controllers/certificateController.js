// controllers/certificateController.js
const { web3, contract, fromAddress, gasLimit } = require('../utils/web3Provider');

async function issueCertificate(studentName, courseName, enrollmentDate, completionDate) {
    try {
        const receipt = await contract.methods.issueCourseCertificate(studentName, courseName, enrollmentDate, completionDate)
            .send({ from: fromAddress, gas: gasLimit });

        const gasUsed = receipt.gasUsed;
        const gasPrice = receipt.effectiveGasPrice;
        const totalCost = web3.utils.fromWei((gasUsed * gasPrice).toString(), 'ether');

        const tokenId = receipt.events.Transfer.returnValues.tokenId.toString();

        return { totalCost, tokenId };
    } catch (error) {
        throw new Error('Error issuing certificate');
    }
}

async function fetchCertificate(tokenId) {
    try {
        const result = await contract.methods.getCourseCertificate(tokenId).call();

        const studentName = result[0];
        const courseName = result[1];
        const enrollmentDate = result[2];
        const completionDate = result[3];

        return { studentName, courseName, enrollmentDate, completionDate };
    } catch (error) {
        throw new Error('Error fetching certificate');
    }
}

module.exports = { issueCertificate, fetchCertificate };
