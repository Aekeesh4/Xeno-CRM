package com.xeno.xenocrm.controller;

import com.xeno.xenocrm.entity.Activity;
import com.xeno.xenocrm.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
@CrossOrigin(origins = "*")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping("/recent")
    public List<Activity> recentActivities() {

        return activityService
                .getRecentActivities();

    }

}