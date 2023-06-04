import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Row = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1{
        width:100%;
        color: #111;
        font-size: 50px;
        font-weight: 700;
        text-align: center;
        margin: 2rem;

    }

    p{
        color: #111;    
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 1px;
        text-align: justify;
        z-index: 2;
    }

    div{
        text-align: center;
    }

    label{
        margin-right: 10px;
    }
    
    input{
        cursor: pointer;
    }

    a{
        text-decoration: none;
        color: #111;

        &:hover{
            color: #CC0000;
        }
    }
`