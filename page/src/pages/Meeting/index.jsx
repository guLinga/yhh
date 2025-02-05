import { useState, useEffect, useRef } from "react"
import { initMetia } from "../utils/media"
import { initSocket } from "../utils/socket"


const Meeting = () => {
    // 开启视频
    const [video, setVideo] = useState(false)
    // 开启音频
    const [audio, setAudio] = useState(false)
    const videoRef = useRef(null)
    useEffect(() => {
        if (video || audio) {
            initMetia({video: false, audio: true}, videoRef)
        }
    }, [video, audio])

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const name = searchParams.get('name');
        initSocket({username: name, room: '1'})
    }, [])
    return <div>
        <video src="" ref={videoRef}></video>
    </div>
}

export default Meeting