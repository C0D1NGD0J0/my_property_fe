import React from "react";

export type ListItem = {
  position: "left" | "right"; // Optional if using single-list mode
  content: React.ReactNode;
};

export type ListItems = ListItem[];
export type ListMode = "single" | "dual";

type DynamicListProps = {
  items: ListItems;
  listMode?: ListMode; // Optional prop to determine list mode
};

const DynamicList: React.FC<DynamicListProps> = ({
  items,
  listMode = "dual",
}) => {
  // Render items based on the mode
  const renderItems = (filter: "left" | "right" | "all") => {
    return items
      .filter((item) => (filter === "all" ? true : item.position === filter))
      .map((item, index) => (
        <li key={`${filter}-${index}`} className="list-item">
          {item.content} {/* Directly render the content of each item */}
        </li>
      ));
  };

  return (
    <div className="list-container">
      {listMode === "dual" ? (
        <>
          <ul className="left-list">{renderItems("left")}</ul>
          <ul className="right-list">{renderItems("right")}</ul>
        </>
      ) : (
        <ul className="single-list">{renderItems("all")}</ul>
      )}
    </div>
  );
};

export default DynamicList;
