import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useState } from "react";
import { Grid, Rail, Loader } from "semantic-ui-react";
import Background from "../../../app/layout/Background";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { PagingParams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
// import RecipeFilter from "./RecipeFilter";
import RecipeList from "./RecipeList";
import InfiniteScroll from "react-infinite-scroller";

export default observer(function RecipeDashboard() {
  const { recipeStore, ingredientStore } = useStore();
  const { loadRecipes, recipeRegistry, setPagingParams, pagination } =
    recipeStore;
  const { loadIngredients } = ingredientStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadRecipes().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (recipeRegistry.size <= 1) loadRecipes();
    loadIngredients();
  }, [loadRecipes, recipeRegistry, loadIngredients]);

  if (recipeStore.loadingInitial && !loadingNext) return <LoadingComponent />;

  return (
    <>
      <Grid>
        <Grid.Column width="8">
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            <RecipeList />
          </InfiniteScroll>
          <Rail position="right">
            {/* <RecipeFilter /> */}
            <Background />
          </Rail>
        </Grid.Column>

        <Grid.Column width={10}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid>
    </>
  );
});
