import { Editor, loader } from "@monaco-editor/react";
import { useRef, useState } from "react";
import Output from "./Output";
import { supportedLanguages } from "../../constants/languages";

const CustomEditor = ({ project }) => {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState(supportedLanguages[0]);

  const getLanguageLabel = (value) => {
    return supportedLanguages.find((lang) => lang.value === value).label;
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="grid grid-rows-4 h-full bg-default-100">
      <div className="row-span-3 flex flex-col">
        <div className="border-b-[1px] border-default-300 p-2">
          {project.name} | {getLanguageLabel(project.language)}
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
          language={language.value}
          version={language.version}
        />
      </div>
    </div>
  );
};

export default CustomEditor;
