import React, { useState } from "react";
import { Button, Card, CloseButton } from "@heroui/react";

export default function FollowSuggCard({ followSugg }) {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div>
      {isVisible ? (
        <Card className="w-full items-stretch md:flex-row my-4 rounded-lg">
          <div className="flex justify-center items-center">
            <div className="relative shrink-0 overflow-hidden rounded2xl  items-center size-12 rounded-full">
              <img
                alt="Cherries"
                className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
                loading="lazy"
                src={followSugg.photo}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <Card.Header className="gap-1">
              <h2 className="pe-8 font-semibold text-[15px]">
                {followSugg.name}
              </h2>
              <Card.Description className=" font-medium flex justify-between items-center gap-2 ">
                <span className="text-[13px]">{followSugg.mutualFollowersCount} mutual friends</span>
                <span className="items-center me-1 text-[#2793FC] translate-y-0.5 cursor-pointer hover:text-blue-500">Follow </span>
              </Card.Description>
              <CloseButton
                onClick={() => setIsVisible(false)}
                aria-label="Close banner"
                className="absolute inset-e-3 top-1.5"
              />
            </Card.Header>
            <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="btns flex gap-5">
              </div>
            </Card.Footer>
          </div>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
}
