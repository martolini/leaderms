/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Aura
 * 
 * Adobis's Mission I: Unknown Dead Mine (280010000)
 * 
 * Zakum PQ NPC  [Dead Mines]
*/

var status;
var selectedType;
var scrolls;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendSimple("Cuidado, pois o poder de #bLeaderMS#k nao tem sido\r\nesquecido... #b\r\n#L0#O que eu vou fazer aqui?#l\r\n#L1#Eu trouxe os itens!#l\r\n#L2#Eu quero sair!#l");
		}
		else if (status == 1) {
			selectedType = selection;
			if (selection == 0) {
				cm.sendNext("Para revelar o poder de #rZakum#k, voce vai ter que recriar seu nucleo. Escondido em algum lugar neste calabouco e uma \"Fire Ore\" que e um dos materiais necessarios para o nucleo . Encontra-lo, e traze-lo para mim.\r\n\r\nAh, e voce poderia me fazer um favor? Ha tambem um numero de documentos em papel deitado debaixo de pedras por aqui. Se voce pode obter 30 ou mais delas, eu posso recompensa-lo por seus esforcos.")
				cm.dispose();
			}
			else if (selection == 1) {
				if (!cm.haveItem(4001018)) { //fire ore
					cm.sendNext("Please bring the Fire Ore with you.")
					cm.dispose();
				}
				else {
					if (!cm.haveItem(4001015, 30)) { //documents
						cm.sendYesNo("So, you brought the fire ore with you? In that case, I can give you and your party a piece of it that should be more than enough to make the core of #rZakum#k. Make sure your whole party has room in their inventory before proceeding.");
						scrolls = false;
					}
					else {
						cm.sendYesNo("So, you brought the fire ore and the documents with you? In that case, I can give you and your party a piece of it that should be more than enough to make the core of #rZakum#k. As well, since you brought the documents with you, I can also give you a special item which will bring you to the mine's entrance at any time. Make sure your whole party has room in their inventory before proceeding.");
						scrolls = true;
					}
				}
			}
			else if (selection == 2) {
				cm.sendYesNo("Are you sure you want to exit? If you're the party leader, your party will also be removed from the #bDead Mines#k.")
			}
		}
		else if (status == 2) {
			var eim = cm.getChar().getEventInstance();
			if (selectedType == 1 && cm.haveItem(4001018)) {
				var party = eim.getPlayers();
				
				cm.gainItem(4001018, -1);
				if (scrolls) {
					var tixx = cm.getPlayer().countItem(4001015);
					cm.gainItem(4001015, -30);
				}
				
				//give items/exp
				cm.givePartyItems(4031061, 1, party);
				if (scrolls) {
					cm.givePartyItems(2030007, Math.round(tixx/5), party);
					cm.givePartyExp(20000, party);
					for (var outt = 0; outt<party.size(); outt++) {//Finish PQ and set Zakum Level up a bit...
						if (party.get(outt).getZakumLevel() < 1){ //Do this so ppl dnt cheat by doin this over and over...
						party.get(outt).addZakumLevel();
						}
						party.get(outt).saveToDB(true, true);
					}
				}
				else {
					cm.givePartyExp(12000, party);
					for (var outt = 0; outt<party.size(); outt++) {//Finish PQ and set Zakum Level up a bit...
						if (party.get(outt).getZakumLevel() < 1){ //Do this so ppl dnt cheat by doin this over and over...
						party.get(outt).addZakumLevel();
						}
						party.get(outt).saveToDB(true, true);
					}
				}
				
				//clear PQ
				eim.finishPQ();
			}
			else if (selectedType == 2) {
				if (cm.isLeader())
					eim.disbandParty();
				else
					eim.leaveParty(cm.getChar());
			}
			cm.dispose();
		}
	}
}