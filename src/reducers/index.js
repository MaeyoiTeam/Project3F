import { combineReducers} from 'redux';
import fetchReducer from './fetchReducer';
import authReducer from "./authReducer";
import rankReducer from './rankReducer';
import questReducer from './questReducer';
import historyReducer from './historyReducer';
import modalReducer from './modalReducer';
import nav from './nav';
import notification from './notification';
//can add more method-------------here
export default combineReducers({
    questReducer,   // ส่วนรวบรวม เควสลิสที่ยังกำลังทำอยู่
    fetchReducer,   // ส่วนรวบรวม ข้อมูลที่เรียกในหน้าstack เช่น Quest,
    rankReducer,    // ส่วนรวบรวม  ข้อมูลRanking  //?หรือไม่ควรเป็นหน้าหลัก?
    authReducer,    // ส่วนรวบรวม ข้อมูลauth Profileต่างๆ
    historyReducer, // ส่วนรวบรวม ข้อมูลเควสลิสที่ทำสำเร็จแล้ว //?น่าจะลดทอนได้
    nav,            //ส่วนรวบรวมของNavigator
    modalReducer,   //ส่วนแสดง Modal (สามารถแสดงได้ทุกหน้า)
    notification,   //ส่วนรวบรวม Notification
})