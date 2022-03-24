# 첫번째 영상 관련

http 메서드

https://developer.mozilla.org/ko/docs/Web/HTTP/Methods

거의 공식 문서에 가까운 mdn의 설명

PUT과 POST의 차이에 대해서도 잘 나와 있다. PUT은 여러 번 시도해도 결과가 같다는 것이 핵심

이런 성질을 멱등성(idempotent)이라 하는데 post를 제외하면 모든 http 메서드가 이를 만족한다

https://velog.io/@josworks27/HTTP-Request-%EC%A0%95%EB%A6%AC

http 메서드의 좀 더 직관적인 설명은 여기로

https://www.zerocho.com/category/HTTP/post/5b3723477b58fc001b8f6385

get, post, put, patch, delete

쿼리스트링에 대한 설명도 있음. 쿼리스트링은 express에서는 req.query에 저장된다. todolist에서 유저 아이디를 통해 유저의 투두리스트 정보를 가져올 때 사용했었음

https://www.zerocho.com/category/NodeJS/post/579b3fc4062e76a002648af6

https://www.redhat.com/ko/topics/api/what-is-a-rest-api

REST API에 관한 설명들

API는 함수 명세 같은 거라고 이해하면 된다. 그리고 REST api는 rest 원칙을 지켜 개발된 api다. rest는 주소를 자원으로 보고 메서드를 자원에 대한 요청으로 해석하는 관점

* 하나의 요청이 하나의 기능만 해야 한다. 예를 들어 get 요청이 포스트를 불러오는 동시에 조회수를 1 올린다면 rest 원칙 위배. 두 요청으로 분리해야 한다.
* 클라이언트와 서버, 자원으로 구성되며 요청이 http를 통해 관리되는 구조
* 통합된 인터페이스가 필요(??)
* 일부 클라이언트-서버 간 상호작용을 안 해도 되게 할 캐시 가능 데이터가 있어야 함
* 각 요청이 이전 요청들에 영향을 받지 않고 독립적
* 수신한 요청을 통해 클라이언트가 자원을 조작할 수 있어야 함. post가 받은 요청이 자원을 수정하는 등.

등 여러 가지 원칙들이 있는데 표준이라기보다 원칙에 가까워서 모두 100% 지켜야만 rest api인 것은 아니다.

https://developer.mozilla.org/ko/docs/Web/HTTP/CORS cors에 대한 자세한 문서인데 사실 잘 모르겠음

https://wonit.tistory.com/307 cors 정책에 관한 좀더 쉬운 설명

https://www.zerocho.com/category/NodeJS/post/5a6c347382ee09001b91fb6a

cors policy는 서로 다른 주소 간에 요청을 보내는 것을 제한한다. 보안상의 이유이다. express에서는 cors 라이브러리를 쓰는 것으로 간단하게 해결 가능.

https://ui.toast.com/weekly-pick/ko_20201110

react skeleton을 이용해 로딩 화면을 꾸밀 수 있다

https://velog.io/@kyoung-jnn/Node.js-body-parser%EA%B0%80-%EB%AD%90%EC%A7%80

원래는 req.body를 적절히 파싱해 오기 위해 body-parser모듈이 사용되었다. 그런데 이제는 express에 내장되었다!

```js
app.use(express.json()); //json 형태로 parsing
app.use(express.urlencoded( {extended : false } )); 
```

https://www.samsungsds.com/kr/insights/1232564_4627.html

NoSQL은 기존의 관계형 데이터베이스에서 빅데이터를 다루기 위해 발전한 형태라고 한다

https://www.navicat.com/en/company/aboutus/blog/1308-choosing-between-varchar-and-text-in-mysql

https://stackoverflow.com/questions/25300821/difference-between-varchar-and-text-in-mysql

https://chuckolet.tistory.com/71

왜 text가 아닌 varchar를 써야 하는지

varchar는 메모리에 직접 저장되고 text는 디스크에 내용을 저장한 후 그 참조를 메모리에 저장하므로 varchar가 더 빠른 접근이 가능하다. 그리고 varchar는 DB index의 일부로 쓰일 수 있으므로 빠른 검색이 가능하다(index에 관해서는 데이터베이스에 대해 찾아보면 나온다). 만약 유저 아이디 같은 것을 저장할 경우 유저 아이디로 무언가 검색할 일이 많다는 것이 예상되므로 varchar가 적절한 것이다.

블로그 글 내용(검색 기능 없음) 등을 저장하기 위해서는 text를 써도 괜찮을 것이다.(xo.dev 의 조언)

https://velog.io/@leitmotif/createConnection-vs-createPool

createPool createConnection 차이. 커넥션은 쿼리 요청이 있을 때마다 db와의 연결을 생성했다가 제거하는 것을 반복한다. 풀은 미리 정해진 갯수의 db 연결을 생성하고 요청이 발생할 때마다 거기에 연결을 하나씩 할당하고 다시 반납받는다. connectionLimit가 있는 것도 이 때문이다. 대여해 줄 수 있는 db 연결의 최대 갯수를 정해주는 것이다.

# 두번째 영상 관련

https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies

쿠키가 무엇이고 어디에 쓰이는지에 대한 설명. http 프로토콜은 stateless한데 이때 상태 정보를 기억시켜 줌

단 탈취되어서 악의적으로 사용될 수 있기 때문에 http 쿠키 내에 비밀번호 등의 민감한 정보를 담으면 안 된다. https의 경우 전송되는 쿠키를 암호화해주긴 하지만..

단 클라이언트에 정보 저장시 로컬스터리지, 세션스토리지를 쓰는 게 낫다(https://www.zerocho.com/category/HTML&DOM/post/5918515b1ed39f00182d3048) 쿠키는 클라이언트에서 서버로 정보를 보낼 때마다 전송되기 때문에 쿠키에 많은 정보를 담는 건 성능을 떨어뜨릴 수 있다.

### jwt 토큰

https://velopert.com/2350 토큰 기반 인증에 관한 기본

토큰을 기반으로 한 인증은 stateless 서버를 위해서 필요하다. 즉 서버에 클라이언트 관련 상태정보를 저장하지 않고 클라이언트측에서 들어오는 요청으로만 작업을 처리하는 것이다. 이렇게 할 경우 클라이언트와 서버의 연결고리가 없어서 서버의 확장성이 높아진다. 보안이 높아진다는 이점도 있다.

그리고 토큰 기반 인증을 하면 서버에서 유저들의 정보를 모두 기억하고 있을 필요가 없으므로 서버 확장이 용이해지고 서버에서 필요로 하는 메모리가 줄어든다.

토큰 기반 시스템은 다음과 같이 작동한다.

1. 유저가 로그인을 한다. 즉 서버에 로그인 입력 정보를 보냄

2. 서버 측에서 해당 정보를 검증한다

3. 계정 정보가 정확하면 유저에게 '로그인됨'을 뜻하는 토큰을 발급함

4. 클라이언트 단에서 그 토큰을 저장해 둔 후 서버에 요청할 때마다 토큰을 함께 보낸다. 그러면 서버는 그 토큰을 계속 검증함. 서버는 토큰을 검증할 수 있는 정보만 가지고 있으면 된다

5. 서버는 토큰을 검증한 후 그 결과에 따라 요청에 응답

   토큰 기반 인증을 사용하면 토큰에 선택적인 권한만 부여할 수도 있다. 따라서 다양한 분야에 사용 가능

https://velopert.com/2389 jwt 토큰 인증

jwt는 json 객체를 사용해서 정보를 전달하는 웹 표준이다. 많은 언어에서 지원되며 필요한 모든 정보를 자체적으로 지니고 있다. 그리고 쉽게 전달될 수 있다. http 헤더나 url 파라미터 등을 통해...

jwt.io 에서 암호화된 토큰을 해제할 수 있다. jwt의 구조도 간략하게 익혀두면 좋겠지만 대부분 인코딩은 다 라이브러리가 해준다.

중요한 건 토큰 기반 인증의 작동 방식이다. 사용자는 자신의 정보를 담은 토큰을 계속 보내주고, 서버 측에서는 키 하나만 저장해 둔 상태에서 그 키로 암호화한 결과와 유저가 보낸 정보를 대조해서 로그인 인증을 진행하는 것.

# express  라우터 분리

https://millo-l.github.io/Nodejs-express-router-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/



# 배포할 때 도움받은 곳

AWS 배포

https://velog.io/@boori/React-Express-AWS-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0

https://velog.io/@k904808/AWS-1

aws 배포 + nginx 연결 + react 배포 시리즈 글 중 하나 https://velog.io/@mingtorr/AWS-EC2%EB%A1%9C-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B04-nginxreact-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0

새 키페어 생성 관련 https://zamezzz.tistory.com/296

aws ec2 인스턴스 키페어 교체 방법 https://velog.io/@jiyeon_hong/AWS-AWS-EC2-%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%ED%82%A4-%ED%8E%98%EC%96%B4-%EA%B5%90%EC%B2%B4-%EB%B0%A9%EB%B2%95

그러나 키페어를 억지로 교체하는 것은 문제를 발생시킬 수 있는 것 같음.

처음에 프라이빗 키 페어와 aws의 퍼블릭 키페어를 연결시키려 할 때 이런 메시지가 뜬다.

The authenticity of host '18.217.95.80 (18.217.95.80)' can't be established.

이는 이 서버에 처음 연결할 시에 원래 있는 현상이다. 만약 서버가 기존에도 연결되어 있는 거였다면 보안을 의심해야 하겠지만 그런 게 아니므로 무시.

https://superuser.com/questions/421074/ssh-the-authenticity-of-host-host-cant-be-established/421084#421084

**WARNING: UNPROTECTED PRIVATE KEY FILE!** @ 이런 에러 창이 뜰 경우.

이건 private key의 권한이 너무 열려 있어서 발생하는 문제다. private key는 당연히 편집 같은 게 안되어야 하지 않겠는가? 따라서 private key의 권한을 chmod 0400으로 바꾸기. (chmod 명령어는 파일의 권한을 설정한다. 각 자리가 권한 설정을 이진수로 나타내는 걸로 알고 있음. 구글링 요망)

https://www.lesstif.com/lpt/ssh-unprotected-private-key-file-80249001.html

ubuntu 공식문서의 nginx 설치법

https://ubuntu.com/tutorials/install-and-configure-nginx#2-installing-nginx

로컬에 프라이빗 키 페어를 가지고 있고 그ip에 터미널로 접속하고 싶으면 `.ssh` 폴더에서 ssh -i "~/.ssh/ec2_key.pem" ubuntu@18.217.95.80 (아무튼 퍼블릭 IPv4 주소)

---

nginx를 설치시 기본적으로 /etc/nginx 경로가 생성되어야 한다. 그러나 만약 그런 경로를 ls 명령어 등으로 찾을 수 없다면? 터미널에서 현재 자신의 디렉토리가 어디로 되어 있는지 확인하자. 나는 ubuntu@ip-172-31-43-6:~/ 디렉토리에 있었기 때문에 거기에 아무것도 없어서 한동안 왜 아무것도 없지? 하면서 헤맸다. cd 명령어를 사용해서 `/` 디렉토리로 이동하면 etc/nginx 폴더를 찾을 수 있다.

빌드를 좀더 빨리 하자

https://progdev.tistory.com/26

aws 인스턴스로 파일 전송하기(scp command)

https://ict-nroo.tistory.com/40

https://chuckolet.blogspot.com/2018/10/aws-ec2-or-or.html

ec2 인스턴스에 할당되어 있는 램은 1기가밖에 안 되기 때문에 인스턴스 내부에서 빌드하기는 어렵다. 따라서 로컬에서 빌드한 파일을 인스턴스 내에 어떻게든 넣는 게 빠르다. 메모리 스위칭 등을 이용해서 램을 한 4기가쯤으로 일시적으로 늘린 다음 빌드할 때 잠시 쓰는 방법도 있다는데 알아보지는 않았다.

참고로 폴더를 보낼 때는 -r 커맨드(recursive)를 이용해서 보내면 된다.

그런데 이렇게 scp를 이용해서 파일을 ec2 인스턴스로 보내게 되면, ec2 인스턴스의 호스트는 ubuntu인데 내가 scp로 보낼 당시의 파일 권한과는 당연히 다를 수 있다. 따라서 권한이 꼬이는 문제가 발생 가능하다. 따라서 git에 자신의 코드를 올리고 ec2 인스턴스에 터미널로 접속한 후 git clone으로 받아오는 게 가장 낫다. git에 올라와 있는 코드가 가장 최신 상태의 코드가 되도록 하자.

ip 포트포워딩

https://m.blog.naver.com/inspireworld/220633624194

집에 와이파이를 이용하고 있을 경우 80 포트로 들어오는 요청을 받기 위해서는 적절한 포트포워딩이 필요하다. 80포트로 접속되는 요청을 다른 쪽으로 돌려주는 형태의 포트포워딩도 가능(https://velog.io/@jinseoit/ec2-port-forward)한데 우리는 프록시 패스로 이걸 하고 있다.

* 서버도 ec2 인스턴스 내에서 켜야 한다

  처음에 서버는 로컬에서 켜도 되는 줄 알았는데 사실 ec2 인스턴스 내에서 켜야 했다

  git clone을 했다면 클라이언트와 서버 코드가 다 들어갔을 것이므로 터미널 하나에서는 npm start를 해서 서버를 실행시켜 주자
  
  
  
  

https://firework-ham.tistory.com/23

리버스 프록시와 포워드 프록시

포워드 프록시는 클라이언트가 서버에 요청할 때 프록시 서버를 거쳐서 요청하는 것. 서버에게 클라이언트가 누군지 감춤

리버스 프록시는 프록시 서버가 서버에 요청하여 받은 응답을 클라이언트에게 전달하는 방식. /api 를 통해 받은 응답을 클라이언트로 돌려 주는 것이다. 서버가 누구인지 감춰줌

즉 포워드 프록시는 클라이언트가 임의의 서버에서 응답을 받아올 때 거치는 것이고 리버스 프록시는 임의의 클라이언트가 서버에서 응답을 받아올 때 그것을 매개해 준다.

