package crypto;

import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Crypto {
    private static final byte[] a = new byte[] { 
    	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    	0, 0, 0, 0, 0, 0 };

    static byte[] a(String paramString) {
      int i = 0;
      String str1 = paramString.substring(0, 8);
      String str2 = paramString.substring(8, 16);
      String str3 = paramString.substring(16, 24);
      paramString = paramString.substring(24, 32);
      StringBuilder stringBuilder2 = new StringBuilder();
      stringBuilder2.append(str3);
      stringBuilder2.append(str1);
      stringBuilder2.append(paramString);
      stringBuilder2.append(str2);
      paramString = stringBuilder2.toString();
      StringBuilder stringBuilder1 = new StringBuilder(paramString);
      while (i < stringBuilder1.length()) {
        if (stringBuilder1.charAt(i) >= '0' && stringBuilder1.charAt(i) <= '9')
          stringBuilder1.setCharAt(i, (char)((paramString.charAt(i) - 48 + 5) % 10 + 48)); 
        if (stringBuilder1.charAt(i) >= 'a' && stringBuilder1.charAt(i) <= 'z')
          stringBuilder1.setCharAt(i, (char)((paramString.charAt(i) - 97 + 9) % 26 + 97)); 
        i++;
      } 
      return stringBuilder1.toString().getBytes();
    }
    
    public static String decrypt(String paramString1, String paramString2) throws Exception {
      byte[] arrayOfByte = a(paramString2);
      IvParameterSpec ivParameterSpec = new IvParameterSpec(a);
      SecretKeySpec secretKeySpec = new SecretKeySpec(arrayOfByte, "AES");
      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
      cipher.init(2, secretKeySpec, ivParameterSpec);
      paramString1 = new String(cipher.doFinal(Base64.getMimeDecoder().decode(paramString1)));
      return paramString1;
    }

    public static String encrypt(String paramString1, String paramString2) throws Exception {
      byte[] arrayOfByte2 = a(paramString2);
      IvParameterSpec ivParameterSpec = new IvParameterSpec(a);
      SecretKeySpec secretKeySpec = new SecretKeySpec(arrayOfByte2, "AES");
      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
      cipher.init(1, secretKeySpec, ivParameterSpec);
      byte[] arrayOfByte1 = cipher.doFinal(paramString1.getBytes());
      return Base64.getEncoder().encodeToString(arrayOfByte1);
    }

    public static void main(String[] args) {
        try {
            String auth = args[0];
            String data = args[2];
            
            if (args[1].equals("-e")) {
                System.out.println(encrypt(data, auth));
            }
            else if (args[1].equals("-d")) {
                File myObj = new File(data);
                Scanner myReader = new Scanner(myObj);
                data = "";
                while (myReader.hasNextLine()) {
                    data += myReader.nextLine();
                }
                myReader.close();
                System.out.println(decrypt(data, auth));
            }
        }
	catch (Exception exception) {
            System.out.println(exception.getMessage());
        } 
    }
}
