import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent,onUpdateEvent,onDeleteEvent,onLoadEvents } from "../store/calendar/calendarSlice";
import calendarApi from "../../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";

export const useCalendarStore = () => {
    const dispatch = useDispatch();

    const {events,activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);


    const setActiveEvent = (calendarEvent) => {
         dispatch(onSetActiveEvent(calendarEvent));
      }

      const startSavingEvent = async(calendarEvent) => {

         // todo: update event
         if(calendarEvent.id){
            // actualizar
            const {data} = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

            dispatch(onUpdateEvent({...calendarEvent,user}));
         }else{
            // crear
            const {data}  = await calendarApi.post('/events', calendarEvent);
           // console.log(data);
         
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id,user: user}));
         }
      }

      const startdeletingEvent = async() => {
         // TODO: LLEGA AL BACKEND

         try {
            const {data} = await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent());

         } catch (error) {
            console.log('error al eliminar')
         }

      }

      const startLoadingEvents = async() => {
         try {
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
           // console.log(events);
           dispatch( onLoadEvents(events));
           
         } catch (error) {
            console.log(error);
            
         }
    
      }



 return{
 //* properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent, // true or false

    //* methods 
    setActiveEvent,
    startSavingEvent,
    startdeletingEvent,
    startLoadingEvents
 }
}
