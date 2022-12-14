import { useContext, useState } from "react";
import { Button } from "../components/button/Button";
import { Input } from "../components/Input";
import { InputsContainer, LoginContainer } from "./Login.styles";
import { useForm, FormProvider } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const newLoginValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, "Informe o seu email")
    .email("Informe um e-mail válido"),
  password: zod.string().min(1, "Informe a sua senha"),
});

type Login = zod.infer<typeof newLoginValidationSchema>;

export function Login() {
  const navigate = useNavigate();
  const { signIn, user } = useContext(AuthContext);
  const [errorLogin, setErrorLogin] = useState("");

  const methods = useForm<Login>({
    resolver: zodResolver(newLoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, formState } = methods;

  async function handleSubmitLogin(data: Login) {
    const login = await signIn(data);
    if (login) {
      navigate("/");
    } else {
      setErrorLogin("Login e/ou senha incorreto(s)");
    }
  }

  console.log(errorLogin);

  const { errors } = formState;

  return (
    <LoginContainer>
      {/* <img
        src="https://static.wixstatic.com/media/a5fd4e_6d62f0f9b89c4ac9b97dc4521b2de95f~mv2.jpg/v1/fill/w_1514,h_1080,al_c,q_85,enc_auto/a5fd4e_6d62f0f9b89c4ac9b97dc4521b2de95f~mv2.jpg"
        alt="Mesa de Trabalho"/> */}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitLogin)}>
          <h1>Login</h1>
          <InputsContainer>
            <Input
              width={316}
              height={52}
              label="Email"
              id="email"
              placeholder="Digite seu email"
              errorMessage={errors.email?.message}
            />

            <Input
              label="Senha"
              id="password"
              placeholder="Digite sua senha"
              width={316}
              height={52}
              errorMessage={errors.password?.message}
              type="password"
            />
          </InputsContainer>
          <Button label="Login" width={316} height={52} />
          <span>{errorLogin}</span>
        </form>
      </FormProvider>
    </LoginContainer>
  );
}
