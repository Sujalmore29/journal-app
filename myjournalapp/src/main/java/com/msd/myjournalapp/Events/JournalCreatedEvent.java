package com.msd.myjournalapp.Events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JournalCreatedEvent {
    private String journalId;
    private String username;
    private String content;
}
