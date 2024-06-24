import React from "react";

const Page4 = () => {
  const items = [
    { srno:1,title: "Introduction", page: 5 },
    { title: "Scope", page: 5 },
    { title: "Methodology", page: 5 },
    { title: "Standards", page: 6 },
    { title: "Ratings", page: 7 },
    { title: "Finding Summary", page: 8 },
    { title: "Overall Finding Summary", page: 9 },
    { title: "Overall Severity", page: 9 },
    { title: "Detailed Findings", page: 10 },
    { title: "Authentication Bypass", page: 10 },
    { title: "Broken Access Control", page: 11 },
    { title: "Reflected XSS", page: 13 },
    { title: "Back Button Browsing", page: 14 },
    { title: "Weak Cache Management", page: 16 },
    { title: "Request Flooding", page: 17 },
    { title: "Cross Site Request Forgery", page: 19 },
    { title: "Session Replay", page: 21 },
    { title: "Session Fixation", page: 22 },
    { title: "No Account Lockout", page: 24 },
    { title: "Use of Vulnerable Components", page: 25 },
    { title: "Directory Listing", page: 26 },
    { title: "Clickjacking Attack", page: 27 },
    { title: "Cookie Not Flagged 'HttpOnly'", page: 28 },
    { title: "Server Banner Grabbing", page: 29 },
    { title: "Cookies without Secure Flag", page: 30 },
    { title: "HSTS Policy not Implemented", page: 31 },
    { title: "Path is Set to Default Root i.e. '/'", page: 32 },
    { title: "Audit Trails Not Implemented", page: 33 },
    { title: "Insecure Communication", page: 34 },
    { title: "DMARC Policy Not Implemented", page: 35 },
    { title: "CSP Policy Header not Implemented", page: 36 },
    { title: "Weak Password Policy", page: 37 },
    { title: "Another Domain Open in Same Tab", page: 38 },
    { title: "Referer Policy Not Implemented", page: 39 },
    { title: "Conclusion", page: 40 },
    { title: "Use of Payloads and Exploitation", page: 40 },
  ];

  return (
    <div className="p-4 page ">
      <h1 className="text-center text-2xl font-bold mb-4">Table of Contents</h1>
      <table className="w-full text-sm">
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
             
              <td className="py-1"><span > {index+1}.</span><span className=" ml-6">{item.title}</span></td>
              <td className="py-1 text-right">{item.page}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-sm text-right mt-4">Confidential</div>
      <div className="text-sm text-right">Page 4 of 40</div>
    </div>
  );
};

export default Page4;
