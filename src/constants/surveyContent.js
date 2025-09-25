export const BASIC_INFO_SOURCES = ["/basic_Information_image.png", "/basic_Information_image.png"];
export const BEFORE_BUTTON_SOURCES = ["/before.png", "/before_button.png"];
export const BEFORE_BUTTON_BOTTOM_PERCENT = 86.82266 + 3.325123;
export const BEFORE_BUTTON_TARGET_GAP_PX = 8;
export const NEXT_ON_BUTTON_SOURCES = ["/next_on_button.png", "/next.png"];
export const NEXT_OFF_BUTTON_SOURCES = ["/next_off_button.png", "/next.png"];
export const NEXT_TEXT_SOURCES = ["/next_text_image.png"];
export const DONE_BUTTON_SOURCES = ["/done_button.png"];
export const DONE_OFF_BUTTON_SOURCES = ["/done_off_button.png"];
export const DONE_TEXT_SOURCES = ["/done_text_image.png"];
export const EMAIL_IMAGE_SOURCES = ["/email_text_image.png", "/email_text_image.png"];
export const EMAIL_TEXT_BOX_SOURCES = ["/email_text_box.png", "/emil_text_box.png"];
export const AGE_TEXT_SOURCES = ["/age_text_image.png", "/age_text_image.png"];
export const GENDER_TEXT_SOURCES = ["/gender_text_image.png", "/gender_text_image.png"];
export const SCROLL_LINE_SOURCES = ["/scroll_line_image.png", "/scroll_line.png"];
export const SCROLL_HANDLE_SOURCES = ["/scroll_handle_image.png", "/scroll_handle.png"];
export const OFF_TOGGLE_SOURCES = ["/off_toggle.png"];
export const ON_TOGGLE_SOURCES = ["/on_toggle.png"];
export const Q1_TITLE_SOURCES = ["/q1_title_image.png"];
export const Q1_TEXT_SOURCES = ["/q1_text_image.png"];
export const Q2_TITLE_SOURCES = ["/q2_title_image.png"];
export const Q2_TEXT_SOURCES = ["/q2_text_image.png"];
export const Q3_TITLE_SOURCES = ["/q3_title_image.png"];
export const Q3_TEXT_SOURCES = ["/q3_text_image.png"];
export const Q4_TITLE_SOURCES = ["/q4_title_image.png"];
export const Q4_TEXT_SOURCES = ["/q4_text_image.png"];
export const Q5_TITLE_SOURCES = ["/q5_title_image.png"];
export const Q5_TEXT_SOURCES = ["/q5_text_image.png"];
export const ENDING_IMAGE_SOURCES = ["/B8.png"];

export const PHONE_STAGE_DESIGN_WIDTH = 375;
export const PHONE_STAGE_DESIGN_HEIGHT = 812;
export const PAGE_NAV_DESIGN_HEIGHT = 71;
export const AGE_TRACK_LEFT_PERCENT = 7.466667;
export const AGE_TRACK_WIDTH_PERCENT = 90.4;
export const AGE_TRACK_START_OFFSET_PERCENT = (25 / 339) * AGE_TRACK_WIDTH_PERCENT;
export const AGE_TRACK_END_OFFSET_PERCENT = (25 / 339) * AGE_TRACK_WIDTH_PERCENT;
export const AGE_HANDLE_TOP_PERCENT = 33.251232;

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
        id: "other",
        label: "Other",
        imageSources: ["/other_text_image.png"],
        allowsCustomInput: true,
    },
];

export const Q1_OPTION_BASE_TOP_PERCENT = (219 / 812) * 100;
export const Q1_OPTION_STEP_PERCENT = (82 / 812) * 100;

export const Q2_OPTIONS = [
    {
        id: "interactivity",
        label: "The interactivity",
        imageSources: ["/the_interactivity_image.png"],
        top: 219,
        height: 84,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 84,
    },
    {
        id: "awesomeGraphics",
        label: "The awesome graphics",
        imageSources: ["/the_awesome_graphics_image.png"],
        top: 319,
        height: 60,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "funStorytelling",
        label: "The fun storytelling",
        imageSources: ["/the_fun_storytelling_image.png"],
        top: 395,
        height: 60,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "koreanBackstreet",
        label: "Korean backstreet",
        imageSources: ["/korean_backstreet_image.png"],
        top: 471,
        height: 60,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "other",
        label: "Other",
        imageSources: ["/other_text_image.png"],
        top: 547,
        height: 60,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
        allowsCustomInput: true,
    },
];

export const Q2_STAGE_HEIGHT = PHONE_STAGE_DESIGN_HEIGHT;
export const Q2_OPTION_WIDTH = 323;
export const Q2_TOGGLE_IMAGE_SIZE = 24;
export const Q2_LABEL_LEFT_PERCENT = (46 / Q2_OPTION_WIDTH) * 100;
export const Q2_LABEL_WIDTH_PERCENT = (277 / Q2_OPTION_WIDTH) * 100;
export const Q2_TOGGLE_WIDTH_PERCENT = (Q2_TOGGLE_IMAGE_SIZE / Q2_OPTION_WIDTH) * 100;

const Q2_OPTIONS_BOUNDARIES = (() => {
    if (Q2_OPTIONS.length === 0) {
        return { top: 0, height: Q2_STAGE_HEIGHT };
    }

    let minTop = Q2_OPTIONS[0].top;
    let maxBottom = Q2_OPTIONS[0].top + Q2_OPTIONS[0].height;

    for (const option of Q2_OPTIONS) {
        if (option.top < minTop) {
            minTop = option.top;
        }
        const optionBottom = option.top + option.height;
        if (optionBottom > maxBottom) {
            maxBottom = optionBottom;
        }
    }

    const computedHeight = maxBottom - minTop;

    if (computedHeight <= 0) {
        return { top: 0, height: Q2_STAGE_HEIGHT };
    }

    return { top: minTop, height: computedHeight };
})();

export const Q2_OPTIONS_CONTAINER_STAGE_TOP = Q2_OPTIONS_BOUNDARIES.top;
export const Q2_OPTIONS_CONTAINER_STAGE_HEIGHT = Q2_OPTIONS_BOUNDARIES.height;
export const Q2_OPTIONS_CONTAINER_TOP_PERCENT =
    (Q2_OPTIONS_CONTAINER_STAGE_TOP / Q2_STAGE_HEIGHT) * 100;
export const Q2_OPTIONS_CONTAINER_HEIGHT_PERCENT =
    (Q2_OPTIONS_CONTAINER_STAGE_HEIGHT / Q2_STAGE_HEIGHT) * 100;

export const Q3_OPTIONS = [
    {
        id: "anime",
        label: "Anime",
        imageSources: ["/anime_image.png"],
        top: 219,
        height: 94,
        toggleTop: 38,
        labelTop: 0,
        labelHeight: 80,
    },
    {
        id: "movie",
        label: "Movie",
        imageSources: ["/movie_image.png"],
        top: 313,
        height: 74,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "education",
        label: "Education",
        imageSources: ["/education_image.png"],
        top: 387,
        height: 87,
        toggleTop: 24.5,
        labelTop: 0,
        labelHeight: 73,
    },
    {
        id: "sports",
        label: "Sports",
        imageSources: ["/sports_image.png"],
        top: 474,
        height: 74,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "other",
        label: "Other",
        imageSources: ["/other_text_image.png"],
        top: 548,
        height: 74,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 60,
        allowsCustomInput: true,
    },
];

export const Q3_STAGE_HEIGHT = PHONE_STAGE_DESIGN_HEIGHT;
export const Q3_TOGGLE_IMAGE_SIZE = Q2_TOGGLE_IMAGE_SIZE;
export const Q3_LABEL_LEFT_PERCENT = Q2_LABEL_LEFT_PERCENT;
export const Q3_LABEL_WIDTH_PERCENT = Q2_LABEL_WIDTH_PERCENT;
export const Q3_TOGGLE_WIDTH_PERCENT = Q2_TOGGLE_WIDTH_PERCENT;

export const Q3_OPTIONS_BOUNDARIES = (() => {
    if (Q3_OPTIONS.length === 0) {
        return {
            top: 0,
            height: Q3_STAGE_HEIGHT,
        };
    }

    let minTop = Q3_OPTIONS[0].top;
    let maxBottom = Q3_OPTIONS[0].top + Q3_OPTIONS[0].height;

    for (const option of Q3_OPTIONS) {
        if (option.top < minTop) {
            minTop = option.top;
        }
        const optionBottom = option.top + option.height;
        if (optionBottom > maxBottom) {
            maxBottom = optionBottom;
        }
    }

    const computedHeight = maxBottom - minTop;

    if (computedHeight <= 0) {
        return { top: 0, height: Q3_STAGE_HEIGHT };
    }

    return { top: minTop, height: computedHeight };
})();

export const Q3_OPTIONS_CONTAINER_STAGE_TOP = Q3_OPTIONS_BOUNDARIES.top;
export const Q3_OPTIONS_CONTAINER_STAGE_HEIGHT = Q3_OPTIONS_BOUNDARIES.height;
export const Q3_OPTIONS_CONTAINER_TOP_PERCENT =
    (Q3_OPTIONS_CONTAINER_STAGE_TOP / Q3_STAGE_HEIGHT) * 100;
export const Q3_OPTIONS_CONTAINER_HEIGHT_PERCENT =
    (Q3_OPTIONS_CONTAINER_STAGE_HEIGHT / Q3_STAGE_HEIGHT) * 100;

export const Q4_OPTIONS = [
    {
        id: "definitelyYes",
        label: "Definitely yes",
        imageSources: ["/definitely_yes.png"],
        top: 0,
        height: 60,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "probablyWilling",
        label: "Probably willing",
        imageSources: ["/probably_willing.png"],
        top: 82,
        height: 60,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "notSure",
        label: "Not sure",
        imageSources: ["/not_sure.png"],
        top: 164,
        height: 60,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "no",
        label: "No",
        imageSources: ["/no.png"],
        top: 246,
        height: 60,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "other",
        label: "Other",
        imageSources: ["/other_text_image.png"],
        top: 328,
        height: 60,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 60,
        allowsCustomInput: true,
    },
];

export const Q4_OPTIONS_CONTAINER_HEIGHT = 410;
export const Q4_TOGGLE_IMAGE_SIZE = Q2_TOGGLE_IMAGE_SIZE;


export const Q5_OPTION_WIDTH = 323;
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
        id: "complicatedProductionProcess",
        label: "Complicated production process",
        imageSources: ["/complicated_production_process.png"],
        top: 74,
        height: 84,
        toggleTop: 30,
        labelLeft: 46,
        labelTop: 0,
        labelWidth: 277,
        labelHeight: 84,
    },
    {
        id: "lackOfTechnicalSkills",
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
        id: "other",
        label: "Other",
        imageSources: ["/other_text_image.png"],
        top: 326,
        height: 60,
        toggleTop: 18,
        allowsCustomInput: true,
    },
];

export const Q5_OPTIONS_CONTAINER_HEIGHT = Q5_OPTIONS.reduce((maxBottom, option) => {
    const bottom = option.top + option.height;
    return bottom > maxBottom ? bottom : maxBottom;
}, 0);

export const VIEWPORT_HEIGHT_EPSILON = 1;
export const KEYBOARD_VISUAL_VIEWPORT_GAP = 120;
export const SLIDE_TRANSITION_DURATION_MS = 450;

export const BACKGROUND_IMAGE_PATHS = [
    "/B0.png",
    "/B1.png",
    "/B2.png",
    "/B3.png",
    "/B4.png",
    "/B5.png",
    "/B6.png",
    "/B7.png",
    "/B8.png",
];

const STATIC_PRELOAD_SOURCES = [
    ...BASIC_INFO_SOURCES,
    ...BEFORE_BUTTON_SOURCES,
    ...NEXT_ON_BUTTON_SOURCES,
    ...NEXT_OFF_BUTTON_SOURCES,
    ...NEXT_TEXT_SOURCES,
    ...DONE_BUTTON_SOURCES,
    ...DONE_OFF_BUTTON_SOURCES,
    ...DONE_TEXT_SOURCES,
    ...EMAIL_IMAGE_SOURCES,
    ...EMAIL_TEXT_BOX_SOURCES,
    ...AGE_TEXT_SOURCES,
    ...GENDER_TEXT_SOURCES,
    ...SCROLL_LINE_SOURCES,
    ...SCROLL_HANDLE_SOURCES,
    ...OFF_TOGGLE_SOURCES,
    ...ON_TOGGLE_SOURCES,
    ...Q1_TITLE_SOURCES,
    ...Q1_TEXT_SOURCES,
    ...Q2_TITLE_SOURCES,
    ...Q2_TEXT_SOURCES,
    ...Q3_TITLE_SOURCES,
    ...Q3_TEXT_SOURCES,
    ...Q4_TITLE_SOURCES,
    ...Q4_TEXT_SOURCES,
    ...Q5_TITLE_SOURCES,
    ...Q5_TEXT_SOURCES,
    ...ENDING_IMAGE_SOURCES,
    "/entry_text_image0.png",
    "/entry_text_image1.png",
    "/arrow_button.png",
    "/i_agree_on_button.png",
    "/i_agree_off_button.png",
    "/start_on_button.png",
    "/start_off_button.png",
    "/progress_1.png",
    "/progress_2.png",
    "/progress_3.png",
    "/progress_4.png",
    "/progress_5.png",
];

const gatherOptionSources = (options = []) =>
    options.flatMap((option) => option.imageSources ?? []);

export const PRELOAD_IMAGE_SOURCES = Array.from(
    new Set([
        ...BACKGROUND_IMAGE_PATHS,
        ...STATIC_PRELOAD_SOURCES,
        ...gatherOptionSources(GENDER_OPTIONS),
        ...gatherOptionSources(Q1_OPTIONS),
        ...gatherOptionSources(Q2_OPTIONS),
        ...gatherOptionSources(Q3_OPTIONS),
        ...gatherOptionSources(Q4_OPTIONS),
        ...gatherOptionSources(Q5_OPTIONS),
    ])
);
