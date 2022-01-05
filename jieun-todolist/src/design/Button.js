import styled, {css} from 'styled-components';
import { darken, lighten } from 'polished';

const Button = styled.button`
    border: none;
    width: auto; //30%;
    padding: 5px;//3px;
    margin-top:10px;
    background: ${props => props.color || '#38d9a9'};
    &:hover{
        background: ${props => lighten(0.1, props.color || '#38d9a9')};
    }
    &:active{
        background: ${props => darken(0.1, props.color || '#38d9a9')};
    }
`;

export default Button;