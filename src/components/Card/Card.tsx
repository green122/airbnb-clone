import React from 'react';
import styled from "styled-components";

const CardImageContainer = styled.div`
  width: 100%;
  max-height: 200px;
  overflow: hidden;
`


const CardImage = styled.img`
  width: 100%;
`;

const CardTitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
`;

const CardInfoBlock = styled.div`
  padding: 10px;
`;

const CardSubtitle = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

interface CardProps {
  image: string;
  title: string;
  subTitle: string;
}

const Card = styled.div`
  width: 250px;
  :hover {
    box-shadow: 2px 2px 10px #4a4a4a;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px 10px 0;
  border: 1px solid lightgray;
`;

export const GoodiesCard = ({image, title, subTitle}: CardProps) => (
  <Card>
    <CardImageContainer>
      <CardImage src={image}/>
    </CardImageContainer>
    <CardInfoBlock>
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{subTitle}</CardSubtitle>
    </CardInfoBlock>
  </Card>
);
