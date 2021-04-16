import React from "react";

const ListGroup = (props) => {
  const {
    items,
    currentGenre,
    textProperty,
    valueProperty,
    onItemSelection,
  } = props;
  return (
    <ul className="list-group">
      <li className="list-group-item list-group-item-action">All Genres</li>
      {items.map((item) => {
        let classes = "list-group-item list-group-item-action";
        if (currentGenre === item.name) classes += " active";
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
