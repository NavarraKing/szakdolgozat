Example: 

#SiwtchToAdmin
```csharp title:switchToAdmin 
private Form2 form2;
private void switchToAdmin_Click(object sender, EventArgs e)
{
	if (form2 == null || form2.IsDisposed)
	{
	    form2 = new Form2(); 
	}
	form2.Show(); 
	this.Hide();  
}
```

