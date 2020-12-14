package com.biao.hello.algorithm.dp;

/**
 * shortest common supersequence
 */
public class ScsDemo {


    public static int scs(String a, String b) {

        int m = a.length();
        int n = b.length();
        int[][] arr = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            arr[i][0] = i;
        }
        for (int i = 1; i <= n; i++) {
            arr[0][i] = i;
        }

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (a.charAt(i - 1) == b.charAt(j - 1)) {
                    arr[i][j] = arr[i - 1][j - 1] + 1;
                } else {
                    arr[i][j] = Math.min(arr[i - 1][j], arr[i][j - 1]) + 1;
                }
            }
        }

        return arr[m][n];
    }

    public static void main(String[] args) {
        System.out.println(scs("abcbdab", "bdcaba"));
    }

}
