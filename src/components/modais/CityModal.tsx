import { FormEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { Button } from "../button/Button";
import { DivContainer, ItemsFormContainer } from "./BrandModal.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { State } from "./StateModal";
import { Select } from "../select/Select";

interface CityModalProps {
  closeModal: Function;
  userData?: City;
}


export type City = {
  id: number;
  name: string;
  StateId: string;
 State: State;
};

export function CityModal({ closeModal, userData }: CityModalProps) {
  const methods = useForm<City>({
    defaultValues: {
      name: "",
      StateId: undefined,
      
     
    },
  });

  const { handleSubmit, formState, setValue, getValues, watch } = methods;

  const [states, setState] = useState(undefined);

  const stateId = watch("StateId");
  

  // console.log(formState);

  useEffect(() => {
    async function getData() {
      await axios.get(`http://localhost:3000/states`).then((response) => {
        setState(response.data);
      });
    }
    getData();
  }, []);


  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("StateId", String(userData.StateId));

      
    }
  }, [userData]);



  useEffect(() => {
    async function getData() {
      await axios.get(`http://localhost:3000/states`).then((response) => {
        setState(response.data);
      });
    }

    getData();
  }, []);




  const { errors } = formState;

  async function handleCrateNewUser(data: City) {
    // console.log("acessou");
    console.log(data);
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/cities/${userData.id}`, {
          name: data.name,
          StateId: Number(data.StateId),
          // StateId: data.StateId,
        });

        toast.success("Cidade editada com sucesso!");
      } else {
        await axios.post("http://localhost:3000/cities", {
          name: data.name,
          StateId: Number(data.StateId),
          // StateId: data.StateId,
        });

        toast.success("Cidade cadastrada");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao cadastrar cidade");
    }
  }

  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} />
          {/* <Input label="Estado" id="StateId" errorMessage={errors.StateId?.message} /> */}
          <Select
            label={"Estado"}
            id={"StateId"}
            errorMessage={errors.StateId?.message}
            data={states}
          />
          <Button label="Enviar Dados" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}