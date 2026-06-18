package com.xeno.xenocrm.dto;

public class DashboardInsight {

    private int hotLeads;

    private String bestSource;

    private double conversionRate;

    private String recommendation;

    public DashboardInsight() {
    }

    public int getHotLeads() {
        return hotLeads;
    }

    public void setHotLeads(int hotLeads) {
        this.hotLeads = hotLeads;
    }

    public String getBestSource() {
        return bestSource;
    }

    public void setBestSource(String bestSource) {
        this.bestSource = bestSource;
    }

    public double getConversionRate() {
        return conversionRate;
    }

    public void setConversionRate(double conversionRate) {
        this.conversionRate = conversionRate;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }
}