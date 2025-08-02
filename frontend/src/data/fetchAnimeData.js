//frontend\src\data\fetchAnimeData.js

const fetchAnimeData = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/anime");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch anime data:", error);
    return [];
  }
};

export default fetchAnimeData;
