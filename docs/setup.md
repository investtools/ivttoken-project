### Environment Setup

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
