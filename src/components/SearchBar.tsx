import React, { useState } from "react";
import styles from "./searchbar.module.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(inputValue);
  }
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <button className={styles.button} onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
