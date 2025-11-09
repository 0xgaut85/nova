# PowerShell script to create Vercel KV store
# This script attempts to create a KV store via Vercel API

$ErrorActionPreference = "Stop"

Write-Host "Creating Vercel KV store..." -ForegroundColor Cyan

# Try to get Vercel token from common locations
$token = $null
$possiblePaths = @(
    "$env:USERPROFILE\.vercel\auth.json",
    "$env:LOCALAPPDATA\Vercel\auth.json",
    "$env:APPDATA\Vercel\auth.json"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        try {
            $config = Get-Content $path | ConvertFrom-Json
            if ($config.token) {
                $token = $config.token
                break
            }
            if ($config.tokens -and $config.tokens.Count -gt 0) {
                $token = $config.tokens[0].token
                break
            }
        } catch {
            continue
        }
    }
}

if (-not $token) {
    Write-Host "Could not find Vercel token automatically." -ForegroundColor Red
    Write-Host "Please create the KV store manually:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://vercel.com/dashboard/stores" -ForegroundColor Yellow
    Write-Host "2. Create a new KV store named 'nova-snapshot-store'" -ForegroundColor Yellow
    Write-Host "3. Link it to your 'nova' project" -ForegroundColor Yellow
    exit 1
}

$projectId = "prj_YRE70JqISZgkNazS4S4JYrcc2pOk"
$orgId = "team_z1SNwqqp5X2mgd9B0dgFrPgP"

Write-Host "Creating KV store via API..." -ForegroundColor Cyan

$body = @{
    name = "nova-snapshot-store"
    projectId = $projectId
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

try {
    $response = Invoke-RestMethod -Uri "https://api.vercel.com/v1/stores" -Method POST -Headers $headers -Body $body
    
    Write-Host "KV store created successfully!" -ForegroundColor Green
    Write-Host "Store ID: $($response.id)" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Linking to project..." -ForegroundColor Cyan
    Invoke-RestMethod -Uri "https://api.vercel.com/v1/projects/$projectId/stores/$($response.id)" -Method POST -Headers $headers | Out-Null
    
    Write-Host "KV store linked to project!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Setup complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Deploy: vercel --prod" -ForegroundColor Yellow
    Write-Host "2. KV env vars will be automatically injected" -ForegroundColor Yellow
    
} catch {
    Write-Host "Error creating KV store: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create it manually in the dashboard:" -ForegroundColor Yellow
    Write-Host "https://vercel.com/dashboard/stores" -ForegroundColor Yellow
    exit 1
}
