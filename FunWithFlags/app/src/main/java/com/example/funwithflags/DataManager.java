package com.example.funwithflags;

import android.content.Context;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class DataManager {


    public static List<Flag> obtainFlags(Context context, String filename) {
        List<Flag> flagList = new ArrayList<>();
        JSONArray flagsArray = null;

        try (InputStream is = context.getAssets().open(filename)) {
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            String json = new String(buffer, StandardCharsets.UTF_8);
            flagsArray = new JSONArray(json);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (flagsArray != null) {
            for (int i = 0; i < flagsArray.length(); i++) {
                try {
                    JSONObject jsonObject = flagsArray.getJSONObject(i);
                    String countryName = jsonObject.getString("name");
                    String flag = jsonObject.getString("flag");
                    Flag bandera = new Flag(countryName, flag);
                    flagList.add(bandera);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        } else {
           System.out.println("Error al cargar el archivo de banderas");
        }

        return flagList;
    }
}
