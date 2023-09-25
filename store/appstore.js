import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '@/fetures/reducer'
export default configureStore({
  reducer: {counter: counterSlice},
})