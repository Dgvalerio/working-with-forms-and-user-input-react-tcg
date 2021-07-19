import React, { useState } from 'react';

const useInputValidation = (validation) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = validation(value);
  const hasError = touched && !isValid;

  const valueChangeHandler = ({ target }) => {
    setValue(target.value);
    setTouched(true);
  };

  const inputBlurHandler = () => setTouched(true);

  const resetHandler = () => {
    setValue('');
    setTouched(false);
  };

  return {
    thisValue: value,
    valueIsValid: isValid,
    inputHasError: hasError,
    onChangeValue: valueChangeHandler,
    onInputBlur: inputBlurHandler,
    onReset: resetHandler,
  };
};

const BasicForm = () => {
  const {
    thisValue: firstName,
    valueIsValid: firstNameIsValid,
    inputHasError: firstNameHasError,
    onChangeValue: firstNameHandler,
    onInputBlur: firstNameBlurHandler,
    onReset: firstNameReset,
  } = useInputValidation((value) => value.trim() !== '');

  const {
    thisValue: lastName,
    valueIsValid: lastNameIsValid,
    inputHasError: lastNameHasError,
    onChangeValue: lastNameHandler,
    onInputBlur: lastNameBlurHandler,
    onReset: lastNameReset,
  } = useInputValidation((value) => value.trim() !== '');

  const {
    thisValue: email,
    valueIsValid: emailIsValid,
    inputHasError: emailHasError,
    onChangeValue: emailHandler,
    onInputBlur: emailBlurHandler,
    onReset: emailReset,
  } = useInputValidation((value) => value.includes('@'));

  const formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    console.log({ firstName, lastName, email });

    firstNameReset('');
    lastNameReset('');
    emailReset('');
  };

  const firstNameClasses = `form-control ${firstNameHasError && 'invalid'}`;
  const lastNameClasses = `form-control ${lastNameHasError && 'invalid'}`;
  const emailClasses = `form-control ${emailHasError && 'invalid'}`;

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={firstNameHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">Insert a valid value for first name.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={lastNameHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p className="error-text">Insert a valid value for last name.</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={emailHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className="error-text">Insert a valid value for e-mail.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BasicForm;
