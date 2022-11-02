import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { Button } from "../button/Button";
import { DivContainer, ItemsFormContainer } from "./BrandModal.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";

interface UserModalProps {
  closeModal: Function;
  userData?: Modelo;
}


export type Modelo = {
  id: number;
  name: string;
 
};

export function ModeloModal({ closeModal, userData }: UserModalProps) {
  const methods = useForm<Modelo>({
    defaultValues: {
      name: "",
     
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      
    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: Modelo) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/modelos/${userData.id}`, {
          name: data.name,
          
        });

        toast.success("Modelo editado com sucesso!");
      } else {
        await axios.post("http://localhost:3000/modelos", {
          name: data.name,
        
        });

        toast.success("Modelo cadastrado");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao cadastrar modelo");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} />
       
          <Button label="Enviar Dados" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}