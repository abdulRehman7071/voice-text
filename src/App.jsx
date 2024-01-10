import "./App.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [isCopied, setCopied] = useState(false);

  const copyToClipBoard = () => {
    if (transcript.length) {
      setCopied(true);
      navigator.clipboard.writeText(transcript);
      toast.success("Copied to clipboard!", {
        position: "top-right",
        autoClose: 1997,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } else {
      return;
    }
  };
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const handleListening = () => {
    if (isListening) {
      setIsListening(false);
      SpeechRecognition.stopListening();
      return;
    }
    setIsListening(true);
    startListening();
  };

  return (
    <section className="  w-screen overflow-hidden bg-slate-950 text-white">
      <ToastContainer />
      <div className="min-h-screen flex justify-center items-center flex-col space-y-4">
        <h2 className=" text-2xl font-bold mb-4 ">Speech to Text Converter</h2>
        <p className="mx-auto w-4/5 text-center ">
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>
        <div
          className={`transition-all ease-in-out border border-white rounded px-4 py-2 w-4/5 md:min-h-60 min-h-44 md:w-8/12 bg-transparent ring-0 focus:outline-none outline-none ${
            transcript.length ? "cursor-copy" : "cursor-not-allowed"
          }`}
          placeholder="Click Start Listening Button and Let's engage"
          onClick={copyToClipBoard}
        >
          {transcript}
        </div>
        <div className=" flex flex-col md:flex-row mt-4">
          <button
            onClick={handleListening}
            className=" bg-indigo-600 p-2 md:p-3 rounded-lg mb-4 md:ml-4"
          >
            {isListening ? (
              <div className=" flex justify-center items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                </span>
                <span>Listening</span>
              </div>
            ) : (
              "Start Listening"
            )}
          </button>
          <button
            onClick={copyToClipBoard}
            className={`bg-indigo-600 p-2 md:p-3 rounded-lg mb-4 md:ml-4 ${
              transcript.length ? "cursor-copy" : "cursor-not-allowed"
            }`}
          >
            {isCopied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default App;
