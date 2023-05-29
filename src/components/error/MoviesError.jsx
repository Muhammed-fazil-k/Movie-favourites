import React from "react";

export default function MoviesError({error}) {
  return (
    <p
      style={{
        textAlign: "center",
        margin: "1rem",
        fontStyle: "italic",
        color: "red",
      }}
    >
      {error}
    </p>
  );
}
