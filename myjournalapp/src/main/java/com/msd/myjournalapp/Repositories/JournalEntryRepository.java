package com.msd.myjournalapp.Repositories;

import com.msd.myjournalapp.Entities.JournalEntry;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JournalEntryRepository extends MongoRepository<JournalEntry,Object> {
}
