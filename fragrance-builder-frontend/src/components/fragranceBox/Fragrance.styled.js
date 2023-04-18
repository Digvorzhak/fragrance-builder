import styled from "styled-components";

export const FragranceStyle = styled.div`
  flex: 1 0 300px;
  height: 100%;
  background-color: #fff;
  /* border: 2px solid #403e41; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
    padding: 0px 40px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      white-space: normal;
    }
  }
  img {
    /* width: 250px;
    height: 250px;
    object-fit: cover; */
  }

  .with-margin {
    margin-bottom: 15px;
  }
`;
