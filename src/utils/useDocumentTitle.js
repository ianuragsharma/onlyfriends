import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `OnlyFriends | ${title}`;
  }, [title]);
};
export { useDocumentTitle };
