### Java

FROM gradle:6.6.1-jdk14 AS gradle-build
COPY . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM openjdk:15-jdk as boot-run

EXPOSE 8080

RUN mkdir /app

COPY --from=gradle-build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar

ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]

### NodeJS

FROM node:alpine as node-engine
WORKDIR /app
COPY . .

FROM node-engine as react-dev
COPY --from=node-engine /app /app
RUN npm i -g create-react-app

FROM node-engine as react-app
COPY --from=node-engine /app /app
RUN npm install --production