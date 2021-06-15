import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Grid, Header, Button, Segment, Image } from "semantic-ui-react";
import RecipeDetails from "../../../features/recipes/details/RecipeDetails";
import { useStore } from "../../stores/store";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

export default function PhotoUploadWidget() {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  const { recipeStore, modalStore } = useStore();
  const { selectedRecipe, uploadPhoto, deletePhoto, replacePhoto } =
    recipeStore;
  const [loading, setLoading] = useState(false);

  function handleDeletePhoto() {
    if (selectedRecipe) {
      setLoading(true);
      deletePhoto(selectedRecipe.id)
        .then(() => setLoading(false))
        .then(() =>
          modalStore.openModal(<RecipeDetails id={selectedRecipe!.id} />)
        );
    }
  }

  function handleUploadPhoto(file: Blob) {
    if (selectedRecipe?.photo) {
      setLoading(true);
      replacePhoto(file, selectedRecipe!.id)
        .then(() => setLoading(false))
        .then(() =>
          modalStore.openModal(<RecipeDetails id={selectedRecipe!.id} />)
        );
    } else {
      setLoading(true);
      uploadPhoto(file, selectedRecipe!.id)
        .then(() => setLoading(false))
        .then(() =>
          modalStore.openModal(<RecipeDetails id={selectedRecipe!.id} />)
        );
    }
  }

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => handleUploadPhoto(blob!));
    }
  }

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <>
      <Header content="Upload Image" icon="photo" />
      <Grid>
        <Grid.Column width={3}>
          <Header
            sub
            color="teal"
            content="Step 1 - Add Image"
            textAlign="center"
          />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={8}>
          <Header
            sub
            color="teal"
            content="Step 2 - Preview Image"
            textAlign="center"
          />
          {files && files.length > 0 && (
            <PhotoWidgetCropper
              setCropper={setCropper}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={3}>
          <Header
            sub
            color="teal"
            content="Step 3 - Upload Image"
            textAlign="center"
          />
          {files && files.length > 0 && (
            <>
              <div
                className="img-preview"
                style={{ minHeight: 150, overflow: "hidden" }}
              />
              <Button.Group widths={2}>
                <Button
                  loading={loading}
                  onClick={onCrop}
                  positive
                  icon="check"
                />
                <Button
                  disabled={loading}
                  onClick={() => setFiles([])}
                  icon="close"
                />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid>
      {selectedRecipe?.photo && (
        <Segment clearing>
          <Grid>
            <Grid.Column width={7}>
              <Header
                sub
                color="teal"
                content="Current Image"
                textAlign="center"
              />
              <Image
                src={selectedRecipe.photo}
                size="small"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              />
            </Grid.Column>
            <Grid.Column>
              <Button
                name={selectedRecipe.photo}
                loading={loading}
                onClick={() => handleDeletePhoto()}
                content="Delete Photo"
                floated="right"
                color="red"
              />
            </Grid.Column>
          </Grid>
        </Segment>
      )}
    </>
  );
}
