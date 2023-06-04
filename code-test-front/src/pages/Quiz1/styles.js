import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 20vh;
    align-items: center;
    justify-content: center;
`

export const Row = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;


    h1{
        width:100%;
        color: #111;
        font-size: 50px;
        font-weight: 700;
        text-align: center;
        margin: 2rem;

    }

    h2{
        width:100%;
        color: #111;
        font-size: 40px;
        font-weight: 700;
        text-align: center;
        margin: 2rem;
    }

    p{
        width: 55%;
        color: #111;
        margin-left: 40%;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 1px;
        text-align: justify;
        z-index: 2;
    }

    img{
        width: 70%;
        margin-top: -0%;
        margin-left: 100%;
        opacity: 90%;
        border-radius: 155px;
    }
`