import { addHours, differenceInSeconds } from 'date-fns';
import { act, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker,{registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import  swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  registerLocale('es', es);
  Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [formSubmitteed, setformSubmitteed] = useState(false)
    const {isDateModalOpen,closeDateModal} = useUiStore();
    const {activeEvent,startSavingEvent} = useCalendarStore();
    
   //  const [isOpen, setIsOpen] = useState(true); // se reemplaza por el hook useUiStore

 const [formValues, setFormValues] = useState({
    title: 'Evento',
    notes: 'njnkj',
    start: new Date(),
    end: addHours(new Date(), 2),
 })


   const titleClass =  useMemo(() => { 
        if(!formSubmitteed) return '';
        return (formValues.title.trim().length <= 0) ? 'is-invalid' : 'is-valid';
    },
    [ formValues.title ,formSubmitteed])


useEffect(() => {
if(activeEvent !== null){
    setFormValues({...activeEvent});
}
}, [activeEvent])


 const onInputChange = ({ target }) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value
    })
    }

    // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
 const onCloseMondal = () => {
    closeDateModal()
 }

 const onDateChanged = (event, chaging) => {
    setFormValues({
        ...formValues,
        [chaging]: event
    })
}


const onSubmmit = async(event) => {
    event.preventDefault();
    setformSubmitteed(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if(isNaN(difference) || difference <= 0){
        swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
        return;
    }
    if(formValues.title.trim().length <= 0){
        swal.fire('Error', 'El Titulo es requerido', 'error');
        return;
    }
    //TODO: grabar en el backend
   await startSavingEvent(formValues);
    closeDateModal(); 
    setformSubmitteed(false);
}

  return (
    <Modal
    isOpen={isDateModalOpen}
    onRequestClose={onCloseMondal}
    style={customStyles}
    className="modal"
    overlayClassName={"modal-fondo"}
    closeTimeoutMS={200}
    >
        <h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={onSubmmit}>

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <DatePicker selected={formValues.start}
        onChange={ (event) =>onDateChanged(event, 'start')}
        dateFormat={"dd/MM/yyyy HH:mm"}
        className='form-control '  wrapperClassName="w-100"
        showTimeSelect
        locale={"es"}
        timeCaption='Hora'
         />

    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <DatePicker selected={formValues.end}
        minDate={formValues.start}
        onChange={ (event) =>onDateChanged(event, 'end')}
        dateFormat={"dd/MM/yyyy HH:mm"}
        className='form-control'  wrapperClassName="w-100"
        showTimeSelect
        locale={"es"}
        timeCaption='Hora'
        />

    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            value={formValues.title}
            autoComplete="off"
            onChange={onInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}

        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>

    </Modal>

  )
}
