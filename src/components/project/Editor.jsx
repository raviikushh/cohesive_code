import { Editor, loader } from "@monaco-editor/react";
import { useRef, useState, useEffect } from "react";
import Output from "./Output";
import { supportedLanguages } from "../../constants/languages";
import { updateCode } from "../../database";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";

const CustomEditor = ({ project, projectId }) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState(supportedLanguages[0]);

  const getLanguageLabel = (value) => {
    return supportedLanguages.find((lang) => lang.value === value).label;
  };
  const getLanguageVersion = (value) => {
    return supportedLanguages.find((lang) => lang.value === value).version;
  };


  //Update code in the document
  const updateCodeInDb = async (projectId,value) => {
    try {
      await updateCode("/projects", projectId, value);
      toast.success("Code saved successfully");
    } catch (error) {
      console.error(error);
    }
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
            <Button className="bg-secondary" onClick={()=>updateCodeInDb(projectId,value)}>
              Save
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <Editor
            theme="vs-dark"
            defaultLanguage={'javascript'}
            defaultValue=""
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
            loader={loader}
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
