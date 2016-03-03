import Ember from 'ember';
import { HTML5_DATETIME_FORMAT } from 'eui-calendar/constants';

export default class DaySelector {
  constructor(env, prefix = '') {
    this.env = env;
    this.prefix = prefix;
    this.$ = this.env.$;
  }

  emptyCount() {
    return this.$(`${this.prefix}.eui-interval.--is-empty`).length;
  }

  notEmptyCount() {
    return this.$(`${this.prefix}.eui-interval`).not('.--is-empty').length;
  }

  disabledCount() {
    return this.$(`${this.prefix}.eui-interval.--is-disabled`).length;
  }

  notDisabledCount() {
    return this.$(`${this.prefix}.eui-interval`).not('.--is-disabled').length;
  }

  days() {
    return this.$(`${this.prefix}.eui-interval`).map(trimText).toArray();
  }

  headers() {
    return this.$(`${this.prefix}.eui-nameofday`).map(trimText).toArray();
  }

  isSelected(date) {
    let datetime = date.format(HTML5_DATETIME_FORMAT);
    return this.$(`${this.prefix}.eui-interval[data-datetime="${datetime}"]`).hasClass('--is-selected');
  }
  
  highlighted() {
    return this.$('.--is-highlighted').map(trimText).toArray();
  }

  selectDay(day) {
    let datetime = day.format(HTML5_DATETIME_FORMAT);
    this.$(`${this.prefix}.eui-interval[data-datetime="${datetime}"]`).click();
  }
}

function trimText() {
  return Ember.$(this).text().trim();
}
