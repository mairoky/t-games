import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { Alert } from "flowbite-react";


const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/game/getgames');
        const data = await res.json();
        if (res.ok) {
          setGames(data.games);
          setLoading(false);
          if (data.games.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGames();
  }, []);

  if (error) {
    return <Alert color='failure'>{error}</Alert>;
  }

  // const handleShowMore = async () => {
  //   const numberOfGames = games.length;
  //   const startIndex = numberOfGames;
  //   const urlParams = new URLSearchParams(location.search);
  //   urlParams.set('startIndex', startIndex);
  //   const searchQuery = urlParams.toString();
  //   const res = await fetch(`/api/game/getgames?${searchQuery}`);
  //   if (!res.ok) {
  //     return;
  //   }
  //   if (res.ok) {
  //     const data = await res.json();
  //     setGames([...games, ...data.games]);
  //     if (data.games.length === 9) {
  //       setShowMore(true);
  //     } else {
  //       setShowMore(false);
  //     }
  //   }
  // };

  
  return (
    <div className='max-w-4xl mx-auto w-full p-3'>
      {!loading && games.length === 0 && (
        <p className='text-xl text-gray-500'>No games found.</p>
      )}
      {loading && <p className='text-xl text-gray-500'>Loading...</p>}
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
          {!loading &&
            games &&
            games.map((game) => <GameCard key={game._id} game={game} />
          )}
        </div>
        {showMore && (
            <button
              // onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
    </div>
  )
}

export default Games