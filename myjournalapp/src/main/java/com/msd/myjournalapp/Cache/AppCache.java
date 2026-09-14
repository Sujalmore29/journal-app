package com.msd.myjournalapp.Cache;

import com.msd.myjournalapp.Entities.ConfigJournalAppEntities;
import com.msd.myjournalapp.Repositories.ConfigJournalAppRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class AppCache {


    private final ConfigJournalAppRepository configJournalAppRepository;
    public Map<String,String> appCache;

    @PostConstruct
    public void init(){
        appCache = new HashMap<>();
        List<ConfigJournalAppEntities> all = configJournalAppRepository.findAll();
        for(ConfigJournalAppEntities configJournalAppEntities : all){
            appCache.put(configJournalAppEntities.getKey(), configJournalAppEntities.getValue());
        }
    }
}
