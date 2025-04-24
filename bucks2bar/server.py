from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import base64
import os

app = FastAPI()

# Serve static files
app.mount("/static", StaticFiles(directory="../bucks2bar"), name="static")

# Route to serve the main index.html file
@app.get("/")
async def read_root():
    return FileResponse("../bucks2bar/index.html")

# Request body model for email data
class EmailRequest(BaseModel):
    email: str
    chartImage: str

# Email sending route
@app.post("/send-email")
async def send_email(request: EmailRequest):
    if not request.email or not request.chartImage:
        raise HTTPException(status_code=400, detail="Email and chart image are required.")

    try:
        # Email configuration
        sender_email = "your-email@gmail.com"  # Replace with your email
        sender_password = "your-email-password"  # Replace with your email password or app-specific password
        recipient_email = request.email

        # Create the email
        message = MIMEMultipart()
        message["From"] = sender_email
        message["To"] = recipient_email
        message["Subject"] = "Your Chart Image"
        message.attach(MIMEText("Here is your chart image.", "plain"))

        # Decode the Base64 chart image and attach it
        chart_data = base64.b64decode(request.chartImage.split("base64,")[1])
        attachment = MIMEBase("application", "octet-stream")
        attachment.set_payload(chart_data)
        encoders.encode_base64(attachment)
        attachment.add_header("Content-Disposition", "attachment", filename="chart.png")
        message.attach(attachment)

        # Send the email
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, message.as_string())

        return {"message": "Email sent successfully!"}
    except Exception as e:
        print(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email.")

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3000)