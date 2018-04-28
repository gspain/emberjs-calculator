import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    this.get('store').push({
      data: [{
        id: 0,
        type: 'theme',
        attributes: {
          name: 'Default',
          "class-name": 'default'
        }
      }]
    });

    let themes = this.get('store').findAll('theme');
    return themes;
  }
});
