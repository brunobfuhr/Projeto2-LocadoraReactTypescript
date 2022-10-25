import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { Button } from "../button/Button";
import { DivContainer, ItemsFormContainer } from "./UserModal.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";

interface UserModalProps {
  closeModal: Function;
  userData?: State;
}

const newUserValidationSchema = zod.object({
  name: zod.string().min(1, "Informe um nome válido"),
  email: zod
    .string()
    .min(1, "Informe a sua senha")
    .email("Informe um e-mail válido"),
  password: zod.string().min(5, "Sua senha deve conter 5 digitos"),
  age: zod.any(),
  sex: zod.string(),
});

export type State = {
  id: number;
  name: string;
  province: string;

};

export function StateModal({ closeModal, userData }: UserModalProps) {
  const methods = useForm<State>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      name: "",
      province: "",
     
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("province", userData.province);
    
    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: State) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/states/${userData.id}`, {
          name: data.name,
          province: data.province,
         
        });

        toast.success("User edited successfully");
      } else {
        await axios.post("http://localhost:3000/states", {
          name: data.name,
          province: data.province,
        
        });

        toast.success("Created State");
      }

      closeModal();
    } catch (error) {
      toast.error("Error creating state");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} />
          <Input
            label="Uf"
            id="province"
            errorMessage={errors.province?.message}
          />
         

          <Button label="Enviar Dados" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}