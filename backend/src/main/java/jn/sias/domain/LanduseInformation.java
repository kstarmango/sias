package jn.sias.domain;

import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class LanduseInformation {

    private String pnu;
    private String ledgCode;
    private String chltYN;
    private String aprvYN;
    private String useZoneCode;
    private String useZoneCodeName;

    public void convertYNCode() {

        if(aprvYN.compareToIgnoreCase("Y") == 0) {
            aprvYN = "승인";
        } else if (aprvYN.compareToIgnoreCase("N") == 0) {
            aprvYN = "미승인";
        }

        switch (chltYN) {
            case "1":
                chltYN = "포함";
                break;

            case "2":
                chltYN = "저촉";
                break;
            case "3":
                chltYN = "접함";
                break;
        }
    }
}
