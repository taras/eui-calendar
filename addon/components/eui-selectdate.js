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
  
  /**
   * if we had an (array ) helper, we could do this in the template
   * ```hbs
   * (array (hash name='current' date=_date) (hash name='next' date=nextMonth))
   * ```
   */
  calendars: computed('nextMonth', function(){
    return [ 
      { name: 'current', date: this.get('_date') },
      { name: 'next', date: this.get('nextMonth') }
    ];
  }),
  
  ensureStartBeforeEnd(date) {
    let start = this.get('_start');
    if (date.isBefore(start)) {
      this.set('_start', date);
      date = start;
    }
    this.set('_end', date);
  },
  
  changeRange(date) {
      if (this.get('isSelectingRange')) {
          this.ensureStartBeforeEnd(date);
          return;
      }
      this.setProperties({
        _start: date,
        _end: null
      });  
  },
  
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
        this.changeRange(date);
        if (this.get('isSelectingRange')) {
          this.sendAction('on-range-change', this.get('_start'), this.get('_end'));
        }
        this.toggleProperty('isSelectingRange');
      }
    },
    hoverRange(date) {
      this.changeRange(date);
    },
    noop() {
      // do nothing, this is here for when isSelectingRange === false
    }
  }
});

EUISelectdateComponent.reopenClass({
  positionalParams: ['date']
});

export default EUISelectdateComponent;