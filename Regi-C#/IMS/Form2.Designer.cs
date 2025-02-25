namespace IMS
{
    partial class Form2
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            switchToLogin = new Button();
            SuspendLayout();
            // 
            // switchToLogin
            // 
            switchToLogin.Location = new Point(704, 16);
            switchToLogin.Name = "switchToLogin";
            switchToLogin.Size = new Size(75, 40);
            switchToLogin.TabIndex = 0;
            switchToLogin.Text = "DEV Login";
            switchToLogin.UseVisualStyleBackColor = true;
            switchToLogin.Click += switchToLogin_Click;
            // 
            // Form2
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(switchToLogin);
            Name = "Form2";
            Text = "Form2";
            FormClosed += Form2_FormClosed;
            ResumeLayout(false);
        }

        #endregion

        private Button switchToLogin;
    }
}