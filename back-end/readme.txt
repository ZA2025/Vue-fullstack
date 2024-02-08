npm init -y
npm install express

npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/cli @babel/plugin-transform-runtime
npm install @babel/runtime

to run the backend: This is manual which will change in the next step
npx babel-node src/server.js

step
use nodemon: 
npm install --save-dev nodemon
run: 
npx nodemon --exec npx babel-node src/server.js

Install Homebrew in you terminal if it's not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install mongosh


Enter password
switch to the database you want to use: Give it whatever name you like

use fullstack-vue

I gave it the following name:
fullstack-vue

then insert data like the following for products:
db.products.insertMany([
  {
    id: "123",
    name: "Basil",
    price: "$26.00",
    imageName: "/images/basil-bottle.webp",
  },
  {
    id: "234",
    name: "Lemon",
    price: "$26.00",
    imageName: "/images/lemon-bottle.webp",
  },
  {
    id: "345",
    name: "Garlic",
    price: "$26.00",
    imageName: "/images/garlic-bottle.webp",
  },
  {
    id: "456",
    name: "Rosemary",
    price: "$26.00",
    imageName: "/images/rosemary-bottle.webp",
  },
  {
    id: "567",
    name: "Chili",
    price: "$26.00",
    imageName: "/images/chili-bottle.webp",
  },
  {
    id: "678",
    name: "Delicate",
    price: "$24.50",
    imageName: "/images/delicate-bottle.webp",
  },
  {
    id: "789",
    name: "Medium",
    price: "$24.50",
    imageName: "/images/medium-bottle.webp",
  },
  {
    id: "890",
    name: "Bold",
    price: "$24.50",
    imageName: "/images/bold-bottle.webp",
  },
])

insert the following for users:
db.users.insertOne({ id: '12345', cartItems: ['123', '234', '345'] })


the following will show all of the data you have for products or users
db.products.find({})
db.users.find({})

in the back-end directory install mongodb package
npm install mongodb

trying to commit to github