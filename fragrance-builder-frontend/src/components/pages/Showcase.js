import { React, useEffect, useState } from "react";
import { Navbar } from "../navbar/navbar";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/Global";
import PageContainer from "../styles/PageContainer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Flex } from "../styles/Flex.styled";
import { FlexColumn } from "../styles/FlexColumn.styled";

const theme = {
  colors: {
    body: "#FAE5C8",
  },
  mobile: "798px",
};

const Showcase = () => {
  const [fragrance, setFragrance] = useState({});
  const { fragranceID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/fragrances/${fragranceID}`);
        if (response.status !== 200) {
          console.log(response);
          throw new Error("Could not get fragrance.");
        }

        setFragrance(response.data.data);
        console.log(fragrance);
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
        <Navbar />
        <PageContainer>
          <Flex justify="center">
            <h1>PERFUME PYRAMID</h1>
          </Flex>
          {fragrance.name && (
            <>
              <FlexColumn align="center">
                <h1>{fragrance.name}</h1>
                <h2>Creator: {fragrance.creatorName}</h2>
                <h2>Top Notes</h2>
              </FlexColumn>
              <Flex>
                {fragrance.topNotes.map((note) => (
                  <div key={note._id}>
                    <img src={note.image.slice(1)}></img>
                    <div>{note.noteName}</div>
                  </div>
                ))}
              </Flex>
              <FlexColumn align="center">
                <h2>Middle Notes</h2>
              </FlexColumn>
              <Flex>
                {fragrance.middleNotes.map((note) => (
                  <div key={note._id}>
                    <img src={note.image.slice(1)}></img>
                    <span>{note.noteName}</span>
                  </div>
                ))}
              </Flex>
              <FlexColumn align="center">
                <h2>Base Notes</h2>
              </FlexColumn>
              <Flex>
                {fragrance.baseNotes.map((note) => (
                  <div key={note._id}>
                    <img src={note.image.slice(1)}></img>
                    <span>{note.noteName}</span>
                  </div>
                ))}
              </Flex>
            </>
          )}
        </PageContainer>
      </ThemeProvider>
    </>
  );
};

export default Showcase;
