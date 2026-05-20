import { useState} from 'react';

function useForm(valoresIniciais) {
    const [values, setValues] = useState(valoresIniciais);
  
    function setValue(chave, valor) {
      setValues({
        ...values,
        [chave]: valor,
      });
    }
  
    function HandlerChange(infosDoEvento) {
      setValue(
        infosDoEvento.target.getAttribute('name'),
        infosDoEvento.target.value,
      );
    }
  
    function  clearForm() {
      setValues(valoresIniciais);
    }
  
    return {
      values,
      HandlerChange,
      clearForm
    }
  };

  export default useForm;