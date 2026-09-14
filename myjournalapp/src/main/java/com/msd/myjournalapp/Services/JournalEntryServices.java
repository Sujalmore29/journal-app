package com.msd.myjournalapp.Services;

import com.msd.myjournalapp.Entities.JournalEntry;
import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Events.JournalCreatedEvent;
import com.msd.myjournalapp.Producer.JournalProducer;
import com.msd.myjournalapp.Repositories.JournalEntryRepository;
import com.msd.myjournalapp.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class JournalEntryServices {

    private final UserServices userServices;
    private final UserRepository userRepository;
    private final JournalEntryRepository journalEntryRepository;
    private final JournalProducer journalProducer;

    public void saveNewEntry(JournalEntry journalEntry){
        journalEntryRepository.save(journalEntry);
    }

    @Transactional
    public void saveEntry(JournalEntry journalEntry, String username){
        try{
            User user = userServices.getUserByUsername(username);
            journalEntry.setDate(LocalDateTime.now());
            journalEntry.setSentiment(null);
            if(journalEntry.getTitle() != null && journalEntry.getContent() != null) {
                if(!journalEntryRepository.existsById(journalEntry.getId())){
                    JournalEntry saved = journalEntryRepository.save(journalEntry);
                    user.getJournalEntries().add(saved);
                    userRepository.save(user);
                }else{
                    JournalEntry existingJournalEntry = journalEntryRepository.findById(journalEntry.getId()).orElseThrow();
                    existingJournalEntry.setTitle(journalEntry.getTitle());
                    existingJournalEntry.setContent(journalEntry.getContent());
                    existingJournalEntry.setDate(journalEntry.getDate());
                    existingJournalEntry.setSentiment(journalEntry.getSentiment());
                    journalEntryRepository.save(existingJournalEntry);
                }
                JournalCreatedEvent event = new JournalCreatedEvent(journalEntry.getIdAsString(), username, journalEntry.getContent());
                journalProducer.publishJournalCreatedEvent(event);
            }
        }catch (Exception e){
            throw new RuntimeException("An error occurred while saving the entry", e);
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
