import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { memo } from "react";

function TodoItem(props) {
  const { id, done, text, setData } = props;
  function handleDeleteClick() {
    setData((prev) => {
      // 제거할 아이템을 제외한 나머지 element를 필터링
      const filteredData = prev.filter((elem) => {
        // id를 비교하여 제거할 아이템인지 아닌지 판단
        if (elem.id !== id) {
          return true;
        }
        // 제거할 element는 담지 않는다
        return false;
      });
      // 필터링한 element만 data로 설정한다
      return filteredData;
    });
  }
  function handleDoneClick() {
    setData(prev=>{
      const adjustedData = prev.map(elem=>{
        // 클릭한 element만 if문으로 걸러냄
        if(elem.id===id){
          // done의 값만 not 연산을 진행하여
          // 이전과 반대의 값을 저장 false->true, true->false
          return { id: elem.id, text: elem.text, done: !elem.done };
        }else{
          // 나머지는 그대로 저장
          return elem;
        }
      })
      return adjustedData;
    })
  }
  return (
    <TodoItemWrap>
      <CheckCircle done={done} onClick={handleDoneClick}>
        {/* done icon(체크 아이콘)은 done의 값이 true일 경우에만 보여줌 */}
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={handleDeleteClick}>
        <MdDelete />
      </Remove>
    </TodoItemWrap>
  );
}
// 일반 div와 같지만, style를 내장한 div를 변수화했습니다
// 이를 도와주는 styled-components (1번줄)
const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemWrap = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;
export default memo(TodoItem);
