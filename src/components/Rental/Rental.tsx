import React, { MouseEvent } from "react";
import styled from "styled-components";

const View = styled.div`
  width: 200px;
  height: 200px;
`;

const Image = styled.img`
  width: auto;
  height: 200px;  
`;

interface IRentalProps {
    image: string;
    title: string;
    subtitle: string;
    onClick: (event: MouseEvent) => void;
}

export function Rental({ image, title, subtitle, onClick }: IRentalProps) {
  return (
    <View onClick={onClick}>
        {title}
        {subtitle}
      <Image src={image} />
    </View>
  );
}


