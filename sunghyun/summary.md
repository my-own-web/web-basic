## http 메서드







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
