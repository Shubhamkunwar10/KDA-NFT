import styled from "styled-components";


//header

export const Header = styled.div`

margin-top:10px;
display:flex;
padding-left:20px;
padding-right:20px;


`
export const searchInput = styled.input`
  
    height:40px;
    width:50%;
    border-radius:15px;
    margin:auto auto auto 20px ;
    padding-left:15px;


`








export const TextTitle = styled.h3`
  color: var(--primary-text);
  font-size: 30px;
  font-weight: 1500;
 margin-top:auto;
margin-bottom:auto;
margin-left:5px;
`;







export const StyledLogo = styled.img`
  width: 50px;
  @media (min-width: 1000px) {
    width: 50px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
display:block;



`;


export const StyledButton = styled.button`
  padding: 4px;

font-size: 17px;
font-weight:bold;
  cursor: pointer; 
    background: linear-gradient(180deg,rgb(148 186 255 / 98%) 0%,rgb(13 142 233 / 96%) 70%)!important;
    color: var(--chakra-colors-black);
    text-transform: uppercase;
   
position:relative;
right:5px;
    
border-radius: 16px;
height:65px;
margin-top:auto;
margin-bottom:auto;

@media (min-width: 1000px) {
  
  right:30px;

  }
`;