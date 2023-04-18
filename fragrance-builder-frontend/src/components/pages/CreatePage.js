import { useState } from "react";
import { Navbar } from "../navbar/navbar";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/Global";
import PageContainer from "../styles/PageContainer";

import axios from "axios";

const theme = {
  colors: {
    body: "#FAE5C8",
  },
  mobile: "798px",
};

const CreatePage = () => {
  const [name, setName] = useState("");
  const [topNotes, setTopNotes] = useState([]);
  const [middleNotes, setMiddleNotes] = useState([]);
  const [baseNotes, setBaseNotes] = useState([]);
  const loggedUserID = JSON.parse(localStorage.getItem("id"));

  async function createFragrance(name, topNotes, middleNotes, baseNotes) {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/${loggedUserID}`, {
        name: name,
        topNotes: topNotes,
        middleNotes: middleNotes,
        baseNotes: baseNotes,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create fragrance");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navbar />
      <PageContainer>
        <form onSubmit={createFragrance}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Top notes:
            <input type="text" onChange={(e) => setTopNotes(e.target.value.split(","))} />
          </label>
          <label>
            Middle notes:
            <input type="text" onChange={(e) => setMiddleNotes(e.target.value.split(","))} />
          </label>
          <label>
            Base notes:
            <input type="text" onChange={(e) => setBaseNotes(e.target.value.split(","))} />
          </label>
          <button type="submit">Create Fragrance</button>
        </form>
      </PageContainer>
    </ThemeProvider>
  );
};

export default CreatePage;
