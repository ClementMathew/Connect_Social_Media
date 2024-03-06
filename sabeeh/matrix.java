import java.util.Scanner;
class matrix
{
 public static void main(String args[])
 {
 Scanner m=new Scanner(System.in);
 int i,j,k,r1,c1,r2,c2;
 int A[][]=new int[50][50];
 int B[][]=new int[50][50];
 int C[][]=new int[50][50];
 System.out.println("enter the row and column of first matrix");
 r1=m.nextInt();
 c1=m.nextInt();
 System.out.println("enter the elements of first matrix");
 for(i=0;i<r1;i++)
 {
  for(j=0;j<c1;j++)
  {
   A[i][j]=m.nextInt();
  }
 }
 System.out.println("enter the row and column of second matrix");
 r2=m.nextInt();
 c2=m.nextInt();
 System.out.println("enter the elements of second matrix");
 for(i=0;i<r2;i++)
 {
  for(j=0;j<c2;j++)
  {
  B[i][j]=m.nextInt();
  }
 }
 if(r1!=c2)
 {
 System.out.println("not possible");
 }
 else
 {
 for(i=0;i<r1;i++)
 {
  for(j=0;j<c2;j++)
  {C[i][j]=0;
   for(k=0;k<c2;k++)
   {
    C[i][j]=C[i][j]+A[i][k]*B[k][j];
   }
  } 
 }
 System.out.print("matrix is : \n");
 for(i=0;i<r1;i++)
  {
   for(j=0;j<c2;j++)
    {
     System.out.print("\t"+C[i][j]);
    }
  System.out.print("\n");
  }
 }
 }
}

  
 
