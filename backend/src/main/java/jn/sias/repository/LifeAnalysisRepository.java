package jn.sias.repository;

import jn.sias.domain.LifeCategoryInfoDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LifeAnalysisRepository {

    List<LifeCategoryInfoDto> getLifeCatList();

    List<LifeCategoryInfoDto> getWeakCatList();

}
