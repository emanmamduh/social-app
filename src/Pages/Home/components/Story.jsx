import React from 'react'
import sunset from "../../../assets/images/sunset.jpg";
import st from "../../../assets/images/st.jpg";

export default function Story({story}) {

  return (
  <div>
    <div className="storyflex flex-col items-center relative ">
        <div
          key={story.id}
          className="story p-2 flex flex-col items-center relative"
        >
          <div className="w-full h-64 bg-amber-400 rounded-2xl overflow-hidden">
            <img
              src={story.storyImg}
              alt="Story"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="storyCreator absolute bottom-5 p-0.5 flex gap-2 items-center bg-white border border-gray-200 shadow rounded-full px-1.5 w-fit">
            <div className="img size-10 overflow-hidden rounded-full border-3 border-blue-400 shadow shrink-0">
              <img
                src={story.profileImg}
                alt={story.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h5 className="font-semibold text-sm mt-0.5 pr-2">{story.name}</h5>
          </div>
        </div>
    </div>
  </div>
);
}
