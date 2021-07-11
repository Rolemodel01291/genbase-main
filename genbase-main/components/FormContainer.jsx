import PropTypes from 'prop-types';
import { renderForm } from '@straitsit/dpo-form-components';
import { useMachine } from '@xstate/react';
import { Form } from 'antd';
import { createContext } from 'react';

import formMachine from '_components/formMachine';
import { apiFunctions } from '_server-utils/formContextApi';

const FormContainer = ({ id, formId }) => {
  const [formInstance] = Form.useForm();
  const [current, send] = useMachine(formMachine, {
    context: { id, formId, formInstance }
  });

  const {
    context: { selectedForm }
  } = current;

  const BuilderContext = createContext();

  const onFinish = (payload) => {
    send('SUBMIT_FORM', { payload });
  };

  return (
    <div>
      <div>
        <p style={{ fontSize: '1.25rem', lineHeight: '2rem' }}>{selectedForm.name}</p>
      </div>

      <div
        style={{
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '0.25rem'
        }}>
        <BuilderContext.Provider value={apiFunctions(formInstance)}>
          <Form form={formInstance} layout="vertical" onFinish={onFinish}>
            {renderForm(selectedForm.form_json || [], BuilderContext, formInstance)}
          </Form>
        </BuilderContext.Provider>
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  id: PropTypes.string,
  formId: PropTypes.string
};

export default FormContainer;
