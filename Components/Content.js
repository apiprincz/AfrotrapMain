import React from "react";
import Pick from "../Components/Content/Pick";
import Exclusive from "../Components/Content/Exclusive";
import Flash from "../Components/Content/Flash";
import Latest from "../Components/Content/Latest";

const Content = () => {
  return (
    <div>
      <Pick />
      <Exclusive />
      <Flash />
      <Latest />
    </div>
  );
};

export default Content;
