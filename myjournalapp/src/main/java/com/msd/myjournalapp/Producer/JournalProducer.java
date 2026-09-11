package com.msd.myjournalapp.Producer;

import com.msd.myjournalapp.Config.KafkaTopics;
import com.msd.myjournalapp.Events.JournalCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import static java.rmi.server.LogStream.log;

@Service
@Slf4j
@RequiredArgsConstructor
public class JournalProducer {

    private final KafkaTemplate<String, JournalCreatedEvent> kafkaTemplate;

    public void publishJournalCreatedEvent(JournalCreatedEvent event){
        kafkaTemplate.send(
                KafkaTopics.JOURNAL_CREATED,
                event.getJournalId(),
                event
        );

        System.out.println("Published Journal Event : " + event.getJournalId());
    }
}
