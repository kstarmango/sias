package jn.sias.repository;

import jn.sias.domain.CommFestAnalysisResultDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommFestAnalysisRepository {

    List<CommFestAnalysisResultDto> getFestYearList();
    List<CommFestAnalysisResultDto> getFestList(String yyyy);

}
