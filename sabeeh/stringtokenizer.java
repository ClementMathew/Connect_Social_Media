import java.util.Scanner;
import java.util.StringTokenizer;
class stringtoker;
{
 public static void main(String args[])
 {
  int n,sum=0;
  Scanner m=new Scanner(System.in);
  System.out.println("enter the integers with gap");
  String s=m.nextLine();
  StringTokenizer st=new StringTokenizer(s);
  System.out.println("the numbers are:");
  while(st.hasMoreToken())
  {
   String temp=st.nextToken();
   n=Integer.parseInt(temp);
   System.out.println(n);
   sum+=n;
  }
  System.out.println("sum="+sum);
 }
}