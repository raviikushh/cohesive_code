import { Button } from "@nextui-org/react";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

const Output = ({ editorRef, language, version }) => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  console.log({ version });
  const runCode = async () => {
    const code = editorRef.current.getValue();
    if (!code) return;

    const options = {
      method: 'POST',
      url: 'https://online-code-compiler.p.rapidapi.com/v1/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'a400844a2fmshbbf5445a01b5285p113bf9jsnaec9ec9e84f1',
        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
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

Output.propTypes = {
  editorRef: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
};

export default Output;
