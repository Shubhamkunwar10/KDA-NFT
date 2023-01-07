import styled from "styled-components";


//header

export const Header = styled.div`

display:flex;

`
export const searchInput = styled.input`
  
    height:40px;
    width:50%;
    border-radius:15px;
    margin:auto auto auto 20px ;
    padding-left:15px;


`

//nft input
export const nftInput = styled.input`
  
    height:40px;
    width:80%;
    border-radius:10px;
padding-left:15px;
`

//upload input

export const uploadInput = styled.input`
  
   opacity:0;
position:absolute;
z-index:-1;

`


//label for upload
export const uploadLabel = styled.label`
    cursor:pointer;
    height:250px;
width:300px;
border-style:dashed;
margin-top:10px;
border-color:rgba(0,0,0,0.2);
border-radius:20px;
padding-top:auto;
padding-right:auto;

 

`
export const nftIcon = styled.label`
    cursor:pointer;
    margin:auto auto auto auto;


 

`


// Used for wrapping a page component
export const Screen = styled.div`
 
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;  
  display: flex;
  flex-direction: column;
  margin:5px 25px;
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  height: 32px;
  width: 32px;
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: flex-start;
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: "flex-start";
  align-items:  "flex-start";
  background-color: "pink";
  width: 100%;
`;

export const TextTitle = styled.h3`
  color: var(--primary-text);
  font-size: 30px;
  font-weight: 1500;
 
margin-left:5px;
`;

export const TextSubTitle = styled.p`
  color: var(--primary-text);
  font-size: 20px;
  line-height: 1.6;
margin-top:8px;
margin-bottom:0;
font-weight: 1200;
`;

export const TextInfo = styled.p`
  color: var(--primary-text);
  font-size: 13px;
 
    opacity:0.5;
margin-top:4px;
margin-bottom:6px;
font-weight: 600;
`;


export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
    padding:10px 10% 10px 5%;
  @media (min-width:1000px) {
    flex-direction: column;
    padding:0px 35% 10px 30%;
  }
`;


export const StyledImg = styled.img`
  

  width: 250px;
margin:350px;
 
  @media (min-width: 1000px) {
    width: 330px;
bottom:70px;
border-radius:330px;

  }
  transition: width 0.5s;
border-radius:250px;
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

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
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
right:50px;
    
border-radius: 16px;
height:65px;
margin-top:auto;
margin-bottom:auto;
`;