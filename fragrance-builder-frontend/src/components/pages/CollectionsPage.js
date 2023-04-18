import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/Global";
import PageContainer from "../styles/PageContainer";
import { CollectionContainer } from "../fragranceBox/CollectionContainer.styled";
import Fragrance from "../fragranceBox/Fragrance";
import { Navbar } from "../navbar/navbar";
import { Link } from "react-router-dom";
import { StyledLink } from "../styles/Link.styled";

const theme = {
  colors: {
    body: "#FAE5C8",
  },
  mobile: "798px",
};

const CollectionsPage = () => {
  const [fragrances, setFragrances] = useState([]);
  const loggedUserID = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/fragrances");
        if (!response.statusText === "OK") {
          throw new Error("Could not get collection.");
        }
        setFragrances(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navbar id={loggedUserID} />
        <PageContainer>
          <CollectionContainer>
            {fragrances.map((fragrance) => (
              <StyledLink to={`/collections/showcase/${fragrance._id}`}>
                <Fragrance key={fragrance._id} id={fragrance._id} name={fragrance.name} topNotes={fragrance.topNotes} middleNotes={fragrance.middleNotes} baseNotes={fragrance.baseNotes} />
              </StyledLink>
            ))}
          </CollectionContainer>
        </PageContainer>
      </ThemeProvider>
    </>
  );
};

export default CollectionsPage;
