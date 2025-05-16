import { cartAction } from "./cart-slice";
import { uiSliseAction } from "./ui-slice";

export const fetchCartData=()=>{
    return async dispatch=>{
        const fetchData=async ()=>{
            const response=await fetch('https://food-72908-default-rtdb.firebaseio.com/cart.json')

            if(!response.ok){
                throw new Error ("could not fetching Data")
            }
            const data =await response.json();
            return data
        };

        try {
        const cartData= await fetchData();
        dispatch(cartAction.replaceCart({
            items:cartData.items||[],
            totalQuantity:cartData.totalQuantity
        }))

        } catch (error) {
            dispatch(uiSliseAction.showNotification({
                status:'error',
                title:'Error...',
                message:'Fetching Cart data failed!!'
              })) 
        }


    }
}

export const sendCartData=(cart)=>{
    return async (dispatch)=>{
        dispatch(uiSliseAction.showNotification({
            status:'pending',
            title:'Sending...',
            message:'Sending Cart data!!'
          }));
        const sendRequest=async()=>{
            const response=await fetch('https://food-72908-default-rtdb.firebaseio.com/cart.json',{method:'PUT',body:JSON.stringify(cart)});
            if(!response.ok){
                throw new Error ('sending data is Failed!! ')
                }
        } ;
        try {
           await sendRequest();
           dispatch(uiSliseAction.showNotification({
            status:'success',
            title:'Success...',
            message:'Sending Cart data Successfully!!'
          }))
        } catch (error) {
            dispatch(uiSliseAction.showNotification({
                status:'error',
                title:'Error...',
                message:'Sending Cart data failed!!'
              })) 
        } 
    }
    }