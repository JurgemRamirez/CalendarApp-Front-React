import { createSlice } from '@reduxjs/toolkit';
import { onLogout } from '../auth/authSlice';
//import { addHours } from 'date-fns';


// const tempEvent = 
//   {
//     id: new Date().getTime(),
//     title: 'My event',
//     notes: 'This is my event',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//       id: '123',
//       name: 'Jurgem',
//     },
//   }


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
      isLoadingEvents:true,
        events:[
           // tempEvent
        ],
        activeEvent: null,
   },
    reducers: {
     onSetActiveEvent: (state, action) => {
        state.activeEvent = action.payload;
      },
      onAddNewEvent: (state, {payload}) => {
        state.events.push(payload);
        state.activeEvent = null; // Clear active event
      },
      onUpdateEvent: (state, {payload}) => {
        state.events = state.events.map(event =>{ 
          if (event.id === payload.id) {
            return payload; 
          }
          return event; 
        } )
        
  
      },
      onClearActiveEvent: (state) => {
        state.activeEvent = null;
      },
   
      onDeleteEvent: (state) => {
        if(state.activeEvent){
          state.events = state.events.filter((e) => e.id !== state.activeEvent.id);
          state.activeEvent = null;
        }

      },

      onLoadEvents: (state, {payload = []}) => {
        state.isLoadingEvents = false;
        // state.events = payload;
        payload.forEach(event => { // Add events to the state
          const exist = state.events.some(dbEvent => dbEvent.id === event.id); // Check if the event already exists
          if(!exist){
            state.events.push(event);
          }
        });

      },
      onLogoutCalendar(state){
        state.events = [];
        state.activeEvent = null;
        state.isLoadingEvents = true;
      }
    }
})
export const { 
    onSetActiveEvent,
    onClearActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar
 } = calendarSlice.actions;