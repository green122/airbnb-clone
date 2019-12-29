import React, { useState, useEffect } from "react";
import { ICategory } from "types/models";
import { clone } from "ramda";
import { Button, Icon, Grid, Input } from "semantic-ui-react";
import { ModalEditor } from "components/ModalEditor/ModalEditor";
import Category from "components/Category/Category";

interface ICategoriesListProps {
  categories: ICategory[];
  update: (categories: ICategory[]) => void;
}

function CategoriesList({ categories, update }: ICategoriesListProps) {
  const [categoriesList, setCategoriesList] = useState(clone(categories));
  const [editingVariationId, setEditingVariationId] = useState<string | null>(
    null
  );
  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    if (categories && categories.length && categories !== categoriesList) {
      setCategoriesList(categories);
    }
  }, [categories]);

  const addCategory = (event: KeyboardEvent) => {
    const { value } = event.target as any;
    if (event.key === "Enter" && value) {
      setCreateMode(false);
      const id = `temp_${Date.now()}`;
      const newVariation: ICategory = {
        id,
        name: value,
        variations: []
      };
      setEditingVariationId(id);
      setCategoriesList(categoriesList.concat(newVariation));
    }
  };

  const updateCategory = (updatedCategory: ICategory) => {
    const updatedEntities: ICategory[] = [];
    categoriesList.forEach(category =>
      updatedEntities.push(
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    setCategoriesList(updatedEntities);
    setEditingVariationId(null);
  };

  console.log(categories, categoriesList);

  return (
    <ModalEditor buttonLabel="Edit Categories" proceedHandler={() => update(categoriesList)}>
      <Grid divided={true}>
        <Grid.Row>
          <Grid.Column>
            {(categoriesList || []).map(category => (
              <Category
                key={category.id}
                expanded={category.id === editingVariationId}
                category={category}
                update={updateCategory}
                onClick={() =>
                  setEditingVariationId(
                    category.id === editingVariationId ? null : category.id
                  )
                }
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
                Create a new category
              </Button>
            )}
            {createMode && (
              <Input
                className="input-fluid"
                icon="plus"
                onKeyDown={addCategory}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ModalEditor>
  );
}

export default CategoriesList;
