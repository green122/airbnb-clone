import React, { MouseEvent } from "react";
import styled from "styled-components";
import { IRental } from "../../types/models";

export const View = styled.div`
  width: 200px;
  box-sizing: border-box;
  box-shadow: 5px 5px 5px #4444;
  padding: 10px;
  height: 200px;
  padding: 10px;
`;

const HeaderStyled = styled.h4`
  font-size: 20px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ImageContainer = styled.div`
  width: 180px;
  max-height: 90px;
`;

export interface IRentalProps {
  data: IRental;
  onClick: (event: MouseEvent) => void;
}

export function Rental({ data, onClick }: IRentalProps) {
  return (
    <View onClick={onClick}>
      <ImageContainer>
        <Image src={data.images.picture_url} />
      </ImageContainer>
      <HeaderStyled>{data.name}</HeaderStyled>
    </View>
  );
}
