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
    this.set('_start', this.get('start'));
    this.set('_end', this.get('end'));
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
      let range = this.get('range');
      if (range) {
        if (this.get('isSelectingRange')) {
          let start = this.get('_start');
          if (date.isBefore(start)) {
            this.set('_start', date);
            date = start;
          }
          this.set('_end', date);
          this.sendAction('on-range-change', this.get('_start'), this.get('_end'));
          this.set('isSelectingRange', false);
        } else {
          this.set('_start', date);
          this.set('_end', null);
          this.set('isSelectingRange', true);
        }        
      }
    }
  }
});

EUISelectdateComponent.reopenClass({
  positionalParams: ['date']
});

export default EUISelectdateComponent;