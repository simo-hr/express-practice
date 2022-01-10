const btnSubmit_onclick = (event) => {
  const $submit = $(this)
  const $form = $submit.parents('form')
  $form.attr('method', $submit.data('method'))
  $form.attr('action', $submit.data('action'))
  console.log($form)
  $form.submit()
}

const documentOnReady = (event) => {
  $("input[type='submit'").on('click', btnSubmit_onclick)
}

$(document).ready(documentOnReady)
