import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

const GameCard = ({game}) => {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <Link to={`/game/${game.slug}`}>
        <img
          src={game.image}
          alt='game cover'
          className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
        <p className='text-lg font-semibold line-clamp-2'>{game.title}</p>
        <ReactStars
            count={5}
            size={24}
            color2={'#ffd700'}
            value={game.averageRating}
            edit={false}
        />
        </div>
        <span className='italic text-sm'>Game Category: {game.category}</span>
        <Link
          to={`/game/${game.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Show Game Details
        </Link>
      </div>
    </div>
  )
}

export default GameCard