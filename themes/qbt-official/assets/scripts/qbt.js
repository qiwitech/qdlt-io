const QBT = {
  defaultLanguage: 'en',
  supportedLanguages: ['ru', 'ru-RU'], //exclude default language [en]
  langRoutes: ['ru'],
  matchSupportedLanguage(str, languages) {
    return str.match(new RegExp(`^\/(${languages.join('|')})`));
  }
};

(function() {
  const { defaultLanguage, langRoutes, supportedLanguages, matchSupportedLanguage } = QBT;
  const { origin, pathname } = location;
  const savedLang = localStorage.getItem('language');

  if (
    defaultLanguage === savedLang ||
    matchSupportedLanguage(pathname, supportedLanguages)
  ) { return; }

  let lang = defaultLanguage;

  if ('language' in navigator) {
    lang = navigator.language;
  } else if ('userLanguage' in navigator) {
    lang = navigator.userLanguage;
  }

  if (!supportedLanguages.includes(lang)) { return; }

  if (!langRoutes.includes(lang)) {
    lang = matchSupportedLanguage(`/${lang}`, langRoutes);
    if (!lang) { return; }
    [lang] = lang;
  }

  if (lang && lang !== defaultLanguage) {
    const url = new URL(origin);
    url.pathname = `${lang}${pathname}`;
    location.replace(url.href);
  }
})()