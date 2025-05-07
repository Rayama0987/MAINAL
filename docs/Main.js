package org.example;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.Random;

class MathtestGame extends JFrame {
    private JLabel questionLabel, resultLabel, scoreLabel;
    private JTextField answerField;
    private JButton submitButton;
    private int questionCount = 0, correctCount = 0;
    private int a, b, c, d;
    private boolean plus1, plus2;
    private String correctExpansion;

    public MathtestGame() {
        setTitle("式の展開betaApp");
        setSize(700, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        questionLabel = new JLabel();
        add(questionLabel);

        answerField = new JTextField(25);
        add(answerField);

        submitButton = new JButton("答える！");
        add(submitButton);

        resultLabel = new JLabel("");
        add(resultLabel);

        scoreLabel = new JLabel("0問正解中");
        add(scoreLabel);

        submitButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                checkAnswer();
            }
        });

        generateQuestion();
        setVisible(true);
    }

    private void generateQuestion() {
        Random rand = new Random();
        boolean isSquareForm = rand.nextBoolean(); // true: (ax±by)^2, false: (ax±by)(cx±dy)

        if (isSquareForm) {
            // (ax±by)^2
            a = rand.nextInt(10) + 1;
            b = rand.nextInt(10) + 1;
            plus1 = rand.nextBoolean();
            String op = plus1 ? "+" : "-";

            questionLabel.setText(String.format("Q%d: ( %dx %s %dy )² を展開して！", questionCount + 1, a, op, b));

            if (plus1) {
                correctExpansion = String.format("%dx²+%dxy+%dy²", a * a, 2 * a * b, b * b);
            } else {
                correctExpansion = String.format("%dx²-%dxy+%dy²", a * a, 2 * a * b, b * b);
            }

        } else {
            // (ax±by)(cx±dy)
            a = rand.nextInt(10) + 1;
            b = rand.nextInt(10) + 1;
            c = rand.nextInt(10) + 1;
            d = rand.nextInt(10) + 1;
            plus1 = rand.nextBoolean();
            plus2 = rand.nextBoolean();

            String op1 = plus1 ? "+" : "-";
            String op2 = plus2 ? "+" : "-";

            questionLabel.setText(String.format("Q%d: ( %dx %s %dy )( %dx %s %dy ) を展開して！",
                    questionCount + 1, a, op1, b, c, op2, d));

            // 展開: (ax±by)(cx±dy) = acx² ± (ad±bc)xy ± bdy²
            int ac = a * c;
            int ad = a * d;
            int bc = b * c;
            int bd = b * d;

            int middleTerm = (plus1 ? 1 : -1) * ad + (plus2 ? 1 : -1) * bc;
            int signMiddle = Integer.compare(middleTerm, 0);
            int absMiddle = Math.abs(middleTerm);

            StringBuilder sb = new StringBuilder();
            sb.append(ac).append("x²");
            sb.append(signMiddle >= 0 ? "+" : "-").append(absMiddle).append("xy");
            sb.append((plus1 == plus2 ? "+" : "-")).append(bd).append("y²");

            correctExpansion = sb.toString();
        }
    }

    private void checkAnswer() {
        String userAnswer = answerField.getText().replaceAll("\\s+", "");

        if (userAnswer.equals(correctExpansion)) {
            resultLabel.setText("正解！ 🎉");
            correctCount++;
        } else {
            resultLabel.setText("不正解 😢 正解は " + correctExpansion);
        }

        questionCount++;
        scoreLabel.setText(String.format("%d問中 %d問正解", questionCount, correctCount));

        if (questionCount >= 10) {
            showResult();
        } else {
            generateQuestion();
            answerField.setText("");
        }
    }

    private void showResult() {
        double accuracy = (correctCount / 10.0) * 100;
        int option = JOptionPane.showOptionDialog(this,
                String.format("お疲れさま！\n正答数：%d/10\n正答率：%.1f%%\n", correctCount, accuracy),
                "結果発表",
                JOptionPane.YES_NO_OPTION,
                JOptionPane.INFORMATION_MESSAGE,
                null,
                new String[]{"もう一度挑戦", "終了"},
                "もう一度挑戦");

        if (option == JOptionPane.YES_OPTION) {
            questionCount = 0;
            correctCount = 0;
            answerField.setText("");
            resultLabel.setText("");
            scoreLabel.setText("0問正解中");
            generateQuestion();
        } else {
            System.exit(0);
        }
    }

    public static void main(String[] args) {
        new MathtestGame();
    }
}
