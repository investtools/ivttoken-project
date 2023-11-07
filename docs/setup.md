# Environment Setup

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles.css">
</head>
<body>

<section class="content">
  <p>Before you begin, you will need to install <a href="https://nodejs.org/en/download/">Node.js</a> and <a href="https://www.npmjs.com/get-npm">npm</a> (which comes with Node.js) on your machine.</p>
  <p>Additionally, you will need to create a .env file at the root of the project with the following environment variables:</p>

  <div class="code-container">DATABASE_URL=
NEXT_PUBLIC_CAPTCHA_KEY=
NEXT_PUBLIC_SLACK_CHANNEL=
NEXT_PUBLIC_SLACK_BOT_TOKEN=
NEXT_PUBLIC_REGISTER_ISP_URL=
NEXT_PUBLIC_REGISTER_ADMIN_URL=
NEXT_PUBLIC_GEOLOCATION_API_KEY=
NEXT_PUBLIC_SLACK_SIGNING_SECRET=</div>

  <h3>Installation Instructions</h3>
  <ol>
    <li>Clone this repository to your local machine:</li>
    <div class="code-container">git clone git@github.com:investtools/ivttoken-project.git</div>
    <li>Navigate to the project directory:</li>
    <div class="code-container">cd ivttoken-project</div>
    <li>Install the project dependencies:</li>
    <div class="code-container">npm install</div>
    <li>Prepare the local database:</li>
    <div class="code-container">npm run database:local:prepare</div>
  </ol>
  <h2>Running the Project</h2>
  <p>To run the project locally, use the following command:</p>
  <div class="code-container">npm run dev</div>
  <p>The project will run on port 3000 unless you have set a different port in your .env file.</p>
  <h2>Running the Tests</h2>
  <p>To run the tests, use the following command:</p>
  <div class="code-container">npm run test</div>
  <h2>Building the Project</h2>
  <p>To build the project for production, use the following command:</p>
  <div class="code-container">npm run build</div>
  <h2>CI/CD</h2>
  <p>This project uses GitHub Actions to implement a Continuous Integration/Continuous Delivery (CI/CD) pipeline. The pipeline is triggered whenever a new commit is made to the main branch. It installs dependencies, prepares the local database, runs tests, and builds the project for production.</p>
  <h2>Contribution</h2>
  <p>Contributions to this project are welcome. To contribute, please fork the repository, make your changes, and submit a pull request.</p>
  <h2>Contact</h2>
  <p>If you have any questions or comments about this project, feel free to open an issue!</p>
  <ul>
    <li><a href="ISSUE_TEMPLATE.md">Issue Template</a></li>
    <li><a href="https://github.com/investtools/ivttoken_frontend/issues">Issues</a></li>
    <li><a href="https://ivttoken.vercel.app/dev/open-ticket">Ticket</a></li>
  </ul>
  <h2>Code of Conduct</h2>
  <p>We are committed to fostering a welcoming and inclusive community. Please read our <a href="CODE_OF_CONDUCT.md">Code of Conduct</a> for more information.</p>
</section>
</body>
</html>
