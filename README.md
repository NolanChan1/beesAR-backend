# Bees AR Backend

This project was generated with [Node.js](https://github.com/nodejs/node) version 18.12.1

Have you ever ordered a product online only to receive it and realize it does not exactly look like whatever you were expecting? This is a problem that YYC Beeswax is familiar with as a frequent cause for returns is customers mistaking the size of their products despite their dimensions being clearly labelled on YYC Beeswax’s e-commerce website. This augmented reality (AR) web app, developed by a team of software engineering students at the University of Calgary as a capstone project, aims to solve this problem. By accessing this web app, users can select a product that this app supports and specify a position in their surroundings to use AR to get a visualization of the product.

As this web app depends on WebXR for AR functionality and as Apple does not provide WebXR support for their smartphones, this web app does not work on iPhones as of the completion of this capstone project. Also, as of the completion of the capstone project, the screenshot feature and the ability to switch between product heights remain unimplemented.

Due to time constraints, this web app was developed without the use of any front-end web frameworks. For future work, developers should investigate porting this project to React and to make use of react-three-fiber for 3D and AR support. Additionally, a wider selection of products and features such as multiple product projections on the camera feed should be considered.

[Try the web app for yourself](https://d23xwhblbslgmo.cloudfront.net/)

[YouTube demo video](https://www.youtube.com/watch?v=PAmQzdepNf4)

[Link to frontend repository](https://github.com/NolanChan1/beesAR-frontend)

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:8080/`. The web server will automatically implement changes once a file is saved and a new request is sent.

## Contributors

- Abhishek Balasubramanian
- Nolan Chan
- Braeden King
- Rubaiyet Meem
- Dylan Windsor
- Hao Nguyen
