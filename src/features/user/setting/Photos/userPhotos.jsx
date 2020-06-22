import React, { Fragment } from "react";
import { Header, Card, Image, Button } from "semantic-ui-react";

const userPhotos = ({ photos, profile }) => {
  console.log("###profile", profile);
  return (
    <Fragment>
      <Header sub color="teal" content="All Photos" />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={profile.photoURL} />
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
    </Fragment>
  );
};

export default userPhotos;
