import { useState } from "react";
import brainLogo from './assets/brain.png'
import { Configuration, OpenAIApi } from "openai";
import { DotSpinner } from '@uiball/loaders';
import "./App.css"

function App() {
  const [prompt, setPrompt] = useState ("");
  const [results, setResults] = useState([]) // Cambiamos 'result' por 'results' y establecemos su valor inicial en un array vacío
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setIsLoading(true); // Activar el spinner al iniciar la carga

    const res = await openai.createImage({
      prompt: prompt,
      n: 4, // Cambiamos el valor de 'n' a 4
      size: "1024x1024"
    });

    setResults(res.data.data.map(item => item.url)) // Actualizamos el estado 'results' con los URL de las 4 imágenes generadas
    setIsLoading(false); // Desactivar el spinner al finalizar la carga
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      generateImage();
    }
  }

  return (
  <div className="app-main">
    <div>
        <a href= "https://github.com/pibernat89" target="_blank">
          <img src={brainLogo} className="brain logo" alt="Brain logo" />
        </a>
    </div>  
    <textarea
      className="app-input"
      rows="3"
      placeholder="Type to create an image"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)(handleKeyPress)}
      />
    <button onClick={generateImage}>Generate Image</button>
    {isLoading && (
        <div className="spinner-container">
          <DotSpinner size={35} color="#646cff" />
        </div>
      )} {/* Agregamos el spinner */}
    {results.length > 0 ? results.map((url, index) => <img key={index} className="result-image" src={url} alt={`result-${index}`} />) : <></>}  
    <footer className="footer">
      <div className="container">
        <p>Powered by <strong><a href="https://github.com/pibernat89">Alex Pibernat</a></strong> and <strong><a href="https://openai.com/">OpenaAI</a></strong>
        </p>
      </div>
    </footer>
  </div>
  )
} 

export default App