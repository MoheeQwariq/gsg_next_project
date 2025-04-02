import Link from "next/dist/client/link";

const Home = () => {
  return (
    <div className="bg-[rgb(235,235,235)] min-h-screen font-sans">
      <section className="relative flex flex-col items-center justify-center text-center py-40 px-8  bg-gradient-to-r from-[rgb(49,54,219)] to-blue-500 text-white">
        <h1 className="text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
          حروف النازحين
        </h1>
        <p className="text-lg max-w-2xl mt-4 opacity-90 leading-relaxed mx-auto">
          اكتب قصتك بصدق، فقد تجد من يصغي، وقد يغيّر صداها العالم.
        </p>
        <div className="mt-10 flex gap-6">
          <Link
            href="#features"
            className="px-8 py-3 text-lg font-semibold rounded-xl bg-white text-[rgb(49,54,219)] shadow-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300"
          >
            المزيد
          </Link>
          
          <Link
            href="/auth/SignUp"
            className="px-8 py-3 text-lg font-semibold rounded-xl bg-white text-[rgb(49,54,219)] shadow-lg  hover:shadow-2xl transition-all duration-300"          >
        تسجيل
        </Link>

        </div>

   
      </section>
      <section
        id="features"
        className="py-24 bg-[rgb(235,235,235)] text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-10">أبرز القصص</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="relative p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {story.title}
                </h3>
                <p className="text-gray-600 mt-2">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="py-24 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#7851E9] to-[#3652E1] bg-clip-text text-transparent">
            من نحن؟
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
            نحن منصة تهدف إلى إعطاء صوت لقصص أهل غزة خلال الحرب، حيث يمكن
            للنازحين والمجتمع أن يشاركوا تجاربهم، معززين الوحدة والتضامن.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                 رؤيتنا
              </h3>
              <p className="text-gray-600">
                نسعى لتوثيق قصص أهل غزة وتقديم منصة آمنة لمشاركة تجاربهم مع
                العالم.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                 مهمتنا
              </h3>
              <p className="text-gray-600">
                تمكين الناس من التعبير عن معاناتهم ومشاركتها ليكون لها صدى واسع
                ويساهم في نشر الوعي العالمي.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                 قيمنا
              </h3>
              <p className="text-gray-600">
                الشجاعة، التضامن، الأمل، والتوثيق لحفظ الذكريات وتخفيف معاناة
                الشعوب.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#7851E9] to-[#3652E1] bg-clip-text text-transparent">
            تواصل معنا
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
            إذا كانت لديك قصة تود مشاركتها أو كنت بحاجة إلى دعم، نحن هنا
            للاستماع إليك.
          </p>
          <div className="mt-8">
            <a
              href="mailto:info@example.com"
              className="inline-block px-6 py-3 text-lg font-medium text-white bg-[rgb(49,54,219)] rounded-full shadow-lg transition transform hover:scale-105 hover:bg-[rgb(35,40,180)]"
            >
               info@example.com
            </a>
          </div>
        </div>
      </section>
      <footer className="py-6 bg-gray-900 text-center text-gray-400">
        <p>
          {" "}
          جميع الحقوق محفوظة . <span>© 2025 </span>
        </p>
      </footer>
    </div>
  );
};

// Featured Stories Data
const stories = [
  {
    image: "https://www.alquds.co.uk/wp-content/uploads/2021/05/20210529125735afpp-afp_9az3am.h11-1-730x438.jpg",
    title: "حكايات الإبادة تحت نيران الصواريخ الإسرائيلية",
    description:"1600 عائلة أبادتها الصواريخ الإسرائيلية.. عائلات غزة تبكي على أطلال الدمار",
  },
  {
    image: "https://static.srpcdigital.com/styles/1037xauto/public/2020/04/11/1586623399283508700.jpg.webp",
    title: "النازحون في العراء",
    description: "تجربة مريرة لنازحين يعيشون في خيام بعد تهدم منازلهم.",
  },
  {
    image: "https://static.dw.com/image/39073072_1004.webp",
    title: "طفولة في الحروب",
    description: "قصة طفل فلسطيني نشأ في قلب الحرب والتدمير ولكنه يظل يبتسم.",
  },
];

export default Home;

