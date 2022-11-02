import { Header } from "../components/Header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Pencil } from "phosphor-react";
import { Menu } from "../components/Menu";
import { MainContainer } from "./CadUsers.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/ClientCards/Cards";
import { ClientModal, Client } from "../components/modais/ClientModal";


export function ClientList() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<Client[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Client[]>("http://localhost:3000/clients").then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Cadastrar Cliente</strong>,
      html: <ClientModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };


  const gerarPdf = () => {
    window.location.href="http://localhost:3000/clients/pdf";
      }
    
      const gerarCsv = () => {
        window.location.href="http://localhost:3000/clients/csv";
          }

  return (
    <div>
      <Header label="Clientes" />
      <Menu />
          {<Pencil size={32} />}
  
        

      <MainContainer>
        <Button label="Cadastrar" width={82} height={50} onClick={showSwal} />
        {userList.map((client) => {
          return <Card data={client} />;
        })}
        <Button label="Gerar Pdf"  width={90} height={40} onClick={gerarPdf} />
        <Button label="Gerar Csv" width={90} height={40} onClick={gerarCsv} />
      </MainContainer>
    </div>
  );
}