import styled from "styled-components";

export const Container = styled.div(()=>`
    width:100%;
    max-width:750px;
    margin:auto;
    display:flex;
    padding:50px 0px;

    @media(max-width: 750px){
        flex-direction:column;
    }

`);

export const Infor = styled.div(()=>`
    display:flex;
    flex-direction:column;
    width:auto;

    @media(max-width:750px){
        margin-bottom: 50px;
        align-items:center;
    }

`);

export const logoLink = styled.a(()=>`
    display:block;

`);


export const InfoArea = styled.div(()=>`
    width:100%;
    margin:10px 0px;

    @media(max-width:750px){
        display:flex;
        justify-content: space-around;
        text-align:center;
    }
`);

export const GridArea = styled.div(()=>`
    display:flex;
    flex:1;
    justify-content:flex-end;

    @media(max-width:750px){
        justify-content:center;
        margin:0 20px;
    }

`);

export const Grid = styled.div(()=>`
    width: 430px;
    display:Grid;
    grid-template-columns: repeat(4,1fr);
    gap:10px;


`);