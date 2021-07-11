import { useRouter } from 'next/router'
import Head from 'next/head'

import AppLayout from '_components/AppLayout'

const ActivitiesPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>Plus Form</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        
      </AppLayout>
    </div>
  )
}

export default ActivitiesPage;
