import React from "react";
import styles from "./filters.module.css";

interface FiltersProps {
  onColorChange: (color: Colors) => void;
  onOrientationChange: (orientation: Orientation) => void;
}

const Filters: React.FC<FiltersProps> = ({
  onColorChange,
  onOrientationChange,
}) => {
  const colors: Colors[] = ["red", "green", "yellow", "blue", "all"];
  const orientation: Orientation[] = ["portrait", "landscape", "square", "all"];
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <label htmlFor="color-filter">Colors:</label>
        <select
          onChange={(e) => onColorChange(e.target.value as Colors)}
          defaultValue="all"
          className={styles.filterSelect}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color === "all"
                ? "All Colors"
                : color.charAt(0).toUpperCase() + color.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="orientation-filter">Orientation:</label>
        <select
          onChange={(e) => onOrientationChange(e.target.value as Orientation)}
          defaultValue="all"
          className={styles.filterSelect}
        >
          {orientation.map((orientation) => (
            <option key={orientation} value={orientation}>
              {orientation === "all"
                ? "All Orientation"
                : orientation.charAt(0).toUpperCase() + orientation.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
