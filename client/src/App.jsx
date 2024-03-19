import { createContext, useState, useContext } from 'react';
import './App.css'
import CodeInput from './CodeInput/CodeInput';
export const translatedCodeContext = createContext();

function App() {
  const [translatedCode, setTranslatedCode] = useState('//waiting to translate');
  const updateTranslatedCode = (code) => {
    setTranslatedCode(code);
  }

  return (
    <translatedCodeContext.Provider value={{ translatedCode, updateTranslatedCode }}>
      <div className="inputWrapper">
        <div className="cpp">
          <CodeInput name="C++ 代码" operator={true} readOnly={false} language="java" />
        </div>
        <div className="loading"></div>
        <div className="rust">
          <CodeInput name="rust 代码" operator={false} readOnly={true} language="rust" />
        </div>
      </div>
    </translatedCodeContext.Provider>
  )
}

export default App
