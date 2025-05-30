import { useFavoritesStore } from "../stores/useFavoritesStore";
import styles from "./photocard.module.css";

interface PhotoCardProps {
  photo: Photo;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  return (
    <div className={styles.photoCard}>
      <img
        src={photo.src.original}
        alt={photo.alt || "Pexels Image"}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.overlay}>
        {photo.photographer && (
          <a
            href={photo.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.photographerLink}
          >
            <p className={styles.photographer}>{photo.photographer}</p>
          </a>
        )}
      </div>
      <button
        className={`${styles.favoriteButton} ${
          isFavorite(photo.id) ? styles.favoriteActive : ""
        }`}
        onClick={() => toggleFavorite(photo)}
        aria-label={
          isFavorite(photo.id) ? "Remove from favorites" : "Add to favorites"
        }
      >
        {isFavorite(photo.id) ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
