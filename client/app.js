angular.module('match', ['ngMaterial'])
  .controller('MainCtrl', ['$scope', '$mdDialog', MatchHistoryController])

angular.module('Login', ['ngMaterial'])
  .controller('login-control', ['$scope', '$mdDialog', LoginController])

function LoginController($scope) {
  $scope.newUser = function() {
    axios.post('/users/signup', {
      username: $scope.username,
      password: $scope.password
    })
    .then(resp => {
      window.location = '/'
    })
  }
}

function MatchHistoryController($scope, $mdDialog) {
  $scope.players = []
  $scope.showPrompt = function(e) {
    $mdDialog.show({
      contentElement: "#myDialog",
      parent: angular.element(document.body),
      targetEvent: e,
      clickOutsideToClose: true
    })
  }
  $scope.viewMatches = function(user) {
    axios.get(`/matches/${user._id}`)
      .then(resp => {
        $scope.matches = resp.data.matches
        $scope.$apply()
      })
  }
  $scope.addBattleUser = function() {
    axios.post('/players', {
      battleTag: $scope.battleTag,
      battleId: $scope.battleId
    })
    .then(resp => {
      $scope.players.push(resp.data)
      $mdDialog.hide()
      $scope.$apply()
    })
  }
  $scope.deleteUser = function(user) {
    axios.delete(`/players/${user._id}`)
      .then(_ => {
        axios.get('/players')
          .then(resp => {
            $scope.players = resp.data
            $scope.$apply()
          })
      })
  }
  axios.get('/players')
    .then(resp => {
      $scope.players = resp.data
      $scope.$apply()
    })
    .catch(err => {
      if (err.toString().indexOf(302) !== -1) window.location = '/login.html'
    })
}
