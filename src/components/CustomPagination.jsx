import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomPagination({ setPage, numberOfPages = 10 }) {
  const classes = useStyles();
  const handlePageChamge = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      className={classes.root}
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "10",
        color: "white",
      }}
    >
      <Pagination
        overlap="rectangular"
        onChange={(e) => handlePageChamge(e.target.textContent)}
        count={numberOfPages}
        color="primary"
      />
    </div>
  );
}
