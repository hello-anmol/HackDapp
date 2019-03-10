const initial={
    data:{
        tx:'0x0'
    }
}
const reducers=(state=initial,action)=>{
    if (action.types ==="ADDRESS_STORED"){
        return{
            ...state,
            data:{
                tx:action.payload
            }
        }
    }else{
        return state;
    }
}
export default reducers;