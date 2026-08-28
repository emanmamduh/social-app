import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ActionMenu from "../ActionMenu/ActionMenu";
import UpdateCommet from "./UpdateCommet";

export default function SingleComment({ comment, postId }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommUpding, setIsCommUpding] = useState(false);
  
  const { data: userData } = useContext(AuthContext);
  return (
    <div>
      <div className="flex justify-between gap-3 mb-2 mt-5 rounded-lg p-4 border border-neutral-400/50  group">
        <div className="flex items-center space-x-3">
          <div className="self-start">
            <img
              src={comment?.commentCreator?.photo}
              alt="User"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold">{comment?.commentCreator?.name}</p>
            <p className="font-semibold">{comment?.content}</p>
            {comment?.image && (
              <img
                src={comment?.image}
                alt=""
                className="size-50 object-cover object-center "
              />
            )}
          </div>
        </div>
        <div
          className={`opacity-0  self-center group-hover:opacity-100 transition-all duration-75 ${isMenuOpen ? "opacity-100" : ""}`}
        >
          {userData?.id === comment?.commentCreator?._id && (
            <ActionMenu
              commentId={comment?._id}
              postId={postId}
              setIsMenuOpen={setIsMenuOpen}
              isCommUpding={isCommUpding}
              setIsCommUpding={setIsCommUpding}
            />
          )}
        </div>
      </div>
      <UpdateCommet
        commentId={comment?._id}
        postId={postId}
        setIsCommUpding={setIsCommUpding}
        isCommUpding={isCommUpding}
        initialContent={comment?.content}
      />
    </div>
  );
}
