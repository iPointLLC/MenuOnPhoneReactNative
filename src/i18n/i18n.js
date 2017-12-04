import I18n from 'react-native-i18n';
import en from './translations/en';
import ru from './translations/ru';
import cn from './translations/cn';

I18n.fallbacks = true;

I18n.translations = {
	en,
	ru,
	cn
};

export default I18n; 