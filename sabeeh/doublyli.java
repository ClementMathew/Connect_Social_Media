import java.util.Scanner;
class Node{
int data;
Node next;
Node prev;
Node(int data){
this.data=data;
prev=null;
next=null;
}
}
class doublyli{
static Node head=null;
static Node tail=null;

static void insert(int x){
Node newnode=new Node(x);
if(head==null && tail==null){
head=tail=newnode;
}
else{
tail.next=newnode;
newnode.prev=tail;
tail=newnode;
}
}

static void display(){
Node temp=head;
while(temp!=null){
System.out.print(temp.data+" ");
temp=temp.next;
}
System.out.println();
}

static void delete(int x){
if(head==null && tail==null){
return;
}
if(head.data==x){
head=head.next;
}
else if(tail.data==x){
tail=tail.prev;
tail.next=null;
}
else{
Node temp=head;
while(temp.data!=x && temp!=null){
temp=temp.next;
}
temp.prev.next=temp.next;
temp.next.prev=temp.prev;
temp.next=null;
temp.prev=null;
}
}
public static void main(String args[]){
Scanner sc=new Scanner(System.in);
System.out.println("1.Insert \n2.Delete \n3.Display \n4.Exit");
int i,op=5;
do{
System.out.print("Select the required option : \n");
op=sc.nextInt();
if(op==1){
System.out.print("Enter the element to be inserted : \n");
int x=sc.nextInt();
insert(x);
}else if(op==2){
System.out.print("Enter the element to be deleted : \n");
int x=sc.nextInt();
delete(x);
}
else if(op==3){
System.out.print("The elements in the list are : \n");
display();
System.out.println();
}
else if(op==4){
break;
}
}
while(op!=4);
}
}
