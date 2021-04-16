import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Like = (props) => {
  const { liked, onClick } = props;
  let iconStyle = "far";

  if (liked === true) {
    iconStyle = "fas";
  }

  return (
    <FontAwesomeIcon
      onClick={onClick}
      icon={[iconStyle, "heart"]}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
