import Head from "next/head";
import Image from "next/image";
import { defaultLanguage, dropDownLanguages } from "../src/languages";
import styles from "../styles/Home.module.css";
import React, {
  useState,
  useEffect,
} from "react";
import * as Cookies from "../src/cookies";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const [language, setLanguage] = useState(defaultLanguage);
  useEffect(() => {
    const storedLocale = Cookies.getLanguage();
    if (storedLocale) {
      setLanguage(storedLocale);
    }
  }, [language]);
  
  const changeSelectedLanguage = (e) => {
      console.log(e.target.value)
      Cookies.setLanguage(e.target.value);
      setLanguage(e.target.value);

      router.replace(
        {
          pathname: router.asPath,
        },
        {
          pathname: router.asPath,
        },
        { locale: e.target.value }
      );
    };
  return (
    <div className={styles.container}>
      <Head>
        <title>Internationalised</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <select value={language} onChange={(e) => changeSelectedLanguage(e)} style={{height:"30px"}}>
          {dropDownLanguages.map((l, index) => (
            <option key={index} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
        <h1 className={styles.title}>
          {t("home:welcome")} <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          {t("home:getStarted")}{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{t("home:document")} &rarr;</h2>
            <p>{t("home:documentText")}</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>{t("home:learn")} &rarr;</h2>
            <p>{t("home:learnText")}</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>{t("home:example")} &rarr;</h2>
            <p>{t("home:exampleText")}</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>{t("home:deploy")} &rarr;</h2>
            <p>{t("home:deployText")}</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("home:poweredBy")}{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
      // Will be passed to the page component as props
    },
  };
}
