import React from "react";
import styles from "./masonrygrid.module.css";

interface MasonryGridProps {
  photos: Array<{ id: number; src: { original: string }; alt?: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderItem: (photo: any) => React.ReactNode;
}

const MasonryGrid = ({ photos, renderItem }: MasonryGridProps) => {
  return (
    <div className={styles.masonryGrid}>
      <div>
        {photos.map((photo) => (
          <div key={photo.id} className={styles.gridItem}>
            {renderItem(photo)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGrid;
