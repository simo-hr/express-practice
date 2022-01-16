var btnsubmit_oncilck = function (event) {
  var $submit = $(this)
  var $form = $submit.parents('form')
  $form.attr('method', $submit.data('method'))
  $form.attr('action', $submit.data('action'))
  $form.submit()
}

var document_onready = function (event) {
  $('input[type=submit]').on('click', btnsubmit_oncilck)
}

$(document).ready(document_onready)
