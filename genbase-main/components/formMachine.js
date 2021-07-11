import Router from 'next/router';
import { Machine, assign } from 'xstate';
import { notification } from 'antd';
import hstore from 'pg-hstore';

import { createFormResponse, getForm, getFormResponse, updateFormResponse } from 'api/form';
import { parseFormResponse } from '_server-utils/formResponseParser';

const initialLoading = async (id, formId) => {
  const selectedFormResponse = id ? await getFormResponse(id) : {};

  return Promise.all([
    getForm(formId || selectedFormResponse?.activity),
    Promise.resolve(selectedFormResponse)
  ]);
};

const formMachine = Machine({
  id: 'formMachine',
  initial: 'loading',
  context: {
    selectedForm: [],
    formResponse: {}
  },
  states: {
    loading: {
      invoke: {
        src: ({ id, formId }) => initialLoading(id, formId),
        onDone: {
          target: 'ready',
          actions: [
            assign({
              selectedForm: (_, { data }) => data[0],
              formResponse: ({ formInstance }, { data }) => {
                const formResponse = data[1]?.data;
                const parsedFormResponse = parseFormResponse(formResponse || {});
                formInstance.setFieldsValue(parsedFormResponse);
                return formResponse;
              }
            })
          ]
        },
        onError: 'ready'
      }
    },
    ready: {
      on: {
        SUBMIT_FORM: {
          target: 'submitForm',
          actions: assign({
            formResponse: ({ formId }, { payload }) => ({
              dept: 1, //TODO: Update this to valid dept ID
              activity: formId,
              data: hstore().stringify(payload)
            })
          })
        }
      }
    },
    submitForm: {
      invoke: {
        src: ({ id, formResponse }) => {
          return id ? updateFormResponse(id, formResponse) : createFormResponse(formResponse);
        },
        onDone: {
          target: 'ready',
          actions: ({ id }, { data }) => {
            id ? null : Router.push(`/forms/edit/${data.id}`);
            notification.success({
              message: 'Submit Form!',
              description: 'Successful Form submission!'
            });
          }
        },
        onError: {
          target: 'ready',
          actions: () =>
            notification.error({
              message: 'Something is wrong!',
              description: 'Please try again.'
            })
        }
      }
    }
  }
});

export default formMachine;
