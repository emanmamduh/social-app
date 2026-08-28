import { Button, Modal, TextArea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef, useState } from "react";

export default function PostModal({
  isUpdModalOpen,
  setIsUpdModalOpen,
  previewImg,
  postImg,
  cancelPostImg,
  updPostFn,
  body,
  image
}) {
  return (
    <div>
      <Modal isOpen={isUpdModalOpen} onOpenChange={setIsUpdModalOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.CloseTrigger />
              <Modal.Header className="border-b border-[#262626]/80">
                <Modal.Heading className="font-semibold text-center mb-1">
                  Update Post
                </Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <TextArea
                  ref={body}
                  aria-label="Quick project update"
                  className=" w-full my-3 p-4 border"
                  rows="6"
                  placeholder="Share your thoughts"
                />
                <div className="img rounded-xl shadow  w- mx-ato ">
                  <label
                    htmlFor="upload"
                    className="cursor-pointer flex justify-between px-5 py-2"
                  >
                    <label htmlFor="upload" className="cursor-pointer">
                      Add image to your post
                    </label>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-[16px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </label>
                  <input
                    ref={image}
                    id="upload"
                    type="file"
                    hidden
                    onChange={previewImg}
                  />
                </div>
                {postImg && (
                  <div className="preview-img relative mt-4">
                    <img
                      src={postImg}
                      alt=""
                      className="w-full object-cover object-center"
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 absolute top-2 right-3 cursor-pointer  text-[#71717a] rounded-full"
                      onClick={cancelPostImg}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button className="w-full" slot="close" onClick={updPostFn}>
                  Update Post
                  {/* onClick={mutate} */}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
