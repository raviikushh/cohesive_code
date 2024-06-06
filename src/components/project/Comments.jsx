import { Button, Textarea } from "@nextui-org/react";
import { DeleteIcon, Edit, Edit2, Edit3Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { addDocument, deleteDocument, updateDocument } from "../../database";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import useAuthState from "../../hooks/useAuthState";

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
export function getRelativeTimeString(date, lang = navigator.language) {
  if(!date) return "";
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  // Array equivalent to the above but in the string representation of the units
  const units = ["second", "minute", "hour", "day", "week", "month", "year"];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

const CommentsSection = ({ projectId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");
  const db = getFirestore();
  const { user, isLoading: isUserLoading } = useAuthState();

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("projectId", "==", projectId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [projectId]);

  const addComment = async () => {
    if (!user) return;
    if (newComment.trim() === "") return;
    await addDocument("comments", {
      text: newComment,
      projectId,
      createdBy: user.email,
    });
    setNewComment("");
  };

  const deleteComment = async (comment) => {
    // check if user is the owner of the comment
    if (user.email !== comment.createdBy) return;
    await deleteDocument("comments", comment.id);
  };

  const editComment = (comment) => {
    // check if user is the owner of the comment
    if (user.email !== comment.createdBy) return;
    setEditingComment(comment.id);
    setEditingText(comment.text);
  };

  const updateComment = async (comment) => {
    // check if user is the owner of the comment
    if (user.email !== comment.createdBy) return;
    if (editingText.trim() === "") return;
    await updateDocument("comments", id, {
      text: editingText,
    });
    setEditingComment(null);
    setEditingText("");
  };

  return (
    <div className="p-4 flex flex-col h-full flex-shrink-0 w-[500px]">
      <h2 className="text-xl font-bold mb-4">Discussion</h2>
      <ul className="flex-1 overflow-y-auto h-full ">
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4 space-y-2 ">
            {editingComment === comment.id ? (
              <div className=" bg-default-100 p-3 space-y-2  rounded-lg ">
                <Textarea
                  variant="faded"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => updateComment(comment)}
                  >
                    Update
                  </Button>
                  <Button size="sm" onClick={() => setEditingComment(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className=" bg-default-100  rounded-lg ">
                <p className="mb-2 block p-3 pb-1">{comment.text}</p>
                <div className="flex gap-2 items-center border-t border-default-200 p-2">
                  <span className="text-xs flex-1 text-default-400">
                    {comment.createdBy} |
                    <em className="pl-1">
                      {getRelativeTimeString(comment?.updated_at ? comment.updated_at?.toDate() : comment.created_at?.toDate())}
                    </em>
                  </span>
                  {user.email === comment.createdBy && (
                    <>
                      <button
                        className="text-default-400 hover:text-blue-400 rounded-md p-1  "
                        onClick={() => editComment(comment)}
                      >
                        <Edit3Icon className="h-4" />
                      </button>
                      <button
                        className="text-default-400 hover:text-red-400 rounded-md p-1  "
                        onClick={() => deleteComment(comment)}
                      >
                        <DeleteIcon className="h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mb-4 space-y-4 flex-0">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button
          color="secondary"
          onClick={addComment}
          disabled={!user || !newComment}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentsSection;
