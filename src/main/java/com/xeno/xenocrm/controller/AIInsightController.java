package com.xeno.xenocrm.controller;

import com.xeno.xenocrm.dto.DashboardInsight;
import com.xeno.xenocrm.service.AIInsightService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIInsightController {

    @Autowired
    private AIInsightService aiInsightService;


    @GetMapping("/insights")
    public DashboardInsight getInsights() {

        return aiInsightService.getInsights();

    }

}