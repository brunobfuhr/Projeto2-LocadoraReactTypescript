import { Header } from "../components/Header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BrandModal, Brand } from "../components/modais/BrandModal";
import { Menu } from "../components/Menu";
import { MainContainer } from "./CadUsers.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/BrandCards/Cards";

export function BrandList() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<Brand[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Brand[]>("http://localhost:3000/brands").then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Criar Marca</strong>,
      html: <BrandModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };

  return (
    <div>
      <Header label="Marcas" />
      <Menu />

      <MainContainer>
        <Button label="Cadastrar Marca" width={82} height={50} onClick={showSwal} />
        {userList.map((user) => {
          return <Card data={user} />;
        })}
      </MainContainer>
    </div>
  );
}