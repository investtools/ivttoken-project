### Internet Providers Route

- **getIspToBeApproved:**
  - **Description:** Returns all ISPs awaiting approval
  - **Output:** Array of ISP to be approved
  - **Procedure:** Protected
  - **Request Type:** Query

- **ispToBeApproved:**
  - **Description:** Creates an ISP approval request
  - **Input:** Name, CNPJ, Email
  - **Procedure:** Public
  - **Request Type:** Mutation

- **isIsp:**
  - **Description:** Checks if the user is an ISP
  - **Output:** Boolean
  - **Procedure:** Protected
  - **Request Type:** Query

- **getIspData:**
  - **Description:** Retrieves the ISP balance
  - **Output:** ISP balance
  - **Procedure:** Protected
  - **Request Type:** Query

- **getIspTransactions:**
  - **Description:** Retrieves all token transactions for the ISP
  - **Output:** Array of ISP token transactions
  - **Procedure:** Protected
  - **Request Type:** Query

- **getIspContracts:**
  - **Description:** Retrieves all contracts of the ISP
  - **Output:** Array of ISP contracts
  - **Procedure:** Protected
  - **Request Type:** Query

- **registerISP:**
  - **Description:** Registers a user as an ISP
  - **Input:** Name, CNPJ
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **buyBenefits:**
  - **Description:** Executes a benefits exchange for the ISP
  - **Input:** Selected Benefit
  - **Output:** Boolean
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **ispUnlockedTokens:**
  - **Description:** Retrieves the amount of unlocked tokens for the ISP
  - **Output:** Unlocked tokens
  - **Procedure:** Protected
  - **Request Type:** Query

- **createContract:**
  - **Description:** Sends a contract request between ISP and School
  - **Input:** School CNPJ
  - **Procedure:** Protected
  - **Request Type:** Mutation

- **getIspSchools:**
  - **Description:** Retrieves all schools associated with the ISP
  - **Output:** Array of schools
  - **Procedure:** Protected
  - **Request Type:** Query
