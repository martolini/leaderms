/**
	Rolly - Ludibirum Maze PQ
* */
importPackage(Packages.client);

var status = 0;
var minLevel = 51;
var maxLevel = 200;
var minPlayers = 5;
var maxPlayers = 6;
var time = 15;
var open = true;

function start() {
    status = -1;
    action(1, 0, 0);
}
var PQItems = new Array(4001106);

function action(mode, type, selection) {
    if (mode == 0) {
	cm.dispose();
    } else {
	if (mode == 1)
	    status++;
	else
	    status--;
		
	if (status == 0) {
	    cm.sendSimple("Esta e a entrada para o labirinto Ludibrium.\r\n#b#L0#Entrar na Lubidrium Maze#l"/*\r\n#L1#Oque e o Ludibrium Maze?*/);
	 	
	} else if (status == 1) {
	    var em = cm.getEventManager("LudiMazePQ");
	    if(selection == 0) {//ENTER THE PQ
			if (!hasParty()) {//NO PARTY
				cm.sendOk("Formar um grupo antes de entrar!");
			} else if (!isLeader()) {//NOT LEADER
				cm.sendOk("Peca seu lider para que fale comigo!");
			} else if (!checkPartySize()) {//PARTY SIZE WRONG
				cm.sendOk("Seu partido tem de consistir em pelo menos " + minPlayers + " membros!");
			} else if (!checkPartyLevels()) {//WRONG LEVELS
				cm.sendOk("Um dos membros do seu partido nao cumpriu os requisitos de nivel de " + minlvl + "/" + maxlvl + ".");
			} else if (em == null) {//EVENT ERROR
				cm.sendOk("Evento desabilitado!");
			} else if (!open){
				cm.sendOk("A PQ esta #rfechada#k por agora.");
			} else {
				em.startInstance(cm.getParty(), cm.getChar().getMap());
			}
			cm.dispose();
			} else if(selection == 1) {
				cm.sendOk("This maze is available to all parties of 2 or more members, and all participants must be between Level  51 ~+ 100 + .  You will be given  minutes to escape the maze.  At the center of the room, there will be a Warp Portal set up to transport you to a different room.  These portals will transport you to other rooms where you'll (hopefully) find the exit.  Pietri will be waiting at the exit, so all you need to do is talk to him, and he'll let you out.  Break all the boxes located in the room, and a monster inside the box will drop a coupon.  After escaping the maze, you will be awarded with EXP based on the coupons collected.  Additionally, if the leader possesses at least 30 coupons, then a special gift will be presented to the party.  If you cannot escape the maze within the allotted " + time +" minutes, you will receive 0 EXP for your time in the maze.  If you decide to log off while you're in the maze, you will be automatically kicked out of the maze.  Even if the members of the party leave in the middle of the quest, the remaining members will be able to continue on with the quest.  If you are in critical condition and unable to hunt down the monsters, you may avoid them to save yourself.  Your fighting spirit and wits will be tested!  Good luck!");
				cm.dispose();
			}
		}
    }
}
     
function getPartySize(){
    if (cm.getParty() == null) {
		return 0;
    } else {
		return (cm.getParty().getMembers().size());
    }
}

function isLeader(){
    return cm.isLeader();
}

function checkPartySize(){
    var size = 0;
    if (cm.getParty() == null){
		size = 0;
    } else {
		size = (cm.getParty().getMembers().size());
    }
    if (size < 1  || size > 6) {
		return false;
    } else {
		return true;
    }
}

function checkPartyLevels(){
    var pass = true;
    var party = cm.getParty().getMembers();
    if (cm.getParty() == null) {
		pass = false;
    } else {
		for (var i = 0; i < party.size() && pass; i++) {
			if ((party.get(i).getLevel() < 51) || (party.get(i).getLevel() > 100) || (party.get(i).getMapid() != cm.getMapId())) {
				pass = false;
			}
		}
    }
    return pass;
}

function hasParty(){
    if(cm.getParty() == null){
		return false;
    } else {
		return true;
    }
}


