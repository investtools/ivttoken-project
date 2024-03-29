[![Test](https://github.com/investtools/ivttoken_frontend/actions/workflows/main.yml/badge.svg)](https://github.com/investtools/ivttoken_frontend/actions/workflows/main.yml) [![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)


# GigaToken Project

Giga Token is a social impact project in collaboration with UNICEF aimed at reducing the digital divide by connecting underprivileged schools to the internet.
The project utilizes a blockchain-based token, GigaToken (GIGA), to incentivize Internet Service Providers (ISPs) to connect schools to the internet.
ISPs can earn GigaTokens by connecting schools to the internet and ensuring the quality of the connection.
These tokens can be exchanged for tax incentives or other rewards.
The project is designed to enhance educational opportunities for underprivileged students by providing access to online resources and promoting digital inclusion.

## Documentation Website
Please visit our [Documentation Website](https://investtools.github.io/ivttoken-project).

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

## Who We Are

At Investtools, we stand at the vanguard of technological innovation, consistently attuned to the evolving demands of the financial ecosystem. Our expertise is leveraged to craft tailored solutions that address the unique requirements of each participant in the financial sector. From catering to the specialized niche of fund managers to embracing the expansive realm of finance, our mission is to catalyze market transformation through cutting-edge technology. Our dedication to developing superior solutions is reflected in the high satisfaction rates of our clients, underscored by significant product endorsements and minimal client turnover. Driven by the dual forces of continual innovation and customer contentment, our ambition is to be recognized as a beacon of technology and a paragon of excellence within the financial industry.

## What We Do

Investtools is committed to revolutionizing the market with Perform It, our flagship project, which offers unprecedented control over the investment flow of asset management firms. This robust solution liberates asset managers to focus on strategic business aspects by automating and securing operational processes. Our ERP software ensures meticulous monitoring of the entire workflow within an asset management firm, providing seamless integration with various entities like administrators and brokers. With Perform It, the management of operations spans a comprehensive 360-degree view, encompassing Back Office, Middle Office, and Front Office functions, all underpinned by state-of-the-art interfaces and unwavering focus on automation and security.

## Our Vision

Our vision is to reshape the financial market landscape, instilling a culture of technological excellence and innovation. By offering bespoke solutions like Perform It, we empower fund managers and financial professionals with the tools necessary for superior operational control and strategic focus. As we forge ahead, our goal is to not only maintain our role as a key player in technology but to set new benchmarks for quality and excellence in the financial sphere. In the pursuit of this vision, we remain steadfast in our commitment to customer satisfaction, product quality, and the relentless pursuit of progress.
