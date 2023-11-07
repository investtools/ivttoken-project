# Schools Route

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
<div class="container">
  <div class="card">
    <h3>getSchoolsToBeApproved</h3>
    <p><strong>Description:</strong> Fetches the list of schools awaiting approval</p>
    <p><strong>Output:</strong> <span class="card-output">Array of schools</span></p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>schoolToBeApproved</h3>
    <p><strong>Description:</strong> Creates a new school to be approved by the administrator</p>
    <p><strong>Input:</strong> Name, State, City, Zip Code, Address, CNPJ, Inep Code, Email, Administrator</p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Mutation</p>
  </div>
  <div class="card">
    <h3>getLatLon</h3>
    <p><strong>Description:</strong> Fetches the latitude and longitude based on input</p>
    <p><strong>Input:</strong> City, State</p>
    <p><strong>Output:</strong> Latitude and Longitude</p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>getAll</h3>
    <p><strong>Description:</strong> Fetches all schools</p>
    <p><strong>Output:</strong> Array of schools</span></p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>getAvailable</h3>
    <p><strong>Description:</strong> Fetches the list of available schools</p>
    <p><strong>Output:</strong> Array of schools</span></p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>getSchoolsWithTokens</h3>
    <p><strong>Description:</strong> Fetches the list of schools that have token amounts</p>
    <p><strong>Output:</strong> Array of schools</span></p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>getNoTokensSchools</h3>
    <p><strong>Description:</strong> Fetches the list of schools without tokens</p>
    <p><strong>Output:</strong> Array of schools</span></p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>findSchoolNameByCnpj</h3>
    <p><strong>Description:</strong> Fetches the school name based on CNPJ</p>
    <p><strong>Input:</strong> School's CNPJ</p>
    <p><strong>Output:</strong> School's name</p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>doesSchoolExist</h3>
    <p><strong>Description:</strong> Checks if the school exists</p>
    <p><strong>Input:</strong> School's CNPJ</p>
    <p><strong>Output:</strong> Boolean indicating existence</p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>getSchoolByCnpj</h3>
    <p><strong>Description:</strong> Fetches school details based on CNPJ</p>
    <p><strong>Input:</strong> School's CNPJ</p>
    <p><strong>Output:</strong> Array of schools</p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  </div>
</body>
</html>
