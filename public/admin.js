var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {

	var admin = nga.application('Cohaerens admin panel').baseApiUrl('http://127.0.0.1:3000/');

	var cs = nga.entity('cs').identifier(nga.field('_id'));

	cs.listView().fields([
		nga.field('title'),
		nga.field('fqStart'),
		nga.field('fqEnd')
	])
		.listActions(['edit', 'delete'])
		.filters([
			nga.field('title')
			.label('Filter')
			.pinned(true)
	]);

	cs.creationView().fields([
		nga.field('title', 'string')
			.validation({ required: true, minlength: 3, maxlength: 20 }),
		nga.field('fqStart', 'number'),
		nga.field('fqEnd', 'number')
	]);

	cs.editionView().fields(cs.creationView().fields());

	admin.addEntity(cs)

	var place = nga.entity('place').identifier(nga.field('_id'));

	place.listView().fields([
		nga.field('title'),
		nga.field('lat'),
		nga.field('long')
	])
		.listActions(['edit', 'delete'])
		.filters([
			nga.field('title')
			.label('Filter')
			.pinned(true)
	]);

	place.creationView().fields([
		nga.field('title', 'string')
			.validation({ required: true, minlength: 3, maxlength: 20 }),
		nga.field('lat', 'float'),
		nga.field('long', 'float')
	]);

	place.editionView().fields(place.creationView().fields());

	admin.addEntity(place)

	var condition = nga.entity('condition').identifier(nga.field('_id'));

	condition.listView().fields([
		nga.field('title'),
		nga.field('cs', 'reference')
			.targetEntity(cs)
			.targetField(nga.field('title')),
		nga.field('sv'),
		nga.field('kp'),
		nga.field('count'),
		nga.field('power'),
		nga.field('place', 'reference')
			.targetEntity(place)
			.targetField(nga.field('title')),
		nga.field('date', 'datetime'),
		nga.field('result'),
	])
		.listActions(['edit', 'delete'])
		.filters([
			nga.field('title')
			.label('Filter')
			.pinned(true)
	]);

	condition.creationView().fields([
		nga.field('title')
			.validation({ required: true, minlength: 3, maxlength: 20 }),
		nga.field('cs', 'reference')
		  .targetEntity(cs)
		  .targetField(nga.field('title')),
		nga.field('sv', 'choice').choices([
				{value: 0, label: 'Спокойный'},
				{value: 1, label: 'Возбужденный'}
			]),
		nga.field('kp', 'choice').choices([
				{value: 0, label: '0'},
				{value: 1, label: '1'},
				{value: 2, label: '2'},
				{value: 3, label: '3'},
				{value: 4, label: '4'},
				{value: 5, label: '5'},
				{value: 6, label: '6'},
				{value: 7, label: '7'},
				{value: 8, label: '8'},
				{value: 9, label: '9'},
			]),
		nga.field('count'),
		nga.field('power', 'choice').choices([
				{value: 0, label: 'A'},
				{value: 1, label: 'B'},
				{value: 2, label: 'C'},
				{value: 3, label: 'M'},
				{value: 4, label: 'X'},
			]),
		nga.field('place', 'reference')
		  .targetEntity(place)
		  .targetField(nga.field('title')),
		nga.field('date', 'datetime'),
		nga.field('result', 'text'),
	]);

	condition.editionView().fields(condition.creationView().fields());

	admin.addEntity(condition)
	
	nga.configure(admin);
}]);

/*myApp.config(['RestangularProvider', function(RestangularProvider) {
	RestangularProvider.addElementTransformer('cs', function(element) {
		for (var key in element.docs) {
			element[key] = element.docs[key];
		}

		return element;
	});
}]);
*/
myApp.config(['RestangularProvider', function (RestangularProvider) {
	RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
		if (operation == "getList") {
			//delete params._page;
			//delete params._perPage;
			delete params._end;
			delete params._sortDir;
			delete params._sortField;
		}
		return { params: params };
	});
/*    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
		if (operation == 'getList' && what == 'cs') {
			if (params._filters) {
				for (var filter in params._filters) {
					params[filter] = params._filters[filter];
				}
				delete params._filters;
			}
		}
		return { params: params };
	});*/
}]);

/*myApp.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
        if (operation == 'getList' && what == 'cs') {
            params.offset = (params._page - 1) * params._perPage;
            params.limit = params._perPage;
            delete params._page;
            delete params._perPage;
        }
        return { params: params };
    });
}]);*/