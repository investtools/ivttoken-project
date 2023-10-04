[![Test](https://github.com/investtools/ivttoken_frontend/actions/workflows/main.yml/badge.svg)](https://github.com/investtools/ivttoken_frontend/actions/workflows/main.yml) [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)


# GigaToken Project

Giga Token is a social impact project in collaboration with UNICEF aimed at reducing the digital divide by connecting underprivileged schools to the internet.
The project utilizes a blockchain-based token, GigaToken (GIGA), to incentivize Internet Service Providers (ISPs) to connect schools to the internet.
ISPs can earn GigaTokens by connecting schools to the internet and ensuring the quality of the connection.
These tokens can be exchanged for tax incentives or other rewards.
The project is designed to enhance educational opportunities for underprivileged students by providing access to online resources and promoting digital inclusion.

## Technologies

This project is developed using the following technologies:

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
## Environment Setup

Before you begin, you will need to install [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) (which comes with Node.js) on your machine.
Additionally, you will need to create a `.env` file at the root of the project with the following environment variables:

```
DATABASE_URL=
NEXT_PUBLIC_CAPTCHA_KEY=
NEXT_PUBLIC_SLACK_CHANNEL=
NEXT_PUBLIC_SLACK_BOT_TOKEN=
NEXT_PUBLIC_REGISTER_ISP_URL=
NEXT_PUBLIC_REGISTER_ADMIN_URL=
NEXT_PUBLIC_GEOLOCATION_API_KEY=
NEXT_PUBLIC_SLACK_SIGNING_SECRET=
```
Fill in the fields with the appropriate information.
## Installation Instructions

To start developing, follow the instructions below:
1. Clone this repository to your local machine:
```
git clone git@github.com:investtools/ivttoken-project.git
```
2. Navigate to the project directory:
```
cd ivttoken-project
```
3. Install the project dependencies:
```
npm install
```
4. Prepare the local database:
```
npm run database:local:prepare
```
## Running the Project

To run the project locally, use the following command:
```
npm run dev
```
The project will run on port 3000 unless you have set a different port in your .env file.
## Running the Tests

To run the tests, use the following command:
```
npm run test
```
## Building the Project

To build the project for production, use the following command:
```
npm run build
```
## CI/CD

This project uses GitHub Actions to implement a Continuous Integration/Continuous Delivery (CI/CD) pipeline. The pipeline is triggered whenever a new commit is made to the main branch. It installs dependencies, prepares the local database, runs tests, and builds the project for production.
## Contribution

Contributions to this project are welcome. To contribute, please fork the repository, make your changes, and submit a pull request.
## Contact

If you have any questions or comments about this project, feel free to open a issue!
- [Issue Template](ISSUE_TEMPLATE.md)
- [Issues](https://github.com/investtools/ivttoken_frontend/issues)
- [Ticket](https://ivttoken.vercel.app/dev/open-ticket)

## Code of Conduct
We are committed to fostering a welcoming and inclusive community. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) for more information.

## Routes Documentation

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

### Login Route

- **userHasAccount:**
  - **Description:** Checks if the user already has an account
  - **Output:** Boolean indicating if the user has an account
  - **Procedure:** Protected
  - **Request Type:** Query

- **getAuthorizedRole:**
  - **Description:** Checks if the user is authorized to log in
  - **Output:** User role
  - **Procedure:** Protected
  - **Request Type:** Query

- **getUserRole:**
  - **Description:** Retrieves the role the user is authorized for
  - **Output:** User role
  - **Procedure:** Protected
  - **Request Type:** Query
