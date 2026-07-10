import { env } from "@/lib/env.ts";
import { Editor } from "@tinymce/tinymce-react";
import {
  useRef,
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { ErrorMessage } from "../ErrorMessage.tsx";
import styles from "./PostEdit.module.css";
import type { Post } from "@/types/post.types.ts";
import DOMPurify from "dompurify";
import { useUpdatePost } from "@/hooks/useUpdatePost.ts";

export const PostEdit = ({
  post,
  onCancel,
  onUpdate,
}: {
  post: Post;
  onCancel: VoidFunction;
  onUpdate: VoidFunction;
}) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const { updatePost, updatePostLoading, updatePostError } = useUpdatePost(
    post.id,
  );
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(DOMPurify.sanitize(post.content));
  const [published, setPublished] = useState(post.published);
  const [editorLoading, setEditorLoading] = useState(true);

  const contentChangeHandler = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent());
    }
  };

  const publishedChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;
    setPublished(checked);
  };

  const updatePostHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const success = await updatePost({ title, content, published });
    if (success) {
      onUpdate();
    }
  };

  return (
    <form className={styles.postInputForm} onSubmit={updatePostHandler}>
      <label htmlFor="title" hidden>
        title
      </label>
      <input
        className={styles.postInputTitle}
        type="text"
        name="title"
        id="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Enter title for new post"
        value={title}
        required
      />
      {editorLoading && <div className={styles.loading}>...Loading</div>}
      <Editor
        apiKey={env.tinyMceApiKey}
        onInit={(evt, editor) => {
          setEditorLoading(false);
          editorRef.current = editor;
        }}
        initialValue={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={contentChangeHandler}
      />

      <div className={styles.published}>
        <label htmlFor="published">Publish</label>
        <input
          onChange={publishedChangeHandler}
          type="checkbox"
          name="published"
          id="published"
          checked={published}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button disabled={updatePostLoading}>Save</button>
      </div>
      {updatePostError && <ErrorMessage error={updatePostError} />}
    </form>
  );
};
