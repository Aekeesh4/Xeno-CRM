package com.xeno.xenocrm.service;

import com.xeno.xenocrm.entity.Activity;
import com.xeno.xenocrm.repository.ActivityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;


    public void saveActivity(String message) {

        Activity activity = new Activity(message);

        activityRepository.save(activity);

    }


    public List<Activity> getRecentActivities() {

        return activityRepository
                .findTop10ByOrderByCreatedAtDesc();

    }

}