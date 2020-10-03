import React from "react";
import { ICartItem } from "../../types/models";
import styled from "styled-components";
import { Col, InputNumber, Row, Select } from "antd";
import { cutText } from "../../utils/cutText";
import { DropdownFormInput } from "../DropdownFormInput/DropdownFormInput";
import { useSelector } from "react-redux";
import { getVariationById } from "../Variation/Variation.store";
import { convertToDropdownItem } from "../../utils/convertToDropdown";

interface CartItemProps {
  item: ICartItem;
  onChangeAmount: (amount: number) => void;
  onChangeOption: (optionId: number, variationId: number) => void;
}

const CartItemContainer = styled.div`
  width: 1000px;
  display: flex;
  margin: auto;
  align-items: flex-start;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const OptionsSelectors = styled.div`
  display: block;
`;

const CartItemImagePreview = styled.img`
  width: 150px;
  @media (max-width: 340px) {
    width: 100%;
  }
`;

const ItemName = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

const ItemDescription = styled.p`
  font-size: 14px;
`;

const ItemInfo = styled.div`
  width: 250px;
`;

const StyledSelect = styled(Select)`
  display: block;
  width: 100%;
  margin-bottom: 10px;
`;

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onChangeAmount,
  onChangeOption,
}: CartItemProps) => {
  const urlPreview = item?.listing?.images[0].urlPreview;
  const getVariation = (id: number) =>
    item.listing.category.variations.find(variation => variation.id === id);
  return (
    <CartItemContainer>
      <CartItemImagePreview src={urlPreview} />
      <ItemInfo>
        <ItemName>{item.listing.name}</ItemName>
        <ItemDescription>{cutText(item.listing.description)}</ItemDescription>
        <OptionsSelectors>
          {item.orderedVariations.map((orderedVariation) => (
            <div>
              <p>{getVariation(orderedVariation.variationId)?.variation}</p>
              <StyledSelect
                defaultValue={String(orderedVariation.optionId)}
                onChange={(value) =>
                  onChangeOption(Number(value), orderedVariation.variationId)
                }
              >
                {convertToDropdownItem(
                  getVariation(orderedVariation.variationId)?.options || []
                ).map((dropdownItem) => (
                  <Select.Option
                    value={String(dropdownItem.value)}
                    key={String(dropdownItem.value)}
                  >
                    {dropdownItem.text}
                  </Select.Option>
                ))}
              </StyledSelect>
            </div>
          ))}
        </OptionsSelectors>
      </ItemInfo>
      <InputNumber
        formatter={(value) => String(Math.floor(Number(value)))}
        size="large"
        onChange={onChangeAmount}
        step={1}
        defaultValue={item.amount}
        precision={0}
      />
    </CartItemContainer>
  );
};
