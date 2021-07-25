import React, { FC } from "react";
import { useEffect } from "react";
import { useFS } from "../../components/useLocalDirectory/useLocalDirectory";

export const Editor: FC = function () {
  const [directoryHandler, pickDirectory] = useFS();

  useEffect(() => {
    console.log(directoryHandler);
  }, [directoryHandler]);

  return (
    <div>
      hi{" "}
      <button
        onClick={() => {
          pickDirectory().then(() => {
            console.log("directory selected");
          }).catch(() => {
            console.log("directory not selected");
          });
        }}
      >
        push
      </button>
    </div>
  );
};
