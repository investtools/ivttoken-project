# ISP Route

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
<div class="container">
  <div class="card">
    <h3>getIspToBeApproved</h3>
    <p><strong>Description:</strong> Returns all ISPs awaiting approval</p>
    <p><strong>Output:</strong> Array of ISPs to be approved</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>ispToBeApproved</h3>
    <p><strong>Description:</strong> Creates an ISP approval request</p>
    <p><strong>Input:</strong> Name, CNPJ, Email</p>
    <p><strong>Procedure:</strong> Public</p>
    <p><strong>Request Type:</strong> Mutation</p>
  </div>
  <div class="card">
    <h3>isIsp</h3>
    <p><strong>Description:</strong> Checks if the user is an ISP</p>
    <p><strong>Output:</strong> Boolean</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>getIspData</h3>
    <p><strong>Description:</strong> Retrieves the ISP balance</p>
    <p><strong>Output:</strong> ISP balance</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>getIspTransactions</h3>
    <p><strong>Description:</strong> Retrieves all token transactions for the ISP</p>
    <p><strong>Output:</strong> Array of ISP token transactions</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>getIspContracts</h3>
    <p><strong>Description:</strong> Retrieves all contracts of the ISP</p>
    <p><strong>Output:</strong> Array of ISP contracts</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>registerISP</h3>
    <p><strong>Description:</strong> Registers a user as an ISP</p>
    <p><strong>Input:</strong> Name, CNPJ</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Mutation</p>
  </div>
  <div class="card">
    <h3>buyBenefits</h3>
    <p><strong>Description:</strong> Executes a benefits exchange for the ISP</p>
    <p><strong>Input:</strong> Selected Benefit</p>
    <p><strong>Output:</strong> Boolean</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Mutation</p>
  </div>
  <div class="card">
    <h3>ispUnlockedTokens</h3>
    <p><strong>Description:</strong> Retrieves the amount of unlocked tokens for the ISP</p>
    <p><strong>Output:</strong> Unlocked tokens</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  <div class="card">
    <h3>createContract</h3>
    <p><strong>Description:</strong> Sends a contract request between ISP and School</p>
    <p><strong>Input:</strong> School CNPJ</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Mutation</p>
  </div>
  <div class="card">
    <h3>getIspSchools</h3>
    <p><strong>Description:</strong> Retrieves all schools associated with the ISP</p>
    <p><strong>Input:</strong> Array of schools</p>
    <p><strong>Procedure:</strong> Protected</p>
    <p><strong>Request Type:</strong> Query</p>
  </div>
  </div>
</body>
</html>
