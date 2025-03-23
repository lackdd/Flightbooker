FROM maven:3.9.9-eclipse-temurin-21 AS builder
ARG MAVEN_OPTS
ENV MAVEN_OPTS="-XX:+EnableDynamicAgentLoading"
WORKDIR /usr/src/app
COPY --chown=maven:maven pom.xml ./
COPY --chown=maven:maven .mvn ./mvn
COPY --chown=maven:maven src ./src
RUN mvn clean package

FROM eclipse-temurin:21-jdk AS runner
ARG TIMEZONE=Europe/Tallinn
ENV TZ=${TIMEZONE}
WORKDIR /usr/app
COPY --from=builder /usr/src/app/target/Flightbooker-*.jar ./Flightbooker.jar
RUN ln -sf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/app/Flightbooker.jar"]