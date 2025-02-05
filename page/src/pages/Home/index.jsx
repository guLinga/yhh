import { useState } from "react"
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    return <div>
        用户名：<input type="text" value={value} onChange={(e) => {
            setValue(e.target.value)
        }} />
        <button onClick={() => {
            navigate(`/meeting?name=${value}`)
        }}>加入</button>
    </div>
}

export default Home