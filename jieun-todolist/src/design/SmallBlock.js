import styled, {css} from 'styled-components';

const SmallBlock = styled.div`
    width: 200px;

    position: relative; 
    background: white;
    border-radius: 16px; // 모서리 둥굴게
    box-shadow: 0 0 8px 0 rgba(0,0,0,100); // 박스 감싸는 그림자

    margin: 0 auto; // 페이지 중앙

    padding: 20px;
    padding-top: 10px;
    margin-top: 10px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column; // 플렉스 컨테이너 내 아이템 배치 주축 및 방향

    text-align: center;
    font-size: large;
`;

export default SmallBlock