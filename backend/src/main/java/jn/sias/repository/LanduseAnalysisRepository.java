package jn.sias.repository;

import jn.sias.domain.LanduseAnalysisResultDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface LanduseAnalysisRepository {

    List<LanduseAnalysisResultDto> findJimkByAdm(@Param("umdCode")String umdCode);

    List<LanduseAnalysisResultDto> findOwnByAdm(@Param("umdCode")String umdCode);

    List<LanduseAnalysisResultDto> findJimkByUserDraw(@Param("geomText")String wkt);

    List<LanduseAnalysisResultDto> findOwnByUserDraw(@Param("geomText")String wkt);

}
