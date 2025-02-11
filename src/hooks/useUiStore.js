import { useDispatch, useSelector, useStore } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
    const dispatch = useDispatch();

 const {isDateModalOpen} = useSelector((state) => state.ui);

 const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const toggleDateModal = () => {

    (isDateModalOpen) 
     ? closeDateModal()
     : openDateModal()
    
  }

 return {
    //* Propieadades
    isDateModalOpen,

    //* Métodos
    openDateModal,
    closeDateModal,
    toggleDateModal
}
    };     