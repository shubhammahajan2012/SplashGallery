//Styles
import "../src/styles/styles.css";
//NavBar
import Nav from "../src/components/navbar/Nav";
//Image Card
import { ImageCard } from "../src/components/card/ImageCard";
//Hooks
import { useEffect, useState } from "react";

export default function App() {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  //FetchURL function for Fetching Images from Unsplash API
  const fetchUrl = () => {
    fetch(
      "https://api.unsplash.com/photos/?client_id=dhOhmGjRKxx6aCYzyOjAe_thzB-PMAGbVVE0Nxu3WF0&orientation=squarish&per_page=30"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      });
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  const handleSearch = () => {
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=dhOhmGjRKxx6aCYzyOjAe_thzB-PMAGbVVE0Nxu3WF0&orientation=squarish`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResults(data.results);
        setShowResults(true);
      });
  };

  let imageCards = results?.map((item, index) => {
    return (
      <ImageCard
        key={item.id}
        src={item.urls.regular}
        userName={item.user.name}
        likes={item.likes}
        avatar={item.user.profile_image.medium}
      />
    );
  });

  return (
    <div>
      <Nav onSearch={handleSearch} />
      {showResults ? (
        <div className="grid grid-cols-3 gap-4 p-4">{imageCards}</div>
      ) : (
        <div className="grid grid-cols-3 gap-4 p-4">{imageCards}</div>
      )}
    </div>
  );
}
