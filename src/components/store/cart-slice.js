import { createSlice } from "@reduxjs/toolkit";

const initialState={items:[],totalQuantity:0,change:false}
const cartSlice=createSlice(
  {  name:'cart',
    initialState,
    reducers:{

        replaceCart(state,action){
            state.totalQuantity=action.payload.totalQuantity
            state.items=action.payload.items
        },

        addItemToCart(state,action){
        const newItem=action.payload
        const exestingItem=state.items.find(item=>item.id===newItem.id)
       state.totalQuantity++;
       state.change=true;
        if(!exestingItem){
            state.items.push({
                id:newItem.id,
                price:newItem.price,
                quantity:1,
                totalPrice:newItem.price,
                name:newItem.title
            });
        
        }else{
            exestingItem.quantity++;
            exestingItem.totalPrice=exestingItem.totalPrice+newItem.price;
        }
    },
        removeItemFromCart(state,action){
            const id=action.payload;
            const exestingItem=state.items.find(item=>item.id===id)
            state.totalQuantity--;
            state.change=true;
            if(exestingItem.quantity===1){
                 state.items=state.items.filter(item=>item.id!==id)
            }else{
                exestingItem.quantity--;
                exestingItem.totalPrice=exestingItem.totalPrice-exestingItem.price
            }
        }
    }
  }

)


export const cartAction=cartSlice.actions;
export default cartSlice;