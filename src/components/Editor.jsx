import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";

const CustomEditor = () => {
    const editorRef = useRef(null);
    const [value, setValue] = useState('');

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }



    return (
        <div>
            <Editor
            height="75vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            defaultValue="// Write JavaScript code here"
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}  
            />
        </div>
    )
}

export default CustomEditor