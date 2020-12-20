import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Возвращает строку даты в формате YYYY-MM-DD
 * @param date {Date} - Дата
 * @return {string} - дата в формате YYYY-MM-DD
 */
const getDateOnlyString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое'
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm'
};

export const app = new Vue({
  el: '#app',

  data: {
    rawMeetupData: null
  },

  mounted() {
    // Требуется получить данные митапа с API
    this.getMeetupData(MEETUP_ID);
  },

  computed: {
    meetupData: function() {
      if (!this.rawMeetupData) return null;
      return {
        ...this.rawMeetupData,
        coverStyle: this.rawMeetupData.imageId
          ? {
            '--bg-url': `url('${getMeetupCoverLink(this.rawMeetupData)}')`
          }
          : {},
        localDate: new Date(this.rawMeetupData.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        dateOnlyString: getDateOnlyString(new Date(this.rawMeetupData.date))
      };
    },
    agenda: function() {
      if (!this.rawMeetupData) return null;
      return this.rawMeetupData.agenda.map(section => {
        return {
          ...section,
          title: section.title ? section.title : agendaItemTitles[section.type],
          icon: section.type ? agendaItemIcons[section.type] : agendaItemIcons.other
        };
      });
    },
    hasAgenda: function() {
      return !!this.rawMeetupData.agenda.length;
    }
  },

  methods: {
    async getMeetupData(meetupId) {
      this.rawMeetupData = await fetch(`${API_URL}/meetups/${meetupId}`).then((res) => res.json());
    }
  }
});
