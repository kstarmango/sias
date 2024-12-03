package jn.sias.service;

import jn.sias.domain.LifeCategoryInfoDto;
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

}
