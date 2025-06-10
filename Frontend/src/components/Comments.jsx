import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverURL } from "../server";
import { getCookieData } from "../utils/helperFunction";
import toast from "react-hot-toast";
import AddComment from "./AddComment";

export default function Comments({ blogId }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const cookieData = getCookieData(document.cookie);
  const userId = cookieData?.userId;

  const commentData = {
    userId: userId,
    blogId: blogId,
    comment: comment,
  };

  const getComment = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/comments/getBlogComment`,
        {
          blogId: blogId,
        }
      );
      setCommentList(response?.data?.comments || []);
      console.log(response?.data?.comments);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComment();
  }, [blogId]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/comments/addComment`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${cookieData?.authToken}`,
          },
        }
      );
      console.log(response);
      toast.success(response?.data?.message);
      setComment("");
      getComment();
    } catch (error) {
      toast.error("Login first!!!");
    }
  };

  // const handleLike = async (commentId) => {
  //   console.log(commentId);
  //   try {
  //     const response = await axios.post(
  //       `${serverURL}/comments/addLike`,
  //       {
  //         userId: userId,
  //         commentId: commentId,
  //         state: true,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${cookieData?.authToken}`,
  //         },
  //       }
  //     );
  //     if(response?.data?.liked?.state)setLikeState(response?.data?.liked?.state);
  //     else setLikeState(false)
  //     console.log(response?.data?.liked?.state);
  //     // toast.success(response.data.message);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  return (
    <>
      <div className="flex justify-start flex-col w-full">
        {commentList.length > 0 && (
          <p className="text-2xl font-bold my-4 text-start">Comments</p>
        )}
        {commentList.map((comment, index) => (
          <AddComment key={index} comment={comment} />
        ))}
      </div>
      <div className="flex items-start flex-col w-full">
        <p className="text-2xl font-bold my-4 text-start">Add Comment</p>
        <textarea
          className="w-full border p-5 outline-none rounded "
          placeholder="write your thoughts"
          required
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className="px-5 py-2 rounded border bg-blue-700 text-white my-2 hover:bg-blue-900"
          onClick={handleAddComment}
        >
          Post Comment
        </button>
      </div>
    </>
  );
}
