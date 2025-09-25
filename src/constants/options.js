import { PHONE_STAGE_DESIGN_HEIGHT } from "./layout";

export const AGE_STOPS = [
    {
        id: "10s",
        label: "10대",
    },
    {
        id: "20s",
        label: "20대",
    },
    {
        id: "30s",
        label: "30대",
    },
    {
        id: "40s",
        label: "40대",
    },
    {
        id: "50s",
        label: "50대",
    },
    {
        id: "60s",
        label: "60대 이상",
    },
];

export const GENDER_OPTIONS = [
    {
        id: "male",
        label: "남성",
        imageSources: ["/male_image.png"],
        topPercent: 53.817734,
    },
    {
        id: "female",
        label: "여성",
        imageSources: ["/female_image.png"],
        topPercent: 61.206897,
    },
    {
        id: "other",
        label: "기타",
        imageSources: ["/other_image.png"],
        topPercent: 68.596059,
    },
];

export const Q1_OPTIONS = [
    {
        id: "absolutelyAmazing",
        label: "Absolutely amazing",
        imageSources: ["/absolutely_amazing_image.png"],
    },
    {
        id: "superFun",
        label: "Super fun",
        imageSources: ["/super_fun_image.png"],
    },
    {
        id: "itWasOkay",
        label: "It was okay",
        imageSources: ["/it_was_okay_image.png"],
    },
    {
        id: "couldBeBetter",
        label: "Could be better",
        imageSources: ["/could_be_better_image.png"],
    },
    {
        id: "notMyThing",
        label: "Not my thing",
        imageSources: ["/not_my_thing_image.png"],
    },
];

export const Q1_OPTION_BASE_TOP_PERCENT =
    (265 / PHONE_STAGE_DESIGN_HEIGHT) * 100;
export const Q1_OPTION_STEP_PERCENT = (82 / PHONE_STAGE_DESIGN_HEIGHT) * 100;

export const Q2_OPTIONS = [
    {
        id: "interactivity",
        label: "The interactivity",
        imageSources: ["/the_interactivity_image.png"],
        top: 268,
        height: 100,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 84,
    },
    {
        id: "awesomeGraphics",
        label: "The awesome graphics",
        imageSources: ["/the_awesome_graphics_image.png"],
        top: 368,
        height: 76,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "funStorytelling",
        label: "The fun storytelling",
        imageSources: ["/the_fun_storytelling_image.png"],
        top: 444,
        height: 76,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "koreanBackstreet",
        label: "Korean backstreet",
        imageSources: ["/korean_backstreet_image.png"],
        top: 520,
        height: 76,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "other",
        label: "Other",
        imageSources: ["/other_text_image.png"],
        top: 596,
        height: 76,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
        allowsCustomInput: true,
    },
];

export const Q2_STAGE_HEIGHT = PHONE_STAGE_DESIGN_HEIGHT;
const Q2_OPTION_WIDTH = 323;
export const Q2_TOGGLE_IMAGE_SIZE = 24;
export const Q2_LABEL_LEFT_PERCENT = (46 / Q2_OPTION_WIDTH) * 100;
export const Q2_LABEL_WIDTH_PERCENT = (277 / Q2_OPTION_WIDTH) * 100;
export const Q2_TOGGLE_WIDTH_PERCENT =
    (Q2_TOGGLE_IMAGE_SIZE / Q2_OPTION_WIDTH) * 100;

export const Q3_OPTIONS = [
    {
        id: "fashion",
        label: "Fashion",
        imageSources: ["/Fashion_image.png"],
        top: 264,
        height: 74,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "sports",
        label: "Sports",
        imageSources: ["/sports_image.png"],
        top: 338,
        height: 74,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "anime",
        label: "Anime",
        imageSources: ["/anime_image.png"],
        top: 412,
        height: 94,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 80,
    },
    {
        id: "movie",
        label: "Movie",
        imageSources: ["/movie_image.png"],
        top: 506,
        height: 74,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "education",
        label: "Education",
        imageSources: ["/education_image.png"],
        top: 580,
        height: 73,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 73,
    },
];

export const Q3_STAGE_HEIGHT = PHONE_STAGE_DESIGN_HEIGHT;
export const Q3_TOGGLE_IMAGE_SIZE = Q2_TOGGLE_IMAGE_SIZE;
export const Q3_LABEL_LEFT_PERCENT = Q2_LABEL_LEFT_PERCENT;
export const Q3_LABEL_WIDTH_PERCENT = Q2_LABEL_WIDTH_PERCENT;
export const Q3_TOGGLE_WIDTH_PERCENT = Q2_TOGGLE_WIDTH_PERCENT;

const Q3_OPTIONS_BOUNDARIES = (() => {
    if (Q3_OPTIONS.length === 0) {
        return { top: 0, height: 0 };
    }

    const first = Q3_OPTIONS[0];
    const last = Q3_OPTIONS[Q3_OPTIONS.length - 1];
    const top = first.top;
    const bottom = last.top + last.height;

    return {
        top,
        height: bottom - top,
    };
})();

export const Q3_OPTIONS_CONTAINER_STAGE_TOP = Q3_OPTIONS_BOUNDARIES.top;
export const Q3_OPTIONS_CONTAINER_STAGE_HEIGHT =
    Q3_OPTIONS_BOUNDARIES.height;
export const Q3_OPTIONS_CONTAINER_TOP_PERCENT =
    (Q3_OPTIONS_CONTAINER_STAGE_TOP / PHONE_STAGE_DESIGN_HEIGHT) * 100;
export const Q3_OPTIONS_CONTAINER_HEIGHT_PERCENT =
    (Q3_OPTIONS_CONTAINER_STAGE_HEIGHT / PHONE_STAGE_DESIGN_HEIGHT) * 100;

export const Q4_OPTIONS = [
    {
        id: "definitelyYes",
        label: "Definitely yes",
        imageSources: ["/definitely_yes.png"],
        top: 0,
    },
    {
        id: "probablyWilling",
        label: "Probably willing",
        imageSources: ["/probably_willing.png"],
        top: 82,
    },
    {
        id: "notSure",
        label: "Not sure",
        imageSources: ["/not_sure.png"],
        top: 164,
    },
    {
        id: "no",
        label: "No",
        imageSources: ["/no.png"],
        top: 246,
    },
    {
        id: "iDontKnow",
        label: "I don't know",
        imageSources: ["/i_dont.png"],
        top: 328,
    },
];

export const Q4_OPTIONS_CONTAINER_HEIGHT = 376;

export const Q5_OPTIONS = [
    {
        id: "expensiveEquipment",
        label: "Expensive equipment",
        imageSources: ["/expensive_equipment.png"],
        top: 0,
        height: 58,
        toggleTop: 17,
    },
    {
        id: "complicatedProduction",
        label: "Complicated production process",
        imageSources: ["/complicated_production_process.png"],
        top: 74,
        height: 84,
        toggleTop: 30,
    },
    {
        id: "lackOfSkills",
        label: "Lack of technical skills",
        imageSources: ["/lack_of_technical_skills.png"],
        top: 174,
        height: 60,
        toggleTop: 18,
    },
    {
        id: "makingItUnique",
        label: "Making it unique",
        imageSources: ["/making_it_unique.png"],
        top: 250,
        height: 60,
        toggleTop: 18,
    },
    {
        id: "tooMuchEffort",
        label: "Too much effort",
        imageSources: ["/too_much_effort.png"],
        top: 326,
        height: 60,
        toggleTop: 18,
    },
];

export const Q5_OPTIONS_CONTAINER_HEIGHT = Q5_OPTIONS.reduce(
    (maxBottom, option) => {
        const bottom = option.top + option.height;
        return bottom > maxBottom ? bottom : maxBottom;
    },
    0
);
