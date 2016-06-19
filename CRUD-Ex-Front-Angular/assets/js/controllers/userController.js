angular.module('User', [])
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider
      .when('/users', {
        templateUrl: 'views/users-list.html',
        controller: 'UserController',
        controllerAs: 'User'
      })

      .when('/users/create', {
        templateUrl: 'views/users-create.html',
        controller: 'UserCreateController',
        controllerAs: 'UserCreate'
      })

      .when('/users/:id', {
        templateUrl: 'views/users-details.html',
        controller: 'UserDetailsController',
        controllerAs: 'UserDetails'
      })

      .when('/users/edit/:id', {
        templateUrl: 'views/users-edit.html',
        controller: 'UserEditController',
        controllerAs: 'UserEdit'
      });

}])

.service('UserService', UserService)

.controller('UserController', ['UserService', UserController])
.controller('UserCreateController', ['UserService', UserCreateController])
.controller('UserDetailsController', ['UserService', '$routeParams', UserDetailsController])
.controller('UserEditController', [ 'UserService', '$routeParams', UserEditController ]);

function UserService($http) {
    let vm = this;
    const userRotaAPI = 'users/';
    const url = 'http://localhost:3000/api/' + userRotaAPI;


    vm.list = function() {
      const method = 'GET';
      const request = {
        url: url,
        method: method
      }
      return $http(request);
    }

    vm.findOne = function(id){
      const method = 'GET';
      const  request = {
        url: url + id,
        method: method
      }
      return $http(request);
    }

    vm.remove = function(user) {
      const method = 'DELETE';
      const request = {
        url: url + user._id,
        method: method
      }
      return $http(request);
    }

    vm.create = function(user) {
      const method = 'POST';
      const request = {
        url: url,
        method: method,
        data: user
      }
      return $http(request);
    }

    vm.update = function(user) {
      const method = 'PUT';

      const request = {
        url: url + user._id,
        method: method,
        data: user
      }
      delete user._id;
      return $http(request);
    }

    // vm.update = function(user) {
    //   const url = 'http://localhost:3000/api/' + userRotaAPI + user._id;
    //   const method = 'PUT';
    //   delete user._id;
    //   //console.log('user: ', user);
    //   return $http({
    //     url: url,
    //     method: method,
    //     data: user
    //   })
    // }
  }

  function UserController(UserService) {
    var vm = this;
    vm.users = [];
    vm.modelOptions = {
      updateOn: 'blur default'
    , debounce: {
        default: 1000
      , blur: 0
      }
    }

    UserService
    .list()
    .success(function(data) {
      console.log('Data: ', data);
      vm.users = data;
    })
    .error(function(err){
      console.log("Error: ", err);
    });

    vm.remove = remove;
    function remove(user) {
      const filterRemovedUser = function(el) {
        return user._id != el._id;
      }
      if(confirm('Remover o User?')) {
        UserService
        .remove(user)
        .success(function(data) {
          console.log('Removed: ', data);
          if(data.n == 1) vm.users = vm.users.filter(filterRemovedUser);
        })
        .error(function(err){
          console.log("Error: ", err);
        });
      }
      else alert('Ok!');
    }
  }

  function UserCreateController(UserService) {
    var vm = this;

    vm.submitForm = submitForm;
    function submitForm(user) {
      UserService
      .create(user)
      .success(function(data) {
        console.log('CREATED: ', data);
        vm.created = data;
      })
      .error(function(err){
        console.log("Error: ", err);
        vm.error = err;
      });
    }
  }

  function UserDetailsController(UserService, $routeParams) {
    var vm = this;
    vm.users = [];

    UserService
    //console.log('$routeParams.id: ', $routeParams.id)
      .findOne($routeParams.id)
      .success(function(data) {
        console.log('Data: ', data);
        vm.user = data;
        //$scope.user = data;
      })
      .error(function(err){
        console.log("Error: ", err);
      });
  }

  function UserEditController(UserService, $routeParams) {
    var vm = this;
    vm.users = [];

    UserService
    //console.log('$routeParams.id: ', $routeParams.id)
      .findOne($routeParams.id)
      .success(function(data) {
        console.log('Data: ', data);
        vm.form = data;
      })
      .error(function(err){
        console.log("Error: ", err);
      });

    vm.updateForm = updateForm;
    function updateForm(user) {
      UserService
      .update(user)
      .success(function(data) {
        console.log('Data: ', data);
        vm.user = data;
        vm.form = [];
      })
      .error(function(err){
        console.log("Error: ", err);
      });
    }
  }
