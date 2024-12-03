package jn.sias.repository;

import jn.sias.domain.FlowAnalysisDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FlowAnalysisRepository {

    List<FlowAnalysisDto> getFestYearList();
    List<FlowAnalysisDto> getFestList(String yyyy);

}
