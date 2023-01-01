import Head from 'next/head';
import App from '../components/App';

export default function Index() {
  return (
    <>
    <Head>
      <title>汉字自动拆分系统</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {/* <Users /> */}
    <App />
    </>
  )
}