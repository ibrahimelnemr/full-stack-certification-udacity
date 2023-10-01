# Pipeline Steps

The following pipeline occurs when a new commit is pushed to the github repository:

1. Prepare environment
    * Node, set up EB CLI, set up AWS Cli, set env variables
1. Checkout code
1. Install Front-End dependencies
1. Install API dependencies
1. Front-End Build
1. API Build
1. Deploy

![infrastructure](/screenshots/udagram-infrastructure.drawio.png)

