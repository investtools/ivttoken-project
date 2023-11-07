### Schools Route

- **getSchoolsToBeApproved:**
  - **Description:** Fetches the list of schools awaiting approval
  - **Output:** Array of schools
  - **Procedure:** Public
  - **Request Type:** Query

- **schoolToBeApproved:**
  - **Description:** Creates a new school to be approved by the administrator
  - **Input:** Name, State, City, Zip Code, Address, CNPJ, Inep Code, Email, Administrator
  - **Procedure:** Public
  - **Request Type:** Mutation

- **getLatLon:**
  - **Description:** Fetches the latitude and longitude based on input
  - **Input:** City, State
  - **Output:** Latitude and Longitude
  - **Procedure:** Public
  - **Request Type:** Query

- **getAll:**
  - **Description:** Fetches all schools
  - **Output:** Array of schools
  - **Procedure:** Public
  - **Request Type:** Query

- **getAvailable:**
  - **Description:** Fetches the list of available schools
  - **Output:** Array of schools
  - **Procedure:** Public
  - **Request Type:** Query

- **getSchoolsWithTokens:**
  - **Description:** Fetches the list of schools that have token amounts
  - **Output:** Array of schools
  - **Procedure:** Public
  - **Request Type:** Query

- **getNoTokensSchools:**
  - **Description:** Fetches the list of schools without tokens
  - **Output:** Array of schools
  - **Procedure:** Public
  - **Request Type:** Query

- **findSchoolNameByCnpj:**
  - **Description:** Fetches the school name based on CNPJ
  - **Input:** School's CNPJ
  - **Output:** School's name
  - **Procedure:** Public
  - **Request Type:** Query

- **doesSchoolExist:**
  - **Description:** Checks if the school exists
  - **Input:** School's CNPJ
  - **Output:** Boolean indicating existence
  - **Procedure:** Public
  - **Request Type:** Query

- **getSchoolByCnpj:**
  - **Description:** Fetches school details based on CNPJ
  - **Input:** School's CNPJ
  - **Output:** Array of schools
  - **Procedure:** Public
  - **Request Type:** Query
