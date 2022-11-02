import { Header } from "../components/Header";

import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Pencil } from "phosphor-react";
import { Menu } from "../components/Menu";
import { MainContainer } from "./CadUsers.styles";
import { Button } from "../components/button/Button";
import { Card } from "../components/CarCards/Cards";
import { CarModal, Car } from "../components/modais/CarModal";


export function CarList() {
  const MySwal = withReactContent(Swal);
  const [userList, setUserList] = useState<Car[]>([]);
  const [closeModal, setCloseModal] = useState(false);

  useEffect(() => {
    axios.get<Car[]>("http://localhost:3000/cars").then((response) => {
      setUserList(response.data);
    });
  }, [closeModal]);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Cadastrar Veículo</strong>,
      html: <CarModal closeModal={MySwal.close} />,
      showConfirmButton: false,
    }).then(() => setCloseModal(true));
  };


  const gerarPdf = () => {
    window.location.href="http://localhost:3000/cars/pdf";
      }
    
      const gerarCsv = () => {
        window.location.href="http://localhost:3000/cars/csv";
          }



  return (
    <div>
      <Header label="Veículos" />
      <Menu />
          {<Pencil size={32} />}
  
        

      <MainContainer>
        <Button label="Cadastrar" width={82} height={50} onClick={showSwal} />
        {userList.map((car) => {
          return <Card data={car} />;
        })}
        <Button label="Gerar Pdf"  width={90} height={40} onClick={gerarPdf} />
        <Button label="Gerar Csv" width={90} height={40} onClick={gerarCsv} />
      </MainContainer>
    </div>
  );
}