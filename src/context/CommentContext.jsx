import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const CommentContext = createContext();
export const useComment = () => useContext(CommentContext);

const userId = "684aac4fce05daa7156548a7";

const CommentProvider = ({ children }) => {
  const [commentList, setCommentList] = useState([]);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axiosInstance.get(`/comment/${userId}`);
        setCommentList(res.data.comments);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchComment();
  }, [trigger]);
  const commentByLead = async (leadId) => {
    try {
      const res = await axiosInstance.get(`/comment/${userId}/${leadId}`);
      setCommentList(res.data.comments);
      console.log(res.data.comments);
      setTrigger((pre) => pre + 1);
      return res.data.comments;
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };
  const addComment = async (leadId, commentText) => {
    try {
      const res = await axiosInstance.post(`/comment/${userId}/${leadId}`, {
        commentText: commentText,
      });
      console.log(leadId);
      console.log(res);
      setCommentList((prev) => [...prev, res.data.comment]);
      setTrigger((pre) => pre + 1);
    } catch (error) {
      console.error("Add comment failed", error);
    }
  };
  const deleteComment = async (commentId) => {
    try {
      const res = await axiosInstance.delete(`/comment/${userId}/${commentId}`);
      setCommentList((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
      console.log("Comment deleted successfully", res.data);
    } catch (error) {
      console.error("Delete comment failed", error);
    }
  };
  return (
    <CommentContext.Provider
      value={{
        commentList,
        setCommentList,
        commentByLead,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
