import { useCreatePost } from "@/hooks/useCreatePost.ts";
import { env } from "@/lib/env.ts";
import { Editor } from "@tinymce/tinymce-react";
import {
  useRef,
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { useNavigate } from "react-router";
import type { Editor as TinyMCEEditor } from "tinymce";
import { ErrorMessage } from "../ErrorMessage.tsx";
import styles from "./PostInput.module.css";

export const PostInput = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const { createPost, createPostLoading, createPostError } = useCreatePost();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(false);
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

  const savePostHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const success = await createPost({ title, content, published });
    if (success) {
      navigate("/");
    }
  };

  return (
    <form className={styles.postInputForm} onSubmit={savePostHandler}>
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
        required
      />
      {editorLoading && <div className={styles.loading}>...Loading</div>}
      <Editor
        apiKey={env.tinyMceApiKey}
        onInit={(_, editor) => {
          setEditorLoading(false);
          editorRef.current = editor;
        }}
        initialValue="<p>This is the initial content of the editor.</p>"
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
        />
      </div>
      <button disabled={createPostLoading}>Save</button>
      {createPostError && <ErrorMessage error={createPostError} />}
    </form>
  );
};
