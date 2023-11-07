# Administrator Route

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
<div class="container">
  <div class="card">
    <h3>getOpenedTickets</h3>
    <p><strong>Description:</strong> Retrieves all open tickets</p>
    <p><strong>Output:</strong> <span class="card-output">Array of tickets</span></p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>getClosedTickets</h3>
    <p><strong>Description:</strong> Retrieves all closed tickets</p>
    <p><strong>Output:</strong> <span class="card-output">Array of tickets</span></p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
    <div class="card">
    <h3>openTicket</h3>
    <p><strong>Description:</strong> Opens a ticket</p>
    <p><strong>Input:</strong> Name, Email, Subject, Message</p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Mutation</p>
  </div>
  <div class="card">
    <h3>closeTicket</h3>
    <p><strong>Description:</strong> Closes a ticket</p>
    <p><strong>Input:</strong> Ticket Id</p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Mutation</p>
  </div>
  <div class="card">
  <h3>approveSchool</h3>
  <p><strong>Description:</strong> Approves a pending school</p>
  <p><strong>Input:</strong> School Id</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Mutation</p>
</div>
<div class="card">
  <h3>approveISP</h3>
  <p><strong>Description:</strong> Approves an ISP</p>
  <p><strong>Input:</strong> Email</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Mutation</p>
</div>
<div class="card">
  <h3>signTransaction</h3>
  <p><strong>Description:</strong> Signs a transaction</p>
  <p><strong>Input:</strong> Transaction Hash, Private Key</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Mutation</p>
</div>
<div class="card">
  <h3>getAllTransactionsToSign</h3>
  <p><strong>Description:</strong> Retrieves all transactions that need to be signed</p>
  <p><strong>Output:</strong> Array of transactions</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Query</p>
</div>
<div class="card">
  <h3>authorizeUser</h3>
  <p><strong>Description:</strong> Authorizes a user</p>
  <p><strong>Input:</strong> Email, Role</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Mutation</p>
</div>
<div class="card">
  <h3>createSchool</h3>
  <p><strong>Description:</strong> Creates a school</p>
  <p><strong>Input:</strong> Name, State, City, Zip Code, Address, CNPJ, Inep Code, Email, Administrator</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Mutation</p>
</div>
<div class="card">
  <h3>assignTokensToSchool</h3>
  <p><strong>Description:</strong> Assigns tokens to a school</p>
  <p><strong>Input:</strong> School CNPJ, Tokens</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Mutation</p>
</div>
<div class="card">
  <h3>registerAdmin</h3>
  <p><strong>Description:</strong> Registers a new administrator user</p>
  <p><strong>Input:</strong> Name, Entity</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Mutation</p>
</div>
<div class="card">
  <h3>isAdmin</h3>
  <p><strong>Description:</strong> Checks if the current user is an administrator</p>
  <p><strong>Output:</strong> Boolean</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Query</p>
</div>
<div class="card">
  <h3>getAuthorizedUsers</h3>
  <p><strong>Description:</strong> Retrieves the list of all authorized users</p>
  <p><strong>Output:</strong> Array of Users</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Query</p>
</div>
<div class="card">
  <h3>getPendingContracts</h3>
  <p><strong>Description:</strong> Retrieves all pending contracts</p>
  <p><strong>Output:</strong> Array of Contracts</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Query</p>
</div>
<div class="card">
  <h3>getAllConnectivityReports</h3>
  <p><strong>Description:</strong> Retrieves all connectivity reports for a school</p>
  <p><strong>Input:</strong> School CNPJ</p>
  <p><strong>Output:</strong> Array of Connectivity Reports</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Query</p>
</div>
<div class="card">
  <h3>approveContract</h3>
  <p><strong>Description:</strong> Approves a contract between ISP and School</p>
  <p><strong>Input:</strong> Contract Id</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Mutation</p>
</div>
<div class="card">
  <h3>denyContract</h3>
  <p><strong>Description:</strong> Denies a contract between ISP and School</p>
  <p><strong>Input:</strong> Contract Id</p>
  <p><strong>Procedure:</strong> Protected</p>
  <p><strong>Request Type:</strong> Mutation</p>
</div>
  <div class="card">
    <h3>getAllContracts</h3>
    <p><strong>Description:</strong> Retrieves all contracts</p>
    <p><strong>Output:</strong> <span class="card-output">Array of Contracts</span></p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
</div>
</body>
</html>
