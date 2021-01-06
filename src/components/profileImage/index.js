import { uploadProfileImage, getUsername } from "../../services/authServices";
import { Formik, useFormik } from "formik";
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import styles from "./profile.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//TODO give upload more time to db etc, sometimes needing manual refresh to show new profile image.

const ProfileImage = ({ actions, userLoggedIn, currentUserSettings }) => {
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      file: "",
    },

    onSubmit: (values) => {
      console.log("values", values.file);
      uploadProfileImage(values.file, userLoggedIn)
        .then((image) => {
          console.log("IMAGE??", image.user.profile);
          const {
            user: { profile },
          } = image;
          actions.updateProfile({ profile });
          history.push("/user/" + getUsername() + "/account-settings");
          toast.success("Profile Picture updated!");
        })
        .catch((error) => {
          toast.error("Oh no!");
          if (error.response && error.response.status === 404)
            formik.setStatus("Error getting user information ");
          else
            formik.setStatus(
              "There may be a problem with the server. Please try again after a few moments."
            );
        });
    },
  });

  return (
    <Fragment>
      <div class={styles.imageUpload}>
        <form>
          <input
            id="file"
            name="file"
            type="file"
            onChange={(event) => {
              console.log("event", event.currentTarget.files[0]);
              formik.setFieldValue("file", event.currentTarget.files[0]);
            }}
          />
          <Button
            size="small"
            variant="outlined"
            component="span"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Upload
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currentUserSettings: state.currentUserSettings.profile,
  userLoggedIn: state.userLoggedIn.username,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateProfile: ({ profile }) => {
      console.log("profile", profile);
      return dispatch({ type: "updateProfile", payload: { profile } });
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);
