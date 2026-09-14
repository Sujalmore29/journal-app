package com.msd.myjournalapp.Services;

import com.msd.myjournalapp.Entities.User;
import com.msd.myjournalapp.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServices {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final UserRepository userRepository;
    public boolean saveUserAfterSignUp(User user){
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(List.of("USER"));
            userRepository.save(user);
            return true;
        }catch(Exception e){
            log.error("Error occurred", e);
            return false;
        }
    }

    public void saveUser(User user){
        userRepository.save(user);
    }

    public boolean saveUserAfterJournalOperation(User user){
        userRepository.save(user);
        return true;
    }

    public boolean getSentimentAnalysis(String username){
        User user = userRepository.getUserByUsername(username);
        return user.isSentimentAnalysis();
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
           log.error("Error Occurred While Promoting User", e);
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
