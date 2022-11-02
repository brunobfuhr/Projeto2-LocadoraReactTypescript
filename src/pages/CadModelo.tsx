import { Header } from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ModeloModal, Modelo } from "../components/modais/ModeloModal";
import { Menu } from "../components/Menu";
import { MainContainer } from "./CadUsers.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/ModeloCards/Cards";

export function ModeloList() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<Modelo[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Modelo[]>("http://localhost:3000/modelos").then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Cadastrar Modelo</strong>,
      html: <ModeloModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };

  return (
    <div>
      <Header label="Modelos" />
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