
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendApiKey = Deno.env.get("RESEND_API_KEY");

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get games happening in the next 2 hours
    const twoHoursFromNow = new Date();
    twoHoursFromNow.setHours(twoHoursFromNow.getHours() + 2);
    
    const oneHourFromNow = new Date();
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);

    const { data: upcomingGames, error: gamesError } = await supabase
      .from('games')
      .select(`
        *,
        participants!inner (
          user_id,
          users (
            email,
            full_name
          )
        )
      `)
      .gte('date_time', oneHourFromNow.toISOString())
      .lte('date_time', twoHoursFromNow.toISOString());

    if (gamesError) throw gamesError;

    console.log(`Found ${upcomingGames?.length || 0} upcoming games`);

    if (!upcomingGames || upcomingGames.length === 0) {
      return new Response(
        JSON.stringify({ message: "No upcoming games found" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send reminder emails if Resend is configured
    if (resend) {
      for (const game of upcomingGames) {
        for (const participant of game.participants) {
          if (participant.users?.email) {
            try {
              await resend.emails.send({
                from: "PickupPlay <noreply@yourdomain.com>",
                to: [participant.users.email],
                subject: `Reminder: ${game.sport} game in 1-2 hours!`,
                html: `
                  <h2>Game Reminder</h2>
                  <p>Hi ${participant.users.full_name || 'there'},</p>
                  <p>This is a reminder that you have a ${game.sport} game coming up:</p>
                  <ul>
                    <li><strong>Time:</strong> ${new Date(game.date_time).toLocaleString()}</li>
                    <li><strong>Location:</strong> ${game.location}</li>
                    <li><strong>Duration:</strong> ${game.duration} minutes</li>
                  </ul>
                  ${game.description ? `<p><strong>Notes:</strong> ${game.description}</p>` : ''}
                  <p>See you there!</p>
                  <p>- PickupPlay Team</p>
                `,
              });
              console.log(`Sent reminder to ${participant.users.email} for game ${game.id}`);
            } catch (emailError) {
              console.error(`Failed to send email to ${participant.users.email}:`, emailError);
            }
          }
        }
      }
    } else {
      console.log("Resend API key not configured, skipping email sending");
    }

    return new Response(
      JSON.stringify({ 
        message: "Game reminders processed successfully",
        gamesProcessed: upcomingGames.length 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in send-game-reminders function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
