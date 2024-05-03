import { Editor,loader } from "@monaco-editor/react";
import { useRef, useState } from "react";
import Output from "./Output";



  // Define the list of languages you want to support
const supportedLanguages = [
  { label: 'JavaScript', value: 'nodejs', version: '17.1.0'},
  { label: 'Java', value: 'java' , version: 'JDK 17.0.1.4'},
  { label: 'HTML', value: 'html', version: '5'},
  { label: 'python', value: 'python3', version: '3.9.9'},
  { label: 'C++', value: 'cpp17', version: 'g++ 17 GCC 11.1.0'},
  { label: 'C', value: 'c', version: 'GCC 11.1.0'},
  // Add more languages as needed
];

const CustomEditor = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState(supportedLanguages[0]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };


  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLanguage(supportedLanguages.find((lang) => lang.value === e.target.value));
  }; 

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="mb-4">
      <select value={language.value} 
      onChange={handleLanguageChange} 
      className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 top-0">
        {supportedLanguages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label} {lang.version}
          </option>
        ))}
      </select>
      </div>     
        <Editor
          height="75vh"
          theme="vs-dark"
          defaultLanguage={language.value}
          defaultValue="// Write code here"
          onMount={onMount}
          value={value}
          onChange={(value) => setValue(value)}
          loader={loader}
        />
      <Output  editorRef={editorRef} language={language.value} version={language.version}/>
    </div>
  );
};

export default CustomEditor;