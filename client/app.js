angular.module('match', ['ngMaterial'])
  .controller('MainCtrl', ['$scope', '$mdDialog', MatchHistoryController])

function MatchHistoryController($scope, $mdDialog) {
  $scope.users = []
  $scope.showPrompt = function(e) {
    $mdDialog.show({
      contentElement: "#myDialog",
      parent: angular.element(document.body),
      targetEvent: e,
      clickOutsideToClose: true
    })
  }
  $scope.addBattleUser = function() {
    axios.post('/users', {
      battleTag: $scope.battleTag,
      battleId: $scope.battleId
    })
    .then(resp => {
      $mdDialog.hide()
      $scope.$apply()
    })
  }
  $scope.deleteUser = function(user) {
    axios.delete(`/users/${user._id}`)
      .then(_ => {
        axios.get('/users')
          .then(resp => {
            $scope.users = resp.data
            $scope.$apply()
          })
      })
  }
  axios.get('/users')
    .then(resp => {
      $scope.users = resp.data
      $scope.$apply()
    })
}
