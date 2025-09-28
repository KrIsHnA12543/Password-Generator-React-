import { useState,useCallback,useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length, setlength]=useState(8)
  const [numAllowed, setnumAllowed]=useState(false)
  const [charAllowed, setcharAllowed]=useState(false)
  const [Password, setPassword]=useState("")
//useRef hook
const passwordRef = useRef(null)

  const passwordGenerator=useCallback(() => {
    let pass=""
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*(_)-=+;:',.<>/?{}[]"


    for (let i = 1; i <= length; i++) {
        let char=Math.floor(Math.random()*str.length+1)
        pass += str.charAt(char)
        }
  setPassword(pass)


  } , [length,numAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])


  useEffect(()=>{passwordGenerator()}, [length,charAllowed,numAllowed,passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-black bg-emerald-600'>
      <h1 className='text-white text-center pb-4'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input type="text" 
        className='outline-none w-full py-1 px-3 bg-white rounded-md mb-4'
        value={Password }
        placeholder="password"
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className='bg-blue-500 text-white py-1 px-3 rounded-md h-8 outline-none shrink-0.5 cursor-pointer' >Copy</button>
      </div>
      <div className="flex text-sm gap-x-2 ">
        <div className='flex items-center gap-x-1 mb-4'>
          <input type="range"
          min={8}
          max={32}
          value={length} 
          className='cursor-pointer'
          onChange={(e) => setlength(e.target.value)}
          />
          <label className='text-white'>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numAllowed} 
          id='numberInput'
          onChange={(e) => setnumAllowed(e.target.checked)}
          className='mb-3.5 mx-2'/>
          <label htmlFor="numberInput" className='mb-4  text-white'> Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={charAllowed} 
          id='charInput'
          onChange={(e) => setcharAllowed(e.target.checked)}
          className='mb-3.5 mx-2'/>
          <label htmlFor="charInput" className='mb-4 text-white '> Characters</label>
        </div>
      </div>
    </div>
      </>
  )
}

export default App
