import axios from 'axios';
import PropTypes from 'prop-types';
import  { useState } from 'react';



const Output = ({ editorRef, language, version }) => {
    const[loading,setLoading] = useState(false);
    const [output,setOutput] = useState('');
    console.log({version})
    const runCode = async() => {
        const code = editorRef.current.getValue();
        if (!code) return;
       
const options = {
    method: 'POST',
    url: 'https://online-code-compiler.p.rapidapi.com/v1/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'bec9864a4fmsh665a432e8b06093p133bffjsn10fff835ae51',
      'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
    },
    data: {
      language,
      version,
      code,
     input: null
    }
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
}

document.addEventListener('keypress', function (e) {
  if(e.key ==='Enter' && e.shiftKey){
      console.log('Enter key pressed');
      runCode();
  }
})
    return (
        <div className="flex flex-col flex-wrap items-center">
            <button className="btn border-2 rounded-md border-slate-300 cursor-pointer p-1 flex w-28 mb-2 justify-around mt-2 hover:bg-green-700 bg-green-500" 
            onClick={runCode}
                >
            {loading ? <>Running...</> : <>Run Code</>}    </button>
            <div className="output h-32 w-[75vw] border-2 rounded-md border-slate-500 text-slate-300 cursor-text">
                       <p className='text-slate-400'>Output :</p> {output}
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