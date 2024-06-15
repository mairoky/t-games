import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection';
import ReactStars from 'react-stars';

const GamePage = () => {
    const { gameSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [game, setGame] = useState(null);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchGame = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/api/game/getgames?slug=${gameSlug}`);
            const data = await res.json();
            if (!res.ok) {
              setError(true);
              setLoading(false);
              return;
            }
            if (res.ok) {
              // console.log(data);
              setGame(data.games[0]);
              setAverageRating(data.games[0].averageRating);
              console.log(data.games[0].averageRating);
              setLoading(false);
              setError(false);
            }
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchGame();
      }, [gameSlug]);
    
      if (loading)
        return (
            <div className='flex justify-center items-center min-h-screen'>
              <Spinner size='xl' />
            </div>
          );
    return  <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
      {game && game.title}
    </h1>
    {game && (
      <Link to={`/search?category=${game.category}`} className='self-center mt-5'>
        <Button color='gray' pill size='xs'>
          {game.category}
        </Button>
      </Link>
    )}
    <div className='relative mt-10 p-3 w-full max-w-2xl mx-auto'>
      <img
        src={game && game.image}
        alt={game && game.title}
        className='object-cover w-full h-64 rounded-md shadow-lg'
      />
      <div className='absolute top-3 left-3 bg-white bg-opacity-75 rounded-full px-3 py-1 text-xs text-gray-800'>
        {game && new Date(game.createdAt).toLocaleDateString()}
      </div>
      <div className='absolute bottom-3 right-3 bg-white bg-opacity-75 rounded-full px-3 py-1 text-xs text-gray-800'>
        <ReactStars
          count={5}
          size={24}
          color2={'#ffd700'}
          value={averageRating}
          edit={false}
        />
      </div>
    </div>
    <div className='p-3 max-w-2xl mx-auto w-full rounded-md shadow-lg mt-6'>
      <div
        className='post-content leading-relaxed'
        dangerouslySetInnerHTML={{ __html: game && game.content }}
      ></div>
    </div>
    <div className='mt-10'>
      <ReviewSection gameId={game._id} />
    </div>
  </main>


}

export default GamePage