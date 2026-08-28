import React, { useContext, useRef, useState } from "react";
import { Button, Modal, TextArea } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function UploadPhotoModal({
  isClicked,
  setIsClicked,
  profileImg,
  setProfileImg,
  refetchIntervaUserProfile,
}) {
  const photo = useRef(); // take img from input
  const query = useQueryClient();
  const { data: userData } = useContext(AuthContext);
  function previewImg(e) {
    // get img path
    setProfileImg(URL.createObjectURL(e.target.files[0]));
  }
  function cancelProfileImg() {
    // close img preview
    setProfileImg(null);
    if (photo.current) photo.current.value = "";
  }

  function putProfileImg() {
    return axios.put(
      `https://route-posts.routemisr.com/users/upload-photo`,
      handleProfileImg(),
      //   formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data, mutate } = useMutation({
    mutationFn: putProfileImg,
    onSuccess: async () => {
      toast.success("img uploaded");
      // refetch profile
      await refetchIntervaUserProfile();
      setProfileImg(null);
      await query.invalidateQueries({ queryKey: ["getUserInfo"] });
      await query.invalidateQueries({ queryKey: ["getUserNestedPosts"] });

    },
    onError: (err) => {
      toast.error("Failed to upload photo");
      setProfileImg(null);
    },
  });

  function handleProfileImg() {
    const formData = new FormData();
    if (photo.current.files[0] === userData?.photo) {
      return;
    }
    if (!photo.current.files[0]) {
      toast.info("Please select a new photo first");
      return;
    }
    if (photo.current.files[0]) {
      // get data => form data
      formData.append("photo", photo.current.files[0]);
    }
    return formData;
  }

  return (
    <div>
      <Modal isOpen={isClicked} onOpenChange={setIsClicked}>
        {/* <Button variant="secondary">Open Modal</Button> */}
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-90">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Change Photo</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <div className="img rounded-xl shadow  w- mx-ato ">
                  <label
                    htmlFor="upload"
                    className="cursor-pointer flex justify-between px-2.5 py-2"
                  >
                    <label
                      htmlFor="upload"
                      className="cursor-pointer flex items-center gap-2 p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      Upload Photo
                    </label>{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-[16px] self-center"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </label>

                  <input
                    ref={photo} // get selected img
                    id="upload"
                    type="file"
                    hidden
                    onChange={previewImg} //get img path
                  />
                </div>

                {/* show in preview window */}
                {profileImg && (
                  <div className="preview-img relative mt-4">
                    <img
                      src={profileImg} //show img
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
                      onClick={cancelProfileImg} //cancel img
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
                <Button className="w-full" slot="close" onClick={mutate}>
                  {/* excute mutate when click */}
                  Upload
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
