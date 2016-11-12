var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {

    var admin = nga.application('My First Admin').baseApiUrl('http://127.0.0.1:3000/');

    var cs = nga.entity('cs').identifier(nga.field('_id'));

    cs.listView().fields([
    	nga.field('_id').isDetailLink(true),
        nga.field('title'),
        nga.field('fqStart'),
        nga.field('fqEnd')
    ]);

    cs.creationView().fields([
    	nga.field('title', 'string'),
    	nga.field('fqStart', 'number'),
    	nga.field('fqEnd', 'number')
    ]);

    cs.editionView().fields(cs.creationView().fields());

    admin.addEntity(cs)

    var place = nga.entity('place').identifier(nga.field('_id'));

    place.listView().fields([
    	nga.field('_id').isDetailLink(true),
        nga.field('title'),
        nga.field('lat'),
        nga.field('long')
    ]);

    place.creationView().fields([
    	nga.field('title'),
    	nga.field('lat'),
    	nga.field('long')
    ]);

    place.editionView().fields(place.creationView().fields());

    admin.addEntity(place)

    var condition = nga.entity('condition').identifier(nga.field('_id'));

    condition.listView().fields([
        nga.field('title'),
        nga.field('result'),
    ]);

    admin.addEntity(condition)
    
    nga.configure(admin);
}]);

myApp.config(['RestangularProvider', function (RestangularProvider) {

	RestangularProvider.setRestangularFields({
  		id: "_id"
	});

    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation == "getList") {
            delete params._page;
            delete params._perPage;
            delete params._end;
            delete params._sortDir;
            delete params._sortField;
        }
        return { params: params };
    });
}]);