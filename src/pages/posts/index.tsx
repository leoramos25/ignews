import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time>03 de janeiro de 2022</time>
            <strong>Titulo qualquer para teste</strong>
            <p>paragrafo qualquer para teste paragrafo qualquer para teste paragrafo qualquer para teste paragrafo qualquer para teste paragrafo qualquer para teste </p>
          </a>
          <a href='#'>
            <time>03 de janeiro de 2022</time>
            <strong>Titulo qualquer para teste</strong>
            <p>paragrafo qualquer para teste paragrafo qualquer para teste paragrafo qualquer para teste paragrafo qualquer para teste paragrafo qualquer para teste </p>
          </a>
          <a href='#'>
            <time>03 de janeiro de 2022</time>
            <strong>Titulo qualquer para teste</strong>
            <p>paragrafo qualquer para teste paragrafo qualquer para teste paragrafo qualquer para teste paragrafo qualquer para teste paragrafo qualquer para teste </p>
          </a>
        </div>
      </main>
    </>
  );
}