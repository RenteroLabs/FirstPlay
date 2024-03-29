import type { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/index.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Firstplay</title>
        <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={styles.main}>
        <div className={styles.topCover}></div>
        <div className={styles.headerBox}>
          <div className={styles.logoBox}>
            <Image src="/logo.png" layout='fill' objectFit='contain' />
          </div>
          <p className={styles.divider}></p>
          <p className={styles.solgan}>Be the FIRST to play and earn.</p>
          <div className={styles.socialMedias}>
            <Image src="/twitter logo.png" layout='fill' objectFit='contain' />
            <Image src="/discord logo.png" layout='fill' objectFit='contain' />
            <Image src="/telegram logo.png" layout='fill' objectFit='contain' />
          </div>
        </div>
        <div className={styles.introBox}>
          <span className={styles.currency1}>
            <Image src="/currency1.png" width="97" height="99" />
          </span>
          <span className={styles.currency2}>
            <Image src="/currency2.png" width="76" height="61" />
          </span>
          <span className={styles.currency3}>
            <Image src="/currency3.png" width="74" height="71" />
          </span>
          <div className={styles.introduction}>
            <h3>First Play</h3>
            <p>A blockchain game platform</p>
            <p>that let you try out</p>
            <p>the latest games.</p>
            <p>Be the FIRST to play and earn.</p>
          </div>
          <div className={styles.gamePlayImg}>
            <Image
              src="/game material.png"
              layout="fill"
            />
          </div>
        </div>
      </section>

      <section className={styles.featureBox}>
        <div className={styles.featureTitle}>
          0 Barriers to
          entry blockchain game
        </div>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <Image src="/feature1.png" width="200" height="200" />
            <h4>0 Barriers</h4>
            <p>Experience the game before buy NFTs</p>
          </div>
          <div className={styles.featureDivider}></div>
          <div className={styles.featureItem}>
            <Image src="/feature2.png" width="200" height="200" />
            <h4>Rewards</h4>
            <p>Earn rewards via Free Trial</p>
          </div>
          <div className={styles.featureDivider}></div>
          <div className={styles.featureItem}>
            <Image src="/feature3.png" width="200" height="200" />
            <h4>Earn</h4>
            <p>The easiest way to earn in the blockchain game</p>
          </div>
        </div>
      </section>

      <section className={styles.usageBox}>
        <div className={styles.usageTitle}>
          Easy from getting started to mastering
          blockchain game
          <span className={styles.material1}></span>
          <span className={styles.material2}></span>
        </div>
        <div className={styles.usageList}>
          <div className={styles.usageItem}>
            <Image src="/usage1.png" width="200" height="200" />
            <h4>Game guide</h4>
            <p>Step-by-step guide to get started playing the game from scratch</p>
          </div>
          <div className={styles.usageItem}>
            <Image src="/usage2.png" width="200" height="200" />
            <h4>Walkthrough</h4>
            <p>The game master&#39;s  walkthrough will make you proficient in the game</p>
          </div>
          <div className={styles.usageItem}>
            <Image src="/usage3.png" width="200" height="200" />
            <h4>Get advice</h4>
            <p>Get advice directly from advanced players on the platform</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <h3>Powered By Rentero</h3>
        <p>Rentero is an open-source NFTs rental protocol built to maximize the utility of NFTs</p>
      </footer>

    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}