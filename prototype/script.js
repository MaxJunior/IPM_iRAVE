// ACTUALIZA PAGINA
window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };


var Canvas2D = {
	canvas : undefined,
	canvasContext : undefined,
	backgroundSprite : undefined,
	backgroundSpritePosition : {x : 106, y : 7},
	backgroundMusic : undefined
};

// OBJECTO DO RELOGIO
var iRave = {
	sprite : undefined,
	spritePosition : {x : 200, y : 100},
	arrowUpSprite: undefined,
	arrowUpSpritePosition : {x : 255, y : 10},
	arrowDownSprite: undefined,
	arrowDownSpritePosition : {x : 255, y : 435},
	arrowLeftSprite: undefined,
	arrowLeftSpritePosition : {x : 110, y : 195},
	arrowRightSprite: undefined,
	arrowRightSpritePosition : {x : 440, y : 195},
	button1Sprite: undefined,
	button1SpritePosition : {x : 0, y : 5},
	button2Sprite: undefined,
	button2SpritePosition : {x : 0, y : 60},
	button3Sprite: undefined,
	button3SpritePosition : {x : 0, y : 115},
	button4Sprite: undefined,
	button4SpritePosition : {x : 0, y : 170}
};

var Ecra = {
	sprite : undefined,
	spritePosition : {x: 218, y : 154}
};

// OBJECTOS INPUT
var Mouse = {
	down : false,
	position : {x : 0, y: 0},
	click : false,
	startTime : undefined,
	endTime : undefined,
	flagMenu : false
};


/////////////////// EVENT LISTENERS ///////////////////
document.onmousemove = handleMouseMove;
document.onmousedown = handleMouseDown;
document.onmouseup = handleMouseUp;
document.onclick = handleMouseClick;


function handleMouseMove(evt) {
    Mouse.position = {x : evt.pageX, y : evt.pageY };
}

function handleMouseDown(evt) {
   	Mouse.down = true;
    Mouse.startTime = new Date();
    console.log("X: " + Mouse.position.x + " Y: " + Mouse.position.y);
}

function handleMouseUp(evt) {
    Mouse.down = false;
    Mouse.endTime = new Date();
}

function handleMouseClick() {
    Mouse.click = true;
}


// FUNCAO QUE INICIALIZA O OBJECTO IRAVE
function start() {
	// INICIALIZA CANVAS
    Canvas2D.canvas = document.getElementById("myCanvas");
    Canvas2D.canvasContext = Canvas2D.canvas.getContext("2d");
    Canvas2D.canvasContext.width = window.innerWidth;
  	Canvas2D.canvasContext.height = window.innerHeight;

    // INICIALIZA SPRITES
    iRave.sprite = new Image();
    Ecra.sprite = new Image();
    iRave.arrowDownSprite = new Image();
    iRave.arrowUpSprite = new Image();
    iRave.arrowLeftSprite = new Image();
    iRave.arrowRightSprite = new Image();
    iRave.button1Sprite = new Image();
    iRave.button2Sprite = new Image();
    iRave.button3Sprite = new Image();
    iRave.button4Sprite = new Image();

    Canvas2D.backgroundSprite = new Image();
    Canvas2D.backgroundSprite.src = 'Sprites/Backgrounds/3_1.png';

	iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';
	Ecra.sprite.src = ecras0[0];
	drawArrows();
	drawButtons();

    window.setTimeout(mainLoop,1000);
}

document.addEventListener('DOMContentLoaded', start);

// FUNCAO QUE APAGA JANELA
function clear(){
	Canvas2D.canvasContext.clearRect(0,0,Canvas2D.canvas.width,Canvas2D.canvas.height);
}

// FUNCAO QUE DESENHA IRAVE
function draw (){
	Canvas2D.canvas.width = window.innerWidth;
  	Canvas2D.canvas.height = window.innerHeight;

  	drawSprite(Canvas2D.backgroundSprite,Canvas2D.backgroundSpritePosition);
	drawSprite(iRave.sprite, iRave.spritePosition);
	drawSprite(Ecra.sprite, Ecra.spritePosition);
	drawSprite(iRave.arrowUpSprite, iRave.arrowUpSpritePosition);
	drawSprite(iRave.arrowDownSprite, iRave.arrowDownSpritePosition);
	drawSprite(iRave.arrowLeftSprite, iRave.arrowLeftSpritePosition);
	drawSprite(iRave.arrowRightSprite, iRave.arrowRightSpritePosition);
	drawSprite(iRave.button1Sprite,iRave.button1SpritePosition);
	drawSprite(iRave.button2Sprite,iRave.button2SpritePosition);
	drawSprite(iRave.button3Sprite,iRave.button3SpritePosition);
	drawSprite(iRave.button4Sprite,iRave.button4SpritePosition);
}

function update(){

	today = new Date();
	h = (today.getHours() + hAux)%24;
	m = (today.getMinutes() + mAux)%60;
	h = checkTime(h);
	m = checkTime(m);
	detectorNotificacoes();
	detectorNotiSenhas();
	if(clickButton1()){
		if(m === 59){
			hAux++;
			if(h+1 === 24)
				dAux++;
		}
		if(dAux === 3) ecra = 22;
		mAux++;
		Mouse.click = false;
	}
	if(clickButton2()){
		if(h+1 === 24)
			dAux++;
		if(dAux === 3) ecra = 22;
		hAux++;
		Mouse.click = false;
	}
	if(clickButton3()){
		dAux++;
		for(i = 0;i <= 4;i++){
			senhas_29[i].resd = 0;
			itemsSenhas--;
		}
		if(dAux === 3) ecra = 22;
		Mouse.click = false;
	}
	if(clickButton4()){
		if(ecra !== 37)
			if(notificacoes[0].length > 0 || notificacoes[1].length > 0 || notificacoes[2].length > 0){
				mAux += (90 - m)%60;
				for(var i = dAux; i <= 2; i++)
					if(notificacoes[dAux].length === 0)
						dAux++;
				if(dAux === 3) ecra = 22;
				hAux += tempos[dAux][notificacoes[dAux][0][0]][notificacoes[dAux][0][1]] - h - 1;
				
				ecraAux = ecra;
				ecra = 37;
				Mouse.click = false;
			}
	}

	switch (ecra){
		/* MENU PRETO
		case 0: Ecra.sprite.src = ecras0[0];
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';
				if(clickRightButton())
					ecra++;
				
				Mouse.click = false;
				break;
		*/
		// ECRA DESBLOQUEAR
		case 1: Ecra.sprite.src = ecras1[0];
				iRave.sprite.src = 'Sprites/iRave/iRave2.png';

				Canvas2D.canvasContext.fillStyle = "white";
				Canvas2D.canvasContext.font = "35px PT Sans Narrow";
				Canvas2D.canvasContext.fillText(h + ":" + m,270,215);
				
				if(Mouse.down && Mouse.position.x > Ecra.spritePosition.x + 61 && Mouse.position.x < Ecra.spritePosition.x + 130 && Mouse.position.y > Ecra.spritePosition.y + 95 && Mouse.position.y < Ecra.spritePosition.y + 159){
    				drawUnlockCircle();
				}
				else {
					contador = 0;
					angle = 1.5*Math.PI;
				}
	
				Mouse.click = false;
				break;
		// MENU PRINCIPAL
		case 2: if(ajuda){
					Ecra.sprite.src = ecras2[4];
					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';

					if(clickHomeButton())
						ajuda = false;
				}
				else{
					Ecra.sprite.src = ecras2[subecra2];
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';

					if(clickArrowUp()){
						if (subecra2 === 0) subecra2 = 3;
						else subecra2--;
						}
					if(clickArrowDown() ){
						if (subecra2 === 3) subecra2 = 0;
						else subecra2++;
					}
					if(clickHomeButton()){
						subecra2 = 0;
						ecra = 1;
					}
					if (clickRightButton())
						switch(subecra2){
							// HORARIO/AGENDA
	    					case 0: ecra = 3;
	    							break;
	    					// PAGAMENTOS
	    					case 1: if(Total_a_Pagar === 0){
	    								ecra = 20;
	    								tempoInicial = new Date();
	    							}
	    							else if(contPinErrado === 3){
	    								if(disponibilizaPin()){
	    									contPinErrado = 0;
	    									ecra = 11;
	    								}
	    								else{
	    									ecra = 13;
	    									tempoInicial = new Date();
	    								}
	    							}
	    							else ecra = 11;
	    							break;
	    					// RESERVA
	    					case 2: ecra = 7;
	    							break;
	    					//AJUDA
	    					case 3: ajuda = true;
	    							break;
						}
				}
				Mouse.click = false;
				break;
		// MENU AGENDA
		case 3: escreveStringTempo();

				if(ajuda){
					Ecra.sprite.src = ecras3[3];
					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';

					if(clickHomeButton())
						ajuda = false;
				}
				else{
					Ecra.sprite.src = ecras3[subecra3];
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';

					if(clickArrowUp()){
						if (subecra3 === 0) subecra3 = 2;
						else subecra3--;
					}
					if(clickArrowDown() ){
						if (subecra3 === 2) subecra3 = 0;
						else subecra3++;
					}
					if(clickHomeButton()){
						ecra = 2;
						subecra3 = 0;
					}
					if (clickRightButton()){
						switch(subecra3){
							// ECRA CARTAZ
							case 0: ecra = 4;
									break;
							// ECRA SUBSCRICOES
							case 1: if(numBandasSubs === 0) ecra = 21
									else
										ecra = 4;
									break;
							// ECRA AJUDA
							case 2: ajuda = true;
									break;
						}
					}
				}
				Mouse.click = false;
				break;
		// ECRA ORDENAR POR DIA OU PALCO
		case 4: escreveStringTempo();

				if(ajuda){
					Ecra.sprite.src = ecras4[3];
					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';

					if(clickHomeButton())
						ajuda = false;
				}
				else{
					if(subecra3 === 0)
						Ecra.sprite.src = ecras4[subecra4];
					else if(subecra3 === 1)
						Ecra.sprite.src = ecras4_subs[subecra4];
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';

					if(clickArrowUp()){
						if (subecra4 === 0) subecra4 = 2;
						else subecra4--;
					}
					if(clickArrowDown() ){
						if (subecra4 === 2) subecra4 = 0;
						else subecra4++;
					}
					if(clickHomeButton()){
						if(clickHomeButtonDuration()){
							Mouse.flagMenu = false;
							ecra = 2;
							subecra3 = 0;
						}
						else
							ecra = 3;
						subecra4 = 0;
					}
					if (clickRightButton()){
						switch(subecra4){
							// ECRA DIA
							case 0: if(subecra3 === 0){
										ecra = 5;
										subecra5H = dAux;
									}
									else{
										ecra = 40;
										dias = [];
										palcos = 0;
										subecra40H = dAux;
									}
									break;
							// ECRA PALCO
							case 1: if(subecra3 === 0){
										ecra = 6;
										if(dAux === 0) subecra6V = 0;
										else subecra6V = 1;
									}
									else{
										ecra = 41;
										dias = 0;
										palcos = [];
										if(dAux === 0) subecra41V = 0;
										else subecra41V = 1;
									}
									break;
							// ECRA AJUDA
							case 2: ajuda = true;
									break;
						}
					}
				}
				Mouse.click = false;
				break;
    	// ECRA DIA CARTAZ
    	case 5: escreveStringTempo();
    			anulaConcertos(subecra5H,subecra5V);

    			if(clickArrowLeft()){
    				if (subecra5H === 0) subecra5H = 2;
    				else subecra5H--;
    			}
				if(clickArrowRight()){
					if (subecra5H === 2) subecra5H = 0;
    				else subecra5H++;
				}
				if(clickArrowUp() && subecra5V === 1)
					subecra5V = 0;
				if(clickArrowDown() && subecra5V === 0)
					subecra5V = 1;

				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra3 = 0;
						subecra4 = 0;
					}
					else
						ecra = 4;
					subecra5H = 0;
					subecra5V = 0;
				}
				numPlusBandas = clickPlusScreen(subecra5V);
				if(numPlusBandas !== -1){
					dia = subecra5H;
					palco = theDictator(numPlusBandas)[0];
					posicao = theDictator(numPlusBandas)[1];

					if(! (tempos[dia][palco][posicao] <= h || subecra5H < dAux)){
						if(Bandas[dia][palco].length === 2){
							ecra = 24;
							tempoInicial = new Date();
						}
						else if (Bandas[dia][palco].length === 1 && Bandas[dia][palco][0] === posicao){
							ecra = 24;
							tempoInicial = new Date();
						}
						else if(detectorHorasBandas()){
							ecraAux = ecra;
							ecra = 42;
						}
						else{
							ecraAux = ecra;
							ecra = 16;
						}
					}
				}
    			Ecra.sprite.src = ecras5[2*subecra5H+subecra5V];
    			iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
    			Mouse.click = false;
				break;
		// ECRA PALCO CARTAZ
		case 6: escreveStringTempo();
				anulaConcertos(subecra6H,subecra6V);

				if(clickArrowLeft()){
    				if (subecra6H === 0) subecra6H = 2;
    				else subecra6H--;
    			}
				if(clickArrowRight()){
					if (subecra6H === 2) subecra6H = 0;
    				else subecra6H++;
				}
				if(clickArrowUp() && subecra6V === 1)
					subecra6V = 0;
				if(clickArrowDown() && subecra6V === 0)
					subecra6V = 1;

				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra4 = 0;
						subecra3 = 0;
					}
					else
						ecra = 4;
					subecra6H = 0;
					subecra6V = 0;
				}
				numPlusBandas = clickPlusScreen(subecra6V);
				if(numPlusBandas !== -1){
					palco = subecra6H;
					dia = theDictator(numPlusBandas)[0];
					posicao = theDictator(numPlusBandas)[1];

					if(! (tempos[dia][palco][posicao] <= h && dia <= dAux || dia < dAux)){
						if(Bandas[dia][palco].length === 2){
							ecra = 24;
							tempoInicial = new Date();
						}
						else if (Bandas[dia][palco].length === 1 && Bandas[dia][palco][0] === posicao){
							ecra = 24;
							tempoInicial = new Date();
						}
						else{
							ecraAux = ecra;
							ecra = 16;
						}
					}
				}
    			Ecra.sprite.src = ecras6[2*subecra6H+subecra6V];
    			iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
    			Mouse.click = false;
				break;
		// MENU RESERVAS
		case 7: escreveStringTempo();
				if(ajuda){
					if(subecra7_1 === 0)
	    				Ecra.sprite.src = ecras7[5];
	    			else
						Ecra.sprite.src = ecras7[6];
	    			iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';

					if(clickArrowUp() && subecra7_1 === 1)
						subecra7_1 = 0;
					if(clickArrowDown() && subecra7_1 === 0)
						subecra7_1 = 1;
	    			if(clickHomeButton())
	    				ajuda = false;
				}
				else{
					if(subecra7 === 1 && itemsSenhas === 0){
						iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
					}
					else{
						iRave.sprite.src = 'Sprites/iRave/iRave1.png';
					}
	    			Ecra.sprite.src = ecras7[subecra7];

					if(clickArrowUp()){
	    				if (subecra7 === 0) subecra7 = 4;
		    				else subecra7--;
		    		}
	    			if(clickArrowDown()){
	    				if (subecra7 === 4) subecra7 = 0;
	    				else subecra7++;
	    			}
	    			if(clickHomeButton()){
						ecra = 2;
						subecra7 = 0;
						
					}
	    			if (clickRightButton()){
	    				switch(subecra7){
	    					// MENU DIVERSOES
	    					case 0: ecra = 26;
	    							break;
	    					// MENU SENHAS
	    					case 1: if(itemsSenhas != 0){
										soffSet = getFirstSenha();
										if(itemsSenhas > 2){
											if(senhas_29[soffSet].nome === "Take-Away")
												subecra31 = 9;
											else if(senhas_29[nextSenha(soffSet)].nome === "Take-Away")
												subecra31 = 8;
											else subecra31 = 2;
										}
										else if(itemsSenhas === 1){
											if(senhas_29[soffSet].nome === "Take-Away")
												subecra31 = 0;
											else subecra31 = 5;
										}
										else if(itemsSenhas === 2){
											if(senhas_29[soffSet].nome === "Take-Away")
												subecra31 = 7;
											else if(senhas_29[nextSenha(soffSet)].nome === "Take-Away")
												subecra31 = 6;
											else subecra31 = 1;
										}
										ecra = 31;
									}
									break;
	    					// MENU TAKEAWAY
	    					case 2: if (Total_a_Pagar !== 0)
										ecra = 33;
									else  
										ecra = 8;
	    							break;
	    					// MENU WC
	    					case 3: 
									if(sWC.resd === 0){
										ecra = 27;
									}
	    							break;
	    					// MENU AJUDA
	    					case 4: ajuda = true;
	    							break;
	    				}
	    			}
				}
    			Mouse.click = false;
				break;
		// MENU TAKE-AWAY
		case 8: escreveStringTempo();
				if(ajuda){
	    			iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
	    			Ecra.sprite.src = ecras8[3];
	    			if(clickHomeButton())
	    				ajuda = false;
				}
				else{
					if(listItems === 0 && subecra8 === 2){
						iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png'
					}
					else iRave.sprite.src = 'Sprites/iRave/iRave1.png';
					Ecra.sprite.src = ecras8[subecra8];
					if(clickArrowUp()){
	    				if (subecra8 === 0) subecra8 = 3;
		    				else subecra8--;
		    		}
	    			if(clickArrowDown()){
	    				if (subecra8 === 3) subecra8 = 0;
	    				else subecra8++;
	    			}
					if(clickHomeButton()){
						if(clickHomeButtonDuration() && listItems > 0){
							Mouse.flagMenu = false;
							ecra = 38;
							ecra38return = 8;
						}
						else if(clickHomeButtonDuration()){
							Mouse.flagMenu = false;
							ecra = 2;
							subecra7 = 0;
						}
						else
							ecra = 7;
						subecra8 = 0;
					}
					if (clickRightButton()){
						ecra25return = 8;
						switch(subecra8){
							// TAKEAWAY INDIVIDUAL
							case 0: ecra = 10;
									break;
							// TAKEAWAY MENU
							case 1: ecra = 9;
									break;
							// TAKEAWAY CARRINHO DE COMPRAS
							case 2: if(listItems > 0){
										
										ecra = 25;
									}
									break
							// TAKEAWAY AJUDA
							case 3: ajuda = true;
									break
						}
					}
				}
				
				Mouse.click = false;
				break;
		// MENU MENU
		case 9: escreveStringTempo();

				Ecra.sprite.src = ecras9[subecra9];
				if(clickArrowUp()){
    				if (subecra9 === 0) subecra9 = 2;
    				else subecra9--;
    			}
    			if(clickArrowDown()){
    				if (subecra9 === 2) subecra9 = 0;
    				else subecra9++;
    			}
    			if(clickHomeButton()){
					if(clickHomeButtonDuration() && listItems > 0){
						Mouse.flagMenu = false;
						ecra = 38;
						ecra38return = 9;
					}
					else if(clickHomeButtonDuration() && listItems === 0){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra8 = 0;
						subecra7 = 0;
					}
					else
						ecra = 8;
					subecra9 = 0;
				}
    			if (clickRightButton()){
					ecra = 34;
					subecra34 = subecra9;
				}		
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
    			Mouse.click = false;
				break;
		// MENU INDIVIDUAL
		case 10:escreveStringTempo();

				Ecra.sprite.src = ecras10[subecra10];
				if(clickArrowUp()){
    				if (subecra10 === 0) subecra10 = 6;
    				else subecra10--;
    			}
    			if(clickArrowDown()){
    				if (subecra10 === 6) subecra10 = 0;
    				else subecra10++;
    			}
    			if(clickHomeButton()){
					if(clickHomeButtonDuration() && listItems > 0){
						Mouse.flagMenu = false;
						ecra = 38;
						ecra38return = 10;
					}
					else if(clickHomeButtonDuration() && listItems === 0){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra8 = 0;
						subecra7 = 0;
					}
					else
						ecra = 8;
					subecra10 = 0;
				}
				if(clickRightButton()){
					ecra = 39;
					subecra39 = subecra10;
				}
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
    			Mouse.click = false;
				break;
		//MENU PAGAMENTOS -> A PAGAR
		case 11:if (clickRightButton()){
					if(!ajudaNum) ecra = 53;
					else ecra = 12;
    			}

				if(clickHomeButton()){
					ecra = 45;
					ecra45return = 11;
				}
				Ecra.sprite.src = ecras11[0];
				Canvas2D.canvasContext.fillStyle = "white";
				Canvas2D.canvasContext.font = "20px Consolas";
				Canvas2D.canvasContext.fillText(Total_a_Pagar,290,242);
				iRave.sprite.src = 'Sprites/iRave/iRave1.png'
				Mouse.click = false;
				  
				break;
		//PAGAMENTOS PIN INSERT
		case 12:Canvas2D.canvasContext.font = "20px Verdana";
				Canvas2D.canvasContext.fillStyle = "white";
				Canvas2D.canvasContext.fillText(pinStr[pinIndex],288-AcertoPinStr,261);
				
				pinZone = true;

				numPin = clickNumbersScreen();
				if(numPin >= 0 && pinIndex < 4){
					pin[pinIndex] = numPin;
					pinIndex++;
					AcertoPinStr += 2;
				}
				
				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						pinIndex = 0;
						ecra = 45;
						ecra45return = 12;
					}
					else{
						if(pinIndex === 0)
							ecra = 11;
						else
							pinIndex--;
					}
				}
				
				if(clickRightButton() && pinIndex === 4){
					for(pinIndexAux = 0; pinIndexAux < 5; pinIndexAux++){
						if(pinTest[pinIndexAux] !== pin[pinIndexAux])
							wrongPin = 1;
					}
					if(wrongPin === 1){
						ecra = 13;
						wrongPin = 0;
						contPinErrado++;
					}
					else
						ecra = 14;
					AcertoPinStr = 0;
					tempoInicial = new Date();
				}
				Ecra.sprite.src = ecras12[2];
				if(pinIndex === 4)
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				else
					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
				Mouse.click = false;
				break;
		//ECRA PIN ERRADO
		case 13:escreveStringTempo();

				pinStrIndex = 0;
				pinIndex = 0;
				digitsIndex = 0;
				tempoFinal = new Date();

				if((tempoFinal - tempoInicial) > 2000 || clickRightButton()){
					if(contPinErrado === 3){
						if(pinZone){
							dPin = dAux;
							hPin = h;
							mPin = m;
						}
						ecra = 2;
						pinZone = false;
					}
					else
						ecra = 12;
				}
				if(clickHomeButton())
					ecra = 53;

				Ecra.sprite.src = ecras13[contPinErrado-1];
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';
				Mouse.click = false;
				break;
		//ECRA PIN CERTO
		case 14:escreveStringTempo();

				pinStrIndex = 0;
				pinIndex = 0;
				digitsIndex = 0;
				contPinErrado = 0;
				Total_a_Pagar = 0;
				tempoFinal = new Date();

				for(i = 0;i<= 9;i++)
					itemsArray[i].qtd = 0;
				
				if((tempoFinal - tempoInicial) > 2000 || clickRightButton())
					ecra = 2;

				Ecra.sprite.src = ecras14[0];
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png'
				Mouse.click = false;
				break;
		//RESERVAS : QUANTIDADE MENU
		case 15:Ecra.sprite.src = ecras15[0];
				Total_a_Pagar = 0;
				if(clickHomeButton()){
					if(clickHomeButtonDuration() && listItems > 0){
						Mouse.flagMenu = false;
						ecra = 38;
						ecra38return = 15;
					}
					else if(clickHomeButtonDuration() && listItems === 0){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra7 = 0;
						subecra8 = 0;
						subecra9 = 0;
					}
					else if(itemsArray[7 + subecra34].qtd === 0){
						ecra = 36;
						subecra36 = 7 + subecra34;
					}
					else if(itemsArray[7 + subecra34].qtd < 10 && itemsArray[7 + subecra34].qtd > 0){
						itemsArray[7 + subecra34].qtd = 0;
					}
					else
						itemsArray[7 + subecra34].qtd = itemsArray[7 + subecra34].qtd%10;
				}
				
				if(clickRightButton() && itemsArray[7 + subecra34].qtd > 0 ){
					var i ;
					for(i = 0; i <= 9;i++){
						if(itemsArray[i].qtd > 0){
							listItems++;
							Total_a_Pagar += itemsArray[i].qtd * itemsArray[i].preco;
							
						}
					}
					ecra = 32;
					ecra32return = 32;
				}
				
				Canvas2D.canvasContext.font = "20px Verdana";
				Canvas2D.canvasContext.fillStyle = "white";

				numQtd = clickNumbersScreen();
				if(numQtd !== -1 && itemsArray[7 + subecra34].qtd < 10){
					itemsArray[7 + subecra34].qtd = (itemsArray[7 + subecra34].qtd * 10) + numQtd;
				}
				if(itemsArray[7 + subecra34].qtd < 10 && itemsArray[7 + subecra34].qtd > 0){
					Canvas2D.canvasContext.fillText(itemsArray[7 + subecra34].qtd,299,260);
				}
				else if(itemsArray[7 + subecra34].qtd > 10 && itemsArray[7 + subecra34].qtd < 100){
					Canvas2D.canvasContext.fillText(itemsArray[7 + subecra34].qtd,292,260);
				}
				if(itemsArray[7 + subecra34].qtd > 0){
					iRave.sprite.src = 'Sprites/iRave/iRave1.png'
				}
				else{
					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png'
				}
				Mouse.click = false;
				break;
		// ECRA AGENDAR?
		case 16:escreveStringTempo();

				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra3 = 0;
						subecra4 = 0;
						subecra5 = 0;
						subecra6 = 0;
					}
					else
						ecra = ecraAux;
					ecraAux = 0;
				}
				if(clickRightButton()){
					ecra = 17;
					Bandas[dia][palco][Bandas[dia][palco].length] = posicao;
					if(Bandas[dia][palco].length === 2)
						if(Bandas[dia][palco][0]>Bandas[dia][palco][1]){
							var aux = Bandas[dia][palco][0];
							Bandas[dia][palco][0] = Bandas[dia][palco][1];
							Bandas[dia][palco][1] = aux;
						}
					numBandasSubs++;
					addNotificacaoBandas();
					tempoInicial = new Date();
				}
				if(ecraAux === 5)
					Ecra.sprite.src = ecras16_dia[dia*6+palco*2+posicao];
				else if(ecraAux === 6)
					Ecra.sprite.src = ecras16_palco[palco*6+dia*2+posicao];
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break;
		// ECRA AGENDADO
		case 17:escreveStringTempo();
				tempoFinal = new Date();

				if((tempoFinal - tempoInicial) > 2000 || clickRightButton())
					ecra = ecraAux;

				if(ecraAux === 5)
					Ecra.sprite.src = ecras17_dia[dia*6+palco*2+posicao];
				else if(ecraAux === 6)
					Ecra.sprite.src = ecras17_palco[palco*6+dia*2+posicao];
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';
				Mouse.click = false;
				break;
		//RESERVAS : QUANTIDADE INDIV
		case 18:Ecra.sprite.src = ecras18[0];
				Total_a_Pagar = 0;
				if(clickHomeButton()){
					if(clickHomeButtonDuration() && listItems > 0){
						Mouse.flagMenu = false;
						ecra = 38;
						ecra38return = 19;
					}
					else if(clickHomeButtonDuration() && listItems === 0){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra7 = 0;
						subecra8 = 0;
						subecra10 = 0;
						subecra39 = 0;
					}
					else if(itemsArray[subecra39].qtd === 0){
						ecra = 36;
						subecra36 = subecra39;
					}
					else if(itemsArray[subecra39].qtd < 10 && itemsArray[subecra39].qtd > 0)
						itemsArray[subecra39].qtd = 0;
					else
						itemsArray[subecra39].qtd = itemsArray[subecra39].qtd%10;
				}
				
				if(clickRightButton() && itemsArray[subecra39].qtd > 0 ){
					var i ;
					for(i = 0; i <= 9;i++){
						if(itemsArray[i].qtd > 0){
							listItems++;
							Total_a_Pagar += itemsArray[i].qtd * itemsArray[i].preco;
						}
					}
					ecra = 32;
					ecra32return = 18;
					subecra39 = 0;
				}
				
				Canvas2D.canvasContext.font = "20px Verdana";
				Canvas2D.canvasContext.fillStyle = "white";
				
				numQtd = clickNumbersScreen();
				if(numQtd !== -1 && itemsArray[subecra39].qtd < 10){
					itemsArray[subecra39].qtd = (itemsArray[subecra39].qtd * 10) + numQtd;
				}
				if(itemsArray[subecra39].qtd < 10 && itemsArray[subecra39].qtd > 0){
					Canvas2D.canvasContext.fillText('' + itemsArray[subecra39].qtd,299,260);
				}
				else if(itemsArray[subecra39].qtd > 10 && itemsArray[subecra39].qtd < 100){
					Canvas2D.canvasContext.fillText(itemsArray[subecra39].qtd,292,260);
				}
				if(itemsArray[subecra39].qtd > 0){
					iRave.sprite.src = 'Sprites/iRave/iRave1.png'
				}
				else{
					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png'
				}

				Mouse.click = false;
				break;
		//RESERVAS-> PAGAMENTO
		case 19:escreveStringTempo();

				if (clickRightButton()) {
					subecra = 0 ;
					ecra  = 11 ;
				}
				if  (clickHomeButton ()) {
					subecra = 0;
					ecra = 2;
				}
				Ecra.sprite.src = ecras19[subecra];
				Mouse.click = false;
				break;	
		// ECRA SEM PAGAMENTOS A EFECTUAR			
		case 20:escreveStringTempo();
				tempoFinal = new Date();

				if((tempoFinal - tempoInicial) > 2000 || clickRightButton())
					ecra = 2;

				Ecra.sprite.src = ecras20[0];
				iRave.sprite.src = 'Sprites/iRave/iRave2.png'
				Mouse.click = false;
				break;
		//RESERVAS : QUANTIDADE ANULAR
		case 21:escreveStringTempo();

				if (clickHomeButton())
					ecra = 3;
				if(clickRightButton()){
					ecra = 4;
					subecra3 = 0;
				}
				Ecra.sprite.src = ecras21[0];
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break;
		case 22:Ecra.sprite.src = 'Sprites/final.png';
				iRave.sprite.src = 'Sprites/iRave/iRave2.png';
				break;
		// ECRA DESEJA APAGAR BANDA DA AGENDA
		case 23:escreveStringTempo();
				
				if(subecra4 === 0){
					if(clickHomeButton()){
						if(clickHomeButtonDuration()){
							Mouse.flagMenu = false;
							ecra = 2;
							subecra3 = 0;
							subecra4 = 0;
							subecra40H = 0;
							subecra40V = 0;
						}
						else{
							ecra = 40;
						}
					}
					if(clickRightButton()){
						if(Bandas[dia][palco].length === 1)
							Bandas[dia][palco].splice(0,1);
						else{
							if(posicao === 0)
								Bandas[dia][palco][0] = Bandas[dia][palco][1];
							Bandas[dia][palco].splice(1,1);
						}
						numBandasSubs--;
						removeNotificacaoBandas();

						dias = dia_qtdDias(Bandas);
						if(dias.length === 0){
							ecra = 21;
							subecra40H = 0;
							subecra40V = 0;
							subecra41H = 0;
							subecra41V = 0;
							Mouse.click = false;
							break;
						}
						else{
							if(Bandas[dia][0].length === 0 && Bandas[dia][1].length === 0 && Bandas[dia][2].length === 0)
								subecra40H = 0;
							ecra = 40;
						}
					}
					Ecra.sprite.src = ecras23_dia[dias[subecra40H]];
				}
				else{
					if(clickHomeButton()){
						if(clickHomeButtonDuration()){
							Mouse.flagMenu = false;
							ecra = 2;
							subecra3 = 0;
							subecra4 = 0;
							subecra41H = 0;
							subecra41V = 0;
						}
						else{
							ecra = 41;
						}
					}
					if(clickRightButton()){
						if(Bandas[dia][palco].length === 1)
							Bandas[dia][palco].splice(0,1);
						else{
							if(posicao === 0)
								Bandas[dia][palco][0] = Bandas[dia][palco][1];
							Bandas[dia][palco].splice(1,1);
						}
						numBandasSubs--;
						removeNotificacaoBandas();

						palcos = palco_qtdPalcos(Bandas);
						if(palcos.length === 0){
							ecra = 21;
							subecra40H = 0;
							subecra40V = 0;
							subecra41H = 0;
							subecra41V = 0;
							Mouse.click = false;
							break;
						}
						else{
							if(Bandas[0][palco].length === 0 && Bandas[1][palco].length === 0 && Bandas[2][palco].length === 0)
								subecra41H = 0;
							ecra = 41;
						}
					}
					Ecra.sprite.src = ecras23_palco[palcos[subecra41H]];
				}

				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break;
		// ECRA JA RESERVOU ESSA BANDA
		case 24:escreveStringTempo();
				tempoFinal = new Date();

				if((tempoFinal - tempoInicial) > 2000 || clickRightButton()){
					if(subecra4 === 0)
						ecra = 5;
					else
						ecra = 6;
				}

				if(subecra4 === 0)
					Ecra.sprite.src = ecras24_dia[dia];
				else
					Ecra.sprite.src = ecras24_palco[palco];

				Mouse.click = false;
				break;
		//RESERVAS : LISTA DE COMPRAS
		case 25:Ecra.sprite.src = ecras25[subecra25];
				for(i = 0;i<=9;i++){
					itemsArray[i].escrito1 = 0;
				}
				
				if(listItems != 0){
					ecra = 25;
					ioffSet = getFirstItem();
				}
				else if(listItems <= 5){
					subecra25 = 0;
				}
				else{
					subecra25 = 1;
				}
				listyCoord = 220;
				cap25 = 0;
				Canvas2D.canvasContext.font = "17px Consolas";
				Canvas2D.canvasContext.fillStyle = 'white';
				if(ecra25return === 43){
					Canvas2D.canvasContext.fillText(sTW.nmr,275,204);
				}
				else
					Canvas2D.canvasContext.fillText(sTW.nmr + 10,275,204);
				Canvas2D.canvasContext.font = "15px Consolas";
				if((today.getMinutes() + mAux)%60 >= 55){

					Canvas2D.canvasContext.fillText(checkTime(h + 1) + ":" + checkTime((today.getMinutes() + mAux)%60 + 5 - 60),325,204);
				}
				else{
					Canvas2D.canvasContext.fillText(checkTime(h) + ":" + checkTime((today.getMinutes() + mAux)%60 + 5),325,204);
				}
				
				
				Canvas2D.canvasContext.font = "13px Consolas";
				for(i = ioffSet;i <= 9; i++){
					if(itemsArray[i].qtd > 0 && cap25 < 5){
						Canvas2D.canvasContext.fillText(itemsArray[i].qtd + "x ",listxCoord,listyCoord);
						Canvas2D.canvasContext.fillText(itemsArray[i].nome + " ",listxCoord + 30,listyCoord);
						Canvas2D.canvasContext.fillText((itemsArray[i].preco * itemsArray[i].qtd + "\u20AC"), listxCoord + 105,listyCoord);
						itemsArray[i].escrito1 = 1;
						cap25++;
						listyCoord += 15;
					}
				}
				
				Canvas2D.canvasContext.font = "15px Consolas";
				if(subecra25 === 3){
					Canvas2D.canvasContext.fillText("Total:" + Total_a_Pagar + "\u20AC",listxCoord +10,listyCoord + 2);
				}
				i--;
				if(clickArrowDown() && cap25 === 5 && listItems > 5 && getLastEscrito() != getLastItem()){
					if(nextItem(ioffSet) != -1){
						ioffSet = nextItem(ioffSet);
					}
					if(nextItem(getLastEscrito()) === getLastItem()){
						subecra25 = 3
					}
					else{
						subecra25 = 2;
					}
				}
				
				if(clickArrowUp() && listItems > 5 && ioffSet > 0){
					if(prevItem(ioffSet) != -1){
						ioffSet = prevItem(ioffSet);
					}
					if(ioffSet === 0){
						subecra25 = 1;
					}
					else if(getLastEscrito() === getLastItem()){
						subecra25 = 2;
					}
				}
				
				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra38return = 25;
						ecra = 38;
					}
					else{
						ecra = ecra25return;
						ecra42return = 25;
					}
				}
				
				if(clickRightButton() && ecra25return != 43){
					if(ecra25return === 42){
						ecra = 11;
					}
					else{
						ecra = 28;
						
						subecra28 = subecra25;
					}
				}
				if(ecra25return === 43){
					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
				}
				else{
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				}
				Mouse.click = false;
				break;
		// MENU DIVERSOES
		case 26:escreveStringTempo();
				if (ajuda){
					if(clickHomeButton())
						ajuda = false;
					Ecra.sprite.src = ecras26[4];
					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
				}
				else{
					if(clickArrowUp()){
						if (subecra26 === 0) subecra26 = 3;
						else subecra26--;
						}
					if(clickArrowDown() ){
						if (subecra26 === 3) subecra26 = 0;
						else subecra26++;
					}
					if(clickHomeButton()){
						if(clickHomeButtonDuration()){
							Mouse.flagMenu = false;
							ecra = 2;
						}
						else
							ecra = 7;
						subecra26 = 0;
					}
					if (clickRightButton()){
						switch (subecra26){
							// ESCALADA
							case 0: if(sEsc.resd === 0)ecra = 50;
									break;
							// RODA GIGANTE
							case 1: if(sRG.resd === 0)ecra = 51;
									break;
							// SLIDE
							case 2: if(sSld.resd === 0)ecra = 52;
									break;
							// AJUDA
							case 3: ajuda = true;
									break;
						}
					}
					Ecra.sprite.src = ecras26[subecra26];
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				}
				
				Mouse.click = false;
				break;
		// ECRA SANITARIOS
		case 27:escreveStringTempo();
				
				if(subecra27 === 0){
					if(clickHomeButton()){
						if(clickHomeButtonDuration()){
							Mouse.flagMenu = false;
							ecra = 2;
						}
						else
							ecra = 7;
					}
					
					if(clickRightButton()){
						subecra27 = 1;
						tempoInicial = new Date();
						sWC.nmr += 10;
					
						if((today.getMinutes() + mAux)%60 >= 55){
							sWC.hora = h + 1; 
							sWC.minuto = (today.getMinutes() + mAux)%60 + 5 - 60;
						}
						else{
							sWC.hora = h;
							sWC.minuto = (today.getMinutes() + mAux)%60 + 5;
						}
						sWC.resd = 1;
						itemsSenhas++;
					}
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';
					Canvas2D.canvasContext.font = "14px Pt Sans Narrow";
					if((today.getMinutes() + mAux)%60 >= 55){
						Canvas2D.canvasContext.fillText(checkTime(h + 1) + ':' + checkTime((today.getMinutes() + mAux)%60 + 5 - 60),328,230);
					}
					else
						Canvas2D.canvasContext.fillText(checkTime(h) + ':' + checkTime((today.getMinutes() + mAux)%60 + 5),328,230);
				}
				else{
					tempoFinal = new Date();

					if((tempoFinal - tempoInicial) > 2000 || clickRightButton()){
						ecra = 7;
						subecra27 = 0;
					}

					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';
					Canvas2D.canvasContext.font = "16px Pt Sans Narrow";
					Canvas2D.canvasContext.fillText(sWC.nmr,330,230);
				}
				
				Ecra.sprite.src = ecras27[subecra27];  
			  	Mouse.click = false;
				break;
		//SUBECRA LISTA
		case 28:Ecra.sprite.src = ecras28[subecra28]; 
				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra38return = 28;
						ecra = 38;
					}
					else{
						ecra = 25;
					}
				}
				
				if(clickIndivsAtalho()){
					ecra = 2;
					sTW.nmr += 10;
					if((today.getMinutes() + mAux)%60 >= 55){
						sTW.hora = h + 1; 
						sTW.minuto = (today.getMinutes() + mAux)%60 + 5 - 60;
					}
					else{
						sTW.hora = h;
						sTW.minuto = (today.getMinutes() + mAux)%60 + 5;
					}
					sTW.resd = 1;
					itemsSenhas++;
				}
				
				if(clickIndivsQtd()){
					ecra = 11;
					sTW.nmr = 34;
				}
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
			  	Mouse.click = false;
				break;
		//CANCELAR QUANTIDADE MENU
		case 29:escreveStringTempo();
				
				Ecra.sprite.src = ecras29[subecra];
				if(clickHomeButton()){
					ecra = 15;
					subecra = qtdMenuFlag;
				}
				if(clickRightButton()){
					ecra = 9;
					subecra = qtdMenuFlag;
				}
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break;
		//RESERVAS: CONTENT MENUS
		case 30:escreveStringTempo();
				
				Ecra.sprite.src = ecras30[subecra];
				if(clickHomeButton()){
					ecra = 9;
					subecra = qtdMenuFlag;
				}
				
				if(clickRightButton()){
					ecra = 15;
					subecra = qtdMenuFlag;
				}
				
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break;
		//ECRA SENHAS
		case 31:Ecra.sprite.src = ecras31[subecra31];
				escreveStringTempo();
				if(clickHomeButton()){
					if(clickHomeButtonDuration() && listItems > 0){
						Mouse.flagMenu = false;
						ecra = 2;
					}
					else{
						ecra = 7;
					}
				}
				
				if(clickArrowDown() && nextSenha(soffSet) != getLastSenha()){
					if(subecra31 === 2){
						if(nextSenha(nextSenha(soffSet)) != getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome != "Take-Away"){
							subecra31 = 3;
						}
						else if(nextSenha(nextSenha(soffSet)) != getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome === "Take-Away"){
							subecra31 = 10;
						}
						else if(nextSenha(nextSenha(soffSet)) === getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome != "Take-Away"){
							subecra31 = 4;
						}
						else if(nextSenha(nextSenha(soffSet)) === getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome === "Take-Away"){
							subecra31 = 12;
						}
						soffSet = nextSenha(soffSet);
					}
					else if(subecra31 === 3){
						if(nextSenha(nextSenha(soffSet)) === getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome != "Take-Away"){
							subecra31 = 4;
						}
						else if(nextSenha(nextSenha(soffSet)) != getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome != "Take-Away"){
							subecra31 = 3;
						}
						else if(nextSenha(nextSenha(soffSet)) != getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome === "Take-Away"){
							subecra31 = 10;
						}
						else if(nextSenha(nextSenha(soffSet)) === getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome === "Take-Away"){
							subecra31 = 12;
						}
						soffSet = nextSenha(soffSet);
					}
					else if(subecra31 === 8){
						if(nextSenha(nextSenha(soffSet)) === getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome != "Take-Away"){
							subecra31 = 13;
						}
						else if(nextSenha(nextSenha(soffSet)) != getLastSenha() && senhas_29[nextSenha(nextSenha(soffSet))].nome != "Take-Away"){
							subecra31 = 10;
						}
						soffSet = nextSenha(soffSet);
					}
					else if(subecra31 === 9){
						if(nextSenha(nextSenha(soffSet)) === getLastSenha()){
							subecra31 = 4;
						}
						else if(nextSenha(nextSenha(soffSet)) != getLastSenha()){
							subecra31 = 3;
						}
						soffSet = nextSenha(soffSet);
					}
					else if(subecra31 === 10){
						if(nextSenha(nextSenha(soffSet)) === getLastSenha()){
							subecra31 = 13;
						}
						else if(nextSenha(nextSenha(soffSet)) != getLastSenha()){
							subecra31 = 11;
						}
						soffSet = nextSenha(soffSet);
					}
					else if(subecra31 === 11){
						if(nextSenha(nextSenha(soffSet)) === getLastSenha()){
							subecra31 = 4;
						}
						else if(nextSenha(nextSenha(soffSet)) != getLastSenha()){
							subecra31 = 3;
						}
						soffSet = nextSenha(soffSet);
					}
				}
				
				
				if(clickArrowUp() && senhas_29[soffSet] != senhas_29[0]){
					if(subecra31 === 3){
						if(prevSenha(soffSet) === getFirstSenha() && senhas_29[prevSenha(soffSet)].nome != "Take-Away"){
							subecra31 = 2;
						}
						else if(prevSenha(soffSet) != getFirstSenha() && senhas_29[prevSenha(soffSet)].nome != "Take-Away"){
							subecra31 = 3;
						}
						else if(prevSenha(soffSet) === getFirstSenha() && senhas_29[prevSenha(soffSet)].nome === "Take-Away"){
							subecra31 = 9;
						}
						else if(prevSenha(soffSet) != getFirstSenha() && senhas_29[prevSenha(soffSet)].nome === "Take-Away"){
							subecra31 = 11;
						}
						soffSet = prevSenha(soffSet);
					}
					else if(subecra31 === 4){
						if(prevSenha(soffSet) === getFirstSenha() && senhas_29[prevSenha(soffSet)].nome != "Take-Away"){
							subecra31 = 2;
						}
						else if(prevSenha(soffSet) != getFirstSenha() && senhas_29[prevSenha(soffSet)].nome != "Take-Away"){
							subecra31 = 3;
						}
						else if(prevSenha(soffSet) === getFirstSenha() && senhas_29[prevSenha(soffSet)].nome === "Take-Away"){
							subecra31 = 9;
						}
						else if(prevSenha(soffSet) != getFirstSenha() && senhas_29[prevSenha(soffSet)].nome === "Take-Away"){
							subecra31 = 11;
						}
						soffSet = prevSenha(soffSet);
					}
					else if(subecra31 === 10){
						if(prevSenha(soffSet) === getFirstSenha()){
							subecra31 = 2;
						}
						else if(prevSenha(soffSet) != getFirstSenha()){
							subecra31 = 3;
						}
						soffSet = prevSenha(soffSet);
					}
					else if(subecra31 === 11){
						if(prevSenha(soffSet) === getFirstSenha()){
							subecra31 = 8;
						}
						else if(prevSenha(soffSet) != getFirstSenha()){
							subecra31 = 10;
						}
						soffSet = prevSenha(soffSet);
					}
					else if(subecra31 === 12){
						if(prevSenha(soffSet) === getFirstSenha()){
							subecra31 = 2;
						}
						else if(prevSenha(soffSet) != getFirstSenha()){
							subecra31 = 3;
						}
						soffSet = prevSenha(soffSet);
					}
					else if(subecra31 === 13){
						if(prevSenha(soffSet) === getFirstSenha()){
							subecra31 = 8;
						}
						else if(prevSenha(soffSet) != getFirstSenha()){
							subecra31 = 10;
						}
						soffSet = prevSenha(soffSet);
					}
				}
				
				if(clickSenhas1()){
					if(senhas_29[soffSet].nome === "Take-Away"){
						ecra = 43;
					}
					else{
						ecra = 44;
					}
					ecra43down = 0;
				}
				if(clickSenhas2()){
					if(senhas_29[nextSenha(soffSet)].nome === "Take-Away"){
						ecra = 43;
					}
					else{
						ecra = 44;
					}
					ecra43down = 1;
				}
				Canvas2D.canvasContext.font = "16px Consolas";
				senhasxCoord = 252;
				senhasyCoord = 200;
				cap31 = 0;
				
				Canvas2D.canvasContext.font = "13px Consolas";
				Canvas2D.canvasContext.fillStyle = 'white';
				
				for(i = soffSet; i <= 4; i++){
					if(cap31 < 2){
						if(senhas_29[i].resd != 0 && senhas_29[i].hora != undefined){
							Canvas2D.canvasContext.fillText(senhas_29[i].nome,senhasxCoord,senhasyCoord);
							Canvas2D.canvasContext.fillText(senhas_29[i].nmr,senhasxCoord + 13,senhasyCoord + 32);
							Canvas2D.canvasContext.fillText((checkTime(senhas_29[i].hora) + ":" + checkTime(senhas_29[i].minuto)), senhasxCoord + 13,senhasyCoord + 16);
							senhasyCoord = 253;
							cap31++;
							senhas_29[i].escrito = 1;
						}
					}	
				}
				
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
				Mouse.click = false;
				break;
		//ECRA POST-QTD
		case 32:Ecra.sprite.src = ecras32[0];
				if(clickIndivsAtalho()){
					ecra = 25;
				}
				
				if(clickIndivsQtd()){
					 ecra = 8;
				}

				if(clickHomeButton()){
					ecra = ecra32return;
				}
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
				Mouse.click = false;
				break;
		//ECRA NAO PODE RESERVAR OUTRO TAKEAWAY
		case 33:escreveStringTempo();
				
				if (clickRightButton()) {
					var i ;
					listItems = 0;
					for(i = 0; i <= 9;i++){
						if(itemsArray[i].qtd > 0){
							listItems++;
						}
					}
					ecra = 25;
					if(listItems > 4){
						subecra = 1;
						subecraAid = 1;
					}
					else{
						subecra = 0;
						subecraAid = 0;
					}
					ecra = 25 ;
				}
				if (clickHomeButton()) {
					ecra = 7 ;
				} 
				Ecra.sprite.src = ecras33[0];  
			    iRave.sprite.src = 'Sprites/iRave/iRave1.png';

				Mouse.click = false;
				break;
		//SUBECRA MENUS
		case 34:if (clickHomeButton()) {
					if(clickHomeButtonDuration() && listItems > 0){
						Mouse.flagMenu = false;
						ecra = 38;
						ecra38return = 34;
					}
					else if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra7 = 0;
						subecra8 = 0;
						subecra9 = 0;
					}
					else
						ecra = 9;
					subecra34 = 0;
				} 
				if(clickMenusAtalho()){
					ecra = 10;
					subecra10 = 0;
					
		
				}
				if(clickMenusDetails()){
					ecra = 35;
					subecra35 = subecra34;
				}
				if(clickMenusQtd()){
					if(!ajudaNum){
						subecra34 = 1;
						ecra = 55;
						ecra5556proceed = 15;
					}
					else
					ecra = 15;
				}
				Ecra.sprite.src = ecras34[subecra34]; 
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
				Mouse.click = false;
				break;  
		//ECRAS DETALHES
		case 35:if (clickHomeButton()){
					if(clickHomeButtonDuration()&& listItems > 0){
						Mouse.flagMenu = false;
						ecra = 38;
						ecra38return = 35;
					}
					else if(clickHomeButtonDuration()){
						ecra = 2;
					}
					else
						ecra = 34;
				}
				
				if(clickRightButton()){
					ecra = 15;
				}
				
				Ecra.sprite.src = ecras35[subecra35]; 
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break; 
		//ECRAS RETROCEDER QTD
		case 36:escreveStringTempo();
				
				if(clickHomeButton()){
					ecra = 15;
				}
				
				if(clickRightButton()){
					if(subecra36 < 7){
						ecra = 10;
					}
					else
						ecra = 9;
					for(i = 0; i <= 9;i++){
						if(itemsArray[i].qtd > 0){
							listItems++;
						}
					}
				}
				
				Ecra.sprite.src = ecras36[subecra36]; 
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break;
		// ECRA NOTIFICACOES BANDAS 
		case 37:if(clickRightButton()){
					ecra = ecraAux;
					notificacoes[dAux].splice(0,1);
					Mouse.click = false;
					break;
				}

				Canvas2D.canvasContext.fillStyle = "#90ee90";
				Canvas2D.canvasContext.font = "22px PT Sans Narrow";
				Canvas2D.canvasContext.fillText('Faltam 30min para:',232,230);
				
				var icone = new Image();
				icone.src = 'Sprites/concerto.png';
				drawSprite(icone,{x:260,y:245});
				Canvas2D.canvasContext.fillStyle = "white";
				Canvas2D.canvasContext.font = "30px PT Sans Narrow";
				Canvas2D.canvasContext.fillText(BandasAux[dAux][notificacoes[dAux][0][0]][notificacoes[dAux][0][1]].substring(4),295,270);
				
				Canvas2D.canvasContext.fillStyle = "#90ee90";
				Canvas2D.canvasContext.font = "18px PT Sans Narrow";
				Canvas2D.canvasContext.fillText('Palco ' + (notificacoes[dAux][0][0] + 1),280,300);

				Ecra.sprite.src = ecras0[1];
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';

				Mouse.click = false;
				break;
		//ECRA CONFIRMAR SAIR TAKE-AWAY QTD
		case 38:escreveStringTempo();
				
				if(clickRightButton()){
					for(i = 0; i <= 9 ; i++){
							itemsArray[i].qtd = 0;
					}
					Total_a_Pagar = 0;
					ecra = 2;
					listItems = 0;
				}
				
				if(clickHomeButton()){
					ecra = ecra38return;
				}
				
				Ecra.sprite.src = ecras38[0]; 
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break; 
		//SUBECRAS INDIVIDUAIS
		case 39:Ecra.sprite.src = ecras39[subecra39]; 
				if(clickHomeButton()){
					if(clickHomeButtonDuration() && listItems > 0){
						Mouse.flagMenu = false;
						ecra = 38;
						ecra38return = 39;
					}
					else if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra7 = 0;
						subecra8 = 0;
						subecra10 = 0;
						subecra39 = 0;
					}
					else{
						ecra = 10;
						subecra39 = 0;
					}
				}
				
				if(clickIndivsQtd()){
					if(!ajudaNum){
						ecra = 55;
						ecra5556proceed = 18;
					}
					else
						ecra = 18;
				}
				
				if(clickIndivsAtalho()){
					ecra = 9;
					subecra9 = 0;
				}
				
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break;
		case 40:escreveStringTempo();
				
				dias = dia_qtdDias(Bandas);
				palcos =  dia_qtdPalcos(Bandas[dias[subecra40H]]);

				if(palcos === 6){
					if(clickArrowUp() && subecra40V === 1)
						subecra40V = 0;
					if(clickArrowDown() && subecra40V === 0)
						subecra40V = 1;
				}
				else subecra40V = 0;

				if(dias.length === 2){
					if(clickArrowRight() || clickArrowLeft()){
						if(subecra40H === 0) subecra40H = 1;
						else subecra40H = 0;
					}
				}
					
				else if (dias.length === 3){
					if(clickArrowLeft()){
						if(subecra40H === 0) subecra40H = 2;
						else subecra40H--;
						if(palcos !== 6) subecra40V = 0;
					}
					if(clickArrowRight()){
						if(subecra40H === 2) subecra40H = 0;
						else subecra40H++;
						if(palcos !== 6) subecra40V = 0;
					}
				}

				if(dias.length > 1)
					Ecra.sprite.src = ecras40_dia_comsetas[dias[subecra40H]*8 + palcos + subecra40V];
				else
					Ecra.sprite.src = ecras40_dia_semsetas[dias[subecra40H]*8 + palcos + subecra40V];
				
				
				escreveBandas(Bandas[dias[subecra40H]],palcos);

				numPlusBandas = clickPlusScreen(subecra40V);
				if(numPlusBandas !== -1){
					dia = dias[subecra40H];
					switch(palcos){
						case 0:
						case 1:
						case 2: palco = palcos;
								break;
						case 3: if(numPlusBandas<=2) palco = 0;
								else if(numPlusBandas<=4) palco = 1;
								break;
						case 4: if(numPlusBandas<=2) palco = 0;
								else if(numPlusBandas<=4) palco = 2;
								break;
						case 5: if(numPlusBandas<=2) palco = 1;
								else if(numPlusBandas<=4) palco = 2;
								break;
						case 6: if(numPlusBandas<=2) palco = 0;
								else if(numPlusBandas<=4) palco = 1;
								else palco = 2;
								break;
					}
					if(numPlusBandas % 2 !== 0)
						posicao = Bandas[dias[subecra40H]][palco][0];
					else
						posicao = Bandas[dias[subecra40H]][palco][1];
					ecra = 23;
				}

				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra4 = 0;
						subecra3 = 0;
					}
					else
						ecra = 4;
					subecra40H = 0;
					subecra40V = 0;
				}
				
    			iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
    			Mouse.click = false;
				break;
		case 41:escreveStringTempo();
				
				palcos = palco_qtdPalcos(Bandas);
				dias =  palco_qtdDias(palcos[subecra41H]);

				if(dias === 6){
					if(clickArrowUp() && subecra41V === 1)
						subecra41V = 0;
					if(clickArrowDown() && subecra41V === 0)
						subecra41V = 1;
				}
				else subecra41V = 0;

				if(palcos.length === 2){
					if(clickArrowRight() || clickArrowLeft()){
						if(subecra41H === 0) subecra41H = 1;
						else subecra41H = 0;
					}
					subecra41V = 0;
				}
					
				else if (palcos.length === 3){
					if(clickArrowLeft()){
						if(subecra41H === 0) subecra41H = 2;
						else subecra41H--;
						if(dias !== 6) subecra41V = 0;
					}
					if(clickArrowRight()){
						if(subecra41H === 2) subecra41H = 0;
						else subecra41H++;
						if(dias !== 6) subecra41V = 0;
					}
				}

				if(palcos.length > 1)
					Ecra.sprite.src = ecras41_palco_comsetas[palcos[subecra41H]*8 + dias + subecra41V];
				else
					Ecra.sprite.src = ecras41_palco_semsetas[palcos[subecra41H]*8 + dias + subecra41V];
				
				palco_escreveBandas(palcos[subecra41H],dias);

				numPlusBandas = clickPlusScreen(subecra41V);
				if(numPlusBandas !== -1){
					palco = palcos[subecra41H];
					switch(dias){
						case 0:
						case 1:
						case 2: dia = dias;
								break;
						case 3: if(numPlusBandas<=2) dia = 0;
								else if(numPlusBandas<=4) dia = 1;
								break;
						case 4: if(numPlusBandas<=2) dia = 0;
								else if(numPlusBandas<=4) dia = 2;
								break;
						case 5: if(numPlusBandas<=2) dia = 1;
								else if(numPlusBandas<=4) dia = 2;
								break;
						case 6: if(numPlusBandas<=2) dia = 0;
								else if(numPlusBandas<=4) dia = 1;
								else dia = 2;
								break;
					}
					if(numPlusBandas % 2 !== 0)
						posicao = Bandas[dia][palcos[subecra41H]][0];
					else
						posicao = Bandas[dia][palcos[subecra41H]][1];
					ecra = 23;
				}

				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
						subecra4 = 0;
						subecra3 = 0;
					}
					else
						ecra = 4;
					subecra41 = 0;
				}
				
    			iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
    			Mouse.click = false;
				break;
		// ECRA BANDA JA ACTUOU
		case 42:if(clickRightButton())
					ecra = 16;
				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
					}
					else
						ecra = ecraAux;
					}
				Ecra.sprite.src = ecras42[0];
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break;
		//SUBECRAS SENHAS
		case 43:Ecra.sprite.src = ecras43[subecra43];
				
				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
					}
					else
						ecra = 31;
				}
		
				if(clickIndivsQtd()){
					ecra = 25;
					ecra25return = 43;
				}
				if(clickIndivsAtalho()){
					ecra = 44;
				}
				Mouse.click = false;
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
				break;
		//CERTEZA QUE QUER APAGAR SENHA?
		case 44:Ecra.sprite.src = ecras44[0];
				if(clickHomeButton()){
					ecra = 31;
				}
				
				if(clickRightButton()){
					if(ecra43down === 1){
						itemsSenhas--;
						if(senhas_29[nextSenha(soffSet)].nome === "Take-Away"){
							Total_a_Pagar = 0;
							listItems = 0;
							for(i = 0; i <= 9;i++){
								itemsArray[i].qtd = 0;
							}
						}
						senhas_29[nextSenha(soffSet)].resd = 0;
					}
					else{
						senhas_29[soffSet].resd = 0;
						itemsSenhas--;
						if(senhas_29[soffSet].nome === "Take-Away"){
							Total_a_Pagar = 0;
							listItems = 0;
							for(i = 0; i <= 9;i++){
								itemsArray[i].qtd = 0;
							}
						}
					}
					
					if(itemsSenhas != 0){
						soffSet = getFirstSenha();
						if(itemsSenhas > 2){
							if(senhas_29[soffSet].nome === "Take-Away")
								subecra31 = 9;
							else if(senhas_29[nextSenha(soffSet)].nome === "Take-Away")
								subecra31 = 8;
							else subecra31 = 2;
						}
						else if(itemsSenhas === 1){
							if(senhas_29[soffSet].nome === "Take-Away")
								subecra31 = 0;
							else subecra31 = 5;
						}
						else if(itemsSenhas === 2){
							if(senhas_29[soffSet].nome === "Take-Away")
								subecra31 = 7;
							else if(senhas_29[nextSenha(soffSet)].nome === "Take-Away")
								subecra31 = 6;
							else subecra31 = 1;
						}
						ecra = 31;
					}
					else{ecra = 7;}
				}
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Mouse.click = false;
				break;
		//CANCELAR PAGAMENTO?
		case 45:Ecra.sprite.src = ecras45[0];  
				if(clickRightButton()){
					ecra = 2;
				}
				
				if(clickHomeButton()){
					ecra = ecra45return;
				}
			  	Mouse.click = false;
				break;
		//NOTIFICAÇÕES SENHAS
		case 46:Ecra.sprite.src = ecras46[notiVar];
				Canvas2D.canvasContext.fillStyle = "#90ee90";
				Canvas2D.canvasContext.font = "22px PT Sans Narrow";
				Canvas2D.canvasContext.fillText('Faltam 3min para:',232,230);
				if(clickRightButton()){
					ecra = ecra46return;
				}
				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';
				Mouse.click = false;
				break;
		// ECRA ESCALADA
		case 50:escreveStringTempo();
				
				Canvas2D.canvasContext.font = "14px PT Sans Narrow";
				Canvas2D.canvasContext.fillStyle = 'white';

				if(subecra50 === 0){
					if(clickHomeButton()){
						if(clickHomeButtonDuration()){
							Mouse.flagMenu = false;
							ecra = 2;
						}
						else
							ecra = 26;
					}
					if(clickRightButton()){
						subecra50 = 1;
						tempoInicial = new Date();
						sEsc.nmr += 10;
						if((today.getMinutes() + mAux)%60 >= 55){
							sEsc.hora = h + 1; 
							sEsc.minuto = (today.getMinutes() + mAux)%60 + 5 - 60;
						}
						else{
							sEsc.hora = h;
							sEsc.minuto = (today.getMinutes() + mAux)%60 + 5;
						}
						sEsc.resd = 1;
						itemsSenhas++;
					}
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';
					Canvas2D.canvasContext.font = "14px PT Sans Narrow";
					Canvas2D.canvasContext.fillText(checkTime(h) + ':' + checkTime((today.getMinutes() + mAux)%60 + 5),328,230);
				}
				else{
					tempoFinal = new Date();

					if((tempoFinal - tempoInicial) > 2000 || clickRightButton()){
						ecra = 26;
						subecra50 = 0;
					}

					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';
					Canvas2D.canvasContext.font = "16px PT Sans Narrow";
					Canvas2D.canvasContext.fillText(sEsc.nmr,330,230);
				}
				
				Ecra.sprite.src = ecras50[subecra50];  
			  	Mouse.click = false;
				break;
		// ECRA RODA GIGANTE
		case 51:escreveStringTempo();
				
				Canvas2D.canvasContext.font = "14px PT Sans Narrow";
				Canvas2D.canvasContext.fillStyle = 'white';

				if(subecra51 === 0){
					if(clickHomeButton()){
						if(clickHomeButtonDuration()){
							Mouse.flagMenu = false;
							ecra = 2;
						}
						else
							ecra = 26;
					}
					
					if(clickRightButton()){
						subecra51 = 1;
						tempoInicial = new Date();
						sRG.nmr += 10;
						if((today.getMinutes() + mAux)%60 >= 55){
							sRG.hora = h + 1; 
							sRG.minuto = (today.getMinutes() + mAux)%60 + 5 - 60;
						}
						else{
							sRG.hora = h;
							sRG.minuto = (today.getMinutes() + mAux)%60 + 5;
						}
						sRG.resd = 1;
						itemsSenhas++;
					}
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';
					Canvas2D.canvasContext.font = "14px PT Sans Narrow";
					Canvas2D.canvasContext.fillText(checkTime(h) + ':' + checkTime((today.getMinutes() + mAux)%60 + 5),328,230);
				}
				else{
					tempoFinal = new Date();
					if((tempoFinal - tempoInicial) > 2000 || clickRightButton()){
						ecra = 26;
						subecra51 = 0;
					}

					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';
					Canvas2D.canvasContext.font = "16px PT Sans Narrow";
					Canvas2D.canvasContext.fillText(sRG.nmr,330,230);
				}
				
				Ecra.sprite.src = ecras50[subecra51];  
			  	Mouse.click = false;
				break;
		// ECRA SLIDE
		case 52:escreveStringTempo();
				
				Canvas2D.canvasContext.font = "14px PT Sans Narrow";
				Canvas2D.canvasContext.fillStyle = 'white';

				if(subecra52 === 0){
					if(clickHomeButton()){
						if(clickHomeButtonDuration()){
							Mouse.flagMenu = false;
							ecra = 2;
						}
						else
							ecra = 26;
					}
					if(clickRightButton()){
						subecra52 = 1;
						tempoInicial = new Date();
						sSld.nmr += 10;
						if((today.getMinutes() + mAux)%60 >= 55){
							sSld.hora = h + 1; 
							sSld.minuto = (today.getMinutes() + mAux)%60 + 5 - 60;
						}
						else{
							sSld.hora = h;
							sSld.minuto = (today.getMinutes() + mAux)%60 + 5;
						}
						sSld.resd = 1;
						itemsSenhas++;
						
					}
					iRave.sprite.src = 'Sprites/iRave/iRave1.png';
					Canvas2D.canvasContext.font = "14px PT Sans Narrow";
					Canvas2D.canvasContext.fillText(checkTime(h) + ':' + checkTime((today.getMinutes() + mAux)%60 + 5),328,230);
				}
				else{
					tempoFinal = new Date();

					if((tempoFinal - tempoInicial) > 2000 || clickRightButton()){
						ecra = 26;
						subecra52 = 0;
					}

					iRave.sprite.src = 'Sprites/iRave/iRaveBotaoHomeDesactivado.png';
					Canvas2D.canvasContext.font = "16px PT Sans Narrow";
					Canvas2D.canvasContext.fillText(sSld.nmr,330,230);
				}
				
				Ecra.sprite.src = ecras50[subecra52];  
			  	Mouse.click = false;
				break;
		// ECRA AJUDA AO PIN (1)
		case 53:ajudaNum = 0;
				if(clickScreen())
					ecra = 54;
				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
					}
					else
						ecra = 11;
				}

				iRave.sprite.src = 'Sprites/iRave/iRaveBotaoRightDesactivado.png';
				Ecra.sprite.src = ecras12[0];
				Mouse.click = false;
				break;
		// ECRA AJUDA AO PIN (2)
		case 54:ajudaNum = 1;
				subecra54 = 1;
				if(clickScreen()){
					ecra = 53;
				}
				
				if(clickRightButton()){
					ecra = 12;
				}
				
				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
					}
					else
						ecra = 11;
				}
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Ecra.sprite.src = ecras12[1];
				Mouse.click = false;
				break;
		// ECRA AJUDA A QTD (1)
		case 55:ajudaNum = 0;
				if(clickScreen())
					ecra = 56;
				if(clickHomeButton()){
					if(clickHomeButtonDuration()){
						Mouse.flagMenu = false;
						ecra = 2;
					}
					else{
						if (subecra34 === 1){
							ecra = 34;
							subecra34 = 0;
						}
						else if(subecra39 === 1){
							ecra = 39;
							subecra39 = 0;
						}
					}
				}
				
				if(clickRightButton()){
					ecra = ecra5556proceed;
				}

				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Ecra.sprite.src = ecras55[0];
				Mouse.click = false;
				break;
		// ECRA AJUDA A QTD (2)
		case 56:subecra56 = 1;
				ajudaNum = 1;
				if(clickScreen()){
					ecra = 55;
				}
				
				if(clickRightButton()){
					ecra = ecra5556proceed;
				}
				
				iRave.sprite.src = 'Sprites/iRave/iRave1.png';
				Ecra.sprite.src = ecras56[0];
				Mouse.click = false;
				break;			
	}
}



// FUNCAO PRINCIPAL
function mainLoop(){
	clear();
	draw();
	update();
	requestAnimationFrame(mainLoop);
}