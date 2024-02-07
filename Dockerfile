FROM docker
COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx

FROM openjdk:17-jdk
EXPOSE 443
EXPOSE 8081
EXPOSE 80


ADD ./server/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Dockerfile

# jdk17 Image Start
#FROM openjdk:17

# jar 파일 복제
#COPY ./server/build/libs/*.jar app.jar


# 인자 설정 부분과 jar 파일 복제 부분 합쳐서 진행해도 무방

###############

# 실행 명령어
#ENTRYPOINT ["java", "-jar", "app.jar"]