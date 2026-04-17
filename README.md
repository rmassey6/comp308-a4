# COMP 308 - Group 7 - Assignment #4

Ryan Massey - 301107847

## Purpose of the App

The purpose of this app is to work with a react frontend and express backend that will take a ingredients, 
cuisine type, number of servings, and extra notes which will be sent to an express backend. The backend 
will take these inputs and compile a prompt that will then be sent to ChatGPT through the use of an 
OpenAI API key. The response will then be generated and displayed for a recipe given the inputs entered
by the user into the form.

## How to Run the App Locally

To run the app locally, you first need to go into the frontend and backend folders and run `npm install`.

Next, you need to include a `.env` file in both the frontend and backend folders.

In the backend `.env` file, you need to inlcude a `PORT` and `OPEN_API_KEY`, for example:

`PORT=5000`

`OPENAI_API_KEY=your_openai_api_key`

In the frontend .env file, you simply need to include a value for `REACT_APP_BACKEND_URL` which points
to your backend URL.

`REACT_APP_BACKEND_URL=http://localhost:5000`

Once these files have been setup, you go to the backend folder and run `node server.js`.
Next, you go to the frontend folder and run `npm start`.

Once the app is running you go to the frontend URL, provide your inputs and receive your response from
ChatGPT.
