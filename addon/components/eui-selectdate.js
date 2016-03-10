import Ember from 'ember';
import layout from '../templates/components/eui-selectdate';
import Moment from 'moment';

const {
  computed
} = Ember;

let EUISelectdateComponent = Ember.Component.extend({
  layout,
  tagName: 'eui-selectdate',
  placeholder: 'Select a date',
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('_date', this.get('date') || Moment());
  },
  nextMonth: computed('_date', function(){
    return this.get('_date').clone().add(1, 'month');
  }),
  actions: {
    open() {
      this.set('isOpen', true);
    },
    next(date) {
      this.set('_date', date.clone().add(1, 'month'));
    },
    previous(date) {
      this.set('_date', date.clone().subtract(1, 'month'));
    },
    select(date) {
      this.sendAction('on-select', date);
    }
  }
});

EUISelectdateComponent.reopenClass({
  positionalParams: ['date']
});

export default EUISelectdateComponent;