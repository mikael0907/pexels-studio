import { useEffect, useMemo, useState } from "react";
import { usePexelsApi } from "../hooks/usePexelsApi";
import styles from "./homepage.module.css";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MasonryGrid from "../components/MasonryGrid";
import PhotoCard from "../components/PhotoCard";
import { debounce } from "../utils/debounce";

import { Link } from "react-router-dom";

const HomePage = () => {
  const [colorFilter, setColorFilter] = useState<Colors | "all">("all");
  const [orientationFilter, setOrientationFilter] = useState<
    Orientation | "all"
  >("all");
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { fetchPhotos, isLoading, error } = usePexelsApi();

  const debounceSearch = useMemo(
    () =>
      debounce(async (searchQuery: string, pageNum: number) => {
        const results = await fetchPhotos(searchQuery, pageNum, {
          color: colorFilter !== "all" ? colorFilter : undefined,
          orientation:
            orientationFilter !== "all" ? orientationFilter : undefined,
        });
        if (results) {
          setPhotos((prev) =>
            pageNum === 1 ? results : [...prev, ...results]
          );
          setHasMore(results.length > 0);
        }
      }, 400),
    [fetchPhotos, colorFilter, orientationFilter]
  );

  useEffect(() => {
    setPage(1);
    if (query.trim()) {
      debounceSearch(query, 1);
    } else {
      setPhotos([]);
      setHasMore(false);
    }
  }, [query, debounceSearch]);

  const loadMorePhotos = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
      debounceSearch(query, page + 1);
    }
  };
  return (
    <div className={styles.homePage}>
      <Link to="/favorites" className={styles.favoritesLink}>
        ❤️ View Favorites
      </Link>

      <SearchBar
        placeholder="Search Photos..."
        onSearch={(val) => {
          setQuery(val);
          setPage(1);
        }}
      />
      <Filters
        onColorChange={(color) => {
          setColorFilter(color);
          setPage(1);
        }}
        onOrientationChange={(orientation) => {
          setOrientationFilter(orientation);
          setPage(1);
        }}
      />

      {isLoading && page === 1 && (
        <div className={styles.loadinSpinner}>Loading Photos...</div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          ⚠ {error}{" "}
          <button
            className={styles.errorButton}
            onClick={() => debounceSearch(query, page)}
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && photos.length === 0 && (
        <div className={styles.emptyState}>
          {query ? (
            <>
              "No results Found For <strong>{query}</strong>
            </>
          ) : (
            "Search For Photos Or Adjust Filters"
          )}
        </div>
      )}

      <MasonryGrid
        photos={photos}
        renderItem={(photo) => <PhotoCard photo={photo} />}
      />

      {hasMore && photos.length > 0 && (
        <button
          onClick={loadMorePhotos}
          className={styles.loadMore}
          disabled={isLoading}
        >
          {isLoading ? "Loading Photos..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default HomePage;
