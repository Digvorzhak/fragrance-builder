import styled from "styled-components";

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || "flex-start"};

  & > div,
  & > ul {
    flex: 1;
    margin-top: 10px;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`;
