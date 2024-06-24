
import React from 'react';
import Image from 'next/image';
import OWASPImage from '../public/loginpage/demo-banner.jpg'; // Ensure you have this image in the public directory

const Page6 = () => {
  return (
    <div className="p-8 page">
      {/* Standards Header */}
      <div className="border-b-2 pb-4 mb-4">
        <h1 className="text-xl font-bold text-blue-600">4. Standards</h1>
        <p className="mt-2">
          OWASP: The OWASP web application security testing methodology and explains how to test for evidence of vulnerabilities within the application due to deficiencies with identified security controls.
        </p>
      </div>

      {/* Test Phases */}
      <div className="border-b-2 pb-4 mb-4">
        <p className="mt-2 font-bold">The test is divided into 2 phases:</p>

        <p className="mt-2 font-semibold">Phase 1 Passive mode:</p>
        <p className="mt-2">
          In the passive mode the tester tries to understand the application's logic and plays with the application.
        </p>

        <p className="mt-2 font-semibold">Phase 2 Active mode:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Information Gathering</li>
          <li>Configuration and Deployment Management Testing</li>
          <li>Identity Management Testing</li>
          <li>Authentication Testing</li>
          <li>Authorization Testing</li>
          <li>Session Management Testing</li>
          <li>Input Validation Testing</li>
          <li>Error Handling</li>
          <li>Cryptography</li>
          <li>Business Logic Testing</li>
          <li>Client-Side Testing</li>
        </ul>
      </div>

      {/* OWASP Top 10 Vulnerabilities */}
      <div className="text-center">
        <h2 className="text-lg font-bold mt-4">OWASP TOP 10 Vulnerabilities</h2>
        <div className="mt-4 flex justify-center">
          <Image className=' h-[200px]' src={OWASPImage} alt="OWASP TOP 10 Vulnerabilities" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Confidential</p>
        <p className="text-sm text-gray-600">Page 6 of 40</p>
      </div>
    </div>
  );
};

export default Page6;
