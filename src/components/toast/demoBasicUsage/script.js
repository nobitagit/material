angular.module('toastBasicDemo', ['ngMaterial'])

.controller('AppCtrl', function($scope, $mdToast, $mdDialog) {
  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  $scope.showSimpleToast = function() {
    var pinTo = $scope.getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent('Simple Toast!')
        .position(pinTo)
        .hideDelay(3000)
    );
  };

  $scope.showActionToast = function() {
    var pinTo = $scope.getToastPosition();
    var toast = $mdToast.simple()
      .textContent('Marked as read')
      .actionKey('z')
      .actionHint('Press the Control-"z" key combination to ')
      .action('UNDO')
      .dismissHint('Activate the Escape key to dismiss this toast.')
      .highlightAction(true)
      .highlightClass('md-accent') // Accent is used by default, this just demonstrates the usage.
      .position(pinTo)
      .hideDelay(0);

    $mdToast.show(toast).then(function(response) {
      if (response === 'ok') {
        alert('You selected the \'UNDO\' action.');
      }
    });
  };

})

.controller('ToastCtrl', function($scope, $mdToast) {
  $scope.closeToast = function() {
    $mdToast.hide();
  };
});
