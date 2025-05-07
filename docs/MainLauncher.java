package org.example;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.File;
import java.io.IOException;

public class MainLauncher extends JFrame {
    public MainLauncher() {
        setTitle("ゲーム選択画面");
        setSize(400, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        JLabel label = new JLabel("遊び方を選んでください");
        add(label);

        JButton swingButton = new JButton("Swingアプリで開始");
        JButton webButton = new JButton("Web版を開く");

        add(swingButton);
        add(webButton);

        swingButton.addActionListener(e -> {
            new MathtestGame(() -> {
                this.setVisible(true); // ゲーム終了後に戻る
            });
            this.setVisible(false);
        });

        webButton.addActionListener(e -> {
            try {
                // HTMLファイルのパス（適宜修正）
                File htmlFile = new File("math_game.html");
                Desktop.getDesktop().browse(htmlFile.toURI());
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        });

        setVisible(true);
    }

    public static void main(String[] args) {
        new MainLauncher();
    }
}
