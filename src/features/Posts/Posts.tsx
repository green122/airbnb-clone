import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Transition } from 'react-transition-group';
import { Dispatch } from "redux";
import styled from "styled-components";

import * as postsActions from "../../+state/actions/posts.actions";
import { IStoreState } from "../../+state/reducers";
import { IPost, IPostsStoreState } from "../../types/models";
import { IPostsDispatchProps, IPostsProps } from "./component.types";
import { Post } from "./Post";

const heightCalc = (state: string): number => {
  console.log(state);
  return state === 'entered' ? 400 : 0
}
const Container: any = styled.div`
  width: 70vw;
  height: ${(props: any) => heightCalc(props.state)}px;
  transition: 1s;
  overflow: hidden;
  margin: 0 auto;
`;

function Posts(props: IPostsProps) {
  useEffect(() => props.onLoad(), []);

  const { items, error } = props;

  if (error) {
    return <div>Error...</div>;
  }
    
    return (
      <DndProvider backend={HTML5Backend}>
        <Transition in={Boolean(items)} timeout={500}>
          {state => <Container state={state}>{renderRow(items)}</Container> }
        </Transition>
      </DndProvider>
    );
  
}

function renderRow(items: IPost[] | null) {
  return (items || []).map((item: IPost) => (
    <Post key={item.id}>
      <label>Post Id: {item.id}</label>
      <h2>{item.title}</h2>
      <p>{item.body}</p>
    </Post>
  ));
}

const mapStateToProps = (state: IStoreState): IPostsStoreState => {
  return {
    items: state.posts.items,
    error: state.posts.error,
    loading: state.posts.loading
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<postsActions.Actions>
): IPostsDispatchProps => {
  return {
    onLoad: () => {
      dispatch(postsActions.createPostsInit());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Posts)
);
