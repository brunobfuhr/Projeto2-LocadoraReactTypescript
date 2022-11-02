import styles from "./Card.module.css";
import { CardInfo } from "../CardInfo";
import axios from "axios";
import { ContentContainer, DivContainer, Edit, Remove } from "../Cards.styles";
import { AppWindow, Pencil, Trash } from "phosphor-react";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Modelo, ModeloModal } from "../modais/ModeloModal";


interface CardProps {
  data: Modelo;
}



export function Card({ data }: CardProps) {
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Editar Modelo</strong>,
      html: <ModeloModal closeModal={MySwal.close} userData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };


  const fDelete = async (id:any) => {
    if (!confirm('Confirma a exclusão?'))
    {
     return;
    }
     axios.delete(`http://localhost:3000/modelos/` + data.id)
         .then((response) => {
             Swal.fire(`Modelo ${data.name} deletado`);
         }, (error) => {
             Swal.fire(`Erro ao deletar modelo: ${error.response.data.error} `);
         });
 };


  
        
       

  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Nome" data={data.name} />
      

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