package jn.sias.dto.landuse;

import lombok.Getter;

public enum LanduseAnalysisCode {
    
    owner_userdraw("owner_userDraw"),
    jimk_userdraw("jimk_userDraw"),
    owner_umdcode("owner_umdCode"),
    jimk_umdcode("jimk_umdCode");

    @Getter
    private final String code;

    LanduseAnalysisCode(String code) {
        this.code = code;
    }

    public static LanduseAnalysisCode fromCode(String code) {
        for(LanduseAnalysisCode codeType : LanduseAnalysisCode.values()) {
            if(codeType.getCode().equalsIgnoreCase(code)) {
                return codeType;
            }
        }

        throw new IllegalArgumentException("Invalid code: " + code);
    }
}
