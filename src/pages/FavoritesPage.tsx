import { Link } from "react-router-dom";
import MasonryGrid from "../components/MasonryGrid";
import PhotoCard from "../components/PhotoCard";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import styles from "./favoritespage.module.css";

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavoritesStore();

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.homeLink}>
        🏠 View Home
      </Link>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Favorite Photos</h1>
        {favorites.length > 0 && (
          <button onClick={clearFavorites} className={styles.clearButton}>
            Clear All Favorites
          </button>
        )}
      </div>

      {favorites.length > 0 ? (
        <MasonryGrid
          photos={favorites}
          renderItem={(photo) => <PhotoCard photo={photo} />}
        />
      ) : (
        <div className={styles.emptyState}>
          <p>You haven't favorited any photos yet.</p>
          <p>Click the heart icon on photos to add them here.</p>
        </div>
      )}
    </div>
  );
}
