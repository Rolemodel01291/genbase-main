import AppLayout from '_components/AppLayout';
import FormContainer from '_components/FormContainer';
import { useRouter } from 'next/router';

const FormResponseShowPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout>
      {id && <FormContainer id={id} />}
    </AppLayout>
  );
};

export default FormResponseShowPage;
