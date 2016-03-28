import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Moment from 'moment';
import DaySelector from 'eui-calendar/tests/page-objects/day-selector';

const FORMAT = 'MMMM YYYY';

moduleForComponent('eui-selectdate', 'Integration | Component | eui-selectdate', {
  integration: true,
  beforeEach() {
    this.currentMonth = new DaySelector(this, '.eui-selectdate--current-month ');
    this.nextMonth = new DaySelector(this, '.eui-selectdate--next-month ');
  }
});

test('it should render', function (assert){

  this.render(hbs`{{eui-selectdate}}`);

  assert.ok(this.$('eui-selectdate').length, 'eui-selectdate was rendered');
});

test('it should show button to open selectdate window', function (assert) {
  
  this.render(hbs`{{eui-selectdate}}`);
  
  assert.ok(this.$('.eui-selectdate--trigger').length, 'button.eui-selectdate--trigger is visible');
  assert.notOk(this.$('.eui-selectdate--window').length, '.eui-selectdate--window is not visible');
  
  this.$('.eui-selectdate--trigger').click();
  assert.ok(this.$('.eui-selectdate--window').length, 'selectdate window is visible');
});

test('it should open with isOpen parameter', function(assert){
  
  this.render(hbs`{{eui-selectdate isOpen=true}}`);
  
  this.$('.eui-selectdate--trigger').click();
  assert.ok(this.$('.eui-selectdate--window').length, 'selectdate window is visible');
});

test('it should show default placeholder text', function(assert){
  
  this.render(hbs`{{eui-selectdate}}`);
  assert.equal(this.$('.eui-selectdate--trigger').text().trim(), 'Select a date', 'Default placeholder is Select a date');
});

test('it should allow to specify placeholder text', function(assert){

  this.render(hbs`{{eui-selectdate placeholder='Choose a date'}}`);
  assert.equal(this.$('.eui-selectdate--trigger').text().trim(), 'Choose a date', 'Placeholder text is changed to Choose a date');    
});

test('it should accept passed in date', function (assert){
  
  let date = Moment('January 21, 2014').utc();
  
  this.set('date', date);
  
  this.render(hbs`{{eui-selectdate date=date isOpen=true}}`);
  
  assert.equal(this.$('.eui-selectdate--trigger').text().trim(), 'January 21', 'passed in date is shown on the trigger');
});

test('it should show current and next months to choose from', function(assert) {
  
  let date = Moment('January 21, 2014').utc();
  
  this.set('date', date);
  
  this.render(hbs`{{eui-selectdate date=date isOpen=true}}`);
  
  assert.equal(this.$('.eui-selectdate--current-month-name').text().trim(), 'January 2014', 'current calendar shows passed in date');
  assert.equal(this.$('.eui-selectdate--next-month-name').text().trim(), 'February 2014', 'next calendar shows next month');
});

test('it should use date at render as default date', function(assert) {

  let now = Moment().utc();
  let nowLabel = now.format(FORMAT);
  let nextMonth = now.add(1, 'month');
  let nextMonthLabel = nextMonth.format(FORMAT);
  
  this.render(hbs`{{eui-selectdate isOpen=true}}`);
  
  assert.equal(this.$('.eui-selectdate--current-month-name').text().trim(), nowLabel, 'current calendar shows this month');
  assert.equal(this.$('.eui-selectdate--next-month-name').text().trim(), nextMonthLabel, 'next calendar shows next month');
});

test('it should accept date as first positional argument', function (assert){

  let date = Moment('January 21, 2014').utc();
  
  this.set('date', date);
  
  this.render(hbs`{{eui-selectdate date isOpen=true}}`);
  
  assert.equal(this.$('.eui-selectdate--trigger').text().trim(), 'January 21', 'selected date is shown on the trigger');
});

test('it should render current and next month calendars', function (assert){

  let date = Moment('January 21, 2014').utc();
  
  this.set('date', date);
  
  this.render(hbs`{{eui-selectdate date isOpen=true}}`);
  
  assert.deepEqual(this.currentMonth.days(), [
    '',    '',   '',   '1', '2',   '3',  '4',  
    '5',  '6',  '7',  '8',  '9',  '10', '11', 
    '12', '13', '14', '15', '16', '17', '18', 
    '19', '20', '21', '22', '23', '24', '25', 
    '26', '27', '28', '29', '30',  '31', '', 
    '',   '',   '',     '',   '',   '',   ''
  ], 'Days for January 2014 are shown in the calendar');
  
  assert.deepEqual(this.nextMonth.days(), [
    '',    '',   '',   '',   '',  '',   '1',
    '2',   '3',  '4',  '5',  '6',  '7',  '8',
    '9',  '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '', 
    '',   '',   '',     '',   '',   '',   ''
  ], 'Days for February 2014 are shown in the calendar');
  
});

test('it should render next and previous buttons', function(assert) {
  this.render(hbs`{{eui-selectdate isOpen=true}}`);
  
  assert.ok(this.$('button.eui-selectdate--next').length, 'next button is rendered');
  assert.equal(this.$('button.eui-selectdate--next').text().trim(), '>>' /* &gt;&gt; */, 'next button shows >> arrow');
  
  assert.ok(this.$('.eui-selectdate--previous').length, 'previous button is rendered');
  assert.equal(this.$('button.eui-selectdate--previous').text().trim(), '<<' /** &lt;&lt; */, 'previous button shows << arrow');
});

test('it should go back one month when previous button is clicked', function (assert) {
  
  let date = Moment('January 21, 2014').utc();
  
  this.set('date', date);
  
  this.render(hbs`{{eui-selectdate date isOpen=true}}`);
  
  this.$('.eui-selectdate--previous').click();
  
  assert.equal(this.$('.eui-selectdate--current-month-name').text().trim(), 'December 2013', 'current calendar shows December 2013');
  assert.deepEqual(this.currentMonth.days(), [
    '1',  '2',   '3',  '4',  '5',  '6',  '7',  
    '8',  '9',  '10', '11', '12', '13', '14', 
    '15', '16', '17', '18', '19', '20', '21', 
    '22', '23', '24', '25', '26', '27', '28', 
    '29', '30', '31',   '',   '',   '',  '', 
    '',   '',   '',     '',   '',   '',   ''
  ], 'Days for December 2013 are shown in the calendar');
  
  assert.equal(this.$('.eui-selectdate--next-month-name').text().trim(), 'January 2014', 'next calendar shows January 2014');  
  assert.deepEqual(this.nextMonth.days(), [
    '',    '',   '',   '1', '2',   '3',  '4',  
    '5',  '6',  '7',  '8',  '9',  '10', '11', 
    '12', '13', '14', '15', '16', '17', '18', 
    '19', '20', '21', '22', '23', '24', '25', 
    '26', '27', '28', '29', '30',  '31', '', 
    '',   '',   '',     '',   '',   '',   ''
  ], 'Days for January 2014 are shown in the calendar');
});

test('it should go forward one month when next button is clicked', function (assert) {
  
  let date = Moment('January 21, 2014').utc();
  
  this.set('date', date);
  
  this.render(hbs`{{eui-selectdate date isOpen=true}}`);
  
  this.$('.eui-selectdate--next').click();
  
  assert.equal(this.$('.eui-selectdate--current-month-name').text().trim(), 'February 2014', 'current calendar shows February 2014');
  assert.deepEqual(this.currentMonth.days(), [
    '',    '',   '',   '',   '',  '',   '1',
    '2',   '3',  '4',  '5',  '6',  '7',  '8',
    '9',  '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '', 
    '',   '',   '',     '',   '',   '',   ''
  ], 'Days for February 2014 are shown in the calendar');

  assert.equal(this.$('.eui-selectdate--next-month-name').text().trim(), 'March 2014', 'next calendar shows March 2014');  
  assert.deepEqual(this.nextMonth.days(), [
    '',    '',   '',   '',   '',  '',   '1',
    '2',   '3',  '4',  '5',  '6',  '7',  '8',
    '9',  '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '29',
    '30',  '31', '',   '',    '',   '',  ''
  ], 'Days for March 2014 are shown in the calendar');
  
});

test('it should send on-select action when selection is made', function(assert){
  
  let date = Moment('January 21, 2014');
  
  this.set('date', date);
  
  let selection;
  this.on('selection', function (date){
    selection = date.format('DD/MM/YYYY');
  });
  
  this.render(hbs`{{eui-selectdate date isOpen=true on-select='selection'}}`);

  this.currentMonth.selectDay(Moment('January 17, 2014'));
  assert.equal(selection, '17/01/2014', 'Selected January 17, 2014 from current month');
  
  this.nextMonth.selectDay(Moment('February 14, 2014'));
  assert.equal(selection, '14/02/2014', 'Selected Feburary 14, 2014 from next month');
  
});

test('it should accept start and end dates', function(assert){
  
  let date = Moment('January 21, 2014');
  let start = Moment('January 15, 2014');
  let end = Moment('February 4, 2014');
  
  this.set('date', date);
  this.set('start', start);
  this.set('end', end);
  
  this.render(hbs`{{eui-selectdate date isOpen=true start=start end=end}}`);
  
  assert.deepEqual(this.currentMonth.highlighted(), ['15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]);  
  assert.deepEqual(this.nextMonth.highlighted(), ['1', '2', '3', '4']);
});

test('it should accept range and on-range-change arguments', function(assert){
  
  let date = Moment('January 21, 2014');
  
  this.set('date', date);
  
  let startSelected, endSelected, actionHandlerCalled;
  this.on('rangeChanged', function(start, end) {
    actionHandlerCalled = true;
    startSelected = start;
    endSelected = end;
  });
  
  this.render(hbs`{{eui-selectdate date isOpen=true range=true on-range-change='rangeChanged'}}`)
   
  this.currentMonth.selectDay(Moment('January 15, 2014'));
  
  assert.notOk(actionHandlerCalled, 'action was not called');
  
  this.nextMonth.selectDay(Moment('February 4, 2014'));
  
  assert.ok(actionHandlerCalled);
  assert.equal(startSelected.format('DD/MM/YYYY'), '15/01/2014');
  assert.equal(endSelected.format('DD/MM/YYYY'), '04/02/2014');
  
  assert.deepEqual(this.currentMonth.highlighted(), ['15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]);  
  assert.deepEqual(this.nextMonth.highlighted(), ['1', '2', '3', '4']);
});

test('it should accept range and on-range-change arguments', function(assert){
  
  let date = Moment('January 21, 2014');
  
  this.set('date', date);
  this.set('start', Moment('January 15, 2014'));
  this.set('end', Moment('February 4, 2014'));
  
  let startSelected, endSelected, actionHandlerCalled;
  this.on('rangeChanged', function(start, end) {
    actionHandlerCalled = true;
    startSelected = start;
    endSelected = end;
  });
  
  this.render(hbs`{{eui-selectdate date isOpen=true range=true start=start end=end on-range-change='rangeChanged'}}`)

  this.currentMonth.selectDay(Moment('January 18, 2014'));

  assert.deepEqual(this.currentMonth.highlighted(), [ '18' ], 'no highlighted items');

  this.nextMonth.selectDay(Moment('February 8, 2014'));  

  assert.ok(actionHandlerCalled);
  assert.equal(startSelected.format('DD/MM/YYYY'), '18/01/2014');
  assert.equal(endSelected.format('DD/MM/YYYY'), '08/02/2014');
  
  assert.deepEqual(this.currentMonth.highlighted(), ['18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ]);  
  assert.deepEqual(this.nextMonth.highlighted(), ['1', '2', '3', '4', '5', '6', '7', '8']);
});