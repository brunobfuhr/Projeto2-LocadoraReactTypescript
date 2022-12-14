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
  userData?: User;
}

const newUserValidationSchema = zod.object({
  name: zod.string().min(1, "Informe um nome válido"),
  email: zod
    .string()
    .min(1, "Informe a sua senha")
    .email("Informe um e-mail válido"),
  password: zod.string().min(6, "Sua senha deve conter 6 digitos"),
  age: zod.any(),
  sex: zod.string(),
});

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  sex: string;
};

export function UserModal({ closeModal, userData }: UserModalProps) {
  const methods = useForm<User>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: undefined,
      sex: "",
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  console.log(formState);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("password", userData.password);
      setValue("age", userData.age);
      setValue("sex", userData.sex);
    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: User) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/users/${userData.id}`, {
          name: data.name,
          email: data.email,
          password: data.password,
          age: data.age,
          sex: data.sex,
        });

        toast.success("User edited successfully");
      } else {
        await axios.post("http://localhost:3000/users", {
          name: data.name,
          email: data.email,
          password: data.password,
          age: data.age,
          sex: data.sex,
        });

        toast.success("Created User");
      }

      closeModal();
    } catch (error) {
      toast.error("Error creating user");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} />
          <Input
            label="Email"
            id="email"
            errorMessage={errors.email?.message}
          />
          <Input
          type="password"
            label="Senha"
            id="password"
            errorMessage={errors.password?.message}
          />
          <Input label="Idade" id="age" errorMessage="" />
          <Input label="Sexo" id="sex" errorMessage={errors.sex?.message} />

          <Button label="Enviar Dados" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}