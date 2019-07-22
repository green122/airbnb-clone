import React from "react";
import styled from "styled-components";

const View = styled.div`
  width: auto;
`;

const InputSearch = styled.input`
  width: 200px;
  height: 40px;
`;

export function Search() {
  return (
    <View>
      <InputSearch />
    </View>
  );
}


