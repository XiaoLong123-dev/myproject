// 检查是否拥有删除用户的权限
import store from '@/store/index'

export default{
    methods:{
        checkPermision(key){
            const {userInfo}=store.state.user;
            if(userInfo.roles.points&&userInfo.roles.points.length){
                return userInfo.roles.points.some(item=>item==key);
            }
            return false
        }
    }
}
