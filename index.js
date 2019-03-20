//список анкет
document.getElementById('open-profile-edit').addEventListener('click', onOpenProfileEdit);
function onOpenProfileEdit(){
	document.getElementById('profile-edit').classList.remove('hidden');
	document.getElementById('forms-list').classList.add('hidden');
}
firebase.database().ref('users').on('value', onFormsListLoaded);
function onFormsListLoaded(snapshot){
	document.getElementById('list-content').innerText='';
	snapshot.forEach(addFormToList);
}
function addFormToList(snapshot){
	var form=snapshot.val();
	var el=document.createElement('div');
	el.classList.add('form-item');
	el.innerText=form.profile.about;
	document.getElementById('list-content').appendChild(el);
}

//вопрос
var userId='test';
document.getElementById('question-save').addEventListener('click', function (){
	var title=document.getElementById('question-title').value;
	var question={'title': title};
	var list = firebase.database().ref('users/'+userId+'/form');
	var newItem=list.push();
	newItem.set(question, onSaveComplete);
	document.getElementById('loader').setAttribute('style', 'display:block;');
	
});
firebase.database().ref('users/'+userId+'/form').on('value', onQuestionLoad);

function onSaveComplete(err) {
	if (err) {
		document.getElementById('message').innerText='Ошибка при сохранении!'
	}
	else {
		document.getElementById('message').innerText='Вопрос сохранен!'
	}
	document.getElementById('loader').setAttribute('style', 'display:none;');
	document.getElementById('newQuestion').setAttribute('style', 'display:none;');
	document.getElementById('question-title').value='';
}

function onQuestionLoad(snapshot) {
	var questions=snapshot.val();
	document.getElementById('questionsContainer').innerHTML='';
	//for (var key in questions) {
	snapshot.forEach(function(snapshot){	
		var question = snapshot.val();
		var key=snapshot.key;
		var el = document.createElement('div');
		var titleEl = document.createElement('textarea');
		titleEl.value=question.title;
		var saveEl=document.createElement('button');
		saveEl.innerText='Сохранить';
		saveEl.addEventListener('click',function(){
			firebase.database().ref('users/'+userId+'/form/'+key).set({title: titleEl.value},onSaveComplete);
			document.getElementById('loader').setAttribute('style', 'display:block;');
			firebase.database().ref('users/'+userId+'/form/'+key).update({title: titleEl.value});
		});
		el.appendChild(titleEl);
		el.appendChild(saveEl);
		//удаление
		var removeEl=document.createElement('button');
		removeEl.innerText='Удалить'
		removeEl.addEventListener('click',function(){
			firebase.database().ref('users/'+userId+'/form/'+key).remove()
		});
		el.appendChild(removeEl);
		document.getElementById('questionsContainer').appendChild(el);
	});
}

//добавление нового вопроса

document.getElementById('question-add').addEventListener('click', function() {
	document.getElementById('newQuestion').setAttribute('style', 'display:block;');
});


//о себе

document.getElementById('myself-save').addEventListener('click', function () {
	var myselfTitle=document.getElementById('myself-title').value;
	var myself={'about': myselfTitle};
	firebase.database().ref('users/'+userId+'/profile').set(myself, onSaveCompleteMyself);
	document.getElementById('loader').setAttribute('style', 'display:block;');
});
firebase.database().ref('users/'+userId+'/profile').on('value', onLoadMyself);

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