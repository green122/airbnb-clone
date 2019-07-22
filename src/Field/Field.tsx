import React from "react";
import styled from "styled-components";

const Draggable = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  background-color: blue;
  margin: 0 auto;
  position: absolute;
`;

const FieldContainer = styled.div`
    width: 800px;
    height: 700px;
    position: relative;
`

export function Field() {    
  return (
    <FieldContainer>
      <Draggable />
    </FieldContainer>
  );
}
