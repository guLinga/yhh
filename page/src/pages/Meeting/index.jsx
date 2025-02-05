import { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { initMetia } from '../utils/media'
import { initSocket } from '../utils/socket'
import './index.less'

const Meeting = () => {
  const userList = useSelector((store) => store.userList.userList)
  console.log('data', userList)

  // 参会者人数
  const peopleNumber = useMemo(() => {
    return `参会者（${userList.length}）`
  }, [userList])

  // 开启视频
  const [video, setVideo] = useState(false)
  // 开启音频
  const [audio, setAudio] = useState(false)
  const videoRef = useRef(null)
  useEffect(() => {
    if (video || audio) {
      initMetia({ video: false, audio: true }, videoRef)
    }
  }, [video, audio])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const name = searchParams.get('name')
    initSocket({ username: name, room: '1' })
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
          {userList.map((item) => {
            return (
              <div className="item">
                <div className="introduce">{item.username.slice(0, 1)}</div>
                <div className="name">{item.username}</div>
                <div className=""></div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right"></div>
    </div>
  )
}

export default Meeting
