import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { CommentContext } from "../../Context/CommentContext";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

export default function CreateComment({ postId, userId }) {
  const { data: userData } = useContext(AuthContext);
  const [commImg, setCommImg] = useState(null);

  const queryReCall = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      image: "",
    },
  });
  function addComment(formData) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      // handleComment(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data, mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: (res) => {
      queryReCall.invalidateQueries({ queryKey: ["getAllPosts"] });
      queryReCall.invalidateQueries({ queryKey: ["getAllComments"] });
      queryReCall.invalidateQueries({ queryKey: ["getUserNestedPosts"] });
      toast.success("comment created");
      reset();
      setCommImg(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create comment");
    },
  });

  function previewImg(e) {
    setCommImg(URL.createObjectURL(e.target.files[0]));
  }

  function handleComment(values) {
    const formData = new FormData();

    if (!values.content && !values.image) {
      return;
    }
    if (values.content) {
      formData.append("content", values.content);
    }
    if (values.image) {
      formData.append("image", values.image[0]);
    }

    mutate(formData);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleComment)}
        className="flex  items-center gap-1 bg-re-200"
      >
        <div className="img size-10 rounded-full overflow-hidden flex items-center justify-center mt-2 bg-green-400">
          <img
            src={userData?.photo}
            alt=""
            className="w-full object-center object-cover"
          />
        </div>
        <div className="flex items-center mt-3 relative grow">
          <div className="img absolute bottom-1 ">
            <label
              htmlFor="image"
              className="cursor-pointer text-2xl text-gray-600 me-1"
            >
              <i className="fa-solid fa-image"></i>
            </label>
            <input
              {...register("image")}
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              // onChange={previewImg} // cannt use onChangewz register()
            />
          </div>
          <div className="inpput flex w-full">
            <input
              {...register("content")}
              type="text"
              id="input-9"
              className="ps-8 w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-blue-500 focus:outline-none rounded shadow-sm"
              placeholder={`Comment as ${userData?.name}`}
            />
            <button className="h-10 px-4 text-sm bg-blue-500 border border-l-0 border-blue-500 rounded-r shadow-sm text-blue-50 hover:text-white hover:bg-blue-400 hover:border-blue-400 focus:outline-none cursor-pointer">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
