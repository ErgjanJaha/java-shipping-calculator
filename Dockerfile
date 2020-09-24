# Prepare the files for npm
FROM node:12.18.4-stretch-slim as node-engine
WORKDIR /app
COPY ./app .

# Build the react app
FROM node-engine as react-app
COPY --from=node-engine /app /app
RUN npm install
RUN npm run build

# Prepare the files for gradle
FROM gradle:6.6.1-jdk14 AS gradle-src
COPY . /home/gradle/src
COPY --from=react-app /app/build/ /home/gradle/src/src/main/resources/static/
RUN cp /home/gradle/src/src/main/resources/static/index.html /home/gradle/src/src/main/resources/templates/index.html
WORKDIR /home/gradle/src

# Run gradle tests
FROM gradle-src AS gradle-test
WORKDIR /home/gradle/src
ENTRYPOINT []
RUN chmod u+x ./gradlew
CMD ["./gradlew", "test"]

# BUILD with gradle
FROM gradle-src AS gradle-build
RUN gradle build -x test --no-daemon

# Boot the application
FROM openjdk:14-jdk as boot-run
EXPOSE 8080
RUN mkdir /app
COPY --from=gradle-build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]
