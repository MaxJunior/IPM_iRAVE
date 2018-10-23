// FUNCOES QUE VERIFICAM ONDE UTILIZADOR CARREGOU
function clickRightButton(){
	return Mouse.click && Mouse.position.x > Ecra.spritePosition.x + 195 && Mouse.position.x < Ecra.spritePosition.x + 210 && Mouse.position.y > Ecra.spritePosition.y + 89 && Mouse.position.y < Ecra.spritePosition.y + 111;
}

function clickHomeButton(){
	return Mouse.click && Mouse.position.x > Ecra.spritePosition.x + 90 && Mouse.position.x < Ecra.spritePosition.x + 105 && Mouse.position.y > Ecra.spritePosition.y + 188 && Mouse.position.y < Ecra.spritePosition.y + 202;
}

function clickArrowUp(){
	return Mouse.click && Mouse.position.x > 269 && Mouse.position.x < 364 && Mouse.position.y > 24 && Mouse.position.y < 81;
}

function clickArrowDown(){
	return Mouse.click && Mouse.position.x > 269 && Mouse.position.x < 364 && Mouse.position.y > 447 && Mouse.position.y < 508;
}
///////////
function clickArrowLeft(){
	return Mouse.click && Mouse.position.x > 119 && Mouse.position.x < 179 && Mouse.position.y > 206 && Mouse.position.y < 300;
}

function clickArrowRight(){
	return Mouse.click && Mouse.position.x > 449 && Mouse.position.x < 508 && Mouse.position.y > 208 && Mouse.position.y < 302;
}

function clickScreen(){
	return Mouse.click && Mouse.position.x > Ecra.spritePosition.x + 10 && Mouse.position.x < Ecra.spritePosition.x + 185 && Mouse.position.y > Ecra.spritePosition.y + 10 && Mouse.position.y < Ecra.spritePosition.y + 185;
}

function clickTimeButton(){
	return Mouse.click && Mouse.position.x > 633 && Mouse.position.x < 783 && Mouse.position.y > 229 && Mouse.position.y < 282;
}

function clickHomeButtonDuration(){
	if(((Mouse.endTime - Mouse.startTime) > 1000) && !Mouse.down && !Mouse.flagMenu){
		Mouse.flagMenu = true;
		return true;
	}
	else
		return false;
}

function clickMenusDetails(){
	return Mouse.click && Mouse.position.x > 333 && Mouse.position.x < 369 && Mouse.position.y > 190 && Mouse.position.y < 220;
}

function clickMenusQtd(){
	return Mouse.click && Mouse.position.x > 333 && Mouse.position.x < 369 && Mouse.position.y > 221 && Mouse.position.y < 259;
}

function clickMenusAtalho(){
	return Mouse.click && Mouse.position.x > 344 && Mouse.position.x < 373 && Mouse.position.y > 266 && Mouse.position.y < 296;
}

function clickIndivsQtd(){
	return Mouse.click && Mouse.position.x > 330 && Mouse.position.x < 369 && Mouse.position.y > 200 && Mouse.position.y < 235;
}

function clickIndivsAtalho(){
	return Mouse.click && Mouse.position.x > 340 && Mouse.position.x < 375 && Mouse.position.y > 254 && Mouse.position.y < 292;
}

function clickSenhas1(){
	return Mouse.click && Mouse.position.x > 331 && Mouse.position.x < 369 && Mouse.position.y > 209 && Mouse.position.y < 243;
}

function clickSenhas2(){
	return Mouse.click && Mouse.position.x > 331 && Mouse.position.x < 369 && Mouse.position.y > 261 && Mouse.position.y < 295;
}

function clickElSenhas(){
	return Mouse.click && Mouse.position.x > 335 && Mouse.position.x < 369 && Mouse.position.y > 228 && Mouse.position.y < 267;
}

function clickNumbersScreen(){
	if (Mouse.click && Mouse.position.x > 320 && Mouse.position.x < 342 && Mouse.position.y > 179 && Mouse.position.y < 208)
		return 1;
	else if (Mouse.click && Mouse.position.x > 355 && Mouse.position.x < 375 && Mouse.position.y > 201 && Mouse.position.y < 227)
		return 2;
	else if (Mouse.click && Mouse.position.x > 368 && Mouse.position.x < 386 && Mouse.position.y > 239 && Mouse.position.y < 268)
		return 3;
	else if (Mouse.click && Mouse.position.x > 354 && Mouse.position.x < 373 && Mouse.position.y > 275 && Mouse.position.y < 305)
		return 4;
	else if (Mouse.click && Mouse.position.x > 319 && Mouse.position.x < 344 && Mouse.position.y > 298 && Mouse.position.y < 323)
		return 5;
	else if (Mouse.click && Mouse.position.x > 286 && Mouse.position.x < 307 && Mouse.position.y > 297 && Mouse.position.y < 324)
		return 6;
	else if (Mouse.click && Mouse.position.x > 250 && Mouse.position.x < 274 && Mouse.position.y > 276 && Mouse.position.y < 304)
		return 7;
	else if (Mouse.click && Mouse.position.x > 237 && Mouse.position.x < 263 && Mouse.position.y > 237 && Mouse.position.y < 265)
		return 8;
	else if (Mouse.click && Mouse.position.x > 251 && Mouse.position.x < 273 && Mouse.position.y > 202 && Mouse.position.y < 227)
		return 9;
	else if (Mouse.click && Mouse.position.x > 283 && Mouse.position.x < 309 && Mouse.position.y > 181 && Mouse.position.y < 295)
		return 0;
	else
		return -1;
}

function clickPlusScreen(subecra){
	if (Mouse.click && Mouse.position.x > 292 && Mouse.position.x < 365 && Mouse.position.y > 218 && Mouse.position.y < 236){
		if(subecra === 0) return 1;
		else return 3;
	}
	else if (Mouse.click && Mouse.position.x > 292 && Mouse.position.x < 365 && Mouse.position.y > 242 && Mouse.position.y < 258){
		if(subecra === 0) return 2;
		else return 4;
	}
	else if (Mouse.click && Mouse.position.x > 292 && Mouse.position.x < 365 && Mouse.position.y > 268 && Mouse.position.y < 286){
		if(subecra === 0) return 3;
		else return 5;
	}
	else if (Mouse.click && Mouse.position.x > 292 && Mouse.position.x < 365 && Mouse.position.y > 291 && Mouse.position.y < 307){
		if(subecra === 0) return 4;
		else return 6;
	}
	else
		return -1;
}

function clickButton1(){
	return Mouse.click && Mouse.position.x > 9 && Mouse.position.x < 108 && Mouse.position.y > 15 && Mouse.position.y < 62;
}

function clickButton2(){
	return Mouse.click && Mouse.position.x > 9 && Mouse.position.x < 108 && Mouse.position.y > 71 && Mouse.position.y < 118;
}

function clickButton3(){
	return Mouse.click && Mouse.position.x > 9 && Mouse.position.x < 108 && Mouse.position.y > 126 && Mouse.position.y < 174;
}

function clickButton4(){
	return Mouse.click && Mouse.position.x > 9 && Mouse.position.x < 108 && Mouse.position.y > 181 && Mouse.position.y < 229;
}




/*************************/


// RETORNA O DIA OU PALCO ONDE O GAJO CLICOU
function theDictator(num){
	switch(num){
		case 1: return [0,0];
				break;
		case 2: return [0,1];
				break;
		case 3: return [1,0];
				break;
		case 4: return [1,1];
				break;
		case 5: return [2,0];
				break;
		case 6: return [2,1];
				break;
	}
}

// ECRA SUBSCRICOES DIAS - DEVOLVE NUMERO DE DIAS A QUE O GAJO SUBSCREVEU
function dia_qtdDias(vec){
	var vecAux = [];
	var cont = 0;
	for(var i=0;i<=2;i++)
		for(var j=0;j<=2;j++){
			if(vec[i][j].length > 0){
				vecAux[cont] = i;
				cont++;
				break;
			}
		}
	return vecAux;
}
// ECRA SUBSCRICOES DIAS - DEVOLVE PALCOS NUM DIA
function dia_qtdPalcos(dia1){
	var palcosAux = 0;
	for(var i = 0; i <= 2; i++)//DIAS
		if (dia1[i].length > 0){
			if(palcosAux === 0) palcosAux = i+1;
			else
				palcosAux = palcosAux*10 + i+1;
		}

	switch(palcosAux){
		case 1: 
		case 2:
		case 3: return palcosAux-1;
				break;
		case 12:return 3;
				break;
		case 13:return 4;
				break;
		case 23:return 5;
				break;
		case 123:return 6;
				break;
	}
}

function escreveBandas(vec,palcos){
	var minus = new Image();
	minus.src = ecras40_sinal[0];
	var space = 0;
	if(palcos === 6){
		for(var i=subecra40V; i<=subecra40V+1; i++){
			if(vec[i].length > 0){
				Canvas2D.canvasContext.font = "16px PT Sans Narrow";
				Canvas2D.canvasContext.fillStyle = 'white';
				for(var j=0; j<vec[i].length;j++){
					drawSprite(minus,{x:280,y:207+22*j+space});
					Canvas2D.canvasContext.fillText(BandasAux[dias[subecra40H]][i][Bandas[dias[subecra40H]][i][j]],286,223+22*j+space);
				}
				space += 50;
			}
		}
	}
	else{
		for(var i=0; i<=2; i++){
			if(vec[i].length > 0){
				Canvas2D.canvasContext.font = "16px PT Sans Narrow";
				Canvas2D.canvasContext.fillStyle = 'white';
				for(var j=0; j<vec[i].length;j++){
					drawSprite(minus,{x:280,y:207+22*j+space});
					Canvas2D.canvasContext.fillText(BandasAux[dias[subecra40H]][i][Bandas[dias[subecra40H]][i][j]],286,223+22*j+space);
				}
				space += 50;
			}
		}
	}
}

// ECRA SUBSCRICOES PALCOS - DEVOLVE PALCOS NUM DIA
function palco_qtdPalcos(vec){
	var vecAux = [];
	var cont = 0;
	for(var i=0;i<=2;i++)
		for(var j=0;j<=2;j++)
			if(vec[j][i].length > 0)
				if(!detectaRepeticoes(i,vecAux)){
					vecAux[cont] = i;
					cont++;
					break;
				}
	return vecAux;
}

function detectaRepeticoes(num,vec){
	for (var i = 0; i<vec.length; i++){
		if(vec[i] === num)
			return true;
	}
	return false;
}

// ECRA SUBSCRICOES PALCOS - DEVOLVE NUMERO DE DIAS A QUE O GAJO SUBSCREVEU
function palco_qtdDias(palco){
	var diasAux = 0;
	for(var i = 0; i <= 2; i++)//DIAS
		if (Bandas[i][palco].length !== 0 && Bandas[i][palco].length !== undefined){
			if(diasAux === 0) diasAux = i+1;
			else
				diasAux = diasAux*10 + i+1;
		}

	switch(diasAux){
		case 1: 
		case 2:
		case 3: return diasAux-1;
				break;
		case 12:return 3;
				break;
		case 13:return 4;
				break;
		case 23:return 5;
				break;
		case 123:return 6;
				break;
	}
}


function palco_escreveBandas(palco,dias){
	var minus = new Image();
	var space = 0;

	minus.src = ecras41_sinal[0];

	if(dias === 6){
		for(var i=subecra41V; i<=subecra41V+1; i++){
			if(Bandas[i][palco].length > 0){
				Canvas2D.canvasContext.font = "16px PT Sans Narrow";
				Canvas2D.canvasContext.fillStyle = 'white';
				for(var j=0; j<Bandas[i][palco].length;j++){
					drawSprite(minus,{x:280,y:207+22*j+space});
					Canvas2D.canvasContext.fillText(BandasAux[i][palco][Bandas[i][palco][j]],286,223+22*j+space);
				}
				space += 50;
			}
		}
	}
	else{
		for(var i=0; i<=2; i++){
			if(Bandas[i][palco].length > 0){
				Canvas2D.canvasContext.font = "16px PT Sans Narrow";
				Canvas2D.canvasContext.fillStyle = 'white';
				for(var j=0; j<Bandas[i][palco].length;j++){
					drawSprite(minus,{x:280,y:207+22*j+space});
					Canvas2D.canvasContext.fillText(BandasAux[i][palco][Bandas[i][palco][j]],286,223+22*j+space);
				}
				space += 50;
			}
		}
	}
}

function addNotificacaoBandas(){
	if(notificacoes[dia].length === 0)
		notificacoes[dia][notificacoes[dia].length] = [palco,posicao];
	else{
		for(var i = 0; i<notificacoes[dia].length; i++){
			if(tempos[dia][notificacoes[dia][i][0]][notificacoes[dia][i][1]] > tempos[dia][palco][posicao]){
				for(var j = notificacoes[dia].length-1; j>=i; j--){
					notificacoes[dia][j+1] = notificacoes[dia][j];
				}
				notificacoes[dia][i] = [palco,posicao];
				return;
			}
				
		}
		notificacoes[dia][notificacoes[dia].length] = [palco,posicao];
	}
}

function removeNotificacaoBandas(){
	var i;
	if(notificacoes[dia].length === 1) i = 0;
	else
		for(i = 0; i<notificacoes[dia].length; i++){
			if (compareArrays(notificacoes[dia][i],[palco,posicao])){
				break;
			}

		}
	notificacoes[dia].splice(i,1);
}

function compareArrays(vec1,vec2){
	if(vec1.length !== vec2.length)
		return false;

	else{
		var cont = 0;
		for(var j = 0; j < 2; j++){
			if(vec1[j] === vec2[j])
				cont++;
			}
		if(cont === 2) return true;

		return false;
	}
}

// FUNCAO QUE DESENHA SPRITES
function drawSprite (sprite,position){
	Canvas2D.canvasContext.save();
	Canvas2D.canvasContext.translate(position.x, position.y);
	Canvas2D.canvasContext.drawImage(sprite,0,0,sprite.width,sprite.height,0,0,sprite.width,sprite.height);
	Canvas2D.canvasContext.restore();
}

function drawArrows(){
	iRave.arrowDownSprite.src = 'Sprites/Arrows/arrowdown.png';
    iRave.arrowUpSprite.src = 'Sprites/Arrows/arrowup.png';
    iRave.arrowLeftSprite.src = 'Sprites/Arrows/arrowleft.png';
    iRave.arrowRightSprite.src = 'Sprites/Arrows/arrowright.png';
}

function drawButtons(){
	iRave.button1Sprite.src = 'Sprites/Notificacoes/minutoteste.png';
	iRave.button2Sprite.src = 'Sprites/Notificacoes/horateste.png';
	iRave.button3Sprite.src = 'Sprites/Notificacoes/diateste.png';
	iRave.button4Sprite.src = 'Sprites/Notificacoes/eventoteste.png';
}

var angle = 1.5*Math.PI;
var contador = 0;

function drawUnlockCircle(){
	if(contador !== 60){
		angle = (angle + Math.PI/30);
		Canvas2D.canvasContext.beginPath();
		Canvas2D.canvasContext.strokeStyle = "#90ee90";
		Canvas2D.canvasContext.lineWidth = 6;
		Canvas2D.canvasContext.arc(200+105,100+142,85,1.5*Math.PI,angle,false);
		Canvas2D.canvasContext.stroke();
		contador++;
	}
	else{
		contador = 0;
		ecra++;
	}
	
}

function getFirstItem(){
	var e;
	for(e = 0;e <= 9; e++){
		if(itemsArray[e].qtd > 0){
			return e;
		}
	}
	return -1;
}

function nextItem(e){
	var j;
	for(j = e+1;j <= 9; j++){
		if(itemsArray[j].qtd > 0){
			return j
		}
	}
	return -1;
}

function prevItem(e){
	var k;
	for(k = e-1; k >= 0;k--){
		if(itemsArray[k].qtd > 0){
			return k
		}
	}
	return -1;
}

function getLastItem(){
	var h;
	for(h = 9; h>=0;h--){
		if(itemsArray[h].qtd > 0){
			return h;
		}
	}
	return -1;
}

function getLastEscrito(){
	var h;
	for(h = 9; h>=0;h--){
		if(itemsArray[h].escrito1 === 1){
			return h;
		}
	}
	return -1;
}



function escreveStringTempo(){
	Canvas2D.canvasContext.fillStyle = "white";
	Canvas2D.canvasContext.font = "12px PT Sans Narrow";
	Canvas2D.canvasContext.fillText(h + ":" + m,340,197);
}

function checkTime(i) {
	if ( i < 10){
		i = "0" + i;
	}
	return i;
}

// COLOCA DECORRER OU TERMINADO EM CIMA DA BANDA
function anulaConcertos(subecraH,subecraV){
	var space = 0;
	if(ecra === 5)
		for(var j = subecraV; j<=subecraV+1; j++){ // PALCO BANDAS
			for(var l = 0; l <= 1; l++){ // POSICOES BANDAS
				if(tempos[subecraH][j][l] < h || subecraH < dAux){
					var iconeTerminado = new Image();
					iconeTerminado.src = 'Sprites/teste.png';
					drawSprite(iconeTerminado,{x:285,y:206+22*l+space});
				}
				if(tempos[subecraH][j][l] === h && subecraH === dAux){
					var iconeDecorrer = new Image();
					iconeDecorrer.src = 'Sprites/decorrer.png';
					drawSprite(iconeDecorrer,{x:285,y:206+22*l+space});
				}
			}
			space += 50;
		}
	else{
		for(var j = subecraV; j<=subecraV+1; j++){ // DIA BANDAS
			for(var l = 0; l <= 1; l++){ // POSICOES BANDAS
				if(tempos[j][subecraH][l] < h && j <= dAux || j < dAux){
					var iconeTerminado = new Image();
					iconeTerminado.src = 'Sprites/teste.png';
					drawSprite(iconeTerminado,{x:285,y:206+22*l+space});
				}
				if(tempos[j][subecraH][l] === h && j === dAux){
					var icone = new Image();
					icone.src = 'Sprites/decorrer.png';
					drawSprite(icone,{x:285,y:206+22*l+space});
				}
			}
			space += 50;
		}
	}
}

function detectorHorasBandas(){
	for(var i = 0; i<notificacoes[dia].length; i++)
		if(tempos[dia][notificacoes[dia][0][0]][notificacoes[dia][0][1]] === tempos[dia][palco][posicao])
			return true;
	return false;
}

function detectorNotificacoes(){
	if(ecra !== 37){
		if(m === 30 && notificacoes[dAux].length > 0){
			if(h+1 === tempos[dAux][notificacoes[dAux][0][0]][notificacoes[dAux][0][1]])
				ecra = 37;
		}
	}
}

function detectorNotiSenhas(){
	if(ecra != 46){
		for(i = 0;i <= 4; i++){
			if(h === senhas_29[i].hora && parseInt(m) === senhas_29[i].minuto - 2 && senhas_29[i].resd === 1){
				ecra46return = ecra;
				ecra = 46;
				senhas_29[i].resd = 0;
				itemsSenhas--;
				notiVar = i;
				return;
			}
		}
	}
}

function getLastEscritoSenha(){
	var h;
	for(h = 4; h>=0;h--){
		if(senhas_29[h].escrito === 1){
			return h;
		}
	}
	return -1;
}

function getLastSenha(){
	var h;
	for(h = 4; h>=0;h--){
		if(senhas_29[h].resd > 0){
			return h;
		}
	}
	return -1;
}
function prevSenha(e){
	var k;
	for(k = e-1; k >= 0;k--){
		if(senhas_29[k].resd > 0){
			return k
		}
	}
	return -1;
}
function nextSenha(e){
	var k;
	for(k = e+1; k <= 4;k++){
		if(senhas_29[k].resd === 1){
			return k
		}
	}
	return -1;
}
function getFirstSenha(){
	var e;
	for(e = 0;e <= 4; e++){
		if(senhas_29[e].resd === 1){
			return e;
		}
	}
	return -1;
}

function disponibilizaPin(){
	console.log('D:    '+dAux+' H:    '+h+   ' M:    '+m);
	console.log('Dpin: '+dPin+' Hpin: '+hPin+' Mpin: '+mPin);
	if(parseInt(m) >= parseInt(mPin) + 5)
		return true;
	else if(h === hPin){
		console.log('entrei');
		if(dAux > dPin)
			return true;
		else
			return false;
	}
	else if (h === hPin + 1){
		if(m+60 >= mPin + 5)
			return true;
		else if(dAux > dPin)
			return true;
		else
			return false;
	}
	else if(h > hPin + 1)
		return true;
	else if(dAux > dPin)
		return true;
	else
		false;
}

