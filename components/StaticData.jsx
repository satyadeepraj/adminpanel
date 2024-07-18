// staticData.js
const staticData = {
  "Authentication Bypass": {
    description:
      "It is observed that application Authentication Bypass in Login Module.",
    impact:
      "An authentication process that can be bypassed is a serious risk for the application. An authentication bypass vulnerability removes access controls from the application and opens up the application to anonymous users (attackers). If the application is available externally, the number of potential users who could attack the application is significant. A failure in authentication controls can lead to significant data loss and a lack of control over sensitive operations.",
    recommendation:
      "The input data should be validated for special characters both in value fields and in URL. It is mandatory to implement server-side validations for every input vector in the application i.e. GET as well as POST parameters. Use parameterized queries in the application so that all supplied parameters are treated as data, rather than potentially executable queries. Validation at the client side and server end is mandatory and application must trap all errors and give customized error messages to the user. Note: - Fix it throughout the application.",
  },
  "Broken Access Control": {
    description:
      "Application does not restrict or incorrectly restricts access to a resource from an unauthorized user.  ",

    impact:
      "Anonymous user can access private functions that aren’t protected by just copying the URL. ",

    recommendation:
      " The authentication mechanism should deny all access by default and provide access to specific roles for every function.In a workflow-based application, verify the users’ state before allowing them to access any resources.  ",
  },
  "Reflected XSS": {
    description:
      "XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.",
    impact:
      "An attacker may leverage multiple forms of attacks to compromise applications user’s identity and obtain unauthorized access to the application. The most severe XSS attacks involve disclosure of the user’s session cookie, allowing an attacker to hijack the user’s session and take over the account. Other damaging attacks include the disclosure of end user files, installation of Trojan horse programs, redirect the user to some other page or site, or modify presentation of content.",
    recommendation: (
      <ul>
        <li>
          • Filter input on arrival - At the point where user input is received,
          filter as strictly as possible based on what is expected or valid
          input.{" "}
        </li>
        <li>
          • Encode data on output - At the point where user-controllable data is
          output in HTTP responses, encode the output to prevent it from being
          interpreted as active content. Depending on the output context, this
          might require applying combinations of HTML, URL, JavaScript, and CSS
          encoding.
        </li>
        <li>
          • Use appropriate response headers - To prevent XSS in HTTP responses
          that aren't intended to contain any HTML or JavaScript, you can use
          the Content-Type and X-Content-Type-Options headers to ensure that
          browsers interpret the responses in the way you intend.{" "}
        </li>
        <li>
          • Content Security Policy - As a last line of defense, you can use
          Content Security Policy (CSP) to reduce the severity of any XSS
          vulnerabilities that still occur.
        </li>
      </ul>
    ),
  },
  "Back Button Browsing": {
    description:
      "It is possible to access authenticated pages through back button of the browser. Back button is enabled in the application. ",
    impact:
      " The back, forward and refresh buttons of the browser can be used to steal the session of a previous user.",
    recommendation:
      " All input fields must sanitise the input given to them before sending it to the server.",
  },
  "Weak Cache Management": {
    description:
      "Browsers caching is used for improving performance, so that previously displayed information doesn't need to be downloaded again. But, the pages with sensitive information also get stored in the cache which may lead to sensitive information leakage.  ",
    impact:
      "An attacker may obtain potentially sensitive information stored in browser cache. ",
    recommendation: (
      <ul>
        <li>Issue the following directives in the HTTP response headers:</li>
        <ul>
          <li>HTTP/1.1:</li>
          <ul>
            <li>Cache-Control: no-cache, no-store</li>
          </ul>
          <li>HTTP/1.0:</li>
          <ul>
            <li>Pragma: no-cache</li>
            <li>Expires: &lt;past date or illegal value (e.g., 0)&gt;</li>
          </ul>
        </ul>
        <li>
          Alternatively, the same effect can be obtained directly at the HTML
          level by including in each page that contains sensitive data the
          following code:
        </li>
        <ul>
          <li>HTTP/1.1:</li>
          <ul>
            <li>&lt;META HTTP-EQUIV="Cache-Control" CONTENT="no-cache"&gt;</li>
            <li>&lt;META HTTP-EQUIV="Cache-Control" CONTENT="no-store"&gt;</li>
          </ul>
          <li>HTTP/1.0:</li>
          <ul>
            <li>&lt;META HTTP-EQUIV="Pragma" CONTENT="no-cache"&gt;</li>
            <li>
              &lt;META HTTP-EQUIV="Expires" CONTENT="Sat, 01-Jan-2000 00:00:00
              GMT"&gt;
            </li>
          </ul>
        </ul>
        <li>
          These directives are generally robust, although additional flags may
          be necessary for the Cache-Control header in order to better prevent
          persistently linked files on the filesystem. These include:
        </li>
        <ul>
          <li>
            Cache-Control: must-revalidate, pre-check=0, post-check=0,
            max-age=0, s-maxage=0
          </li>
        </ul>
      </ul>
    ),
  },
  "Request Flooding": {
    description:
      "It is observed that there is no check on the frequency of the form submission, which can lead to potential resource flooding.",
    impact:
      "An attacker can generate many requests for a register, which may cause him/her to switch networks. ",
    recommendation:
      "It is recommended that there should be break of at least 1 minute after the 10 continuous submission. Note: - Fix it throughout the application.",
  },
  "Cross Site Request Forgery": {
    description:
      "Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated.",
    impact:
      "Using CSRF Vulnerability an attacker can force an end user execute unwanted actions.",
    recommendation:
      "It is recommended to generate a CSRF token value in each request and validate at server side.",
  },
  "Session Replay": {
    description:
      "The application does not re-initialize the session ID and reuses it to impersonate an authorized user to perform fraudulent activities. Users can become victims of session replay attacks when session IDs do not have asset session expiration time, or the session data stored in unencrypted form. Web application that allow reusing old session IDs or session credentials for authorization are also vulnerable to session replay attacks.",
    impact:
      "A remote attacker can gain access to victim’s session and perform arbitrary actions with privileges of the user within the compromised session. ",
    recommendation:
      "Session ID should be invalidated by the server once the user logs out and should not be reused in future.",
  },
  "Session Fixation": {
    description:
      "Session Fixation is an attack that permits an attacker to hijack a valid user session. The attack explores a limitation in the way the web application manages the session ID, more specifically the vulnerable web application. When authenticating a user, it doesn't assign a new session ID, making it possible to use an existent session ID. The attack consists of inducing a user to authenticate himself with a known session ID, and then hijacking the uservalidated session by the knowledge of the used session ID. The attacker has to provide a legitimate Web application session ID and try to make the victim's browser use it. ",
    impact:
      "A remote attacker can gain access to victim’s session and perform arbitrary actions with privileges of the user within the compromised session. ",
    recommendation: (
      <ul>
        <li>
          It is recommended to regenerate the Session ID as soon as the user
          logs in to the application. It is highly advised to follow the session
          best practices mentioned below to countermeasure session fixation
          vulnerability:
        </li>
        <ul>
          <li>Do not accept session identifiers from GET / POST variables</li>
          <li>Accept only server-generated SIDs</li>
          <li>Implement Inactivity Logout function</li>
          <li>Time-out old session identifiers</li>
        </ul>
      </ul>
    ),
  },
  "No Account Lockout": {
    description:
      "The application does not restrict the number of requests created on Login page by any user.",
    impact:
      "An adversary can try to brute-force on password field to gain unauthorised access. ",
    recommendation:
      "This could be mitigated by using the following techniques: Using unique tokens in request that could identify repetitive requests at the server end.",
  },
  "Use of Vulnerable Components": {
    description: "It was observed that application uses vulnerable versions.",
    impact:
      "Components, such as libraries, frameworks, and other software modules, almost always run with full privileges. If a vulnerable component is exploited, such an attack can facilitate serious data loss or server takeover. ",
    recommendation: (
      <ul>
        <li>
          Upgrade the component to the latest version and ensure security
          patches are applied. In addition, the following patch management
          process must be in place:
        </li>
        <ul>
          <li>
            Remove unused dependencies, unnecessary features, components, files,
            and documentation.
          </li>
          <li>
            Continuously inventory the versions of both client-side and
            server-side components (e.g., frameworks, libraries) and their
            dependencies using tools like versions, DependencyCheck, retire.js,
            etc. Continuously monitor sources like CVE and NVD for
            vulnerabilities in the components.
          </li>
          <li>
            Only obtain components from official sources over secure links.
            Prefer signed packages to reduce the chance of including a modified,
            malicious component.
          </li>
        </ul>
      </ul>
    ),
  },
  "Directory Listing": {
    description:
      "It is observed that directory listing vulnerability is existing in the application. ",
    impact:
      "Web servers are configured to pass the unrecognized host header to the first virtual host in the list. Therefore, it’s possible to send requests with arbitrary host headers to the first virtual host. ",
    recommendation: "It is recommended to disable directory listing.",
  },
  "Clickjacking Attack": {
    description:
      "It’s observed that clickjacking attack is existing in the application.  ",
    impact:
      "This type of attack, used alone or in combination with other attacks, could potentially send unauthorized comments or reveal confidential information while the victim is interacting on seemingly harmless web pages. ",
    recommendation:
      "The server-side header “X-frame Options” can permit or forbid displaying the page inside a frame. Thus, the application will not be able to open in any third party application. ",
  },

  "Cookie Not Flagged ‘HttpOnly’": {
    description:
      "HttpOnly cookies cannot be read by client-side scripts, therefore marking a cookie as HTTPOnly can provide an additional layer of protection against cross-site scripting attacks. ",
    impact:
      "During a cross-site scripting attack, an attacker might easily access cookies and hijack the victim's session. ",
    recommendation:
      "It is recommended to implement secure flag set on all cookies that are used for transmitting sensitive data when accessing content over HTTPS.",
  },

  "Server Banner Grabbing": {
    description:
      "Banner grabbing is a technique used to remotely glean information about the web server (version, underlying OS, vendor etc.).",
    impact:
      "By identifying the HTTP server, the attacker can determine known vulnerabilities related to the web server and the appropriate exploits for the same.",
    recommendation:
      "It is recommended to disable the banner and upgrade to the latest version. The web server should be hardened according to industry best practices and configured appropriately.",
  },
  "Cookies without Secure Flag": {
    description:
      "It is observed that the cookie does not have the Secure flag set.",
    impact:
      "An attacker may be able to induce this event by feeding a user suitable links, either directly or via another website.",
    recommendation:
      "It is recommended to implement the secure flag set on all cookies that are used for transmitting sensitive data when accessing content over HTTPS.",
  },
  "HSTS Policy not Implemented": {
    description:
      "It is observed that the application HSTS policy is not implemented.",
    impact:
      "An attacker able to modify a legitimate user's network traffic could bypass the application's use of SSL/TLS encryption and use the application as a platform for attacks against its users.",
    recommendation: (
      <ul>
        <li>
          {" "}
          The application should instruct web browsers to only access the
          application using HTTPS. To do this, enable HTTP Strict Transport
          Security (HSTS) by adding a response header with the name
          'Strict-Transport-Security' and the value 'max-age=expireTime', where
          expireTime is the time in seconds that browsers should remember that
          the site should only be accessed using HTTPS. Consider adding the
          'includeSubDomains' flag if appropriate.
        </li>
        <li>
          {" "}
          [Note that because HSTS is a 'trust on first use' (TOFU) protocol, a
          user who has never accessed the application will never have seen the
          HSTS header, and will therefore still be vulnerable to SSL stripping
          attacks. To mitigate this risk, you can optionally add the 'preload'
          flag to the HSTS header, and submit the domain for review by browser
          vendors].
        </li>
      </ul>
    ),
  },
  "Path is Set to Default Root i.e. '/'": {
    description:
      "It is observed that the path is set to the default root i.e. '/' in the application.",
    impact:
      "If the path is set to the root directory '/' then it can be vulnerable to less secure applications on the same server.",
    recommendation: "Path should be implemented properly.",
  },
  "Audit Trails Not Implemented": {
    description:
      "An audit trail is typically required to always run in a privileged mode, so it can access and supervise all actions from all users.",
    impact:
      "In case a malicious user tries to attack the application, the application will not be able to trace the attacker.",
    recommendation:
      "Implement audit trails having audit logs with user-id, IP address, login-logout date and time, sensitive activity (i.e., change password, user registration, etc. depending upon the application’s usability).",
  },
  "Insecure Communication": {
    description: "It is observed that the application works over HTTP.",
    impact:
      "An attacker can easily capture the traffic because network traffic is running in clear text.",
    recommendation:
      "Applications should use transport-level encryption TLS 1.2 to protect all communications passing between the client and the server. The Strict-Transport-Security HTTP header should be used to ensure that clients refuse to access the server over an insecure connection.",
  },
  "DMARC Policy Not Implemented": {
    description:
      "DMARC stands for 'Domain-based Message Authentication, Reporting & Conformance.' DMARC is a protocol that uses Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) to determine the authenticity of an email message.",
    impact:
      "An attacker can spoof the domain, phish on customers of the organization, cause brand abuse and scams, and launch malware and ransomware attacks.",
    recommendation: (
      <ul>
        <li>Implement DMARC policy.</li>
        <li>
          Ref Link:
          https://www.proofpoint.com/sites/default/files/how-to-implement-dmarc-technical-brief-cm.pdf
        </li>
      </ul>
    ),
  },
  "CSP Policy Header not implemented": {
    description:
      "Content Security Policy (CSP) header is not implemented. CSP is an added layer of security that helps to mitigate mainly Cross-site Scripting attacks.",
    impact:
      "There is no direct impact of not implementing CSP on your website. However, if your website is vulnerable to a Cross-site Scripting attack, CSP can prevent successful exploitation of that vulnerability. By not implementing CSP, you’ll be missing out on this extra layer of security.",
    recommendation:
      "Enable CSP on your website by sending the Content-Security-Policy in HTTP response headers that instruct the browser to apply the policies you specified.",
  },
  "Weak Password Policy": {
    description:
      "It is observed that password complexity is not implemented in the application.",
    impact:
      "It is possible for the attacker to guess the credentials of application users if the admin user sets simple passwords while creating users or modifying user passwords.",
    recommendation:
      "Passwords should have restrictions that require a minimum size (8-15 characters) and complexity for the password. Complexity typically requires the use of minimum combinations of alphabetic, numeric, and non-alphanumeric characters in a user’s password (e.g. one special character ($, @, #, &), one upper case letter, one lower case letter, and one number like Test@123).",
  },
  "Another Domain Open In Same Tab": {
    description: "It is observed that another domain opens in the same tab.",
    impact: "Anonymous users can access private functions.",
    recommendation: "Another domain should be opened in another tab.",
  },
  "Referer Policy Not Implemented": {
    description:
      "Referrer-Policy is a security header that can (and should) be included on communication from your website's server to a client. The Referrer-Policy tells the web browser how to handle referrer information that is sent to websites when a user clicks a link that leads to another page or website.",
    impact:
      "Referrer header is a request header that indicates the site from which the traffic originated. In case of inadequate prevention, the URL itself, and even sensitive information contained in the URL will be leaked to the referrer site.",
    recommendation: (
      <ul>
        <li>
          Implement a Referrer-Policy by using the Referrer-Policy response
          header or by declaring it in the meta tags.
        </li>
        <li>
          {" "}
          Ref Link:
          https://www.blackhillsinfosec.com/fix-missing-referrer-policy-website/
        </li>
        <li>
          {" "}
          https://www.netsparker.com/web-vulnerability-scanner/vulnerabilities/referrer-policy-not-implemented/
        </li>
      </ul>
    ),
  },

  // Add more static data as needed
};

export default staticData;
