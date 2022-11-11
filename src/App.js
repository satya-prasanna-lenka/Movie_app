import { Container } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Trending from "./components/Trending";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Search from "./components/Search";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" exact element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <Navbar />
    </>
  );
}

export default App;
