import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getUserByUsername } from "@/api/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { dislikeContent, likeContent } from "@/api/like";

const PostDetail = ({ postDetail }) => {
  const [userLogin, setUserLogin] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [comments, setComments] = useState("");
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    setComments(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const commentData = {
        comment: comments,
      };
      const serverResponse = await axios.post(`http://localhost:14045/api/comment/content/${postDetail.id}`, commentData, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      if (serverResponse) {
        setComments(serverResponse.data);
        setComments("");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`http://localhost:14045/api/content/${postDetail.id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:14045/api/comment/${commentId}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      if (liked) {
        await dislikeContent(postId);
        setLiked(false);
        localStorage.removeItem(`liked_${postDetail.id}`);
      } else {
        await likeContent(postId);
        setLiked(true);
        localStorage.setItem(`liked_${postDetail.id}`, true);
      }
      setLiked(!liked);
      window.location.reload();
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userLogin = await getUserByUsername();
        if (userLogin) {
          setUserLogin(userLogin);
        }
        const likedStatus = localStorage.getItem(`liked_${postDetail.id}`);
        setLiked(likedStatus === "true");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [postDetail.id]);

  return (
    <div className="container mx-auto mt-8 bg-dark-2">
      {postDetail && (
        <div className="max-w-screen-xl mx-auto rounded-lg overflow-hidden shadow-md mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img className="w-full h-auto object-cover md:hidden" src={postDetail.photo} alt="Post Image" />
              <div className="hidden md:block">
                <img className="w-full h-full object-cover" src={postDetail.photo} alt="Post Image" />
              </div>
            </div>
            <div className="md:w-1/2 p-6 flex flex-col relative">
              <div>
                <div className="flex items-center mb-4">
                  <img className="w-10 h-10 rounded-full mr-4" src={postDetail.User && postDetail.User.profilepicture} alt="Author" />
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <Link href={`/user/${postDetail.User && postDetail.User.username}`}>
                        <p className="text-light-1 font-semibold">{postDetail.User && postDetail.User.username}</p>
                      </Link>
                      <p className="text-gray-500 text-sm">{postDetail.User && postDetail.User.bio}</p>
                    </div>
                    {postDetail.User && userLogin && postDetail.User.id === userLogin.id && (
                      <div className="relative">
                        <div className="cursor-pointer" onClick={() => setShowOptions(!showOptions)}>
                          <img className="w-4 h-4" src="/assets/more.svg" alt="Options" />
                        </div>
                        {showOptions && (
                          <div className="absolute bg-white rounded-md shadow-md py-2 top-8 right-0 z-10">
                            <Link href={`/post/edit/${postDetail.id}`}>
                              <p className="cursor-pointer px-4 py-2 hover:bg-gray-100">Edit</p>
                            </Link>
                            <p className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={handleDeletePost}>
                              Delete
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-1">
                  {postDetail.Comments &&
                    postDetail.Comments.map((comment, index) => (
                      <div key={index} className="mb-2 border-b border-gray-300 flex items-center">
                        <img className="w-8 h-8 rounded-full mr-2" src={comment.User && comment.User.profilepicture} alt="User Profile" />
                        <p className="text-light-1 font-semibold">{comment.User && comment.User.username}</p>
                        <p className="text-gray-500 text-sm ml-2 flex-1 mb-1">{comment.comment}</p>
                        {comment.User && userLogin && comment.User.id === userLogin.id && (
                          <div className="ml-auto cursor-pointer" onClick={() => handleDeleteComment(comment.id)}>
                            <img className="w-4 h-4" src="/assets/delete.svg" alt="Delete Comment" />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex items-center mb-4 mt-auto">
                <img className="w-6 h-6 cursor-pointer mr-3" src={liked ? "/assets/liked.svg" : "/assets/like.svg"} alt="Like Icon" onClick={() => handleLike(postDetail.id)} />
                <div className="flex items-center gap-2">
                  <p className="text-light-1 font-semibold mb-1"> {postDetail.Likes && postDetail.Likes.length} likes</p>
                </div>
              </div>
              <form action="" className="relative mt-2" onSubmit={handleSubmit}>
                <input type="text" name="comment" placeholder="Add a comment..." className="text-light-1 border border-gray-300 rounded-md px-4 py-3 w-full bg-dark-2 text-lg" value={comments} onChange={handleChange} />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md absolute top-0 right-0">Post</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
