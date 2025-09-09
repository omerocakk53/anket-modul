import React from "react";
import EditHeader from "./EditHeader";
import AnswerHeader from "./AnswerHeader";
import ShareHeader from "./ShareHeader";
import MainHeader from "./MainHeader";

export default function Header(props) {
  const { isEditMode, isAnswerMode, isShareMode } = props;

  if (isEditMode) return <EditHeader {...props} />;
  if (isAnswerMode) return <AnswerHeader {...props} />;
  if (isShareMode) return <ShareHeader {...props} />;
  return <MainHeader {...props} />;
}
