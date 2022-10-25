import styled from "styled-components";

export const LoginContainer = styled.main`
  height: 100vh;
  width: 100vw;
  background-image: url("https://static.wixstatic.com/media/a5fd4e_6d62f0f9b89c4ac9b97dc4521b2de95f~mv2.jpg/v1/fill/w_1514,h_1080,al_c,q_85,enc_auto/a5fd4e_6d62f0f9b89c4ac9b97dc4521b2de95f~mv2.jpg");
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* align-items: center; */
  
  /* img {
    position: absolute;
    width: 100vw;
    height: 100vh;
    /* z-index: -1; 
  } */
  
  form {
    margin: 0 auto;
    align-items: center;
    max-width: 26rem;
    display: flex;
    flex-direction: column;
    gap: 32px;
    
  }

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 32px;
  }

  span {
    color: red;
  }
`;

export const InputsContainer = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;

`;
