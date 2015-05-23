/*
 * JavaScriptz (javascriptz@leaderms.com.br)
 * LeaderMS 2012 ▬ 2015
 * Brasil MapleStory Server
 * CashPQ
 * www.leaderms.com.br
 */

package config.Jogo;

import java.io.BufferedReader;
import java.io.FileReader;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map.Entry;
import client.MapleClient;
import client.MapleInventory;
import client.MapleInventoryType;
import server.MapleInventoryManipulator;
import server.MapleItemInformationProvider;
import tools.FilePrinter;
import tools.MaplePacketCreator;

public class CashPQ {
    /* Mensagem ao pegar item */
    public static String Mensagem = "<LeaderMS CashPQ> Voce acabou de ganhar um item!";
    /* Definições de Hora */
    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
    private static final SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm");
    
    public static boolean getIncubatedItem(MapleClient c) {
        HashMap<String, String> IncubatedItem = new HashMap<String, String>();
        try {
        FileReader fl = new FileReader("Jogo/PremiumItem/cashpq.properties");
        BufferedReader br = new BufferedReader(fl);
        String[] readSplit = new String[2];
        String readLine = null;
        while ((readLine = br.readLine()) != null) {
            readSplit = readLine.split(" - ");
            IncubatedItem.put(readSplit[0], readSplit[1]);
        }
        fl.close();
        br.close();
        } catch (Exception e) {
            System.out.print(e);
            return false;
        }
        int rand = (int) (Math.random() * IncubatedItem.entrySet().size());
        int hmany = 0;
        int itemcode = 0;
        int amount = 0;
        int npc = 9050008;
        for (Entry<String, String> entry : IncubatedItem.entrySet()) {
            hmany++;
            if(hmany == rand) {
                try {
                    itemcode = Integer.parseInt(entry.getKey());
                    amount = Integer.parseInt(entry.getValue());
                    break;
                } catch (Exception e) {
                    System.out.print(e);
                    return false;
                }
            }
        }
        if (itemcode == 0 || amount == 0)
            return false;
        if (getInventory(c, MapleInventoryType.EQUIP).isFull(1) || getInventory(c, MapleInventoryType.USE).isFull(3) || getInventory(c, MapleInventoryType.ETC).isFull(1)) {
            c.getSession().write(MaplePacketCreator.getInventoryFull());
            c.getSession().write(MaplePacketCreator.getShowInventoryFull());
            return false;
        }
        MapleInventoryManipulator.addById(c, itemcode, (short) amount, "CashPQ", "Item da CashPQ");
        c.getSession().write(MaplePacketCreator.getShowItemGain(itemcode, (short) amount));
        MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
        c.getPlayer().dropOverheadMessage(Mensagem);        
        return true;
    }

    private static MapleInventory getInventory(MapleClient c, MapleInventoryType type) {
        return c.getPlayer().getInventory(type);
    }
}