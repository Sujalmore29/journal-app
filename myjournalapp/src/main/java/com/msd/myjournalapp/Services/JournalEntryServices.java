package com.msd.myjournalapp.Services;

import com.msd.myjournalapp.Entities.JournalEntry;
import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Repositories.JournalEntryRepository;
import com.msd.myjournalapp.Repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class JournalEntryServices {

    @Autowired
    private  UserServices userServices;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    public JournalEntryRepository journalEntryRepository;

    public void saveNewEntry(JournalEntry journalEntry){
        journalEntryRepository.save(journalEntry);
    }

    @Transactional
    public void saveEntry(JournalEntry journalEntry, String username){
        try{
            User user = userServices.getUserByUsername(username);
            journalEntry.setDate(LocalDateTime.now());
            if(journalEntry.getTitle() != null && journalEntry.getContent() != null) {
                JournalEntry saved = journalEntryRepository.save(journalEntry);
                user.getJournalEntries().add(saved);
                userRepository.save(user);
            }
        }catch (Exception e){
            throw new RuntimeException("An error occured while saving the entry", e);
        }
    }
    public List<JournalEntry> getAll(){
        return journalEntryRepository.findAll();
    }

    public Optional<JournalEntry> findById(ObjectId id){
        return journalEntryRepository.findById(id);
    }

    @Transactional
    public boolean deleteById(ObjectId id,String username){
        boolean removed = false;
        try {
            User user = userServices.getUserByUsername(username);
            removed = user.getJournalEntries().removeIf(x -> x.getId().equals(id));
            if(removed){
                userServices.saveUserAfterJournalOperation(user);
                journalEntryRepository.deleteById(id);
            }
        }catch (Exception e){
            throw new RuntimeException("An error occured while deleting the entry",e);
        }
        return removed;
    }
}
