package jn.sias.service;

import jn.sias.domain.life.LifeCategoryInfoDto;
import jn.sias.domain.life.LifePopInfoDto;
import jn.sias.domain.life.LifePopTypeInfoDto;
import jn.sias.repository.LifeAnalysisRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class LifeAnalysisService {

    @Autowired
    private LifeAnalysisRepository lifeAnalysisRepository;

    public List<LifeCategoryInfoDto> getLifeCatList() {
        List<LifeCategoryInfoDto> catList = lifeAnalysisRepository.getLifeCatList();

        return catList;
    }

    public List<LifeCategoryInfoDto> getWeakCatList() {
        List<LifeCategoryInfoDto> catList = lifeAnalysisRepository.getWeakCatList();

        return catList;
    }

    public List<LifePopTypeInfoDto> getPopTypeList() {
        List<LifePopTypeInfoDto> popTypeList = lifeAnalysisRepository.getPopTypeList();

        return popTypeList;
    }

    public List<LifePopInfoDto> getPopList(String log_type_nm) {
        List<LifePopInfoDto> popList = lifeAnalysisRepository.getPopList(log_type_nm);

        return popList;
    }

}
