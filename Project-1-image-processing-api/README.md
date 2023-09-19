## Instructions

Run the following scripts to start the application:
`npm run build` to build and compile the application.
`npm run prettier` for formatting.
`npm run lint` for ESlint.
`npm run test` to ensure all test cases work.
`npm run start` will start the app on localhost:3000.

Open localhost:3000/api/createimage

Enter the image's filename, its desired width and its desired height as parameters in the format:

`http://localhost:3000/api/images?filename=<filename>&width=<width>&height=<height>`

For example:

http://localhost:3000/api/images?filename=fjord.jpg&width=200&height=300

This will create a new image in `images/thumb` called `fjord200x300.jpg`.


The image you wish to resize must be in `images/full`. It will be resized to a new file in `images/thumb`.