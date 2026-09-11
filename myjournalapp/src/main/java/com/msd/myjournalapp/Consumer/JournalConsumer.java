package com.msd.myjournalapp.Consumer;

import com.msd.myjournalapp.Config.KafkaTopics;
import com.msd.myjournalapp.Entities.JournalEntry;
import com.msd.myjournalapp.Events.JournalCreatedEvent;
import com.msd.myjournalapp.Repositories.JournalEntryRepository;
import com.msd.myjournalapp.Services.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JournalConsumer {

    private final GeminiService geminiService;
    private final JournalEntryRepository journalEntryRepository;

    @KafkaListener(topics = KafkaTopics.JOURNAL_CREATED, groupId = "journal-group")
    public void consume(JournalCreatedEvent event){
        System.out.println("-----------------------------");
        System.out.println("Journal Received");

        JournalEntry journal = journalEntryRepository.findById(event.getJournalId()).orElse(null);

        if(journal == null){
            return;
        }
        System.out.println(journal.getTitle());
        journal.setSentiment(geminiService.analyzeSentiment(event.getContent()));

        journalEntryRepository.save(journal);
        System.out.println("Sentiment Updated : " + journal.getSentiment());
        System.out.println("-----------------------------");
    }
}
