import java.util.Scanner;
class test2
{
 public static void main(String args[])
 {
 int a,sum=0,i,avg;
 int array[]=new int[5];
 Scanner m=new Scanner(System.in);
 for(i=0;i<5;i++)
 {
 array[i]=m.nextInt();
 sum=sum+array[i];
 }
 avg=sum/5;
 System.out.println("sum is"+sum);
 System.out.println("avg is"+avg);
 }

}