package com.example.funwithflags;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import android.content.Context;
import android.content.res.ColorStateList;
import android.content.res.TypedArray;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    ImageButton bt1;
    ImageButton bt2;
    ImageButton bt3;
    ImageButton bt4;
    TextView textQuestion;
    TextView textAciertos;
    TextView textFallos;
    Context context;
    String flags = "flags.json";
    List<Flag> listFlags;
    Flag selectedFlag;
    GameLogic game;
    int idRed;
    int idGreen;
    ColorStateList colorRed;
    ColorStateList colorGreen;
    MediaPlayer soundAcierto;
    MediaPlayer soundFallo;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bt1 = findViewById(R.id.imageButton1);
        bt2 = findViewById(R.id.imageButton2);
        bt3 = findViewById(R.id.imageButton3);
        bt4 = findViewById(R.id.imageButton4);
        textQuestion = findViewById(R.id.textQuestion);
        textAciertos = findViewById(R.id.textAciertos);
        textFallos = findViewById(R.id.textFallos);
        context = getApplicationContext();
        listFlags = DataManager.obtainFlags(context, flags);
        game = new GameLogic(listFlags);
        idRed = ContextCompat.getColor(this, R.color.holo_red_light);
        idGreen = ContextCompat.getColor(this, R.color.holo_green_light);
        colorRed = ColorStateList.valueOf(idRed);
        colorGreen = ColorStateList.valueOf(idGreen);

        List<Flag> randomFlags = game.getRandomFlags();
        selectedFlag = game.selectFlag(randomFlags);

        textQuestion.setText("¿Cúal es la bandera de " + selectedFlag.getName() + "?");
        bt1.setImageResource(getResources().getIdentifier(randomFlags.get(0).getFlag(), "drawable", getPackageName()));
        bt1.setTag(randomFlags.get(0).getFlag());
        bt2.setImageResource(getResources().getIdentifier(randomFlags.get(1).getFlag(), "drawable", getPackageName()));
        bt2.setTag(randomFlags.get(1).getFlag());
        bt3.setImageResource(getResources().getIdentifier(randomFlags.get(2).getFlag(), "drawable", getPackageName()));
        bt3.setTag(randomFlags.get(2).getFlag());
        bt4.setImageResource(getResources().getIdentifier(randomFlags.get(3).getFlag(), "drawable", getPackageName()));
        bt4.setTag(randomFlags.get(3).getFlag());
        textAciertos.setText("Aciertos: " + game.getScore());
        textFallos.setText("Fallos: " + game.getMistakes());

    }

    public void onClick(View view) {
        ImageButton botonClicado = (ImageButton) view;
        String flagClicked = (String) botonClicado.getTag();
        TypedArray themeAttributes = obtainStyledAttributes(new int[]{android.R.attr.colorPrimary});
        int colorPrimary = themeAttributes.getColor(0, 0);
        ColorStateList colorDefault = ColorStateList.valueOf(colorPrimary);
        soundAcierto = MediaPlayer.create(this, R.raw.acierto_sound);
        soundFallo = MediaPlayer.create(this, R.raw.fallo_sound);

        bt1.setClickable(false);
        bt2.setClickable(false);
        bt3.setClickable(false);
        bt4.setClickable(false);

        if (flagClicked.equals(selectedFlag.getFlag())) {
            game.setScore(game.getScore() + 1);
            botonClicado.setBackgroundTintList(colorGreen);
            soundAcierto.start();
        } else {
            game.setMistakes(game.getMistakes() + 1);
            botonClicado.setBackgroundTintList(colorRed);
            soundFallo.start();
        }

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {

                botonClicado.setBackgroundTintList(colorDefault);

                List<Flag> randomFlags = game.getRandomFlags();
                selectedFlag = game.selectFlag(randomFlags);

                textQuestion.setText("¿Cual es la bandera de " + selectedFlag.getName() + " ?");
                bt1.setImageResource(getResources().getIdentifier(randomFlags.get(0).getFlag(), "drawable", getPackageName()));
                bt1.setTag(randomFlags.get(0).getFlag());
                bt2.setImageResource(getResources().getIdentifier(randomFlags.get(1).getFlag(), "drawable", getPackageName()));
                bt2.setTag(randomFlags.get(1).getFlag());
                bt3.setImageResource(getResources().getIdentifier(randomFlags.get(2).getFlag(), "drawable", getPackageName()));
                bt3.setTag(randomFlags.get(2).getFlag());
                bt4.setImageResource(getResources().getIdentifier(randomFlags.get(3).getFlag(), "drawable", getPackageName()));
                bt4.setTag(randomFlags.get(3).getFlag());
                textAciertos.setText("Aciertos: " + game.getScore());
                textFallos.setText("Fallos: " + game.getMistakes());

                bt1.setClickable(true);
                bt2.setClickable(true);
                bt3.setClickable(true);
                bt4.setClickable(true);

                if (themeAttributes != null) {
                    themeAttributes.recycle();
                }
                if (soundAcierto != null) {
                    soundAcierto.release();
                }
                if (soundFallo != null) {
                    soundFallo.release();
                }

            }
        }, 1000);
    }
}