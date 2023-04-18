import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import axios from "axios";

export function SignUpForm(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { switchToSignIn } = useContext(AccountContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!password || !email || !fullName) {
        console.log("Please enter all fields.");
      }
      if (password !== confirmPassword) {
        console.log("Passwords do not match.");
        return;
      }
      // if (!pass)
      const updatedUserInfo = { password: password, name: fullName, email: email };
      console.log(updatedUserInfo);
      const response = await axios.post(`/api/v1/users`, updatedUserInfo);
      if (response.statusText === "Created") {
        localStorage.setItem("id", JSON.stringify(response.data.data._id));
        navigate(`/collections`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" value={fullName} onChange={(event) => setFullName(event.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>
        Sign Up
      </SubmitButton>
      <Marginer direction="vertical" margin="0.5em" />
      <MutedLink href="#">
        Already have an account?{" "}
        <BoldLink href="#" onClick={switchToSignIn}>
          Sign In
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
