import React, { useState, useEffect, useRef } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Badge from "@material-ui/core/Badge";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginTop: theme.spacing(5),
    },
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  input: {
    display: "none",
  },
}));

function Profile() {
  const classes = useStyles();
  const [source, setSource] = useState("");
  const [name, setName] = useState(() => {
    const localValue = localStorage.getItem("NAME");

    return localValue !== null ? localValue : "";
  });

  useEffect(() => {
    localStorage.setItem("NAME", name);
  }, [name]);

  const handleCapture = (target: EventTarget & HTMLInputElement) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
        console.log(newUrl);
      }
    }
  };

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={e => handleCapture(e.target)}
      />
      <label htmlFor="icon-button-file">
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={<PhotoCameraIcon fontSize="large" color="primary" />}
        >
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <Avatar src={source} className={classes.avatar} />
          </IconButton>
        </Badge>
      </label>
      <TextField
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}

export default Profile;
