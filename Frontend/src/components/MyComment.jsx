import React, { useEffect, useState } from "react";
import { getCookieData } from "../utils/helperFunction";
import { serverURL } from "../server";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

function MyComment() {
  const [commentList, setCommentList] = useState([]);
  const cookieData = getCookieData(document.cookie);
  const userId = cookieData?.userId;

  const getUserComments = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/comments/getUserComments`,
        {
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookieData?.authToken}`,
          },
        }
      );
      setCommentList(response?.data?.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserComment = async (commentId) => {
    console.log(commentId);
    try {
      await axios.delete(`${serverURL}/comments/deleteComment`, {
        headers: {
          Authorization: `Bearer ${cookieData?.authToken}`,
        },
        data: {
          commentId: commentId,
        },
      });
      getUserComments();
      toast.success("Comment deleted");
    } catch (error) {
      console.log("something is happend", error);
    }
  };

  useEffect(() => {
    getUserComments();
  }, [userId]);

  console.log(commentList);

  return (
    <>
      <Toaster />
      {/* <div className="flex justify-start flex-col w-full md:px-10 p-3"> */}
      <div className="w-full h-auto flex justify-center items-center mt-[2%]">
        <div className="mx-auto p-3 bg-white rounded-lg w-full md:px-[10%] px-[5%]">
          {commentList.length > 0 ? (
            <p className="md:text-2xl sm:text-xl text-md font-bold mb-4">Comments</p>
          ) : (
            <p className="md:text-2xl sm:text-xl text-md font-bold mb-4 ">
              Yet no comments
            </p>
          )}
          {commentList.map((comment) => (
            <div
              key={comment._id}
              className="border px-2 py-2 text-start rounded my-2 flex justify-between items-center"
            >
              {comment.comment}
              <MdDelete
                className="cursor-pointer text-2xl text-red-600"
                onClick={() => {
                  deleteUserComment(comment._id);
                }}
              />
            </div>
          ))}
          <div></div>
        </div>
      </div>
    </>
  );
}

export default MyComment;
