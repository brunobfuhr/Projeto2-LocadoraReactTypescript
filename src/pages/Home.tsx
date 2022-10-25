import { useContext } from "react";
import styled from "styled-components";
import { Button } from "../components/button/Button";
import { Input } from "../components/Input";
import NavMenu from "../components/navbar/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import Carousel from "../components/carousel/carousel"


export function Home() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <NavMenu />
      {/* <div>Welcome, {user?.name}</div> */}
      {/* <Button label="Sair" onClick={logout} /> */}

      <Carousel />



    </>


  );
}
