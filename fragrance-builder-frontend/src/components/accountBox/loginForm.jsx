import React, { useContext, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { switchToSignUp } = useContext(AccountContext);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8000/api/v1/users?email=${email}`);
      const userData = response.data.data;
      console.log(userData);

      const user = userData.find((user) => user.email === email);

      if (!user) {
        console.log("user not found.");
        return;
      }

      if (user.password === password) {
        localStorage.setItem("id", JSON.stringify(user._id));
        navigate(`/collections`);
      } else {
        console.log("password error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>
        Sign In
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignUp}>
          Sign Up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
