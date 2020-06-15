import React, { useState, useEffect } from "react";
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
} from "semantic-ui-react";
import DropZoneInput from "./DropZoneInput";
import CropperPhoto from "./CropperPhoto";

const PhotosPage = () => {
  //!Using useState Hooks
  //! we will have files as Array with[preview:,type:,name:] and we will use file.preview that to present the Img
  const [files, setFiles] = useState([]);

  //! Store the Img when its modified
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  return (
    <Segment>
      <Header dividing size="large" content="Your Photos" />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <DropZoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 && (
            <CropperPhoto imagePreview={files[0].preview} setImage={setImage} />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {files.length > 0 && (
            <div
              className="img-preview"
              style={{
                minHeight: "200px",
                minWidth: "200px",
                overflow: "hidden",
              }}
            />
          )}
        </Grid.Column>
      </Grid>

      <Divider />
      <Header sub color="teal" content="All Photos" />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
          <Button positive>Main Photo</Button>
        </Card>

        <Card>
          <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
          <div className="ui two buttons">
            <Button basic color="green">
              Main
            </Button>
            <Button basic icon="trash" color="red" />
          </div>
        </Card>
      </Card.Group>
    </Segment>
  );
};

export default PhotosPage;
