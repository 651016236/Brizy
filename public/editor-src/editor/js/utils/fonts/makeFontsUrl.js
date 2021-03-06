import Config from "visual/global/Config";
import { objectToQueryString } from "visual/utils/url";

export const makeSubsetGoogleFontsUrl = fonts => {
  const family = fonts.reduce((acc, curr) => {
    const family = curr.family.replace(/\s/g, "+");
    const weights = curr.variants.join();

    return acc === "" ? `${family}:${weights}` : `${acc}|${family}:${weights}`;
  }, "");

  return `https://fonts.googleapis.com/css?family=${family}&subset=arabic,bengali,cyrillic,cyrillic-ext,devanagari,greek,greek-ext,gujarati,hebrew,khmer,korean,latin-ext,tamil,telugu,thai,vietnamese`;
};

// {site}/fonts/css?uid=fontId:400|fontId:400,700
export const makeUploadFontsUrl = fonts => {
  const fontsUrl = Config.get("urls").editorFonts;
  const qs = objectToQueryString({
    uid: fonts.reduce((acc, { id, weights }) => {
      const _weights = weights.join();

      return acc === "" ? `${id}:${_weights}` : `${acc}|${id}:${_weights}`;
    }, "")
  });

  return `${fontsUrl}?${qs}`;
};
