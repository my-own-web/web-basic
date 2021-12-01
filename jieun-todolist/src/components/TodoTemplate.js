// 투두리스트의 레이아웃 설정 컴포넌트
// 페이지 중앙 그림자가 적용된 횐색 박스

import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
    width: 512px;
    height: 768px;

    position: relative; 
    background: white;
    border-radius: 16px; // 모서리 둥굴게
    box-shadow: 0 0 8px 0 rgba(0,0,0,100); // 박스 감싸는 그림자

    margin: 0 auto; // 페이지 중앙

    margin-top: 10px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column; // 플렉스 컨테이너 내 아이템 배치 주축 및 방향
`

function TodoTemplate({children}){
    return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;