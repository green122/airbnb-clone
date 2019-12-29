import React, { useState, Fragment } from "react";
import { IVariation, IOption } from "types/models";
import {
  Label,
  Icon,
  Input,
  Button,
  Checkbox,
  Grid,
  Segment
} from "semantic-ui-react";
import "./Variation.css";

interface IVariationProps {
  expanded: boolean;
  variation: IVariation;
  update: (variations: IVariation) => void;
  onClick: () => void;
}

export function Variation({
  variation,
  update,
  onClick,
  expanded
}: IVariationProps) {
  const [options, setOptions] = useState(variation.options);
  const [priceVary, setPriceVary] = useState(variation.priceVary);
  const deleteOption = (id: string) => () => {
    setOptions(options.filter(option => option.id !== id));
  };
  const addOption = (event: KeyboardEvent) => {
    const { value } = event.target as any;
    if (event.key === "Enter" && value) {
      const newOption: IOption = {
        id: `temp_${Date.now()}`,
        name: value
      };
      setOptions(options.concat(newOption));
    }
  };

  return (
    <Grid divided={true}>
      <Grid.Row>
        <Grid.Column>
          <Segment onClick={onClick} className="variation-item">
            {variation.name}
          </Segment>
        </Grid.Column>
      </Grid.Row>
      {expanded && (
        <Fragment>
          <Grid.Row>
            <Grid.Column>
              <Checkbox
                label={`Prices can vary for each ${variation.name}`}
                checked={priceVary}
                onClick={() => setPriceVary(!priceVary)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Input
                className="input-fluid"
                icon="plus"
                onKeyDown={addOption}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column id="labels">
              {options.map(({ name, id }) => (
                <Label
                  className="variation-label"
                  basic={true}
                  key={id}
                  size="large"
                >
                  {name}
                  <Icon name="delete" onClick={deleteOption(id)} />
                </Label>
              ))}
            </Grid.Column>
          </Grid.Row>{" "}
          <Button
            color="blue"
            onClick={() => update({ ...variation, options, priceVary })}
          >
            Update Variation
          </Button>
        </Fragment>
      )}
    </Grid>
  );
}
