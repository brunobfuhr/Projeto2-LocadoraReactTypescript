import { Header } from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserModal, User } from "../components/modais/UserModal";
import { Menu } from "../components/Menu";
import { MainContainer } from "./CadUsers.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/UserCards/Cards";



export function UserList() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<User[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<User[]>("http://localhost:3000/users").then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Cadastrar usuário</strong>,
      html: <UserModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };

  const gerarPdf = () => {
window.location.href="http://localhost:3000/users/pdf";
  }

  const gerarCsv = () => {
    window.location.href="http://localhost:3000/users/csv";
      }


  return (
    <div>
      <Header label="Usuários" />
      <Menu />

      <MainContainer>
        <Button label="Cadastrar" width={90} height={50} onClick={showSwal} />
        {userList.map((user) => {
          return <Card data={user} />;
        })}
        <Button label="Gerar Pdf"  width={90} height={40} onClick={gerarPdf} />
        <Button label="Gerar Csv" width={90} height={40} onClick={gerarCsv} />
      </MainContainer>
    </div>
  );
}