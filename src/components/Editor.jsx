import { Editor, loader } from "@monaco-editor/react";
import { useRef, useState } from "react";
import Output from "./Output";

const CustomEditor = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Define the list of languages you want to support
  const supportedLanguages = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JSON', value: 'json' },
    { label: 'JAVA', value: 'java' },
    // Add more languages as needed
  ];

  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="mb-4">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {supportedLanguages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      <Editor
        height="75vh"
        width="80vw"
        theme="vs-dark"
        defaultValue="//Enter Your code Here"
        language={language}
        value={value}
        onMount={onMount}
        onChange={(value) => setValue(value)}
        loader={loader}
        className="rounded-md shadow-md"
      />
      <Output editorRef={editorRef} language={language}/>
    </div>
  );
};

export default CustomEditor;