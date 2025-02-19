import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export async function PATCH(req) {
  await dbConnect();
  const bcrypt = (await import("bcryptjs")).default;

  try {
    const { email, currentPassword, newPassword } = await req.json();
console.log(email,currentPassword,newPassword)
    if (!email || !currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: "All fields are required." }), { 
        status: 400, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), { 
        status: 404, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Current password is incorrect." }), { 
        status: 401, 
        headers: { "Content-Type": "application/json" } 
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return new Response(JSON.stringify({ message: "Password updated successfully." }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return new Response(JSON.stringify({ error: "Failed to change password." }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}
