# Online-store
Simple online store on Node.js using Express, Passport, handlebars

![Alt text](readmeImg/e-shop.png?raw=true "Title")

![Alt text](readmeImg/e-shop1.png?raw=true "Title")

![Alt text](readmeImg/e-shop3.png?raw=true "Title")

![Alt text](readmeImg/e-shop4.png?raw=true "Title")

![Alt text](readmeImg/e-shop5.png?raw=true "Title")


# dependencies

- "bcryptjs": "^2.4.3",
-"body-parser": "^1.19.0",
- "dotenv": "^8.2.0",
- "express": "^4.17.1",
- "express-flash": "0.0.2",
- "express-session": "^1.17.0",
- "hbs": "^4.1.0",
- "mongoose": "^5.8.9",
- "multer": "^1.4.2",
- "nodemon": "^2.0.2",
- "passport": "^0.4.1",
- "passport-local": "^1.0.0",
- "session-file-store": "^1.3.1"


# Deployment

- download this repo
- create .env file in root folder with variable MONGO_DB = 'yourConnectionStringGoesHere'
- type 'npm i' in the root folder
- type 'node server' in the root folder
- visit localhost:3000 in your browser

To set admin roots set isAdmin: true manually in mongoDB, users collection
