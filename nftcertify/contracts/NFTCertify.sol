// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTCertify is ERC721 {
    constructor() ERC721("NFTCertify", "NC") {}

    struct CourseCertificate {
        string studentName;
        string courseName;
        string enrollmentDate;
        string completionDate;
        bool isValid;
    }

    mapping(string => CourseCertificate) private _courseCertificate;
    uint256 private _tokenCounter = 1;

    function issueCourseCertificate(
        string calldata studentName,
        string calldata courseName,
        string calldata enrollmentDate,
        string calldata completionDate
    ) external returns (string memory) {
        string memory tokenId = uintToString(_tokenCounter);
        _courseCertificate[tokenId] = CourseCertificate(
            studentName,
            courseName,
            enrollmentDate,
            completionDate,
            true
        );
        _safeMint(msg.sender, parseInt(tokenId));
        _tokenCounter++;
        return tokenId;
    }

    function getCourseCertificate(
        string calldata tokenId
    )
        external
        view
        returns (
            string memory studentName,
            string memory courseName,
            string memory enrollmentDate,
            string memory completionDate
        )
    {
        require(_exists(parseInt(tokenId)), "Token does not exist");

        CourseCertificate memory certificate = _courseCertificate[tokenId];
        require(certificate.isValid, "Invalid Token ID");

        return (
            certificate.studentName,
            certificate.courseName,
            certificate.enrollmentDate,
            certificate.completionDate
        );
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    function uintToString(uint256 v) internal pure returns (string memory) {
        uint256 maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint256 i = 0;
        while (v != 0) {
            uint256 remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i); 
        for (uint256 j = 0; j < i; j++) {
            s[j] = reversed[i - j - 1]; 
        }
        return string(s); 
    }

    function parseInt(string memory _value) internal pure returns (uint256) {
        bytes memory bResult = bytes(_value);
        uint256 result = 0;
        for (uint256 i = 0; i < bResult.length; i++) {
            if (
                (uint8(bResult[i]) >= 48) &&
                (uint8(bResult[i]) <= 57)
            ) {
                result = result * 10 + (uint8(bResult[i]) - 48);
            }
        }
        return result;
    }
}
