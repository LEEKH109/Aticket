# I. 개요
## 1. 프로젝트 사용 도구
- 이슈 관리 : JIRA  
- 형상 관리 : Gitlab  
- 커뮤니케이션 : Notion, Mattermost, Discord, Webex  
- 디자인 : Figma  
- UCC : 모바비  
- CI/CD : Jenkins, Docker

## 2. 개발환경
- VS Code : 1.86
- IntelliJ : 241.11761.10
- Java : 17
- Node.js : 20.11.0
- SERVER : AWS EC2 Ubuntu 20.04.3 LTS
- DB : Mysql

## 3. 외부 서비스
- Kakao Oauth2 : application-secret.yaml에 해당 내용 있음
- Kakao Pay API
- RDS(DB)
- S3(Cloud Storage)

## 4. GITIGNORE 처리한 핵심 키들
Spring : application-secret.yaml (/src/main/resources에 위치)

# II. 빌드
## 1. 환경 변수 형태
### Mysql(DB)
```yaml
spring:
  datasource:
    url: # DataBase URL 입력
    username: # DB name 입력
    password: # DB password 입력
```

### Kakao OAuth, Spring Security
```yaml
spring:
  security:
    oauth2:
      jwt:
        secret: # jwt secret key 입력
      provider:
        kakao:
          client-id: # kakao client id key 입력
          client-secret: # kakao secret key 입력
```

### S3(Cloud Storage)
```yaml
cloud:
  aws:
    s3:
      bucket: # S3 버킷 이름 입력
      base-url: # S3 base url 입력
    region:
      static: # 지역 입력 (ex: ap-northeast-2)
      auto: false
    stack:
      auto: false
    credentials:
      access-key: # S3 access key 입력
      secret-key: # S3 secret key 입력
```

## 2. 빌드 및 배포하기
[CICD_README.md](./CICD_README.md) 참고

## 3. Mysql DB 실행 순서
1. vendor_schema.sql
2. vendor_art.sql
3. vendor_db_art050.sql
4. vendor_db_art086.sql
5. vendor_db_art151.sql
6. vendor_db_art228.sql
7. vendor_db_art300.sql
8. vendor_db_art368.sql
9. main_arts.sql
10. main_shorts.sql
