# Getting Started

### Installation
This demo app uses Spring Boot Framework, and can be built and deployed with gradle and deployed on Docker.
In order to deploy this application, you need to execute the following commands:
> docker-compose build 

To run tests standalone:
> docker-compose run --rm tests


This command builds all the necessary images to build the React application, boot the spring boot application and run 
tests at the same time.

To run services execute:
> docker-compose up

By executing the command above, you also create a mysql database server with hardcoded credentials.
If you want to use your own external mysql server go to `src/main/resources/application.properties` and change the
credentials according to your needs.

In case you do not use docker, and build and boot with gradlew, you are going to need a database dedicated to this app.


If you only want to build and run a container that runs the java application execute:
> docker build
  --target boot-run
  -t boot-run .
  && docker run
  -p 8080:8080
  --name fortnox
  boot-run

If you want to start a dev server for the React application execute:
> cd ./app && npm run start