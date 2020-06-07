import React, {useState, Fragment} from "react";
import {IVariation, IOption} from "types/models";
import {
  Button,
  Checkbox,
  Grid,
  Dropdown, DropdownItemProps, Input
} from "semantic-ui-react";
import "./Variation.css";

interface IVariationProps {
  variation: IVariation;
  options: IOption[];
  handle: (variation: IVariation, options: IOption[]) => void;
  cancel: () => void;
  disableVaryPrice: boolean;
}

export function Variation({
                            variation,
                            handle,
                            cancel,
                            options,
                            disableVaryPrice
                          }: IVariationProps) {
  const [optionsDropdownList, setDropDownList] = useState<DropdownItemProps[]>(options.map(option => ({
    key: option.id,
    value: option.id,
    text: option.name
  })));

  const [selectedOptions, setSelectedOptions] = useState(variation.options.map(({id}) => id));
  const [variationName, setVariationName] = useState(variation.variation);
  const [varyPrice, setVaryPrice] = useState(variation.varyPrice);
  const [search, setSearchQuery] = useState('');

  // const deleteOption = (id: string) => () => {
  //   setSelectedOptions(optionsDropdownList.filter(option => option.key !== id));
  // };

  const onKeyDown = (event: KeyboardEvent) => {
    const {value} = event.target as any;
    setSearchQuery(value);
    if (event.key === "Enter" && value) {
      const tempId = `temp_${Date.now()}`
      const newOption: DropdownItemProps = {
        key: tempId,
        value: tempId,
        text: value
      };
      setSelectedOptions(selectedOptions.concat(tempId));
      setDropDownList(optionsDropdownList.concat(newOption));
      setSearchQuery('');
    }
  };

  const handleUpdateVariation = () => {
    const updatedOptions: IOption[] = optionsDropdownList.map(({value, text}) => ({
      id: value as string,
      name: text as string
    }));
    const updatedVariationOption: IOption[] = selectedOptions.map(id => updatedOptions.find(option => option.id === id) as IOption);
    handle({...variation, options: updatedVariationOption, variation: variationName, varyPrice}, updatedOptions);
  }

  const checkBoxClicked = () => {
    if (!disableVaryPrice) {
      setVaryPrice(!varyPrice);
    }
  }

  console.log(search, variation, selectedOptions, optionsDropdownList);

  return (
    <Grid divided={true}>
      <Grid.Row>
        <Grid.Column>
          <Input
            onChange={(_, {value}) => setVariationName(value)}
            value={variationName}/>
        </Grid.Column>
      </Grid.Row>
      <Fragment>
        <Grid.Row>
          <Grid.Column>
            <Checkbox
              label={`Prices can vary for each ${variation.variation}`}
              checked={varyPrice}
              disabled={disableVaryPrice}
              onClick={checkBoxClicked}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              clearable={true}
              multiple={true}
              selection={true}
              search={true}
              searchQuery={search}
              // onAddItem={console.log}
              onChange={(_, {value}) => setSelectedOptions(value as string[])}
              onSearchChange={(_, {searchQuery}) => setSearchQuery(searchQuery)}
              className="input-fluid"
              options={optionsDropdownList}
              value={selectedOptions}
              onKeyDown={onKeyDown}
              onKeyUp={onKeyDown}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button
              color="blue"
              onClick={handleUpdateVariation}
            >
              Update Variation
            </Button>
            <Button
              color="red"
              onClick={cancel}
            >
              Cancel
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Fragment>
    </Grid>
  );
}
