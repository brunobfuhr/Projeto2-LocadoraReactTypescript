import styles from "./Card.module.css";
import { CardInfo } from "../CardInfo";

import { ContentContainer, DivContainer, Edit, Remove } from "../Cards.styles";
import { Pencil, Trash } from "phosphor-react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Car, CarModal } from "../modais/CarModal";


interface CardProps {
  data: Car;
}

export function Card({ data }: CardProps) {
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Edit Car</strong>,
      html: <CarModal closeModal={MySwal.close} userData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };



  const fDelete = async (id:any) => {
    if (!confirm('Confirma a exclusão?'))
    {
     return;
    }
     axios.delete(`http://localhost:3000/cars/` + data.id)
         .then((response) => {
             Swal.fire(`Veículo ${data.name} deletado`);
         }, (error) => {
             Swal.fire(`Erro ao deletar veículo: ${error.response.data.error} `);
         });
 };


       

  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Nome" data={data.name} />
        <CardInfo title="Ano do Modelo" data={data.model_year} />
        <CardInfo title="Lugares" data={data.places} />
        <CardInfo title="Situação" data={data.situation} />
        <CardInfo title="Valor diária" data={data.daily_value} />
        <CardInfo title="Marca" data={data.Brand.name} />
        <CardInfo title="Modelo" data={data.Modelo.name} />
      

        <Edit title="Editar" onClick={showSwal}>
          {<Pencil size={32}  />}
        </Edit>
        
        <Remove title="Excluir" onClick={fDelete} >
          {<Trash size={32} />}
        </Remove>
      </ContentContainer>
    </DivContainer>
  );
}