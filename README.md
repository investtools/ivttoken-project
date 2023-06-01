[![Test](https://github.com/investtools/ivttoken_frontend/actions/workflows/main.yml/badge.svg)](https://github.com/investtools/ivttoken_frontend/actions/workflows/main.yml) [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

# GigaToken API

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
CLERK_SECRET_KEY=
CLERK_FRONTEND_API=
NEXT_PUBLIC_REGISTER_ISP_URL=
NEXT_PUBLIC_REGISTER_ADMIN_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_REGISTER_SUPER_USER_URL=
NEXT_PUBLIC_REGISTER_SCHOOL_ADMIN_URL=
```
Fill in the fields with the appropriate information.
## Installation Instructions

To start developing, follow the instructions below:
1. Clone this repository to your local machine:
```
git clone git@github.com:investtools/ivttoken-api.git
```
2. Navigate to the project directory:
```
cd ivttoken-api
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

If you have any questions or comments about this project, feel free to get in touch.
- [InvestTools](https://investtools.com.br/)

## Code of Conduct
We are committed to fostering a welcoming and inclusive community. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) for more information.