Example: 

#SiwtchToLogin
```csharp title:switchToLogin
private Form2 form2;
private void switchToAdmin_Click(object sender, EventArgs e)
{
            Form1 form1 = Application.OpenForms.OfType<Form1().FirstOrDefault();
            if (form1 != null)
            {
                form1.Show(); 
                this.Hide();  
            }
}
```

