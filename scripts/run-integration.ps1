# run-integration.ps1

# Change directory to the script's location
$DIR = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $DIR

# Source environment variables - this might need modifications
cmd /c "$DIR\setenv.bat" | ForEach-Object {
    $key, $value = $_ -split '=', 2
    [System.Environment]::SetEnvironmentVariable($key, $value, [System.EnvironmentVariableTarget]::Process)
}
# Start Docker services
docker-compose up -d

Write-Host "🟡 - Waiting for database to be ready..."

# Wait for the database - might need a PowerShell equivalent of wait-for-it.sh
& "$DIR/wait-for-it.sh" "${DATABASE_URL}" -- { Write-Host "🟢 - Database is ready!" }

# Run Prisma migrations
npx prisma migrate dev --name init

# Run tests
if ($args.Length -eq 0) {
    vitest -c ./vitest.config.integration.js
} else {
    vitest -c ./vitest.config.integration.js --ui
}
