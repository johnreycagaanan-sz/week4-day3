//! 1. Please list and explain in 1-2 sentences of the top 10 OWASP risks

//? Broken Access Control
//  - This happens when certain routes from the system are not protected. Attackers may be able to collect or tamper
//    data which should not be available to them without specific conditions.

//? Cryptographic Failures
// -Sensitive information from the users such as passwords should be hashed before saving it in the database to avoid
// disclosure. When the system fails to do so, it is considered as a cryptographic failure.

//? Injections
// -Attackers can manipulate the system by inserting scripts into their inputted data through forms, URLs, etc...

//? Insecure Design
// -Insecure design is kind of a general idea when a system's design is prone to security breach. This usually happens
// when the risks are not identified earlier in the lifecycle.

//? Security Misconfiguration
// -This is when some levels of security within a system is not configured properly. Two examples are when the default
// credentials of the users are still unchanged or when stack traces reveal too much information to the users.

//? Vulnerable and Outdated Components
// When certain packages or components used are not up to date, it becomes vulnerable and prone to attacks.

//? Identification and Authentication Failures
// Occurs when a system's authentication is very weak. Examples include when it allows weak passwords to be used by the users.
// It is also easy to breach into it by using brute force or when an attacker enters a numerous amount of passwords until
// the attacker gets the right password.

//? Software and Data Integrity Failures
// -Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations.
// An example is when a system or application relies upon plugins, libraries, or packages from untrusted sources.

//? Security Logging and Monitoring Failures
// -It can become difficult to detect breaches without logs or constant monitoring. Logs and other events should be easily tracked
// so the developers can attend to it immediately.

//? Server Side Request Forgery(SSRF)
// -The attacker abuses functionality on a server to retrieve or tamper data from other database. This can result to
// exposure of sensitive informations to the attacker which the attacker can then manipulate.



//! 2. In 2-3 sentences, please explain what NoSQL Injection is and a solution.
// NoSQL Injection happens when users inject a syntax that is similar to how to access data in a NoSQL database
//  into their user inputted data to manipulate the application.
// To prevent this, the said inputted data can be validated and sanitized through express-mongo-sanitize. This package
// changes certain symbols such as the dollar sign through prevent it from altering the data.
 


//! 3. In 2-3 sentences, please explain what cross site scripting is and a solution
// Cross-site scripting is another type of injection in which the attacker can insert malicious javascript scripts into websites
// or applications to tamper it. It can be prevented through the xss-clean which inserts symbols or letters whenever it sees
// a <script> to break it.



//! 4. In 2-3 sentences, please explain what rate limiting is and a solution
// Rate limiting prevents attackers from entering many passwords within a certain amount of time. You can do it by installing
// express-rate-limit to limit the number of attempts the user can try within a specific time frame.



//! 5.In 2-3 sentences, please explain what CORS is and a solution
// CORS which means cross-origin resource sharing is an HTTP-header based mechanism that allows a server to indicate 
// any origins other than its own from which a browser should permit loading resources. It can be prevented by installing and
// using a package called cors.