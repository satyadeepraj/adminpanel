// pages/ratings.js

const Page7 = ({ pageNumber,totalPages }) => {
    return (
      <div className="p-8 page">
        {/* Ratings Header */}
        <div className="border-b-2 pb-4 mb-4">
          <h1 className="text-xl font-bold text-blue-600">5. Ratings</h1>
          <p className="mt-2">
            The Risk level is divided in four categories:
          </p>
        </div>
  
        {/* Severity Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-blue-900 text-white border-b">Severity</th>
                <th className="px-4 py-2 bg-blue-900 text-white border-b">DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b bg-red-600 text-white">Critical</td>
                <td className="px-4 py-2 border-b border-black">
                  Critical vulnerabilities provide attackers with remote root or administrator capabilities. Malicious users have the ability to compromise the entire host. Easy to detect and exploit and result in large asset damage.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b bg-yellow-500 text-black">High</td>
                <td className="px-4 py-2 border-b border-black">
                  Exploitation of the vulnerability discovered on the system can directly lead to an attacker to information allowing them to gain privileged access (e.g., administrator or root) to the system. These issues are often difficult to detect and exploit but can result in large asset damage.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b bg-yellow-300 text-black">Medium</td>
                <td className="px-4 py-2 border-b border-black">
                  The vulnerability discovered on the system can directly lead to an attacker gaining non-privileged access (e.g., as a standard user) to the system or the vulnerability provides access that can be leveraged within one step to gain administrator-level access. These issues are easy to detect and exploit, but typically result in small asset damage.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 bg-green-500 text-white">Low</td>
                <td className="px-4 py-2 border-b border-black">
                  The vulnerability discovered on the system provides low-level, but sufficient data to the attacker that may be used to launch a more informed attack against the target environment. In addition, the vulnerability may indirectly lead to an attacker gaining some form of access to the system. These issues can be difficult to detect and exploit and typically result in small asset damage.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        {/* Footer */}
        <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Confidential</p>
        <p className="text-sm text-gray-600">  Page {pageNumber} of {totalPages}</p>
      </div>
      </div>
    );
  };
  
  export default Page7;
  