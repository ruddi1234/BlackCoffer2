import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/joy/ListItemButton";

export default function DrawerBasic() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(inOpen);
  };

  const handleListItemClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: "620px",
        marginTop: "20px",
      }}
    >
      <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
        Chart Visualizer
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <ListItemButton
                onClick={() => handleListItemClick("/intensity-vs-likelihood")}
              >
                Intensity Vs Likelihood
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => handleListItemClick("/relevance-vs-year")}
              >
                Relevance Vs Year
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => handleListItemClick("/country-vs-topic")}
              >
                Country Vs Topic
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => handleListItemClick("/region-vs-relevance")}
              >
                RegionVsRelevance
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          {/* <List>
            {["All mail", "Trash", "Spam"].map((text) => (
              <ListItem key={text}>
                <ListItemButton>{text}</ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Box>
      </Drawer>
    </Box>
  );
}
