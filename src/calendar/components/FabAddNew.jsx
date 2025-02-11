import React from 'react'
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { addHours } from 'date-fns';

export const FabAddNew = () => {

  const {openDateModal} = useUiStore();
  const { setActiveEvent}=useCalendarStore();

  const handleOpenModal = () => {
    setActiveEvent({
          title: '',
          notes: '',
          start: new Date(),
          end: addHours(new Date(), 2),
          bgColor: '#fafafa',
          user: {
            _id: '123',
            name: 'Jurgem',
          },
    });
    openDateModal();
  }
  return (
    <button className='btn btn-primary fab'
    onClick={handleOpenModal} >
      <i className='fas fa-plus'></i>
    </button>
   
  )
}
