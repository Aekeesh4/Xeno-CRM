package com.xeno.xenocrm.service;

import com.xeno.xenocrm.dto.DashboardInsight;
import com.xeno.xenocrm.entity.Lead;
import com.xeno.xenocrm.repository.LeadRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIInsightService {

    @Autowired
    private LeadRepository leadRepository;


    public DashboardInsight getInsights() {

        List<Lead> leads = leadRepository.findAll();

        DashboardInsight insight =
                new DashboardInsight();


        // HOT LEADS COUNT

        int hotLeads = 0;

        for (Lead lead : leads) {

            if (

                    lead.getAiScore() != null

                            &&

                            lead.getAiScore() >= 85

            ) {

                hotLeads++;

            }

        }

        insight.setHotLeads(hotLeads);



        // BEST SOURCE

        Map<String, Integer> sourceMap =

                new HashMap<>();


        for (Lead lead : leads) {

            String source = lead.getSource();

            if (

                    source != null

                            &&

                            !source.isBlank()

            ) {

                sourceMap.put(

                        source,

                        sourceMap.getOrDefault(

                                source,

                                0

                        ) + 1

                );

            }

        }


        String bestSource = "No Data";

        int max = 0;


        for (

                Map.Entry<String, Integer> entry

                :

                sourceMap.entrySet()

        ) {

            if (

                    entry.getValue() > max

            ) {

                max = entry.getValue();

                bestSource = entry.getKey();

            }

        }


        insight.setBestSource(bestSource);




        // CONVERSION RATE

        long converted =

                leads.stream()

                        .filter(

                                l ->

                                        "CONVERTED"

                                                .equals(

                                                        l.getStatus()

                                                )

                        )

                        .count();


        double rate =

                leads.size() == 0

                        ?

                        0

                        :

                        (

                                converted

                                        * 100.0

                                        /

                                        leads.size()

                        );


        insight.setConversionRate(rate);





        // AI RECOMMENDATION

        String recommendation;


        if (rate < 30) {

            recommendation =

                    "Conversion is low. Follow up hot leads immediately.";

        }

        else if (hotLeads > 5) {

            recommendation =

                    "You have many HOT leads. Prioritize demos.";

        }

        else {

            recommendation =

                    "CRM performance looks healthy.";

        }


        insight.setRecommendation(

                recommendation

        );



        return insight;

    }

}