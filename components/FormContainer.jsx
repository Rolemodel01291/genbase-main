import formMachine from '_components/formMachine';
import { apiFunctions } from '_server-utils/formContextApi';
import { renderForm } from '@straitsit/dpo-form-components';
import { useMachine } from '@xstate/react';
import {
  Card, Col, Form, Row, Typography
} from 'antd';
import PropTypes from 'prop-types';
import { createContext } from 'react';

const { Title } = Typography;

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
    <>
      <Title>{selectedForm.name}</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card />
        </Col>
        <Col span={18}>
          <Card>
            <BuilderContext.Provider value={apiFunctions(formInstance)}>
              <Form form={formInstance} layout="vertical" onFinish={onFinish}>
                {renderForm(selectedForm.form_json || [], BuilderContext, formInstance)}
              </Form>
            </BuilderContext.Provider>
          </Card>
        </Col>
      </Row>
    </>
  );
};

FormContainer.propTypes = {
  id: PropTypes.string,
  formId: PropTypes.string
};

export default FormContainer;
