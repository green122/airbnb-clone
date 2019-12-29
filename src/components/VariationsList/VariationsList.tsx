import React, { useState, useEffect } from "react";
import { IVariation } from "types/models";
import { clone } from "ramda";
import { Variation } from "components/Variation/Variation";
import { Button, Icon, Grid, Input } from "semantic-ui-react";
import { ModalEditor } from "components/ModalEditor/ModalEditor";

interface IVariationsListProps {
  variations: IVariation[];
  update: (variations: IVariation[]) => void;
}

function VariationsList({ variations, update }: IVariationsListProps) {
  const [variationsList, setVariationsList] = useState(clone(variations));
  const [editingVariationId, setEditingVariationId] = useState<string | null>(
    null
  );
  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    if (variations && variations.length && variations !== variationsList) {
      setVariationsList(variations);
    }
  }, [variations]);

  const addVariation = (event: KeyboardEvent) => {
    const { value } = event.target as any;
    if (event.key === "Enter" && value) {
      setCreateMode(false);
      const id = `temp_${Date.now()}`;
      const newVariation: IVariation = {
        id,
        priceVary: false,
        name: value,
        options: []
      };
      setEditingVariationId(id);
      setVariationsList(variationsList.concat(newVariation));
    }
  };

  const updateVariation = (updatedVariation: IVariation) => {
    const updatedEntities: IVariation[] = [];
    variationsList.forEach(variation =>
      updatedEntities.push(
        variation.id === updatedVariation.id ? updatedVariation : variation
      )
    );
    setVariationsList(updatedEntities);
    setEditingVariationId(null);
  };

  console.log(variationsList);

  return (
    <ModalEditor proceedHandler={() => update(variationsList)}>
      <Grid divided={true}>
        <Grid.Row>
          <Grid.Column>
            {(variationsList || []).map(variation => (
              <Variation
                key={variation.id}
                expanded={variation.id === editingVariationId}
                onClick={() =>
                  setEditingVariationId(
                    variation.id === editingVariationId ? null : variation.id
                  )
                }
                variation={variation}
                update={updateVariation}
              />
            ))}
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
