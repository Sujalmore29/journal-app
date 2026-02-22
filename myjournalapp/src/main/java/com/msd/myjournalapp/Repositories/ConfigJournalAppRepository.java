package com.msd.myjournalapp.Repositories;

import com.msd.myjournalapp.Entities.ConfigJournalAppEntities;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConfigJournalAppRepository extends MongoRepository<ConfigJournalAppEntities, ObjectId> {

}
