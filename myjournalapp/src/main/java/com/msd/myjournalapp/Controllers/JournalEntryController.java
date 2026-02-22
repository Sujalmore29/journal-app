package com.msd.myjournalapp.Controllers;

import com.msd.myjournalapp.Entities.JournalEntry;
import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Services.JournalEntryServices;
import com.msd.myjournalapp.Services.UserServices;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/journal")
public class JournalEntryController {

    @Autowired
    public JournalEntryServices journalEntryServices;

    @Autowired
    public UserServices userServices;
    @GetMapping
    public ResponseEntity<?> getAllJournalEntriesOfUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userServices.getUserByUsername(username);
        List<JournalEntry> journalEntries = user.getJournalEntries();
        if(journalEntries != null && !journalEntries.isEmpty()){
            return new ResponseEntity<>(journalEntries,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> createNewEntry(@RequestBody JournalEntry journalEntry){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            journalEntryServices.saveEntry(journalEntry,username);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/id/{myId}")
    public ResponseEntity<?> getJournalEntryById(@PathVariable ObjectId myId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userServices.getUserByUsername(username);
        List<JournalEntry> collect = user.getJournalEntries().stream().filter(x -> x.getId().equals(myId)).collect(Collectors.toList());
        if(!collect.isEmpty()){
            Optional<JournalEntry> journalEntry = journalEntryServices.findById(myId);
            if(journalEntry.isPresent()){
                return new ResponseEntity<>(journalEntry,HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/id/{myId}")
    public ResponseEntity<?> delJournalById(@PathVariable ObjectId myId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        boolean removed = journalEntryServices.deleteById(myId,username);
        if(removed){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("id/{myId}")
    public ResponseEntity<?> updateJournalEntryById(@PathVariable ObjectId myId,@RequestBody JournalEntry journalEntry){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userServices.findByUsername(username);
        List<JournalEntry> collect = user.getJournalEntries().stream().filter(x -> x.getId().equals(myId)).collect(Collectors.toList());
        if(!collect.isEmpty()){
            Optional<JournalEntry> oldEntry = journalEntryServices.findById(myId);
            if(oldEntry.isPresent()){
                JournalEntry old = oldEntry.get();
                old.setTitle(journalEntry.getTitle() != null && !journalEntry.getTitle().equals("") ? journalEntry.getTitle() : old.getTitle());
                old.setContent(journalEntry.getContent() != null && !journalEntry.getContent().equals("") ? journalEntry.getContent() : old.getContent());
                journalEntryServices.saveNewEntry(old);
                return new ResponseEntity<>(old,HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
