import { Button } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

const Output = ({ editorRef, language, version }) => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const runCode = async () => {
    const code = editorRef.current.getValue();
    if (!code) return;

    const options = {
      method: 'POST',
      url: 'https://online-code-compiler.p.rapidapi.com/v1/',
      headers: {
        'x-rapidapi-key': 'bec9864a4fmsh665a432e8b06093p133bffjsn10fff835ae51',
        'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        language,
        version,
        code,
        input: null,
      },
    };
    try {
      setLoading(true);
      const response = await axios.request(options);
      setOutput(response.data.output);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && e.shiftKey) {
      console.log("Enter key pressed");
      runCode();
    }
  });
  return (
    <div className="flex  h-full flex-col flex-wrap border-t border-default-300 w-full">
      <Button color="secondary" radius="none" onClick={runCode}>
        {loading ? <>Running...</> : <>Run Code</>}{" "}
      </Button>
      <div className="output p-2  w-full  rounded-md border-slate-500 text-slate-300 cursor-text">
        <p className="text-slate-400">Output :</p> {output}
      </div>
    </div>
  );
};


export default Output;
