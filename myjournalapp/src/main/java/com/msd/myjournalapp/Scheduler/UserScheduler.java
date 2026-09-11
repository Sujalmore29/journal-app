package com.msd.myjournalapp.Scheduler;

import com.msd.myjournalapp.Cache.AppCache;
import com.msd.myjournalapp.Entities.JournalEntry;
import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Repositories.UserRepositoryImpl;
import com.msd.myjournalapp.Services.EmailService;
import com.msd.myjournalapp.Services.SentimentAnalysisService;
import com.msd.myjournalapp.Enums.Sentiment;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserScheduler {

    private final EmailService emailService;
    private final UserRepositoryImpl userRepositoryImpl;
    private final AppCache appCache;
    private final SentimentAnalysisService sentimentAnalysisService;

    @Scheduled(cron = "0 0 9 * * SUN")
    public void fetchUsersAndSaMail(){
        List<User> users = userRepositoryImpl.getUserForSA();

        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);

        for(User user : users){
            List<JournalEntry> journalEntries = user.getJournalEntries();
            if(journalEntries != null || !journalEntries.isEmpty()) {
                List<JournalEntry> filteredEntries =
                        journalEntries.stream()
                                .filter(x -> x.getDate() != null &&
                                        x.getDate().isAfter(sevenDaysAgo)
                                )
                                .collect(Collectors.toList());
                if(!filteredEntries.isEmpty()) {
                    Sentiment sentiment = sentimentAnalysisService.getSentiment(filteredEntries);

                    String message =
                            "Hello " + user.getUsername() + ",\n\n" +
                            "Here is your weekly journal sentiment summary.\n\n" +
                            "Most frequent sentiment: " + sentiment + "\n\n" +
                            "This sentiment was calculated from your journal entries " +
                            "from the last 7 days.\n\n" +
                            "Keep journaling!";

                    emailService.sendMail(user.getEmail(), "Your Weekly Journal Sentiment",message);
                }
            }
        }
    }

    @Scheduled(cron = "0 0 10 * * * ")
    public void clearAppCache(){
        appCache.init();
    }

}
