const header = new Headers({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
})

const vote_url = new URL('https://sf-pyw.mosyag.in/sse/vote/stats')

const ES = new EventSource(vote_url, header)


// Пишем функцию POST-запрос
function postRequest(pet) {
	$.post(`https://sf-pyw.mosyag.in//sse/vote/${pet}`, function(data){
		if(data.message == "Ok"){
			$('.thanks_show_results').show();	
		}
	});

	$('.start').hide(); 
}

$('.Results').click(() => {
	$('.results_bar').show();
	$('.thanks_show_results').hide();
});

//получаем данные с сервера
ES.onmessage = message => {
	voteData = JSON.parse(message.data)
	dogsNow =  (voteData.dogs * 100 / (voteData.dogs + voteData.cats + voteData.parrots)).toFixed();
	catsNow =  (voteData.cats * 100 / (voteData.dogs + voteData.cats + voteData.parrots)).toFixed();
	parrNow =  (voteData.parrots * 100 / (voteData.dogs + voteData.cats + voteData.parrots)).toFixed();
	
// Записываем данные в прогресс-бар
	$('.dogs_').width(String(dogsNow) + "%").attr('aria-valuenow', dogsNow).text(`Dogs - ${dogsNow}%`);

	$('.cats_').width(String(catsNow) + "%").attr('aria-valuenow', catsNow).text(`Cats - ${catsNow}%`);

	$('.parrots_').width(String(parrNow) + "%").attr('aria-valuenow', parrNow).text(`Parrots - ${parrNow}%`);
}



