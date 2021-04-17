import React from "react";

const ListGroup = (props) => {
  const {
    items,
    selectedItem,
    textProperty,
    valueProperty,
    onItemSelection,
  } = props;
  return (
    <ul className="list-group">
      {items.map((item) => {
        let classes = "list-group-item list-group-item-action";
        if (selectedItem === item) classes += " active";

        return (
          <li
            key={item[valueProperty]}
            className={classes}
            onClick={() => onItemSelection(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
