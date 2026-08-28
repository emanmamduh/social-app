import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

export default function UpdateCommet({
  setIsCommUpding,
  isCommUpding,
  postId,
  commentId,
  initialContent,
}) {
  const { data: userData } = useContext(AuthContext);
  const queryReCall = useQueryClient();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      content: initialContent || "",
      image: "",
    },
  });
  const updCommFormData = new FormData();

  function handleUpdateComment(values) {
    if (!values.content && !values.image) return;
    if (values.content) {
      updCommFormData.append("content", values.content);
    }
    if (values.image) {
      updCommFormData.append("image", values.image[0]);
    }
    updCommFn();

  }
  function updateComment() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      updCommFormData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data: updateCommData, mutate: updCommFn } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryReCall.invalidateQueries({ queryKey: ["getAllPosts"] });
      queryReCall.invalidateQueries({ queryKey: ["getAllComments"] });
      queryReCall.invalidateQueries({ queryKey: ["getUserNestedPosts"] });
      toast.success("comment updated");
      setIsCommUpding(false);
    },
  });

  return (
    <div>
      {/* {isCommUpding &&  } */}
      {isCommUpding && (
        <form className="" onSubmit={handleSubmit(handleUpdateComment)}>
          <div className="flex items-center mt-3">
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
              className="hidden"
            />
            <input
              {...register("content")}
              type="text"
              id="input-9"
              className="w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-blue-500 focus:outline-none rounded shadow-sm"
              placeholder={`Comment as ${userData?.name}`}
            />
            <button className="h-10 px-4 text-sm bg-blue-500 border border-l-0 border-blue-500 rounded-r shadow-sm text-blue-50 hover:text-white hover:bg-blue-400 hover:border-blue-400 focus:outline-none cursor-pointer">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </form>
      )}
      {/* <form className="" onSubmit={handleSubmit(handleUpdateComment)}>
        <div className="flex items-center mt-3">
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
            className="hidden"
          />
          <input
            {...register("content")}
            type="text"
            id="input-9"
            className="w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-blue-500 focus:outline-none rounded shadow-sm"
            placeholder={`Comment as ${userData?.name}`}
          />
          <button className="h-10 px-4 text-sm bg-blue-500 border border-l-0 border-blue-500 rounded-r shadow-sm text-blue-50 hover:text-white hover:bg-blue-400 hover:border-blue-400 focus:outline-none cursor-pointer">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form> */}
    </div>
  );
}
