import  {useState} from 'react'
import { Editor } from "@monaco-editor/react"
import { useRef } from "react"


const EditorPage = () => {
    const editorRef = useRef(null);
    const [value, setValue] = useState('');


    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

  return (
    <Editor
        height="75vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
    />

    
  )
}

export default EditorPage