importPackage(Packages.tools);


function enter(pi) {
	pi.warp(230040400, 5);
	pi.getPlayer().getClient().getSession().write(MaplePacketCreator.musicChange("Bgm12/AquaCave"));
	return true;
}