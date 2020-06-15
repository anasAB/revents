import { toastr } from "react-redux-toastr";
import { SubmissionError } from "redux-form";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionFail,
} from "../async/asyncActions";
import cuid from "cuid";

export const updateProfile = (user) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updateUser } = user;
  try {
    await firebase.updateProfile(updateUser);
    toastr.success("Profile has been Updated ");
  } catch (error) {
    throw new SubmissionError({ _error: error.message });
  }
};
//uploadProfilePhoto
//! Upload the new Photo
// export const uploadProfilePhoto = (file, fileName) => async (
//   dispatch,
//   getState,
//   { getFirebase, getFirStore }
// ) => async (dispatch, getState, { getFirebase, getFirestore }) => {
//   const firebase = getFirebase();
//   const firestore = getFirestore();
//   const user = firebase.auth().currentUser;
//   const path = `${user.id}/user_images`;
//   const options = {
//     name: fileName,
//   };

//   try {
//     dispatch(asyncActionStart());
//     //? ----->upload the img to firebase
//     let uploadFile = await firebase.uploadFile(path, file, null, options);
//     console.log("##uploadFile", uploadFile);
//     //? ----->get url of the img
//     let downloadURL = await uploadFile.uploadTaskSnapshot.ref.getDownloadURL(); //! it should give us the img url in firebase storage

//     //? ----->get userDoc
//     let userDoc = await firebase.get(`user/${user.id}`);

//     //? ----->check if the user has photo, if not update ProfilePhoto
//     if (!userDoc.data().photoURL) {
//       await firebase.updateProfile({
//         photoURL: downloadURL,
//       });
//       //? update the auth section in the firebase
//       await user.updateProfile({
//         photoURL: downloadURL,
//       });
//     }
//     //? ----->add the photo to fireStore
//     await firestore.add(
//       {
//         collection: "user",
//         doc: user.id,
//         subcollections: [{ collecion: "photos" }], //? it will be created in case it wasn't existed
//       },
//       {
//         //? What we will add in our subcollections
//         name: fileName,
//         url: downloadURL,
//       }
//     );
//     dispatch(asyncActionFinish());
//   } catch (error) {
//     console.log(error);

//     dispatch(asyncActionFail());
//     throw new SubmissionError({ _error: error.message });
//   }
// };

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName,
  };
  try {
    dispatch(asyncActionStart());
    // upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    console.log("uploadedFile", uploadedFile);

    // get url of the image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    // get userdoc
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has photo, if not update profile with new image
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    // add the new photo to photos collection
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }],
      },
      {
        name: imageName,
        url: downloadURL,
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    // throw new Error("Problem uploading photo");
  }
};
