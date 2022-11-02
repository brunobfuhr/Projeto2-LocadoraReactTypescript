import styled from "styled-components";

export const LoginContainer = styled.main`
  height: 100vh;
  width: 100vw;
  background-color: #212121;
  background-image: radial-gradient(circle, #000000 0%, #00d4ff 100%);
  background-repeat: no-repeat;
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
  padding-top:120px;
    margin: 0 auto;
    align-items: center;
    max-width: 26rem;
    display: flex;
    flex-direction: column;
    gap: 32px;
    box-shadow: #212121;
    
  }

  h1 {
    color: #fff;
    font-weight: 600;
    font-size: 30px;
    line-height: 32px;
  }
label {
  color: #fff;
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
