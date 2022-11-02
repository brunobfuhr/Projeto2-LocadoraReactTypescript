import styles from "./Card.module.css";
import { CardInfo } from "../CardInfo";

import { ContentContainer, DivContainer, Edit, Remove } from "../Cards.styles";
import { Pencil, Trash } from "phosphor-react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Client, ClientModal } from "../modais/ClientModal";

interface CardProps {
  data: Client;
}

export function Card({ data }: CardProps) {
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Editar Cliente</strong>,
      html: <ClientModal closeModal={MySwal.close} userData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };



  const fDelete = async (id:any) => {
    if (!confirm('Confirma a exclusão?'))
    {
     return;
    }
     axios.delete(`http://localhost:3000/clients/` + data.id)
         .then((response) => {
             Swal.fire(`Cliente ${data.name} excluído`);
         }, (error) => {
             Swal.fire(`Erro ao excluir cliente: ${error.response.data.error} `);
         });
 };


       

  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Nome" data={data.name} />
        <CardInfo title="Sexo" data={data.sex} />
        <CardInfo title="Email" data={data.email} />
        <CardInfo title="Cpf" data={data.cpf} />
        <CardInfo title="Rua" data={data.street} />
        <CardInfo title="Bairro" data={data.district} />
        <CardInfo title="Numero" data={data.number} />
        <CardInfo title="Cidade" data={data.City.name} />
      

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