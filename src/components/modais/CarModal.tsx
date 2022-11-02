import { FormEvent, useState,  useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { Button } from "../button/Button";
import { DivContainer, ItemsFormContainer } from "./UserModal.styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../Input";
import { Brand } from "./BrandModal";
import { Modelo } from "./ModeloModal";
import { Select } from "../select/Select";


interface CarModalProps {
  closeModal: Function;
  userData?: Car;
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

export type Car = {
  id: number;
  name: string;
  model_year: number;
  places: number;
  situation: string;
  daily_value: string;
  BrandId: string;
  ModeloId: string;
  Brand: Brand;
  Modelo: Modelo;
  
};

export function CarModal({ closeModal, userData }: CarModalProps) {
  const methods = useForm<Car>({
    // resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      name: "",
      model_year: undefined,
      places: undefined,
      situation: "",
      daily_value: "",
      BrandId: undefined,
      ModeloId: undefined,
    },
  });

  const { handleSubmit, formState, setValue, getValues, watch } = methods;

  const [brands, setBrands] = useState(undefined);
  const [modelos, setModelos] = useState(undefined);
 

  const brandId = watch("BrandId");
   watch("ModeloId");

  console.log(formState);

  useEffect(() => {
    async function getData() {
      await axios.get(`http://localhost:3000/brands`).then((response) => {
        setBrands(response.data);
      });
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      await axios.get(`http://localhost:3000/modelos`).then((response) => {
        setModelos(response.data);
      });
    }
    getData();
  }, []);


  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("model_year", userData.model_year);
      setValue("places", userData.places);
      setValue("situation", userData.situation);
      setValue("daily_value", userData.daily_value);
      setValue("BrandId", userData.BrandId);
      setValue("ModeloId", userData.ModeloId);
    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: Car) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/cars/${userData.id}`, {
          name: data.name,
          model_year: data.model_year,
          places: data.places,
          situation: data.situation,
          daily_value: data.daily_value,
          BrandId: data.BrandId,
          ModeloId: data.ModeloId,
        });

        toast.success("Veículo editado com sucesso!");
      } else {
        await axios.post("http://localhost:3000/cars", {
          name: data.name,
          model_year: data.model_year,
          places: data.places,
          situation: data.situation,
          daily_value: data.daily_value,
          BrandId: data.BrandId,
          ModeloId: data.ModeloId,
        });

        toast.success("Veículo cadastrado");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao cadastrar veículo");
    }
  }



  
 



  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} />
          <Input label="Ano Modelo" id="model_year" errorMessage={errors.model_year?.message} />
          <Input label="Lugares" id="places" errorMessage={errors.places?.message} />
          <Input label="Situação" id="situation" errorMessage={errors.situation?.message} />
          
          <Input label="Valor Diária" id="daily_value" errorMessage={errors.daily_value?.message} />
          {/* <Input label="Marca" id="BrandId" errorMessage={errors.BrandId?.message} />
          <Input label="Modelo" id="ModeloId" errorMessage={errors.ModeloId?.message} /> */}
          <Select
            label={"Marca"}
            id={"BrandId"}
            errorMessage={errors.BrandId?.message}
            data={brands}
          />
           <Select
            label={"Modelo"}
            id={"ModeloId"}
            errorMessage={errors.ModeloId?.message}
            data={modelos}
          />
        

          <Button label="Enviar Dados" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}