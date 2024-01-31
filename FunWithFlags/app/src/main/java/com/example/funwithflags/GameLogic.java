package com.example.funwithflags;

import java.util.Collections;
import java.util.List;
import java.util.Random;

public class GameLogic {
    private List<Flag> flagList;
    private int score;
    private int mistakes;

    public GameLogic(List<Flag> flagList) {
        this.flagList = flagList;
        this.score = 0;
        this.mistakes = 0;
    }

    public List<Flag> getRandomFlags() {
        Collections.shuffle(flagList);
        return flagList.subList(0, 4);
    }

    public Flag selectFlag(List<Flag> subFlagList){
        Random random = new Random();
        int i = random.nextInt(4);
        Flag selectedFlag = subFlagList.get(i);
        return selectedFlag;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public void setMistakes(int mistakes) {
        this.mistakes = mistakes;
    }

    public int getScore() {
        return score;
    }

    public int getMistakes() {
        return mistakes;
    }
}