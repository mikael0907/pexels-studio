import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
