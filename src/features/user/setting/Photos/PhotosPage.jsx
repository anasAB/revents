import React, { useState, useEffect, Fragment, Component } from "react";
import {
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
} from "semantic-ui-react";
import DropZoneInput from "./DropZoneInput";
import CropperPhoto from "./CropperPhoto";
import { connect } from "react-redux";
import { uploadProfileImage } from "../../userAcions";
import { toastr } from "react-redux-toastr";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import UserPhotos from "./userPhotos";
import { Image } from "@react-pdf/renderer";

const PhotosPage = ({ uploadProfileImage, photos, profile }) => {
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

  const handelUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].name);
      toastr.success("Success", "Photo has been Updated");
      handelCancelCrop();
    } catch (error) {
      toastr.err("Error", "Something went Wrong");
    }
  };

  const handelCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

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
            <Fragment>
              <div
                className="img-preview"
                style={{
                  minHeight: "200px",
                  minWidth: "200px",
                  overflow: "hidden",
                }}
              />
              <Button.Group>
                <Button
                  onClick={handelUploadImage}
                  style={{ width: "100px" }}
                  positive
                  icon="check"
                ></Button>
                <Button
                  onClick={handelCancelCrop}
                  style={{ width: "100px" }}
                  icon="cancel"
                ></Button>
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>

      <Divider />

      <Header sub color="teal" content="All Photos" />

      <Card.Group itemsPerRow={5}>
        {files.length > 0 && (
          <Card>
            <Image src={files[0].preview} />
            <Button positive>Main Photo</Button>
          </Card>
        )}

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

      {files.length > 0 && (
        <UserPhotos photos={files[0].preview} profile={profile} />
      )}
    </Segment>
  );
};

//? what we will pass to the firestoreConnect

const query = ({ auth }) => {
  if (auth) {
    console.log("authttt", auth.uid);
    // const photo = tables.find((table) => table.tableGuests === tableObj);
    return [
      {
        collection: "users",
        doc: auth.uid,
        subcollections: [{ collection: "photos" }],
        storeAs: "photos",
      },
    ];
  }
};

const mapDispatchToProps = {
  uploadProfileImage,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading: state.async.loading,
  };
};

//? we have to pass a query for what i want to get from the fireStore
export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  // firestoreConnect((auth) => query(auth))
)(PhotosPage);
