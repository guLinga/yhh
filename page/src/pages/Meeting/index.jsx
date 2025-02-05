import { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { initMetia } from '../utils/media'
import { initSocket } from '../utils/socket'

import { v4 as uuidv4 } from 'uuid'

import './index.less'

const Meeting = () => {
  const userList = useSelector((store) => store.userList.userList)

  const remoteVideoRef = useRef(null)
  const videoRef = useRef(null)

  // 用户id
  const [userId, setUserId] = useState(undefined)

  // 参会者人数
  const peopleNumber = useMemo(() => {
    return `参会者（${userList.length}）`
  }, [userList])

  // 开启视频
  const [video, setVideo] = useState(false)
  // 开启音频
  const [audio, setAudio] = useState(false)
  // useEffect(() => {
  //   if (video || audio) {
  //     initMetia({ video: false, audio: true }, videoRef)
  //   }
  // }, [video, audio])

  useEffect(() => {
    async function fn() {
      const searchParams = new URLSearchParams(window.location.search)
      const name = searchParams.get('name')
      const userId = uuidv4()
      setUserId(userId)
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      console.log(stream)

      videoRef.current.srcObject = stream
      initSocket({
        username: name,
        room: '1',
        userId,
        remoteVideoRef,
        localStream: stream,
      })
    }
    fn()
  }, [])
  return (
    <div className="meeting">
      <div className="left">
        <div className="header">
          <div className="title">{peopleNumber}</div>
          <div className="close">×</div>
        </div>
        <div className="list">
          <table />
          {userList.map((item, idx) => {
            return (
              <div className="item" key={idx}>
                <div className="introduce">{item.username.slice(0, 1)}</div>
                <div className="name">
                  {item.username}
                  {item.userId === userId && '（我）'}
                </div>
                <div className=""></div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <video ref={videoRef} width="640" height="480" autoPlay></video>
        <video ref={remoteVideoRef} width="640" height="480" autoPlay></video>
      </div>
    </div>
  )
}

export default Meeting
