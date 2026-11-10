import type { L } from "@/i18n/config";

/**
 * Portfolio — real photos of Rauan's work supplied by the owner.
 *
 * To add a project: put an optimized JPG (≈1440px on the long side) into
 * public/images/projects/ and add an entry below. Categories with no photos
 * are hidden from the filter automatically.
 *
 * TODO(owner): confirm the category of each photo. Categories were assigned
 * from what is visible in the picture, not from project documents.
 */
export const PROJECT_CATEGORIES = {
  apartments: { ru: "Квартиры", kk: "Пәтерлер" },
  houses: { ru: "Частные дома", kk: "Жеке үйлер" },
  panels: { ru: "Электрощиты", kk: "Электр щиттері" },
  routes: { ru: "Кабельные трассы", kk: "Кабель трассалары" },
  smart: { ru: "Умный дом", kk: "Ақылды үй" },
  lowvoltage: { ru: "Слаботочные системы", kk: "Әлсіз ток жүйелері" },
} satisfies Record<string, L>;

export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;

export type Project = {
  src: string;
  category: ProjectCategory;
  alt: L;
  caption: L;
  /** Visual weight in the asymmetric grid. */
  size?: "tall" | "wide" | "normal";
};

export const PROJECTS: Project[] = [
  {
    src: "/images/projects/sborka-elektroshchita-schneider.jpg",
    category: "panels",
    size: "tall",
    alt: {
      ru: "Распределительный щит: вводной автомат, три реле напряжения с индикацией, ряды модульных автоматов и маркировочные планки",
      kk: "Тарату щиті: кіріс автоматы, индикациясы бар үш кернеу релесі, модульдік автоматтар қатарлары және таңбалау планкалары",
    },
    caption: { ru: "Сборка распределительного щита с реле напряжения", kk: "Кернеу релесі бар тарату щитін құрастыру" },
  },
  {
    src: "/images/projects/kabelnaya-trassa-chernaya-gofra.jpg",
    category: "routes",
    alt: {
      ru: "Более двадцати кабельных линий в чёрной гофре идут параллельно и огибают бетонную балку с одинаковым радиусом",
      kk: "Қара гофрадағы жиырмадан астам кабель желісі қатар жүріп, бетон арқалықты бірдей радиуспен айналып өтеді",
    },
    caption: { ru: "Кабельная трасса из чёрной гофры через балку", kk: "Арқалық арқылы өтетін қара гофра трассасы" },
  },
  {
    src: "/images/projects/kabelnye-linii-lestnichnyy-proem.jpg",
    category: "houses",
    alt: {
      ru: "Зелёные и жёлтые гофрированные трубы с кабелем спускаются по стене у лестничного проёма",
      kk: "Кабелі бар жасыл және сары гофра түтіктер баспалдақ ойығының жанындағы қабырғамен түседі",
    },
    caption: { ru: "Силовые линии у лестничного проёма", kk: "Баспалдақ ойығы жанындағы күштік желілер" },
  },
  {
    src: "/images/projects/elektromontazh-potolok-kvartira.jpg",
    category: "apartments",
    alt: {
      ru: "Черновой электромонтаж в квартире: линии в жёлтой и зелёной гофре по потолку и выпуски кабеля под светильники",
      kk: "Пәтердегі қара электр монтажы: төбедегі сары және жасыл гофрадағы желілер мен шамдарға арналған кабель шығыстары",
    },
    caption: { ru: "Разводка по потолку квартиры", kk: "Пәтер төбесі бойынша тарату" },
  },
  {
    src: "/images/projects/dva-raspredelitelnyh-shchita.jpg",
    category: "panels",
    alt: {
      ru: "Два собранных распределительных щита на стене с модульной автоматикой и маркировочными планками",
      kk: "Қабырғадағы модульдік автоматикасы және таңбалау планкалары бар екі жиналған тарату щиті",
    },
    caption: { ru: "Два распределительных щита на одном объекте", kk: "Бір нысандағы екі тарату щиті" },
  },
  {
    src: "/images/projects/spuski-kabelya-k-rozetkam.jpg",
    category: "apartments",
    size: "tall",
    alt: {
      ru: "Вертикальные спуски кабеля от потолочной трассы к подрозетникам на бетонной стене",
      kk: "Төбедегі трассадан бетон қабырғадағы розетка қораптарына түсетін тік кабельдер",
    },
    caption: { ru: "Спуски к розеточным группам", kk: "Розетка топтарына түсетін кабельдер" },
  },
  {
    src: "/images/projects/kabelnye-linii-kirpichnyy-dom.jpg",
    category: "houses",
    alt: {
      ru: "Широкий пучок кабельных линий в гофре поворачивает с потолка на стену кирпичного здания у окна",
      kk: "Гофрадағы кабель желілерінің кең шоғыры терезе жанында төбеден кірпіш ғимараттың қабырғасына бұрылады",
    },
    caption: { ru: "Магистраль кабельных линий в кирпичном доме", kk: "Кірпіш үйдегі кабель желілерінің магистралі" },
  },
  {
    src: "/images/projects/razvodka-potolok-raspredkorobka.jpg",
    category: "apartments",
    alt: {
      ru: "Линии освещения и розеток в гофре расходятся по потолку от распределительной коробки",
      kk: "Гофрадағы жарық және розетка желілері тарату қорабынан төбе бойымен тарайды",
    },
    caption: { ru: "Разводка по потолку с распределительной коробкой", kk: "Тарату қорабы бар төбе бойынша тарату" },
  },
  {
    src: "/images/projects/podgotovka-trassy-klipsy.jpg",
    category: "routes",
    alt: {
      ru: "Подготовка трассы: на потолке ровными рядами установлены клипсы под крепление гофры",
      kk: "Трассаны дайындау: төбеге гофраны бекітуге арналған клипсалар түзу қатармен орнатылған",
    },
    caption: { ru: "Разметка и крепёж под будущую трассу", kk: "Болашақ трассаға белгілеу мен бекіткіш" },
  },
  {
    src: "/images/projects/kabelnye-linii-k-shchitu.jpg",
    category: "apartments",
    alt: {
      ru: "Десятки линий в зелёной и жёлтой гофре сходятся по потолку к месту установки щита",
      kk: "Жасыл және сары гофрадағы ондаған желі төбе бойымен щит орнатылатын жерге жиналады",
    },
    caption: { ru: "Линии сходятся к месту установки щита", kk: "Желілер щит орнатылатын жерге жиналады" },
  },
];
