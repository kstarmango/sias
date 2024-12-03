package jn.sias.repository;

import jn.sias.domain.life.LifeCategoryInfoDto;
import jn.sias.domain.life.LifePopInfoDto;
import jn.sias.domain.life.LifePopTypeInfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LifeAnalysisRepository {

    List<LifeCategoryInfoDto> getLifeCatList();

    List<LifeCategoryInfoDto> getWeakCatList();

    List<LifePopTypeInfoDto> getPopTypeList();

    List<LifePopInfoDto> getPopList(String log_type_nm);

}
