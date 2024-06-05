import { Editor, loader } from "@monaco-editor/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import { Button } from "@nextui-org/react";
import Output from "./Output";
import { db } from "../../firebase";
import debounce from "lodash.debounce";
import { supportedLanguages } from "../../constants/languages";
import { updateCode } from "../../database";

const CustomEditor = ({ project, projectId }) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState(project.code);
  const getLanguageLabel = (value) => {
    return supportedLanguages.find((lang) => lang.value === value).label;
  };
  const getLanguageVersion = (value) => {
    return supportedLanguages.find((lang) => lang.value === value).version;
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "projects", projectId), (doc) => {
      setValue(doc.data().code);
      console.log("Document data:", doc.data().code);
    });
    return () => {
      unsub();
    };
  }, [db]);

  //Update code in the document
  const updateCodeInDb = debounce(async (projectId, value) => {
    try {
      await updateCode("/projects", projectId, value);
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const handleCodeChange = async (value) => {
    await updateCodeInDb(projectId, value);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="grid w-full grid-rows-4 h-full space-y-4 py-4">
      <div className="row-span-3 flex flex-col gap-4">
        <div className="flex gap-3 items-center justify-between">
          <h3 className="text-xl font-semibold">{project.name} </h3>
          <span className=" rounded-lg bg-default-100 p-1 px-2 text-sm font-light ">
            {getLanguageLabel(project.language)}
          </span>
        </div>
        <div className="flex-1 rounded-xl overflow-hidden border-default-200 border ">
          <Editor
            options={{
              fontSize: 16,
            }}
            theme="vs-dark"
            defaultLanguage={"javascript"}
            defaultValue={project.code}
            onMount={onMount}
            loader={loader}
            value={value}
            onChange={handleCodeChange}
          />
        </div>
      </div>
      <div className="bg-default-100/50 border border-default-200 rounded-xl overflow-hidden ">
        <Output
          editorRef={editorRef}
          language={project.language}
          version={getLanguageVersion(project.language)}
        />
      </div>
    </div>
  );
};

export default CustomEditor;
