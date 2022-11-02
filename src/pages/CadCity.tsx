import { Header } from "../components/Header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CityModal, City } from "../components/modais/CityModal";
import { Menu } from "../components/Menu";
import { MainContainer } from "./CadUsers.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/CityCards/Cards";

export function CityList() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<City[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<City[]>("http://localhost:3000/cities").then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Cadastrar Cidade</strong>,
      html: <CityModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };

  return (
    <div>
      <Header label="Cidades" />
      <Menu />

      <MainContainer>
        <Button label="Cadastrar" width={82} height={50} onClick={showSwal} />
        {userList.map((user) => {
          return <Card data={user} />;
        })}
      </MainContainer>
    </div>
  );
}