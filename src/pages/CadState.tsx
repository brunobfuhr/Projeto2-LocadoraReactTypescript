import { Header } from "../components/Header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Pencil } from "phosphor-react";
import { Menu } from "../components/Menu";
import { MainContainer } from "./CadUsers.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/StateCards/Cards";
import { StateModal, State } from "../components/modais/StateModal";


export function StateList() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<State[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<State[]>("http://localhost:3000/states").then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Create State</strong>,
      html: <StateModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };

  return (
    <div>
      <Header label="Estados" />
      <Menu />
          {<Pencil size={32} />}
  
        

      <MainContainer>
        <Button label="Cadastrar Estados" width={82} height={50} onClick={showSwal} />
        {userList.map((user) => {
          return <Card data={user} />;
        })}
      </MainContainer>
    </div>
  );
}