import React, { useState, useEffect } from "react";
import { IOption, IVariation } from "types/models";
import { clone } from "ramda";
import { Variation } from "components/Variation/Variation";
import { Button, Icon, Grid, Input, Segment } from "semantic-ui-react";
import { ModalEditor } from "components/ModalEditor/ModalEditor";
import {
  createVariation,
  deleteVariation,
  fetchVariations,
  updateVariation,
} from "../Variation/Variation.store";
import { useAppDispatch } from "../../index";
import { fetchOptions } from "../Variation/Option.store";
import "./VariationsList.css";

interface IVariationsListProps {
  variations: IVariation[];
  options: IOption[];
  selectedId?: string;
  update: (variations: IVariation, updatedOptions: IOption[]) => void;
}

function VariationsList({
  variations,
  update,
  options,
  selectedId,
}: IVariationsListProps) {
  const [variationsList, setVariationsList] = useState(clone(variations));
  const [editingVariationId, setEditingVariationId] = useState<
    number | string | null
  >(Number(selectedId) || null);
  const [createMode, setCreateMode] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (variations && variations.length && variations !== variationsList) {
      setVariationsList(variations);
    }
  }, [variations]);

  const addVariation = (event: KeyboardEvent) => {
    const { value } = event.target as any;
    if (event.key === "Enter" && value) {
      const newVariation: IVariation = {
        id: 0,
        varyPrice: false,
        variation: value,
        options: [],
      };
      dispatch(createVariation(newVariation));
      setCreateMode(false);
    }
  };

  const removeVariation = (event: MouseEvent, id: number) => {
    event.stopPropagation();
    dispatch(deleteVariation(id));
  };

  const handleVariation = async (
    updatedVariation: IVariation,
    updatedOptions: IOption[]
  ) => {
    setEditingVariationId(null);
    await dispatch(updateVariation(updatedVariation));
    await Promise.all([dispatch(fetchVariations()), dispatch(fetchOptions())]);
  };

  const expand = (variationId: number) => () => {
    if (!editingVariationId) {
      setEditingVariationId(variationId);
    }
  };

  const isVaryPriceAlreadySet = variationsList.some(
    (variation) => variation.varyPrice
  );

  return (
    <ModalEditor buttonLabel="Edit Variations" proceedHandler={console.log}>
      <Grid divided={true}>
        <Grid.Row>
          <Grid.Column>
            {(variationsList || []).map((variation) =>
              variation.id === editingVariationId ? (
                <Variation
                  key={variation.id}
                  disableVaryPrice={
                    !variation.varyPrice && isVaryPriceAlreadySet
                  }
                  variation={variation}
                  options={options}
                  handle={handleVariation}
                  cancel={() => setEditingVariationId(null)}
                />
              ) : (
                <Segment
                  onClick={expand(variation.id)}
                  className="variation-item"
                >
                  {variation.variation}
                  <Icon
                    size="large"
                    className="remove-icon"
                    onClick={(event: MouseEvent) =>
                      removeVariation(event, variation.id)
                    }
                    name="remove"
                  />
                </Segment>
              )
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {!createMode && (
              <Button
                icon={true}
                color="teal"
                labelPosition="left"
                onClick={() => setCreateMode(true)}
              >
                <Icon name="plus" />
                Create a new variation
              </Button>
            )}
            {createMode && (
              <Input
                className="input-fluid"
                icon="plus"
                onKeyDown={addVariation}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ModalEditor>
  );
}

export default VariationsList;
