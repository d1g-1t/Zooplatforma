import { useCallback, useState } from 'react';

const useFormHook = () => {
  const [values, setValues] = useState({});
  const [error, setErrors] = useState({});
  const [isValid, setisValid] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    // Добавить в объект значений, значение текущего поля
    setValues({
      ...values,
      [name]: value,
    });
    // Изменить объект ошибок по такому же принципу.
    // У инпута использовать метод validationMessage
    setErrors({
      ...error,
      [name]: input.validationMessage,
    });
    // У элемента формы есть метод checkValidity.
    // Используйте его для переключения третьего стейта.
    // Этот стейт используется для блокировки кнопки, когда форма не валидна
    setisValid(input.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setisValid(newIsValid);
    },
    [setValues, setErrors, setisValid]
  );

  return {
    values,
    error,
    handleChange,
    resetForm,
    isValid,
  };
};

export default useFormHook;
