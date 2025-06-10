import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { getCookieData } from "../utils/helperFunction";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import axios from "axios";
import { serverURL } from "../server";

const AddComment = ({ comment }) => {
  const [likeState, setLikeState] = useState(false);
  const cookieData = getCookieData(document.cookie);
  const userId = cookieData?.userId;
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setLikes] = useState([]);

  const handleLike = async (commentId) => {
    console.log(commentId);
    try {
      const response = await axios.post(
        `${serverURL}/comments/addLike`,
        {
          userId: userId,
          commentId: commentId,
          state: true,
        },
        {
          headers: {
            Authorization: `Bearer ${cookieData?.authToken}`,
          },
        }
      );
      if (response?.data?.liked?.state) setLikeState(true);
      else setLikeState(false);
      console.log(response?.data?.liked?.state);
      countLike(commentId);
    } catch (error) {
        toast.error("oops, login first!!!")
    }
  };

  const countLike = async (commentId) => {
    try {
      const response = await axios.post(`${serverURL}/comments/countLike`, {
        commentId: commentId,
      });
      setLikeCount(response?.data?.likeCount);
      console.log(response?.data?.likeCount);
      setLikes(response?.data?.likes);
      console.log(response?.data?.likes);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    countLike(comment._id);
    const status = likes.some((like) => like.userId === userId);
    if (status) setLikeState(true);
  }, []);
  return (
    <>
      <Toaster />
      <div
        key={comment._id}
        className="border md:px-4  px-2 py-3 text-start rounded my-2 flex justify-between items-center "
      >
        {comment.comment}
        <div className="flex items-center gap-2">
          {likeState ? (
            <AiFillHeart
              className="text-2xl text-red-600 cursor-pointer transition"
              onClick={() => {
                handleLike(comment._id);
              }}
            />
          ) : (
            <AiOutlineHeart
              className="text-2xl cursor-pointer transition"
              onClick={() => {
                handleLike(comment._id);
              }}
            />
          )}
          <div>{likeCount}</div>
        </div>
      </div>
    </>
  );
};

export default AddComment;
