import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  "class-name": DS.attr(),
  isSelected: DS.attr('boolean')
});
