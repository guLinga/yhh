import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userList: [],
}

// 创建一个 Slice
export const counterSlice = createSlice({
  name: 'userList',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setUserList: (state, token) => {
      state.userList = token.payload
    },
  },
})
// 导出加减的方法
export const { setUserList } = counterSlice.actions

// 默认导出
export default counterSlice.reducer
