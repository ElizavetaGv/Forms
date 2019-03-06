//вопрос

document.getElementById('question-save').addEventListener('click', function (){
	var title=document.getElementById('question-title').value;
	var question={'title': title};
	firebase.database().ref('users/test/form/1').set(question, onSaveComplete);
	document.getElementById('loader').setAttribute('style', 'display:block;');
	
});
firebase.database().ref('users/test/form/1').on('value', onLoad);

function onSaveComplete(err) {
	if (err) {
		document.getElementById('message').innerText='Ошибка при сохранении!'
	}
	else {
		document.getElementById('message').innerText='Вопрос сохранен!'
	}
	document.getElementById('loader').setAttribute('style', 'display:none;');
}

function onLoad(snapshot) {
	var question=snapshot.val();
	document.getElementById('question-title').value=question.title
}

//о себе

document.getElementById('myself-save').addEventListener('click', function () {
	var myselfTitle=document.getElementById('myself-title').value;
	var myself={'about': myselfTitle};
	firebase.database().ref('users/test/profile').set(myself, onSaveCompleteMyself);
	document.getElementById('loader').setAttribute('style', 'display:block;');
});
firebase.database().ref('users/test/profile').on('value', onLoadMyself);

function onSaveCompleteMyself(err) {
	if (err) {
		document.getElementById('message').innerText='Ошибка при сохранении!'
	}
	else {
		document.getElementById('message').innerText='Информация сохранена!'
	}
	document.getElementById('loader').setAttribute('style', 'display:none;');
}

function onLoadMyself(snapshot) {
	var myself=snapshot.val();
	if (myself!=null) {
	document.getElementById('myself-title').value=myself.about}
}