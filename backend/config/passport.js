import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import supabase from "./supabase.js";
import sendEmail, { getWelcomeEmailTemplate } from "../utils/sendEmail.js";

// Debug logging
console.log("🔍 Passport Config - Checking Google OAuth credentials...");
console.log(`   GOOGLE_CLIENT_ID exists: ${!!process.env.GOOGLE_CLIENT_ID}`);
console.log(
  `   GOOGLE_CLIENT_SECRET exists: ${!!process.env.GOOGLE_CLIENT_SECRET}`,
);
console.log(`   GOOGLE_CALLBACK_URL: ${process.env.GOOGLE_CALLBACK_URL}`);

// Google OAuth Strategy - only initialize if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  if (!process.env.GOOGLE_CALLBACK_URL) {
    console.error("❌ GOOGLE_CALLBACK_URL is not set!");
  }

  console.log("✅ Google OAuth credentials found - initializing strategy");
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
        passReqToCallback: false,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(`🔄 Processing Google OAuth for: ${profile.displayName}`);

          // Check if user already exists with Google ID
          let { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("google_id", profile.id)
            .single();

          if (user) {
            console.log(`✅ Found existing Google user: ${user.email}`);
            // Update last login
            await supabase
              .from("users")
              .update({ last_login: new Date().toISOString() })
              .eq("id", user.id);
            return done(null, user);
          }

          // Check if user exists with same email
          const { data: emailUser } = await supabase
            .from("users")
            .select("*")
            .eq("email", profile.emails[0].value)
            .single();

          if (emailUser) {
            console.log(
              `✅ Linking Google account to existing user: ${emailUser.email}`,
            );
            // Link Google account to existing user
            await supabase
              .from("users")
              .update({
                google_id: profile.id,
                avatar: profile.photos[0]?.value || emailUser.avatar,
                last_login: new Date().toISOString(),
              })
              .eq("id", emailUser.id);

            const { data: updatedUser } = await supabase
              .from("users")
              .select("*")
              .eq("id", emailUser.id)
              .single();

            return done(null, updatedUser);
          }

          // Create new user
          console.log(
            `🆕 Creating new user from Google OAuth: ${profile.displayName}`,
          );
          const { data: newUser, error: createError } = await supabase
            .from("users")
            .insert([
              {
                google_id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                avatar: profile.photos[0]?.value,
                auth_provider: "google",
                is_email_verified: true,
                role: "user",
                last_login: new Date().toISOString(),
              },
            ])
            .select()
            .single();

          if (createError) {
            console.error("❌ Error creating user:", createError);
            return done(createError, null);
          }

          console.log(`✅ New user created: ${newUser.email}`);

          // Send welcome email to new user
          try {
            const welcomeEmailTemplate = getWelcomeEmailTemplate(newUser.name);
            await sendEmail({
              to: newUser.email,
              subject: "Welcome to DocentDesk! 🎉",
              html: welcomeEmailTemplate,
            });
            console.log(`✅ Welcome email sent to ${newUser.email}`);
          } catch (emailError) {
            console.error("⚠️  Error sending welcome email:", emailError);
            // Don't fail the signup if email fails to send
          }

          done(null, newUser);
        } catch (error) {
          console.error("❌ Passport strategy error:", error);
          done(error, null);
        }
      },
    ),
  );
} else {
  console.log(
    "⚠️  Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable.",
  );
}

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return done(error, null);
    }

    // Remove password from user object
    delete user.password;
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
