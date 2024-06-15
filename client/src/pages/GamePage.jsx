import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection';

const GamePage = () => {
    const { gameSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [game, setGame] = useState(null);

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
              setGame(data.games[0]);
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
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{game && game.title}</h1>
    <Link 
    to={`/search?category=${game && game.category}`} 
    className='self-center mt-5'
    >
      <Button 
      color='gray' 
      pill 
      size='xs'
      >
        {game && game.category}
      </Button>
    </Link>
    <img 
    src={game && game.image} 
    alt={game && game.title} 
    className='mt-10 p-3 max-h-[600px] w-full object-cover'
    />
    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{game && new Date(game.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{game && (game.content.length /1000).toFixed(0)} mins read</span>
    </div>
    <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: game && game.content}}>
    </div>
    <ReviewSection gameId={game._id} />
  </main>;
}

export default GamePage