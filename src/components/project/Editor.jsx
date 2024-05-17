import { Editor, loader } from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import Output from "./Output";
import { supportedLanguages } from "../../constants/languages";
import { updateCode } from "../../database";
import { Button } from "@nextui-org/react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import debounce from "lodash.debounce";

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
  },1000);

  const handleCodeChange = async (value) => {
    await updateCodeInDb(projectId, value);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="grid grid-rows-4 h-full bg-default-100">
      <div className="row-span-3 flex flex-col">
        <div className="border-b-[1px] border-default-300 p-2 flex justify-between">
          {project.name} | {getLanguageLabel(project.language)}
          <div>
            <Button
              className="bg-secondary"
              onClick={() => updateCodeInDb(projectId, value)}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <Editor
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
      <div>
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
