import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const tagContext = createContext();
export const useTag = () => useContext(tagContext);

const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const userId = "684aac4fce05daa7156548a7";

  useEffect(() => {
    const tagFetch = async () => {
      try {
        const res = await axiosInstance.get(`/tag/${userId}`);
        setTags(res.data.tags);
      } catch (error) {
        console.error("Failed to fetch tags", error);
      }
    };
    tagFetch();
  }, []);

  const addTag = async (tagName) => {
    try {
      const res = await axiosInstance.post(`/tag/${userId}`, {
        name: tagName,
        userId: userId,
      });
      const newTag = res.data.tag;
      setTags((prev) => [...prev, newTag]);
    } catch (error) {
      console.error("Failed to add tag", error);
    }
  };

  const deleteTag = async (tagId) => {
    try {
      await axiosInstance.delete(`/tag/${userId}/${tagId}`);
      setTags((prev) => prev.filter((tag) => tag._id !== tagId));
    } catch (error) {
      console.error("Failed to delete tag", error);
    }
  };

  return (
    <tagContext.Provider value={{ tags, setTags, addTag, deleteTag }}>
      {children}
    </tagContext.Provider>
  );
};

export default TagProvider;
