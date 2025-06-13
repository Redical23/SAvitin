"use server"

import sendEmail from "../utils/sendEmail"

export async function sendEmailAction(prevState: any, formData: FormData) {
  try {
    // Check if formData exists
    if (!formData) {
      return {
        success: false,
        message: "No form data received. Please try again.",
      }
    }

    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const message = formData.get("message")

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      }
    }

    // Prepare email content
    const subject = `New Contact Form Submission from ${firstName} ${lastName}`

    const textContent = `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}

---
This email was sent from your website contact form.
    `

    // Send email using your existing function
    await sendEmail("kanoonikarwayahi@gmail.com", subject, textContent)

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    }
  } catch (error) {
    console.error("Error in sendEmailAction:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
