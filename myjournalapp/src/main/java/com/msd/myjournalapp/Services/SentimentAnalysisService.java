package com.msd.myjournalapp.Services;

import com.msd.myjournalapp.Entities.JournalEntry;
import com.msd.myjournalapp.Enums.Sentiment;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SentimentAnalysisService {
    public Sentiment getSentiment(List<JournalEntry> filteredEntries){

        Map<Sentiment,Integer> sentimentCount = new HashMap<>();
        for(JournalEntry journalEntry : filteredEntries){

            Sentiment sentiment = journalEntry.getSentiment();

            if(sentiment != null){
                sentimentCount.put(sentiment,sentimentCount.getOrDefault(sentiment,0) + 1);
            }
        }

        Sentiment mostFrequentSentiment = null;
        int maxCount = 0;

        for(Map.Entry<Sentiment,Integer> entry : sentimentCount.entrySet()) {
            if(entry.getValue() > maxCount){
                maxCount = entry.getValue();
                mostFrequentSentiment = entry.getKey();
            }
        }
       return mostFrequentSentiment;
    }
}
