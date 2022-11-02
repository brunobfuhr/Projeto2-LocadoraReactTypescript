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
import { City } from "./CityModal";
import { Select } from "../select/Select";


interface ClientModalProps {
  closeModal: Function;
  userData?: Client;
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

export type Client = {
  id: number;
  name: string;
  sex: string;
  email: string;
  cpf: string;
  street: string;
  district: string;
  number: number;
  CityId: string;
  City: City;
  
  
};

export function ClientModal({ closeModal, userData }: ClientModalProps) {
  const methods = useForm<Client>({
    // resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      name: "",
      sex: "",
      email: "",
      cpf: "",
      street: "",
      district: "",
      number: undefined,
      CityId: undefined,
      
    },
  });

  const { handleSubmit, formState, setValue, getValues, watch } = methods;

  const [cities, setCities] = useState(undefined);
//   const [modelos, setModelos] = useState(undefined);
 

  const brandId = watch("CityId");
//    watch("ModeloId");

  console.log(formState);

  useEffect(() => {
    async function getData() {
      await axios.get(`http://localhost:3000/cities`).then((response) => {
        setCities(response.data);
      });
    }
    getData();
  }, []);

 


  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("sex", userData.sex);
      setValue("email", userData.email);
      setValue("cpf", userData.cpf);
      setValue("street", userData.street);
      setValue("district", userData.district);
      setValue("number", userData.number);
      setValue("CityId", userData.CityId);
      
    }
  }, [userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: Client) {
    console.log("acessou");
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3000/clients/${userData.id}`, {
          name: data.name,
          sex: data.sex,
          email: data.email,
          cpf: data.cpf,
          street: data.street,
          district: data.district,
          number: data.number,
          CityId: data.CityId,
          
        });

        toast.success("Cliente editado com sucesso!");
      } else {
        await axios.post("http://localhost:3000/clients", {
            name: data.name,
            sex: data.sex,
            email: data.email,
            cpf: data.cpf,
            street: data.street,
            district: data.district,
            number: data.number,
            CityId: data.CityId,
        });

        toast.success("Cliente cadastrado");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao cadastrar cliente");
    }
  }



  
 



  return (
    <DivContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <Input label="Nome" id="name" errorMessage={errors.name?.message} />
          <Input label="Sexo" id="sex" errorMessage={errors.sex?.message} />
          <Input label="email" id="email" errorMessage={errors.email?.message} />
          <Input label="cpf" id="cpf" errorMessage={errors.cpf?.message} />
          <Input label="rua" id="street" errorMessage={errors.street?.message} />
          <Input label="bairro" id="district" errorMessage={errors.district?.message} />
          <Input label="numero" id="number" errorMessage={errors.number?.message} />
          
          
          {/* <Input label="Marca" id="BrandId" errorMessage={errors.BrandId?.message} />
          <Input label="Modelo" id="ModeloId" errorMessage={errors.ModeloId?.message} /> */}
          <Select
            label={"Cidade"}
            id={"CityId"}
            errorMessage={errors.CityId?.message}
            data={cities}
          />
           
        

          <Button label="Enviar Dados" />
        </form>
      </FormProvider>
    </DivContainer>
  );
}