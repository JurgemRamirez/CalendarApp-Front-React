import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar } from '../components/Navbar'
import { localizer } from '../../helpers/calendarLocalizer'
import { addHours } from 'date-fns'
import { getMessages } from '../../helpers/getMessages'
import { CalendarEvent } from '../components/CalendarEvent'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useDispatch } from 'react-redux'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'
import { useAuthStore } from '../../hooks/useAuthStore'

export const CalendarPage = () => {

  const {openDateModal} = useUiStore();
const {user} = useAuthStore();
const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

const dispatch = useDispatch()
const {events,setActiveEvent,startLoadingEvents} = useCalendarStore();


useEffect(() => {
  startLoadingEvents();
}, [])

  const eventStyleGetter = (event, start, end, isSelected) => { 

    const isMyEvent = (user.uid === event?.user?._id) || (user.uid === event.user?.uid) 

    const style = {
      backgroundColor: isMyEvent ? '#367CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }
    return {
      style
    }
  }

  const onDoubleClick = (e) => {
    // console.log('onDoubleClick', e)
    openDateModal();
  }
  
  const onSelectEvent = (e) => {
    console.log('onSelectEvent', e)
   setActiveEvent(e)
  }
  const onViewChange = (e) => {
  localStorage.setItem('lastView', e) 
  setLastView(e)
 }

  return (

   <>
      <Navbar/>

     <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc(100vh - 80px)' }}
      messages={getMessages()}
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEvent,
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      
    />

    <CalendarModal/>
    <FabAddNew/>
    <FabDelete/>
   </>
  )
}
