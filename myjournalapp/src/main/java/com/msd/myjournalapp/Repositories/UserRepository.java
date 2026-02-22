package com.msd.myjournalapp.Repositories;

import com.msd.myjournalapp.Entities.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,Object> {

    User getUserByUsername(String username);

    void deleteByUsername(String username);

}
