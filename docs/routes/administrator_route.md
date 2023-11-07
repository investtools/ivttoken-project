### Administrator Route

- **getOpenedTickets:**
  - **Description:** Retrieves all open tickets
  - **Output:** Array of tickets
  - **Procedure:** Protected
  - **Request Type:** Query

- **getClosedTickets:**
  - **Description:** Retrieves all closed tickets
  - **Output:** Array of tickets
  - **Procedure:** Protected
  - **Request Type:** Query

- **openTicket:**
  - **Description:** Opens a ticket
  - **Input:** Name, Email, Subject, Message
  - **Procedure:** Public
  - **Request Type:** Mutation

- **closeTicket:**
  - **Description:** Closes a ticket
  - **Input:** Ticket Id
  - **Procedure:** Public
  - **Request Type:** Mutation

- **approveSchool:**
  - **Description:** Approves a pending school
  - **Input:** School Id
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **approveISP:**
  - **Description:** Approves an ISP
  - **Input:** Email
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **signTransaction:**
  - **Description:** Signs a transaction
  - **Input:** Transaction Hash, Private Key
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **getAllTransactionsToSign:**
  - **Description:** Retrieves all transactions that need to be signed
  - **Output:** Array of transactions
  - **Procedure:** Protected
  - **Request Type:** Query

- **authorizeUser:**
  - **Description:** Authorizes a user
  - **Input:** Email, Role
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **createSchool:**
  - **Description:** Creates a school
  - **Input:** Name, State, City, Zip Code, Address, CNPJ, Inep Code, Email, Administrator
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **assignTokensToSchool:**
  - **Description:** Assigns tokens to a school
  - **Input:** School CNPJ, Tokens
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **registerAdmin:**
  - **Description:** Registers a new administrator user
  - **Input:** Name, Entity
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **isAdmin:**
  - **Description:** Checks if the current user is an administrator
  - **Output:** Boolean
  - **Procedure:** Protected
  - **Request Type:** Query

- **getAuthorizedUsers:**
  - **Description:** Retrieves the list of all authorized users
  - **Output:** Array of Users
  - **Procedure:** Protected
  - **Request Type:** Query

- **getPendingContracts:**
  - **Description:** Retrieves all pending contracts
  - **Output:** Array of Contracts
  - **Procedure:** Protected
  - **Request Type:** Query

- **getAllConnectivityReports:**
  - **Description:** Retrieves all connectivity reports for a school
  - **Input:** School CNPJ
  - **Output:** Array of Connectivity Reports
  - **Procedure:** Protected
  - **Request Type:** Query

- **approveContract:**
  - **Description:** Approves a contract between ISP and School
  - **Input:** Contract Id
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **denyContract:**
  - **Description:** Denies a contract between ISP and School
  - **Input:** Contract Id
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **getAllContracts:**
  - **Description:** Retrieves all contracts
  - **Output:** Array of Contracts
  - **Procedure:** Protected
  - **Request Type:** Query
