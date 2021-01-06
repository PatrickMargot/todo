import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

import Todos from "./Todos";
import Profile from "./Profile";

type pageType = "todos" | "profile";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
  },
  headerTitle: {
    textTransform: "capitalize",
  },
  jokeListItem: {
    maxWidth: theme.spacing(30),
  },
}));

function App() {
  const [page, setPage] = useState<pageType>("todos");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [joke, setJoke] = useState("");

  const classes = useStyles();

  function setNewJoke() {
    fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist&format=txt"
    )
      .then(response => response.text())
      .then(setJoke)
      .catch(() => setJoke("Could not get joke, please try again later."));
  }

  useEffect(setNewJoke, []);

  function renderPage(page: pageType) {
    switch (page) {
      case "todos":
        return <Todos />;
      case "profile":
        return <Profile />;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.headerTitle} variant="h6">
            {page}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List>
          <ListItem
            onClick={() => {
              setDrawerOpen(false);
              setPage("todos");
            }}
            button
          >
            <ListItemIcon>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Todos" />
          </ListItem>

          <ListItem
            onClick={() => {
              setDrawerOpen(false);
              setPage("profile");
            }}
            button
          >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          <Divider />
          <ListItem onClick={setNewJoke} button>
            <ListItemIcon>
              <EmojiEmotionsIcon />
            </ListItemIcon>
            <ListItemText primary="Random joke" />
          </ListItem>
          <ListItem className={classes.jokeListItem}>
            <ListItemText primary={joke} />
          </ListItem>
        </List>
      </Drawer>

      {renderPage(page)}
    </div>
  );
}

export default App;
