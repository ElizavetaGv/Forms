document.getElementById('question-save').addEventListener('click', function (){
	var title=document.getElementById('question-title').value;
	var question={'title': title};
	firebase.database().ref('users/test/form/1').set(question, onSaveComplete);
	document.getElementById('loader').setAttribute('style', 'display:block;');
});

function onSaveComplete(err) {
	if (err) {
		document.getElementById('message').innerText='Ошибка при сохранении!'
	}
	else {
		document.getElementById('message').innerText='Вопрос сохранен!'
	}
	document.getElementById('loader').setAttribute('style', 'display:none;');
}
