import styles from "./Card.module.css";
import { CardInfo } from "../CardInfo";

import { ContentContainer, DivContainer, Edit, Remove } from "../Cards.styles";
import { Pencil, Trash } from "phosphor-react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { User, UserModal } from "../modais/UserModal";

interface CardProps {
  data: User;
}

export function Card({ data }: CardProps) {
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <strong>Edit User</strong>,
      html: <UserModal closeModal={MySwal.close} userData={data} />,
      showConfirmButton: false,
    }).then(() => window.location.reload());
  };



  const fDelete = async (id:any) => {
    if (!confirm('Confirma a exclusão?'))
    {
     return;
    }
     axios.delete(`http://localhost:3000/users/` + data.id)
         .then((response) => {
             Swal.fire(`Usuário ${data.name} excluído`);
         }, (error) => {
             Swal.fire(`Erro ao excluir usuário: ${error.response.data.error} `);
         });
 };





  return (
    <DivContainer>
      <ContentContainer>
        <strong>{data.id}</strong>

        <CardInfo title="Name" data={data.name} />
        <CardInfo title="Age" data={data.age} />
        <CardInfo title="Sex" data={data.sex} />
        <CardInfo title="Email" data={data.email} />

        <Edit title="Editar" onClick={showSwal}>
          {<Pencil size={32} />}
        </Edit>
        <Remove title="Excluir" onClick={fDelete}>
          {<Trash size={32} />}
        </Remove>
      </ContentContainer>
    </DivContainer>
  );
}