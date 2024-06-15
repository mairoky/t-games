import moment from 'moment';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
import toast from 'react-hot-toast';

const Review = ({review, onLike, onEdit, onDelete}) => {
    const [user, setUser] = useState({});
    // console.log(user);
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(review.comment);
    const [editedStarRating, setEditedStarRating] = useState(review.starRating); 
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const getUser = async () => {
          try {
            const res = await fetch(`/api/user/${review.userId}`);
            const data = await res.json();
            if (res.ok) {
              setUser(data);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        getUser();
      }, [review]);

      
  const handleEdit = () => {
    setIsEditing(true);
    setEditedComment(review.comment);
    setEditedStarRating(review.starRating);
  };

  const handleSave = async () => {
    try {
      const res  = await fetch(`/api/review/editReview/${review._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: editedComment,
          starRating: editedStarRating,
        })
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(review, editedComment, editedStarRating);
        toast.success('Review Edited Successfully!');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className='text-gray-500 text-xs'>{moment(review.createdAt).fromNow()}</span>
        </div>
        {
            isEditing ? (
                <>
                    <div className='flex justify-between items-center'>
                        <label htmlFor='starRating'>Star Rating:</label>
                        <ReactStars
                        count={5}
                        size={24}
                        color2={'#ffd700'}
                        value={editedStarRating}
                        onChange={(newRating) => setEditedStarRating(newRating)}
                        />
                    </div>
                    <Textarea
                    className='mb-2'
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 text-xs">
                        <Button
                        type='button'
                        size='sm'
                        gradientDuoTone='purpleToBlue'
                        onClick={handleSave}
                        >
                        Save
                        </Button>
                        <Button
                        type='button'
                        size='sm'
                        gradientDuoTone='purpleToBlue'
                        outline
                        onClick={() => setIsEditing(false)}
                        >
                        Cancel
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex justify-between items-center'>
                        <label htmlFor='starRating'>Star Rating:</label>
                        <ReactStars
                        count={5}
                        size={24}
                        color2={'#ffd700'}
                        value={review.starRating}
                        />
                    </div>
                    <p className='text-gray-500 pb-2'>{review.comment}</p>
                    <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                    <button
                        type='button'
                        onClick={() => onLike(review._id)}
                        className={`text-gray-400 hover:text-blue-500 ${
                        currentUser &&
                        review.likes.includes(currentUser._id) &&
                        '!text-blue-500'
                        }`}
                    >
                        <FaThumbsUp className='text-sm' />
                    </button>
                    <p className='text-gray-400'>
                        {review.numberOfLikes > 0 &&
                        review.numberOfLikes +
                            ' ' +
                            (review.numberOfLikes === 1 ? 'like' : 'likes')}
                    </p>
                    {currentUser &&
                            (currentUser._id === review.userId || currentUser.isAdmin) && (
                            <>
                            <button
                                type='button'
                                onClick={handleEdit}
                                className='text-gray-400 hover:text-blue-500'
                            >
                                Edit
                            </button>
                            <button
                            type='button'
                            onClick={() => onDelete(review._id)}
                            className='text-gray-400 hover:text-red-500'
                            >
                                Delete
                            </button>
                            </>
                            )}
                    </div>
                </>
            )
        }

      </div>
    </div>
  )
}

export default Review