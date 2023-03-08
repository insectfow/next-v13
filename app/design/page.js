'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import Logo from '../../public/design/header-logo-samsung-design-svg.svg';
import FooterLogo from '../../public/design/footer-logo-samsung-design-svg.svg';
import Section1Image from '../../public/design/samsung-over-the-horizon-sec-kv.jpg';
import Section1Image2 from '../../public/design/samsung-over-the-horizon-sec-kv-m2.jpg';
import LangImage from '../../public/design/header-lang-icn2022.svg';
import searchImage from '../../public/design/header-search-icn2022.svg';
import Section2Contents1 from '../../public/design/image1.jpg';
import Section2Contents2 from '../../public/design/image2.jpg';
import Section2Contents3 from '../../public/design/image3.jpg';
import Section2Contents4 from '../../public/design/image4.jpg';
import Section2Contents5 from '../../public/design/image5.jpg';
import Section2Contents6 from '../../public/design/image6.jpg';
import Section2Contents7 from '../../public/design/image7.jpg';
import Section2Contents8 from '../../public/design/image8.jpg';
import Section2Contents9 from '../../public/design/image9.jpg';
import Section50 from '../../public/design/section50.jpg';
import Section51 from '../../public/design/section51.jpg';
import Section3Image from '../../public/design/section3.jpg';
import Count from '../../components/Count';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const pageRef = useRef([]);
  useEffect(() => {
    let options = {
      root: null,
      rooMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.sdSection2ContentsActive);
      } else {
        entry.target.classList.remove(styles.sdSection2ContentsActive);
      }
    }, options);
    pageRef.current.map((v) => {
      observer.observe(v);
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <>
      <title>public 1</title>
      <div className={styles.sd}>
        <header className={styles.sdHeader}>
          <div className={styles.sdHeaderContainer}>
            <h1 className={styles.sdHeaderContainerLogo}>
              <Link href="/design" title="home">
                <Image src={Logo} width={139} height={41} alt="logo" priority />
              </Link>
            </h1>
            <nav className={styles.sdHeaderContainerNav}>
              <ul>
                <li>
                  <Link href="/design" title="Our Stories">
                    Our Stories
                  </Link>
                </li>
                <li>
                  <Link href="/design" title="About Us">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/design" title="Career">
                    Career
                  </Link>
                </li>
                <li>
                  <Link href="/design" title="News">
                    News
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.sdHeaderContainer}>
            <nav className={styles.sdHeaderContainerHashNav}>
              <Count
                list={[
                  {
                    title: '#A_Sense_of_Color',
                  },
                  {
                    title: '#Expanding_the_World',
                  },
                  {
                    title: '#Inspire_for_the_Better',
                  },
                  {
                    title: '#Living_Smarter',
                  },
                  {
                    title: '#A_Sense_of_Color',
                  },
                ]}
              ></Count>
              {/* <ul>
                <li>
                  <Link href="/design" title="A_Sense_of_Color">
                    #A_Sense_of_Color
                  </Link>
                </li>
                <li>
                  <Link href="/design" title="Expanding_the_World">
                    #Expanding_the_World
                  </Link>
                </li>
                <li>
                  <Link href="/design" title="Living_Smarter">
                    #Living_Smarter
                  </Link>
                </li>
                <li>
                  <Link href="/design" title="Inspire_for_the_Better">
                    #Inspire_for_the_Better
                  </Link>
                </li>
                <li>
                  <Link href="/design" title="A_Sense_of_Color">
                    #A_Sense_of_Color
                  </Link>
                </li>
              </ul> */}
            </nav>
            <div className={styles.sdHeaderContainerBtnNav}>
              <button title="search">
                <Image width={24} height={24} src={searchImage} alt="searchicon"></Image>
              </button>
              <button title="lang">
                <Image width={24} height={24} src={LangImage} alt="langicon"></Image>
              </button>
            </div>
            <div className={styles.sdHeaderContainerMnav}>
              <button title="search">
                <Image width={24} height={24} src={searchImage} alt="searchicon"></Image>
              </button>
              <button title="menu" className={styles.sdHeaderContainerMnavMemu}></button>
            </div>
          </div>
        </header>
        <section className={styles.sdSection1}>
          <div className={styles.sdSection1TopText}>
            <h3>Over the Horizon</h3>
            <p>The Samsung Galaxy Sound Branding Story</p>
          </div>
          <figure className={styles.sdSection1Image}>
            <Link href="/design">
              <Image width={1920} height={1080} src={Section1Image} alt="setction1Image" />
              <Image width={750} height={1000} src={Section1Image2} alt="section1Image2" />
            </Link>
          </figure>
          <div className={styles.sdSection1BotText}>
            <p>
              Over the Horizon is Samsung Galaxy’s brand sound that has captured the sentiments and
              trends of each era through its colorful variations since 2011. This is the sound
              design story for the latest iteration of this symbolic tune.
            </p>
            <span>Our Stories | Mar 2, 2023</span>
          </div>
        </section>
        <section className={styles.sdSection2}>
          <div className={styles.sdSection2TopText}>
            <h4>Latest</h4>
          </div>
          <div className={styles.sdSection2Contents} ref={(el) => (pageRef.current[0] = el)}>
            <div>
              <div>
                <figure>
                  <Link href="/design">
                    <Image
                      width={1920}
                      height={2000}
                      src={Section2Contents1}
                      alt="section2Contents1"
                    ></Image>
                  </Link>
                </figure>
                <div>
                  <div>
                    <h5>Create the Essentials</h5>
                    <p>Samsung Galaxy S23 Series Design Story</p>
                  </div>
                  <div>
                    <p>
                      Even through continuous transformation, the essence remains the same. Galaxy
                      S23 series’ design story captures the Samsung’s vision for the future.
                    </p>
                    <span>Our Stories | Feb 16, 2023</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <figure>
                  <Link href="/design">
                    <Image
                      width={1920}
                      height={1280}
                      src={Section2Contents2}
                      alt="section2Contents1"
                    ></Image>
                  </Link>
                </figure>
                <div>
                  <div>
                    <h5>Create the Essentials</h5>
                    <p>Samsung Galaxy S23 Series Design Story</p>
                  </div>
                  <div>
                    <p>
                      Even through continuous transformation, the essence remains the same. Galaxy
                      S23 series’ design story captures the Samsung’s vision for the future.
                    </p>
                    <span>Our Stories | Feb 16, 2023</span>
                  </div>
                </div>
              </div>
              <div>
                <figure>
                  <Link href="/design">
                    <Image
                      width={1920}
                      height={1280}
                      src={Section2Contents3}
                      alt="section2Contents1"
                    ></Image>
                  </Link>
                </figure>
                <div>
                  <div>
                    <h5>Create the Essentials</h5>
                    <p>Samsung Galaxy S23 Series Design Story</p>
                  </div>
                  <div>
                    <p>
                      Even through continuous transformation, the essence remains the same. Galaxy
                      S23 series’ design story captures the Samsung’s vision for the future.
                    </p>
                    <span>Our Stories | Feb 16, 2023</span>
                  </div>
                </div>
              </div>
              <div>
                <figure>
                  <Link href="/design">
                    <Image
                      width={1920}
                      height={1280}
                      src={Section2Contents4}
                      alt="section2Contents1"
                    ></Image>
                  </Link>
                </figure>
                <div>
                  <div>
                    <h5>Create the Essentials</h5>
                    <p>Samsung Galaxy S23 Series Design Story</p>
                  </div>
                  <div>
                    <p>
                      Even through continuous transformation, the essence remains the same. Galaxy
                      S23 series’ design story captures the Samsung’s vision for the future.
                    </p>
                    <span>Our Stories | Feb 16, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sdSection3}>
          <figure>
            <Image width={1920} height={1080} src={Section3Image} alt="section2Contents1" />
          </figure>
        </section>
        <section className={styles.sdSection4}>
          <div className={styles.sdSection4TopText}>
            <h4>More Stories</h4>
          </div>
          <div className={styles.sdSection4Contents} ref={(el) => (pageRef.current[2] = el)}>
            <div>
              <figure>
                <Link href="/design">
                  <Image width={1920} height={1280} src={Section2Contents4} alt="section4Image" />
                </Link>
              </figure>
              <div>
                <h5>Designing Words</h5>
                <p>Samsung UX Writing Guide</p>
                <span>Nov 29, 2022</span>
              </div>
            </div>
            <div>
              <figure>
                <Link href="/design">
                  <Image width={1920} height={1280} src={Section2Contents5} alt="section4Image" />
                </Link>
              </figure>
              <div>
                <h5>The Wave: Epilogue</h5>
                <p>into the wave of circulation</p>
                <span>Nov 22, 2022</span>
              </div>
            </div>
            <div>
              <figure>
                <Link href="/design">
                  <Image width={1920} height={1280} src={Section2Contents6} alt="section4Image" />
                </Link>
              </figure>
              <div>
                <h5>Designing Words</h5>
                <p>Samsung UX Writing Guide</p>
                <span>Nov 29, 2022</span>
              </div>
            </div>
            <div>
              <figure>
                <Link href="/design">
                  <Image width={1920} height={1280} src={Section2Contents7} alt="section4Image" />
                </Link>
              </figure>
              <div>
                <h5>Designing Words</h5>
                <p>Samsung UX Writing Guide</p>
                <span>Nov 29, 2022</span>
              </div>
            </div>
            <div>
              <figure>
                <Link href="/design">
                  <Image width={1920} height={1280} src={Section2Contents8} alt="section4Image" />
                </Link>
              </figure>
              <div>
                <h5>Designing Words</h5>
                <p>Samsung UX Writing Guide</p>
                <span>Nov 29, 2022</span>
              </div>
            </div>
            <div>
              <figure>
                <Link href="/design">
                  <Image width={1920} height={1280} src={Section2Contents9} alt="section4Image" />
                </Link>
              </figure>
              <div>
                <h5>Designing Words</h5>
                <p>Samsung UX Writing Guide</p>
                <span>Nov 29, 2022</span>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sdSection5}>
          <figure>
            <Image width={1920} height={1195} src={Section50} alt="section2Contents1" />
          </figure>
        </section>
        <footer className={styles.sdFooter}>
          <div className={styles.sdFooterContainer}>
            <h1 className={styles.sdFooterContainerLogo}>
              <Link href="/design" title="home">
                <Image src={FooterLogo} width={88} height={13} alt="footer logo" priority />
              </Link>
            </h1>
            <nav className={styles.sdFooterContainerNav}>
              <ul>
                <li>
                  <Link href="/design" title="© 2023 SAMSUNG All Rights Reserved.">
                    © 2023 SAMSUNG All Rights Reserved.
                  </Link>
                </li>
                <li>
                  <Link href="/design" title="email inquiry">
                    email inquiry
                  </Link>
                </li>
                <li>
                  <Link href="/design" title="privacy policy">
                    privacy policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
