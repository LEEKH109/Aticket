# 배포 가이드

<br/><br/>

## MobaXterm

### Mobaxterm Download
> https://mobaxterm.mobatek.net/<br/>

### SSH 접속정보 입력
> 1. SSH 타입 선택<br/>
> 2. 서버 주소 입력<br/>
> 3. Specify username 체크<br/>
> 4. 계정명 입력 (deafault : ubuntu)<br/>
> 5. Use private key 체크<br/>
> 6. 디렉토리에서 *.pem 키 선택<br/>

<br/><br/>

## 우분투 서버 기본 설정

### 서버 시간 한국기준으로 변경
> sudo timedatectl set-timezone Asia/Seoul

### 패키지 업데이트
> sudo apt-get -y update && sudo apt-get -y upgrade

### Swap 영역 할당

> free -h <br/><br/>
> sudo fallocate -l 4G /swapfile <br/><br/>
> sudo chmod 600 /swapfile <br/><br/>
> sudo mkswap /swapfile <br/><br/>
> sudo swapon /swapfile <br/><br/>
> sudo echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab <br/>

##### 메모리 스와핑이 필요한 이유
> 1. 시스템에서 특정 어플리케이션이나 프로세스가 현재 가용한 피지컬 메모리보다 많은 양의 메모리를 요청할 경우, 커널은 적은 빈도율로 사용되는 메모리 페이지를 스왑아웃해서 가용 메모리 공간을 확보한 뒤 이를 해당 프로세스에 할당해 줌으로써 프로세스 실행이 가능하게된다.<br/>
> 2. 특정 어플리케이션이 실행되기 시작할 때 초기화를 위해서만 필요하고 이후에는 사용되지 않는 메모리 페이지들은 시스템에 의해 스왑아웃되며, 이로인해 가용해진 메모리 공간은 다른 어플리케이션이나 디스크캐쉬 용도로 활용된다.

<br/><br/>

## Docker 설치

### 설치전 필요한 패키지 설치
> sudo apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

### Docker GPC 인증 확인
> curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - <br/><br/>
> OK가 나오면 정상

### Docker Repo 등록
> sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

### 패키지 리스트 갱신
> sudo apt-get -y update

### Docker 설치 및 권한부여
> sudo apt-get -y install docker-ce docker-ce-cli containerd.io <br/><br/>
> sudo usermod -aG docker ubuntu <br/><br/>
> sudo service docker restart

<br/><br/>

## Jenkins

### Jenkins 설치
> docker pull jenkins/jenkins:jdk17 <br/><br/>
> docker run -d --restart always --env JENKINS_OPTS=--httpPort=8080 -v /etc/localtime:/etc/localtime:ro -e TZ=Asia/Seoul -p 8080:8080 -v /jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose --name jenkins -u root jenkins/jenkins:jdk17 <br/>

### Jenkins 플러그인 미러서버 변경
> sudo docker stop jenkins <br/><br/>
> sudo mkdir /jenkins/update-center-rootCAs <br/><br/>
> sudo wget https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/rootCA/update-center.crt -O /jenkins/update-center-rootCAs/update-center.crt <br/><br/>
> sudo sed -i 's#https://updates.jenkins.io/update-center.json#https://raw.githubusercontent.com/lework/jenkins-update-center/master/updates/tencent/update-center.json#' /jenkins/hudson.model.UpdateCenter.xml <br/><br/>
> sudo docker restart jenkins <br/>

### initialAdminPassword 가져오기
> i10a704.p.ssafy.io:8080 접속하면 initialAdminPassword 비밀번호를 입력해야함 <br/><br/>
> docker exec -it jenkins /bin/bash <br/><br/>
> cd /var/jenkins_home/secrets <br/><br/>
> cat initialAdminPassword <br/>

### Jenkins 내부에 Docker 설치

> docker exec -it jenkins /bin/bash <br/><br/>
> apt-get update && apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common && curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable" && apt-get update && apt-get -y install docker-ce <br/><br/>
> groupadd -f docker <br/><br/>
> usermod -aG docker jenkins <br/><br/>
> chown root:docker /var/run/docker.sock <br/>

### Jenkins 플러그인 설치
> SSH Agent <br/>
> Docker <br/>
> Docker Commons <br/>
> Docker Pipeline <br/>
> Docker API <br/>
> Generic Webhook Trigger <br/>
> GitLab <br/>
> GitLab API <br/>
> GitLab Authentication <br/>
> GitHub Authentication <br/>
> NodeJS

<br/>

### Gitlab Credentials 등록 (Username with password)
> Jenkins 관리 - Manage Credentials - Stores scoped to Jenkins - Domains - (global) - Add credentials <br/><br/>
>  - 정보 입력 후 **Create** 클릭 <br/>
      Kind : Username with password 선택 <br/>
      Username : Gitlab 계정 아이디 입력 <br/>
      Password : Gitlab 계정 비밀번호 입력 **(토큰 발행시, API 토큰 입력)** <br/>
      ID : Credential에 대한 별칭 (ex : gitlab-fezz)

### Gitlab Credentials 등록 (API Token)
> Jenkins 관리 - Manage Credentials - Stores scoped to Jenkins - Domains - (global) - Add credentials <br/><br/>
> - 정보 입력 후 **Create** 클릭 <br/>
    Kind : Gitlab API token 선택 <br/>
    API tokens : Gitlab 계정 토큰 입력 <br/>
    ID : Credential에 대한 별칭 (ex : fezz-gitlab)

### Gitlab 커넥션 추가
> Jenkins 관리 - System Configuration - System <br/><br/>
> - Gitlab의 **Enable authentication for ‘/project’ end-point** 체크
    Connection name : Gitlab 커넥션 이름 지정 <br/>
    Gitlab host URL : Gitlab 시스템의 Host 주소 입력 <br/>
    Credentials : 조금 전 등록한 **Jenkins Credential (API Token)**을 선택 <br/>
    이후, **Test Connection**을 눌러 Success가 뜨면 **저장** 클릭 <br/>
    아니라면 입력한 정보를 다시 확인

<br/>

### Docker Hub Credential 추가
> https://hub.docker.com/ <= 접속 및 로그인 후 Access Token 발급 <br/><br/>
> Repositories - Create repository <- Docker hub 레포지토리 생성 <br/><br/>
> Jenkins 관리 - Manage Credentials - Stores scoped to Jenkins - Domains - (global) - Add credentials <br/>
> - Credential 정보 입력 <br/>
    Kind : Username with password <br/>
    Username : DockerHub에서 사용하는 계정 아이디 입력 (ex : fezz)<br/>
    Password : DockerHub에서 사용하는 Access Token 입력 <br/>
    ID : Jenkins 내부에서 사용하는 Credential 별칭 입력 (ex : fezz-docker)<br/>
    이후, **Create** 클릭

<br/>

### Ubuntu Credential 추가
> Jenkins 관리 - Manage Credentials - Stores scoped to Jenkins - Domains - (global) - Add credentials <br/>
> - Kind를 `SSH Username with private key`로 설정 <br/>
    ID : Jenkins에서 Credential에 지정할 별칭 입력 (ex : ubuntu-a704) <br/>
    Username : SSH 원격 서버 호스트에서 사용하는 계정명 입력 (ex : ubuntu) <br/>
    Enter directly 체크 - Add 클릭 <br/>
    AWS *.pem 키의 내용을 메모장으로 읽어 복사 후 Key에 붙여넣기 <br/>
    이후 **Create** 클릭 <br/>

<br/><br/>

## CI,CD를 위한 Webhook 설정
> - Pipeline 아이템에 다음과 같은 설정 추가 <br/>
    General - Build Triggers <br/>
    Build when a change is pushed to Gitlab 체크 <br/>
    Push Events 체크 <br/>
    Opened Merge Request Events 체크 <br/>
    Approved Merge Request (EE-only) 체크 <br/>
    Comments 체크 <br/>
    발행된 Secret token 복사해두고 저장 <br/> <br/>
> - Gitlab Webhook 지정 <br/>
    Gitlab에 특정 브랜치에 merge request가 된 경우 Webhook을 통해 빌드 및 서비스 재배포 이벤트 발동 <br/>
    Gitlab의 배포할 서비스의 Repository 접속 <br/>
    Settings - Webhooks 클릭 <br/>
    URL : Jenkins의 Item URL 입력 (양식 : `http://[Jenkins Host]:[Jenkins Port]/project/[파이프라인 아이템명]`) <br/>
    Secret token : Jenkins의 Gitlab trigger 고급 설정 중 Secret token Generate 버튼을 이용해 만든 토큰 입력 <br/>
    Trigger : Push events 체크, merge request가 되면 Jenkins 이벤트가 발동하게 할 브랜치 입력 <br/>
    SSL verification의 **Enable SSL verification** 체크 <br/>
    이후, **Add webhook** 클릭 <br/>



<br/><br/>

## BackEnd Pipeline (예시)

```
pipeline {
    agent any
    
     environment {
        imageName = "fezz/articket-server"
        registryCredential = 'fezz-docker'
        dockerImage = ''
        
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'i10a704.p.ssafy.io'
        releasePort = '8081'
    }
    
    
    stages {
        stage('Git Clone') {
        steps {
                git branch: 'develop-server',
                url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A704.git',
                credentialsId: 'gitlab-fezz'
            }
        }
        
        stage('Jar Build') {
            steps {
                dir ('server') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar -x test'
                    // sh './gradlew build'
                }
            }
        }
        
        stage('Image Build & DockerHub Push') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        sh "docker buildx create --use --name mybuilder"
                        sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:$BUILD_NUMBER --push ."
                        sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:latest --push ."
                    }
                }
            }
        }
        
        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-a704']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter ancestor=$imageName:latest"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop $(docker ps -aq --filter ancestor=$imageName:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm -f $(docker ps -aq --filter ancestor=$imageName:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi $imageName:latest"
                    fi
                    '''
                }
            }
        }
        
        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-a704']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri 'sudo docker pull $imageName:latest'"
                }
            }
        }
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-a704']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul -e "SPRING_PROFILES_ACTIVE=prod" --name articketserver -p $releasePort:$releasePort -d $imageName:latest"
                    '''
                }
            }
        }
    }
}
```

## BackEnd Dockerfile (예시)

```
FROM docker
COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx

FROM openjdk:17-jdk
EXPOSE 8081


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
```

<br/><br/>

## FrontEnd pipeline (예시)

```
pipeline {
    agent any
    tools {nodejs "nodejs"}
    
    environment {
        imageName = "fezz/articket-web"
        registryCredential = 'fezz-docker'
        dockerImage = ''
        
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'i10a704.p.ssafy.io'
        releasePort = 80
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop-web',
                    credentialsId: 'gitlab-fezz',
                    url: 'https://lab.ssafy.com/s10-webmobile1-sub2/S10P12A704.git'
            }
        }
        stage('Node Build') {
            steps {
                dir ('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Image Build & DockerHub Push') {
            steps {
                dir('client') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh "docker buildx create --use --name webbuilder"
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:latest --push ."
                        }
                    }
                }
            }
        }
        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-a704']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter ancestor=$imageName:latest"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop $(docker ps -aq --filter ancestor=$imageName:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm -f $(docker ps -aq --filter ancestor=$imageName:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi $imageName:latest"
                    fi
                    '''
                }
            }
        }
        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-a704']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri 'sudo docker pull $imageName:latest'"
                }
            }
        }
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-a704']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul --name nginx -p $releasePort:$releasePort -d $imageName:latest"
                    '''
                }
            }
        }
        stage('Service Check') {
            steps {
                sshagent(credentials: ['ubuntu-a704']) {
                    sh '''
                        #!/bin/bash
                        
                        for retry_count in \$(seq 20)
                        do
                          if curl -s "http://i10a704.p.ssafy.io/" > /dev/null
                          then
                              curl -d '{"text":"Release Complete"}' -H "Content-Type: application/json" -X POST https://meeting.ssafy.com/hooks/yj5cf16nobfkmk599ekkawz7cr
                              break
                          fi
                        
                          if [ $retry_count -eq 20 ]
                          then
                            curl -d '{"text":"Release Fail"}' -H "Content-Type: application/json" -X POST https://meeting.ssafy.com/hooks/yj5cf16nobfkmk599ekkawz7cr
                            exit 1
                          fi
                        
                          echo "The server is not alive yet. Retry health check in 5 seconds..."
                          sleep 5
                        done
                    '''
                }
            }
        }
    }
}
```

## FrontEnd Dockerfile (예시)

```
# nginx 이미지 사용
FROM nginx:latest

# root에 /app 폴더 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# work dir에 build 폴더 생성
RUN mkdir ./build

# host pc의 현재 경로의 build 폴더를 work dir의 build 폴더로 복사
ADD ./build ./build

# nginx의 default.conf 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc의 nginx.conf를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 80 포트 개방
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
```

## FrontEnd nginx.conf 작성 (예시)

```
server {
    listen 80;
    location / {
        root    /app/build;
        index   index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

<br/><br/>

## Mysql 배포 (RDS)

<br/>

> 1. AWS -> RDS -> Database 생성 <br/>
> 2. Mysql, 프리 티어 설정
> 3. 퍼블릭 엑세스를 예로 설정(로컬에서 DB 수정을 하기 위함, 최종 배포 후 설정 변경)
> 4. 초기 데이터베이스 생성(DB를 하나 생성해두는 것이 편하다)
> 5. 새로운 파라미터 보안 그룹 설정(IPv4와 IPv6 모두 접근가능하게 변경) <- 최종 배포 후 변경
> 6. DB 앤드포인트 복사 후 인텔리제이에 DB 연동(Test Connection으로 Success가 나오는지 꼭 확인) 
> 7. application.secret.yaml에 DB정보 추가해주기