import React, { useContext, useRef, useState } from "react";
import { Button, Dropdown, Label, Modal, TextArea } from "@heroui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteConfirmationModal from "./deleteConfirmationModal";
import PostModal from "./PostModal";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import PostCard from "./../PostCard/PostCard";

export default function ActionMenu({
  postId,
  commentId,
  setIsMenuOpen,
  setIsCommUpding,
}) {
  const { data: userData } = useContext(AuthContext);

  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isUpdModalOpen, setIsUpdModalOpen] = useState(false);
  const [postImg, setPostImg] = useState(null);
  const body = useRef();
  const image = useRef();
  const query = useQueryClient();

  function previewImg(e) {
    setPostImg(URL.createObjectURL(e.target.files[0]));
  }
  function cancelPostImg() {
    setPostImg(null);
  }

  function handlePostData() {
    const formData = new FormData();
    if (body.current.value) {
      formData.append("body", body.current.value);
    }
    if (image.current.files[0]) {
      formData.append("image", image.current.files[0]);
    }
    return formData;
  }
  // Delete Post
  function deletePost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const { data: delData, mutate: delPostFn } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      query.invalidateQueries({ queryKey: ["getAllComments"] });
      query.invalidateQueries({ queryKey: ["getUserNestedPosts"] });
      toast.success("post deleted");
    },
  });
  //   end of del Post
  // Deletw comment
  function deleteComment() {
    return axios.delete(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data, mutate: delCommentFn } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: ["getAllComments"],
      });
      query.invalidateQueries({
        queryKey: ["getAllPosts"],
      });
      query.invalidateQueries({ queryKey: ["getUserNestedPosts"] });

      toast.success("comment deleted successfully");
    },
  });
  function deleteItem() {
    if (postId && commentId) {
      delCommentFn();
    } else if (postId) {
      delPostFn();
    }
  }

  //   update Post
  function updatePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${postId}`,
      handlePostData(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data: updPostData, mutate: updPostFn } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["getPost"] });
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      query.invalidateQueries({ queryKey: ["getUserNestedPosts"] });

      toast.success("Post Updated successfully");
    },
  });

  return (
    <div>
      <Dropdown onOpenChange={setIsMenuOpen}>
        <Button aria-label="Menu" variant="secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            onAction={(key) => {
              console.log(`Selected: ${key}`);
              if (key == "delete-file") {
                setIsDelModalOpen(true);
              } else if (key == "edit-file") {
                if (commentId) {
                  setIsCommUpding(true);
                } else {
                  setIsUpdModalOpen(true);
                }
              }
            }}
          >
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <Button variant="" className="gray-50">
                Update {postId && commentId ? "Comment" : "Post"}
              </Button>
            </Dropdown.Item>
            <Dropdown.Item
              id="delete-file"
              textValue="Delete file"
              variant="danger"
            >
              <Button variant="">
                Delete {postId && commentId ? "Comment" : "Post"}
              </Button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <DeleteConfirmationModal
        isDelModalOpen={isDelModalOpen}
        setIsDelModalOpen={setIsDelModalOpen}
        deleteItem={deleteItem}
      />

      <PostModal
        isUpdModalOpen={isUpdModalOpen}
        setIsUpdModalOpen={setIsUpdModalOpen}
        previewImg={previewImg}
        postImg={postImg}
        cancelPostImg={cancelPostImg}
        updPostFn={updPostFn}
        body={body}
        image={image}
      />
    </div>
  );
}
{
}
