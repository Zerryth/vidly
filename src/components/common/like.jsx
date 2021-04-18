import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Like = ({ liked, onClick }) => {
  let iconStyle = "far";

  if (liked === true) {
    iconStyle = "fas";
  }

  return (
    <FontAwesomeIcon
      onClick={onClick}
      icon={[iconStyle, "heart"]}
      className="clickable"
    />
  );
};

export default Like;
