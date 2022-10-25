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
  userData?: Brand;
}


export type Brand = {
  id: number;
  name: string;
 
};

export function BrandModal({ closeModal, userData }: UserModalProps) {
  const methods = useForm<Brand>({
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

  async function handleCrateNewUser(data: Brand) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/brands/${userData.id}`, {
          name: data.name,
          
        });

        toast.success("Marca editada com sucesso!");
      } else {
        await axios.post("http://localhost:3000/brands", {
          name: data.name,
        
        });

        toast.success("Marca cadastrada");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao criar marca");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} />
          {/* <Input
            label="Email"
            id="email"
            errorMessage={errors.email?.message}
          />
          <Input
            label="Senha"
            id="password"
            errorMessage={errors.password?.message}
          />
          <Input label="Idade" id="age" errorMessage="" />
          <Input label="Sexo" id="sex" errorMessage={errors.sex?.message} /> */}

          <Button label="Enviar Dados" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}