import React from 'react'
import FormHeader from './header'
import Formbody from './form';
import Formfooter from './footer';

const Form = ({ title, subtitle, fields, handleSubmit, isSubmitDisabled, err, redirectTxt, redirectAnchor, redirectLink }) => {
    return (
        <div id="form-wrapper" className="bg-white rounded-lg w-[340px] p-6">
            <FormHeader {...{ title, subtitle }} />
            <Formbody {...{ fields, handleSubmit, isSubmitDisabled }} />
            <Formfooter {...{ err, redirectTxt, redirectAnchor, redirectLink }} />
        </div>
    )
}

export default Form