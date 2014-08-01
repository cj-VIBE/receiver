$(function() {
  // Helpers
  var getSensors = function() {
    return $('[data-sensor]');
  };

  var updateInterface = function(response) {
    getSensors().each(function() {
      var $this = $(this);
      var data = response[$this.data('sensor')];

      if (!data) return;

      $this.find('[data-reading]').each(function(){
        var $reading = $(this);
        $reading.text(data[$reading.data('reading')]);
      });
    });
  };

  var poll = function() {
    var id = $('[data-info="id"]').val();
    if (!id) return;

    var url = '/report?clientId=' + id;

    $.ajax(url, {
      method: 'GET',
      dataType: 'json',
      success: updateInterface
    })
  };

  var pollInterval = setInterval(poll, 1000);
  poll();
});
