import styled, {css} from 'styled-components';

const DarkBackground =styled.div`
    position:fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
`;

const PopupBox = styled.div`
    // display: none;
    // display: ${props => props.show? 'flex' : 'none'};
    color: red;
    background: red;
    // width: 200px;
    width: auto;

    position: fixed; 
    top: 0;
    background: white;
    // border-radius: 16px; // 모서리 둥굴게
    box-shadow: 0 0 8px 0 black; //rgba(0,0,0,100); // 박스 감싸는 그림자

    margin: 0 auto; // 페이지 중앙

    padding: 20px;
    margin-top: 10px;
    margin-bottom: 32px;
    // // display: flex;
    // flex-direction: column; // 플렉스 컨테이너 내 아이템 배치 주축 및 방향
    
`

function Popup({show, children}){
    if(show){
        return(
        <DarkBackground>
            <PopupBox>{children}</PopupBox>
        </DarkBackground>
        );
    }
    else return null;
}

export default Popup;