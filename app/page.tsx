"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import homePageStyles from "@/styles/homePageStyles";



export default function Home() {
  const { theme } = useTheme();
  const styles = homePageStyles[theme];

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>حروف النازحين</h1>
        <p className={styles.heroDescription}>
          اكتب قصتك بصدق، فقد تجد من يصغي، وقد يغيّر صداها العالم.
        </p>
        <div className={styles.heroButtonsContainer}>
          <Link href="#features" className={styles.heroButton}>
            المزيد
          </Link>
          <Link href="/auth/SignUp" className={styles.heroButton}>
            تسجيل
          </Link>
        </div>
      </section>

      <section id="features" className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>أبرز القصص</h2>
        <div className={styles.featuresGrid}>
          {stories.map((story, index) => (
            <div key={index} className={styles.storyCard}>
              <div className={styles.storyImageWrapper}>
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className={styles.storyCardContent}>
                <h3 className={styles.storyCardTitle}>{story.title}</h3>
                <p className={styles.storyCardDescription}>
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <h2 className={styles.aboutTitle}>من نحن؟</h2>
          <p className={styles.aboutText}>
            نحن منصة تهدف إلى إعطاء صوت لقصص أهل غزة خلال الحرب، حيث يمكن
            للنازحين والمجتمع أن يشاركوا تجاربهم، معززين الوحدة والتضامن.
          </p>
          <div className={styles.aboutCards}>
            <div className={styles.aboutCard}>
              <h3 className={styles.aboutCardTitle}>رؤيتنا</h3>
              <p className={styles.aboutCardDescription}>
                نسعى لتوثيق قصص أهل غزة وتقديم منصة آمنة لمشاركة تجاربهم مع العالم.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h3 className={styles.aboutCardTitle}>مهمتنا</h3>
              <p className={styles.aboutCardDescription}>
                تمكين الناس من التعبير عن معاناتهم ومشاركتها ليكون لها صدى واسع
                ويساهم في نشر الوعي العالمي.
              </p>
            </div>
            <div className={styles.aboutCard}>
              <h3 className={styles.aboutCardTitle}>قيمنا</h3>
              <p className={styles.aboutCardDescription}>
                الشجاعة، التضامن، الأمل، والتوثيق لحفظ الذكريات وتخفيف معاناة
                الشعوب.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contactSection}>
        <div className={styles.contactContainer}>
          <h2 className={styles.contactTitle}>تواصل معنا</h2>
          <p className={styles.contactText}>
            إذا كانت لديك قصة تود مشاركتها أو كنت بحاجة إلى دعم، نحن هنا
            للاستماع إليك.
          </p>
          <div>
            <a href="mailto:info@example.com" className={styles.contactLink}>
              info@example.com
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          جميع الحقوق محفوظة . <span>© 2025</span>
        </p>
      </footer>
    </div>
  );
}
const stories = [
  {
    image:
      "https://www.alquds.co.uk/wp-content/uploads/2021/05/20210529125735afpp-afp_9az3am.h11-1-730x438.jpg",
    title: "حكايات الإبادة تحت نيران الصواريخ الإسرائيلية",
    description:
      "1600 عائلة أبادتها الصواريخ الإسرائيلية.. عائلات غزة تبكي على أطلال الدمار",
  },
  {
    image:
      "https://static.srpcdigital.com/styles/1037xauto/public/2020/04/11/1586623399283508700.jpg.webp",
    title: "النازحون في العراء",
    description: "تجربة مريرة لنازحين يعيشون في خيام بعد تهدم منازلهم.",
  },
  {
    image: "https://static.dw.com/image/39073072_1004.webp",
    title: "طفولة في الحروب",
    description: "قصة طفل فلسطيني نشأ في قلب الحرب والتدمير ولكنه يظل يبتسم.",
  },
];