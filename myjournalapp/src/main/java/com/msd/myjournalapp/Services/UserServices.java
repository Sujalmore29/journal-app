package com.msd.myjournalapp.Services;

import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class UserServices {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    public UserRepository userRepository;
    public boolean saveUser(User user){
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(List.of("USER"));
            userRepository.save(user);
            return true;
        }catch(Exception e){
            System.out.println("Error occured" + e);
            return false;
        }
    }

    public boolean saveUserAfterJournalOperation(User user){
        userRepository.save(user);
        return true;
    }

    public void saveAdmin(String username){
       try{
           User existingUser = userRepository.getUserByUsername(username);

           if(existingUser == null){
               throw new RuntimeException("User Not Found");
           }

           if(!existingUser.getRoles().contains("ADMIN")){
               existingUser.getRoles().add("ADMIN");
               userRepository.save(existingUser);
           }

       }catch (Exception e){
           System.out.println("Error Occured While Promoting User" + e);
       }
    }

    public User getUserByUsername(String username){
        return userRepository.getUserByUsername(username);
    }

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public Optional<User> findById(ObjectId id){
        return userRepository.findById(id);
    }
    public void deleteById(ObjectId id){
        userRepository.deleteById(id);
    }

    public User findByUsername(String username){
        return userRepository.getUserByUsername(username);
    }
    public void deleteUser(String username){
        userRepository.deleteByUsername(username);
    }

    public void updateUser(User user){
        userRepository.save(user);
    }
}
