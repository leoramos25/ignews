import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';

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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100
  })

  console.log(response)

  return {
    props: {}
  }
}