import React, {useState, useEffect} from "react";
import {ICategory, ICategoryDetails} from "types/models";
import {clone} from "ramda";
import {Button, Icon, Grid, Input, Segment} from "semantic-ui-react";
import {ModalEditor} from "components/ModalEditor/ModalEditor";
import Category from "components/Category/Category";
import {useDispatch} from "react-redux";
import {createCategory} from "../../+state/reducers/categories.reducer";

interface ICategoriesListProps {
  categories: ICategory[];
  id?: string;
}

function CategoriesList({categories}: ICategoriesListProps) {
  const [categoriesList, setCategoriesList] = useState(clone(categories));
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [createMode, setCreateMode] = useState(false);

  useEffect(() => {
    if (categories && categories.length && categories !== categoriesList) {
      setCategoriesList(categories);
    }
  }, [categories]);

  const dispatch = useDispatch();

  const addCategory = (event: KeyboardEvent) => {
    const {value} = event.target as any;
    if (event.key === "Enter" && value) {
      setCreateMode(false);
      const newCategory: Partial<ICategoryDetails> = {
        name: value,
      };
      dispatch(createCategory(newCategory))
    }
  };

  const expand = (categoryId: string) => () => {
    if (!editingCategoryId) {
      setEditingCategoryId(categoryId);
    }
  }

  console.log(categories, categoriesList);

  return (
    <React.Fragment>
      <ModalEditor proceedHandler={() => ({})}>
        <Grid divided={true}>
          <Grid.Row>
            <Grid.Column>
              {editingCategoryId ?
                <Category
                  categoryId={editingCategoryId}
                  proceed={() => setEditingCategoryId(null)}
                /> :
                (categoriesList || []).map(category => (
                  <Segment onClick={expand(category.id)} className="variation-item">
                    {category.name}
                  </Segment>
                ))}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              {!createMode && !editingCategoryId && (
                <Button
                  icon={true}
                  color="teal"
                  labelPosition="left"
                  onClick={() => setCreateMode(true)}
                >
                  <Icon name="plus"/>
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
    </React.Fragment>
  );
}

export default CategoriesList;
