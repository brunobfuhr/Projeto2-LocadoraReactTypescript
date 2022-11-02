import styles from "./Card.module.css";
import { CardInfo } from "../CardInfo";
import axios from "axios";
import { ContentContainer, DivContainer, Edit, Remove } from "../Cards.styles";
import { AppWindow, Pencil, Trash } from "phosphor-react";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { City, CityModal } from "../modais/CityModal";



interface CardProps {
  data: City;
}



export function Card({ data }: CardProps) {
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Editar Cidade</strong>,
      html: <CityModal closeModal={MySwal.close} userData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };


  const fDelete = async (id:any) => {
    if (!confirm('Confirma a exclusão?'))
    {
     return;
    }
     axios.delete(`http://localhost:3000/cities/` + data.id)
         .then((response) => {
             Swal.fire(`Cidade ${data.name} deletada`);
         }, (error) => {
             Swal.fire(`Erro ao deletar cidade: ${error.response.data.error} `);
         });
 };


  
        
       

  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Nome" data={data.name} />
        <CardInfo title="Estado" data={data.State.name} />
      

        <Edit title="Editar" onClick={showSwal}>
          {<Pencil size={32} />}
        </Edit>
        <Remove title="Excluir" onClick={fDelete} >
          {<Trash size={32} />}
        </Remove>
      </ContentContainer>
    </DivContainer>
  );
}