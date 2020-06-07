import React, {useState, useEffect} from "react";
import {IOption, IVariation} from "types/models";
import {clone} from "ramda";
import {Variation} from "components/Variation/Variation";
import {Button, Icon, Grid, Input, Segment} from "semantic-ui-react";
import {ModalEditor} from "components/ModalEditor/ModalEditor";

interface IVariationsListProps {
  variations: IVariation[];
  options: IOption[];
  selectedId?: string;
  update: (variations: IVariation, updatedOptions: IOption[]) => void;
}

function VariationsList({variations, update, options, selectedId}: IVariationsListProps) {
  const [variationsList, setVariationsList] = useState(clone(variations));
  const [editingVariationId, setEditingVariationId] = useState<number | string | null>(
    Number(selectedId) || null
  );
  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    if (variations && variations.length && variations !== variationsList) {
      setVariationsList(variations);
    }
  }, [variations]);

  const addVariation = (event: KeyboardEvent) => {
    const {value} = event.target as any;
    if (event.key === "Enter" && value) {
      setCreateMode(false);
      const id = `new`;
      const newVariation: IVariation = {
        id,
        varyPrice: false,
        variation: value,
        options: []
      };
      setEditingVariationId(id);
      setVariationsList(variationsList.concat(newVariation));
    }
  };

  const handleVariation = (updatedVariation: IVariation, updatedOptions: IOption[]) => {
    // const updatedEntities: IVariation[] = [];
    // variationsList.forEach(variation =>
    //   updatedEntities.push(
    //     variation.id === updatedVariation.id ? updatedVariation : variation
    //   )
    // );
    // setVariationsList(updatedEntities);
    update(updatedVariation, updatedOptions)
    setEditingVariationId(null);
  };

  const expand = (variationId: string) => () => {
    if (!editingVariationId) {
      setEditingVariationId(variationId);
    }
  }

  const isVaryPriceAlreadySet = variationsList.some(variation => variation.varyPrice);

  return (
    <ModalEditor buttonLabel="Edit Variations" proceedHandler={console.log}>
      <Grid divided={true}>
        <Grid.Row>
          <Grid.Column>
            {(variationsList || []).map(variation =>
              variation.id === editingVariationId ?
                <Variation
                  key={variation.id}
                  disableVaryPrice={!variation.varyPrice && isVaryPriceAlreadySet}
                  variation={variation}
                  options={options}
                  handle={handleVariation}
                  cancel={() => setEditingVariationId(null)}
                /> :
                <Segment onClick={expand(variation.id)} className="variation-item">
                  {variation.variation}
                </Segment>
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
                <Icon name="plus"/>
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
