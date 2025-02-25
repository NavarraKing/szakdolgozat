namespace IMS
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            usernameLabel = new Label();
            passwordLabel = new Label();
            usernameTB = new TextBox();
            passwordTB = new TextBox();
            loginButton = new Button();
            switchToAdmin = new Button();
            SuspendLayout();
            // 
            // usernameLabel
            // 
            usernameLabel.AutoSize = true;
            usernameLabel.Location = new Point(537, 240);
            usernameLabel.Name = "usernameLabel";
            usernameLabel.Size = new Size(87, 15);
            usernameLabel.TabIndex = 0;
            usernameLabel.Text = "Felhasználónév";
            // 
            // passwordLabel
            // 
            passwordLabel.AutoSize = true;
            passwordLabel.Location = new Point(560, 296);
            passwordLabel.Name = "passwordLabel";
            passwordLabel.Size = new Size(40, 15);
            passwordLabel.TabIndex = 1;
            passwordLabel.Text = "Jelszó:";
            // 
            // usernameTB
            // 
            usernameTB.Location = new Point(496, 264);
            usernameTB.Name = "usernameTB";
            usernameTB.Size = new Size(168, 23);
            usernameTB.TabIndex = 2;
            // 
            // passwordTB
            // 
            passwordTB.Location = new Point(496, 320);
            passwordTB.Name = "passwordTB";
            passwordTB.Size = new Size(168, 23);
            passwordTB.TabIndex = 3;
            // 
            // loginButton
            // 
            loginButton.Location = new Point(496, 352);
            loginButton.Name = "loginButton";
            loginButton.Size = new Size(168, 32);
            loginButton.TabIndex = 4;
            loginButton.Text = "Bejelentkezés";
            loginButton.UseVisualStyleBackColor = true;
            // 
            // switchToAdmin
            // 
            switchToAdmin.Location = new Point(1048, 16);
            switchToAdmin.Name = "switchToAdmin";
            switchToAdmin.Size = new Size(73, 46);
            switchToAdmin.TabIndex = 5;
            switchToAdmin.Text = "DEV Admin";
            switchToAdmin.UseVisualStyleBackColor = true;
            switchToAdmin.Click += switchToAdmin_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1134, 667);
            Controls.Add(switchToAdmin);
            Controls.Add(loginButton);
            Controls.Add(passwordTB);
            Controls.Add(usernameTB);
            Controls.Add(passwordLabel);
            Controls.Add(usernameLabel);
            Name = "Form1";
            Text = "Form1";
            FormClosed += Form1_FormClosed;
            Load += Form1_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label usernameLabel;
        private Label passwordLabel;
        private TextBox usernameTB;
        private TextBox passwordTB;
        private Button loginButton;
        private Button switchToAdmin;
    }
}
