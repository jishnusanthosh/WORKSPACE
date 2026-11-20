import {useState} from 'react'

function sum() {
    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(0)
    const [result, setResult] = useState(0)



  return (
    <div>
    <div>
        <input type="text" onChange={(e)=>setNum1(Number(e.target.value))}  />
    </div>


    
    
    
    </div>
  )
}

export default sum