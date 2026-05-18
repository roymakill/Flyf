import { cookies } from 'next/headers';
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

const ALLOWED_IPS_FILE = path.resolve(process.cwd(), "allowed_ips.txt");
const FIREWALL_RULE_NAME = "AllowFromWebUsers";

export async function GET(req) {
  const cookieStore = cookies();
  const session = cookieStore.get('flyff_session');
  if (!session?.value) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  // 2. Get user IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
             req.ip ||
             req.connection?.remoteAddress;

  if (!ip) {
    return NextResponse.json({ success: false, error: "No IP found" }, { status: 400 });
  }

  // 3. Read or create allowed IPs file
  let allowedIps = [];
  if (fs.existsSync(ALLOWED_IPS_FILE)) {
    allowedIps = fs.readFileSync(ALLOWED_IPS_FILE, "utf-8").split("\n").filter(Boolean);
  }
  if (!allowedIps.includes(ip)) {
    allowedIps.push(ip);
    fs.writeFileSync(ALLOWED_IPS_FILE, allowedIps.join("\n"));
  }

  // 4. Update firewall rule (PowerShell command)
  // This command replaces the remote addresses in the rule with the updated list
  const addresses = allowedIps.join(",");
  const psCommand = `Set-NetFirewallRule -DisplayName \"${FIREWALL_RULE_NAME}\" -RemoteAddress \"${addresses}\"`;

  exec(`powershell.exe -Command "${psCommand}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('PowerShell error:', error, stderr);
    } else {
      console.log('PowerShell output:', stdout);
    }
  });

  return NextResponse.json({ success: true, ip });
} 