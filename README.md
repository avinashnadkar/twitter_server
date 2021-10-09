# twitter_server
Twitter is a famous social media website. it is used for microblogging and social networking. In this repository I am trying to clone main features of Twitter. This is the backend service for application. To learn more about this project please read README.md file.

# What is this repository containing 
The auther have created two diffrent repositories for front-end and back-end. This is the backend service for clone of Twitter. By running this programm you will be able to make network request to the server and can perform basic crud operations. This programm is build using node.js, express.js and mongoDB for database. 

# How to use 
1) To use this programm you need to have node.js installed on your machine. If you don't have node.js installed plesase install it https://nodejs.org/en/download/ by visiting this link
2) If you want to run frontend code also please visit https://github.com/avinashnadkar/twitter_clone_client this link and clone that repository in a folder and follow the steps metioned in README.md file. After running frontend comeback to this repository.
3) Clone this repository and open terminal or cmd prompt open repository path and run this command "npm i" to install all dependencies.
4) After installing all dependencies run this command to start the server "npm run server"

-----

# Your can make following Network Requests
  1) To register user
  
      URL : http://localhost:2345/users/signup 
      
      Method : POST
      
      Headers : 
              
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'   
               }
               
      Body :   
               
               {
      
                  "name" : "Username",
                  
                  "password" : "type-long-password",
                  
                  "email" : "username@gmail.com",
                  
                  "phone" : "",
                  
                  "birthDate" : "19/12/2021"
                  
              }


