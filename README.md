# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## AWS S3 저장소 연동

설문 응답은 백엔드 서버가 AWS S3 버킷에 JSON 파일로 업로드합니다. 각 파일은 설문을 처음 진행할 때 입력한 이메일 주소를 기준으로 `surveys/<이메일>/<타임스탬프>.json` 형식의 경로에 저장되며, 동일한 이메일로 여러 번 참여하면 타임스탬프가 다른 파일이 누적됩니다.

### 1. S3 버킷 및 IAM 권한 준비

1. AWS 콘솔에서 새 S3 버킷을 생성합니다. **모든 퍼블릭 액세스 차단(Block all public access)** 옵션을 유지하고, 버킷 버저닝은 선택 사항입니다.
2. 다음과 같은 정책으로 IAM 정책을 생성합니다(`YOUR_BUCKET_NAME`은 실제 버킷 이름으로 교체).

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "AllowSurveyUploads",
         "Effect": "Allow",
         "Action": [
           "s3:PutObject"
         ],
         "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
       }
     ]
   }
   ```

3. 위 정책을 사용할 IAM 사용자(또는 IAM 역할)를 생성하고 액세스 키를 발급합니다. 임시 자격 증명을 사용한다면 세션 토큰도 함께 받아둡니다.

### 2. 환경 변수 설정

루트 디렉터리에 `.env` 파일을 생성하여 아래 값을 채워 주세요. (CI 또는 운영 환경에서는 시스템 환경 변수로 동일한 키를 설정하면 됩니다.)

```
AWS_ACCESS_KEY_ID=발급받은_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=발급받은_SECRET_KEY
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET_NAME=YOUR_BUCKET_NAME
# 선택 사항: 버킷 내부에서 사용할 경로 접두사. 기본값은 "surveys"
AWS_S3_PREFIX=surveys
# CRA 개발 서버와 백엔드를 동시에 실행할 때는 3001을 권장
PORT=3001
# 임시 자격 증명 사용 시에만 필요
# AWS_SESSION_TOKEN=세션_토큰
```

### 3. 로컬 실행 방법

1. 의존성을 설치합니다: `npm install`
2. 프런트엔드 개발용: `npm start`를 실행하면 `package.json`의 `proxy` 설정 덕분에 `/api/*` 요청이 `http://localhost:3001`로 전달됩니다. 별도의 터미널에서 `npm run build` 후 `PORT=3001 node server.js`를 실행하여 백엔드를 띄워 주세요.
3. 운영용 번들 제공: `npm run build` 이후 `PORT=3000 node server.js`와 같이 원하는 포트로 서버를 실행하면 정적 파일과 API가 함께 서비스됩니다.

### 4. 업로드되는 데이터 구조

서버는 다음과 같은 구조의 JSON을 S3에 기록합니다.

```json
{
  "email": "user@example.com",
  "initialEmail": "user@example.com",
  "latestEmail": "user@example.com",
  "responses": {
    "age": "20s",
    "ageLabel": "20대",
    "gender": "female",
    "q1": "superFun",
    "q2": "interactivity",
    "q2OtherText": null,
    "q3": "fashion",
    "q4": "definitelyYes",
    "q5": "tooMuchEffort"
  },
  "storedAt": "2025-09-24T05:40:09.091Z"
}
```

`responses.q2OtherText`는 "기타" 항목을 선택하고 직접 입력했을 때만 문자열을 포함하며, 그렇지 않으면 `null`로 저장됩니다.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
