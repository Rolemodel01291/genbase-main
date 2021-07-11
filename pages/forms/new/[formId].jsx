import AppLayout from '_components/AppLayout';
import FormContainer from '_components/FormContainer';
import Head from 'next/head';
import { useRouter } from 'next/router';

const FormResponseShowPage = () => {
  const router = useRouter();
  const { formId } = router.query;

  return (
    <AppLayout>{formId && <FormContainer formId={formId} />}</AppLayout>
  );
};

export default FormResponseShowPage;
