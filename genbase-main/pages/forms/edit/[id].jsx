import AppLayout from '_components/AppLayout';
import FormContainer from '_components/FormContainer';
import Head from 'next/head';
import { useRouter } from 'next/router';

const FormResponseShowPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Plus Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>{id && <FormContainer id={id} />}</AppLayout>
    </div>
  );
};

export default FormResponseShowPage;
