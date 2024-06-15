import { Table, Modal, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { set } from 'mongoose';

const DashGames = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [allGames, setAllGames] = useState([]);
    const [showMore, setShowMore] = useState(true);
//   console.log(allGames);
const [showModal, setShowModal] = useState(false);
const [gameIdToDelete, setGameIdToDelete] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch(`/api/game/getgames?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
            // console.log(data.games);
            setAllGames(data.games);
            if (data.games.length < 9) {
                setShowMore(false);
              }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchGames();
    }
  }, [currentUser._id]);


  const handleShowMore = async () => {
    const startIndex = allGames.length;
    try {
      const res = await fetch(
        `/api/game/getgames?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setAllGames((prev) => [...prev, ...data.games]);
        if (data.games.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteGame = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/game/deletegame/${gameIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setAllGames((prev) =>
          prev.filter((game) => game._id !== gameIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && allGames.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Game image</Table.HeadCell>
              <Table.HeadCell>Game title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {allGames.map((game) => (
              <Table.Body key={game._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(game.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/game/${game.slug}`}>
                      <img
                        src={game.image}
                        alt={game.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/game/${game.slug}`}
                    >
                      {game.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{game.category}</Table.Cell>
                  <Table.Cell>
                    <span 
                    onClick={() => {
                        setShowModal(true);
                        setGameIdToDelete(game._id);
                    }}
                    className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-game/${game._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no games yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this game?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteGame}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashGames