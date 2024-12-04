package jn.sias.dto.landuse;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@SuperBuilder
@Getter @Setter
public class ParcelInformationBase {

    protected String admAddress;
    protected String roadAddress;

    protected String jimk;
    protected String area;
    protected int    jiga;
    protected int    buildingJiga;
    protected String ownrGbn;

    @Builder.Default
    protected String ownrName = "***";
    protected String ownrAddress;


    protected static <T, R> List<R> mappingList(List<T> list,
                                                Function<T, R> mapper) {

        return list.stream()
                .map(mapper)
                .collect(Collectors.toList());
    }


}
