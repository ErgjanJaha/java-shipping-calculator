import React from "react";
import "./index.less";
import {Field, reduxForm} from 'redux-form';

const validate = (values) => {
    const errors = {};

    if (!values.fullname) {
        errors.fullname = 'Please provide a name';
    }

    if (!values.weight && typeof values.weight !== "number") {
        errors.weight = 'Please provide the weight in full numbers only';
    }

    if (!values.colour) {
        errors.colour = 'Please provide a colour using the colour picker';
    }

    if (!values.country) {
        errors.country = 'Please provide one of the following countries: sweden, china, australia,brazil';
    }

    return errors;
}
const renderField = ({input, label, type, placeholder, meta: {touched, error, warning}}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input}
                   type={type}
                   placeholder={placeholder}
                   className="CreateEntry-input"
            />
            {touched && ((error && <div className="CreateEntry-error">{error}</div>) || (warning &&
                <span>{warning}</span>))}
        </div>
    </div>
)

const SuccessMessage = () => (
    <div className="successMessage">
        Added this successfully
    </div>
)

const CreateEntry = ({createEntry, handleSubmit, creatingEntry}) => {
    let addedMessage = creatingEntry === false ? <SuccessMessage /> : '';
    return (
        <div>
            {addedMessage}
            <form
                className="CreateEntry-form"
                onSubmit={handleSubmit(createEntry)}
            >
                <Field
                    label="Receiver"
                    name="fullname"
                    type="text"
                    required
                    component={renderField}
                />
                <Field
                    label="Weight"
                    name="weight"
                    type="text"
                    required
                    component={renderField}
                />
                <Field
                    label="Colour"
                    name="colour"
                    type="color"
                    value="#000"
                    placeholder="Click to show colour picker"
                    required
                    component={renderField}
                />
                <label>Country</label>
                <Field
                    name="country"
                    type="text"
                    className="CreateEntry-select"
                    placeholder="Country"
                    component="select"
                >
                    <option>Choose a country</option>
                    <option value="australia">Australia</option>
                    <option value="brazil">Brazil</option>
                    <option value="china">China</option>
                    <option value="sweden">Sweden</option>
                </Field>
                <button
                    type="submit"
                    className="CreateEntry-button"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default reduxForm({
    form: 'entry',
    validate,
})(CreateEntry);