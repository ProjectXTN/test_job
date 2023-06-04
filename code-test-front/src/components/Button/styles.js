import styled, { css } from "styled-components";

export const ButtonContainer = styled.button`

    margin-top: 3rem;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 400;
    background-color: #A9A9A990;
    border: 0;
    border-radius: 18px;
    color: #FFF;

    &:hover{
        cursor: pointer;
        color: #FFF;
        background-color: #D2691E;
    }


    ${({variant}) => variant !== "primary" && css`
        margin: 5rem;
        padding: 5px 40px;
        font-size: 20px;
        font-weight: 500;
        background-color: #FFF;
        border: 3px solid orange;
        border-radius: 10px;
        color: orange;

        &:hover{
            cursor: pointer;
            color: #FFF;
            background-color: #363636;
        }

        @media screen and (width <= 750px) {
            margin: 2rem;
            padding: 10px 20px;
            font-size: 20px;
        }
    `}
`