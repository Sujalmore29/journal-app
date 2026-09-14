package com.msd.myjournalapp.Entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "config_journal_app")
public class ConfigJournalAppEntities {

    private String key;
    private String value;
}
