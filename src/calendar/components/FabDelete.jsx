import React from 'react'
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { addHours } from 'date-fns';

export const FabDelete = () => {

  const {openDateModal} = useUiStore();
  const { startdeletingEvent,hasEventSelected}=useCalendarStore();

  const haandleDelete = () => {
    startdeletingEvent();
  }


  return (
    <button className='btn btn-danger fab-danger'
    style={{display: hasEventSelected ? 'block' : 'none'}}
     onClick={haandleDelete} >
      <i className='fas fa-trash-alt'></i>
    </button>
   
  )
}
