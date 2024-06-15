// import { Alert, Button, TextInput, Textarea } from 'flowbite-react';
// import { set } from 'mongoose';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const ReviewSection = ({gameId}) => {
//     const { currentUser } = useSelector((state) => state.user);
//   const [review, setReview] = useState('');
//   const [reviewError, setReviewError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (review.length > 200) {
//       return;
//     }
//     try {
//       const res = await fetch('/api/review/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           content: review,
//           gameId,
//           userId: currentUser._id,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setReview('');
//         setReviewError(null);
//       }
//     } catch (error) {
//       setReviewError(error.message);
//     }
//   };

//   return (
//     <div className='max-w-2xl mx-auto w-full p-3'>
//       {currentUser ? (
//         <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
//           <p>Signed in as:</p>
//           <img
//             className='h-5 w-5 object-cover rounded-full'
//             src={currentUser.profilePicture}
//             alt=''
//           />
//           <Link
//             to={'/dashboard?tab=profile'}
//             className='text-xs text-cyan-600 hover:underline'
//           >
//             @{currentUser.username}
//           </Link>
//         </div>
//       ) : (
//         <div className='text-sm text-teal-500 my-5 flex gap-1'>
//           You must be signed in to review.
//           <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
//             Sign In
//           </Link>
//         </div>
//       )}
//       {currentUser && (
//         <form
//           onSubmit={handleSubmit}
//           className='border border-teal-500 rounded-md p-3'
//         >
//           <Textarea
//             placeholder='Add a comment...'
//             rows='3'
//             maxLength='200'
//             onChange={(e) => setReview(e.target.value)}
//             value={review}
//           />
//           <div className='flex justify-between items-center mt-5'>
//             <p className='text-gray-500 text-xs'>
//               {200 - review.length} characters remaining
//             </p>
//             <Button outline gradientDuoTone='purpleToBlue' type='submit'>
//               Submit
//             </Button>
//           </div>
//           {reviewError && (
//             <Alert color='failure' className='mt-5'>
//               {reviewError}
//             </Alert>
//           )}
//         </form>
//       )}
//     </div>
//   )
// }

// export default ReviewSection

import { Alert, Button, Textarea, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import Review from './Review';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ReviewSection = ({ gameId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [reviewError, setReviewError] = useState(null);
  const [reviews, setReviews] = useState([]);
//   console.log(reviews);
const [showModal, setShowModal] = useState(false);
const [reviewToDelete, setReviewToDelete] = useState(null);
const navigate = useNavigate();

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const location = await getLocation();
      console.log(location);
      const res = await fetch('/api/review/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment,
          gameId,
          userId: currentUser._id,
          userEmail: currentUser.email,
          starRating,
          location: {
            coordinates: [location.coords.longitude, location.coords.latitude],
          },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setStarRating(0);
        setReviewError(null);
        setReviews([data, ...reviews]);
        toast.success('Review submitted successfully!');
      } else {
        setReviewError(data.message);
      }
    } catch (error) {
      setReviewError(error.message);
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await fetch(`/api/review/getGameReviews/${gameId}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getReviews();
  }, [gameId]);

  const handleLike = async (reviewId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/review/likeReview/${reviewId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(
          reviews.map((review) =>
            review._id === reviewId
              ? {
                  ...review,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : review
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  
  const handleEdit = async (review, editedComment, editedStarRating) => {
    setReviews(
      reviews.map((r) =>
        r._id === review._id ? { ...r, comment: editedComment, starRating: editedStarRating } : r
      )
    );
  };

  const handleDelete = async (reviewId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/review/deleteReview/${reviewId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(reviews.filter((review) => review._id !== reviewId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            to={'/dashboard?tab=profile'}
            className='text-xs text-cyan-600 hover:underline'
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to review.
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
            <div className='flex justify-between items-center mb-2'>
                <label htmlFor='starRating'>Star Rating:</label>
                <ReactStars
                count={5}
                onChange={(newRating) => setStarRating(newRating)}
                size={24}
                color2={'#ffd700'}
                value={starRating}
                />
            </div>
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='flex justify-between items-center mt-4'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                Submit
            </Button>
          </div>
          {reviewError && (
            <Alert color='failure' className='mt-5'>
              {reviewError}
            </Alert>
          )}
        </form>
      )}
      {reviews.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Reviews</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{reviews.length}</p>
            </div>
          </div>
          {reviews.map((review) => (
            <Review 
            key={review._id} 
            review={review} 
            onLike={handleLike} 
            onEdit={handleEdit}
            onDelete={(reviewId) => {
              setShowModal(true);
              setReviewToDelete(reviewId);
            }}
            />
          ))}
        </>
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
              Are you sure you want to delete this review?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(reviewToDelete)}
              >
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
  );
};

export default ReviewSection;
