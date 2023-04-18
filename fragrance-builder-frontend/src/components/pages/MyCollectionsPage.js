import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/Global";
import PageContainer from "../styles/PageContainer";
import { CollectionContainer } from "../fragranceBox/CollectionContainer.styled";
import Fragrance from "../fragranceBox/Fragrance";
import { Navbar } from "../navbar/navbar";

const theme = {
  colors: {
    body: "#FAE5C8",
  },
  mobile: "798px",
};

const MyCollectionsPage = () => {
  const [fragrances, setFragrances] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedUserID = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    async function fetchFragrancesData() {
      const user = await axios.get(`http://localhost:5000/api/v1/users/${loggedUserID}`);
      const promises = user.data.data.fragrances.map((fragrance) => axios.get(`http://localhost:5000/api/v1/fragrances/${fragrance._id}`));
      const fragrances = await Promise.all(promises);
      console.log(fragrances);
      setFragrances(fragrances);
    }

    fetchFragrancesData();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navbar id={loggedUserID} />
        <PageContainer>
          <CollectionContainer>
            {fragrances.map((fragrance) => (
              <Fragrance key={fragrance.data.data.id} id={fragrance.data.data.id} name={fragrance.data.data.name} topNotes={fragrance.data.data.topNotes} middleNotes={fragrance.data.data.middleNotes} baseNotes={fragrance.data.data.baseNotes} />
            ))}
          </CollectionContainer>
        </PageContainer>
      </ThemeProvider>
    </>
  );
};

export default MyCollectionsPage;
