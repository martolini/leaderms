/*
 * Criado por JavaScriptz
 * LeaderMS 2014
 * Gachapon - Henesys
 * www.leaderms.com.br
 */

/*            Variaveis         */
var comum = Array(2043205, 2044205, 2043705, 2043805, 1462003, 1432009 ,1302022 ,1002060 ,1002159 ,1061051 ,1002214 ,1412006 ,1002167 ,1002162,1040070 ,1040073 ,1002042 ,1002138,1002169 ,1002164 ,1041045,1002170 ,1002165,1322027 ,1040030 ,1040022 ,1060056 , 1061050, 1002173, 1002036, 1040007, 1060063, 1302027, 1372006, 1322007, 1040085, 1422004, 1452008, 2022113, 1060058 , 1060061, 1040039, 1452006, 2040402, 1060005, 1041061, 1061057, 1002041);
var normal = Array(1051063,1102030,1002211,1040092,1050018,1102027,1041082,1452023,1050091,2044504,2041038,2040809,1452014,1462008,1051064,1462005,1452012,1002418,1082177,1022058,1032028,1050060,1462007,2040412,1462006,1040089,1452007);
var raro = Array(1082147,1082149,1462018,2040611,2044605,2040307,2040916,1462016,1051084,1102041,1102042,1102082,1102033,1051017,1002723,2044502,2044602,2040028,1012108,1022060);
/*             Fim              */

/*            Funcao            */
function getRandom(min, max) {
	if (min > max) {
		return(-1);
	}

	if (min == max) {
		return(min);
	}

	return(min + parseInt(Math.random() * (max - min + 1)));
}
/*             Fim              */

/*            Variaveis         */
var icomum = comum[getRandom(0, comum.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var iraro = raro[getRandom(0, raro.length - 1)];

var chance = getRandom(0, 5);
/*             fim              */


function start() {
    if (cm.haveItem(5451000)) {
        cm.dispose();
    } else if (cm.haveItem(5220000))
        cm.sendYesNo("Percebo que voce possui um bilhete do Gachapon, deseja usalo?");
    else {
        cm.sendSimple("Bem-vindo ao " + cm.getPlayer().getMap().getMapName() + " Gachapon. Como posso ajuda-lo?\r\n\r\n#L0#O que e Gachapon?#l\r\n#L1#Onde voce pode comprar bilhetes Gachapon?#l");
    }
}

function action(mode, type, selection){
    if (mode == 1 && cm.haveItem(5220000)) {
        cm.gainItem(5220000, -1);
        if (chance > 0 && chance <= 2) {
	cm.gainItem(icomum, 1);
	} else if (chance >= 3 && chance <= 4) {
	cm.gainItem(inormal, 1);
	} else {
	cm.gainItem(iraro, 1);
	}
        cm.dispose();
    } else {
        if (mode > 0) {
            status++;
            if (selection == 0) {
                cm.sendNext("Jogando no Gachapon voce pode ganhar scrolls raros, equipamentos, cadeiras, livros de maestria, e outros artigos legais! Tudo que voce precisa e de um #bGachapon Ticket#k para poder obter algum desses items raros.");
            } else if (selection == 1) {
                cm.sendNext("Bilhete Gachapon estao disponiveis no #rCash Shop#k e podem ser adquiridos atraves do NX ou MaplePoints. Clique no SHOP vermelho no canto inferior direito da tela para visitar o #rCash Shop #konde voce podera comprar bilhetes.");
                cm.dispose();
            } else if (status == 2) {
                cm.sendNext("Voce vai encontrar uma variedade de itens da " + cm.getPlayer().getMap().getMapName() + " Gachapon, mas voce provavelmente vai encontrar varios itens e pergaminhos relacionados a cidade de " + cm.getPlayer().getMap().getMapName() + ".");
                cm.dispose();
            }
        }
    }
}

